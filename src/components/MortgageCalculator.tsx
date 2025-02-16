
import React, { useState, useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { calculateMortgage, formatCurrency } from '../utils/mortgageCalculations';
import { toast } from '@/components/ui/use-toast';

const MortgageCalculator = () => {
  const [values, setValues] = useState({
    loanAmount: 300000,
    annualRate: 3.5,
    loanTerm: 30,
    downPayment: 60000,
    propertyTax: 0,
    insurance: 0,
  });

  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    monthlyWithExtras: 0,
  });

  useEffect(() => {
    calculateResults();
  }, [values]);

  const calculateResults = () => {
    const result = calculateMortgage(
      values.loanAmount,
      values.annualRate,
      values.loanTerm,
      values.downPayment,
      values.propertyTax,
      values.insurance
    );
    setResults(result);
  };

  const handleInputChange = (field: string, value: string | undefined) => {
    if (!value) return;
    
    const numValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
    if (isNaN(numValue)) return;

    setValues(prev => ({ ...prev, [field]: numValue }));
  };

  const inputClasses = "w-full px-4 py-2 transition-all duration-200 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8 slide-up">
        <h1 className="text-4xl font-bold mb-2">Mortgage Calculator</h1>
        <p className="text-gray-600">Calculate your monthly mortgage payments and view loan details</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6 fade-in">
          <div className="p-6 bg-white rounded-xl shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Loan Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className={labelClasses}>Loan Amount</label>
                <CurrencyInput
                  id="loan-amount"
                  name="loan-amount"
                  prefix="$"
                  defaultValue={values.loanAmount}
                  decimalsLimit={0}
                  onValueChange={(value) => handleInputChange('loanAmount', value)}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className={labelClasses}>Down Payment</label>
                <CurrencyInput
                  id="down-payment"
                  name="down-payment"
                  prefix="$"
                  defaultValue={values.downPayment}
                  decimalsLimit={0}
                  onValueChange={(value) => handleInputChange('downPayment', value)}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className={labelClasses}>Annual Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={values.annualRate}
                  onChange={(e) => handleInputChange('annualRate', e.target.value)}
                  className={inputClasses}
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className={labelClasses}>Loan Term (Years)</label>
                <input
                  type="number"
                  value={values.loanTerm}
                  onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                  className={inputClasses}
                  min="1"
                  max="50"
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Additional Costs (Monthly)</h2>
            
            <div className="space-y-4">
              <div>
                <label className={labelClasses}>Property Tax</label>
                <CurrencyInput
                  id="property-tax"
                  name="property-tax"
                  prefix="$"
                  defaultValue={values.propertyTax}
                  decimalsLimit={0}
                  onValueChange={(value) => handleInputChange('propertyTax', value)}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className={labelClasses}>Insurance</label>
                <CurrencyInput
                  id="insurance"
                  name="insurance"
                  prefix="$"
                  defaultValue={values.insurance}
                  decimalsLimit={0}
                  onValueChange={(value) => handleInputChange('insurance', value)}
                  className={inputClasses}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 fade-in">
          <div className="p-6 bg-white rounded-xl shadow-sm border">
            <h2 className="text-xl font-semibold mb-6">Payment Summary</h2>
            
            <div className="space-y-6">
              <div className="text-center p-6 bg-primary/5 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Monthly Payment (P&I)</p>
                <p className="text-4xl font-bold text-primary">
                  {formatCurrency(results.monthlyPayment)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Monthly Payment</p>
                  <p className="text-2xl font-semibold">
                    {formatCurrency(results.monthlyWithExtras)}
                  </p>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Down Payment</p>
                  <p className="text-2xl font-semibold">
                    {formatCurrency(values.downPayment)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Loan Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Principal Loan Amount</span>
                <span className="font-medium">{formatCurrency(values.loanAmount - values.downPayment)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Total Interest Paid</span>
                <span className="font-medium">{formatCurrency(results.totalInterest)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Total Cost of Loan</span>
                <span className="font-medium">{formatCurrency(results.totalPayment)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
