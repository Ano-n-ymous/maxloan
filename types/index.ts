export type LoanApplication = {
  fullName: string;
  idNumber: string;
  phoneNumber: string;
  loanAmount: number;
  loanPurpose: string;
  mpesaScreenshot?: string;
  detectedIncome?: number;
  verificationFeePaid?: boolean;
  mpesaPaymentMessage?: string;
  acceptedTerms?: boolean;
  appliedAt: string;
};

export type Step = 'personal' | 'loan' | 'upload' | 'review' | 'payment';

export type LoanStore = {
  currentStep: Step;
  formData: Partial<LoanApplication>;
  isSubmitted: boolean;
  setStep: (step: Step) => void;
  updateFormData: (data: Partial<LoanApplication>) => void;
  resetStore: () => void;
};
