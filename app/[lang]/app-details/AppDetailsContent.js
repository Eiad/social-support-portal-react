'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import {
  CheckCircle,
  FileText,
  Sparkles,
  Shield,
  Globe,
  Smartphone,
  Brain,
  Users,
  Clock,
  Target,
  Mail,
  Star,
  ArrowRight
} from 'lucide-react';
import LanguageToggle from '@/components/LanguageToggle';
import Link from 'next/link';

export default function AppDetailsContent() {
  const { t, language, isRTL } = useLanguage();

  const requirements = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: t('reqMultiStep'),
      desc: t('reqMultiStepDesc'),
      status: 'enhanced'
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: t('reqAI'),
      desc: t('reqAIDesc'),
      status: 'completed'
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: t('reqResponsive'),
      desc: t('reqResponsiveDesc'),
      status: 'completed'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('reqAccessibility'),
      desc: t('reqAccessibilityDesc'),
      status: 'completed'
    }
  ];

  const keyFeatures = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: t('featureAI'),
      desc: t('featureAIDesc')
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: t('featureProgress'),
      desc: t('featureProgressDesc')
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: t('featureBilingual'),
      desc: t('featureBilingualDesc')
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: t('featureAutoSave'),
      desc: t('featureAutoSaveDesc')
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: t('featureEmail'),
      desc: t('featureEmailDesc')
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: t('featureOnboarding'),
      desc: t('featureOnboardingDesc')
    }
  ];

  const techStack = [
    'Next.js 15.5.3',
    'React 19.1.1',
    'Tailwind CSS',
    'OpenAI GPT-3.5',
    'React Hook Form',
    'Jest Testing'
  ];

  const bonusFeatures = [
    t('bonusOnboarding'),
    t('bonusEmail'),
    t('bonusCelebration'),
    t('bonusTheme'),
    t('bonusRTL'),
    t('bonusTesting')
  ];

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <div className="inline-flex items-center text-gray-600 text-sm mb-3">
                <Star className="w-4 h-4 mr-2" />
                <span>{t('caseStudy')}</span>
              </div>
              <h1 className="text-3xl font-normal text-gray-900 mb-3">
                {t('appDetailsTitle')}
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl leading-relaxed">
                {t('appDetailsSubtitle')}
              </p>
            </div>
            <LanguageToggle currentLang={language} />
          </div>

          <div className="flex gap-3">
            <Link
              href={`/${language}`}
              className="inline-flex items-center bg-blue-600 text-white px-5 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              {t('viewApp')}
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
            </Link>
            <a
              href="https://github.com/Eiad/social-support-portal-react"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-gray-300 text-gray-700 px-5 py-2 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              {t('viewCode')}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Requirements Fulfilled */}
        <section className="mb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-normal text-gray-900 mb-2">{t('requirementsFulfilled')}</h2>
            <p className="text-gray-600">{t('requirementsFulfilledDesc')}</p>
          </div>

          <div className="space-y-4">
            {requirements.map((req, index) => (
              <div key={index} className="border border-gray-200 rounded p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900">{req.title}</h3>
                      {req.status === 'enhanced' && (
                        <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                          {t('enhanced')}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{req.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-normal text-gray-900 mb-2">{t('keyFeatures')}</h2>
            <p className="text-gray-600">{t('keyFeaturesDesc')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {keyFeatures.map((feature, index) => (
              <div key={index} className="border border-gray-200 rounded p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 text-gray-600">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Excellence */}
        <section className="mb-12">
          <div className="border border-gray-200 rounded p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-normal text-gray-900 mb-2">{t('technicalExcellence')}</h2>
              <p className="text-gray-600">{t('technicalExcellenceDesc')}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">{t('modernTechStack')}</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, index) => (
                    <span key={index} className="bg-gray-50 border border-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">{t('qualityAssurance')}</h3>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">{t('comprehensiveTesting')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">{t('accessibilityCompliance')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">{t('performanceOptimized')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">{t('securityFirst')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Beyond Requirements */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-normal text-gray-900 mb-2">{t('beyondRequirements')}</h2>
            <p className="text-gray-600">{t('beyondRequirementsDesc')}</p>
          </div>

          <div className="border border-gray-200 rounded p-4">
            <div className="grid md:grid-cols-2 gap-3">
              {bonusFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section>
          <div className="border border-gray-200 rounded p-6 text-center">
            <h2 className="text-xl font-normal text-gray-900 mb-2">{t('readyToExplore')}</h2>
            <p className="text-gray-600 mb-6">{t('readyToExploreDesc')}</p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/${language}`}
                className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                {t('tryApplication')}
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Link>
              <a
                href="https://github.com/Eiad/social-support-portal-react"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-gray-300 text-gray-700 px-6 py-2 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                {t('viewSource')}
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            {t('builtWith')} ❤️ {t('forAccessibleGovernment')}
          </p>
        </div>
      </footer>
    </div>
  );
}