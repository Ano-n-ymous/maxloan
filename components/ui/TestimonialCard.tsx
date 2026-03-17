import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  location: string;
  amount: string;
  time: string;
  quote: string;
}

export default function TestimonialCard({
  name,
  location,
  amount,
  time,
  quote,
}: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 relative">
      <Quote className="absolute top-4 right-4 h-8 w-8 text-kenya-green/20" />
      <p className="text-gray-700 mb-4 italic">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-kenya-green/20 flex items-center justify-center text-kenya-green font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-500">
            {location} • got {amount} in {time}
          </p>
        </div>
      </div>
    </div>
  );
}
