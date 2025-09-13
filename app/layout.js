import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "./components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
