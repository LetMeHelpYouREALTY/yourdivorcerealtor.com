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
  generateLocalBusinessSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type ILuxuryDivorceProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/luxury-divorce-real-estate-las-vegas';

const pageTitle = 'Luxury Divorce Real Estate in Las Vegas | Dr. Jan Duffy';
const pageDescription = `Selling or dividing a Las Vegas home above ${LUXURY_2026.jumboThreshold2026} in a divorce? Learn how jumbo buyouts, appraisal spread, club memberships and privacy change the plan.`;

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
    question: 'What makes a luxury divorce home sale different from a typical one?',
    answer: `Three things change above ${LUXURY_2026.jumboThreshold2026}. A buyout needs a jumbo refinance with tighter underwriting. Custom homes have fewer true comparables, so appraisals can land far apart. And the buyer pool is smaller, so privacy, timing and pre-market exposure matter more than on a tract home. The legal steps are the same; the execution is not.`,
  },
  {
    question: 'Can one spouse refinance a jumbo mortgage to buy out the other?',
    answer: `Often, yes, but the spouse keeping the home must qualify alone. Jumbo lenders look at reserves, debt-to-income and documented income after the decree, including support payments. Get a written pre-approval before the buyout number goes into the settlement agreement. A buyout that depends on a loan nobody has approved yet is a plan, not a deal.`,
  },
  {
    question: 'Why do two appraisals of the same custom home come back so different?',
    answer: `Custom homes in guard-gated communities sell in small numbers, so each appraiser chooses different comparables and makes different adjustments for lot, view, finish and golf frontage. The spread is normal. A two-appraisal protocol, agreed in writing before anyone orders a report, keeps that spread from turning into a court fight later.`,
  },
  {
    question: 'How does the capital gains exclusion work on a large gain?',
    answer: `${NEVADA_LAW.capitalGainsExclusion} Gain above the cap is taxable at the federal level. ${NEVADA_LAW.noStateIncomeTax} Documented improvements raise your basis, so gather receipts early. ${LEGAL_DISCLAIMER}`,
  },
  {
    question: 'Who pays Nevada transfer tax when a divorcing couple sells a home?',
    answer: `In Clark County the real property transfer tax is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of value, which comes to ${NEVADA_LAW.transferTaxExample2M}. On an open-market sale the seller customarily pays it. ${NEVADA_LAW.transferTaxDivorceExemption} So a deed from one spouse to the other under the decree owes none. ${LEGAL_DISCLAIMER}`,
  },
  {
    question: 'Can a luxury home be marketed privately before it goes on the MLS?',
    answer: `Yes, within MLS rules. Private exposure means the listing is shown to agents and buyers through office and network channels before public syndication. It suits owners who do not want a divorce sale visible to neighbors or online. Public advertising starts the MLS clock, so the strategy has to be planned with the listing agreement, not improvised.`,
  },
];

