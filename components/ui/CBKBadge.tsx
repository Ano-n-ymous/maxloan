'use client';

import { useState } from 'react';
import { Shield } from 'lucide-react';

export default function CBKBadge() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        className="flex items-center gap-2 bg-trust-blue/10 text-trust-blue px-4 py-2 rounded-full border border-trust-blue/30 cursor-help trust-badge"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Shield className="h-4 w-4" />
        <span className="text-sm font-medium">Licensed by CBK</span>
      </div>
      {showTooltip && (
        <div className="absolute z-10 w-64 p-2 mt-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -left-1/2 transform -translate-x-1/2">
          MaxLoan is fully licensed and regulated by the Central Bank of Kenya (License No. CBK/DC/2025/0123).
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-gray-900" />
        </div>
      )}
    </div>
  );
}
