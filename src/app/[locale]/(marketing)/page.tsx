import type { Metadata } from 'next';
import type { PageProps } from '@/types';
import { setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { DivorceCTA } from '@/components/divorce/DivorceCTA';
import { DivorceHero } from '@/components/divorce/DivorceHero';
import { DivorceOptions } from '@/components/divorce/DivorceOptions';
import { DivorceProcess } from '@/components/divorce/DivorceProcess';
import { FourPillars } from '@/components/divorce/FourPillars';
import { PainPoints } from '@/components/divorce/PainPoints';
import { WhySpecialist } from '@/components/divorce/WhySpecialist';
import { StructuredData } from '@/components/seo/StructuredData';
import { LazyWhenVisible } from '@/components/shared/LazyWhenVisible';
import { generateLocaleAlternates } from '@/lib/metadata';
import {
  generateLocalBusinessSchema,
  generateOrganizationSchema,
  generateRealEstateAgentSchema,
  generateWebSiteSchema,
} from '@/lib/schema';

const homeValueSkeleton = (
  <div className="bg-gray-50 py-14 sm:py-16">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="mx-auto h-9 w-3/4 max-w-md animate-pulse rounded bg-gray-200" />
        <div className="h-[min(700px,85vh)] min-h-[520px] animate-pulse rounded-xl bg-gray-200" />
      </div>
    </div>
  </div>
);

const listingsSkeleton = (
  <section className="bg-white py-16">
    <div className="container mx-auto px-4">
      <div className="mx-auto mb-8 h-10 w-2/3 max-w-lg animate-pulse rounded bg-gray-200" />
      <div className="min-h-[520px] space-y-4" role="status" aria-live="polite">
        <span className="sr-only">Loading property listings</span>
        {[1, 2, 3].map(i => (
          <div key={i} className="h-64 animate-pulse rounded-lg bg-gray-200" />
        ))}
      </div>
    </div>
  </section>
);

const familyHomesSkeleton = (
  <section className="bg-gray-50 py-16">
    <div className="container mx-auto px-4">
      <div className="mx-auto mb-8 h-10 w-2/3 max-w-lg animate-pulse rounded bg-gray-200" />
      <div className="min-h-[520px] space-y-4" role="status" aria-live="polite">
        <span className="sr-only">Loading family home listings</span>
        {[1, 2, 3].map(i => (
          <div key={i} className="h-64 animate-pulse rounded-lg bg-gray-200" />
        ))}
      </div>
    </div>
  </section>
);

const testimonialsSkeleton = (
  <section className="bg-white py-14 sm:py-16">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-56 animate-pulse rounded-2xl bg-gray-200" />
        ))}
      </div>
    </div>
  </section>
);

const RealScoutHomeValue = dynamic(
  () => import('@/components/widgets/RealScoutHomeValue').then(m => ({ default: m.RealScoutHomeValue })),
  {
    loading: () => homeValueSkeleton,
  },
);

const RealScoutCondoListings = dynamic(
  () => import('@/components/widgets/RealScoutCondoListings').then(m => ({ default: m.RealScoutCondoListings })),
  {
    loading: () => listingsSkeleton,
  },
);

const RealScoutFamilyHomes = dynamic(
  () => import('@/components/widgets/RealScoutFamilyHomes').then(m => ({ default: m.RealScoutFamilyHomes })),
  {
    loading: () => familyHomesSkeleton,
  },
);

const Testimonials = dynamic(
  () => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })),
  {
    loading: () => testimonialsSkeleton,
  },
);

// Allow static/ISR where Next.js can (Clerk loads only on /sign-in, /sign-up, /dashboard).
const siteName = 'Dr. Jan Duffy | Las Vegas Divorce Real Estate Specialist';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates('/', locale);
  return {
    title: 'Divorce Real Estate Agent Las Vegas | Dr. Jan Duffy - Divorce Realtor Near Me',
    description: 'Dr. Jan Duffy is Las Vegas\' trusted Divorce Real Estate Agent. Expert divorce realtor near me helping with property division, home sales during divorce, buyouts, and fresh starts. Call (702) 500-1955.',
    keywords: 'divorce real estate agent Las Vegas, divorce realtor near me, Dr. Jan Duffy, Divorce Real Estate, divorce realtor las vegas, divorce real estate specialist, las vegas divorce realtor, Dr Jan Duffy divorce, property division divorce',
    alternates: { canonical, languages },
    openGraph: {
      title: 'Divorce Real Estate Agent Las Vegas | Dr. Jan Duffy',
      description: 'Las Vegas\' trusted Divorce Real Estate Agent helping divorcing homeowners navigate property division with compassion and expertise.',
      type: 'website',
      url: canonical,
      siteName,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Divorce Real Estate Agent Las Vegas | Dr. Jan Duffy',
      description: 'Las Vegas\' trusted Divorce Real Estate Agent helping divorcing homeowners navigate property division with compassion and expertise.',
    },
  };
}

export default async function Index(props: PageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const webSiteSchema = generateWebSiteSchema();
  const organizationSchema = generateOrganizationSchema();
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <>
      <StructuredData
        data={[
          webSiteSchema,
          organizationSchema,
          realEstateAgentSchema,
          localBusinessSchema,
        ]}
      />

      <DivorceHero />
      <FourPillars />
      <WhySpecialist />
      <DivorceProcess />
      <PainPoints />
      <DivorceOptions />

      <div id="home-value">
        <LazyWhenVisible fallback={homeValueSkeleton}>
          <RealScoutHomeValue />
        </LazyWhenVisible>
      </div>

      <LazyWhenVisible fallback={listingsSkeleton}>
        <RealScoutCondoListings />
      </LazyWhenVisible>
      <LazyWhenVisible fallback={familyHomesSkeleton}>
        <RealScoutFamilyHomes />
      </LazyWhenVisible>
      <LazyWhenVisible fallback={testimonialsSkeleton}>
        <Testimonials />
      </LazyWhenVisible>

      <section className="bg-gradient-to-b from-blue-600 to-blue-800 py-16 text-white sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              It's Never Too Early to Discuss Your Options
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-pretty text-blue-100 sm:text-xl">
              Schedule a confidential strategy call today and take control of your future.
            </p>
            <div className="mt-8 flex justify-center">
              <DivorceCTA variant="primaryLight" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
