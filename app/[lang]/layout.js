import "@fontsource/inter";
import "@fontsource/noto-kufi-arabic";
import "@fontsource/limelight";
import "@fontsource/reem-kufi";
import "../globals.css";
import StructuredData from "../components/StructuredData";
import { Analytics } from "@vercel/analytics/react";
import ErrorBoundary from "../../components/ErrorBoundary";
import GuestAuthInitializer from "../../components/GuestAuthInitializer";

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
  icons: {
    icon: "data:image/svg+xml;base64," + btoa(`<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hand-heart hidden md:block text-white scale-x-[-1]" aria-hidden="true"><path d="M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"></path><path d="m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95"></path><path d="m2 15 6 6"></path><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91"></path></svg>`),
  },
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
        <GuestAuthInitializer />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}