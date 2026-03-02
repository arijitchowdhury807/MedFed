import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Scene3D } from './components/Scene3D';
import { MetricCards } from './components/MetricCards';
import { HospitalPanels } from './components/HospitalPanels';
import { ContributionGraph } from './components/ContributionGraph';
import { BlockchainActivity } from './components/BlockchainActivity';
import { Hospital, BlockchainTransaction } from './types';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [currentRound, setCurrentRound] = useState(12);
  const [globalAccuracy, setGlobalAccuracy] = useState(87.3);
  const [totalUpdates, setTotalUpdates] = useState(156);
  const [blockchainConfirmations, setBlockchainConfirmations] = useState(48);

  const [hospitals, setHospitals] = useState<Hospital[]>([
    {
      id: '1',
      name: 'Hospital A',
      accuracy: 85.2,
      samples: 12500,
      contribution: 28.5,
      lastUpdateHash: '0x7f3a...b92c',
      status: 'synced',
      wallet: '0x1234...5678',
    },
    {
      id: '2',
      name: 'Hospital B',
      accuracy: 83.7,
      samples: 9800,
      contribution: 22.3,
      lastUpdateHash: '0x9e2c...4d1f',
      status: 'synced',
      wallet: '0x8765...4321',
    },
    {
      id: '3',
      name: 'Hospital C',
      accuracy: 89.1,
      samples: 15200,
      contribution: 34.6,
      lastUpdateHash: '0x4b8a...7e3d',
      status: 'synced',
      wallet: '0xabcd...ef01',
    },
    {
      id: '4',
      name: 'Hospital D',
      accuracy: 82.4,
      samples: 7600,
      contribution: 17.3,
      lastUpdateHash: '0x2c5f...9a1b',
      status: 'synced',
      wallet: '0x2468...1357',
    },
    {
      id: '5',
      name: 'Hospital E',
      accuracy: 86.8,
      samples: 11400,
      contribution: 25.9,
      lastUpdateHash: '0x6d9e...3f2a',
      status: 'synced',
      wallet: '0x9876...5432',
    },
  ]);

  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([
    {
      id: '1',
      hospital: 'Hospital C',
      wallet: '0xabcd...ef01',
      updateHash: '0x4b8a...7e3d',
      timestamp: '2 min ago',
    },
    {
      id: '2',
      hospital: 'Hospital A',
      wallet: '0x1234...5678',
      updateHash: '0x7f3a...b92c',
      timestamp: '5 min ago',
    },
    {
      id: '3',
      hospital: 'Hospital E',
      wallet: '0x9876...5432',
      updateHash: '0x6d9e...3f2a',
      timestamp: '8 min ago',
    },
    {
      id: '4',
      hospital: 'Hospital B',
      wallet: '0x8765...4321',
      updateHash: '0x9e2c...4d1f',
      timestamp: '12 min ago',
    },
    {
      id: '5',
      hospital: 'Hospital D',
      wallet: '0x2468...1357',
      updateHash: '0x2c5f...9a1b',
      timestamp: '15 min ago',
    },
  ]);

  const handleConnect = () => {
    setIsConnected(!isConnected);
  };

  const handleTrainRound = async () => {
    if (isTraining) return;

    setIsTraining(true);
    setIsPulsing(true);

    setHospitals((prev) =>
      prev.map((h) => ({ ...h, status: 'training' as const }))
    );

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const newAccuracies = hospitals.map((h) => ({
      ...h,
      accuracy: Math.min(99, h.accuracy + Math.random() * 2),
      status: 'synced' as const,
      lastUpdateHash: `0x${Math.random().toString(16).substr(2, 4)}...${Math.random().toString(16).substr(2, 4)}`,
    }));

    setHospitals(newAccuracies);

    const avgAccuracy = newAccuracies.reduce((sum, h) => sum + h.accuracy, 0) / newAccuracies.length;
    setGlobalAccuracy(Math.min(99, avgAccuracy + Math.random()));

    setCurrentRound((prev) => prev + 1);
    setTotalUpdates((prev) => prev + hospitals.length);
    setBlockchainConfirmations((prev) => prev + hospitals.length);

    const newTx: BlockchainTransaction = {
      id: Date.now().toString(),
      hospital: 'All Nodes',
      wallet: '0xGlobal...Model',
      updateHash: `0x${Math.random().toString(16).substr(2, 4)}...${Math.random().toString(16).substr(2, 4)}`,
      timestamp: 'Just now',
    };
    setTransactions((prev) => [newTx, ...prev.slice(0, 4)]);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsPulsing(false);
    setIsTraining(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />

      <Navbar
        currentRound={currentRound}
        isConnected={isConnected}
        onConnect={handleConnect}
      />

      <div className="relative z-10 pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Federated Learning Network
            </h1>
            <p className="text-gray-400 text-lg">
              Real-time visualization of decentralized medical AI training
            </p>
          </motion.div>

          <MetricCards
            globalAccuracy={globalAccuracy}
            currentRound={currentRound}
            totalUpdates={totalUpdates}
            blockchainConfirmations={blockchainConfirmations}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="backdrop-blur-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-6 overflow-hidden"
          >
            <Scene3D
              hospitals={hospitals}
              globalAccuracy={globalAccuracy}
              isPulsing={isPulsing}
            />

            <div className="flex justify-center mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleTrainRound}
                disabled={isTraining}
                className={`relative px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                  isTraining
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/50'
                }`}
              >
                {isTraining ? (
                  <span className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 animate-pulse" />
                    <span>Training in Progress...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Train New Round</span>
                  </span>
                )}
              </motion.button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <HospitalPanels hospitals={hospitals} />
            </div>

            <div className="space-y-8">
              <ContributionGraph hospitals={hospitals} />
              <BlockchainActivity transactions={transactions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
