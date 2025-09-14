import AppDetailsContent from './AppDetailsContent';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default async function AppDetailsPage({ params }) {
  const { lang } = await params;

  return (
    <LanguageProvider lang={lang}>
      <AppDetailsContent />
    </LanguageProvider>
  );
}