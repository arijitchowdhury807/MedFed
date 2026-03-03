from fastapi import FastAPI
from model import create_model
from hospital import HospitalNode
from federated import fed_avg
from sklearn.datasets import load_diabetes
import numpy as np
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

data = load_diabetes()
X, y = data.data, (data.target > data.target.mean()).astype(int)

# Split into 3 hospitals
X1, X2, X3, X4, X5, X6 = np.array_split(X, 6)
y1, y2, y3, y4, y5, y6 = np.array_split(y, 6)

global_model = create_model()
global_model.fit(X[:10], y[:10])  # tiny subset initialization

hospitals = [
    HospitalNode("A", X1, y1, global_model),
    HospitalNode("B", X2, y2, global_model),
    HospitalNode("C", X3, y3, global_model),
    HospitalNode("D", X, y, global_model),  # bonus hospital with all data
]

current_round = 0

class TrainRequest(BaseModel):
    wallet: str

@app.post("/train_round")
def train_round(request: TrainRequest):
    global current_round
    current_round += 1

    print(f"--- Round {current_round} triggered by wallet: {request.wallet} ---")

    updates = []

    # 🔥 STEP 1: Push latest global weights to hospitals BEFORE training
    for h in hospitals:
        h.model.coef_ = global_model.coef_.copy()
        h.model.intercept_ = global_model.intercept_.copy()
        h.model.classes_ = global_model.classes_

    # 🔥 STEP 2: Local training
    for h in hospitals:
        coef, intercept, acc, samples = h.train()
        updates.append({
            "id": h.id,
            "accuracy": float(acc),
            "samples": int(samples),
            "coef": coef,
            "intercept": intercept
        })

    # 🔥 STEP 3: Federated Averaging
    new_coef, new_intercept = fed_avg(updates)

    # 🔥 STEP 4: Update global model
    global_model.coef_ = new_coef.copy()
    global_model.intercept_ = new_intercept.copy()
    global_model.classes_ = np.unique(y)

    # 🔥 STEP 5: Evaluate global model
    global_acc = float(global_model.score(X, y))

    import hashlib

    # Serialize weights deterministically
    weight_bytes = (
        new_coef.tobytes() +
        new_intercept.tobytes()
    )

    model_hash = hashlib.sha256(weight_bytes).hexdigest()

    from blockchain import store_hash

    try:
        tx_hash = store_hash(model_hash)
        print("Blockchain TX:", tx_hash)
    except Exception as e:
        print("Blockchain logging failed:", e)
        tx_hash = None

    # Clean response (no numpy objects)
    total_samples = sum(u["samples"] for u in updates)

    response_hospitals = [
        {
            "id": u["id"],
            "name": f"Hospital {u['id']}",
            "accuracy": round(u["accuracy"] * 100, 2),
            "samples": u["samples"],
            "contribution": round((u["samples"] / total_samples) * 100, 2),
            "lastUpdateHash": model_hash[:10] + "...",
            "status": "synced",
            "wallet": request.wallet
        }
        for u in updates
    ]

    return {
        "round": current_round,
        "global_accuracy": global_acc,
        "model_hash": model_hash,
        "txHash": tx_hash,
        "hospitals": response_hospitals
    }

@app.post("/train_multiple/{rounds}")
def train_multiple(rounds: int, request: TrainRequest):
    results = []
    for _ in range(rounds):
        results.append(train_round(request))
    return results