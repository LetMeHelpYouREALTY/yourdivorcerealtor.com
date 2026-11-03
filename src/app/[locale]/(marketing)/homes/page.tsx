import type { Metadata } from 'next';
import type { PageProps } from '@/types';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { CalendlyLink } from '@/components/calendly/CalendlyLink';
import { DirectAnswer } from '@/components/divorce/DirectAnswer';
import { KeyFacts } from '@/components/divorce/KeyFacts';
import { StructuredData } from '@/components/seo/StructuredData';
import { VisibleNapBlock } from '@/components/seo/VisibleNapBlock';
import { RealScoutCondoListings } from '@/components/widgets/RealScoutCondoListings';
import { RealScoutFamilyHomes } from '@/components/widgets/RealScoutFamilyHomes';
import { RealScoutHomeValue } from '@/components/widgets/RealScoutHomeValue';
import { CONTENT_LAST_UPDATED, toSchemaDateTime } from '@/lib/content-dates';
import { LUXURY_2026, LVR_SEPT_2026 } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import { generateArticleSchema, generateRealEstateAgentSchema } from '@/lib/schema';
import {
  BROKERAGE_NAME,
  REAL_ESTATE_LICENSE_NV,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from '@/lib/site-contact';

const path = '/homes';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Las Vegas Homes for Sale After Divorce | Dr. Jan Duffy',
    description:
      'Search Las Vegas and Henderson listings and learn the lender and timing rules for buying during or after a divorce. 9,984 single-family homes were listed.',
    alternates: { canonical, languages },
  };
}

export default async function HomesPage(props: PageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const articleSchema = generateArticleSchema(
    'Las Vegas Homes for Sale After Divorce',
    'Listing search for Las Vegas and Henderson, with the lender and timing rules that apply when buying during or after a divorce.',
    getCanonicalSiteUrl(path, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );

  return (
    <>
      <StructuredData data={[articleSchema, generateRealEstateAgentSchema()]} />
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Homes for Sale, Las Vegas Area
          </h1>

          <DirectAnswer question="Can I buy a home in Las Vegas before my divorce is final?">
            Often, yes, but two things control it. Lenders count your current mortgage against you until the marital
            home sells or the refinance closes, and a home bought before the decree may be community property unless
            the settlement says otherwise. With
            {' '}
            {LVR_SEPT_2026.availableSfrListings}
            {' '}
            single-family listings available in September 2026, inventory is not the constraint; timing and loan
            qualification are.
          </DirectAnswer>

          <KeyFacts
            facts={[
              { label: 'Available single-family listings, Sept 2026', value: LVR_SEPT_2026.availableSfrListings },
              { label: 'Single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
              { label: '2026 jumbo loan line, Clark County', value: LUXURY_2026.jumboThreshold2026 },
            ]}
            source={`${LVR_SEPT_2026.source}; ${LUXURY_2026.jumboSource}`}
            sourceUrl={LVR_SEPT_2026.url}
          />

          <div className="prose prose-lg max-w-none">
            <h2>How to use the listing tools below</h2>
            <p>
              The search tools show live MLS listings for condos and single-family homes across Las Vegas and
              Henderson. Use them to set a realistic price band for your next home before the settlement is final,
              because the number you can borrow depends on what happens to the current house.
            </p>
            <p>
              If the marital home is being sold, most lenders will not count the sale proceeds until escrow closes, and
              the old payment stays in your debt ratio until then. If you are buying out your spouse, the new jumbo or
              conforming loan on the current house sets your ratio for the next one. Above
              {' '}
              {LUXURY_2026.jumboThreshold2026}
              {' '}
              both loans are jumbo, and reserves are checked twice.
            </p>
            <p>
              Timing against the decree matters as much as the price. A purchase closed after the decree is separate
              property on its face. One closed before it needs settlement language that says so. See
              {' '}
              <Link href="/buying-home-after-divorce" className="font-semibold text-blue-600 hover:underline">
                buying a home after divorce
              </Link>
              {' '}
              and
              {' '}
              <Link href="/selling-home-during-divorce" className="font-semibold text-blue-600 hover:underline">
                selling during divorce
              </Link>
              {' '}
              for the sequence most clients follow.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-8">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">Search with a plan</h2>
            <p className="mb-6 text-gray-700">
              A 15-minute call sets the price band, the loan path, and the timing against your case. Then the search
              below becomes useful rather than anxious.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <CalendlyLink className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700">
                Schedule a call
              </CalendlyLink>
              <a href={SITE_PHONE_TEL} className="text-center font-semibold text-blue-700 hover:underline sm:text-left">
                {SITE_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div id="home-value">
        <RealScoutHomeValue />
      </div>
      <RealScoutCondoListings />
      <RealScoutFamilyHomes />

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-gray-600">
            MLS data is subject to change. Dr. Jan Duffy, license #
            {REAL_ESTATE_LICENSE_NV}
            ,
            {' '}
            {BROKERAGE_NAME}
            .
          </p>
          <VisibleNapBlock className="mt-10" />
        </div>
      </div>
    </>
  );
}
