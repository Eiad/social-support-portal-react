'use client';

import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle({ currentLang }) {
  const { language } = useLanguage();
  const router = useRouter();

  const handleLanguageToggle = () => {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    router.push(`/${newLang}`);
  };

  return (
    <button
      onClick={handleLanguageToggle}
      className="fixed top-4 right-4 z-50 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Toggle language"
    >
      <span className="font-medium">
        {currentLang === 'en' ? 'العربية' : 'English'}
      </span>
    </button>
  );
}