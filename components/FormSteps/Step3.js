'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useFormContext } from '@/contexts/FormContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/lib/apiClient';
import AIAssistModal from '../AIAssistModal';
import Tooltip from '../Tooltip';
import { Wand2, Loader2 } from 'lucide-react';

export default function Step3() {
  const { formData, updateFormData, updateFieldData, prevStep, nextStep } = useFormContext();
  const { t, language } = useLanguage();

  const MIN_CHARACTERS = 10;

  /**
   * Handle auto-save for long-form text fields
   * Saves user's progress automatically to prevent data loss
   * Especially important for lengthy descriptions that take time to write
   */
  const handleFieldBlur = (fieldName, value) => {
    if (value && value.trim() !== '' && value.trim().length >= 10) {
      updateFieldData(fieldName, value.trim());
    }
  };
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      currentSituation: formData.currentSituation,
      employmentCircumstances: formData.employmentCircumstances,
      reasonForApplying: formData.reasonForApplying
    }
  });

  // Update form only when component mounts
  useEffect(() => {
    reset({
      currentSituation: formData.currentSituation,
      employmentCircumstances: formData.employmentCircumstances,
      reasonForApplying: formData.reasonForApplying
    });
  }, []); // Only run on mount

  const watchedValues = watch();

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  const generateAISuggestion = async (fieldName, userText) => {
    
    if (!userText || userText.trim().length < 10) {
      const message = language === 'ar' 
        ? 'يرجى كتابة بضع كلمات على الأقل أولاً، ثم يمكنني مساعدتك في تحسين النص.'
        : 'Please write at least a few words first, then I can help improve your text.';
      alert(message);
      return;
    }

    setCurrentField(fieldName);
    setShowAIModal(true);
    setIsLoadingAI(true);
    
    try {
      const prompt = getPromptForField(fieldName, userText, language);
      const data = await api.getAIAssistance(prompt, userText, language);
      setAiSuggestion(data.suggestion);
    } catch (error) {
      console.error('AI Assist error:', error);
      const errorMessage = language === 'ar'
        ? 'عذراً، لم أتمكن من إنشاء اقتراح في هذا الوقت. يرجى المحاولة مرة أخرى.'
        : 'Sorry, I could not generate a suggestion at this time. Please try again.';
      setAiSuggestion(errorMessage);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleAIAssist = (fieldName) => {
    const currentValue = watchedValues[fieldName];
    generateAISuggestion(fieldName, currentValue);
  };

  const getPromptForField = (fieldName, currentText, language = 'en') => {
    const isArabic = language === 'ar';
    
    if (isArabic) {
      // Arabic prompts
      switch(fieldName) {
        case 'currentSituation':
          return `أنت تساعد شخصاً في كتابة طلب دعم اجتماعي حكومي مقنع. استناداً إلى وصفهم المختصر، اكتب تفسيراً تفصيلياً ومهنياً ومتعاطفاً لوضعهم المالي الحالي. اجعله مقنعاً ولكن صادقاً، واذكر التحديات المحددة التي يواجهونها، ووضح كيف يؤثر ذلك على حياتهم اليومية. اكتب بين 120-180 كلمة واستخدم لغة رسمية مناسبة للطلبات الحكومية.

الوصف المختصر للمستخدم: "${currentText}"

اكتب بياناً مهنياً شاملاً عن وضعهم المالي الحالي يساعد في تبرير حاجتهم للدعم الاجتماعي.`;

        case 'employmentCircumstances':
          return `أنت تساعد شخصاً في كتابة طلب دعم اجتماعي حكومي. استناداً إلى وصفهم المختصر، اكتب تفسيراً تفصيلياً ومهنياً لظروف عملهم وأي عقبات يواجهونها. اذكر تفاصيل محددة حول جهود البحث عن العمل، والحواجز التي تحول دون التوظيف، والمهارات أو المؤهلات، وكيف تؤثر حالتهم على قدرتهم على العمل. اكتب بين 120-180 كلمة واستخدم لغة رسمية.

الوصف المختصر للمستخدم: "${currentText}"

اكتب بياناً مهنياً شاملاً عن ظروف عملهم يوضح وضعهم بوضوح.`;

        case 'reasonForApplying':
          return `أنت تساعد شخصاً في كتابة طلب دعم اجتماعي حكومي. استناداً إلى وصفهم المختصر، اكتب تفسيراً تفصيلياً ومهنياً ومقنعاً لسبب حاجتهم للدعم الاجتماعي. اذكر الاحتياجات المحددة، وكيف سيساعدهم الدعم، وجهودهم لتحسين وضعهم، والتزامهم باستخدام المساعدة بمسؤولية. اكتب بين 120-180 كلمة واستخدم لغة رسمية ومحترمة.

الوصف المختصر للمستخدم: "${currentText}"

اكتب بياناً مهنياً شاملاً يوضح سبب استحقاقهم لمساعدة الدعم الاجتماعي.`;

        default:
          return `قم بتوسيع وتطوير هذا النص ليكون مهنياً ومناسباً لطلب حكومي: "${currentText}"`;
      }
    } else {
      // English prompts
      switch(fieldName) {
        case 'currentSituation':
          return `You are helping someone write a compelling government Gov Social Support. Based on their brief description, write a detailed, professional, and empathetic explanation of their current financial situation. Make it convincing but honest, include specific challenges they face, and explain how this impacts their daily life. Keep it between 120-180 words and use formal language appropriate for government applications.

User's brief description: "${currentText}"

Write a comprehensive professional statement about their current financial situation that would help justify their need for social support.`;

        case 'employmentCircumstances':
          return `You are helping someone write a compelling government Gov Social Support. Based on their brief description, write a detailed, professional explanation of their employment circumstances and any obstacles they face. Include specific details about their job search efforts, barriers to employment, skills or qualifications, and how their situation affects their ability to work. Keep it between 120-180 words and use formal language.

User's brief description: "${currentText}"

Write a comprehensive professional statement about their employment circumstances that explains their situation clearly.`;

        case 'reasonForApplying':
          return `You are helping someone write a compelling government Gov Social Support. Based on their brief description, write a detailed, professional, and persuasive explanation of why they need social support. Include specific needs, how the support would help them, their efforts to improve their situation, and their commitment to using the assistance responsibly. Keep it between 120-180 words and use formal, respectful language.

User's brief description: "${currentText}"

Write a comprehensive professional statement explaining why they deserve social support assistance.`;

        default:
          return `Expand and professionalize this text for a government application: "${currentText}"`;
      }
    }
  };

  /**
   * Handle applying AI suggestion to textarea
   * Automatically saves the AI-generated content to localStorage
   * This ensures the valuable AI content is preserved immediately
   */
  const handleApplySuggestion = () => {
    // Apply the AI suggestion to the form field
    setValue(currentField, aiSuggestion);

    // Immediately auto-save the AI-generated content
    // This is important since AI suggestions are valuable and should be preserved
    updateFieldData(currentField, aiSuggestion);

    // Close the modal and reset state
    setShowAIModal(false);
    setAiSuggestion('');
    setCurrentField('');
  };

  const handleRegenerateSuggestion = () => {
    const currentValue = watchedValues[currentField];
    setIsLoadingAI(true);
    generateAISuggestion(currentField, currentValue);
  };

  const handleDiscardSuggestion = () => {
    setShowAIModal(false);
    setAiSuggestion('');
    setCurrentField('');
    setIsLoadingAI(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {t('situationDescriptions')}
        </h2>

        <div className="space-y-6">
          {/* Current Financial Situation */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="currentSituation" className="block text-sm font-medium text-gray-700">
                {t('currentSituation')} *
              </label>
              <Tooltip
                content={watchedValues.currentSituation && watchedValues.currentSituation.trim().length >= 10
                  ? t('aiAssistCurrentSituation')
                  : t('aiAssistCurrentSituationDisabled')
                }
                position="left"
              >
                <button
                  type="button"
                  onClick={() => handleAIAssist('currentSituation')}
                  className={`relative group flex items-center gap-2 text-sm px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 ${
                    watchedValues.currentSituation && watchedValues.currentSituation.trim().length >= 10
                      ? 'bg-gray-900 text-white hover:bg-black hover:shadow-lg transform hover:scale-105'
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200 opacity-60'
                  }`}
                  disabled={!watchedValues.currentSituation || watchedValues.currentSituation.trim().length < 10}
                  aria-label={`AI enhance text for ${t('currentSituation')}`}
                >
                  <Wand2
                    size={14}
                    className={watchedValues.currentSituation && watchedValues.currentSituation.trim().length >= 10
                      ? 'group-hover:animate-pulse'
                      : ''
                    }
                  />
                  {t('helpMeWrite')}
                </button>
              </Tooltip>
            </div>
            <textarea
              id="currentSituation"
              {...register('currentSituation', {
                required: t('required'),
                minLength: {
                  value: MIN_CHARACTERS,
                  message: t('minCharacters').replace('{{count}}', MIN_CHARACTERS)
                }
              })}
              onBlur={(e) => handleFieldBlur('currentSituation', e.target.value)}
              rows="4"
              placeholder={t('currentSituationPlaceholder')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500 resize-vertical min-h-[100px]"
              aria-invalid={errors.currentSituation ? 'true' : 'false'}
            />
            {errors.currentSituation && (
              <span className="text-red-500 text-sm mt-1" role="alert">{errors.currentSituation.message}</span>
            )}
          </div>

          {/* Employment Circumstances */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="employmentCircumstances" className="block text-sm font-medium text-gray-700">
                {t('employmentCircumstances')} *
              </label>
              <Tooltip
                content={watchedValues.employmentCircumstances && watchedValues.employmentCircumstances.trim().length >= 10
                  ? t('aiAssistEmployment')
                  : t('aiAssistEmploymentDisabled')
                }
                position="left"
              >
                <button
                  type="button"
                  onClick={() => handleAIAssist('employmentCircumstances')}
                  className={`relative group flex items-center gap-2 text-sm px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 ${
                    watchedValues.employmentCircumstances && watchedValues.employmentCircumstances.trim().length >= 10
                      ? 'bg-gray-900 text-white hover:bg-black hover:shadow-lg transform hover:scale-105'
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200 opacity-60'
                  }`}
                  disabled={!watchedValues.employmentCircumstances || watchedValues.employmentCircumstances.trim().length < 10}
                  aria-label={`AI enhance text for ${t('employmentCircumstances')}`}
                >
                  <Wand2
                    size={14}
                    className={watchedValues.employmentCircumstances && watchedValues.employmentCircumstances.trim().length >= 10
                      ? 'group-hover:animate-pulse'
                      : ''
                    }
                  />
                  {t('helpMeWrite')}
                </button>
              </Tooltip>
            </div>
            <textarea
              id="employmentCircumstances"
              {...register('employmentCircumstances', {
                required: t('required'),
                minLength: {
                  value: MIN_CHARACTERS,
                  message: t('minCharacters').replace('{{count}}', MIN_CHARACTERS)
                }
              })}
              onBlur={(e) => handleFieldBlur('employmentCircumstances', e.target.value)}
              rows="4"
              placeholder={t('employmentCircumstancesPlaceholder')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500 resize-vertical min-h-[100px]"
              aria-invalid={errors.employmentCircumstances ? 'true' : 'false'}
            />
            {errors.employmentCircumstances && (
              <span className="text-red-500 text-sm mt-1" role="alert">{errors.employmentCircumstances.message}</span>
            )}
          </div>

          {/* Reason for Applying */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="reasonForApplying" className="block text-sm font-medium text-gray-700">
                {t('reasonForApplying')} *
              </label>
              <Tooltip
                content={watchedValues.reasonForApplying && watchedValues.reasonForApplying.trim().length >= 10
                  ? t('aiAssistReasonApplying')
                  : t('aiAssistReasonApplyingDisabled')
                }
                position="left"
              >
                <button
                  type="button"
                  onClick={() => handleAIAssist('reasonForApplying')}
                  className={`relative group flex items-center gap-2 text-sm px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 ${
                    watchedValues.reasonForApplying && watchedValues.reasonForApplying.trim().length >= 10
                      ? 'bg-gray-900 text-white hover:bg-black hover:shadow-lg transform hover:scale-105'
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200 opacity-60'
                  }`}
                  disabled={!watchedValues.reasonForApplying || watchedValues.reasonForApplying.trim().length < 10}
                  aria-label={`AI enhance text for ${t('reasonForApplying')}`}
                >
                  <Wand2
                    size={14}
                    className={watchedValues.reasonForApplying && watchedValues.reasonForApplying.trim().length >= 10
                      ? 'group-hover:animate-pulse'
                      : ''
                    }
                  />
                  {t('helpMeWrite')}
                </button>
              </Tooltip>
            </div>
            <textarea
              id="reasonForApplying"
              {...register('reasonForApplying', {
                required: t('required'),
                minLength: {
                  value: MIN_CHARACTERS,
                  message: t('minCharacters').replace('{{count}}', MIN_CHARACTERS)
                }
              })}
              onBlur={(e) => handleFieldBlur('reasonForApplying', e.target.value)}
              rows="4"
              placeholder={t('reasonForApplyingPlaceholder')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500 resize-vertical min-h-[100px]"
              aria-invalid={errors.reasonForApplying ? 'true' : 'false'}
            />
            {errors.reasonForApplying && (
              <span className="text-red-500 text-sm mt-1" role="alert">{errors.reasonForApplying.message}</span>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('previous')}
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-gray-800 to-black text-white font-medium rounded-lg hover:from-gray-700 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
          >
            {t('next')}
          </button>
        </div>
      </form>

      {showAIModal && (
        <AIAssistModal
          suggestion={aiSuggestion}
          isLoading={isLoadingAI}
          onApply={handleApplySuggestion}
          onRegenerate={handleRegenerateSuggestion}
          onDiscard={handleDiscardSuggestion}
        />
      )}
    </>
  );
}