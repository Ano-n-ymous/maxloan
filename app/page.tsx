import React from 'react';
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap, Users } from 'lucide-react';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import TestimonialCard from '@/components/ui/TestimonialCard';
import PersonalDetails from '@/components/form/PersonalDetails';
import LoanDetails from '@/components/form/LoanDetails';
import UploadScreen from '@/components/form/UploadScreen';
import ReviewSubmit from '@/components/form/ReviewSubmit';
import PaymentStep from '@/components/form/PaymentStep';
import SuccessModal from '@/components/ui/SuccessModal';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import RecentDisbursements from '@/components/sections/RecentDisbursements';
import FloatingCTA from '@/components/ui/FloatingCTA';
import LiveCounter from '@/components/ui/LiveCounter';
import CBKBadge from '@/components/ui/CBKBadge';
import SecurityBadges from '@/components/ui/SecurityBadges';
import FloatingVisitorCounter from '@/components/ui/FloatingVisitorCounter';
import RotatingNotification from '@/components/ui/RotatingNotification';
import { useLoanStore } from '@/store/loanStore';

export default function Home() {
  const formRef = useRef<HTMLElement>(null);
  const { currentStep, setStep } = useLoanStore();
  const [showSuccess, setShowSuccess] = useState(false);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const stepComponents: Record<string, JSX.Element> = {
    personal: <PersonalDetails onNext={() => setStep('loan')} />,
    loan: (
      <LoanDetails
        onNext={() => setStep('upload')}
        onBack={() => setStep('personal')}
      />
    ),
    upload: (
      <UploadScreen
        onNext={() => setStep('review')}
        onBack={() => setStep('loan')}
      />
    ),
    review: (
      <ReviewSubmit
        onNext={() => setStep('payment')}
        onBack={() => setStep('upload')}
      />
    ),
    payment: (
      <PaymentStep
        onNext={() => setShowSuccess(true)}
        onBack={() => setStep('review')}
      />
    ),
  };

  const stepNumbers = {
    personal: 1,
    loan: 2,
    upload: 3,
    review: 4,
    payment: 5,
  };

  const stepTitles = {
    personal: 'Personal Details',
    loan: 'Loan Details',
    upload: 'Upload M-PESA',
    review: 'Review & Submit',
    payment: 'Verification Fee',
  };

  const stepNames = ['Personal', 'Loan', 'Upload', 'Review', 'Payment'];

  const testimonials = [
    {
      name: 'John Ochieng',
      location: 'Nairobi',
      amount: 'KSH 30,000',
      time: '3 minutes',
      quote: 'Nilipata pesa ndani ya dakika tatu! Asante MaxLoan.',
    },
    {
      name: 'Wanjiku Mwangi',
      location: 'Kiambu',
      amount: 'KSH 45,000',
      time: '5 minutes',
      quote: 'Hakuna stress, hakuna paperwork. Really quick and easy.',
    },
    {
      name: 'Brian Odhiambo',
      location: 'Kisumu',
      amount: 'KSH 20,000',
      time: '4 minutes',
      quote: 'Niliomba usiku, nikapata asubuhi. Best service ever!',
    },
  ];

  return (
    <>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif">
            Get instant cash up to{' '}
            <span className="text-kenya-green">KSH 50,000</span> –<br />
            no paperwork, just your M-PESA.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Karibu! Apply in minutes, get money in your M-PESA within 5 minutes.
          </p>
          <Button size="lg" className="animate-pulse-soft" onClick={scrollToForm}>
            Apply Now <ChevronRight className="ml-2 h-5 w-5" />
          </Button>

          {/* Trust Badges with Interactive CBK Badge */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <CBKBadge />
            <div className="trust-badge">
              <Zap className="h-5 w-5 text-kenya-green" />
              <span>Disbursed in 5 minutes</span>
            </div>
            <div className="trust-badge">
              <Users className="h-5 w-5 text-kenya-green" />
              <span>100K+ happy customers</span>
            </div>
          </div>

          {/* Live Social Proof Counter */}
          <LiveCounter />
        </motion.section>

        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Fill application',
                desc: 'Enter your details, loan amount, and purpose.',
                icon: '📝',
              },
              {
                step: '2',
                title: 'Upload M-PESA',
                desc: 'Screenshot of your M-PESA statement.',
                icon: '📸',
              },
              {
                step: '3',
                title: 'Pay verification fee',
                desc: 'Tiered fee to confirm your application.',
                icon: '💰',
              },
              {
                step: '4',
                title: 'Get cash',
                desc: 'We send the loan to your M-PESA.',
                icon: '💸',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white p-6 rounded-xl shadow-md border-t-4 border-kenya-green hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">
                  <span className="text-kenya-red">{item.step}.</span> {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            What our customers say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Live Loan Disbursements */}
        <RecentDisbursements />

        {/* Multi-step Application Form */}
        <motion.section
          ref={formRef}
          id="application-form"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="bg-kenya-green text-white px-3 py-1 rounded-full text-sm">
              Step {stepNumbers[currentStep]} of 5
            </span>
            {stepTitles[currentStep]}
          </h2>
          <ProgressBar currentStep={stepNumbers[currentStep]} totalSteps={5} stepNames={stepNames} />

          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {stepComponents[currentStep]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Security badges under form */}
          <SecurityBadges />

          <p className="text-sm text-gray-500 mt-4 text-center">
            Asante for choosing MaxLoan – your data is secure.
          </p>
        </motion.section>
      </div>

      {/* Floating elements */}
      <FloatingVisitorCounter />
      <RotatingNotification />
      <FloatingCTA />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          useLoanStore.getState().resetStore();
        }}
        phoneNumber={useLoanStore.getState().formData.phoneNumber || ''}
        loanAmount={useLoanStore.getState().formData.loanAmount || 0}
      />
    </>
  );
}
