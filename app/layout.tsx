import type { Metadata } from 'next';
import { Heebo, Fredoka } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingTransition from '@/components/LoadingTransition';

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-heebo',
});

const fredoka = Fredoka({
  subsets: ['latin', 'hebrew'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-fredoka',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://graffiti-designs.vercel.app'),
  title: {
    default: 'גרפיטי עיצובים - מוצרי דפוס בעיצוב ייחודי',
    template: '%s | גרפיטי עיצובים',
  },
  description:
    'מוצרי דפוס איכותיים בעיצוב מקורי: מחברות, מעטפות, כרטיסי ברכה, ספרי מתכונים, מגנטים ותחתיות לכוסות. מיוצר בישראל.',
  keywords: [
    'מוצרי דפוס',
    'מחברות',
    'כרטיסי ברכה',
    'עיצוב גרפי',
    'מעטפות',
    'ספר מתכונים',
    'מגנטים',
    'תחתיות לכוסות',
  ],
  authors: [{ name: 'גרפיטי עיצובים' }],
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: 'https://graffiti-designs.vercel.app',
    siteName: 'גרפיטי עיצובים',
    title: 'גרפיטי עיצובים - מוצרי דפוס בעיצוב ייחודי',
    description:
      'מוצרי דפוס איכותיים בעיצוב מקורי. מיוצר בישראל במפעל המעסיק אנשים עם מוגבלויות.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'גרפיטי עיצובים',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'גרפיטי עיצובים - מוצרי דפוס בעיצוב ייחודי',
    description: 'מוצרי דפוס איכותיים בעיצוב מקורי. מיוצר בישראל.',
    images: ['/og-image.jpg'],
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'גרפיטי עיצובים',
              description: 'מוצרי דפוס בעיצוב ייחודי ומקורי',
              url: 'https://graffiti-designs.vercel.app',
              logo: 'https://graffiti-designs.vercel.app/logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+972-50-123-4567',
                contactType: 'Customer Service',
                areaServed: 'IL',
                availableLanguage: 'Hebrew',
              },
              sameAs: [
                'https://www.instagram.com/graffiti_designs',
                'https://www.facebook.com/graffitidesigns',
              ],
            }),
          }}
        />
      </head>
      <body className={`${heebo.variable} ${fredoka.variable} font-sans antialiased`}>
        <LoadingTransition />
        <div className="min-h-screen flex flex-col bg-base-white bg-[url('/bg/wood-light.jpg')] bg-fixed bg-cover">
          <div className="min-h-screen flex flex-col bg-gradient-to-b from-base-white/95 to-base-white/90">
            <Header />
            <main className="flex-grow pt-20">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}

