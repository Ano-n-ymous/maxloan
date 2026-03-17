'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';

const notifications = [
  { name: 'Mary W.', location: 'Mombasa', amount: 25000 },
  { name: 'John K.', location: 'Nairobi', amount: 40000 },
  { name: 'Alice M.', location: 'Kisumu', amount: 15000 },
  { name: 'Peter O.', location: 'Eldoret', amount: 30000 },
  { name: 'Grace N.', location: 'Thika', amount: 22000 },
];

export default function RotatingNotification() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % notifications.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const current = notifications[index];

  return (
    <div className="fixed top-24 right-4 z-40 max-w-xs bg-white/90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 p-3 hidden md:block">
      <div className="flex items-start gap-2">
        <Bell className="h-4 w-4 text-kenya-green mt-1 animate-pulse" />
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-sm"
          >
            <p className="font-medium">Just approved</p>
            <p className="text-gray-600">
              {current.name} from {current.location} got{' '}
              <span className="font-bold text-kenya-green">KSH {current.amount.toLocaleString()}</span>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
