import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { CalendlyLink } from '@/components/calendly/CalendlyLink';
import { DirectAnswer } from '@/components/divorce/DirectAnswer';
import { StructuredData } from '@/components/seo/StructuredData';
import { VisibleNapBlock } from '@/components/seo/VisibleNapBlock';
import { CONTENT_LAST_UPDATED, toSchemaDateTime } from '@/lib/content-dates';
import { LUXURY_2026 } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import { generateArticleSchema, generateRealEstateAgentSchema } from '@/lib/schema';

type PortfolioProps = {
  params: Promise<{ locale: string }>;
};

const path = '/portfolio';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Client Experience, Las Vegas Divorce Sales | Dr. Jan Duffy',
    description:
      'Why there is no public gallery of past divorce sales, where to read client and attorney reviews instead, and how privacy is handled on every listing.',
    alternates: { canonical, languages },
    robots: { index: true, follow: true },
  };
}

export default async function Portfolio(props: PortfolioProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const articleSchema = generateArticleSchema(
    'Client Experience, Las Vegas Divorce Sales',
    'Why past divorce sales are not shown in a public gallery, and where to read client and attorney reviews instead.',
    getCanonicalSiteUrl(path, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );

  return (
    <>
      <StructuredData data={[articleSchema, generateRealEstateAgentSchema()]} />
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <h1 className="text-center text-4xl font-bold text-gray-900">Client Experience</h1>

          <DirectAnswer question="Why is there no gallery of past divorce sales?">
            Because a divorce sale is part of a court file. Publishing an address, a sale price, and a date next to a
            review would tie a family's case to a map pin. That matters at every price, and more so in enclaves where
            {' '}
            {LUXURY_2026.closingsAbove3MSept2026}
            {' '}
            homes closed above $3 million in a month and a single sale is identifiable. Client and attorney reviews,
            without addresses, are on the testimonials page.
          </DirectAnswer>

          <div className="prose prose-lg max-w-none">
            <h2>What stands in for a portfolio</h2>
            <p>
              Reviews, written by clients and one family law attorney, describe the three situations that make up most
              of the practice: a neutral listing for two spouses, a buyout with a refinance, and a court-ordered sale.
              Each is shown as written, with a first name and last initial.
            </p>
            <p>
              The about page carries the credentials, the training, and the track record figures. The services page
              explains the listing process, the escalation protocol, and what changes above the
              {' '}
              {LUXURY_2026.jumboThreshold2026}
              {' '}
              jumbo line, where a two-appraisal protocol, club membership transfer, and guard-gated showing rules apply.
            </p>
            <p>
              The same privacy rule applies during a listing. Where both spouses agree in writing, a home can be
              exposed to private networks and verified buyers before, or instead of, a public MLS launch. That is the
              working version of what a portfolio would otherwise show.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/testimonials"
              className="inline-flex rounded-xl bg-blue-600 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Read the reviews
            </Link>
            <Link
              href="/about"
              className="inline-flex rounded-xl border-2 border-blue-600 px-8 py-3.5 font-semibold text-blue-700 transition-colors hover:bg-blue-50"
            >
              About Dr. Jan
            </Link>
            <CalendlyLink className="inline-flex rounded-xl border border-gray-300 px-8 py-3.5 font-semibold text-gray-800 transition-colors hover:bg-gray-50">
              Schedule a call
            </CalendlyLink>
          </div>

          <div className="mx-auto max-w-lg text-left">
            <VisibleNapBlock />
          </div>
        </div>
      </div>
    </>
  );
}
