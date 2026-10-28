import type { Metadata } from 'next';
import type { LayoutProps } from '@/types';
import { Analytics } from '@vercel/analytics/next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { PostHogProvider } from '@/components/analytics/PostHogProvider';
import { ThirdPartyScripts } from '@/components/analytics/Scripts';
import { SpeedInsightsClient } from '@/components/analytics/SpeedInsightsClient';
import { CalendlyScripts } from '@/components/calendly/CalendlyScripts';
import { StructuredData } from '@/components/seo/StructuredData';
import { CLOUDFLARE_IMAGE_IDS, cloudflareImageUrl } from '@/lib/cloudflare-images';
import { inter, playfairDisplay } from '@/lib/fonts';
import { getGoogleVerificationTag } from '@/lib/google-verification';
import { siteName, siteUrl } from '@/lib/metadata';
import { generateSiteNavigationElementSchema } from '@/lib/schema';
import { routing } from '@/libs/I18nRouting';
import '@/styles/global.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: siteName,
    images: [
      {
        url: cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['dr-jan-duffy-og']),
        width: 1200,
        height: 630,
        alt: 'Dr. Jan Duffy - Las Vegas Divorce Real Estate Specialist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    images: [cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['dr-jan-duffy-twitter'])],
  },
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout(props: LayoutProps) {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Generate SiteNavigationElement schemas for main navigation
  const navigationSchemas = [
    generateSiteNavigationElementSchema('Home', `${siteUrl}/`),
    generateSiteNavigationElementSchema('Divorce Specialist', `${siteUrl}/divorce-real-estate-services`),
    generateSiteNavigationElementSchema('Las Vegas Communities', `${siteUrl}/divorce-realtor-henderson`),
    generateSiteNavigationElementSchema('Resources', `${siteUrl}/attorney-resources`),
    generateSiteNavigationElementSchema('About Dr. Jan', `${siteUrl}/about`),
    generateSiteNavigationElementSchema('Contact', `${siteUrl}/contact`),
  ];

  return (
    <html lang={locale} className={`${inter.variable} ${playfairDisplay.variable}`}>
      <head>
        {getGoogleVerificationTag() && (
          <meta
            name="google-site-verification"
            content={getGoogleVerificationTag()!}
          />
        )}
        {/*
          Intentionally no preconnect: PSI flags unused hints when LCP is hero text (h1), not imagedelivery.
          Hero image still uses priority + fetchPriority=high on next/image; Calendly CSS is non-blocking (media=print swap).
        */}
        <StructuredData data={navigationSchemas} />
        <ThirdPartyScripts />
      </head>
      <body>
        {/* ClerkProvider is only in (auth)/layout.tsx so marketing pages do not load Clerk JS (mobile TBT). */}
        <NextIntlClientProvider>
          <PostHogProvider>
            {props.children}
          </PostHogProvider>
          <SpeedInsightsClient />
          <Analytics />
          <CalendlyScripts />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
