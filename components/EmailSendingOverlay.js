'use client';

import { Mail, CheckCircle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { triggerFormCompletion } from './CelebrationEffects';
import { useLanguage } from '@/contexts/LanguageContext';

export default function EmailSendingOverlay({ email, phase, onComplete, applicationNumber }) {
  const { t, isRTL } = useLanguage();
  const [currentPhase, setCurrentPhase] = useState(phase);
  const [showCheck, setShowCheck] = useState(false);
  const [copied, setCopied] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    setCurrentPhase(phase);
    if (phase === 'sent') {
      setShowCheck(true);
    }
    if (phase === 'success') {
      // Trigger confetti when success phase starts
      setTimeout(() => {
        triggerFormCompletion();
      }, 500);
    }
  }, [phase, onComplete]);

  const getPhaseContent = () => {
    switch (currentPhase) {
      case 'submitting':
        return {
          icon: <Loader2 className="w-12 h-12 text-gray-700 animate-spin" />,
          title: t('submittingApplication'),
          description: t('processingInfo'),
          showEmail: false
        };

      case 'sending':
        return {
          icon: (
            <div className="relative">
              <Mail className="w-12 h-12 text-gray-700" />
              <div className="absolute -top-1 -right-1">
                <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
              </div>
            </div>
          ),
          title: t('sendingConfirmation'),
          description: t('sendingToEmail'),
          showEmail: true
        };

      case 'sent':
        return {
          icon: (
            <div className="relative">
              <Mail className="w-12 h-12 text-green-600" />
              {showCheck && (
                <div className="absolute -bottom-1 -right-1 animate-scaleIn">
                  <CheckCircle className="w-6 h-6 text-green-600" fill="white" />
                </div>
              )}
            </div>
          ),
          title: t('emailSentSuccess'),
          description: t('confirmationSent'),
          showEmail: true
        };

      case 'success':
        return {
          icon: null,
          title: t('applicationSubmittedSuccess'),
          description: t('applicationSuccessDesc'),
          showEmail: true
        };

      default:
        return {
          icon: <Loader2 className="w-12 h-12 text-gray-700 animate-spin" />,
          title: 'Processing',
          description: 'Please wait...',
          showEmail: false
        };
    }
  };

  const content = getPhaseContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 animate-scaleIn relative overflow-hidden">

        {/* Close Button - only show in success phase */}
        {currentPhase === 'success' && (
          <button
            onClick={onComplete}
            className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group z-20`}
            aria-label="Close"
          >
            <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Icon - only show for non-success phases */}
        {currentPhase !== 'success' && (
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-full ${
              currentPhase === 'sent' ? 'bg-green-50' : 'bg-gray-50'
            } transition-all duration-500`}>
              <div style={{ maxWidth: '100px' }}>
                {content.icon}
              </div>
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className={`${currentPhase === 'success' ? 'text-center text-2xl font-bold text-gray-900 mb-1 relative z-10 mt-4' : 'text-center text-xl font-semibold text-gray-900'} mb-2`}>
          {content.title}
        </h3>

        {/* Description */}
        <p className={`${currentPhase === 'success' ? 'text-center text-gray-500 text-sm relative z-10' : 'text-center text-gray-600 text-sm'} mb-2 mt-4`}>
          {content.description}
        </p>

        {/* Success Phase Information */}
        {currentPhase === 'success' && (
          <div className="space-y-5 mb-8 px-6 relative z-10">
            {/* Email Section */}
            {content.showEmail && email && (
              <div className="flex justify-center">
                <div className="inline-flex items-center bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium border border-green-200">
                  <span dir="ltr">{email}</span>
                </div>
              </div>
            )}

            {/* Application Number Section */}
            {applicationNumber && (
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">{t('applicationNumber')}</p>
                <div className="inline-flex items-center transition-colors cursor-pointer group"
                     onClick={() => {
                       navigator.clipboard?.writeText(applicationNumber);
                       setCopied(true);
                       setTimeout(() => setCopied(false), 1500);
                     }}>
                  <span className={`text-sm font-mono text-gray-900 font-semibold tracking-wide ${isRTL ? 'ml-1' : 'mr-1'}`}>
                    {applicationNumber}
                  </span>
                  {copied ? (
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Email Display for non-success phases */}
        {currentPhase !== 'success' && content.showEmail && email && (
          <div className="bg-gray-50 rounded-lg px-4 py-3 text-center">            
            <p className="text-sm font-bold text-gray-800 break-all">{email}</p>
          </div>
        )}

        {/* Progress Dots */}
        <div className="flex gap-2 mt-6 justify-center">
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
            currentPhase === 'submitting' ? 'bg-gray-700 w-8' : 'bg-gray-300'
          }`} />
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
            currentPhase === 'sending' ? 'bg-gray-700 w-8' :
            currentPhase === 'sent' || currentPhase === 'success' ? 'bg-green-600' : 'bg-gray-300'
          }`} />
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
            currentPhase === 'sent' ? 'bg-green-600 w-8' :
            currentPhase === 'success' ? 'bg-green-600' : 'bg-gray-300'
          }`} />
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
            currentPhase === 'success' ? 'bg-green-600 w-8' : 'bg-gray-300'
          }`} />
        </div>
      </div>
    </div>
  );
}