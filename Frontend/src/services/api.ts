const BASE_URL = "http://127.0.0.1:8000";

export interface TrainRoundResponse {
  round: number;
  global_accuracy: number;
  txHash: string;
  model_hash?: string;
  hospitals: {
    id: string;
    accuracy: number;
    samples: number;
  }[];
}

export async function trainRound(wallet: string): Promise<TrainRoundResponse> {
  const res = await fetch(`${BASE_URL}/train_round`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ wallet }),
  });

  if (!res.ok) {
    throw new Error("Failed to train round");
  }

  return res.json();
}

// export async function trainMultiple(rounds: number) {
//   const res = await fetch(`${BASE_URL}/train_multiple/${rounds}`);
//   if (!res.ok) {
//     throw new Error("Failed to train multiple rounds");
//   }
//   return res.json();
// }