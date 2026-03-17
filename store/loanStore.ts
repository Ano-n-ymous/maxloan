import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LoanStore, Step, LoanApplication } from '@/types';

const initialState: Partial<LoanApplication> = {
  fullName: '',
  idNumber: '',
  phoneNumber: '',
  loanAmount: 1500,
  loanPurpose: '',
  mpesaScreenshot: '',
  detectedIncome: undefined,
  verificationFeePaid: false,
  mpesaPaymentMessage: '',
  acceptedTerms: false,
};

export const useLoanStore = create<LoanStore>()(
  persist(
    (set) => ({
      currentStep: 'personal',
      formData: initialState,
      isSubmitted: false,
      setStep: (step) => set({ currentStep: step }),
      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      resetStore: () =>
        set({
          currentStep: 'personal',
          formData: initialState,
          isSubmitted: false,
        }),
    }),
    {
      name: 'maxloan-storage',
    }
  )
);
