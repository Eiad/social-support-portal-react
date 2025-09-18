'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { useFormContext } from '@/contexts/FormContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { User, UserCircle, HelpCircle } from 'lucide-react';
import Tooltip from '../Tooltip';
import SearchableCountryDropdown from '../SearchableCountryDropdown';

export default function Step1() {
  const { formData, updateFormData, updateFieldData, nextStep } = useFormContext();
  const { t, language } = useLanguage();
  const formRef = useRef(null);

  /**
   * Handle auto-save when user leaves a field
   * Saves data to localStorage without requiring form submission
   * Enhanced to detect and preserve browser autofilled values
   */
  const handleFieldBlur = (fieldName, value) => {
    if (value && value.trim() !== '') {
      // Get all current form values to detect autofill
      const currentFormValues = getValues();

      // Check if multiple fields have been populated (likely browser autofill)
      const filledFields = Object.entries(currentFormValues).filter(([_, val]) => val && val.toString().trim() !== '');

      if (filledFields.length > 3) {
        // Multiple fields filled - likely browser autofill, save all at once
        const autofillData = {};
        filledFields.forEach(([key, val]) => {
          if (val && val.toString().trim() !== '') {
            autofillData[key] = val.toString().trim();
          }
        });

        // Update form data with all autofilled values to preserve them
        updateFormData(autofillData);
      } else {
        // Single field update - normal user typing
        updateFieldData(fieldName, value.trim());
      }
    }
  };

  /**
   * Handle auto-save for radio button selections
   * Immediately saves when user makes a selection
   */
  const handleRadioChange = (fieldName, value) => {
    if (value) {
      updateFieldData(fieldName, value);
    }
  };
  
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: formData.name,
      nationalId: formData.nationalId,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      phone: formData.phone,
      email: formData.email
    }
  });

  // Update form only when component mounts or when data is loaded from localStorage
  useEffect(() => {
    reset({
      name: formData.name,
      nationalId: formData.nationalId,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      phone: formData.phone,
      email: formData.email
    });
  }, [formData, reset]); // Update when formData changes (localStorage loaded)

  // Enhanced autofill detection
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    // Detect browser autofill using input events
    const handleAutofill = () => {
      setTimeout(() => {
        const currentValues = getValues();
        const filledFields = Object.entries(currentValues).filter(([_, val]) => val && val.toString().trim() !== '');

        // If multiple fields are suddenly filled, it's likely autofill
        if (filledFields.length > 3) {
          const autofillData = {};
          filledFields.forEach(([key, val]) => {
            if (val && val.toString().trim() !== '') {
              autofillData[key] = val.toString().trim();
            }
          });

          // Save all autofilled data immediately
          updateFormData(autofillData);
        }
      }, 100); // Small delay to ensure all fields are populated
    };

    // Listen for input events on all form inputs
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('input', handleAutofill);
      // Also listen for browser's auto-complete events
      input.addEventListener('change', handleAutofill);
    });

    return () => {
      inputs.forEach(input => {
        input.removeEventListener('input', handleAutofill);
        input.removeEventListener('change', handleAutofill);
      });
    };
  }, [getValues, updateFormData, setValue]);

  // Get today's date for validation
  const today = new Date().toISOString().split('T')[0];

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <div className="w-full">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="mb-6">
          <h2 className="text-xl text-gray-900 mb-2">
            {t('personalInformation')}
          </h2>
          <p className="text-sm text-gray-600">{t('provideBasicInfo')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="form-label">
              {t('name')} *
            </label>
            <input
              id="name"
              type="text"
              {...register('name', { required: t('required') })}
              onBlur={(e) => handleFieldBlur('name', e.target.value)}
              className="form-input form-input-animated form-input-smooth"
              aria-invalid={errors.name ? 'true' : 'false'}
              placeholder={t('namePlaceholder')}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1 animate-slideUp" role="alert">{errors.name.message}</span>
            )}
          </div>

          {/* National ID */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="nationalId" className="form-label mb-0">
                {t('nationalId')} *
              </label>
              <Tooltip content={t('nationalIdTooltip')} position="left">
                <HelpCircle size={14} className="text-gray-400 hover:text-gray-600 cursor-help transition-colors" />
              </Tooltip>
            </div>
            <input
              id="nationalId"
              type="text"
              {...register('nationalId', { required: t('required') })}
              onBlur={(e) => handleFieldBlur('nationalId', e.target.value)}
              className="form-input form-input-animated form-input-smooth"
              aria-invalid={errors.nationalId ? 'true' : 'false'}
              placeholder={t('nationalIdPlaceholder')}
            />
            {errors.nationalId && (
              <span className="text-red-500 text-sm mt-1" role="alert">{errors.nationalId.message}</span>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="dateOfBirth" className="form-label mb-0">
                {t('dateOfBirth')} *
              </label>
              <Tooltip content={t('dateOfBirthTooltip')} position="left">
                <HelpCircle size={14} className="text-gray-400 hover:text-gray-600 cursor-help transition-colors" />
              </Tooltip>
            </div>
            <input
              id="dateOfBirth"
              type="date"
              {...register('dateOfBirth', {
                required: t('required'),
                validate: {
                  notFuture: (value) => {
                    if (!value) return true; // Skip if empty (required will handle)
                    return value <= today || t('dateCannotBeFuture') || 'Date cannot be in the future';
                  },
                  validAge: (value) => {
                    if (!value) return true;
                    const birthDate = new Date(value);
                    const currentDate = new Date();
                    const age = currentDate.getFullYear() - birthDate.getFullYear();
                    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
                    const finalAge = monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate()) ? age - 1 : age;
                    return finalAge >= 0 && finalAge <= 120 || t('invalidDateOfBirth') || 'Please enter a valid date of birth';
                  }
                }
              })}
              onBlur={(e) => handleFieldBlur('dateOfBirth', e.target.value)}
              className="form-input form-input-animated form-input-smooth"
              aria-invalid={errors.dateOfBirth ? 'true' : 'false'}
              max={today}
            />
            {errors.dateOfBirth && (
              <span className="text-red-500 text-sm mt-1" role="alert">{errors.dateOfBirth.message}</span>
            )}
          </div>

          {/* Gender */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="form-label mb-0">
                {t('gender')} *
              </label>
              <Tooltip content={t('genderTooltip')} position="left">
                <HelpCircle size={14} className="text-gray-400 hover:text-gray-600 cursor-help transition-colors" />
              </Tooltip>
            </div>
            <div className="flex gap-3 mt-2">
              <label className="radio-label flex-1 group">
                <input
                  type="radio"
                  {...register('gender', { required: t('required') })}
                  onChange={(e) => handleRadioChange('gender', e.target.value)}
                  value="male"
                  className="radio-modern"
                />
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                    <User size={20} className="text-gray-600" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{t('male')}</span>
                </div>
              </label>
              <label className="radio-label flex-1 group">
                <input
                  type="radio"
                  {...register('gender', { required: t('required') })}
                  onChange={(e) => handleRadioChange('gender', e.target.value)}
                  value="female"
                  className="radio-modern radio-modern-female"
                />
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-pink-100 rounded-lg group-hover:bg-pink-200 transition-colors">
                    <UserCircle size={20} className="text-pink-600" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{t('female')}</span>
                </div>
              </label>
            </div>
            {errors.gender && (
              <span className="text-red-500 text-sm mt-1 block" role="alert">{errors.gender.message}</span>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="address" className="form-label mb-0">
                {t('address')} *
              </label>
              <Tooltip content={t('addressTooltip')} position="left">
                <HelpCircle size={14} className="text-gray-400 hover:text-gray-600 cursor-help transition-colors" />
              </Tooltip>
            </div>
            <input
              id="address"
              type="text"
              {...register('address', { required: t('required') })}
              onBlur={(e) => handleFieldBlur('address', e.target.value)}
              className="form-input form-input-animated form-input-smooth"
              aria-invalid={errors.address ? 'true' : 'false'}
              placeholder={t('addressPlaceholder')}
            />
            {errors.address && (
              <span className="text-red-500 text-sm mt-1" role="alert">{errors.address.message}</span>
            )}
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="form-label">
              {t('city')} *
            </label>
            <input
              id="city"
              type="text"
              {...register('city', { required: t('required') })}
              onBlur={(e) => handleFieldBlur('city', e.target.value)}
              className="form-input form-input-animated form-input-smooth"
              aria-invalid={errors.city ? 'true' : 'false'}
              placeholder={t('cityPlaceholder')}
            />
            {errors.city && (
              <span className="text-red-500 text-sm mt-1" role="alert">{errors.city.message}</span>
            )}
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="form-label">
              {t('state')} *
            </label>
            <input
              id="state"
              type="text"
              {...register('state', { required: t('required') })}
              onBlur={(e) => handleFieldBlur('state', e.target.value)}
              className="form-input form-input-animated form-input-smooth"
              aria-invalid={errors.state ? 'true' : 'false'}
              placeholder={t('statePlaceholder')}
            />
            {errors.state && (
              <span className="text-red-500 text-sm mt-1" role="alert">{errors.state.message}</span>
            )}
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="form-label">
              {t('country')} *
            </label>
            <SearchableCountryDropdown
              value={formData.country}
              onChange={(countryCode) => {
                updateFieldData('country', countryCode);
                // Also update the form register to keep react-hook-form in sync
                setValue('country', countryCode, { shouldValidate: true });
              }}
              onBlur={() => handleFieldBlur('country', formData.country)}
              error={errors.country}
              placeholder={t('countryPlaceholder')}
              aria-invalid={errors.country ? 'true' : 'false'}
            />
            {errors.country && (
              <span className="text-red-500 text-sm mt-1" role="alert">{errors.country.message}</span>
            )}
          </div>

          {/* Phone */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="phone" className="form-label mb-0">
                {t('phone')} *
              </label>
              <Tooltip content={t('phoneTooltip')} position="left">
                <HelpCircle size={14} className="text-gray-400 hover:text-gray-600 cursor-help transition-colors" />
              </Tooltip>
            </div>
            <input
              id="phone"
              type="tel"
              {...register('phone', {
                required: t('required'),
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: t('invalidPhone')
                },
                maxLength: {
                  value: 10,
                  message: 'Phone number must be 10 digits'
                }
              })}
              onBlur={(e) => handleFieldBlur('phone', e.target.value)}
              className="form-input form-input-animated form-input-smooth"
              aria-invalid={errors.phone ? 'true' : 'false'}
              placeholder={t('phonePlaceholder')}
              maxLength="10"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm mt-1" role="alert">{errors.phone.message}</span>
            )}
          </div>

          {/* Email */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="email" className="form-label mb-0">
                {t('email')} *
              </label>
              <Tooltip content={t('emailTooltip')} position="left">
                <HelpCircle size={14} className="text-gray-400 hover:text-gray-600 cursor-help transition-colors" />
              </Tooltip>
            </div>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: t('required'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('invalidEmail')
                }
              })}
              onBlur={(e) => handleFieldBlur('email', e.target.value)}
              className="form-input form-input-animated form-input-smooth"
              aria-invalid={errors.email ? 'true' : 'false'}
              placeholder={t('emailPlaceholder')}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1" role="alert">{errors.email.message}</span>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="btn-primary"
          >
            {language === 'ar' ? `${t('next')} ←` : `${t('next')} →`}
          </button>
        </div>
      </form>
    </div>
  );
}