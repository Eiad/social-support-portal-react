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
import { HandHeart, CheckCircle, XCircle, HelpCircle, Info } from 'lucide-react';
import Onboarding from './Onboarding';
import LanguageToggle from './LanguageToggle';
import Link from 'next/link';

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
      
      <div className="min-h-screen bg-white py-4 sm:pt-6 pb-0">
        <div className="max-w-[940px] mx-auto px-3 sm:px-6">
          {/* Smart Responsive Header */}
          <header className="mb-4 sm:mb-6 relative z-[999]">
            {/* Navigation Bar */}
            <nav className="flex items-center justify-between py-3 sm:py-4 border-b border-gray-100 bg-white/80 backdrop-blur-sm">

              {/* Left side - Logo and Title */}
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-xl shadow-lg ring-1 ring-white/20">
                  <HandHeart size={16} className={`sm:hidden text-white ${language === 'ar' ? 'scale-x-[-1]' : ''}`} />
                  <HandHeart size={20} className={`hidden sm:block md:hidden text-white ${language === 'ar' ? 'scale-x-[-1]' : ''}`} />
                  <HandHeart size={24} className={`hidden md:block text-white ${language === 'ar' ? 'scale-x-[-1]' : ''}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className={`${language === 'ar' ? 'font-logo-arabic' : 'font-logo'} text-lg sm:text-xl md:text-2xl text-gray-900 leading-tight truncate`}>
                    {t('applicationTitle')}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 hidden sm:block truncate">{t('completeInSteps')}</p>
                </div>
              </div>

              {/* Right side - Navigation Controls */}
              <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">

                {/* App Details Link - Enhanced */}
                <Link
                  href={`/${language}/app-details`}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 group text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-700"
                  aria-label="View app details"
                >
                  <Info size={14} className="sm:hidden text-blue-600 group-hover:text-blue-700" />
                  <Info size={16} className="hidden sm:block text-blue-600 group-hover:text-blue-700" />
                  <span className="hidden sm:inline md:hidden">{t('details')}</span>
                  <span className="hidden md:inline">{t('documentation')}</span>
                </Link>

                {/* Help/Tutorial Button - Enhanced */}
                <button
                  onClick={() => setShowOnboarding(true)}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-emerald-50 active:bg-emerald-100 transition-all duration-200 group text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-700"
                  aria-label="Show tutorial"
                >
                  <HelpCircle size={14} className="sm:hidden text-emerald-600 group-hover:text-emerald-700" />
                  <HelpCircle size={16} className="hidden sm:block text-emerald-600 group-hover:text-emerald-700" />
                  <span className="hidden sm:inline">{t('tutorial')}</span>
                </button>

                {/* Separator */}
                <div className="hidden md:block w-px h-5 bg-gray-200"></div>

                {/* Language Toggle - Last item */}
                <LanguageToggle currentLang={language} showLabel={true} />
              </div>
            </nav>

            {/* Mobile subtitle - More prominent */}
            <div className="sm:hidden pt-2 pb-1 text-center bg-gradient-to-r from-gray-50 to-white">
              <p className="text-sm text-gray-600 px-4">{t('completeInSteps')}</p>
            </div>
          </header>

        {/* Compact Progress - Mobile optimized */}
        <div className="mb-6 sm:mb-8">
          {isTransitioning ? (
            <ProgressSkeleton />
          ) : (
            <ModernProgressBar currentStep={currentStep} totalSteps={4} />
          )}
        </div>

        {/* Clean Form Section - Mobile optimized padding */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 md:p-8 shadow-sm">
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