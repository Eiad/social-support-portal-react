'use client';

import { useForm } from 'react-hook-form';
import { useFormContext } from '@/contexts/FormContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { User, UserCircle, HelpCircle } from 'lucide-react';
import Tooltip from '../Tooltip';

export default function Step1() {
  const { formData, updateFormData, nextStep } = useFormContext();
  const { t } = useLanguage();
  
  const {
    register,
    handleSubmit,
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

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="mb-6">
          <h2 className="text-xl font-sans font-normal text-gray-900 mb-2">
            {t('personalInformation')}
          </h2>
          <p className="text-sm text-gray-600 font-sans">{t('provideBasicInfo')}</p>
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
              className="form-input"
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1 animate-slideUp" role="alert">{errors.name.message}</span>
            )}
          </div>

          {/* National ID */}
          <div>
            <label htmlFor="nationalId" className="form-label">
              {t('nationalId')} *
            </label>
            <div className="relative">
              <input
                id="nationalId"
                type="text"
                {...register('nationalId', { required: t('required') })}
                className="form-input pr-10"
                aria-invalid={errors.nationalId ? 'true' : 'false'}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Tooltip content={t('nationalIdTooltip')} position="left">
                  <HelpCircle size={16} className="text-gray-400 hover:text-blue-500 cursor-help transition-colors" />
                </Tooltip>
              </div>
            </div>
            {errors.nationalId && (
              <span className="text-red-500 text-sm mt-1" role="alert">{errors.nationalId.message}</span>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth" className="form-label">
              {t('dateOfBirth')} *
            </label>
            <div className="relative">
              <input
                id="dateOfBirth"
                type="date"
                {...register('dateOfBirth', { required: t('required') })}
                className="form-input pr-10"
                aria-invalid={errors.dateOfBirth ? 'true' : 'false'}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Tooltip content={t('dateOfBirthTooltip')} position="left">
                  <HelpCircle size={16} className="text-gray-400 hover:text-blue-500 cursor-help transition-colors" />
                </Tooltip>
              </div>
            </div>
            {errors.dateOfBirth && (
              <span className="text-red-500 text-sm mt-1" role="alert">{errors.dateOfBirth.message}</span>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="form-label flex items-center gap-2">
              {t('gender')} *
              <Tooltip content={t('genderTooltip')} position="top">
                <HelpCircle size={14} className="text-gray-400 hover:text-blue-500 cursor-help transition-colors" />
              </Tooltip>
            </label>
            <div className="flex gap-3 mt-2">
              <label className="radio-label flex-1 group">
                <input
                  type="radio"
                  {...register('gender', { required: t('required') })}
                  value="male"
                  className="radio-modern"
                />
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <User size={20} className="text-blue-600" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{t('male')}</span>
                </div>
              </label>
              <label className="radio-label flex-1 group">
                <input
                  type="radio"
                  {...register('gender', { required: t('required') })}
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
            <label htmlFor="address" className="form-label">
              {t('address')} *
            </label>
            <div className="relative">
              <input
                id="address"
                type="text"
                {...register('address', { required: t('required') })}
                className="form-input pr-10"
                aria-invalid={errors.address ? 'true' : 'false'}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Tooltip content={t('addressTooltip')} position="left">
                  <HelpCircle size={16} className="text-gray-400 hover:text-blue-500 cursor-help transition-colors" />
                </Tooltip>
              </div>
            </div>
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
              className="form-input"
              aria-invalid={errors.city ? 'true' : 'false'}
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
              className="form-input"
              aria-invalid={errors.state ? 'true' : 'false'}
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
            <input
              id="country"
              type="text"
              {...register('country', { required: t('required') })}
              className="form-input"
              aria-invalid={errors.country ? 'true' : 'false'}
            />
            {errors.country && (
              <span className="text-red-500 text-sm mt-1" role="alert">{errors.country.message}</span>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="form-label">
              {t('phone')} *
            </label>
            <div className="relative">
              <input
                id="phone"
                type="tel"
                {...register('phone', { 
                  required: t('required'),
                  pattern: {
                    value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                    message: t('invalidPhone')
                  }
                })}
                className="form-input pr-10"
                aria-invalid={errors.phone ? 'true' : 'false'}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Tooltip content={t('phoneTooltip')} position="left">
                  <HelpCircle size={16} className="text-gray-400 hover:text-blue-500 cursor-help transition-colors" />
                </Tooltip>
              </div>
            </div>
            {errors.phone && (
              <span className="text-red-500 text-sm mt-1" role="alert">{errors.phone.message}</span>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="form-label">
              {t('email')} *
            </label>
            <div className="relative">
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
                className="form-input pr-10"
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Tooltip content={t('emailTooltip')} position="left">
                  <HelpCircle size={16} className="text-gray-400 hover:text-blue-500 cursor-help transition-colors" />
                </Tooltip>
              </div>
            </div>
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
            {t('next')} →
          </button>
        </div>
      </form>
    </div>
  );
}