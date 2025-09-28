'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { FlagIcon } from './icons/FlagIcons';

export default function LanguageToggle({ currentLang, className = '', showLabel = false }) {
  const { language, isRTL } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLang) => {
    if (newLang !== currentLang) {
      // Extract the path after the language code
      const currentPathWithoutLang = pathname.replace(`/${currentLang}`, '') || '';
      const newPath = `/${newLang}${currentPathWithoutLang}`;
      router.push(newPath);
    }
    setIsOpen(false);
  };

  // Language configuration with professional SVG flag icons
  // Using country codes that map to our FlagIcon components
  const languages = [
    {
      code: 'en',
      name: 'English',
      countryCode: 'GB' // Great Britain flag for English
    },
    {
      code: 'ar',
      name: 'العربية',
      countryCode: 'AE' // UAE flag for Arabic
    }
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLang);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 ${showLabel ? 'rounded-lg' : 'rounded-full'} hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 group text-xs sm:text-sm ${!showLabel ? 'min-w-[44px] min-h-[44px] sm:min-w-auto sm:min-h-auto justify-center' : ''}`}
        aria-label="Select language"
        title="Change language"
      >
        <FlagIcon
          countryCode={currentLanguage?.countryCode}
          size={18}
          className="sm:w-5 sm:h-4"
        />
        {showLabel && (
          <span className="text-xs sm:text-sm font-medium text-gray-600 group-hover:text-gray-800 hidden sm:inline">
            {currentLanguage?.name}
          </span>
        )}
        <ChevronDown
          size={12}
          className={`sm:hidden text-gray-500 group-hover:text-gray-700 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
        <ChevronDown
          size={14}
          className={`hidden sm:block text-gray-500 group-hover:text-gray-700 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[999]"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown - Mobile optimized */}
          <div className={`absolute top-full mt-2 w-40 sm:w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-[9999] overflow-hidden animate-in slide-in-from-top-2 duration-200 ${isRTL ? 'left-0' : 'right-0'}`}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 sm:py-3 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150 min-h-[48px] sm:min-h-[44px] ${
                  currentLang === lang.code ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                }`}
              >
                <FlagIcon
                  countryCode={lang.countryCode}
                  size={20}
                  className="flex-shrink-0"
                />
                <span className="font-medium text-sm">{lang.name}</span>
                {currentLang === lang.code && (
                  <div className={`w-2 h-2 bg-gray-900 rounded-full ${isRTL ? 'mr-auto' : 'ml-auto'}`}></div>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}