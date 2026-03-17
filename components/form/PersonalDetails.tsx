import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema } from '@/utils/validation';
import type { PersonalInfo } from '@/utils/validation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useLoanStore } from '@/store/loanStore';

export default function PersonalDetails({ onNext }: { onNext: () => void }) {
  const { formData, updateFormData } = useLoanStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: formData.fullName,
      idNumber: formData.idNumber,
      phoneNumber: formData.phoneNumber,
    },
  });

  const onSubmit = (data: PersonalInfo) => {
    updateFormData(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Full name"
        placeholder="John Doe"
        error={errors.fullName?.message}
        {...register('fullName')}
      />
      <Input
        label="ID number"
        placeholder="12345678"
        error={errors.idNumber?.message}
        {...register('idNumber')}
      />
      <Input
        label="Phone number"
        placeholder="0712 345 678"
        error={errors.phoneNumber?.message}
        {...register('phoneNumber')}
      />
      <Button type="submit" variant="primary" className="w-full">
        Next: Loan Details
      </Button>
    </form>
  );
}
