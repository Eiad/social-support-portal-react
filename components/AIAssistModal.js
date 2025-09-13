'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles, RotateCcw, Check, X, Brain } from 'lucide-react';
import { AILoadingSkeleton } from './Skeleton';

export default function AIAssistModal({ suggestion, onApply, onRegenerate, onDiscard, isLoading }) {
  const { t, language } = useLanguage();

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
          <AILoadingSkeleton 
            message={language === 'ar' ? 'جاري صياغة محتوى احترافي...' : 'Crafting professional content...'}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[70vh] overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-blue-600" />
              {language === 'ar' ? 'المحتوى الاحترافي المقترح' : 'Professional Content Suggestion'}
            </div>
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {language === 'ar' 
              ? 'قمنا بصياغة محتوى احترافي ومقنع لطلبك:'
              : 'We\'ve crafted professional and compelling content for your application:'
            }
          </p>
        </div>
        
        <div className="p-6 max-h-80 overflow-y-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{suggestion}</p>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex justify-between">
            <button
              onClick={onDiscard}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
            >
              <div className="flex items-center gap-1">
                <X size={16} />
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </div>
            </button>
            <div className="flex space-x-3">
              <button
                onClick={onRegenerate}
                className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200 font-medium"
              >
                <div className="flex items-center gap-1">
                  <RotateCcw size={16} />
                  {language === 'ar' ? 'إعادة إنشاء' : 'Regenerate'}
                </div>
              </button>
              <button
                onClick={onApply}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-medium"
              >
                <div className="flex items-center gap-1">
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