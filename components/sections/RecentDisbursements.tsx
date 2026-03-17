'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock } from 'lucide-react';

// Fake data pool – names partially masked for privacy
const recentLoans = [
  { name: 'John K.', location: 'Nairobi', amount: 15000, time: '2 min ago', quote: 'Nimepata pesa yangu!' },
  { name: 'Mary W.', location: 'Kiambu', amount: 30000, time: '5 min ago', quote: 'Asante MaxLoan, haraka sana.' },
  { name: 'Peter O.', location: 'Kisumu', amount: 45000, time: '8 min ago', quote: 'Imetumwa kwa M-PESA tayari.' },
  { name: 'Alice M.', location: 'Mombasa', amount: 20000, time: '12 min ago', quote: 'Hakuna shida, pesa imefika.' },
  { name: 'Brian O.', location: 'Nakuru', amount: 50000, time: '15 min ago', quote: 'Best loan app ever!' },
  { name: 'Grace N.', location: 'Thika', amount: 8000, time: '20 min ago', quote: 'Nilipata ndani ya dakika tano.' },
  { name: 'Daniel K.', location: 'Eldoret', amount: 25000, time: '25 min ago', quote: 'Inaaminika kabisa.' },
  { name: 'Sarah J.', location: 'Machakos', amount: 12000, time: '30 min ago', quote: 'Shukrani, pesa imeingia.' },
];

export default function RecentDisbursements() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % recentLoans.length);
    }, 5000); // change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const current = recentLoans[index];

  return (
    <section className="mt-24">
      <h2 className="text-3xl font-bold text-center mb-8">
        Live Loan Disbursements
      </h2>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center gap-2 text-kenya-green mb-4">
          <Clock className="h-5 w-5" />
          <span className="text-sm font-medium">Just moments ago...</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-kenya-green/10 flex items-center justify-center text-kenya-green text-2xl font-bold mb-3">
              {current.name.charAt(0)}
            </div>
            <p className="text-xl font-semibold">{current.name}</p>
            <p className="text-sm text-gray-500">{current.location}</p>
            <div className="mt-3 flex items-center gap-2 text-kenya-green">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">KSH {current.amount.toLocaleString()}</span>
            </div>
            <p className="mt-3 text-gray-700 italic">"{current.quote}"</p>
            <p className="mt-2 text-xs text-gray-400">{current.time}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
