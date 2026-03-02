import { motion } from 'framer-motion';
import { TrendingUp, Layers, RefreshCw, CheckCircle } from 'lucide-react';

interface MetricCardsProps {
  globalAccuracy: number;
  currentRound: number;
  totalUpdates: number;
  blockchainConfirmations: number;
}

export function MetricCards({
  globalAccuracy,
  currentRound,
  totalUpdates,
  blockchainConfirmations,
}: MetricCardsProps) {
  const metrics = [
    {
      icon: TrendingUp,
      label: 'Global Accuracy',
      value: `${globalAccuracy.toFixed(1)}%`,
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
    },
    {
      icon: Layers,
      label: 'Training Round',
      value: `#${currentRound}`,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
    },
    {
      icon: RefreshCw,
      label: 'Total Updates',
      value: totalUpdates.toString(),
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
    },
    {
      icon: CheckCircle,
      label: 'Blockchain Confirmations',
      value: blockchainConfirmations.toString(),
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`relative backdrop-blur-lg ${metric.bgColor} border ${metric.borderColor} rounded-xl p-6 overflow-hidden group hover:scale-105 transition-transform duration-300`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${metric.color}`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>

            <h3 className="text-sm text-gray-400 mb-2">{metric.label}</h3>
            <p className="text-3xl font-bold text-white">{metric.value}</p>

            <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`h-full bg-gradient-to-r ${metric.color}`}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
