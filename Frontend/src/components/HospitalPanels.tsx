import { motion } from 'framer-motion';
import { Building2, Database, Hash, CheckCircle, Loader } from 'lucide-react';
import { Hospital } from '../types';

interface HospitalPanelsProps {
  hospitals: Hospital[];
}

export function HospitalPanels({ hospitals }: HospitalPanelsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">Hospital Nodes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hospitals.map((hospital, index) => (
          <motion.div
            key={hospital.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="backdrop-blur-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{hospital.name}</h3>
                  <p className="text-xs text-gray-400">Node {hospital.id}</p>
                </div>
              </div>

              {hospital.status === 'training' ? (
                <Loader className="w-5 h-5 text-purple-400 animate-spin" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-400" />
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Local Accuracy</span>
                <span className="text-lg font-bold text-cyan-400">
                  {hospital.accuracy.toFixed(1)}%
                </span>
              </div>

              <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${hospital.accuracy}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                />
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <Database className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Dataset Size:</span>
                <span className="text-white font-medium">{hospital.samples.toLocaleString()}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <Hash className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Update Hash:</span>
                <span className="text-purple-400 font-mono text-xs">
                  {hospital.lastUpdateHash}
                </span>
              </div>

              <div className="pt-3 border-t border-gray-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Contribution</span>
                  <span className="text-sm font-bold text-purple-400">
                    {hospital.contribution.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
