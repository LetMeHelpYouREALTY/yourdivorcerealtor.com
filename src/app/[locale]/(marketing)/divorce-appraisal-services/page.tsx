import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { DirectAnswer } from '@/components/divorce/DirectAnswer';
import { DivorcePageTemplate } from '@/components/divorce/DivorcePageTemplate';
import { HighValueHomeNote } from '@/components/divorce/HighValueHomeNote';
import { KeyFacts } from '@/components/divorce/KeyFacts';
import { NextSteps } from '@/components/divorce/NextSteps';
import { PageFAQ } from '@/components/divorce/PageFAQ';
import { StructuredData } from '@/components/seo/StructuredData';
import { CONTENT_LAST_UPDATED, toSchemaDateTime } from '@/lib/content-dates';
import { COMMUNITY_12MO, LEGAL_DISCLAIMER, LUXURY_2026, LVR_SEPT_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type IAppraisalProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-appraisal-services';

const faqs = [
  {
    question: 'Is a broker price opinion the same as an appraisal?',
    answer: 'No. A broker price opinion is a real estate licensee\'s estimate of likely sale price from comparable sales and active competition. A licensed appraisal is an opinion of value prepared by a state-certified appraiser under USPAP. Lenders and judges rely on the appraisal for a buyout or contested value; the opinion is for setting list price and framing negotiation.',
  },
  {
    question: 'Which one do I need for my divorce?',
    answer: 'If you are selling on the open market, a broker price opinion sets the list price and the sale itself establishes value. If one spouse is buying the other out, or the spouses dispute value, you need a licensed appraisal, and for a custom home usually two. Your attorney decides which document the stipulation or court will accept.',
  },
  {
    question: 'How does the two-appraisal protocol work?',
    answer: 'Each spouse retains a state-certified appraiser. Reports are exchanged on a set date. The stipulation says in advance what happens if they differ: average the two, retain a third appraiser to break the tie, or let the court choose. Agreeing the method before the reports exist removes the incentive to shop for a number.',
  },
  {
    question: 'What is the effective date and why does it matter?',
    answer: 'The effective date is the date the value applies to. Nevada divides community property as of the date the court sets, which can be the date of separation, filing, trial, or decree. An appraisal with the wrong effective date can be challenged. Counsel should name the date in the engagement letter to the appraiser.',
  },
  {
    question: 'Who pays for the appraisal?',
    answer: 'Whoever the stipulation or order says. Common arrangements are each spouse paying for their own appraiser under the two-appraisal protocol, or the community estate paying for one agreed appraiser from escrow at closing. The fee goes directly to the appraiser; the listing agent does not mark it up or receive any part of it.',
  },
  {
    question: 'Can the valuation help with the Section 121 exclusion?',
    answer: `The exclusion depends on gain, not value alone. ${NEVADA_LAW.capitalGainsExclusion} The closing statement and a basis calculation from your CPA determine gain. An appraisal at the effective date helps when one spouse keeps the home and sells later.`,
  },
];

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Divorce Appraisal vs. Broker Price Opinion | Dr. Jan Duffy',
    description: 'When a Las Vegas divorce needs a licensed appraisal, when a broker price opinion is enough, and the 2-appraisal protocol for contested custom homes.',
    alternates: { canonical, languages },
  };
}

