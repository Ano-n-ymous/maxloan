import { useState, useEffect } from 'react';

export function useLoanSimulation(loanAmount?: number) {
  const [detectedIncome, setDetectedIncome] = useState<number | null>(null);
  const [suggestedAmount, setSuggestedAmount] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate API delay
    setTimeout(() => {
      // Random income between 10,000 and 100,000
      const income = Math.floor(Math.random() * 90000) + 10000;
      setDetectedIncome(income);
      // Suggest 50% of income, but not exceeding 50,000
      const suggest = Math.min(Math.floor(income * 0.5), 50000);
      setSuggestedAmount(suggest);
      setIsAnalyzing(false);
    }, 2000);
  };

  return {
    detectedIncome,
    suggestedAmount,
    isAnalyzing,
    simulateAnalysis,
  };
}
