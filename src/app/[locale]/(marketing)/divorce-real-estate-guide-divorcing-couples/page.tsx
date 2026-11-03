import type { Metadata } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { setRequestLocale } from 'next-intl/server';
import { MarkdownContent } from '@/components/content/MarkdownContent';
import { DirectAnswer } from '@/components/divorce/DirectAnswer';
import { DivorcePageTemplate } from '@/components/divorce/DivorcePageTemplate';
import { HighValueHomeNote } from '@/components/divorce/HighValueHomeNote';
import { KeyFacts } from '@/components/divorce/KeyFacts';
import { NextSteps } from '@/components/divorce/NextSteps';
import { PageFAQ } from '@/components/divorce/PageFAQ';
import { StructuredData } from '@/components/seo/StructuredData';
import { RealScoutCondoListings } from '@/components/widgets/RealScoutCondoListings';
import { RealScoutFamilyHomes } from '@/components/widgets/RealScoutFamilyHomes';
import { RealScoutHomeValue } from '@/components/widgets/RealScoutHomeValue';
import { CONTENT_LAST_UPDATED, toSchemaDateTime } from '@/lib/content-dates';
import { LEGAL_DISCLAIMER, LUXURY_2026, LVR_SEPT_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

const pagePath = '/divorce-real-estate-guide-divorcing-couples';

type IGuideProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const faqs = [
  {
    question: 'Do both of us have to sign the listing agreement?',
    answer: 'Yes, unless a court order names one spouse to sign for both. A listing signed by one owner of community property cannot bind the other, and a buyer\'s title company will not close without both signatures or an order. The agreement should also carry authority language on price, reductions, offers, and access so the sale survives one spouse going silent.',
  },
  {
    question: 'Can we keep the divorce out of the listing entirely?',
    answer: 'Yes. Nevada requires disclosure of material facts about the property, not about the sellers. A Coming Soon period on the MLS, no yard sign at first, personal items out before photos, and a listing agent who answers the why-are-they-selling question with a professional non-answer keep the divorce out of the negotiation.',
  },
  {
    question: 'Who pays the mortgage while the house is for sale?',
    answer: 'Whoever the stipulation or order says. Common arrangements are the occupying spouse paying the mortgage with a credit at closing, or both spouses splitting it per their incomes. The point is to write it down before listing, including taxes, insurance, HOA, and repairs, so each payment is not a new negotiation.',
  },
  {
    question: 'How is the buyout price set?',
    answer: 'From a valuation both spouses accept, minus the loan balance, divided per the decree. For a tract home a broker price opinion is often enough to agree. For a custom home, each spouse retains a certified appraiser and the stipulation says in advance whether the two figures are averaged or a third appraiser breaks the tie.',
  },
  {
    question: 'What does the sale cost us?',
    answer: `Commission, Clark County transfer tax at ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000, title and escrow fees, prorated taxes and HOA, and any repair credits. A net sheet at several prices shows each spouse the in-hand figure. ${NEVADA_LAW.transferTaxDivorceExemption}`,
  },
  {
    question: 'How long will the sale take?',
    answer: `In September 2026, ${LVR_SEPT_2026.soldWithin30DaysPct} of Las Vegas single-family homes sold within 30 days of listing, with escrow adding 30 to 45 days. A divorce sale adds time for counsel review and any order, so plan on 60 to 120 days from listing to funded proceeds for a tract home, longer for a custom home.`,
  },
];

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(pagePath, locale);
  return {
    title: 'Real Estate Guide for Divorcing Couples | Dr. Jan Duffy',
    description: 'Nevada community property, keep-or-sell, buyouts, living in the home during the sale, privacy, and the team Las Vegas couples need for 1 shared decision.',
    alternates: { canonical, languages },
  };
}

export default async function DivorcingCouplesGuide(props: IGuideProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const contentPath = path.join(process.cwd(), 'src/content/divorce-real-estate-guide-divorcing-couples.md');
  const markdownContent = fs.readFileSync(contentPath, 'utf-8');

  const description = 'Nevada community property, keep-or-sell, buyouts, living in the home during the sale, privacy during marketing, and the professional team divorcing Las Vegas couples need.';
  const articleSchema = generateArticleSchema(
    'Real Estate Guide for Divorcing Couples in Nevada',
    description,
    getCanonicalSiteUrl(pagePath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorcing Couples Real Estate Guide Services',
    description,
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Real Estate Guide for Divorcing Couples"
        heroSubhead="Nevada community property, your options, and protecting your privacy"
        currentPath={pagePath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
        showHomeValue
      >
        <DirectAnswer question="What do divorcing couples in Nevada need to know about the house?">
          A home bought during the marriage is community property that Nevada divides equally unless the court writes a reason not to. You can sell and split the net, one spouse can buy the other out with a refinance on one income, or you can defer the sale under written terms. Both signatures or a court order are needed to list. The divorce never needs to be disclosed to buyers.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Sold within 30 days of listing', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Clark County transfer tax per $1,000', value: NEVADA_LAW.transferTaxClarkPer1000 },
            { label: '2026 jumbo loan line, Clark County', value: LUXURY_2026.jumboThreshold2026 },
          ]}
          source={`${LVR_SEPT_2026.source}; ${NEVADA_LAW.transferTaxCite}; ${LUXURY_2026.jumboSource}`}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <MarkdownContent content={markdownContent} />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>The Nevada rule in one paragraph</h2>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            (
            {NEVADA_LAW.communityPropertyCite}
            ). The court divides what the closing statement or the appraisal shows, which is why the valuation and the sale need a clean written record.
            {' '}
            {NEVADA_LAW.capitalGainsExclusion}
            {' '}
            {NEVADA_LAW.noStateIncomeTax}
            {' '}
            {LEGAL_DISCLAIMER}
          </p>
        </div>

        <HighValueHomeNote
          points={[
            `A buyout refinance above ${LUXURY_2026.jumboThreshold2026} is a jumbo loan; the keeping spouse should hold a lender's written pre-qualification on one income before the buyout figure is agreed.`,
            'Custom homes in The Ridges, MacDonald Highlands, and Southern Highlands carry wide appraisal spread; agree a two-appraisal protocol with a tie-breaker before either report is ordered.',
            'Club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, and The Summit Club are separate assets with their own transfer fees and belong on the property schedule.',
            'Guard-gated showings run through the gate\'s guest list; the listing agreement should name which spouse approves access.',
            'The Section 121 exclusion caps at $250,000 single or $500,000 joint; on a large gain, the timing of the sale relative to the decree is a tax decision to make with a CPA before signing.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Fifteen minutes on the property, where the case stands, and whether sell, keep, or defer is on the table.' },
            { title: 'Valuation and net sheet', detail: 'A walk-through both spouses are offered, then a written broker price opinion and net sheet to both of you and both counsel.' },
            { title: 'Plan on paper', detail: 'Listing authority language, a buyout worksheet, or deferred-sale carrying terms for your attorneys to review.' },
          ]}
          callPromise="You leave the call with a number, a timeline, and the next decision."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
      <RealScoutHomeValue />
      <RealScoutCondoListings />
      <RealScoutFamilyHomes />
    </>
  );
}
