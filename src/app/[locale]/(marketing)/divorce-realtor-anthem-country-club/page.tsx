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
import { COMMUNITY_12MO, LEGAL_DISCLAIMER, LUXURY_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateLocalBusinessSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type IAnthemCCProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-anthem-country-club';
const community = COMMUNITY_12MO.anthemCountryClub;
const henderson = COMMUNITY_12MO.henderson1MPlus;

const pageTitle = 'Anthem Country Club Divorce Realtor | Dr. Jan Duffy';
const pageDescription = `Divorcing with a home in Anthem Country Club? The 12-month median is ${community.median}. See how club membership, gate showings and jumbo buyouts are handled.`;

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical, languages },
  };
}

const faqs = [
  {
    question: 'Is every Anthem Country Club home above the jumbo loan line?',
    answer: `No. Sales in the last 12 months ran from ${community.range}, and the 2026 conforming limit in Clark County is ${LUXURY_2026.jumboThreshold2026}. Homes below that line can be bought out with a conforming refinance, which has looser reserve and debt-to-income rules. Above it, the buyout is a jumbo loan. Which side of the line you are on changes the whole plan.`,
  },
  {
    question: 'Does the Anthem Country Club membership transfer with the house?',
    answer: `Not by deed. Membership is a contract with the club, which sets transfer rules, fees and deposit terms. The decree should say which spouse keeps the membership, how any refundable deposit is divided, and whether the home will be marketed with a membership available to the buyer, subject to club approval. Buyers ask about this early.`,
  },
  {
    question: 'How do showings work inside Anthem Country Club during a divorce?',
    answer: `By appointment through the staffed gate. The buyer agent is registered, the visit is logged, and there is no lockbox drive-by traffic. Pre-approval or proof of funds is confirmed before the appointment, applied the same way to every buyer. Listing remarks never mention the divorce, and the agent handles buyer questions so neither spouse has to.`,
  },
  {
    question: 'How is a golf-course home in Anthem Country Club valued for a divorce?',
    answer: `From comparables inside the gates, adjusted for golf frontage, lot size, elevation and finish. With ${community.closings} closings in 12 months there are enough recent sales to work from. Custom homes near the top of the range benefit from a two-appraisal protocol; production homes usually need one appraisal plus a broker price opinion. Agree on the method before any report is ordered.`,
  },
  {
    question: 'Who pays the HOA and club dues while the home is on the market?',
    answer: `Usually the spouse living in the home, with a credit or reimbursement settled from proceeds at closing. Put the allocation in writing early. Anthem Country Club has a community association plus the club's own dues, and an unpaid balance on either shows up in the resale certificate and can delay closing.`,
  },
  {
    question: 'What taxes apply when we sell during the divorce?',
    answer: `${NEVADA_LAW.capitalGainsExclusion} Clark County transfer tax is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 on a sale, customarily paid by the seller, but a deed between spouses under the decree is exempt. ${NEVADA_LAW.noStateIncomeTax} ${LEGAL_DISCLAIMER}`,
  },
];

