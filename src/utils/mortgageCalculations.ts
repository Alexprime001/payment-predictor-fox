
export const calculateMortgage = (
  principal: number,
  annualRate: number,
  years: number,
  downPayment: number,
  propertyTax: number = 0,
  insurance: number = 0
): {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  monthlyWithExtras: number;
} => {
  const loanAmount = principal - downPayment;
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;

  const monthlyPayment =
    (loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;
  const monthlyWithExtras = monthlyPayment + propertyTax + insurance;

  return {
    monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
    totalPayment: isNaN(totalPayment) ? 0 : totalPayment,
    totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
    monthlyWithExtras: isNaN(monthlyWithExtras) ? 0 : monthlyWithExtras,
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
