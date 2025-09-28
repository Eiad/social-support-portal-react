'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, FileText, Users, MessageSquare, CheckCircle, BookOpen, Clock, HandHeart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Onboarding({ onComplete, onSkip }) {
  const { t, isRTL } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('forward');

  const tourSteps = [
    {
      id: 'welcome',
      icon: <BookOpen className="w-6 h-6" />,
      title: t('tourWelcomeTitle'),
      description: t('tourWelcomeDesc'),
      isWelcome: true
    },
    {
      id: 'personal',
      icon: <FileText className="w-5 h-5" />,
      title: t('tourPersonalTitle'),
      description: t('tourPersonalDesc'),
      tips: [
        t('tourPersonalTip1'),
        t('tourPersonalTip2'),
        t('tourPersonalTip3')
      ],
      estimatedTime: isRTL ? '٤ دقائق' : '4 min',
      stepNumber: 1
    },
    {
      id: 'family',
      icon: <Users className="w-5 h-5" />,
      title: t('tourFamilyTitle'),
      description: t('tourFamilyDesc'),
      tips: [
        t('tourFamilyTip1'),
        t('tourFamilyTip2'),
        t('tourFamilyTip3')
      ],
      estimatedTime: isRTL ? '٣ دقائق' : '3 min',
      stepNumber: 2
    },
    {
      id: 'situation',
      icon: <MessageSquare className="w-5 h-5" />,
      title: t('tourSituationTitle'),
      description: t('tourSituationDesc'),
      tips: [
        t('tourSituationTip1'),
        t('tourSituationTip2'),
        t('tourSituationTip3')
      ],
      estimatedTime: isRTL ? '٥ دقائق' : '5 min',
      stepNumber: 3
    },
    {
      id: 'review',
      icon: <CheckCircle className="w-5 h-5" />,
      title: t('tourReviewTitle'),
      description: t('tourReviewDesc'),
      tips: [
        t('tourReviewTip1'),
        t('tourReviewTip2'),
        t('tourReviewTip3')
      ],
      estimatedTime: isRTL ? '٣ دقائق' : '3 min',
      stepNumber: 4
    },
    {
      id: 'ready',
      icon: <HandHeart className="w-6 h-6" />,
      title: t('tourReadyTitle'),
      description: t('tourReadyDesc'),
      isComplete: true
    }
  ];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setDirection('forward');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 250);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection('backward');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 250);
    }
  };

  const handleStepClick = (index) => {
    if (index !== currentStep) {
      setDirection(index > currentStep ? 'forward' : 'backward');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(index);
        setIsAnimating(false);
      }, 250);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    onComplete();
  };

  const handleSkip = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    onSkip();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowRight':
          if (!isRTL) handleNext();
          else handlePrevious();
          break;
        case 'ArrowLeft':
          if (!isRTL) handlePrevious();
          else handleNext();
          break;
        case 'Escape':
          handleSkip();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, isRTL]);

  const currentTourStep = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 animate-fadeIn">
      {/* Google Material Design Modal */}
      <div className={`bg-white rounded-3xl shadow-xl max-w-md w-full relative overflow-hidden transform transition-all duration-300 animate-scaleIn ${
        isAnimating
          ? direction === 'forward'
            ? 'translate-x-4 opacity-90'
            : '-translate-x-4 opacity-90'
          : 'translate-x-0 opacity-100'
      }`}>

        {/* Elegant Progress Bar */}
        <div className="h-1 bg-gray-100 relative overflow-hidden">
          <div
            className="h-full bg-gray-800 transition-all duration-500 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Subtle shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse" />
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-3">
          {/* Progress Indicator */}
          <div className="flex items-center gap-2">
            {tourSteps.map((step, index) => (
              <button
                key={index}
                onClick={() => handleStepClick(index)}
                className="group relative transition-all duration-200"
                disabled={isAnimating}
              >
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'w-6 h-2 bg-gray-800 shadow-sm'
                    : index < currentStep
                    ? 'bg-gray-500'
                    : 'bg-gray-300'
                }`} />

                {/* Elegant tooltip */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                    {step.title}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-800" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Close Button */}
          <button
            onClick={handleSkip}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
            aria-label="Skip tour"
          >
            <X size={18} className="text-gray-500 group-hover:text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 pb-5">
          {/* Welcome/Complete Screens */}
          {(currentTourStep.isWelcome || currentTourStep.isComplete) ? (
            <div className="text-center py-6">
              <h2 className="text-2xl font-medium text-gray-900 mb-2 tracking-tight">
                {currentTourStep.title}
              </h2>

              <p className="text-gray-600 leading-relaxed mb-6 px-2">
                {currentTourStep.description}
              </p>
            </div>
          ) : (
            // Regular Step Content
            <div className="space-y-4">
              {/* Step Header with Background Icon */}
              <div className="relative">
                {/* Large Background Icon */}
                <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-24 h-24 flex items-center justify-center text-gray-200 opacity-[0.7] pointer-events-none`}>
                  <div className="w-20 h-20">
                    {React.cloneElement(currentTourStep.icon, {
                      className: "w-full h-full",
                      strokeWidth: 1
                    })}
                  </div>
                </div>

                {/* Clean Header Content */}
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h3 className="text-xl font-medium text-gray-900">
                      {currentTourStep.title}
                    </h3>
                    {currentTourStep.estimatedTime && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600 font-medium w-fit">
                        <Clock size={10} />
                        {currentTourStep.estimatedTime}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed pr-[30px]">
                    {currentTourStep.description}
                  </p>
                </div>
              </div>

              {/* Tips Section */}
              {currentTourStep.tips && (
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <h4 className="font-medium text-gray-900 mb-3 text-sm">{t('quickTips')}</h4>
                  <div className="space-y-2">
                    {currentTourStep.tips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center gap-3 mt-6">
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="w-[35%] px-4 py-2.5 text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
                disabled={isAnimating}
              >
                <PrevIcon size={16} />
                {t('previous')}
              </button>
            )}

            {currentStep === 0 && (
              <button
                onClick={handleSkip}
                className="flex-1 px-4 py-2.5 text-gray-600 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                disabled={isAnimating}
              >
                {t('skipTour')}
              </button>
            )}

            <button
              onClick={handleNext}
              className="flex-1 px-4 py-2.5 bg-gray-800 text-white font-medium rounded-xl hover:bg-gray-900 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
              disabled={isAnimating}
            >
              {currentStep === tourSteps.length - 1 ? (
                <>
                  {t('startApplication')}
                  <NextIcon size={16} />
                </>
              ) : (
                <>
                  {t('next')}
                  <NextIcon size={16} />
                </>
              )}
            </button>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-400">
              {isRTL ? (
                <>
                  استخدم <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 text-xs font-mono">→</kbd> <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 text-xs font-mono">←</kbd> للتنقل • <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 text-xs font-mono">ESC</kbd> للتخطي
                </>
              ) : (
                <>
                  Use <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 text-xs font-mono">←</kbd> <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 text-xs font-mono">→</kbd> to navigate • <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 text-xs font-mono">ESC</kbd> to skip
                </>
              )}
            </p>
          </div>
        </div>

        {/* Subtle Material Design shadow layers */}
        <div className="absolute inset-0 rounded-3xl shadow-xl pointer-events-none" />
      </div>
    </div>
  );
}