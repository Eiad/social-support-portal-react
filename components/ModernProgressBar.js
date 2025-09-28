'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { User, Users, FileText, CheckSquare, Pencil } from 'lucide-react';
import { useFormContext } from '@/contexts/FormContext';

export default function ModernProgressBar({ currentStep, totalSteps }) {
  const { t, isRTL } = useLanguage();
  const { goToStep } = useFormContext();
  const [hoveredStep, setHoveredStep] = useState(null);
  
  // Custom progress weights based on estimated time/effort for each step
  const stepWeights = [40, 30, 25, 5]; // Step 1: 40%, Step 2: 30%, Step 3: 25%, Step 4: 5%
  const progressPercentage = currentStep === 1
    ? 10 // Show 10% for Step 1 to indicate progress has started
    : stepWeights.slice(0, currentStep - 1).reduce((sum, weight) => sum + weight, 0);

  const steps = [
    { id: 1, name: t('personalInformation'), title: t('personalInformationTitle'), fullName: t('personalInformationFull'), icon: User },
    { id: 2, name: t('familyFinancialInfo'), title: t('familyFinancialInfoTitle'), fullName: t('familyFinancialInfoFull'), icon: Users },
    { id: 3, name: t('situationDescriptions'), title: t('situationDescriptionsTitle'), fullName: t('situationDescriptionsFull'), icon: FileText },
    { id: 4, name: t('reviewAndSubmit'), title: t('reviewAndSubmitTitle'), fullName: t('reviewAndSubmitFull'), icon: CheckSquare }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="mb-4 sm:mb-6 relative z-10">
      {/* Desktop: Single-Line Step Indicator */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-xl p-4 shadow-sm relative z-10">
        <div className="flex items-center justify-between gap-3">

          {/* Current Step Info */}
          <div className="flex items-center gap-3 min-w-0">
            <div className={`
              w-10 h-10 rounded-xl flex items-center justify-center
              bg-gradient-to-br from-gray-700 via-gray-800 to-black text-white shadow-lg
            `}>
              <span className="text-sm font-bold">{currentStep}</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h2 className="text-sm font-semibold text-gray-900 truncate">
                  {t('step')} {currentStep} {t('of')} {totalSteps}
                </h2>
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                <span className="text-sm text-gray-600 font-medium">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <p className="text-xs text-gray-600 font-medium truncate">
                {steps.find(s => s.id === currentStep)?.title}: {steps.find(s => s.id === currentStep)?.fullName}
              </p>
            </div>
          </div>

          {/* Horizontal Progress Steps */}
          <div className="flex items-center gap-3">
            {steps.map((step, index) => {
              const status = getStepStatus(step.id);
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center">

                  {/* Step Circle */}
                  <div
                    className={`
                      w-9 h-9 rounded-lg flex items-center justify-center
                      transition-all duration-300 group relative z-[9998]
                      ${step.id < currentStep ? 'cursor-pointer' : 'cursor-default'}
                      ${status === 'completed'
                        ? 'bg-gradient-to-br from-gray-700 via-gray-800 to-black text-white shadow-md hover:shadow-lg hover:scale-105'
                        : status === 'current'
                        ? 'bg-gradient-to-br from-gray-700 via-gray-800 to-black text-white shadow-lg ring-2 ring-gray-300'
                        : 'bg-gray-100 text-gray-400 border border-gray-200'
                      }
                    `}
                    onClick={() => {
                      if (step.id < currentStep) {
                        goToStep(step.id);
                      }
                    }}
                    onMouseEnter={() => setHoveredStep(step.id)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    {status === 'completed' ? (
                      <>
                        <svg className="w-5 h-5 group-hover:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        <Pencil size={16} className="hidden group-hover:block text-white" />
                      </>
                    ) : (
                      <Icon size={18} className={`${status === 'current' ? 'text-white' : 'text-gray-400'}`} />
                    )}

                    {/* Tooltip */}
                    {hoveredStep === step.id && (
                      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 z-[99999] animate-fadeIn" style={{zIndex: 99999}}>
                        <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
                          {step.id < currentStep ? `${t('edit')} ${t('step')} ${step.id}: ${step.name}` : `${step.title}: ${step.fullName}`}
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className={`
                      w-4 h-0.5 mx-1 transition-all duration-500
                      ${status === 'completed'
                        ? 'bg-gradient-to-r from-gray-700 to-gray-500'
                        : 'bg-gray-200'
                      }
                    `} />
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Animated Progress Bar */}
        <div className="mt-4 relative">
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${
                isRTL
                  ? 'bg-gradient-to-l from-gray-700 via-gray-800 to-black ml-auto'
                  : 'bg-gradient-to-r from-gray-700 via-gray-800 to-black'
              }`}
              style={{ width: `${progressPercentage}%` }}
            >
              {/* Subtle flowing gradient animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>

      </div>

      {/* Mobile: Compact Vertical Step Indicator */}
      <div className="md:hidden bg-white border border-gray-200 rounded-xl p-3 shadow-sm relative z-10">

        {/* Current Step Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className={`
            w-8 h-8 rounded-lg flex items-center justify-center
            bg-gradient-to-br from-gray-700 via-gray-800 to-black text-white shadow-lg
          `}>
            <span className="text-xs font-bold">{currentStep}</span>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-gray-900 truncate mb-1">
              {t('step')} {currentStep} {t('of')} {totalSteps} • {Math.round(progressPercentage)}%
            </h2>
            <p className="text-xs text-gray-600 font-medium truncate">
              {steps.find(s => s.id === currentStep)?.title}: {steps.find(s => s.id === currentStep)?.fullName}
            </p>
          </div>
        </div>

        {/* Horizontal Step Dots */}
        <div className="flex items-center mb-3">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex items-center">

                {/* Step Circle */}
                <div className={`
                  w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300
                  ${status === 'completed'
                    ? 'bg-gradient-to-br from-gray-700 to-black text-white'
                    : status === 'current'
                    ? 'bg-gradient-to-br from-gray-700 to-black text-white ring-2 ring-gray-300'
                    : 'bg-gray-100 text-gray-400'
                  }
                `}>
                  {status === 'completed' ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <Icon size={13} />
                  )}
                </div>

                {/* Connection line to next step */}
                {index < steps.length - 1 && (
                  <div className={`
                    w-full h-0.5 transition-all duration-500 mx-2
                    ${status === 'completed'
                      ? (isRTL ? 'bg-gradient-to-l from-gray-700 to-gray-500' : 'bg-gradient-to-r from-gray-700 to-gray-500')
                      : 'bg-gray-200'}
                  `} style={{ flex: '1 1 0%' }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${
                isRTL
                  ? 'bg-gradient-to-l from-gray-700 via-gray-800 to-black'
                  : 'bg-gradient-to-r from-gray-700 via-gray-800 to-black'
              }`}
              style={{
                width: `${progressPercentage}%`,
                ...(isRTL && { marginLeft: 'auto', marginRight: 0 })
              }}
            >
              {/* Subtle flowing gradient animation */}
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] ${
                isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
              }`}></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}