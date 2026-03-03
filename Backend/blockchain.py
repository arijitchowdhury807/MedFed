from web3 import Web3
import json
import os
from dotenv import load_dotenv

load_dotenv()

# 🔥 Replace with your Alchemy / Infura RPC
RPC_URL = os.getenv("SEPOLIA_RPC")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")

w3 = Web3(Web3.HTTPProvider(RPC_URL))

# Your deployed contract address
contract_address = Web3.to_checksum_address(
    "0x54c136af578462ae74a737c5d2f0900d436b3846"
)

# Paste FULL ABI JSON here
abi = json.loads("""[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_hash",
				"type": "string"
			}
		],
		"name": "storeModelHash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getUpdate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalUpdates",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "updates",
		"outputs": [
			{
				"internalType": "string",
				"name": "modelHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}]""")

contract = w3.eth.contract(address=contract_address, abi=abi)

account = w3.eth.account.from_key(PRIVATE_KEY)

def store_hash(hash_value):
    nonce = w3.eth.get_transaction_count(account.address)

    tx = contract.functions.storeModelHash(hash_value).build_transaction({
        "from": account.address,
        "nonce": nonce,
        "gas": 200000,
        "gasPrice": w3.to_wei("10", "gwei"),
        "chainId": 11155111
    })

    signed_tx = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)

    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    return tx_hash.hex()