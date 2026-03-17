import { useCallback, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDropzone } from 'react-dropzone';
import { Upload as UploadIcon, Loader2 } from 'lucide-react';
import { uploadSchema } from '@/utils/validation';
import type { Upload } from '@/utils/validation';
import Button from '@/components/ui/Button';
import { useLoanStore } from '@/store/loanStore';
import { useLoanSimulation } from '@/hooks/useLoanSimulation';
import Image from 'next/image';

export default function UploadScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { formData, updateFormData } = useLoanStore();
  const [preview, setPreview] = useState<string | null>(formData.mpesaScreenshot || null);
  const { detectedIncome, suggestedAmount, isAnalyzing, simulateAnalysis } = useLoanSimulation();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Upload>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      mpesaScreenshot: formData.mpesaScreenshot || '',
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          setPreview(base64);
          setValue('mpesaScreenshot', base64, { shouldValidate: true });
          updateFormData({ mpesaScreenshot: base64 });
          simulateAnalysis();
        };
        reader.readAsDataURL(file);
      }
    },
    [setValue, updateFormData, simulateAnalysis]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxFiles: 1,
  });

  useEffect(() => {
    if (detectedIncome && suggestedAmount) {
      updateFormData({
        detectedIncome,
        loanAmount: suggestedAmount,
      });
    }
  }, [detectedIncome, suggestedAmount, updateFormData]);

  const onSubmit = (data: Upload) => {
    updateFormData(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
          isDragActive ? 'border-kenya-green bg-green-50' : 'border-gray-300 hover:border-kenya-green'
        }`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="relative h-40 w-full max-w-xs mx-auto">
            <Image
              src={preview}
              alt="M-PESA screenshot preview"
              fill
              className="object-contain rounded-lg"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <UploadIcon className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-gray-600">
              {isDragActive ? 'Drop the image here' : 'Drag & drop your M-PESA screenshot, or click to select'}
            </p>
            <p className="text-sm text-gray-500 mt-1">Accepts .jpg, .png (max 5MB)</p>
          </div>
        )}
      </div>
      {errors.mpesaScreenshot && (
        <p className="text-sm text-red-600">{errors.mpesaScreenshot.message}</p>
      )}

      {isAnalyzing && (
        <div className="flex items-center justify-center gap-2 text-kenya-green">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Analyzing your M-PESA statement...</span>
        </div>
      )}

      {detectedIncome && suggestedAmount && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-sm text-gray-700">
            We detected an average monthly income of{' '}
            <span className="font-bold text-kenya-green">KSH {detectedIncome.toLocaleString()}</span>
          </p>
          <p className="text-sm text-gray-700 mt-1">
            You qualify for up to{' '}
            <span className="font-bold text-kenya-green">KSH {suggestedAmount.toLocaleString()}</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            We've pre-filled the recommended amount. You can adjust it by going back to the Loan Details step.
          </p>
          <div className="mt-4 flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={onBack}>
              Adjust Amount
            </Button>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button type="submit" variant="primary" className="flex-1" disabled={!preview}>
          Next: Review
        </Button>
      </div>
    </form>
  );
}
