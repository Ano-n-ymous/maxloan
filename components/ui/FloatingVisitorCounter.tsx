'use client';

import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

export default function FloatingVisitorCounter() {
  const [count, setCount] = useState(38);

  useEffect(() => {
    const interval = setInterval(() => {
      // Random fluctuation between 30 and 60
      setCount(30 + Math.floor(Math.random() * 31));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-20 left-4 z-40 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200 flex items-center gap-2 text-sm">
      <Users className="h-4 w-4 text-kenya-green" />
      <span className="font-medium">{count} people viewing</span>
    </div>
  );
}
