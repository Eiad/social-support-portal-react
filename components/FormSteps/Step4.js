'use client';

import { useState } from 'react';
import { useFormContext } from '@/contexts/FormContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { Edit, Check, User, Users, Home, FileText, Loader2 } from 'lucide-react';
import { triggerFormCompletion } from '../CelebrationEffects';
import EmailSendingOverlay from '../EmailSendingOverlay';

export default function Step4() {
  const { formData, goToStep, resetForm } = useFormContext();
  const { t, isRTL } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [emailPhase, setEmailPhase] = useState(null);
  const [applicationNumber, setApplicationNumber] = useState(null);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setEmailPhase('submitting');

    // Mark application as being submitted to prevent page refresh issues
    localStorage.setItem('applicationSubmitted', 'true');

    try {
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        // Store application number for success phase
        setApplicationNumber(result.applicationNumber);

        // Transition to email sending phase
        setTimeout(() => {
          setEmailPhase('sending');

          // Simulate email sending delay
          setTimeout(() => {
            setEmailPhase('sent');

            // Show success immediately after 1.5 seconds of displaying "sent"
            setTimeout(() => {
              setEmailPhase('success');
            }, 1500);

            // No auto-complete - user manually closes via X button
          }, 2000);
        }, 1500);
      } else {
        setEmailPhase(null);
        setSubmissionResult({
          success: false,
          message: result.error || t('error')
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setEmailPhase(null);
      setSubmissionResult({
        success: false,
        message: t('error')
      });
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);
    }
  };

  if (submissionResult) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4 z-50 animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-10 text-center transform animate-scaleIn">
          {submissionResult.success ? (
            <>
              {/* Enhanced success icon with animation */}
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <Check size={40} className="text-white" />
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
            </>
          ) : (
            <>
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto">
                  <FileText size={40} className="text-white" />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Submission Failed
              </h2>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{submissionResult.message}</p>
            </>
          )}
        </div>
      </div>
    );
  }

  // Show email sending overlay during submission process
  if (emailPhase) {
    return (
      <EmailSendingOverlay
        email={formData.email}
        phase={emailPhase}
        applicationNumber={applicationNumber}
        onComplete={() => {
          // Clear all submission states
          setEmailPhase(null);
          setApplicationNumber(null);
          setSubmissionResult(null);
          setIsSubmitting(false);

          // Reset form and clear localStorage
          resetForm();

          // Also clear any submission-related localStorage
          localStorage.removeItem('applicationSubmitted');

          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl text-gray-900 mb-2">
          {t('reviewAndSubmit')}
        </h2>
        <p className="text-sm text-gray-600">{t('reviewYourInfo')}</p>
      </div>

      <div className="space-y-6">
        {/* Personal Information Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <User size={20} className="text-blue-600" />
              <h3 className="text-lg font-medium text-gray-800">{t('personalInformation')}</h3>
            </div>
            <button
              onClick={() => goToStep(1)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
            >
              <Edit size={14} />
              {t('edit')}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">{t('name')}:</span>
              <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-gray-900`}>{formData.name || '-'}</span>
            </div>
            <div>
              <span className="text-gray-500">{t('nationalId')}:</span>
              <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-gray-900`}>{formData.nationalId || '-'}</span>
            </div>
            <div>
              <span className="text-gray-500">{t('dateOfBirth')}:</span>
              <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-gray-900`}>{formData.dateOfBirth || '-'}</span>
            </div>
            <div>
              <span className="text-gray-500">{t('gender')}:</span>
              <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-gray-900`}>{formData.gender ? t(formData.gender) : '-'}</span>
            </div>
            <div className="md:col-span-2">
              <span className="text-gray-500">{t('address')}:</span>
              <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-gray-900`}>{formData.address || '-'}</span>
            </div>
            <div>
              <span className="text-gray-500">{t('city')}:</span>
              <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-gray-900`}>{formData.city || '-'}</span>
            </div>
            <div>
              <span className="text-gray-500">{t('phone')}:</span>
              <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-gray-900`}>{formData.phone || '-'}</span>
            </div>
            <div>
              <span className="text-gray-500">{t('email')}:</span>
              <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-gray-900`}>{formData.email || '-'}</span>
            </div>
          </div>
        </div>

        {/* Family & Financial Information Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-blue-600" />
              <h3 className="text-lg font-medium text-gray-800">{t('familyFinancialInfo')}</h3>
            </div>
            <button
              onClick={() => goToStep(2)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
            >
              <Edit size={14} />
              {t('edit')}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">{t('maritalStatus')}:</span>
              <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-gray-900`}>{formData.maritalStatus ? t(formData.maritalStatus) : '-'}</span>
            </div>
            <div>
              <span className="text-gray-500">{t('dependents')}:</span>
              <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-gray-900`}>{formData.dependents || '-'}</span>
            </div>
            <div>
              <span className="text-gray-500">{t('employmentStatus')}:</span>
              <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-gray-900`}>{formData.employmentStatus ? t(formData.employmentStatus) : '-'}</span>
            </div>
            <div>
              <span className="text-gray-500">{t('monthlyIncome')}:</span>
              <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-gray-900`}>{formData.monthlyIncome ? `$${formData.monthlyIncome}` : '-'}</span>
            </div>
            <div>
              <span className="text-gray-500">{t('housingStatus')}:</span>
              <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-gray-900`}>{formData.housingStatus ? t(formData.housingStatus) : '-'}</span>
            </div>
          </div>
        </div>

        {/* Situation Descriptions Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText size={20} className="text-blue-600" />
              <h3 className="text-lg font-medium text-gray-800">{t('situationDescriptions')}</h3>
            </div>
            <button
              onClick={() => goToStep(3)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
            >
              <Edit size={14} />
              {t('edit')}
            </button>
          </div>
          
          <div className="space-y-4 text-sm">
            <div>
              <span className="text-gray-500 font-medium">{t('currentSituation')}:</span>
              <p className="mt-1 text-gray-900 leading-relaxed">{formData.currentSituation || '-'}</p>
            </div>
            <div>
              <span className="text-gray-500 font-medium">{t('employmentCircumstances')}:</span>
              <p className="mt-1 text-gray-900 leading-relaxed">{formData.employmentCircumstances || '-'}</p>
            </div>
            <div>
              <span className="text-gray-500 font-medium">{t('reasonForApplying')}:</span>
              <p className="mt-1 text-gray-900 leading-relaxed">{formData.reasonForApplying || '-'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Section */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">{t('readyToSubmit')}</h3>
        <p className="text-sm text-gray-600 mb-4">{t('submitWarning')}</p>
        
        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
          <button
            type="button"
            onClick={() => goToStep(3)}
            className="w-full sm:w-auto px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 order-2 sm:order-1"
          >
            {t('previous')}
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-gray-800 to-black text-white font-semibold rounded-xl hover:from-gray-700 hover:to-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-105 order-1 sm:order-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {t('submitting')}
              </>
            ) : (
              t('submitApplication')
            )}
          </button>
        </div>
      </div>
    </div>
  );
}