import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentSchema } from '@/utils/validation';
import type { Payment } from '@/utils/validation';
import Button from '@/components/ui/Button';
import { useLoanStore } from '@/store/loanStore';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LoanApplication } from '@/types';
import confetti from 'canvas-confetti';
import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function PaymentStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { formData, updateFormData } = useLoanStore();
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<'valid' | 'invalid' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applications, setApplications] = useLocalStorage<LoanApplication[]>('maxloan_applications', []);

  const loanAmount = formData.loanAmount || 0;

  // Calculate fee based on loan amount tiers
  const getFee = (amount: number): number => {
    if (amount <= 5000) return 300;
    if (amount <= 30000) return 500;
    return 600;
  };

  const fee = getFee(loanAmount);
  const tillNumber = '400200'; // Example till number

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Payment>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      mpesaPaymentMessage: formData.mpesaPaymentMessage || '',
    },
  });

  const message = watch('mpesaPaymentMessage');

  // Reset validation result when message changes
  useEffect(() => {
    if (validationResult === 'invalid') {
      setValidationResult(null);
    }
  }, [message]);

  const validatePayment = (msg: string) => {
    setIsValidating(true);
    // Simulate API call to check payment
    setTimeout(() => {
      // For demo, we accept any message containing "confirmed" or amount matching fee
      const lower = msg.toLowerCase();
      const hasConfirmed = lower.includes('confirmed') || lower.includes('received');
      const hasAmount = msg.includes(fee.toString());
      if (hasConfirmed && hasAmount) {
        setValidationResult('valid');
        updateFormData({ mpesaPaymentMessage: msg, verificationFeePaid: true });
      } else {
        setValidationResult('invalid');
      }
      setIsValidating(false);
    }, 1000);
  };

  const onSubmit = async (data: Payment) => {
    if (validationResult === 'valid') {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Prepare final application
      const application: LoanApplication = {
        fullName: formData.fullName!,
        idNumber: formData.idNumber!,
        phoneNumber: formData.phoneNumber!,
        loanAmount: formData.loanAmount!,
        loanPurpose: formData.loanPurpose!,
        mpesaScreenshot: formData.mpesaScreenshot,
        detectedIncome: formData.detectedIncome,
        verificationFeePaid: true,
        mpesaPaymentMessage: data.mpesaPaymentMessage,
        appliedAt: new Date().toISOString(),
      };

      // Save to localStorage
      setApplications([...applications, application]);

      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      setIsSubmitting(false);
      onNext(); // This will trigger success modal
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-yellow-600" />
          Verification Fee Required
        </h3>
        <p className="text-sm text-gray-700">
          To confirm your loan application, please pay a verification fee of{' '}
          <span className="font-bold text-kenya-green">KSH {fee.toLocaleString()}</span>.
        </p>
        <div className="mt-4 p-3 bg-white rounded border border-gray-200">
          <p className="text-sm font-medium">Pay via M-PESA:</p>
          <p className="text-lg font-bold">Till Number: <span className="text-kenya-green">{tillNumber}</span></p>
          <p className="text-sm text-gray-600">Business Name: MAXLOAN LTD</p>
          <p className="text-sm text-gray-600 mt-1">Amount: KSH {fee.toLocaleString()}</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Paste M-PESA confirmation message
        </label>
        <textarea
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kenya-green/50"
          placeholder="Paste the M-PESA message you received after payment..."
          {...register('mpesaPaymentMessage')}
        />
        {errors.mpesaPaymentMessage && (
          <p className="mt-1 text-sm text-red-600">{errors.mpesaPaymentMessage.message}</p>
        )}
      </div>

      {message && (
        <Button
          type="button"
          variant="outline"
          onClick={() => validatePayment(message)}
          disabled={isValidating || validationResult === 'valid'}
          className="w-full"
        >
          {isValidating ? 'Validating...' : 'Verify Payment'}
        </Button>
      )}

      {validationResult === 'valid' && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-kenya-green flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-700 font-medium">Payment verified successfully!</p>
            <p className="text-xs text-gray-500">You can now proceed to submit your application.</p>
          </div>
        </div>
      )}

      {validationResult === 'invalid' && (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-700 font-medium">Payment verification failed</p>
            <p className="text-xs text-gray-500">Please check the message and try again.</p>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          disabled={validationResult !== 'valid' || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Complete Application'}
        </Button>
      </div>
    </form>
  );
}
