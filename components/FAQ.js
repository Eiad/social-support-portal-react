'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const { language } = useLanguage();
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqs = language === 'ar' ? [
    {
      question: 'ما هي أنواع الدعم الاجتماعي المتاحة؟',
      answer: 'نقدم عدة أنواع من الدعم الاجتماعي منها: المساعدات المالية الشهرية (150-800 ريال)، كوبونات الطعام والأساسيات، دعم الإسكان وإيجار المساكن، المساعدة الطبية والعلاج، برامج التدريب المهني والتأهيل، ودعم الأطفال والتعليم.'
    },
    {
      question: 'ما هي شروط الاستحقاق للحصول على الدعم؟',
      answer: 'الشروط الأساسية تشمل: كونك مواطناً أو مقيماً شرعياً، إثبات الحاجة المالية (الدخل الشهري أقل من 2000 ريال للفرد أو 4000 ريال للأسرة)، عدم امتلاك أصول كبيرة، التعاون مع خطط إعادة التأهيل إذا كان ذلك مناسباً.'
    },
    {
      question: 'كم من الوقت يستغرق معالجة الطلب؟',
      answer: 'عادة ما تستغرق معالجة الطلبات من 2-4 أسابيع. الطلبات العاجلة قد تُعالج في أسبوع واحد. سنقوم بإرسال تحديثات منتظمة عبر الهاتف أو البريد الإلكتروني حول حالة طلبك.'
    },
    {
      question: 'ما المستندات المطلوبة لتقديم الطلب؟',
      answer: 'المستندات المطلوبة: نسخة من الهوية الوطنية أو الإقامة، إثبات الدخل (كشف راتب أو إفادة عدم عمل)، إثبات السكن، الفواتير المالية والالتزامات، تقارير طبية إن وجدت، وكشف حساب بنكي للشهور الثلاثة الأخيرة.'
    },
    {
      question: 'هل يمكنني الحصول على أكثر من نوع من الدعم؟',
      answer: 'نعم، يمكن الجمع بين أنواع مختلفة من الدعم حسب الحاجة. على سبيل المثال، يمكن الحصول على المساعدة المالية الشهرية مع كوبونات الطعام ودعم السكن معاً، شريطة استيفاء شروط كل برنامج.'
    },
    {
      question: 'كيف يتم توزيع المساعدات المالية؟',
      answer: 'يتم توزيع المساعدات عبر التحويل المصرفي المباشر إلى حسابك البنكي شهرياً، أو من خلال بطاقات الدفع المسبق، أو نقداً في مكاتبنا المحلية في حالات خاصة. نوفر أيضاً تطبيقاً مصرفياً لتتبع المدفوعات.'
    }
  ] : [
    {
      question: 'What types of social support are available?',
      answer: 'We offer several types of social support including: monthly financial assistance ($150-800), food stamps and essential goods vouchers, housing support and rent assistance, medical aid and healthcare coverage, vocational training and rehabilitation programs, and child support and education assistance.'
    },
    {
      question: 'What are the eligibility requirements for support?',
      answer: 'Basic requirements include: being a citizen or legal resident, proof of financial need (monthly income below $2,000 for individual or $4,000 for family), not owning significant assets, willingness to cooperate with rehabilitation plans when applicable, and providing accurate information throughout the application process.'
    },
    {
      question: 'How long does the application process take?',
      answer: 'Application processing typically takes 2-4 weeks. Urgent cases may be processed within one week. We provide regular updates via phone or email about your application status, and you can track progress through our online portal.'
    },
    {
      question: 'What documents are required for the application?',
      answer: 'Required documents include: copy of national ID or residence permit, proof of income (pay stubs or unemployment statement), proof of residence, financial statements and obligations, medical reports if applicable, and bank statements for the last three months.'
    },
    {
      question: 'Can I receive multiple types of support?',
      answer: 'Yes, different types of support can be combined based on need. For example, you may receive monthly financial assistance along with food vouchers and housing support simultaneously, provided you meet the eligibility criteria for each program.'
    },
    {
      question: 'How are financial benefits distributed?',
      answer: 'Benefits are distributed through direct bank transfer to your account monthly, prepaid benefit cards, or cash pickup at our local offices in special cases. We also provide a mobile app for tracking payments and managing your benefits.'
    }
  ];

  return (
    <div className="w-full bg-gray-50 py-16 mt-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
          <HelpCircle size={24} className="text-blue-600" />
        </div>
        <h2 className="text-2xl font-normal text-gray-900 mb-2 font-sans">
          {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
        </h2>
        <p className="text-sm text-gray-600 font-sans">
          {language === 'ar' 
            ? 'إجابات على الأسئلة الأكثر شيوعاً حول برامج الدعم الاجتماعي'
            : 'Answers to common questions about social support programs'
          }
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-100 last:border-b-0">
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 focus:outline-none"
              onClick={() => toggleItem(index)}
            >
              <h3 className="text-sm font-medium text-gray-800 font-sans pr-4">
                {faq.question}
              </h3>
              <div className="flex-shrink-0">
                {openItems[index] ? (
                  <ChevronUp size={20} className="text-gray-500" />
                ) : (
                  <ChevronDown size={20} className="text-gray-500" />
                )}
              </div>
            </button>
            
            {openItems[index] && (
              <div className="px-6 pb-4 animate-slideUp">
                <p className="text-sm text-gray-600 leading-relaxed font-sans">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 text-center font-sans">
            {language === 'ar' 
              ? 'لم تجد إجابة لسؤالك؟ اتصل بنا على الرقم 800-123-4567 أو أرسل بريداً إلكترونياً إلى support@social-portal.gov'
              : 'Do you have an urgent case? Contact us at 800-123-4567 or email support@social-portal.gov'
            }
          </p>
        </div>
      </div>
    </div>
  );
}