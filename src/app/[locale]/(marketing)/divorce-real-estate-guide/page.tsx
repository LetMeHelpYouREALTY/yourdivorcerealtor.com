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

const path = '/divorce-real-estate-guide';

type IGuideProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const faqs = [
  {
    question: 'Can we sell the house before the divorce is final?',
    answer: 'Yes, with both signatures or a court order. Many Clark County couples sell during the case so neither carries the mortgage alone and the proceeds are held in escrow until the decree directs disbursement. The listing agreement should name who approves price changes and offers so the sale does not stall if one spouse stops responding.',
  },
  {
    question: 'How is the value of the house decided?',
    answer: 'For an open-market sale, the sale price is the value. For a buyout or a dispute, a licensed appraisal from a state-certified appraiser sets it, with the effective date named by counsel. A broker price opinion from a licensee frames the list price and negotiation but is not what a lender or judge relies on for a buyout.',
  },
  {
    question: 'What if one spouse refuses to sell or cooperate?',
    answer: 'Your attorney can ask the family court to order the sale and name the terms: who signs, how price is set, who approves offers, and what access the occupying spouse must provide. A listing agent then works from that order. Written status reports document any refusal so enforcement is a short motion rather than a new dispute.',
  },
  {
    question: 'Do we have to tell buyers we are divorcing?',
    answer: 'No. Nevada requires disclosure of material facts about the property, not about the sellers. Buyers\' agents will ask why you are selling; the listing agent gives a professional non-answer. A divorce that becomes known can cost you leverage in negotiation, so privacy is a pricing issue as much as a personal one.',
  },
  {
    question: 'Will we owe tax on the sale?',
    answer: `${NEVADA_LAW.capitalGainsExclusion} ${NEVADA_LAW.noStateIncomeTax} Gains above the exclusion are taxed at federal capital gains rates. ${LEGAL_DISCLAIMER}`,
  },
  {
    question: 'How long does a divorce home sale take in Las Vegas?',
    answer: `In September 2026, ${LVR_SEPT_2026.soldWithin30DaysPct} of single-family homes sold within 30 days of listing, and a typical escrow runs another 30 to 45 days. A divorce sale adds time for both signatures, counsel review, and any court order, so plan on 60 to 120 days from listing to funded proceeds for a tract home.`,
  },
];

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Divorce Real Estate Guide for Las Vegas | Dr. Jan Duffy',
    description: 'Your 4 options for the marital home in a Las Vegas divorce, how value is set, what the court can order, and what the sale costs, with sourced market data.',
    alternates: { canonical, languages },
  };
}

