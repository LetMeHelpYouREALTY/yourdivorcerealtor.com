import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { DirectAnswer } from '@/components/divorce/DirectAnswer';
import { DivorcePageTemplate } from '@/components/divorce/DivorcePageTemplate';
import { HighValueHomeNote } from '@/components/divorce/HighValueHomeNote';
import { KeyFacts } from '@/components/divorce/KeyFacts';
import { NextSteps } from '@/components/divorce/NextSteps';
import { PageFAQ } from '@/components/divorce/PageFAQ';
import { StructuredData } from '@/components/seo/StructuredData';
import { CONTENT_LAST_UPDATED } from '@/lib/content-dates';
import { LEGAL_DISCLAIMER, LUXURY_2026, LVR_SEPT_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, siteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateLocalBusinessSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type IAlianteProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-aliante';

const pageTitle = 'Aliante Divorce Realtor, North Las Vegas | Dr. Jan Duffy';
const pageDescription = `Aliante divorce realtor for the golf-course villages, gated tracts, Sun City Aliante and the Aliante Parkway townhomes. Valley median ${LVR_SEPT_2026.medianSfrPrice}. Plan a neutral valuation, buyout or sale.`;

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
    question: 'How is an Aliante home valued for a divorce?',
    answer: 'Aliante is a production-home master plan with repeating floor plans, so a broker price opinion built on same-model closings usually settles the number, adjusted for lot, pool and upgrades. Golf-frontage lots along Aliante Golf Club compare only to other frontage lots. Sun City Aliante homes compare only to other homes inside that age-qualified community.',
  },
  {
    question: 'Can one spouse keep an Aliante house?',
    answer: `Often yes. Most Aliante homes price below the ${LUXURY_2026.jumboThreshold2026} conforming limit, so the refinance is standard if the keeping spouse qualifies alone with the decree's support terms counted. The common obstacle is thin equity on a recent purchase. A written pre-approval and a payoff statement answer the question before negotiation starts.`,
  },
  {
    question: 'What is different about selling in Sun City Aliante during a divorce?',
    answer: 'Sun City Aliante is an age-qualified community under its CC&Rs, which limits who can buy and occupy the home. That narrows the buyer pool and the comparable set, and the association has its own resale paperwork. If one spouse keeps the home, confirm with the association that the occupancy rules are still met after the decree.',
  },
  {
    question: 'Do we need both signatures to list our Aliante home?',
    answer: 'Usually yes. If both names are on title, both spouses sign the listing agreement, the purchase contract and the deed. When one spouse will not sign, your attorney can ask the family court for an order authorizing the sale, and escrow follows that order. A signed stipulation between spouses is faster than a contested motion.',
  },
  {
    question: 'How long does an Aliante divorce sale take?',
    answer: `In September 2026, ${LVR_SEPT_2026.soldWithin30DaysPct} of Las Vegas area single-family homes sold within 30 days of listing, and Aliante tract homes priced to same-model closings follow that pattern. The court calendar is slower. If a court order is needed to list or close, file early and write escrow to close only after the order is signed.`,
  },
  {
    question: 'Is a transfer between spouses taxed in Clark County?',
    answer: `${NEVADA_LAW.transferTaxDivorceExemption} A sale to a third party is taxed at ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of price. ${LEGAL_DISCLAIMER}`,
  },
];

