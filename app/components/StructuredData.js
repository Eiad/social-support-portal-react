'use client';

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    "name": "Social Support Portal",
    "description": "Online government portal for applying to social support and financial assistance programs",
    "provider": {
      "@type": "GovernmentOrganization",
      "name": "Government Social Services Department",
      "url": "https://social-support-portal.gov"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United Arab Emirates"
    },
    "availableLanguage": [
      {
        "@type": "Language",
        "name": "English",
        "alternateName": "en"
      },
      {
        "@type": "Language", 
        "name": "Arabic",
        "alternateName": "ar"
      }
    ],
    "serviceType": "Gov Social Support",
    "category": "Government Services",
    "audience": {
      "@type": "Audience",
      "audienceType": "Citizens and Residents"
    },
    "serviceOutput": [
      "Financial Assistance",
      "Housing Support", 
      "Emergency Aid",
      "Healthcare Support",
      "Education Assistance"
    ],
    "hoursAvailable": "24/7 Online Service",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Social Support Programs",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Monthly Financial Assistance",
            "description": "Regular financial support for eligible individuals and families"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Housing Support",
            "description": "Rental assistance and housing vouchers for qualified applicants"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Emergency Assistance",
            "description": "Immediate support for urgent financial needs"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}