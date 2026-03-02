import { motion } from 'framer-motion';
import { Activity, Wallet } from 'lucide-react';

interface NavbarProps {
  currentRound: number;
  isConnected: boolean;
  onConnect: () => void;
}

export function Navbar({ currentRound, isConnected, onConnect }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                MedFed
              </h1>
              <p className="text-xs text-gray-400">Decentralized Federated Medical AI</p>
            </div>
          </motion.div>

          <div className="flex items-center space-x-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-cyan-400">Network Active</span>
              </div>

              <div className="px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <span className="text-sm text-purple-400">Round #{currentRound}</span>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onConnect}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all ${
                isConnected
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                  : 'bg-white/10 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>{isConnected ? '0x7a4f...b2c9' : 'Connect Wallet'}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
}
