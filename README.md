# 🏥 MedFed

MedFed is a decentralized AI-powered medical federated learning platform that enables secure, privacy-preserving model training across multiple participants without exposing raw medical data.

It combines **Machine Learning**, **Blockchain transparency**, and **Modern Web UI** to create a trust-driven ecosystem for collaborative healthcare intelligence.

---

# 🚀 Overview

MedFed allows multiple participants (hospitals, labs, researchers) to:

* Train ML models collaboratively
* Preserve patient data privacy
* Record training rounds on blockchain
* View training accuracy evolution
* Verify transactions via Etherscan

The system ensures:

✔ No raw data leaves local nodes
✔ Transparent training rounds
✔ Verifiable smart contract logs
✔ Modern, interactive UI experience

---

# 🧠 How MedFed Works

1. Local nodes train on private datasets.
2. Only model updates are shared.
3. Global aggregation combines updates.
4. Each training round is logged on blockchain.
5. Accuracy updates dynamically after every round.
6. Users can verify transactions via Etherscan.

---

# 🛠️ Tech Stack

## 🔹 Frontend

* React
* Vite
* TypeScript / JavaScript
* Tailwind CSS
* Framer Motion (animations)
* Ethers.js (blockchain interaction)

## 🔹 Backend

* Python
* FastAPI / Flask (depending on version)
* Scikit-learn (ML model training)
* NumPy / Pandas

## 🔹 Blockchain

* Solidity Smart Contract
* Ethereum (Testnet)
* Etherscan for transaction verification

---

# 🎨 Design & UI Highlights

## 🌍 Central Globe Animation

* Interactive animated globe at center
* Pops during each "Train Round" event
* Represents global model aggregation

## 📊 Dynamic Accuracy Meter

* Accuracy updates after each training round
* Shows improvement across federated cycles

## 🔗 Etherscan Integration

* Each training round stores transaction hash
* Direct clickable link to view transaction on Etherscan

## 🖼️ Unique Picture Profile System

* Each participant gets a dynamic avatar
* Avatar visually represents node identity
* Enhances decentralization aesthetics
* Auto-generated for uniqueness

---

# 🔎 Source of Search / Data

* Synthetic medical dataset for simulation
* Scikit-learn classification model
* Logistic Regression for binary classification
* Training metrics stored after aggregation

---

# 📦 Project Structure

```
MedFed/
│
├── backend/
│   ├── app.py
│   ├── model.py
|   ├── blockchain.py
|   ├── federated.py
|   ├── hospital.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
|   │   ├── components/
|   │   ├── services/
|   │   ├── lib/
│   └── package.json
│
└── smart-contract/
    └── MedFed.sol
```

---

# ⚙️ Backend Setup

## 1️⃣ Create Virtual Environment

```bash
IMPORTANT: Verify python==3.11.9

python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate   # Windows
```

## 2️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

## 3️⃣ Run Backend

```bash
uvicorn app:app --reload
```

Backend runs at:

```
http://localhost:8000
```

---

# 💻 Frontend Setup

## 1️⃣ Navigate to frontend

```bash
cd frontend
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Run Development Server

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🔗 Smart Contract Deployment

1. Compile Solidity contract.
2. Deploy to Ethereum Testnet.
3. Copy deployed contract address.
4. Add contract address in frontend config.
5. Connect MetaMask wallet.

---

# 📸 Screenshots

## 🏠 Landing Page

## 🔄 Training Round Animation

## 📊 Accuracy Evolution

## 🔗 Etherscan Transaction View

---

# 🔐 Key Features

* Privacy-preserving federated learning
* Blockchain transparency
* Smart contract logging
* Dynamic UI animations
* Real-time accuracy updates
* Etherscan transaction verification

---

# 🌟 Unique Value Proposition

MedFed bridges the gap between:

🧠 Artificial Intelligence
🔐 Data Privacy
⛓ Blockchain Transparency
🏥 Healthcare Collaboration

It demonstrates how decentralized AI can be used responsibly in sensitive domains like healthcare.

---

# 📈 Future Enhancements

* Multi-hospital simulation
* Role-based authentication
* On-chain model weight hashing
* Advanced neural networks
* IPFS integration for decentralized storage
* Real-time dashboard analytics

---

# 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

---

# 📜 License

MIT License

---

# 👨‍💻 Author

Arpit Singh
AI & Blockchain Enthusiast

---

If you found this project interesting, consider giving it a ⭐ on GitHub!
