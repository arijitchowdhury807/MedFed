import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Hospital } from '../types';

interface ContributionGraphProps {
  hospitals: Hospital[];
}

export function ContributionGraph({ hospitals }: ContributionGraphProps) {
  const data = hospitals.map((hospital) => ({
    name: hospital.name.replace('Hospital ', ''),
    contribution: hospital.contribution,
    accuracy: hospital.accuracy,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-6"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Contribution Distribution</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis
            dataKey="name"
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
            label={{ value: 'Contribution (%)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(17, 24, 39, 0.95)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: '8px',
              color: '#fff',
            }}
            cursor={{ fill: 'rgba(6, 182, 212, 0.1)' }}
          />
          <Bar
            dataKey="contribution"
            fill="url(#colorGradient)"
            radius={[8, 8, 0, 0]}
            animationDuration={1000}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={1} />
              <stop offset="100%" stopColor="#a855f7" stopOpacity={1} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
