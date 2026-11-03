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

type IServicesProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-real-estate-services';

const servicesFaqs = [
  {
    question: 'Why does a divorce sale need a different process than a normal listing?',
    answer: 'A normal listing has one decision-maker who wants to close. A divorce listing has two owners, two attorneys, and often a decree that sets price, timing, and who gets paid. The process here adds written showing rules, sign-off deadlines, and escrow instructions both attorneys approve, so the sale does not stall when the parties disagree.',
  },
  {
    question: 'What does the valuation and equity analysis include?',
    answer: 'A written value range built from closed comparable sales, current inventory, and the condition of the home. It subtracts the loan payoff, liens, and estimated selling costs to show net equity. That figure supports buyout math, settlement talks, and, when needed, testimony. Homes above the jumbo line get a second opinion as standard.',
  },
  {
    question: 'What does neutral representation mean on a divorce listing?',
    answer: 'Both spouses receive the same offers, updates, and deadlines on the same day, with Nevada\'s required written consent and disclosure signed first. No side conversations. When the court appoints the agent, reporting goes to the court and the order is followed as written.',
  },
  {
    question: 'How does the buyout and refinance help work?',
    answer: 'The valuation sets the equity figure. The practice then coordinates with the lender on whether the staying spouse qualifies alone, and with counsel on the deed and payoff language. Above the 2026 jumbo line of $832,750, underwriting is stricter, so the lender conversation starts before the number is written into the agreement.',
  },
  {
    question: 'Can the practice handle a court-ordered sale?',
    answer: 'Yes. Court-appointed listings follow the order as written: list price, price-reduction schedule, showing access, and disbursement. Progress is reported back in writing. If a party blocks the sale, the escalation protocol documents it so counsel can act without delay.',
  },
  {
    question: 'What happens with a guard-gated home or a Strip condo?',
    answer: 'Guard-gated enclaves allow no open houses, so showings run by appointment with buyer verification before entry. Club memberships transfer under club bylaws, not the decree. Strip towers add HOA transfer rules and lender limits on condo projects. Each of these is handled in the listing plan before the home goes live.',
  },
];

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Divorce Real Estate Services Las Vegas | Dr. Jan Duffy',
    description: 'Valuation, neutral listing, buyout and refinance coordination, and court-ordered sales for Las Vegas divorces, including homes above the $832,750 jumbo line.',
    alternates: { canonical, languages },
  };
}

