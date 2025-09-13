'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MapPin, Clock, Shield, Heart } from 'lucide-react';

export default function Footer() {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <footer className={`bg-gray-900 text-white mt-16 ${isRTL ? 'font-arabic' : ''}`}>
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Mission */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  {language === 'ar' ? 'بوابة الدعم الاجتماعي' : 'Social Support Portal'}
                </h3>
                <p className="text-sm text-gray-400">
                  {language === 'ar' ? 'خدمات حكومية موثقة' : 'Trusted Government Services'}
                </p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4 max-w-md">
              {language === 'ar' 
                ? 'نسعى لتقديم خدمات الدعم الاجتماعي بكفاءة وشفافية، مع ضمان الوصول العادل للمساعدة لجميع المواطنين والمقيمين.'
                : 'We strive to deliver social support services with efficiency and transparency, ensuring fair access to assistance for all citizens and residents.'
              }
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Shield size={16} />
              <span>
                {language === 'ar' ? 'بياناتك محمية ومؤمنة' : 'Your data is protected and secure'}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  {language === 'ar' ? 'تقديم طلب جديد' : 'Submit New Application'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  {language === 'ar' ? 'تتبع الطلب' : 'Track Application'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  {language === 'ar' ? 'دليل المستخدم' : 'User Guide'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                  {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <Phone size={16} className="text-blue-400 flex-shrink-0" />
                <span>800-123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <Mail size={16} className="text-blue-400 flex-shrink-0" />
                <span>support@social-portal.gov</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <MapPin size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <span>
                  {language === 'ar' 
                    ? 'وزارة الشؤون الاجتماعية\nشارع الخليج العربي\nأبوظبي، الإمارات العربية المتحدة'
                    : 'Ministry of Social Affairs\nArabian Gulf Street\nAbu Dhabi, United Arab Emirates'
                  }
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <Clock size={16} className="text-blue-400 flex-shrink-0" />
                <span>
                  {language === 'ar' ? 'الأحد - الخميس: 8:00 ص - 5:00 م' : 'Sun - Thu: 8:00 AM - 5:00 PM'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400 text-center md:text-left">
              {language === 'ar' 
                ? `© ${new Date().getFullYear()} بوابة الدعم الاجتماعي. جميع الحقوق محفوظة.`
                : `© ${new Date().getFullYear()} Social Support Portal. All rights reserved.`
              }
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                {language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {language === 'ar' ? 'إمكانية الوصول' : 'Accessibility'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}