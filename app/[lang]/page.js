import ApplicationForm from '@/components/ApplicationForm';
import LanguageToggle from '@/components/LanguageToggle';
import { FormProvider } from '@/contexts/FormContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default async function Home({ params }) {
  const { lang } = await params;
  
  return (
    <LanguageProvider lang={lang}>
      <FormProvider>
        <LanguageToggle currentLang={lang} />
        <ApplicationForm />
      </FormProvider>
    </LanguageProvider>
  );
}
