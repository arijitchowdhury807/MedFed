import { useState, useEffect } from 'react';
import { connectWallet } from "./lib/wallet";
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { trainRound } from "./services/api";
import { Navbar } from './components/Navbar';
import { Scene3D } from './components/Scene3D';
import { MetricCards } from './components/MetricCards';
import { HospitalPanels } from './components/HospitalPanels';
import { ContributionGraph } from './components/ContributionGraph';
import { BlockchainActivity } from './components/BlockchainActivity';
import { Hospital, BlockchainTransaction } from './types';

function App() {
  // const [isConnected, setIsConnected] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [currentRound, setCurrentRound] = useState(12);
  const [globalAccuracy, setGlobalAccuracy] = useState(87.3);
  const [totalUpdates, setTotalUpdates] = useState(156);
  const [blockchainConfirmations, setBlockchainConfirmations] = useState(48);

  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([]);

  const handleConnect = async () => {
    const wallet = await connectWallet();
      if (wallet) {
        setWalletAddress(wallet.address);
      }
    };

  const handleTrainRound = async () => {
    if (!walletAddress) {
      alert("Connect wallet first");
      return;
    }

    try {
      setIsTraining(true);

      setIsPulsing(true);

      const data = await trainRound(walletAddress);

      // update round
      setCurrentRound(data.round);

      // update global accuracy
      setGlobalAccuracy(data.global_accuracy*100);

      // update hospitals
      setHospitals(
        data.hospitals.map((h) => ({
          ...h,
          accuracy: h.accuracy,
        }))
      );

      // push blockchain tx
      const newTx = {
        id: Date.now().toString(),
        hospital: "Global Aggregator",
        wallet: walletAddress,
        updateHash: data.txHash,
        timestamp: "Just now",
      };

      setTransactions((prev) => [newTx, ...prev]);

    } catch (err) {
      console.error(err);
    } finally {
      setIsTraining(false);
    }

    // 🔥 STOP GLOBE ANIMATION AFTER SHORT DELAY
    setTimeout(() => {
      setIsPulsing(false);
    }, 800);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setWalletAddress(accounts[0] || null);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />

      <Navbar
        currentRound={currentRound}
        walletAddress={walletAddress}
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
