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
import { VisibleNapBlock } from '@/components/seo/VisibleNapBlock';
import { CONTENT_LAST_UPDATED, toSchemaDateTime } from '@/lib/content-dates';
import { LEGAL_DISCLAIMER, LUXURY_2026, LVR_SEPT_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type SellPageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/sell';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Sell Your Home During Divorce in Las Vegas | Dr. Jan Duffy',
    description: `Sell the marital home with neutral representation, a valuation both spouses accept, and a court-aware timeline. Las Vegas median was ${LVR_SEPT_2026.medianSfrPrice} in September 2026.`,
    alternates: { canonical, languages },
  };
}

export default async function SellPage(props: SellPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/sell';

  const faqs = [
    {
      question: 'Is this an instant-offer or cash-buyer program?',
      answer: 'No. This is a full listing on the Las Vegas MLS with professional marketing, open to every buyer, priced from closed comparable sales. Instant-offer programs trade price for speed, and a divorce seller splitting proceeds under a court order usually cannot afford that trade.',
    },
    {
      question: 'Do you represent me or my spouse?',
      answer: 'The sale. Both spouses sign one listing agreement, receive every update in the same message, and see every offer at the same time. Neither spouse gets a private channel. That neutrality is what lets both attorneys, and the court if needed, rely on the listing record.',
    },
    {
      question: 'What do you need from us to start?',
      answer: 'Who is on title, where the case stands, and whether any order or stipulation touches the home. From there comes a written valuation with comparables attached and a net sheet showing proceeds to each spouse. Your attorneys take it from there to a stipulation or order.',
    },
    {
      question: 'How quickly can the home sell?',
      answer: `Once listed, at market speed. Las Vegas REALTORS® reported ${LVR_SEPT_2026.sfrUnitsSold} single-family closings in September 2026, with ${LVR_SEPT_2026.soldWithin30DaysPct} sold within 30 days of listing. The time before listing depends on attorney calendars and two spouses making decisions.`,
    },
    {
      question: 'How are the proceeds divided?',
      answer: `Escrow holds the net proceeds and releases them as the stipulation or decree directs. ${NEVADA_LAW.communityPropertyRule} Documented separate-property contributions may be reimbursed before the split.`,
    },
    {
      question: 'Do you handle homes in The Ridges, Red Rock Country Club, or MacDonald Highlands?',
      answer: `Yes. Homes above ${LUXURY_2026.jumboThreshold2026} bring jumbo financing, wide appraisal spread, club membership transfers, and guard-gated showing rules. Each gets its own line in the listing plan, and private exposure to a vetted buyer list is available before public portals.`,
    },
  ];

  const articleSchema = generateArticleSchema(
    'Sell Your Home During Divorce in Las Vegas',
    'Neutral listing representation for divorcing homeowners in Las Vegas and Henderson: valuation both spouses accept, court-aware timelines, and escrow that follows the decree.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Home Selling Services',
    'Neutral listing representation for divorcing homeowners in Las Vegas, Henderson, and Summerlin, from valuation through court-compliant closing.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Sell Your Home During Divorce"
        heroSubhead="Neutral representation, a valuation both spouses accept, and a timeline that works with your attorneys and the court"
        showHomeValue
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How does Dr. Jan Duffy sell a home during a divorce?">
          One neutral agent lists the home for both spouses. The sale starts with a written valuation and
          net sheet both attorneys can use, moves to a listing addendum covering price, showings, and
          deadlines, and launches with marketing that never mentions the divorce. Offers reach both
          spouses at once, and escrow splits proceeds exactly as the stipulation or decree directs.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, September 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Homes sold within 30 days of listing', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Single-family closings in the month', value: LVR_SEPT_2026.sfrUnitsSold },
            { label: '2026 jumbo loan line, Clark County', value: LUXURY_2026.jumboThreshold2026 },
          ]}
          source={LVR_SEPT_2026.source}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>What this service is, and what it is not</h2>
          <p>
            This is a full MLS listing for a home owned by two people who are divorcing, run by one
            agent who represents the sale rather than a spouse. It is not an instant-offer program, a
            cash-buyer network, or a referral to whichever agent one spouse already knows. The goal is
            the market price, split as the decree directs, on a timeline the court can live with.
          </p>
          <ul>
            <li>Listing strategy written to match the stipulation or order, not negotiated mid-escrow.</li>
            <li>Coordination with both attorneys and, when needed, a CPA or lender, with both spouses copied.</li>
            <li>Every update, every offer, and every price discussion sent to both spouses in one message.</li>
            <li>No promises about price or timing that the market record cannot support.</li>
          </ul>

          <h2>How the sale runs</h2>
          <p>
            Six stages, each with a sign-off from both spouses: a valuation with comparables attached, a
            neutral listing agreement with an addendum, preparation on an agreed schedule, confidential
            marketing, offers summarized on one page and sent to both spouses together, and a closing
            where escrow follows the decree word for word.
          </p>
          <ol>
            <li>
              <strong>Valuation and net sheet:</strong>
              {' '}
              closed sales from the same community and size band, and the net to each spouse.
            </li>
            <li>
              <strong>Listing addendum:</strong>
              {' '}
              price, showing windows, repair budget, decision deadlines, and signing authority.
            </li>
            <li>
              <strong>Preparation:</strong>
              {' '}
              depersonalize, service pool and HVAC, fix what an inspector will flag.
            </li>
            <li>
              <strong>Marketing:</strong>
              {' '}
              professional photography, floor plan, and a description about the property, not the owners.
            </li>
            <li>
              <strong>Offers:</strong>
              {' '}
              one-page summaries to both spouses and both attorneys at once, with a response deadline.
            </li>
            <li>
              <strong>Closing:</strong>
              {' '}
              escrow instructions that copy the stipulation or decree, and funds wired to each spouse.
            </li>
          </ol>
          <p>
            The full walkthrough is at
            {' '}
            <Link href="/divorce-listing-process" className="text-blue-600 underline hover:text-blue-700">the divorce listing process</Link>
            {' '}
            and the
            {' '}
            <Link href="/how-to-sell-house-during-divorce" className="text-blue-600 underline hover:text-blue-700">ten-step selling guide</Link>
            .
          </p>

          <h2>What the Las Vegas market looks like now</h2>
          <p>
            In September 2026, Las Vegas REALTORS® reported
            {' '}
            {LVR_SEPT_2026.sfrUnitsSold}
            {' '}
            single-family closings at a
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            {' '}
            median, with
            {' '}
            {LVR_SEPT_2026.availableSfrListings}
            {' '}
            homes available and
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of sales closing within 30 days of listing. Homes priced from closed comparables are
            moving. Homes priced to a buyout number are not.
          </p>
          <p>
            For a divorce seller, that means the listing stage is rarely the slow part. The slow part is
            before it: valuation, attorney review, and two spouses agreeing on showing rules. Those are
            the decisions this service front-loads so the listing itself runs at market speed.
          </p>

          <h2>How proceeds are divided in Nevada</h2>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            Under
            {' '}
            {NEVADA_LAW.communityPropertyCite}
            , most Las Vegas divorce sales split net proceeds evenly after the mortgage, liens,
            commissions, and closing costs, adjusted for documented separate-property contributions.
            Escrow holds the funds until the stipulation or decree directs the release.
          </p>
          <p>
            Nevada has no state income tax. Section 121 may exclude up to $250,000 of gain per single
            filer or $500,000 on a joint return, which is one reason the closing date matters. Nevada
            transfer tax is
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000 on a sale, and a decree transfer between spouses is exempt. See
            {' '}
            <Link href="/splitting-house-proceeds-divorce" className="text-blue-600 underline hover:text-blue-700">splitting house proceeds</Link>
            {' '}
            and
            {' '}
            <Link href="/selling-house-before-or-after-divorce" className="text-blue-600 underline hover:text-blue-700">selling before or after the decree</Link>
            .
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>When the sale is contested</h2>
          <p>
            If one spouse refuses to list, blocks showings, or will not sign, the sale moves to a written
            escalation: a date-stamped log, same-day notice to both attorneys, and, if the pattern
            continues, a motion asking the court to enforce the terms or appoint a neutral agent. The
            court can order the sale, set the price, and authorize a signature.
          </p>
          <p>
            Start with
            {' '}
            <Link href="/one-spouse-wont-sell-house-divorce" className="text-blue-600 underline hover:text-blue-700">one spouse won't sell</Link>
            {' '}
            or
            {' '}
            <Link href="/court-ordered-home-sale" className="text-blue-600 underline hover:text-blue-700">court-ordered home sales</Link>
            . If a first listing already expired, see
            {' '}
            <Link href="/home-did-not-sell-during-divorce" className="text-blue-600 underline hover:text-blue-700">relisting after a failed divorce listing</Link>
            .
          </p>

          <h2>Where this service works</h2>
          <p>
            Las Vegas, Henderson, Summerlin, and North Las Vegas, from the
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            {' '}
            median through the guard-gated and golf communities: The Ridges, The Summit Club, Red Rock
            Country Club, MacDonald Highlands, Anthem Country Club, Southern Highlands Golf Club, Lake
            Las Vegas, and the Strip high-rises. The process is the same; the listing plan changes with
            the price band.
          </p>
          <p>
            Related pages:
            {' '}
            <Link href="/selling-home-during-divorce" className="text-blue-600 underline hover:text-blue-700">selling a house during divorce</Link>
            ,
            {' '}
            <Link href="/divorce-home-valuation" className="text-blue-600 underline hover:text-blue-700">divorce home valuation</Link>
            , and
            {' '}
            <Link href="/contact" className="text-blue-600 underline hover:text-blue-700">contact</Link>
            .
          </p>
        </div>

        <HighValueHomeNote points={[
          `Above ${LUXURY_2026.jumboThreshold2026}, a buyout is a jumbo refinance underwritten on income after support, and buyer financing takes longer. The listing plan sets a closing window for it or favors cash.`,
          'Custom homes in The Ridges, MacDonald Highlands, Red Rock Country Club, and Lake Las Vegas appraise with wide spread. A two-appraisal protocol is agreed before listing so a low appraisal does not reopen the division.',
          'Club memberships at Red Rock CC, DragonRidge, Anthem CC, and Summit Club have transfer fees and waiting lists. Transfer or surrender, and who pays, is decided before launch.',
          'Guard-gated showings need pre-registered names. The gate list goes in the addendum so access cannot be withheld by one spouse.',
          `Transfer tax is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000, which is ${NEVADA_LAW.transferTaxExample2M}. Section 121 caps the exclusion at $250,000 single or $500,000 joint, which matters on long-held estates.`,
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Fifteen minutes, one spouse or both. Who is on title, where the case stands, and what order exists.' },
            { title: 'Valuation and net sheet', detail: 'A written analysis with comparables attached and the net to each spouse, ready for both attorneys.' },
            { title: 'Listing addendum', detail: 'Price, showing windows, repair budget, deadlines, and signing authority in one document.' },
            { title: 'Launch and close', detail: 'Confidential marketing, offers to both spouses at once, and escrow instructions that match the decree.' },
          ]}
          callPromise="You leave the call with a number, a timeline, and the next decision."
        />

        <PageFAQ faqs={faqs} />

        <VisibleNapBlock />
      </DivorcePageTemplate>
    </>
  );
}
