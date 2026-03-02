export interface Hospital {
  id: string;
  name: string;
  accuracy: number;
  samples: number;
  contribution: number;
  lastUpdateHash: string;
  status: 'training' | 'synced';
  wallet: string;
}

export interface BlockchainTransaction {
  id: string;
  hospital: string;
  wallet: string;
  updateHash: string;
  timestamp: string;
}

export interface TrainingRound {
  global_accuracy: number;
  round: number;
  blockchain_confirmations: number;
  total_updates: number;
  hospitals: Hospital[];
}
