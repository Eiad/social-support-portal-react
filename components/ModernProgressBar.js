'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { User, DollarSign, FileText } from 'lucide-react';
import CelebrationEffects, { triggerProgressMilestone } from './CelebrationEffects';

export default function ModernProgressBar({ currentStep, totalSteps }) {
  const { t, isRTL } = useLanguage();
  const [hoveredStep, setHoveredStep] = useState(null);
  const [prevStep, setPrevStep] = useState(currentStep);

  // Trigger celebration when step advances
  useEffect(() => {
    if (currentStep > prevStep) {
      // Small delay to let the step transition complete first
      setTimeout(() => {
        triggerProgressMilestone(currentStep);
      }, 600);
    }
    setPrevStep(currentStep);
  }, [currentStep, prevStep]);
  
  const progressPercentage = (currentStep / totalSteps) * 100;

  const steps = [
    { id: 1, name: t('personalInformation'), icon: User },
    { id: 2, name: t('familyFinancialInfo'), icon: DollarSign },
    { id: 3, name: t('situationDescriptions'), icon: FileText }
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
          
          {/* Progress Line */}
          <div 
            className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-1000 ease-out"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
          
          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step) => {
              const status = getStepStatus(step.id);
              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center group cursor-pointer"
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Circle - Google Style */}
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm
                    transition-all duration-300
                    ${status === 'completed' 
                      ? 'bg-blue-600 text-white' 
                      : status === 'current'
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-300 text-gray-600'
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
                    mt-2 text-center max-w-24 transition-all duration-200
                    ${status === 'current' ? 'text-blue-600 font-medium' : 'text-gray-600'}
                    ${hoveredStep === step.id ? 'text-blue-500 font-medium' : ''}
                  `}>
                    <div className="text-xs leading-tight">{step.name}</div>
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
                    ? 'bg-green-500' 
                    : status === 'current'
                    ? 'bg-blue-500 ring-2 ring-blue-200' 
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
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}