export default async function Aliante(props: IAlianteProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const currentPath = '/divorce-realtor-aliante';
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'Aliante' }];
  const serviceSchema = generateServiceSchema(
    'Aliante Divorce Real Estate Services',
    'Neutral divorce real estate representation in Aliante, North Las Vegas: valuation, buyout planning and court-aware home sales across the golf-course villages, gated tracts, Sun City Aliante and the Aliante Parkway townhomes.',
    'Aliante',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const articleSchema = generateArticleSchema(pageTitle, pageDescription, `${siteUrl}${path}`, CONTENT_LAST_UPDATED, CONTENT_LAST_UPDATED);
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[localBusinessSchema, serviceSchema, realEstateAgentSchema, articleSchema, faqSchema]} />
      <DivorcePageTemplate
        h1="Aliante Divorce Realtor"
        heroSubhead="Neutral valuation, buyout planning and court-aware sales across North Las Vegas's golf-course master plan"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How does a divorce home sale work in Aliante?">
          An Aliante home is community property under Nevada law, so both spouses sign the listing and deed, or a family court order replaces the missing signature. The sequence is a neutral valuation from same-model closings, a buyout test against the loan and the keeping spouse's income, then a sale or transfer plan timed to the court calendar and the master and sub-association resale process.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Sold within 30 days of listing', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Single-family homes sold, Sept 2026', value: LVR_SEPT_2026.sfrUnitsSold },
          ]}
          source={LVR_SEPT_2026.source}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>How Aliante's villages change a divorce sale</h2>
          <p>
            Aliante is a master plan in the northwest corner of North Las Vegas, built in the 2000s around the public Aliante Golf Club, Aliante Nature Discovery Park and the Aliante Parkway corridor. Nearly every home is a production build inside a gated or non-gated village under the master association, with one age-qualified community and a townhome product on the edges. The village sets the comparables, the HOA layers and the buyer pool.
          </p>
          <ul>
            <li>
              <strong>Golf-course villages:</strong>
              {' '}
              Tract and semi-custom homes along Aliante Golf Club, many gated without guard staff, where frontage lots carry a premium that must be compared to other frontage lots, not interior lots a street away.
            </li>
            <li>
              <strong>Gated and non-gated interior villages:</strong>
              {' '}
              Repeating builder floor plans with a master association and sub-association, deep same-model sales data, and lots that vary mainly by pool, corner position and garage count.
            </li>
            <li>
              <strong>Sun City Aliante:</strong>
              {' '}
              An age-qualified community under its CC&Rs with its own association, single-story plans and a narrower buyer pool on resale.
            </li>
            <li>
              <strong>Aliante Parkway townhomes and condos:</strong>
              {' '}
              Attached product near the Aliante Casino and Aliante Library with its own association, reserve study and rental questions that affect a buyer's financing.
            </li>
          </ul>

          <h2>What an Aliante house is worth when both spouses need the number</h2>
          <p>
            A divorce valuation must hold up to two attorneys and sometimes a judge. It should rest on closed sales of the same model, adjusted for lot, pool, upgrades and condition, and be written so either spouse can hand it to counsel. List prices and online estimates are not evidence of value.
          </p>
          <p>
            Aliante's uniformity is an advantage. Same-model closings are plentiful, so a broker price opinion usually settles the number without a formal appraisal, and the valley median of
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            {' '}
            is a workable reference for interior villages. The complication is small adjustments. In a market where most homes trade in a narrow band, a pool, a three-car garage or a golf-frontage lot is a meaningful share of equity, so the comparables must be true matches.
          </p>
          <p>
            Two sections need more care. Golf-frontage homes have a thinner comparable set, and Sun City Aliante homes can only be compared to other homes inside that community because the buyer pool is restricted. For either, a formal appraisal with a written reconciliation rule is worth the fee when the spouses disagree.
          </p>

          <h2>Can one spouse keep the Aliante home?</h2>
          <p>
            A buyout works when the keeping spouse can refinance in one name, pay out the other spouse's share of equity, and carry the payment, taxes, insurance and HOA dues after the decree. In Aliante the loan size is rarely the obstacle, because most homes sit below the
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            conforming limit. The usual obstacles are thin equity and single-income qualification.
          </p>
          <ul>
            <li>
              <strong>Recent purchases.</strong>
              {' '}
              A home bought in the last few years may hold little equity after selling costs. A buyout can still work with a small equalizing payment if the number is honest.
            </li>
            <li>
              <strong>VA loans.</strong>
              {' '}
              Nellis Air Force Base is close, and VA financing is common in Aliante. A VA loan cannot simply be assumed by the non-veteran spouse without lender approval, and the veteran's entitlement stays tied to the loan until it is refinanced or released.
            </li>
            <li>
              <strong>Occupancy rules.</strong>
              {' '}
              In Sun City Aliante, the keeping spouse must still meet the association's age-qualified occupancy rules after the decree.
            </li>
            <li>
              <strong>Support obligations.</strong>
              {' '}
              Lenders count child support and spousal support from the decree as income or as debt. Order the pre-approval with the proposed decree terms in hand.
            </li>
          </ul>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            (
            {NEVADA_LAW.communityPropertyCite}
            ). The house is one line in that division, so test the buyout against the whole balance sheet.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Selling an Aliante home while the case is open</h2>
          <p>
            Most Aliante divorce sales close before the decree, under a stipulation or court order that names the agent, the pricing method, who occupies the home and how net proceeds are held at escrow. A neutral agent reports every showing, offer and price discussion to both spouses in writing at the same time.
          </p>
          <p>
            Two calendars run at once. The market calendar is fast for priced-right tract homes;
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of valley single-family homes sold within 30 days in September 2026. The court calendar is slower. A contested motion in Clark County family court waits weeks for a hearing, so file early and write escrow to close only after the order is signed.
          </p>
          <p>
            In a uniform tract market the buyer is comparing your home against the same floor plan a few streets away. Deferred maintenance, a half-emptied house and a tired yard all show in the offer. A short written plan for repairs, staging and showing windows around the occupying spouse keeps the sale on schedule. Gated villages add gate protocol: buyer agents are registered and showings are by appointment.
          </p>

          <h2>HOA, Sun City rules and the North Las Vegas close</h2>
          <p>
            Every Aliante sale needs a resale package and a payoff demand from the master association and the sub-association, and Sun City Aliante adds its own age-qualification paperwork for the buyer. Order all of it the week the listing goes live so transfer fees, back dues and any special assessment are known when offers are negotiated. Those costs come out of proceeds before the split, and the settlement should say who bears them.
          </p>
          <p>
            The City of North Las Vegas is the permitting authority, so permit searches for patio covers, casitas and pool work run through the city. A buyer's appraiser and inspector will flag unpermitted work, and the settlement should decide in advance who pays to permit or remove it, or whether the price absorbs it. With the HOA packages, permit file and proceeds instructions handled early, the house is usually the least contested asset in an Aliante divorce.
          </p>
        </div>

        <HighValueHomeNote
          points={[
            `A buyout refinance above ${LUXURY_2026.jumboThreshold2026} is a jumbo loan with tighter reserve and income rules. Only a small share of Aliante homes reach that line, mostly golf-frontage and larger semi-custom lots, so confirm the loan type before negotiating equity.`,
            'Golf-frontage homes have a thin comparable set. Two independent appraisals with a written reconciliation rule protect both spouses from a single outlier report.',
            `Gains above the Section 121 exclusion are taxable. ${NEVADA_LAW.capitalGainsExclusion} ${LEGAL_DISCLAIMER}`,
            `Clark County transfer tax on a third-party sale is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of price. A decree-based transfer between spouses is exempt, so the method of division changes the closing costs.`,
            'Gated villages register buyer agents at the gate. Showings there are by appointment, which protects the occupying spouse and favors pre-qualified buyers.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the village, the loan type, who is living in the home, and where the case stands.' },
            { title: 'Neutral valuation', detail: 'A written value built on same-model closings, delivered to both spouses and both attorneys at the same time.' },
            { title: 'Buyout or sale test', detail: 'A side-by-side of what each spouse nets under a buyout versus a sale, including HOA, permit and tax items.' },
            { title: 'Court-aligned plan', detail: 'A listing or transfer timeline matched to your stipulation or order, with escrow instructions drafted to it.' },
          ]}
          callPromise="You leave the call with a value range, a buyout verdict, and the next decision."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
