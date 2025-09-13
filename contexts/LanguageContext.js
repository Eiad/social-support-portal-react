'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    applicationTitle: 'Social Support Application',
    step: 'Step',
    of: 'of',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit Application',
    saving: 'Saving...',
    submitting: 'Submitting...',
    applicationSubmitted: 'Application Submitted Successfully!',
    applicationNumber: 'Your application number is',
    error: 'An error occurred. Please try again.',
    helpMeWrite: 'Help Me Write',
    aiSuggestion: 'AI Suggestion',
    accept: 'Accept',
    edit: 'Edit',
    discard: 'Discard',
    required: 'This field is required',
    invalidEmail: 'Invalid email address',
    invalidPhone: 'Invalid phone number',
    provideBasicInfo: 'Please provide your basic information',
    completeInSteps: 'Complete your application in a few simple steps',
    helpMeWrite: 'Help Me Write',
    
    // Tooltips
    nationalIdTooltip: 'Enter your national ID number as shown on your official identification document',
    phoneTooltip: 'Include your country code (e.g., +971 for UAE). This will be used for important updates about your application',
    emailTooltip: 'Provide a valid email address. You will receive confirmation and status updates via email',
    dateOfBirthTooltip: 'Select your date of birth. This information is used to verify your eligibility for age-specific programs',
    genderTooltip: 'Select your gender as shown on your official documents',
    addressTooltip: 'Provide your complete residential address including building number, street name, and area',
    
    // Step 1
    personalInformation: 'Personal Information',
    name: 'Full Name',
    nationalId: 'National ID',
    dateOfBirth: 'Date of Birth',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    address: 'Address',
    city: 'City',
    state: 'State',
    country: 'Country',
    phone: 'Phone Number',
    email: 'Email Address',
    
    // Step 2
    familyFinancialInfo: 'Family & Financial Information',
    maritalStatus: 'Marital Status',
    single: 'Single',
    married: 'Married',
    divorced: 'Divorced',
    widowed: 'Widowed',
    dependents: 'Number of Dependents',
    employmentStatus: 'Employment Status',
    employed: 'Employed',
    unemployed: 'Unemployed',
    selfEmployed: 'Self-Employed',
    retired: 'Retired',
    monthlyIncome: 'Monthly Income',
    housingStatus: 'Housing Status',
    owned: 'Owned',
    rented: 'Rented',
    withFamily: 'Living with Family',
    
    // Step 3
    situationDescriptions: 'Situation Descriptions',
    currentSituation: 'Current Financial Situation',
    currentSituationPlaceholder: 'Describe your current financial situation and challenges...',
    employmentCircumstances: 'Employment Circumstances',
    employmentCircumstancesPlaceholder: 'Explain your employment situation and any obstacles...',
    reasonForApplying: 'Reason for Applying',
    reasonForApplyingPlaceholder: 'Explain why you are applying for social support...',
    
    // Step 4
    reviewAndSubmit: 'Review and Submit',
    reviewYourInfo: 'Please review your information carefully before submitting',
    readyToSubmit: 'Ready to Submit?',
    submitWarning: 'Please ensure all information is correct as changes cannot be made after submission.',
    submitApplication: 'Submit Application',
  },
  ar: {
    applicationTitle: 'طلب الدعم الاجتماعي',
    step: 'الخطوة',
    of: 'من',
    next: 'التالي',
    previous: 'السابق',
    submit: 'إرسال الطلب',
    saving: 'جاري الحفظ...',
    submitting: 'جاري الإرسال...',
    applicationSubmitted: 'تم إرسال الطلب بنجاح!',
    applicationNumber: 'رقم طلبك هو',
    error: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
    helpMeWrite: 'ساعدني في الكتابة',
    aiSuggestion: 'اقتراح الذكاء الاصطناعي',
    accept: 'قبول',
    edit: 'تعديل',
    discard: 'رفض',
    required: 'هذا الحقل مطلوب',
    invalidEmail: 'عنوان البريد الإلكتروني غير صالح',
    invalidPhone: 'رقم الهاتف غير صالح',
    provideBasicInfo: 'يرجى تقديم معلوماتك الأساسية',
    completeInSteps: 'أكمل طلبك في خطوات بسيطة',
    helpMeWrite: 'ساعدني في الكتابة',
    
    // Tooltips
    nationalIdTooltip: 'أدخل رقم الهوية الوطنية كما يظهر في وثائق هويتك الرسمية',
    phoneTooltip: 'أدخل رمز الدولة (مثال: +971 للإمارات). سيتم استخدام هذا الرقم لإرسال تحديثات مهمة حول طلبك',
    emailTooltip: 'قدم عنوان بريد إلكتروني صحيح. ستتلقى تأكيدات وتحديثات الحالة عبر البريد الإلكتروني',
    dateOfBirthTooltip: 'اختر تاريخ ميلادك. تستخدم هذه المعلومة للتحقق من أهليتك للبرامج المخصصة لفئات عمرية محددة',
    genderTooltip: 'اختر جنسك كما يظهر في وثائقك الرسمية',
    addressTooltip: 'قدم عنوانك السكني الكامل بما في ذلك رقم المبنى واسم الشارع والمنطقة',
    
    // Step 1
    personalInformation: 'المعلومات الشخصية',
    name: 'الاسم الكامل',
    nationalId: 'الهوية الوطنية',
    dateOfBirth: 'تاريخ الميلاد',
    gender: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    address: 'العنوان',
    city: 'المدينة',
    state: 'المحافظة',
    country: 'الدولة',
    phone: 'رقم الهاتف',
    email: 'البريد الإلكتروني',
    
    // Step 2
    familyFinancialInfo: 'معلومات الأسرة والمالية',
    maritalStatus: 'الحالة الاجتماعية',
    single: 'أعزب',
    married: 'متزوج',
    divorced: 'مطلق',
    widowed: 'أرمل',
    dependents: 'عدد المعالين',
    employmentStatus: 'حالة التوظيف',
    employed: 'موظف',
    unemployed: 'عاطل عن العمل',
    selfEmployed: 'عمل حر',
    retired: 'متقاعد',
    monthlyIncome: 'الدخل الشهري',
    housingStatus: 'وضع السكن',
    owned: 'ملك',
    rented: 'إيجار',
    withFamily: 'مع العائلة',
    
    // Step 3
    situationDescriptions: 'وصف الحالة',
    currentSituation: 'الوضع المالي الحالي',
    currentSituationPlaceholder: 'صف وضعك المالي الحالي والتحديات التي تواجهها...',
    employmentCircumstances: 'ظروف العمل',
    employmentCircumstancesPlaceholder: 'اشرح وضعك الوظيفي وأي عقبات تواجهها...',
    reasonForApplying: 'سبب التقديم',
    reasonForApplyingPlaceholder: 'اشرح سبب تقديمك للحصول على الدعم الاجتماعي...',
    
    // Step 4
    reviewAndSubmit: 'مراجعة وإرسال',
    reviewYourInfo: 'يرجى مراجعة معلوماتك بعناية قبل الإرسال',
    readyToSubmit: 'جاهز للإرسال؟',
    submitWarning: 'يرجى التأكد من صحة جميع المعلومات حيث لا يمكن إجراء تغييرات بعد الإرسال.',
    submitApplication: 'إرسال الطلب',
  }
};

export const LanguageProvider = ({ children, lang }) => {
  const language = lang || 'en';

  const t = (key) => {
    if (!translations[language]) {
      console.warn(`Language ${language} not found, falling back to 'en'`);
      return translations['en'][key] || key;
    }
    return translations[language][key] || key;
  };

  const value = {
    language,
    t,
    isRTL: language === 'ar'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};