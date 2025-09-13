'use client';

import { useState, useEffect } from 'react';
import { useFormContext } from '@/contexts/FormContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSearchParams, useRouter } from 'next/navigation';
import ModernProgressBar from './ModernProgressBar';
import Step1 from './FormSteps/Step1';
import Step2 from './FormSteps/Step2';
import Step3 from './FormSteps/Step3';
import Step4 from './FormSteps/Step4';
import FAQ from './FAQ';
import Footer from './Footer';
import { StepSkeleton, ProgressSkeleton } from './Skeleton';
import { FileText, CheckCircle, XCircle } from 'lucide-react';

export default function ApplicationForm() {
  const { currentStep, resetForm, isTransitioning, transitionDirection } = useFormContext();
  const { t } = useLanguage();
  const [submissionResult, setSubmissionResult] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Check for success parameter on mount
  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      const applicationNumber = searchParams.get('applicationNumber');
      const message = searchParams.get('message') || 'Your application has been successfully submitted.';
      
      setSubmissionResult({
        success: true,
        applicationNumber: applicationNumber || 'APP-' + Date.now(),
        message: decodeURIComponent(message)
      });
    }
  }, [searchParams]);


  // Show success/error screen after submission
  if (submissionResult) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 text-center">
          {submissionResult.success ? (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t('applicationSubmitted')}
              </h2>
              <p className="text-gray-600 mb-4">{submissionResult.message}</p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-500 mb-1">{t('applicationNumber')}</p>
                <p className="text-lg font-mono font-bold text-blue-600">
                  {submissionResult.applicationNumber}
                </p>
              </div>
              <button
                onClick={() => {
                  setSubmissionResult(null);
                  resetForm();
                  // Clear URL params and redirect to clean URL
                  router.push(window.location.pathname);
                }}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Start New Application
              </button>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle size={32} className="text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Submission Failed
              </h2>
              <p className="text-gray-600 mb-6">{submissionResult.message}</p>
              <button
                onClick={() => setSubmissionResult(null)}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
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
    <div className="min-h-screen bg-white py-6 pb-0">
      <div className="max-w-4xl mx-auto px-4">
        {/* Google-style Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-4">
            <FileText size={24} className="text-white" />
          </div>
          <h1 className="text-2xl text-gray-900 mb-2">
            {t('applicationTitle')}
          </h1>
          <p className="text-sm text-gray-600">{t('completeInSteps')}</p>
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
  );
}