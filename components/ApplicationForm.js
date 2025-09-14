'use client';

import { useState, useEffect } from 'react';
import { useFormContext } from '@/contexts/FormContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSearchParams, useRouter } from 'next/navigation';
import { triggerFormCompletion } from './CelebrationEffects';
import ModernProgressBar from './ModernProgressBar';
import Step1 from './FormSteps/Step1';
import Step2 from './FormSteps/Step2';
import Step3 from './FormSteps/Step3';
import Step4 from './FormSteps/Step4';
import FAQ from './FAQ';
import Footer from './Footer';
import { StepSkeleton, ProgressSkeleton } from './Skeleton';
import { FileText, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import Onboarding from './Onboarding';
import LanguageToggle from './LanguageToggle';

export default function ApplicationForm() {
  const { currentStep, resetForm, isTransitioning, transitionDirection } = useFormContext();
  const { t, language } = useLanguage();
  const [submissionResult, setSubmissionResult] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // No longer needed - success is handled in EmailSendingOverlay

  // Check if user has seen onboarding
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('onboardingCompleted');
    if (!hasSeenOnboarding && currentStep === 1 && !submissionResult) {
      setShowOnboarding(true);
    }
  }, [currentStep, submissionResult]);


  // Success is now handled entirely in EmailSendingOverlay

  return (
    <>
      {/* Onboarding Modal */}
      {showOnboarding && (
        <Onboarding 
          onComplete={() => setShowOnboarding(false)}
          onSkip={() => setShowOnboarding(false)}
        />
      )}
      
      <div className="min-h-screen bg-white py-6 pb-0">
        <div className="max-w-4xl mx-auto px-4">
          {/* Enhanced Header with Dark Theme */}
          <div className="text-center mb-8 relative">
            {/* Top right controls */}
            <div className="absolute right-0 top-0 flex items-center gap-2">
              {/* Language Toggle */}
              <LanguageToggle currentLang={language} />

              {/* Help Button */}
              <button
                onClick={() => setShowOnboarding(true)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
                aria-label="Show tour"
                title="Need help? Take a tour"
              >
                <HelpCircle size={24} className="text-gray-500 group-hover:text-gray-700" />
              </button>
            </div>
            
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-gray-800 to-black rounded-full mb-4 shadow-lg">
              <FileText size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('applicationTitle')}
            </h1>
            <p className="text-gray-600">{t('completeInSteps')}</p>
          </div>

        {/* Compact Progress */}
        <div className="mb-8">
          {isTransitioning ? (
            <ProgressSkeleton />
          ) : (
            <ModernProgressBar currentStep={currentStep} totalSteps={4} />
          )}
        </div>
        
        {/* Clean Form Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
          <div className="relative">
            {isTransitioning ? (
              <StepSkeleton step={currentStep} />
            ) : (
              <div className={`step-content ${
                transitionDirection === 'forward' ? 'animate-slideInRight' : 'animate-slideInLeft'
              }`}>
                {currentStep === 1 && <Step1 />}
                {currentStep === 2 && <Step2 />}
                {currentStep === 3 && <Step3 />}
                {currentStep === 4 && <Step4 />}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* FAQ Section - Outside main container */}
      <FAQ />
      
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}