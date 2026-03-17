'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const targetAmount = 2400000; // KSH 2.4M
const targetLoans = 147;
const targetCustomers = 5892;

export default function LiveCounter() {
  const [amount, setAmount] = useState(0);
  const [loans, setLoans] = useState(0);
  const [customers, setCustomers] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      setAmount(Math.floor(targetAmount * progress));
      setLoans(Math.floor(targetLoans * progress));
      setCustomers(Math.floor(targetCustomers * progress));
      if (progress >= 1) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center"
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md">
        <div className="text-2xl font-bold text-kenya-green">KSH {amount.toLocaleString()}</div>
        <div className="text-sm text-gray-600">disbursed today</div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md">
        <div className="text-2xl font-bold text-kenya-green">{loans}</div>
        <div className="text-sm text-gray-600">loans approved today</div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md">
        <div className="text-2xl font-bold text-kenya-green">{customers.toLocaleString()}</div>
        <div className="text-sm text-gray-600">happy customers</div>
      </div>
    </motion.div>
  );
}
