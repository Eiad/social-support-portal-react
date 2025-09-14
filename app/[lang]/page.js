import ApplicationForm from '@/components/ApplicationForm';
import { FormProvider } from '@/contexts/FormContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default async function Home({ params }) {
  const { lang } = await params;

  return (
    <LanguageProvider lang={lang}>
      <FormProvider>
        <ApplicationForm />
      </FormProvider>
    </LanguageProvider>
  );
}
