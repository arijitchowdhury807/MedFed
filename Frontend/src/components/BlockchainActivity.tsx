import { motion } from 'framer-motion';
import { Link2, Clock, Wallet } from 'lucide-react';
import { BlockchainTransaction } from '../types';

interface BlockchainActivityProps {
  transactions: BlockchainTransaction[];
}

export function BlockchainActivity({ transactions }: BlockchainActivityProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Blockchain Activity</h2>
        <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-green-500/20 border border-green-500/30">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-green-400">Live</span>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {transactions.map((tx, index) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group bg-black/30 border border-gray-700/50 hover:border-cyan-500/50 rounded-lg p-4 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Link2 className="w-4 h-4 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-semibold text-white">{tx.hospital}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-400">Model Update</span>
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <Wallet className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-purple-400 font-mono truncate">
                      {tx.wallet}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">Hash:</span>
                    <a
                      href={`https://sepolia.etherscan.io/tx/${tx.updateHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-400 font-mono bg-black/50 px-2 py-1 rounded truncate hover:text-cyan-300 hover:bg-cyan-500/10 transition-all duration-200"
                    >
                      {tx.updateHash.slice(0, 10)}...{tx.updateHash.slice(-6)}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs text-gray-400 flex-shrink-0 ml-4">
                <Clock className="w-3 h-3" />
                <span>{tx.timestamp}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