export default async function CompleteGuide(props: IGuideProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = path;
  const description = 'The four options for the marital home in a Las Vegas divorce, how value is set, what the court can order, and what the sale costs.';
  const articleSchema = generateArticleSchema(
    'Divorce Real Estate Guide for Las Vegas',
    description,
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Real Estate Guide Services',
    description,
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Divorce Real Estate Guide for Las Vegas"
        heroSubhead="Your options, the numbers, and what the court can order"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="What happens to the house in a Las Vegas divorce?">
          A home bought during the marriage is community property, and Nevada courts divide community property equally unless they find a written reason not to. You and your spouse can sell and split the net, one can buy the other out with a refinance, you can co-own for a set period, or the court can order a sale. Each option starts with a documented value.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Sold within 30 days of listing', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Available single-family listings', value: LVR_SEPT_2026.availableSfrListings },
            { label: '2026 jumbo loan line, Clark County', value: LUXURY_2026.jumboThreshold2026 },
          ]}
          source={`${LVR_SEPT_2026.source}; ${LUXURY_2026.jumboSource}`}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>How Nevada treats the marital home</h2>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            (
            {NEVADA_LAW.communityPropertyCite}
            ). A home bought during the marriage with marital funds is community property. A home one spouse owned before marriage, or received by gift or inheritance, starts as separate property, though mortgage payments and improvements from marital funds can create a community claim on part of its equity.
          </p>
          <p>
            Equal division does not mean the house is cut in half. It means the net equity, after the loan payoff and sale costs, is divided equally, or offset against other assets so one spouse keeps the home and the other receives equivalent value elsewhere. The court divides what the closing statement or the appraisal shows, which is why the valuation and the sale need to be documented cleanly.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Your four options</h2>
          <p>
            Every divorce home ends in one of four places: sold on the open market with the net split, kept by one spouse who buys out the other, co-owned for a set period and then sold or bought out, or sold under a court order because the spouses could not agree. The right one depends on who can carry the payment alone and whether a refinance is realistic.
          </p>
          <h3>Sell and split the net</h3>
          <p>
            The cleanest option when neither spouse can or wants to carry the home alone. Both sign the listing, the net proceeds sit in escrow until the decree or a stipulation directs disbursement, and each spouse starts the next chapter with cash. In September 2026,
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of Las Vegas single-family homes sold within 30 days of listing, so a well-priced tract home moves quickly.
          </p>
          <h3>One spouse buys the other out</h3>
          <p>
            The keeping spouse pays the other's share of equity, usually by refinancing into a new loan in one name that also pulls cash out. The buyout figure comes from an agreed valuation minus the loan balance. The hard part is qualification: the keeping spouse must carry the new loan on one income, and above
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            that loan is jumbo. See
            {' '}
            <Link href="/divorce-buyout-options" className="text-blue-600 underline hover:text-blue-700">buyout options</Link>
            .
          </p>
          <h3>Co-own for a set period</h3>
          <p>
            A deferred sale keeps the home in both names until a named date or event, often a child finishing a school year. It needs a written agreement on who pays the mortgage, taxes, insurance, HOA, and repairs, who lives there, and how the eventual sale or buyout is priced. Without those terms, it becomes the next dispute.
          </p>
          <h3>Court-ordered sale</h3>
          <p>
            When the spouses cannot agree, either attorney can ask the family court to order the sale and set the terms. The order names who signs the listing, how price is set and reduced, who approves offers, and what access the occupying spouse must provide. A listing agent then works from the order rather than from either spouse. See
            {' '}
            <Link href="/court-ordered-home-sale" className="text-blue-600 underline hover:text-blue-700">court-ordered home sale</Link>
            .
          </p>

          <h2>How the value gets set</h2>
          <p>
            An open-market sale sets its own value. A buyout or a contested division needs a licensed appraisal from a state-certified appraiser, with an effective date your attorney names. A broker price opinion from a real estate licensee frames the list price and the negotiation but is not what a lender or judge relies on to fix a buyout figure.
          </p>
          <p>
            For a tract home in Summerlin, Henderson, or North Las Vegas with a dozen model-match sales in the last six months, the opinion and the appraisal usually land close. For a custom home in The Ridges, MacDonald Highlands, or Southern Highlands, comparable sales are sparse and vary by lot, view, and finish, so two appraisers can differ by six figures. There, a two-appraisal protocol agreed in advance is the cleaner path. See
            {' '}
            <Link href="/divorce-appraisal-services" className="text-blue-600 underline hover:text-blue-700">divorce appraisal services</Link>
            .
          </p>

          <h2>What the sale costs and who pays</h2>
          <p>
            Net proceeds are the sale price minus the loan payoff, commission, Clark County transfer tax at
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000, title and escrow fees, any repair credits, and prorated taxes and HOA dues. A net sheet at three or four sale prices shows each spouse what a given list price means in hand, which settles more arguments than the list price itself.
          </p>
          <p>
            {NEVADA_LAW.transferTaxDivorceExemption}
            {' '}
            On taxes,
            {' '}
            {NEVADA_LAW.capitalGainsExclusion}
            {' '}
            {NEVADA_LAW.noStateIncomeTax}
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>How a neutral listing works</h2>
          <p>
            A neutral listing agent represents the property, not a spouse. Both spouses sign the listing agreement, both receive every showing report and offer at the same time, and both attorneys receive a written status report weekly. Price reductions follow a schedule in the agreement so the sale keeps moving if one spouse stops responding. Strategy questions go to counsel, not the agent.
          </p>
          <p>
            Buyers do not need to know you are divorcing. Nevada requires disclosure of material facts about the property, not about the sellers, and a known divorce costs leverage in negotiation. A Coming Soon period on the MLS, no yard sign at first, and direct outreach to agents active in your area limit exposure while still reaching buyers. For the full checklist on privacy, occupancy during the sale, and multiple properties, see the
            {' '}
            <Link href="/divorce-real-estate-guide-divorcing-couples" className="text-blue-600 underline hover:text-blue-700">guide for divorcing couples</Link>
            .
          </p>
        </div>

        <HighValueHomeNote
          points={[
            `A buyout above ${LUXURY_2026.jumboThreshold2026} is a jumbo refinance; get a lender's written pre-qualification on one income before agreeing to a buyout figure.`,
            'Custom homes carry wide appraisal spread; agree a two-appraisal protocol with a tie-breaker before either report is ordered.',
            'Club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, and The Summit Club are separate assets with their own transfer rules and fees.',
            'Guard-gated showings need guest-list approval; the listing agreement should say which spouse controls access.',
            'The Section 121 exclusion caps at $250,000 single or $500,000 joint; on a large gain, selling while still married and filing jointly can change the tax outcome, so involve a CPA before the decree.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Fifteen minutes on the property, where the case stands, and what your attorney has asked for.' },
            { title: 'Valuation', detail: 'A walk-through both spouses are offered, then a written broker price opinion and net sheet to both of you and both counsel.' },
            { title: 'Plan', detail: 'Sale, buyout, or deferred sale, with the listing authority or buyout worksheet drafted for counsel to review.' },
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
