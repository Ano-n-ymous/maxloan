import { z } from 'zod';

export const personalInfoSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  idNumber: z.string().regex(/^\d{5,8}$/, 'ID number must be 5-8 digits'),
  phoneNumber: z.string().regex(/^(07|01)\d{8}$|^(2547|2541)\d{8}$/, 'Enter a valid Kenyan phone number (e.g., 0712345678)'),
});

export const loanDetailsSchema = z.object({
  loanAmount: z.number()
    .min(1500, 'Minimum loan amount is KSH 1,500')
    .max(50000, 'Maximum loan amount is KSH 50,000'),
  loanPurpose: z.string().min(1, 'Please select a purpose'),
});

export const uploadSchema = z.object({
  mpesaScreenshot: z.string().min(1, 'Please upload your M-PESA screenshot'),
});

export const reviewSchema = z.object({
  acceptedTerms: z.boolean().refine(val => val === true, 'You must accept the terms'),
});

export const paymentSchema = z.object({
  mpesaPaymentMessage: z.string().min(10, 'Please paste the M-PESA confirmation message'),
});

export const fullApplicationSchema = personalInfoSchema
  .merge(loanDetailsSchema)
  .merge(uploadSchema)
  .merge(reviewSchema)
  .merge(paymentSchema);

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type LoanDetails = z.infer<typeof loanDetailsSchema>;
export type Upload = z.infer<typeof uploadSchema>;
export type Review = z.infer<typeof reviewSchema>;
export type Payment = z.infer<typeof paymentSchema>;
export type FullApplication = z.infer<typeof fullApplicationSchema>;
