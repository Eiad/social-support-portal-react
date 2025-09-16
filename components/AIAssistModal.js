'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles, RotateCcw, Check, X, Brain } from 'lucide-react';
import { AILoadingSkeleton } from './Skeleton';
import { useEffect } from 'react';

export default function AIAssistModal({ suggestion, onApply, onRegenerate, onDiscard, isLoading }) {
  const { t, language } = useLanguage();

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[10000] p-4 transition-all duration-200">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4">
          <AILoadingSkeleton
            message={language === 'ar' ? 'جاري صياغة محتوى احترافي...' : 'Crafting professional content...'}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[10000] p-4 transition-all duration-200 animate-fadeIn">
      {/* Modal container with improved shadow and animation */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] sm:max-h-[70vh] overflow-hidden mx-4 flex flex-col transform transition-all duration-300 animate-scaleIn">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex-shrink-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-blue-600 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">
                {language === 'ar' ? 'المحتوى الاحترافي المقترح' : 'Professional Content Suggestion'}
              </span>
            </div>
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
            {language === 'ar'
              ? 'قمنا بصياغة محتوى احترافي ومقنع لطلبك:'
              : 'We\'ve crafted professional and compelling content for your application:'
            }
          </p>
        </div>
        
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto min-h-0">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">{suggestion}</p>
          </div>
        </div>
        
        <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50 flex-shrink-0">
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
            <button
              onClick={onDiscard}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 order-3 sm:order-1"
            >
              <div className="flex items-center justify-center gap-1 text-sm sm:text-base">
                <X size={16} />
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </div>
            </button>
            <div className="flex flex-col sm:flex-row gap-3 sm:space-x-3 order-1 sm:order-2">
              <button
                onClick={onRegenerate}
                className="px-4 sm:px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200 font-medium w-full sm:w-auto"
              >
                <div className="flex items-center justify-center gap-1 text-sm sm:text-base">
                  <RotateCcw size={16} />
                  {language === 'ar' ? 'إعادة إنشاء' : 'Regenerate'}
                </div>
              </button>
              <button
                onClick={onApply}
                className="px-4 sm:px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-medium w-full sm:w-auto"
              >
                <div className="flex items-center justify-center gap-1 text-sm sm:text-base">
                  <Check size={16} />
                  {language === 'ar' ? 'تطبيق النص' : 'Apply Text'}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}