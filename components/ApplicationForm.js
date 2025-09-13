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

export default function ApplicationForm() {
  const { currentStep, resetForm, isTransitioning, transitionDirection } = useFormContext();
  const { t } = useLanguage();
  const [submissionResult, setSubmissionResult] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Check for success parameter on mount
  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      const applicationNumber = searchParams.get('applicationNumber');
      const message = searchParams.get('message') || 'Your application has been successfully submitted.';
      
      // Trigger celebration animation when success screen loads
      setTimeout(() => {
        triggerFormCompletion();
      }, 500);
      
      setSubmissionResult({
        success: true,
        applicationNumber: applicationNumber || 'APP-' + Date.now(),
        message: decodeURIComponent(message)
      });
    }
  }, [searchParams]);

  // Check if user has seen onboarding
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('onboardingCompleted');
    if (!hasSeenOnboarding && currentStep === 1 && !submissionResult) {
      setShowOnboarding(true);
    }
  }, [currentStep, submissionResult]);


  // Show success/error screen after submission
  if (submissionResult) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4 z-50 animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-10 text-center transform animate-scaleIn">
          {submissionResult.success ? (
            <>
              {/* Enhanced success icon with animation */}
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle size={40} className="text-white" />
                </div>
                <div className="absolute inset-0 w-20 h-20 bg-green-200 rounded-full mx-auto animate-ping opacity-20"></div>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {t('applicationSubmitted')}
              </h2>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{submissionResult.message}</p>
              
              {/* Enhanced application number display */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-6 border border-gray-200">
                <p className="text-xs font-medium text-gray-500 mb-1">{t('applicationNumber')}</p>
                <div className="bg-white rounded-lg p-3 border-2 border-dashed border-gray-300">
                  <p className="text-lg font-mono font-bold text-gray-900 tracking-wide">
                    {submissionResult.applicationNumber}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setSubmissionResult(null);
                  resetForm();
                  // Clear URL params and redirect to clean URL
                  router.push(window.location.pathname);
                }}
                className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium rounded-lg hover:from-gray-600 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 text-sm"
              >
                Start New Application
              </button>
            </>
          ) : (
            <>
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto">
                  <XCircle size={40} className="text-white" />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Submission Failed
              </h2>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{submissionResult.message}</p>
              <button
                onClick={() => setSubmissionResult(null)}
                className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium rounded-lg hover:from-gray-600 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 text-sm"
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

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
            {/* Help Button - Always visible */}
            <button
              onClick={() => setShowOnboarding(true)}
              className="absolute right-0 top-0 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
              aria-label="Show tour"
              title="Need help? Take a tour"
            >
              <HelpCircle size={24} className="text-gray-500 group-hover:text-gray-700" />
            </button>
            
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