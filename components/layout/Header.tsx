import Link from 'next/link';
import { Landmark } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Landmark className="h-6 w-6 text-kenya-green" />
          <span>Max<span className="text-kenya-red">Loan</span></span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="#how-it-works" className="text-gray-600 hover:text-kenya-green">How it works</Link>
          <Link href="#apply" className="text-gray-600 hover:text-kenya-green">Apply</Link>
        </nav>
      </div>
    </header>
  );
}
