'use client';

import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Form-Specific Error Boundary Component
 *
 * Specialized error boundary for form components that provides
 * form-specific recovery options while preserving user data.
 *
 * Features:
 * - Preserves form data in localStorage during errors
 * - Form-specific recovery suggestions
 * - Seamless integration with LanguageContext
 * - Non-destructive error recovery
 */
class FormErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('FormErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Save current form state to prevent data loss
    try {
      const currentFormData = localStorage.getItem('socialSupportFormData');
      if (currentFormData) {
        localStorage.setItem('socialSupportFormData_backup', currentFormData);
      }
    } catch (e) {
      console.warn('Could not backup form data:', e);
    }
  }

  handleRetry = () => {
    // Reset error state without reloading the page
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReset = () => {
    // Reset error state and clear form data
    this.setState({ hasError: false, error: null, errorInfo: null });
    try {
      localStorage.removeItem('socialSupportFormData');
      localStorage.removeItem('socialSupportFormStep');
    } catch (e) {
      console.warn('Could not clear form data:', e);
    }
    // Force re-render of form
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <FormErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onRetry={this.handleRetry}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Form Error Fallback Component
 * Provides user-friendly error interface with form-specific options
 */
function FormErrorFallback({ error, errorInfo, onRetry, onReset }) {
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className={`w-full max-w-2xl mx-auto p-6 ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="bg-white border border-red-200 rounded-lg p-6 shadow-sm">
        {/* Error Icon and Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {t('formError') || 'Form Error'}
            </h3>
            <p className="text-sm text-gray-600">
              {t('formErrorDescription') || 'There was an issue with the form. Your data has been preserved.'}
            </p>
          </div>
        </div>

        {/* Reassurance Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
          <p className="text-sm text-blue-800">
            <strong>{t('dataPreserved') || 'Data Preserved:'}</strong>{' '}
            {t('dataPreservedMessage') || 'Your form data has been automatically saved and will be restored when you continue.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onRetry}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <RotateCcw size={16} />
            {t('retryForm') || 'Try Again'}
          </button>

          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            {t('resetForm') || 'Reset Form'}
          </button>
        </div>

        {/* Development Error Details */}
        {process.env.NODE_ENV === 'development' && error && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
              Technical Details (Development)
            </summary>
            <div className="bg-gray-100 p-3 rounded text-xs font-mono overflow-auto max-h-32">
              <div className="text-red-600 font-bold mb-1">
                {error.toString()}
              </div>
              {errorInfo && (
                <div className="text-gray-700 whitespace-pre-wrap text-xs">
                  {errorInfo.componentStack}
                </div>
              )}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}

/**
 * HOC wrapper for easy usage
 */
export function withFormErrorBoundary(Component) {
  return function WrappedComponent(props) {
    return (
      <FormErrorBoundaryClass>
        <Component {...props} />
      </FormErrorBoundaryClass>
    );
  };
}

export default FormErrorBoundaryClass;