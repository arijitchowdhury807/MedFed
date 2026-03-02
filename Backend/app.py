from fastapi import FastAPI
from model import create_model
from hospital import HospitalNode
from federated import fed_avg
from sklearn.datasets import load_diabetes
import numpy as np

app = FastAPI()

data = load_diabetes()
X, y = data.data, (data.target > data.target.mean()).astype(int)

# Split into 3 hospitals
X1, X2, X3 = np.array_split(X, 3)
y1, y2, y3 = np.array_split(y, 3)

global_model = create_model()
global_model.fit(X[:10], y[:10])  # tiny subset initialization

hospitals = [
    HospitalNode("A", X1, y1, global_model),
    HospitalNode("B", X2, y2, global_model),
    HospitalNode("C", X3, y3, global_model),
]

@app.get("/train_round")
def train_round():
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

    # Clean response (no numpy objects)
    response_hospitals = [
        {
            "id": u["id"],
            "accuracy": u["accuracy"],
            "samples": u["samples"]
        }
        for u in updates
    ]

    return {
        "global_accuracy": global_acc,
        "hospitals": response_hospitals
    }

@app.get("/train_multiple/{rounds}")
def train_multiple(rounds: int):
    results = []
    for _ in range(rounds):
        results.append(train_round())
    return results