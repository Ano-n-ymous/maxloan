import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewSchema } from '@/utils/validation';
import type { Review } from '@/utils/validation';
import Button from '@/components/ui/Button';
import { useLoanStore } from '@/store/loanStore';
import Image from 'next/image';

export default function ReviewSubmit({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { formData } = useLoanStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Review>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      acceptedTerms: formData.acceptedTerms || false,
    },
  });

  const onSubmit = (data: Review) => {
    // Just accept terms and move to payment
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
        <h3 className="font-semibold text-lg">Review your information</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="text-gray-600">Full name:</span>
          <span className="font-medium">{formData.fullName}</span>
          <span className="text-gray-600">ID number:</span>
          <span className="font-medium">{formData.idNumber}</span>
          <span className="text-gray-600">Phone:</span>
          <span className="font-medium">{formData.phoneNumber}</span>
          <span className="text-gray-600">Loan amount:</span>
          <span className="font-medium">KSH {formData.loanAmount?.toLocaleString()}</span>
          <span className="text-gray-600">Purpose:</span>
          <span className="font-medium">{formData.loanPurpose}</span>
          {formData.detectedIncome && (
            <>
              <span className="text-gray-600">Detected income:</span>
              <span className="font-medium">KSH {formData.detectedIncome?.toLocaleString()}</span>
            </>
          )}
        </div>
        {formData.mpesaScreenshot && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-1">Uploaded screenshot:</p>
            <div className="relative h-20 w-20">
              <Image
                src={formData.mpesaScreenshot}
                alt="Uploaded screenshot"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="terms"
          className="mt-1"
          {...register('acceptedTerms')}
        />
        <label htmlFor="terms" className="text-sm text-gray-600">
          I confirm that the information provided is accurate and I agree to the{' '}
          <a href="#" className="text-kenya-green underline">Terms & Conditions</a>.
        </label>
      </div>
      {errors.acceptedTerms && (
        <p className="text-sm text-red-600">{errors.acceptedTerms.message}</p>
      )}

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button type="submit" variant="primary" className="flex-1">
          Proceed to Payment
        </Button>
      </div>
    </form>
  );
}
