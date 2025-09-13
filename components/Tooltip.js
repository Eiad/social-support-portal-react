'use client';

import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Tooltip({ children, content, position = 'top', delay = 300 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showTimeout, setShowTimeout] = useState(null);
  const { language } = useLanguage();
  const tooltipRef = useRef();

  const showTooltip = () => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setShowTimeout(timeout);
  };

  const hideTooltip = () => {
    if (showTimeout) {
      clearTimeout(showTimeout);
      setShowTimeout(null);
    }
    setIsVisible(false);
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-800 border-t-4 border-x-4 border-x-transparent',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-800 border-b-4 border-x-4 border-x-transparent',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-l-gray-800 border-l-4 border-y-4 border-y-transparent',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-r-gray-800 border-r-4 border-y-4 border-y-transparent'
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      
      {isVisible && content && (
        <div
          ref={tooltipRef}
          className={`absolute z-[9999] px-4 py-3 text-sm leading-relaxed text-white bg-gray-800 rounded-lg shadow-xl w-72 animate-fadeIn ${positionClasses[position]}`}
          style={{ 
            direction: language === 'ar' ? 'rtl' : 'ltr',
            textAlign: language === 'ar' ? 'right' : 'left'
          }}
        >
          {content}
          {/* Arrow */}
          <div className={`absolute w-0 h-0 ${arrowClasses[position]}`} />
        </div>
      )}
    </div>
  );
}