export default async function Services(props: IServicesProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const articleSchema = generateArticleSchema(
    'Divorce Real Estate Services in Las Vegas',
    'Valuation, neutral listing, buyout and refinance coordination, court-ordered sales, and high-value home services for divorcing homeowners in Las Vegas.',
    getCanonicalSiteUrl(path, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Real Estate Services',
    'Divorce real estate services in Las Vegas: home valuation, equity analysis, neutral listing process, buyout and refinance coordination, court-ordered sales, and valuation testimony.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas', 'Green Valley', 'Spring Valley'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(servicesFaqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Divorce Real Estate Services in Las Vegas"
        heroSubhead="Valuation, neutral listing, buyout coordination, and court-ordered sales for the marital home."
        showHomeValue
        currentPath={path}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="What services does a divorce real estate agent provide?">
          Five things: a written valuation with net equity, an options analysis with numbers for sell, buyout, co-own,
          and refinance, a neutral listing process both attorneys approve, coordination of buyouts and refinances with
          the lender and counsel, and court-ordered sale management with written reporting. For homes above
          {' '}
          {LUXURY_2026.jumboThreshold2026}
          , the practice adds jumbo underwriting, two-appraisal protocol, and club membership handling.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Homes sold within 30 days, Sept 2026', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Available single-family listings, Sept 2026', value: LVR_SEPT_2026.availableSfrListings },
            { label: '2026 jumbo loan line, Clark County', value: LUXURY_2026.jumboThreshold2026 },
          ]}
          source={`${LVR_SEPT_2026.source}; ${LUXURY_2026.jumboSource}`}
          sourceUrl={LVR_SEPT_2026.url}
        />

        {/* Tailwind v4 + typography plugin modifiers; eslint cannot resolve prose-* variants */}
        {/* eslint-disable-next-line tailwindcss/no-custom-classname -- prose-headings/h2/h3 from @tailwindcss/typography */}
        <article className="prose prose-lg prose-gray prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:text-gray-900 prose-h2:mt-12 prose-h2:text-balance prose-h2:text-2xl prose-h2:sm:text-3xl prose-h3:mt-8 prose-h3:text-xl prose-p:leading-relaxed max-w-none">
          <h2>Home valuation and equity analysis</h2>
          <p>
            The valuation is a written value range built from closed comparable sales, active competition, and the
            condition of your home, minus loan payoff, liens, and selling costs. It is the number every other decision
            rests on: the buyout figure, the settlement split, and whether a sale nets enough for two households.
          </p>
          <h3>What the report contains</h3>
          <ul>
            <li>Closed sales in the same subdivision or tower over the last 6 to 12 months, adjusted for size, lot, and view.</li>
            <li>Active and pending listings you would compete with, and how long they have been on the market.</li>
            <li>Loan payoff, HELOC balances, liens, HOA dues owed, and estimated commissions and closing costs.</li>
            <li>
              Net equity, and how it splits under an equal division (
              {NEVADA_LAW.communityPropertyCite}
              ) or your settlement terms.
            </li>
          </ul>
          <p>
            Both spouses receive the same report. When counsel needs it for mediation or a hearing, it is written to be
            read by a judge.
          </p>

          <h2>Divorce listing process</h2>
          <p>
            Selling during a divorce needs rules written before the sign goes up. The listing plan sets price, showing
            access, who signs what and by when, and how offers reach both parties. Both attorneys review it. That
            prevents the two most common failures: a spouse who blocks showings, and a spouse who will not sign.
          </p>
          <h3>Neutral representation</h3>
          <p>
            Both spouses get the same offers, updates, and deadlines on the same day. Nevada's written consent and
            disclosure for one agent serving both owners is signed first. No side conversations.
          </p>
          <h3>One communication channel</h3>
          <p>
            Every update goes to both spouses and both attorneys at once. Offers are summarized in writing with net
            proceeds to each party, so the comparison is about money, not about who heard first.
          </p>
          <h3>Dated timeline</h3>
          <p>
            Before listing you receive a list date, an expected contract date based on current absorption (
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of September 2026 sales closed within 30 days), a close date, and a move-out date.
          </p>

          <h2>Buyout and refinancing coordination</h2>
          <p>
            A buyout has three moving parts: the equity figure, the staying spouse's ability to carry the loan alone,
            and the deed and payoff language in the decree. The practice supplies the first, coordinates the second
            with the lender, and gives counsel the real estate terms for the third.
          </p>
          <h3>Buyout math</h3>
          <p>
            Value minus payoff minus selling costs that would have been paid on a sale, split under the settlement
            terms. The offsets, such as retirement accounts or cash, are a legal question; the home's number is not.
          </p>
          <h3>Refinance coordination</h3>
          <p>
            Removing a spouse from the loan means a new loan in one name. The lender needs the decree or settlement,
            the buyout figure, and proof the staying spouse qualifies on one income. See
            {' '}
            <Link href="/refinancing-after-divorce">refinancing after divorce</Link>
            {' '}
            and
            {' '}
            <Link href="/divorce-buyout-options">buyout options</Link>
            .
          </p>

          <h2>Court-ordered sales and escalation</h2>
          <p>
            When the court orders a sale, the order controls list price, reductions, access, and disbursement. The
            practice follows it as written and reports progress to the court and both counsel. If a party refuses to
            sign or blocks access, the escalation protocol documents each event with dates, so counsel can act on a
            record rather than an argument.
          </p>
          <h3>Valuation testimony</h3>
          <p>
            When a judge needs a number, Dr. Jan Duffy provides the written valuation and testifies to how it was built.
            See
            {' '}
            <Link href="/divorce-real-estate-expert-witness">expert witness services</Link>
            .
          </p>

          <h2>High-value and guard-gated homes</h2>
          <p>
            Above
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            the same five services apply, with four additions: jumbo underwriting on any buyout, a two-appraisal protocol
            on custom homes, club membership transfer handled apart from the deed, and showing rules that fit a staffed
            gate. In 2025 Las Vegas closed
            {' '}
            {LUXURY_2026.sales1MPlus2025}
            {' '}
            sales above $1 million; the practice covers that tier across the valley.
          </p>
          <h3>Enclaves covered</h3>
          <ul>
            <li>
              <Link href="/divorce-realtor-the-ridges">The Ridges</Link>
              : 12-month median
              {' '}
              {COMMUNITY_12MO.theRidges.median}
              , HOA
              {' '}
              {COMMUNITY_12MO.theRidges.hoaMonthly}
              {' '}
              per month, sales from
              {' '}
              {COMMUNITY_12MO.theRidges.lowSale}
              {' '}
              to
              {' '}
              {COMMUNITY_12MO.theRidges.highSale}
              .
            </li>
            <li>
              <Link href="/divorce-realtor-red-rock-country-club">Red Rock Country Club</Link>
              : median
              {' '}
              {COMMUNITY_12MO.redRockCountryClub.median}
              {' '}
              across
              {' '}
              {COMMUNITY_12MO.redRockCountryClub.closings}
              {' '}
              closings, two Arnold Palmer courses, staffed gate.
            </li>
            <li>
              <Link href="/divorce-realtor-macdonald-highlands">MacDonald Highlands</Link>
              : median
              {' '}
              {COMMUNITY_12MO.macdonaldHighlands.median}
              , DragonRidge membership handled separately from the sale.
            </li>
            <li>
              <Link href="/divorce-realtor-anthem-country-club">Anthem Country Club</Link>
              : median
              {' '}
              {COMMUNITY_12MO.anthemCountryClub.median}
              , sales ranging
              {' '}
              {COMMUNITY_12MO.anthemCountryClub.range}
              .
            </li>
            <li>
              <Link href="/strip-high-rise-condo-divorce">Strip high-rises</Link>
              : Waldorf Astoria median
              {' '}
              {COMMUNITY_12MO.waldorfAstoriaStrip.median}
              {' '}
              at
              {' '}
              {COMMUNITY_12MO.waldorfAstoriaStrip.pricePerSqFt}
              {' '}
              per square foot; HOA transfer rules and condo-project lender limits apply.
            </li>
            <li>
              The Summit Club, Southern Highlands Golf Club, and Lake Las Vegas, with the full picture on
              {' '}
              <Link href="/luxury-divorce-real-estate-las-vegas">luxury divorce real estate in Las Vegas</Link>
              .
            </li>
          </ul>
          <h3>Privacy and exposure</h3>
          <p>
            Where privacy outweighs reach, the listing can launch to private networks and qualified buyers before, or
            instead of, the public MLS. That choice is made in writing by both spouses, because it affects price
            discovery and the record a court may later review.
          </p>

          <h2>Working with attorneys and mediators</h2>
          <p>
            Family law attorneys and mediators send valuation requests, equity analyses, and listing coordination here.
            The practice supplies the real estate terms counsel needs for decree language: price, reduction schedule,
            access, disbursement, and deed timing. See
            {' '}
            <Link href="/attorney-resources">attorney resources</Link>
            {' '}
            and
            {' '}
            <Link href="/divorce-mediator-resources">mediator resources</Link>
            .
          </p>
          <p className="text-sm text-gray-600 italic">{LEGAL_DISCLAIMER}</p>
        </article>

        <HighValueHomeNote points={[
          `A buyout refinance above ${LUXURY_2026.jumboThreshold2026} is a jumbo loan; the staying spouse qualifies alone, with reserves, before the figure goes into the agreement.`,
          'Two-appraisal protocol on custom homes: each spouse picks an appraiser and the agreement names how a gap is resolved, by averaging or a third report.',
          'Club memberships at Red Rock CC, DragonRidge, Anthem CC, and The Summit Club transfer under club bylaws; obtain the policy in writing before drafting.',
          'Section 121 excludes $250,000 of gain per single filer or $500,000 joint; on a large gain, whether you sell before or after the decree changes the tax. Confirm with a CPA.',
          `Transfer tax is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 in Clark County (${NEVADA_LAW.transferTaxExample2M}); a deed between former spouses under the decree is exempt.`,
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Fifteen minutes on where the case stands, who is on title and the loan, and what you need from the house.' },
            { title: 'Valuation', detail: 'A written value range with net equity, shared with both spouses and, if needed, both attorneys.' },
            { title: 'Options with numbers', detail: 'Sell, buy out, co-own for a period, or refinance, each with a dollar figure and a date.' },
            { title: 'Plan and execution', detail: 'Showing rules, sign-off deadlines, and escrow instructions in writing, then a listing that runs on schedule.' },
          ]}
          callPromise="You leave the call with a value range, your options, and the next decision."
        />

        <PageFAQ faqs={servicesFaqs} />
      </DivorcePageTemplate>
    </>
  );
}
