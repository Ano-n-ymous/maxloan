'use client';

import { useState, useEffect } from 'react';
import Button from './Button';
import { ArrowUp } from 'lucide-react';

export default function FloatingCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 md:hidden">
      <Button onClick={scrollToForm} className="rounded-full shadow-lg flex items-center gap-2">
        <ArrowUp className="h-4 w-4" />
        Apply Now
      </Button>
    </div>
  );
}
