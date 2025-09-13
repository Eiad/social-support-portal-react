'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFormContext } from '@/contexts/FormContext';
import { useLanguage } from '@/contexts/LanguageContext';
import AIAssistModal from '../AIAssistModal';
import { Wand2, Loader2 } from 'lucide-react';

export default function Step3({ onSubmit: handleFormSubmit }) {
  const { formData, updateFormData, prevStep } = useFormContext();
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      currentSituation: formData.currentSituation,
      employmentCircumstances: formData.employmentCircumstances,
      reasonForApplying: formData.reasonForApplying
    }
  });

  const watchedValues = watch();

  const onSubmit = async (data) => {
    updateFormData(data);
    setIsSubmitting(true);
    await handleFormSubmit({ ...formData, ...data });
    setIsSubmitting(false);
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
      const response = await fetch('/api/ai-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, currentText: userText, language })
      });
      
      if (response.ok) {
        const data = await response.json();
        setAiSuggestion(data.suggestion);
      } else {
        throw new Error('Failed to get AI assistance');
      }
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
          return `You are helping someone write a compelling government social support application. Based on their brief description, write a detailed, professional, and empathetic explanation of their current financial situation. Make it convincing but honest, include specific challenges they face, and explain how this impacts their daily life. Keep it between 120-180 words and use formal language appropriate for government applications.

User's brief description: "${currentText}"

Write a comprehensive professional statement about their current financial situation that would help justify their need for social support.`;

        case 'employmentCircumstances':
          return `You are helping someone write a compelling government social support application. Based on their brief description, write a detailed, professional explanation of their employment circumstances and any obstacles they face. Include specific details about their job search efforts, barriers to employment, skills or qualifications, and how their situation affects their ability to work. Keep it between 120-180 words and use formal language.

User's brief description: "${currentText}"

Write a comprehensive professional statement about their employment circumstances that explains their situation clearly.`;

        case 'reasonForApplying':
          return `You are helping someone write a compelling government social support application. Based on their brief description, write a detailed, professional, and persuasive explanation of why they need social support. Include specific needs, how the support would help them, their efforts to improve their situation, and their commitment to using the assistance responsibly. Keep it between 120-180 words and use formal, respectful language.

User's brief description: "${currentText}"

Write a comprehensive professional statement explaining why they deserve social support assistance.`;

        default:
          return `Expand and professionalize this text for a government application: "${currentText}"`;
      }
    }
  };

  const handleApplySuggestion = () => {
    setValue(currentField, aiSuggestion);
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
              <button
                type="button"
                onClick={() => handleAIAssist('currentSituation')}
                className={`flex items-center gap-2 text-sm px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  watchedValues.currentSituation && watchedValues.currentSituation.trim().length >= 10
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:shadow-sm' 
                    : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!watchedValues.currentSituation || watchedValues.currentSituation.trim().length < 10}
                aria-label={`AI enhance text for ${t('currentSituation')}`}
              >
                <Wand2 size={14} />
                {t('helpMeWrite')}
              </button>
            </div>
            <textarea
              id="currentSituation"
              {...register('currentSituation', { 
                required: t('required'),
                minLength: { value: 50, message: 'Please provide at least 50 characters' }
              })}
              rows="4"
              placeholder={t('currentSituationPlaceholder')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical min-h-[100px]"
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
              <button
                type="button"
                onClick={() => handleAIAssist('employmentCircumstances')}
                className={`flex items-center gap-2 text-sm px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  watchedValues.employmentCircumstances && watchedValues.employmentCircumstances.trim().length >= 10
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:shadow-sm' 
                    : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!watchedValues.employmentCircumstances || watchedValues.employmentCircumstances.trim().length < 10}
                aria-label={`AI enhance text for ${t('employmentCircumstances')}`}
              >
                <Wand2 size={14} />
                {t('helpMeWrite')}
              </button>
            </div>
            <textarea
              id="employmentCircumstances"
              {...register('employmentCircumstances', { 
                required: t('required'),
                minLength: { value: 50, message: 'Please provide at least 50 characters' }
              })}
              rows="4"
              placeholder={t('employmentCircumstancesPlaceholder')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical min-h-[100px]"
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
              <button
                type="button"
                onClick={() => handleAIAssist('reasonForApplying')}
                className={`flex items-center gap-2 text-sm px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  watchedValues.reasonForApplying && watchedValues.reasonForApplying.trim().length >= 10
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:shadow-sm' 
                    : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!watchedValues.reasonForApplying || watchedValues.reasonForApplying.trim().length < 10}
                aria-label={`AI enhance text for ${t('reasonForApplying')}`}
              >
                <Wand2 size={14} />
                {t('helpMeWrite')}
              </button>
            </div>
            <textarea
              id="reasonForApplying"
              {...register('reasonForApplying', { 
                required: t('required'),
                minLength: { value: 50, message: 'Please provide at least 50 characters' }
              })}
              rows="4"
              placeholder={t('reasonForApplyingPlaceholder')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical min-h-[100px]"
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
            disabled={isSubmitting}
            className="px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('previous')}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t('submitting') : t('submit')}
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