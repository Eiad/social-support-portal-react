'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { User, Users, FileText, CheckSquare } from 'lucide-react';
import { useFormContext } from '@/contexts/FormContext';

export default function ModernProgressBar({ currentStep, totalSteps }) {
  const { t, isRTL } = useLanguage();
  const { goToStep } = useFormContext();
  const [hoveredStep, setHoveredStep] = useState(null);
  
  const progressPercentage = (currentStep / totalSteps) * 100;

  const steps = [
    { id: 1, name: t('personalInformation'), fullName: t('personalInformationFull'), icon: User },
    { id: 2, name: t('familyFinancialInfo'), fullName: t('familyFinancialInfoFull'), icon: Users },
    { id: 3, name: t('situationDescriptions'), fullName: t('situationDescriptionsFull'), icon: FileText },
    { id: 4, name: t('reviewAndSubmit'), fullName: t('reviewAndSubmitFull'), icon: CheckSquare }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="mb-4 sm:mb-6">
      {/* Minimal Progress Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-3 sm:mb-4 p-2 sm:p-3 bg-gray-50/30 rounded-lg">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-gray-700 to-black animate-pulse"></div>
            <h2 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
              {t('step')} {currentStep} {t('of')} {totalSteps}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 font-medium truncate">
            {steps.find(s => s.id === currentStep)?.fullName}
          </p>
        </div>

      </div>

      {/* Clean Desktop Step Indicator */}
      <div className="hidden md:block p-4 bg-gray-50/30 rounded-lg">
        <div className="relative">
          {/* Enhanced Background Line */}
          <div className="absolute top-8 left-0 w-full h-1 bg-gray-100 rounded-full" />

          {/* Animated Progress Line */}
          <div
            className={`absolute top-8 h-1 rounded-full transition-all duration-1000 ease-out shadow-sm ${
              isRTL
                ? 'right-0 bg-gradient-to-l from-gray-700 via-gray-800 to-black'
                : 'left-0 bg-gradient-to-r from-gray-700 via-gray-800 to-black'
            }`}
            style={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
              ...(isRTL && { transformOrigin: 'right' })
            }}
          />

          {/* Steps with enhanced design */}
          <div className="relative flex justify-between">
            {steps.map((step) => {
              const status = getStepStatus(step.id);
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center group ${
                    step.id < currentStep ? 'cursor-pointer' : 'cursor-default'
                  }`}
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                  onClick={() => {
                    if (step.id < currentStep) {
                      goToStep(step.id);
                    }
                  }}
                >
                  {/* Enhanced Circle with Icons */}
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center
                    transition-all duration-300 ring-2 ring-offset-2
                    ${status === 'completed'
                      ? 'bg-gradient-to-br from-gray-700 via-gray-800 to-black text-white ring-gray-200 shadow-lg'
                      : status === 'current'
                      ? 'bg-gradient-to-br from-gray-700 via-gray-800 to-black text-white ring-gray-300 shadow-xl scale-105'
                      : 'bg-white text-gray-400 ring-gray-200 border border-gray-200'
                    }
                    ${step.id < currentStep && hoveredStep === step.id
                      ? 'transform scale-110 shadow-xl ring-gray-400'
                      : ''
                    }
                  `}>
                    {status === 'completed' ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : status === 'current' ? (
                      <Icon size={20} className="text-white" />
                    ) : (
                      <Icon size={18} className="text-gray-400" />
                    )}
                  </div>

                  {/* Enhanced Label */}
                  <div className={`
                    mt-3 text-center max-w-32 transition-all duration-200 relative
                    ${status === 'current' ? 'text-gray-900 font-semibold' : 'text-gray-600 font-medium'}
                    ${hoveredStep === step.id && step.id < currentStep ? 'text-gray-900 font-semibold' : ''}
                  `}>
                    <div className="text-sm leading-tight">{step.name}</div>

                    {/* Enhanced Tooltip */}
                    {hoveredStep === step.id && step.id < currentStep && (
                      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 z-20 animate-fadeIn">
                        <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-xl border border-gray-700">
                          {t('clickToGoBack')}
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-l border-t border-gray-700"></div>
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

      {/* Clean Mobile/Tablet Step Indicator */}
      <div className="md:hidden bg-gray-50/30 rounded-lg p-3">

        {/* Step dots with labels */}
        <div className="flex items-center justify-between mb-3">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex flex-col items-center flex-1 relative">

                {/* Step Circle */}
                <div className={`
                  w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 mb-1.5
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

                {/* Step Label */}
                <div className={`
                  text-center transition-all duration-200
                  ${status === 'current' ? 'text-gray-900 font-semibold' : 'text-gray-500 font-medium'}
                `}>
                  <div className="text-xs leading-tight">{step.name}</div>
                </div>

                {/* Connection line to next step */}
                {index < steps.length - 1 && (
                  <div className={`
                    absolute top-3.5 w-full h-0.5 -translate-y-1/2
                    ${status === 'completed' ?
                      (isRTL ? 'bg-gradient-to-l from-gray-700 to-gray-400' : 'bg-gradient-to-r from-gray-700 to-gray-400')
                      : 'bg-gray-200'}
                  `} style={{
                    [isRTL ? 'right' : 'left']: '50%',
                    width: 'calc(100% - 1.75rem)',
                    [isRTL ? 'marginRight' : 'marginLeft']: '0.875rem'
                  }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Enhanced Progress Bar */}
        <div className="relative">
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm relative overflow-hidden ${
                isRTL
                  ? 'bg-gradient-to-l from-gray-700 via-gray-800 to-black ml-auto'
                  : 'bg-gradient-to-r from-gray-700 via-gray-800 to-black'
              }`}
              style={{ width: `${progressPercentage}%` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}