import "@fontsource/inter";
import "@fontsource/noto-kufi-arabic";
import "@fontsource/boogaloo";
import "@fontsource/reem-kufi";
import "../globals.css";
import StructuredData from "../components/StructuredData";
import { Analytics } from "@vercel/analytics/react";

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2563eb',
}

export const metadata = {
  title: "Social Support Portal - Government Assistance Application",
  description: "Apply for government social support and financial assistance. Easy online application for welfare benefits, housing support, and emergency aid programs.",
  keywords: "social support, government assistance, welfare application, financial aid, housing support, emergency assistance, social services, government benefits, online application",
  authors: [{ name: "Social Support Portal" }],
  creator: "Government Social Services Department",
  publisher: "Social Support Portal",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://social-support-portal.gov",
    languages: {
      'en-US': 'https://social-support-portal.gov/en',
      'ar-SA': 'https://social-support-portal.gov/ar',
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_SA",
    url: "https://social-support-portal.gov",
    siteName: "Social Support Portal",
    title: "Social Support Portal - Apply for Government Assistance",
    description: "Streamlined online application for government social support programs. Get financial aid, housing assistance, and emergency support through our secure portal.",
    images: [
      {
        url: "https://social-support-portal.gov/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Social Support Portal - Government Assistance Application",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Support Portal - Government Assistance",
    description: "Apply online for social support and government assistance programs. Secure, fast, and easy application process.",
    site: "@SocialSupportGov",
    creator: "@SocialSupportGov",
    images: ["https://social-support-portal.gov/twitter-image.jpg"],
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    bing: "msvalidate.01-code",
  },
  category: "Government Services",
  classification: "Social Services",
  applicationName: "Social Support Portal",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default async function LanguageLayout({ children, params }) {
  const { lang } = await params;
  const isArabic = lang === 'ar';
  
  return (
    <html lang={lang} dir={isArabic ? 'rtl' : 'ltr'}>
      <body className={`antialiased ${isArabic ? 'font-arabic' : 'font-english'}`}>
        <StructuredData />
        {children}
        <Analytics />
      </body>
    </html>
  );
}