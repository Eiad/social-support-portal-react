'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { User, DollarSign, FileText } from 'lucide-react';
import { useFormContext } from '@/contexts/FormContext';

export default function ModernProgressBar({ currentStep, totalSteps }) {
  const { t, isRTL } = useLanguage();
  const { goToStep } = useFormContext();
  const [hoveredStep, setHoveredStep] = useState(null);
  
  const progressPercentage = (currentStep / totalSteps) * 100;

  const steps = [
    { id: 1, name: t('personalInformation'), icon: User },
    { id: 2, name: t('familyFinancialInfo'), icon: DollarSign },
    { id: 3, name: t('situationDescriptions'), icon: FileText },
    { id: 4, name: t('reviewAndSubmit'), icon: FileText }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="mb-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg text-gray-800 mb-1">
            {t('step')} {currentStep} {t('of')} {totalSteps}
          </h2>
          <p className="text-sm text-gray-600">
            {steps.find(s => s.id === currentStep)?.name}
          </p>
        </div>
      </div>

      {/* Desktop Step Indicator */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Background Line */}
          <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-200" />
          
          {/* Progress Line with Dark Theme */}
          <div 
            className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-gray-700 to-black transition-all duration-1000 ease-out"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
          
          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step) => {
              const status = getStepStatus(step.id);
              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center group ${
                    step.id < currentStep ? 'cursor-pointer' : 'cursor-default'
                  }`}
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                  onClick={() => {
                    // Only allow navigating to previous steps (not forward)
                    // Step 4 can only be reached via Next button for validation
                    if (step.id < currentStep) {
                      goToStep(step.id);
                    }
                  }}
                >
                  {/* Circle - Google Style */}
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm
                    transition-all duration-300
                    ${status === 'completed'
                      ? 'bg-gradient-to-r from-gray-700 to-black text-white'
                      : status === 'current'
                      ? 'bg-gradient-to-r from-gray-700 to-black text-white shadow-lg'
                      : 'bg-gray-300 text-gray-600'
                    }
                    ${step.id < currentStep && hoveredStep === step.id
                      ? 'transform scale-110 shadow-lg'
                      : ''
                    }
                  `}>
                    {status === 'completed' ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-xs font-medium">{step.id}</span>
                    )}
                  </div>
                  
                  {/* Label - More Compact */}
                  <div className={`
                    mt-2 text-center max-w-24 transition-all duration-200 relative
                    ${status === 'current' ? 'text-gray-800 font-semibold' : 'text-gray-600'}
                    ${hoveredStep === step.id && step.id < currentStep ? 'text-gray-900 font-medium' : ''}
                  `}>
                    <div className="text-xs leading-tight">{step.name}</div>
                    {/* Tooltip */}
                    {hoveredStep === step.id && step.id < currentStep && (
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-fadeIn">
                        <div className="bg-gray-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap shadow-lg">
                          Click to go back
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Step Indicator */}
      <div className="md:hidden">
        <div className="flex items-center justify-center space-x-3 mb-4">
          {steps.map((step) => {
            const status = getStepStatus(step.id);
            return (
              <div
                key={step.id}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${status === 'completed'
                    ? 'bg-gradient-to-r from-gray-700 to-black'
                    : status === 'current'
                    ? 'bg-gradient-to-r from-gray-700 to-black ring-2 ring-gray-400'
                    : 'bg-gray-300'
                  }
                `}
              />
            );
          })}
        </div>

        {/* Mobile Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gray-700 to-black rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}