export default async function AppraisalServices(props: IAppraisalProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = path;
  const description = 'When a Las Vegas divorce needs a licensed appraisal, when a broker price opinion is enough, and the two-appraisal protocol for custom homes where value is contested.';
  const articleSchema = generateArticleSchema(
    'Divorce Appraisal Services: Appraisal versus Broker Price Opinion',
    description,
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Property Valuation Services',
    description,
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Divorce Appraisal Services in Las Vegas"
        heroSubhead="Broker price opinion, licensed appraisal, or both"
        showHomeValue
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="Do I need an appraisal or a broker price opinion for my divorce?">
          A broker price opinion from a licensee sets a list price and frames negotiation. A licensed appraisal from a state-certified appraiser fixes value for a buyout or a contested division, and it is what lenders and judges rely on. Open-market sales usually need only the opinion. Buyouts and disputed values need the appraisal, and custom homes usually need two.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: '$1M+ median, trailing 12 months', value: LUXURY_2026.median1MPlusTrailing12 },
            { label: 'The Ridges price per sq ft, 12 months', value: COMMUNITY_12MO.theRidges.pricePerSqFt },
            { label: 'Henderson $1M+ price per sq ft, Q3 2026', value: COMMUNITY_12MO.henderson1MPlus.pricePerSqFt },
          ]}
          source={`${LVR_SEPT_2026.source}; ${LUXURY_2026.median1MPlusSource}; ${COMMUNITY_12MO.source}`}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Broker price opinion versus licensed appraisal</h2>
          <p>
            A broker price opinion is a licensee's written estimate of the price a home will likely sell for, built from recent closed sales, pending sales, and active competition, with adjustments explained. A licensed appraisal is an opinion of value prepared by a Nevada state-certified appraiser under USPAP, with a stated effective date. The appraisal carries weight with lenders and courts; the opinion is a pricing and negotiation tool.
          </p>
          <p>
            The two documents answer different questions. The opinion answers what to list at and what a buyer pool will pay in the next sixty days. The appraisal answers what the home was worth on a specific date for purposes of a loan or a division. In a divorce, that date may be separation, filing, trial, or decree, and the appraiser needs to be told which.
          </p>
          <p>
            This practice prepares the broker price opinion and coordinates with independent certified appraisers for the appraisal. The agent does not appraise, does not receive any part of the appraisal fee, and delivers the opinion to both spouses and both counsel at the same time so it starts as a shared document rather than an exhibit.
          </p>

          <h2>When each document is the right one</h2>
          <p>
            Selling on the open market: the opinion sets list price, and the sale itself fixes value, so an appraisal is rarely needed unless the buyer's lender orders one. Buyout: the keeping spouse's lender will order an appraisal, and the stipulation should say whether that appraisal, or a separate one, sets the buyout figure. Contested value: a licensed appraisal, and for custom homes usually two.
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Open-market sale.</strong>
              {' '}
              Broker price opinion to both counsel, then the market decides.
            </li>
            <li>
              <strong>Buyout of a tract home.</strong>
              {' '}
              One agreed certified appraiser, effective date named in the stipulation.
            </li>
            <li>
              <strong>Buyout or contested value on a custom home.</strong>
              {' '}
              Two-appraisal protocol with the tie-breaker agreed in advance.
            </li>
            <li>
              <strong>Deferred sale.</strong>
              {' '}
              Opinion now for planning, appraisal at the sale date if one spouse buys out then.
            </li>
          </ul>

          <h2>The two-appraisal protocol for custom homes</h2>
          <p>
            Custom homes have few true comparables, and the ones that exist differ by lot size, view corridor, pool and casita, and finish level. Two certified appraisers working in good faith can land six figures apart. The protocol accepts that and fixes the resolution method before the reports exist: each spouse retains an appraiser, reports are exchanged on a set date, and the stipulation says what happens when they differ.
          </p>
          <p>
            Three resolution methods are common. Average the two when they fall within a stated percentage of each other. Retain a third appraiser, chosen by the first two, when the gap is wider, with the court using the middle figure or the third report. Or submit both to the judge and let the court choose. Whichever is used, naming it in advance removes the incentive to shop for a number and keeps the valuation off the trial calendar.
          </p>
          <p>
            In The Ridges, twelve-month MLS closings ranged from
            {' '}
            {COMMUNITY_12MO.theRidges.lowSale}
            {' '}
            to
            {' '}
            {COMMUNITY_12MO.theRidges.highSale}
            {' '}
            with a median of
            {' '}
            {COMMUNITY_12MO.theRidges.median}
            . MacDonald Highlands ran a median of
            {' '}
            {COMMUNITY_12MO.macdonaldHighlands.median}
            {' '}
            with a top sale of
            {' '}
            {COMMUNITY_12MO.macdonaldHighlands.topSale}
            . Ranges that wide are why a single appraisal on a custom home invites a challenge.
          </p>

          <h2>Effective dates, Nevada division, and taxes</h2>
          <p>
            An appraisal states the date its value applies to. In a divorce the right date is a legal question: Nevada courts may value community property as of separation, filing, trial, or decree depending on the facts and the parties' agreement. An appraisal with the wrong effective date can be excluded or discounted, so counsel should name the date in the engagement letter to the appraiser.
          </p>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            (
            {NEVADA_LAW.communityPropertyCite}
            ). The valuation feeds that division; it does not decide it. On taxes,
            {' '}
            {NEVADA_LAW.capitalGainsExclusion}
            {' '}
            {NEVADA_LAW.noStateIncomeTax}
            {' '}
            {NEVADA_LAW.transferTaxDivorceExemption}
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>How the valuation is delivered</h2>
          <p>
            The broker price opinion is written after a walk-through both spouses are offered. It lists the comparable sales with adjustments, the active competition, the likely sale range, and a recommended list price. It goes to both spouses and both attorneys in one email within three to five business days. Follow-up questions from either side are answered to the whole group.
          </p>
          <p>
            When an appraisal is needed, the agent provides the appraiser with MLS data, access, and the effective date counsel has named, then steps back. The appraiser's report goes to whoever retained them. For a buyout, the agent then prepares a worksheet showing equity at the appraised value, the paying spouse's share, and the loan a refinance must carry. The full process for attorneys is on the
            {' '}
            <Link href="/attorney-resources" className="text-blue-600 underline hover:text-blue-700">attorney resources</Link>
            {' '}
            page; contested-value testimony is described under
            {' '}
            <Link href="/divorce-real-estate-expert-witness" className="text-blue-600 underline hover:text-blue-700">expert witness services</Link>
            .
          </p>
        </div>

        <HighValueHomeNote
          title="Valuing a home above the jumbo line"
          points={[
            'Appraisal spread widens with every custom feature; the two-appraisal protocol with a named tie-breaker belongs in the stipulation before any report is ordered.',
            `A buyout above ${LUXURY_2026.jumboThreshold2026} is a jumbo refinance, and the lender's appraiser may not be the one the stipulation names; counsel should say which report controls.`,
            'View-corridor and lot-premium adjustments drive most of the gap between appraisers on Ridges, MacDonald Highlands, and Southern Highlands estates; ask for them itemized.',
            'Club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, and The Summit Club are valued separately and should not be folded into the real property appraisal.',
            'On a large gain, the Section 121 cap of $250,000 single or $500,000 joint means the valuation date and who sells can change the tax bill; bring a CPA in before the stipulation is signed.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Fifteen minutes on the property, whether you are selling or buying out, and what your attorney has asked for.' },
            { title: 'Walk-through and opinion', detail: 'Both spouses offered the same appointment. A written broker price opinion goes to both of you and both counsel.' },
            { title: 'Appraisal coordination', detail: 'If a buyout or contested value calls for it, coordination with independent certified appraisers under the protocol counsel sets.' },
            { title: 'Worksheet', detail: 'Net sheet for a sale, or buyout worksheet with the refinance figure, delivered to both sides.' },
          ]}
          callPromise="You leave the call knowing which document your case needs and when it will be in hand."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
