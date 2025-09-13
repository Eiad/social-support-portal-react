'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function ProgressBar({ currentStep, totalSteps }) {
  const { t, isRTL } = useLanguage();
  
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          {t('step')} {currentStep} {t('of')} {totalSteps}
        </h2>
        <span className="text-sm text-gray-500">
          {Math.round(progressPercentage)}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full bg-blue-600 rounded-full transition-all duration-300 ease-out ${isRTL ? 'float-right' : ''}`}
          style={{ width: `${progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin="1"
          aria-valuemax={totalSteps}
        />
      </div>
      
      <div className="flex justify-between mt-2">
        {[1, 2, 3].map(step => (
          <div 
            key={step}
            className={`text-xs ${
              step <= currentStep ? 'text-blue-600 font-semibold' : 'text-gray-400'
            }`}
          >
            {step === 1 && t('personalInformation')}
            {step === 2 && t('familyFinancialInfo')}
            {step === 3 && t('situationDescriptions')}
          </div>
        ))}
      </div>
    </div>
  );
}