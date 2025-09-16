'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

/**
 * Global Error Boundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 *
 * Features:
 * - Graceful error recovery with user-friendly interface
 * - Detailed error information for debugging (development only)
 * - Multiple recovery options (refresh, go home)
 * - Bilingual support with fallback to English
 * - Responsive design for all screen sizes
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // In production, you might want to log this to an error reporting service
    // Example: logErrorToService(error, errorInfo);
  }

  handleRefresh = () => {
    // Reset error state and reload the page
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleGoHome = () => {
    // Reset error state and navigate to home
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Get language from localStorage or default to English
      const language = typeof window !== 'undefined'
        ? localStorage.getItem('language') || 'en'
        : 'en';

      const isArabic = language === 'ar';

      // Fallback translations (in case LanguageContext is broken)
      const translations = {
        en: {
          title: 'Something went wrong',
          description: 'We encountered an unexpected error. Don\'t worry, your data is safe.',
          suggestion: 'Try refreshing the page or return to the homepage.',
          refresh: 'Refresh Page',
          goHome: 'Go to Homepage',
          errorDetails: 'Error Details',
          showDetails: 'Show Details',
          hideDetails: 'Hide Details'
        },
        ar: {
          title: 'حدث خطأ غير متوقع',
          description: 'واجهنا خطأ غير متوقع. لا تقلق، بياناتك آمنة.',
          suggestion: 'جرب تحديث الصفحة أو العودة إلى الصفحة الرئيسية.',
          refresh: 'تحديث الصفحة',
          goHome: 'الذهاب للصفحة الرئيسية',
          errorDetails: 'تفاصيل الخطأ',
          showDetails: 'إظهار التفاصيل',
          hideDetails: 'إخفاء التفاصيل'
        }
      };

      const t = translations[language] || translations.en;

      return (
        <div className={`min-h-screen bg-gray-50 flex items-center justify-center p-4 ${isArabic ? 'rtl' : 'ltr'}`}>
          <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-6 text-center animate-fadeIn">
            {/* Error Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              {t.title}
            </h1>

            <p className="text-gray-600 mb-4 text-sm">
              {t.description}
            </p>

            <p className="text-gray-500 mb-6 text-xs">
              {t.suggestion}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <button
                onClick={this.handleRefresh}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <RefreshCw size={16} />
                {t.refresh}
              </button>

              <button
                onClick={this.handleGoHome}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Home size={16} />
                {t.goHome}
              </button>
            </div>

            {/* Development Error Details */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
                  {t.errorDetails}
                </summary>
                <div className="bg-gray-100 p-3 rounded text-xs font-mono overflow-auto max-h-40">
                  <div className="text-red-600 font-bold mb-2">
                    {this.state.error.toString()}
                  </div>
                  <div className="text-gray-700 whitespace-pre-wrap">
                    {this.state.errorInfo.componentStack}
                  </div>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;