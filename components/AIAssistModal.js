'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles, RotateCcw, Check, X, Brain, Edit3, Save } from 'lucide-react';
import { AILoadingSkeleton } from './Skeleton';
import { useEffect, useState, useRef } from 'react';

export default function AIAssistModal({ suggestion, onApply, onRegenerate, onDiscard, isLoading }) {
  const { t, language } = useLanguage();

  // Edit mode state management
  const [isEditing, setIsEditing] = useState(false);
  const [editedSuggestion, setEditedSuggestion] = useState('');
  const textareaRef = useRef(null);

  // Initialize edited suggestion when suggestion changes
  useEffect(() => {
    setEditedSuggestion(suggestion || '');
    setIsEditing(false);
  }, [suggestion]);

  // Auto-resize textarea and focus when entering edit mode
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [isEditing]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle edit mode toggle
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes, auto-apply to form field, and exit edit mode
      onApply(editedSuggestion);
    } else {
      // Enter edit mode
      setIsEditing(true);
    }
  };

  // Handle textarea change with auto-resize
  const handleTextareaChange = (e) => {
    setEditedSuggestion(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  // Handle regenerate with edited content
  const handleRegenerateWithEdits = () => {
    const contentToRegenerate = isEditing ? editedSuggestion : suggestion;
    // Exit edit mode when regenerating to show new response
    setIsEditing(false);
    onRegenerate(contentToRegenerate);
  };

  // Handle apply with current content (edited or original)
  const handleApplyContent = () => {
    const contentToApply = isEditing ? editedSuggestion : suggestion;
    onApply(contentToApply);
  };

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
          <div className={`bg-blue-50 border-2 transition-all duration-200 ${
            isEditing
              ? 'border-blue-400 bg-blue-25'
              : 'border-blue-200'
          }`}>
            {isEditing ? (
              <textarea
                ref={textareaRef}
                value={editedSuggestion}
                onChange={handleTextareaChange}
                className="w-full p-3 sm:p-4 bg-transparent border-none resize-none focus:outline-none text-gray-800 leading-relaxed text-sm sm:text-base placeholder-gray-400 min-h-[120px]"
                placeholder={language === 'ar'
                  ? 'قم بتعديل النص هنا...'
                  : 'Edit your text here...'
                }
                style={{
                  fontFamily: 'inherit',
                  lineHeight: '1.6'
                }}
              />
            ) : (
              <div className="p-3 sm:p-4">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                  {editedSuggestion || suggestion}
                </p>
              </div>
            )}
          </div>

          {/* Edit mode indicator */}
          {isEditing && (
            <div className="mt-2 flex items-center gap-2 text-xs text-blue-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              {language === 'ar' ? 'وضع التعديل نشط' : 'Edit mode active'}
            </div>
          )}
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
                onClick={handleRegenerateWithEdits}
                className="px-4 sm:px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none transition-colors duration-200 font-medium w-full sm:w-auto"
                title={isEditing
                  ? (language === 'ar' ? 'إعادة إنشاء بناءً على التعديلات' : 'Regenerate with your edits')
                  : (language === 'ar' ? 'إعادة إنشاء' : 'Regenerate')
                }
              >
                <div className="flex items-center justify-center gap-1 text-sm sm:text-base">
                  <RotateCcw size={16} />
                  {language === 'ar' ? 'إعادة إنشاء' : 'Regenerate'}
                </div>
              </button>
              <button
                onClick={handleEditToggle}
                className={`px-4 sm:px-5 py-2.5 rounded-lg focus:outline-none transition-colors duration-200 font-medium w-full sm:w-auto ${
                  isEditing
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title={isEditing
                  ? (language === 'ar' ? 'حفظ التعديلات' : 'Save changes')
                  : (language === 'ar' ? 'تعديل النص' : 'Edit text')
                }
              >
                <div className="flex items-center justify-center gap-1 text-sm sm:text-base">
                  {isEditing ? (
                    <>
                      <Save size={16} />
                      {language === 'ar' ? 'حفظ' : 'Save'}
                    </>
                  ) : (
                    <>
                      <Edit3 size={16} />
                      {language === 'ar' ? 'تعديل' : 'Edit'}
                    </>
                  )}
                </div>
              </button>
              <button
                onClick={handleApplyContent}
                disabled={isEditing}
                className={`px-4 sm:px-5 py-2.5 rounded-lg focus:outline-none transition-colors duration-200 font-medium w-full sm:w-auto ${
                  isEditing
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                title={isEditing
                  ? (language === 'ar' ? 'احفظ التعديلات أولاً' : 'Save changes first')
                  : (language === 'ar' ? 'تطبيق النص' : 'Apply Text')
                }
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