'use client';

import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Rocket, Info, CheckCircle, FileText, Users, DollarSign, MessageSquare, BookOpen, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Onboarding({ onComplete, onSkip }) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const tourSteps = [
    {
      id: 'welcome',
      icon: <BookOpen className="w-7 h-7" />,
      title: 'Welcome to Social Support Portal',
      description: 'Let us guide you through the application process. It only takes a few minutes!',
      highlight: null,
      position: 'center'
    },
    {
      id: 'personal',
      icon: <FileText className="w-6 h-6 text-gray-700" />,
      title: 'Personal Information',
      description: 'First, we\'ll collect your basic information like name, ID, and contact details. All information is kept secure and confidential.',
      highlight: 'step-1',
      tips: [
        'Have your National ID ready',
        'Ensure your contact info is up-to-date',
        'Double-check your email address'
      ]
    },
    {
      id: 'family',
      icon: <Users className="w-6 h-6 text-gray-700" />,
      title: 'Family & Financial Details',
      description: 'Next, we\'ll ask about your family situation and financial status to better understand your needs.',
      highlight: 'step-2',
      tips: [
        'Know your monthly income',
        'Count all dependents',
        'Include all sources of support'
      ]
    },
    {
      id: 'situation',
      icon: <MessageSquare className="w-6 h-6 text-gray-700" />,
      title: 'Your Situation',
      description: 'Here you\'ll describe your current situation and why you\'re applying. Be detailed and honest - this helps us serve you better.',
      highlight: 'step-3',
      tips: [
        'Be specific about your challenges',
        'Explain your employment situation',
        'Use the AI assistant for help writing'
      ]
    },
    {
      id: 'review',
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      title: 'Review & Submit',
      description: 'Finally, you\'ll review all your information before submitting. You can edit any section if needed.',
      highlight: 'step-4',
      tips: [
        'Review everything carefully',
        'Edit any mistakes before submitting',
        'Save your application number'
      ]
    },
    {
      id: 'ready',
      icon: <Target className="w-7 h-7" />,
      title: 'You\'re All Set!',
      description: 'You now know everything needed to complete your application. Good luck!',
      highlight: null,
      position: 'center'
    }
  ];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 300);
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

  const currentTourStep = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      {/* Main Card - Material Design 3 Style */}
      <div className={`bg-white rounded-3xl shadow-xl max-w-md w-full relative overflow-hidden transform transition-all duration-300 ${
        isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}>
        {/* Linear Progress Indicator - Material Style */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
          <div 
            className="h-full bg-gray-900 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Close Button - Material Style */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 p-2.5 rounded-full hover:bg-gray-100 transition-colors duration-200 z-10 group"
          aria-label="Skip tour"
        >
          <X size={20} className="text-gray-600 group-hover:text-gray-900" />
        </button>

        {/* Content */}
        <div className="p-6 pt-10">
          {/* Step Dots - Material Design Style */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-1.5">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentStep 
                      ? 'w-2 h-2 bg-gray-900' 
                      : index < currentStep
                      ? 'w-1.5 h-1.5 bg-gray-400'
                      : 'w-1.5 h-1.5 bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Icon and Title - Material Design Style */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-50 rounded-2xl mb-4 text-gray-700">
              {currentTourStep.icon}
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {currentTourStep.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed px-4">
              {currentTourStep.description}
            </p>
          </div>

          {/* Tips Section - Material Card Style */}
          {currentTourStep.tips && (
            <div className="bg-gray-50/50 rounded-2xl p-4 mb-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Info size={16} className="text-gray-700" />
                <span className="text-sm font-medium text-gray-800">Quick Tips</span>
              </div>
              <ul className="space-y-2">
                {currentTourStep.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Visual Preview - Material Card */}
          {currentTourStep.highlight && (
            <div className="mb-6">
              <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white font-medium text-sm">
                    {currentStep - 1}
                  </div>
                  <div className="flex-1">
                    <div className="h-1.5 bg-gray-100 rounded-full w-full overflow-hidden">
                      <div 
                        className="h-full bg-gray-900 rounded-full transition-all duration-300"
                        style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons - Material Design */}
          <div className="flex gap-3 mt-8">
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="flex-1 px-5 py-2.5 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
              >
                <ChevronLeft size={18} />
                Previous
              </button>
            )}
            
            {currentStep === 0 && (
              <button
                onClick={handleSkip}
                className="flex-1 px-5 py-2.5 text-gray-600 font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-all duration-200 text-sm"
              >
                Skip Tour
              </button>
            )}

            <button
              onClick={handleNext}
              className="flex-1 px-5 py-2.5 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md text-sm"
            >
              {currentStep === tourSteps.length - 1 ? (
                <>
                  Start Application
                  <ChevronRight size={18} />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Subtle Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-50 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
      </div>
    </div>
  );
}