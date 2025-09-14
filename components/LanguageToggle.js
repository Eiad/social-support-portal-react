'use client';

import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function LanguageToggle({ currentLang, className = '' }) {
  const { language } = useLanguage();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLang) => {
    if (newLang !== currentLang) {
      router.push(`/${newLang}`);
    }
    setIsOpen(false);
  };

  const languages = [
    {
      code: 'en',
      name: 'English',
      flag: '🇬🇧'
    },
    {
      code: 'ar',
      name: 'العربية',
      flag: '🇦🇪'
    }
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLang);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
        aria-label="Select language"
        title="Change language"
      >
        <span className="text-xl">{currentLanguage?.flag}</span>
        <ChevronDown
          size={16}
          className={`text-gray-500 group-hover:text-gray-700 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                  currentLang === lang.code ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium text-sm">{lang.name}</span>
                {currentLang === lang.code && (
                  <div className="ml-auto w-2 h-2 bg-gray-900 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}