export default async function AnthemCountryClubDivorceRealtor(props: IAnthemCCProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = path;
  const articleSchema = generateArticleSchema(
    'Anthem Country Club Divorce Real Estate Agent',
    pageDescription,
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'Anthem Country Club' }];
  const serviceSchema = generateServiceSchema(
    'Anthem Country Club Divorce Real Estate Services',
    pageDescription,
    'Anthem Country Club',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, localBusinessSchema, serviceSchema, realEstateAgentSchema, faqSchema]} />
      <DivorcePageTemplate
        h1="Anthem Country Club Divorce Real Estate Agent"
        heroSubhead="Golf-course homes, club membership and buyouts on both sides of the jumbo line, handled by a neutral agent in Henderson"
        showHomeValue
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How is a divorce home sale handled in Anthem Country Club?">
          Anthem Country Club is a guard-gated golf community in Henderson with a 12-month median sale of
          {' '}
          {community.median}
          {' '}
          and sales from
          {' '}
          {community.range}
          . That range straddles the
          {' '}
          {LUXURY_2026.jumboThreshold2026}
          {' '}
          jumbo line, so the first question is which side your home is on. From there: value it from
          in-community comparables, put the club membership in the decree, run showings by appointment through
          the gate, and assign HOA and club dues until closing. A neutral agent manages it for both spouses.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Anthem Country Club median sale, 12 months', value: community.median },
            { label: 'Closings, 12 months through September 2026', value: community.closings },
            { label: 'Sale range, 12 months', value: community.range },
            { label: '2026 jumbo loan line, Clark County', value: LUXURY_2026.jumboThreshold2026 },
          ]}
          source={`${COMMUNITY_12MO.source}, ${COMMUNITY_12MO.asOf}; ${LUXURY_2026.jumboSource}`}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>What Anthem Country Club is, and why it matters in a divorce</h2>
          <p>
            Anthem Country Club is a guard-gated community in the Anthem master plan in Henderson, built
            around a Hale Irwin golf course on the slopes of the McCullough Range. Homes range from production
            golf-frontage lots to custom estates on the ridge, which is why 12-month sales ran from
            {' '}
            {community.range}
            {' '}
            across
            {' '}
            {community.closings}
            {' '}
            closings. The median is
            {' '}
            {community.median}
            .
          </p>
          <p>
            Access is from Anthem Parkway and Eastern Avenue, with the 215 beltway a few minutes north. The
            community has a homeowners association that staffs the gates and maintains common areas, and a
            separate club with golf, sports and social memberships. Both charge dues, and both have to be
            assigned in the settlement.
          </p>
          <p>
            Henderson's $1M+ market recorded
            {' '}
            {henderson.closings}
            {' '}
            closings in
            {' '}
            {henderson.period}
            {' '}
            at a median of
            {' '}
            {henderson.median}
            {' '}
            and a median of
            {' '}
            {henderson.medianDom}
            {' '}
            days on market. Anthem Country Club sits near the middle of that market, with a broader buyer pool
            than the hillside custom enclaves and faster turnover at the lower end of its range.
          </p>

          <h2>Which side of the jumbo line is your home on?</h2>
          <p>
            The 2026 conforming loan limit in Clark County is
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            . Anthem Country Club is one of the few guard-gated golf communities where a meaningful share of
            homes can be bought out with a conforming refinance. Below the line, the spouse keeping the home
            faces standard underwriting. Above it, the refinance is jumbo: more reserves, a lower debt-to-income
            limit, full documentation, and sometimes a second appraisal.
          </p>
          <p>
            Work out the loan amount first. Settlement value, minus the existing mortgage balance, minus the
            equity owed to the departing spouse, gives the refinance figure. If that figure is near the line,
            the structure of the buyout can move it. A written pre-approval at the actual amount, on post-divorce
            income, tells both attorneys whether the plan is real. The
            {' '}
            <Link href="/divorce-buyout-options">buyout options guide</Link>
            {' '}
            covers deferred buyouts and other structures when a refinance will not close in time.
          </p>

          <h2>Club membership in the settlement</h2>
          <p>
            An Anthem Country Club membership is a contract with the club, not a right that travels with the
            deed. The club sets transfer rules, fees and deposit handling. Golf, sports and social tiers carry
            different dues and different transfer terms. The purchase contract for the home does not move the
            membership, and a buyer who expects one needs club approval.
          </p>
          <p>
            The decree should answer four questions. Which spouse keeps the membership if one keeps the home?
            How is any refundable deposit split if the membership is resigned? Will the home be marketed with a
            membership available to the buyer? Who pays club dues until closing? Get the club's current membership
            documents into the file at the start, and route membership questions to the club's office rather than between spouses.
          </p>

          <h2>Valuing a golf-course home</h2>
          <p>
            Comparables inside the gates are the ones that matter. Golf frontage, which hole, lot size, elevation
            on the ridge and finish level drive the spread more than square footage. With
            {' '}
            {community.closings}
            {' '}
            closings in 12 months, there are enough sales to build a sound opinion, but a production home on an
            interior lot and a custom home on the ridge should never share a comparable set.
          </p>
          <p>
            For custom homes near the top of the range, use a two-appraisal protocol: each spouse chooses an
            appraiser, both receive the same package of plans, improvement invoices, HOA and club documents, and
            the attorneys set a tolerance band in advance. For production homes, one appraisal plus a broker
            price opinion is usually enough. The
            {' '}
            <Link href="/divorce-home-valuation">divorce home valuation page</Link>
            {' '}
            explains how the reports are reconciled.
          </p>

          <h2>Showings, privacy, taxes and the settlement language</h2>
          <p>
            Showings run by appointment through the staffed gate. The buyer agent is registered, the visit is
            logged, and pre-approval or proof of funds is confirmed first, applied the same way to every buyer.
            Open houses may be limited by the HOA. Listing remarks and photos never mention the divorce, and the
            agent handles every buyer question.
          </p>
          <p>
            Pricing is set from the first week. The lower end of the Anthem Country Club range moves quickly;
            the custom end does not. A home that opens above the market will be passed over by buyers who are
            also watching Red Rock Country Club, MacDonald Highlands and Southern Highlands at the same price.
          </p>
          <p>
            {NEVADA_LAW.capitalGainsExclusion}
            {' '}
            Clark County transfer tax is
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000 on an open-market sale.
            {' '}
            {NEVADA_LAW.transferTaxDivorceExemption}
            {' '}
            The settlement should also assign HOA dues, club dues, utilities and mortgage payments until closing,
            and state how net proceeds are split after liens, commissions and credits.
            {' '}
            {LEGAL_DISCLAIMER}
            {' '}
            For the valley-wide picture, see the
            {' '}
            <Link href="/luxury-divorce-real-estate-las-vegas">luxury divorce real estate guide</Link>
            {' '}
            and the
            {' '}
            <Link href="/divorce-realtor-henderson">Henderson divorce real estate page</Link>
            .
          </p>

          <h2>If the court orders the sale of an Anthem Country Club home</h2>
          <p>
            When spouses cannot agree, the court can order the sale and set the terms. The order usually names
            the listing agent, fixes the list price or the method for setting it, schedules reductions, assigns
            occupancy and carrying costs, and states how offers are accepted. Nevada's rule is equal division of
            community property unless the judge writes down a compelling reason not to (
            {NEVADA_LAW.communityPropertyCite}
            ).
          </p>
          <p>
            For a home here, the order should cover the club membership, who pays HOA and club dues during the
            listing, whether a private-exposure window is allowed, and what happens if one spouse refuses to sign
            a listing amendment or closing documents. If the home is near the top of the range, it should also
            require the two-appraisal protocol and define the tolerance band.
          </p>
          <p>
            The order can also settle the buyout question before a sale is forced. If one spouse can show a
            written pre-approval at the actual refinance amount, on the correct side of the
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            line, the court may allow a buyout window before the home goes to market. If the window passes, the
            sale proceeds on the terms already in the order. A court-appointed neutral agent gives both attorneys
            the same showing log, the same feedback and the same offer summaries on the same day. The
            {' '}
            <Link href="/court-ordered-home-sale">court-ordered home sale page</Link>
            {' '}
            lays out the procedure step by step.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>
        </div>

        <HighValueHomeNote points={[
          `Sales ran from ${community.range} in 12 months, so some buyouts are conforming and some are jumbo. Compute the actual refinance amount against the ${LUXURY_2026.jumboThreshold2026} line before negotiating.`,
          'The club membership transfers by club contract, not by deed. Put the membership, its deposit and the dues allocation in the decree before the listing goes live.',
          'Ridge custom homes and interior production homes should never share a comparable set. Use a two-appraisal protocol for the custom end of the range.',
          'Gate showings are scheduled, logged and limited to verified buyers. Buyers at this price are comparing Anthem CC against other gated golf communities, so pricing from the first week matters.',
          `Clark County transfer tax runs ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 on a sale but not on a decree transfer between spouses, which is one reason a buyout can cost less to close.`,
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the home, its lot, the membership tier, and the timeline your attorneys are working toward.' },
            { title: 'Valuation package', detail: 'A broker price opinion built on in-community comparables, with a recommended appraisal approach for counsel.' },
            { title: 'Written plan', detail: 'Buyout feasibility on the right side of the jumbo line, membership handling, marketing approach and settlement line items.' },
            { title: 'Neutral execution', detail: 'Scheduled gate showings, identical updates to both spouses, and a closing calendar that matches the decree.' },
          ]}
          callPromise="You leave the call with a value range, a loan answer, and a clear next decision."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
