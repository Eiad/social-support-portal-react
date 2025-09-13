'use client';

import ApplicationForm from '@/components/ApplicationForm';
import LanguageToggle from '@/components/LanguageToggle';
import { FormProvider } from '@/contexts/FormContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function Home() {
  return (
    <LanguageProvider>
      <FormProvider>
        <LanguageToggle />
        <ApplicationForm />
      </FormProvider>
    </LanguageProvider>
  );
}
