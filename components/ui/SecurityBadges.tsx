import { Shield, Lock, Eye } from 'lucide-react';

export default function SecurityBadges() {
  return (
    <div className="flex flex-wrap gap-4 justify-center text-xs text-gray-600 mt-4">
      <div className="security-badge">
        <Shield className="h-4 w-4" />
        <span>256‑bit SSL</span>
      </div>
      <div className="security-badge">
        <Lock className="h-4 w-4" />
        <span>Data Protection</span>
      </div>
      <div className="security-badge">
        <Eye className="h-4 w-4" />
        <span>Privacy First</span>
      </div>
    </div>
  );
}
