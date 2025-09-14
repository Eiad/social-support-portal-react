'use client';

import { Mail, CheckCircle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { triggerFormCompletion } from './CelebrationEffects';
import { useLanguage } from '@/contexts/LanguageContext';

export default function EmailSendingOverlay({ email, phase, onComplete, applicationNumber }) {
  const { t } = useLanguage();
  const [currentPhase, setCurrentPhase] = useState(phase);
  const [showCheck, setShowCheck] = useState(false);

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
          icon: (
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle size={24} className="text-white" />
            </div>
          ),
          title: t('applicationSubmittedSuccess'),
          description: t('applicationSuccessDesc'),
          showEmail: false
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
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 animate-scaleIn relative">
        {/* Close Button - only show in success phase */}
        {currentPhase === 'success' && (
          <button
            onClick={onComplete}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
            aria-label="Close"
          >
            <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className={`p-4 rounded-full ${
            currentPhase === 'sent' ? 'bg-green-50' : 'bg-gray-50'
          } transition-all duration-500`}>
            {content.icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
          {content.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-center text-sm mb-4">
          {content.description}
        </p>

        {/* Email Display */}
        {content.showEmail && email && (
          <div className="bg-gray-50 rounded-lg px-4 py-3 text-center">
            <p className="text-xs text-gray-500 mb-1">{t('sendingTo')}</p>
            <p className="text-sm font-medium text-gray-800 break-all">{email}</p>
          </div>
        )}

        {/* Application Number Display - only show in success phase */}
        {currentPhase === 'success' && applicationNumber && (
          <div className="bg-gray-50 rounded-lg px-4 py-3 text-center mb-4">
            <p className="text-xs text-gray-500 mb-1">{t('applicationNumber')}</p>
            <p className="text-sm font-medium text-gray-800 break-all font-mono">
              {applicationNumber}
            </p>
          </div>
        )}

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-6">
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