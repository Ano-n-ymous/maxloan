import { Shield, Clock, ThumbsUp } from 'lucide-react';

export default function WhyChooseUs() {
  return (
    <section className="mt-24">
      <h2 className="text-3xl font-bold text-center mb-12">Why Kenyans choose MaxLoan</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-kenya-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-kenya-green" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Licensed & Secure</h3>
          <p className="text-gray-600">Fully regulated by the Central Bank of Kenya. Your data is encrypted.</p>
        </div>
        <div className="text-center">
          <div className="bg-kenya-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="h-8 w-8 text-kenya-green" />
          </div>
          <h3 className="text-xl font-semibold mb-2">5-Minute Disbursement</h3>
          <p className="text-gray-600">Get cash sent directly to your M-PESA within minutes.</p>
        </div>
        <div className="text-center">
          <div className="bg-kenya-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ThumbsUp className="h-8 w-8 text-kenya-green" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Hidden Fees</h3>
          <p className="text-gray-600">Transparent interest rates. What you see is what you pay.</p>
        </div>
      </div>
    </section>
  );
}