export default async function LuxuryDivorceRealEstate(props: ILuxuryDivorceProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = path;
  const articleSchema = generateArticleSchema(
    'Luxury Divorce Real Estate in Las Vegas',
    pageDescription,
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [
    { '@type': 'City', 'name': 'Las Vegas' },
    { '@type': 'City', 'name': 'Henderson' },
    { '@type': 'City', 'name': 'Summerlin' },
  ];
  const serviceSchema = generateServiceSchema(
    'Luxury Divorce Real Estate Services',
    pageDescription,
    ['Las Vegas', 'Henderson', 'Summerlin'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, localBusinessSchema, serviceSchema, realEstateAgentSchema, faqSchema]} />
      <DivorcePageTemplate
        h1="Luxury Divorce Real Estate in Las Vegas"
        heroSubhead="Jumbo buyouts, appraisal spread, club memberships and private sales, handled by a neutral agent"
        showHomeValue
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="What changes when a Las Vegas divorce involves a luxury home?">
          Above the
          {' '}
          {LUXURY_2026.jumboThreshold2026}
          {' '}
          conforming limit, a buyout needs a jumbo refinance, custom-home appraisals can land far apart,
          and the buyer pool is small enough that privacy and pre-market exposure change the result.
          Club memberships, guard-gated showing rules, the Section 121 cap on large gains and Clark County
          transfer tax all need a line in the settlement. A neutral agent handles the sale so neither spouse has to trust the other with it.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas closings above $1M, September 2026', value: LUXURY_2026.closingsAbove1MSept2026 },
            { label: 'Closings above $3M, September 2026', value: LUXURY_2026.closingsAbove3MSept2026 },
            { label: '2026 jumbo loan line, Clark County', value: LUXURY_2026.jumboThreshold2026 },
            { label: 'Median $1M+ sale, trailing 12 months', value: LUXURY_2026.median1MPlusTrailing12 },
          ]}
          source={`${LUXURY_2026.sept2026Source}; ${LUXURY_2026.jumboSource}; ${LUXURY_2026.median1MPlusSource}`}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Why a high-value divorce sale is a different transaction</h2>
          <p>
            The law is the same for a
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            {' '}
            tract home and a
            {' '}
            {COMMUNITY_12MO.macdonaldHighlands.median}
            {' '}
            custom home. Nevada divides community property equally. The difference is in execution: fewer buyers, fewer comparable sales,
            larger loans, and more parties with a say in how the home is shown and transferred. Each of those
            adds a decision the settlement has to cover.
          </p>
          <p>
            The scale is real. Las Vegas recorded
            {' '}
            {LUXURY_2026.closingsAbove1MSept2026}
            {' '}
            closings above $1 million in September 2026, against
            {' '}
            {LVR_SEPT_2026.sfrUnitsSold}
            {' '}
            single-family sales overall. Only
            {' '}
            {LUXURY_2026.closingsAbove3MSept2026}
            {' '}
            of those were above $3 million. In 2025 the valley saw
            {' '}
            {LUXURY_2026.sales1MPlus2025}
            {' '}
            sales at $1 million or more, with Summerlin at
            {' '}
            {LUXURY_2026.summerlinShare2025}
            {' '}
            and Henderson at
            {' '}
            {LUXURY_2026.hendersonShare2025}
            . A home at the top of that range may have a handful of true buyers in any given quarter.
          </p>
          <p>
            That thin market changes how a divorce sale should be run. Overpricing costs months, not weeks.
            A visible price reduction on a guard-gated custom home is read by every agent who tracks the
            community. And a buyer who learns the sale is court-driven will negotiate as if the sellers have no choice.
            The job is to keep that information where it belongs: in the file, not in the listing remarks.
          </p>

          <h2>Financing a buyout above the jumbo line</h2>
          <p>
            A buyout lets one spouse keep the home and pay the other for their share of equity. Above
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            , the refinance that funds it is a jumbo loan. Jumbo underwriting is stricter than conforming:
            more reserves, lower debt-to-income limits, full income documentation, and sometimes two appraisals.
            The spouse keeping the home has to qualify alone, with post-divorce income.
          </p>
          <p>
            Three points trip up luxury buyouts more than anything else:
          </p>
          <ul>
            <li>
              <strong>Support income counts only with a track record.</strong>
              {' '}
              Lenders usually want the decree in hand and evidence that payments are being received before they count alimony or child support.
            </li>
            <li>
              <strong>Cash-out versus rate-and-term pricing.</strong>
              {' '}
              Some jumbo lenders treat a decree-required buyout as rate-and-term, others as cash-out. The rate difference can move the monthly payment enough to change whether the buyout works.
            </li>
            <li>
              <strong>The buyout number and the appraisal are linked.</strong>
              {' '}
              If the lender's appraisal comes in under the value in the settlement, the loan shrinks and the spouse leaving may wait for the balance.
            </li>
          </ul>
          <p>
            Before a buyout figure goes into the agreement, get a written pre-approval at that loan amount. The
            {' '}
            <Link href="/divorce-buyout-options">buyout options guide</Link>
            {' '}
            walks through the structures, including deferred buyouts and sale-leasebacks when a refinance will not close in time.
          </p>

          <h2>Valuing a custom home: appraisal spread and the two-appraisal protocol</h2>
          <p>
            Custom homes produce wide appraisal spreads because there are few true comparables. Two licensed
            appraisers can look at the same house in The Ridges and arrive at numbers hundreds of thousands apart.
            Neither is wrong. They chose different sales, adjusted differently for view and lot, and weighted finish
            quality differently. In a divorce, that spread becomes a dispute unless the process is set in advance.
          </p>
          <p>
            A two-appraisal protocol solves most of it. Each spouse selects a licensed appraiser with luxury
            experience. Both receive the same information package: floor plans, improvement receipts, HOA
            documents, and a list of recent sales inside the community. If the two values fall within a band the
            attorneys agree on beforehand, the average becomes the settlement value. If they fall outside the band,
            a third appraiser is retained or the attorneys negotiate from the two reports.
          </p>
          <p>
            A broker price opinion from a neutral agent adds a third lens: what a buyer will actually pay this
            quarter. Appraisers look backward at closed sales. An agent who shows homes in the community every
            week sees current competition and pending contracts. Use both. The
            {' '}
            <Link href="/divorce-home-valuation">divorce home valuation page</Link>
            {' '}
            explains how the two reports fit together.
          </p>

          <h2>Taxes on a large gain: the Section 121 cap and transfer tax</h2>
          <p>
            {NEVADA_LAW.capitalGainsExclusion}
            {' '}
            On a home that has doubled in value, the gain can exceed the cap by a wide margin. The part above
            it is taxable federally. There is no Nevada income tax, so the state side is zero. Timing matters:
            a sale closed while still married and filed jointly reaches the higher cap, and the divorce-instrument
            rule can protect a spouse who moved out.
          </p>
          <p>
            Basis is the other lever. Every documented improvement raises it and lowers the gain. Pool,
            casita, kitchen remodel, solar, landscaping, the roof: gather the invoices now, not at tax time.
            The
            {' '}
            <Link href="/capital-gains-tax-divorce-home-sale">capital gains guide</Link>
            {' '}
            covers the divorce-specific rules in more detail.
          </p>
          <p>
            Transfer tax is simpler. Clark County charges
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000 of value on a sale. That works out to
            {' '}
            {NEVADA_LAW.transferTaxExample2M}
            . The seller customarily pays it on an open-market sale.
            {' '}
            {NEVADA_LAW.transferTaxDivorceExemption}
            {' '}
            That exemption is one reason a buyout can cost less to close than a sale.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Club memberships, gates, privacy and marketing</h2>
          <p>
            At Red Rock Country Club, DragonRidge, Anthem Country Club and The Summit Club, the membership
            is a contract with the club, not a right that travels with the deed. The decree needs to say who
            keeps it, what happens to any refundable deposit, and whether the home will be marketed with a
            membership available to the buyer. Clubs have their own transfer rules and fees, and some keep
            resignation lists that control when a deposit comes back.
          </p>
          <p>
            Guard-gated communities add showing logistics. Staffed gates require agent registration, showings
            run by appointment, and lockbox access does not exist. Many HOAs restrict open houses and signage.
            That is a feature for a divorcing owner: every showing is scheduled, every visitor is logged, and
            nobody wanders through unannounced. The trade-off is slower exposure, which the pricing plan has to account for.
          </p>
          <p>
            Private exposure before the MLS is the third piece. A luxury listing can be shown through office
            and agent networks before public syndication, within MLS rules. Owners choose this when they do not
            want the sale visible to neighbors, employers or the press. The settlement should state whether
            private exposure is allowed, for how long, and at what point the listing goes public if no offer arrives.
          </p>
          <p>
            Cash buyers are a larger share of closings at the top tier than in the broader market. Cash shortens
            the timeline and removes appraisal risk, but cash buyers often expect a price concession for it. Proof
            of funds is verified before a showing is confirmed, applied the same way to every prospective buyer.
          </p>
          <p>
            The listing agreement should carry all of this in writing: the private-exposure window and its end
            date, the showing rules and the proof-of-funds requirement, who approves photography, how feedback
            and offers are reported to each spouse, and a price-review date agreed by both. A luxury listing
            with those terms settled before launch runs on a calendar instead of on arguments.
          </p>

          <h2>When the court orders the sale of a luxury home</h2>
          <p>
            When spouses cannot agree, the court can order the home sold and set the terms. The order usually
            names the listing agent, sets the list price or the method for setting it, schedules price
            reductions, states who occupies the home and who pays carrying costs, and says how offers are accepted.
            Nevada's rule is equal division of community property unless the judge writes down a compelling reason
            not to (
            {NEVADA_LAW.communityPropertyCite}
            ).
          </p>
          <p>
            On a high-value home, the order should also address the items above: whether two appraisals are
            required, whether private exposure is permitted, how club membership is handled, and what happens if
            one spouse refuses to sign closing documents. A neutral court-appointed agent reports to both
            attorneys on the same schedule with the same information.
          </p>
          <p>
            Expect the order to set a procedure, not just a price. A common structure names the agent, requires
            the listing within a set number of days, fixes the opening price from the appraisals, schedules
            reductions if no offer arrives, and lets the court or a designated party sign for a spouse who
            refuses. Carrying costs on a large home make delay expensive, so a correct price in week one matters
            more than it does on a tract home. See the
            {' '}
            <Link href="/court-ordered-home-sale">court-ordered home sale page</Link>
            {' '}
            for the process step by step.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h3>Guides by community</h3>
          <p>
            Each enclave has its own rules, price band and buyer pool. These pages cover the specifics:
          </p>
          <ul>
            <li>
              <Link href="/divorce-realtor-the-ridges">The Ridges, Summerlin</Link>
              {' '}
              — median
              {' '}
              {COMMUNITY_12MO.theRidges.median}
              , guard-gated custom lots above Bear's Best.
            </li>
            <li>
              <Link href="/divorce-realtor-red-rock-country-club">Red Rock Country Club</Link>
              {' '}
              — median
              {' '}
              {COMMUNITY_12MO.redRockCountryClub.median}
              , two Arnold Palmer courses, club membership transfer.
            </li>
            <li>
              <Link href="/divorce-realtor-macdonald-highlands">MacDonald Highlands, Henderson</Link>
              {' '}
              — median
              {' '}
              {COMMUNITY_12MO.macdonaldHighlands.median}
              , DragonRidge Country Club, hillside custom homes.
            </li>
            <li>
              <Link href="/divorce-realtor-anthem-country-club">Anthem Country Club, Henderson</Link>
              {' '}
              — median
              {' '}
              {COMMUNITY_12MO.anthemCountryClub.median}
              , sales from
              {' '}
              {COMMUNITY_12MO.anthemCountryClub.range}
              .
            </li>
            <li>
              <Link href="/strip-high-rise-condo-divorce">Strip high-rise condos</Link>
              {' '}
              — Waldorf Astoria, Veer, Turnberry Place, Palms Place, One Queensridge Place; HOA dues, warrantability and view pricing.
            </li>
          </ul>
        </div>

        <HighValueHomeNote points={[
          `Loans above ${LUXURY_2026.jumboThreshold2026} are jumbo, so a buyout refinance needs a written pre-approval at the full loan amount before the number enters the settlement.`,
          'Custom homes appraise with wide spreads. Agree on a two-appraisal protocol, a shared information package and a tolerance band before anyone orders a report.',
          'Club memberships at Red Rock CC, DragonRidge, Anthem CC and The Summit Club transfer by club contract, not by deed. Put the membership and its deposit in the decree.',
          'Guard-gated showings run by appointment with verified proof of funds, applied the same way to every buyer. Plan the pricing timeline around slower exposure.',
          `Gain above the Section 121 cap is taxable federally, and Clark County transfer tax runs ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 on a sale but not on a decree transfer between spouses.`,
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the home, the timeline the attorneys are working toward, and whether a buyout or a sale is realistic.' },
            { title: 'Valuation package', detail: 'A broker price opinion with community-level comparables, plus a recommended two-appraisal protocol for the attorneys.' },
            { title: 'Written plan', detail: 'Marketing strategy, private-exposure window, showing rules, membership handling and tax items, in a document both counsel can review.' },
            { title: 'Execution', detail: 'Neutral listing, identical updates to both spouses, and a closing calendar that matches the decree.' },
          ]}
          callPromise="You leave the call with a value range, a realistic timeline, and the next decision to make."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
