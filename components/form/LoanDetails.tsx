import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loanDetailsSchema } from '@/utils/validation';
import type { LoanDetails } from '@/utils/validation';
import Button from '@/components/ui/Button';
import { useLoanStore } from '@/store/loanStore';
import { useEffect, useState } from 'react';

const loanPurposes = [
  'Business',
  'Emergency',
  'Education',
  'Other',
];

export default function LoanDetails({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { formData, updateFormData } = useLoanStore();
  const [monthlyRepayment, setMonthlyRepayment] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<LoanDetails>({
    resolver: zodResolver(loanDetailsSchema),
    defaultValues: {
      loanAmount: formData.loanAmount || 1500,
      loanPurpose: formData.loanPurpose || '',
    },
  });

  const watchedAmount = watch('loanAmount');

  // Calculate monthly repayment (10% flat interest rate, 12 months)
  useEffect(() => {
    if (watchedAmount) {
      const interest = watchedAmount * 0.1;
      const total = watchedAmount + interest;
      const monthly = total / 12;
      setMonthlyRepayment(monthly);
    }
  }, [watchedAmount]);

  const onSubmit = (data: LoanDetails) => {
    updateFormData(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Loan amount: KSH {watchedAmount?.toLocaleString()}
        </label>
        <Controller
          name="loanAmount"
          control={control}
          render={({ field }) => (
            <input
              type="range"
              min={1500}
              max={50000}
              step={100}
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-kenya-green"
            />
          )}
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>KSH 1,500</span>
          <span>KSH 50,000</span>
        </div>
        {errors.loanAmount && (
          <p className="mt-1 text-sm text-red-600">{errors.loanAmount.message}</p>
        )}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-700">
          Estimated monthly repayment: <span className="font-bold text-kenya-green">KSH {monthlyRepayment.toFixed(0)}</span> (10% flat interest, 12 months)
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Loan purpose
        </label>
        <select
          {...register('loanPurpose')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kenya-green/50"
        >
          <option value="">Select purpose</option>
          {loanPurposes.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {errors.loanPurpose && (
          <p className="mt-1 text-sm text-red-600">{errors.loanPurpose.message}</p>
        )}
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button type="submit" variant="primary" className="flex-1">
          Next: Upload M-PESA
        </Button>
      </div>
    </form>
  );
}
