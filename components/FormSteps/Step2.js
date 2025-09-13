'use client';

import { useForm } from 'react-hook-form';
import { useFormContext } from '@/contexts/FormContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Step2() {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
  const { t } = useLanguage();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      maritalStatus: formData.maritalStatus,
      dependents: formData.dependents,
      employmentStatus: formData.employmentStatus,
      monthlyIncome: formData.monthlyIncome,
      housingStatus: formData.housingStatus
    }
  });

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {t('familyFinancialInfo')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Marital Status */}
        <div>
          <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700 mb-1">
            {t('maritalStatus')} *
          </label>
          <select
            id="maritalStatus"
            {...register('maritalStatus', { required: t('required') })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-invalid={errors.maritalStatus ? 'true' : 'false'}
          >
            <option value="">--</option>
            <option value="single">{t('single')}</option>
            <option value="married">{t('married')}</option>
            <option value="divorced">{t('divorced')}</option>
            <option value="widowed">{t('widowed')}</option>
          </select>
          {errors.maritalStatus && (
            <span className="text-red-500 text-sm mt-1" role="alert">{errors.maritalStatus.message}</span>
          )}
        </div>

        {/* Number of Dependents */}
        <div>
          <label htmlFor="dependents" className="block text-sm font-medium text-gray-700 mb-1">
            {t('dependents')} *
          </label>
          <input
            id="dependents"
            type="number"
            min="0"
            {...register('dependents', { 
              required: t('required'),
              min: { value: 0, message: 'Must be 0 or greater' }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-invalid={errors.dependents ? 'true' : 'false'}
          />
          {errors.dependents && (
            <span className="text-red-500 text-sm mt-1" role="alert">{errors.dependents.message}</span>
          )}
        </div>

        {/* Employment Status */}
        <div>
          <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-700 mb-1">
            {t('employmentStatus')} *
          </label>
          <select
            id="employmentStatus"
            {...register('employmentStatus', { required: t('required') })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-invalid={errors.employmentStatus ? 'true' : 'false'}
          >
            <option value="">--</option>
            <option value="employed">{t('employed')}</option>
            <option value="unemployed">{t('unemployed')}</option>
            <option value="selfEmployed">{t('selfEmployed')}</option>
            <option value="retired">{t('retired')}</option>
          </select>
          {errors.employmentStatus && (
            <span className="text-red-500 text-sm mt-1" role="alert">{errors.employmentStatus.message}</span>
          )}
        </div>

        {/* Monthly Income */}
        <div>
          <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700 mb-1">
            {t('monthlyIncome')} ($) *
          </label>
          <input
            id="monthlyIncome"
            type="number"
            min="0"
            step="0.01"
            {...register('monthlyIncome', { 
              required: t('required'),
              min: { value: 0, message: 'Must be 0 or greater' }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-invalid={errors.monthlyIncome ? 'true' : 'false'}
          />
          {errors.monthlyIncome && (
            <span className="text-red-500 text-sm mt-1" role="alert">{errors.monthlyIncome.message}</span>
          )}
        </div>

        {/* Housing Status */}
        <div>
          <label htmlFor="housingStatus" className="block text-sm font-medium text-gray-700 mb-1">
            {t('housingStatus')} *
          </label>
          <select
            id="housingStatus"
            {...register('housingStatus', { required: t('required') })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-invalid={errors.housingStatus ? 'true' : 'false'}
          >
            <option value="">--</option>
            <option value="owned">{t('owned')}</option>
            <option value="rented">{t('rented')}</option>
            <option value="withFamily">{t('withFamily')}</option>
          </select>
          {errors.housingStatus && (
            <span className="text-red-500 text-sm mt-1" role="alert">{errors.housingStatus.message}</span>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
        >
          {t('previous')}
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          {t('next')}
        </button>
      </div>
    </form>
    </div>
  );
}