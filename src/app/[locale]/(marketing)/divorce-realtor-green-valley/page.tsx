import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
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
import { CONTENT_LAST_UPDATED } from '@/lib/content-dates';
import { COMMUNITY_12MO, LEGAL_DISCLAIMER, LUXURY_2026, LVR_SEPT_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, siteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateLocalBusinessSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type IGreenValleyProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-green-valley';

const pageTitle = 'Green Valley Divorce Realtor, Henderson | Dr. Jan Duffy';
const pageDescription = `Green Valley divorce realtor for Green Valley Ranch, The Fountains and the Parkway townhomes. Valley median ${LVR_SEPT_2026.medianSfrPrice}. Plan a neutral valuation, buyout or sale.`;

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
    question: 'How is a Green Valley home valued for a divorce?',
    answer: 'Green Valley has decades of closed sales on repeating floor plans, so a broker price opinion built on same-model and same-street closings usually settles the number. Adjustments cover pool, lot, remodel level and the age of the roof and HVAC. Custom homes in The Fountains and the gated Green Valley Ranch sections need a formal appraisal.',
  },
  {
    question: 'Can one spouse keep a Green Valley house?',
    answer: `Often yes. Many Green Valley homes price below the ${LUXURY_2026.jumboThreshold2026} conforming limit, and long-held homes carry real equity. The keeping spouse must qualify alone, with support from the decree counted, and must pay out the other spouse's share. A written pre-approval and a payoff statement answer the question before negotiation starts.`,
  },
  {
    question: 'What if the Green Valley home was bought before the marriage?',
    answer: 'A home owned before marriage may be separate property, but community funds used for the mortgage, remodels or a refinance can create a community interest. That tracing is an attorney and forensic question. The agent\'s job is a defensible current value and a clear history of what was done to the home. Confirm the characterization with your family law attorney.',
  },
  {
    question: 'How do showings work if one spouse still lives in the home?',
    answer: 'The listing plan sets showing windows the occupying spouse agrees to, with notice before every appointment. Gated sections of Green Valley Ranch and The Fountains register buyer agents at the gate. Feedback and offers go to both spouses in writing at the same time, so neither side learns anything first.',
  },
  {
    question: 'How long does a Green Valley divorce sale take?',
    answer: `In September 2026, ${LVR_SEPT_2026.soldWithin30DaysPct} of Las Vegas area single-family homes sold within 30 days of listing, and Green Valley tract homes priced to same-model closings follow that pattern. The court calendar is slower. If a court order is needed to list or close, file early and write escrow to close only after the order is signed.`,
  },
  {
    question: 'Is a transfer between spouses taxed in Henderson?',
    answer: `${NEVADA_LAW.transferTaxDivorceExemption} A sale to a third party is taxed at ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of price. ${LEGAL_DISCLAIMER}`,
  },
];

export default async function GreenValley(props: IGreenValleyProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const currentPath = '/divorce-realtor-green-valley';
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'Green Valley' }];
  const serviceSchema = generateServiceSchema(
    'Green Valley Divorce Real Estate Services',
    'Neutral divorce real estate representation in Green Valley, Henderson: valuation, buyout planning and court-aware home sales across Green Valley Ranch, Green Valley South, The Fountains and the Green Valley Parkway corridor.',
    'Green Valley',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const articleSchema = generateArticleSchema(pageTitle, pageDescription, `${siteUrl}${path}`, CONTENT_LAST_UPDATED, CONTENT_LAST_UPDATED);
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[localBusinessSchema, serviceSchema, realEstateAgentSchema, articleSchema, faqSchema]} />
      <DivorcePageTemplate
        h1="Green Valley Divorce Realtor"
        heroSubhead="Neutral valuation, buyout planning and court-aware sales across Henderson's original master plan"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How does a divorce home sale work in Green Valley, Henderson?">
          A Green Valley home is community property under Nevada law, so both spouses sign the listing and deed, or a family court order replaces the missing signature. The sequence is a neutral valuation from same-model closings, a buyout test against the loan and the keeping spouse's income, then a sale or transfer plan timed to the court calendar and the HOA resale process.
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
          <h2>How Green Valley's sections change a divorce sale</h2>
          <p>
            Green Valley is Henderson's original master plan, built out from the late 1970s through the 2000s on both sides of Green Valley Parkway. Its housing is mostly tract, with townhome and condo product along the Parkway and near The District at Green Valley Ranch, and a few gated custom pockets. The section decides the comparables, the HOA layers and whether a gate is involved.
          </p>
          <p>
            The main sections and what each means for a divorcing owner:
          </p>
          <ul>
            <li>
              <strong>Green Valley Ranch:</strong>
              {' '}
              The later phase around The District and Green Valley Ranch Resort, with gated and non-gated tract villages, a master association and sub-associations. Same-model closings are plentiful.
            </li>
            <li>
              <strong>Green Valley South and the original Green Valley villages:</strong>
              {' '}
              1980s and 1990s tract homes on larger lots than newer Henderson product, often with pools and single-story plans. Remodel level drives the spread between comparables.
            </li>
            <li>
              <strong>The Fountains and the gated custom sections:</strong>
              {' '}
              Guard-gated custom and semi-custom homes where lot size and finish quality, not square footage, set price. Formal appraisal territory.
            </li>
            <li>
              <strong>Legacy Golf Club frontage:</strong>
              {' '}
              Homes along the public Legacy course carry a frontage premium that must be compared to other frontage lots, not interior lots a street away.
            </li>
            <li>
              <strong>Green Valley Parkway townhomes and condos:</strong>
              {' '}
              Attached product with its own HOA, reserve study and rental cap questions that affect a buyer's financing.
            </li>
          </ul>

          <h2>What a Green Valley house is worth when both spouses need the number</h2>
          <p>
            A divorce valuation has to hold up to two attorneys and sometimes a judge. It should rest on closed sales of the same model or the same street, adjusted for pool, lot, remodel level and the age of the roof, HVAC and windows, and be written so either spouse can hand it to counsel. List prices and online estimates are not evidence of value.
          </p>
          <p>
            Green Valley's advantage is depth of data. Decades of resales on repeating floor plans mean a broker price opinion usually settles the number without a formal appraisal. The complication is condition. Two identical 1990s floor plans can be far apart in value when one has a new roof, updated kitchen and resurfaced pool and the other has none of those. The comparables must match condition, not just plan.
          </p>
          <p>
            Henderson's $1 million-plus tier recorded a median of
            {' '}
            {COMMUNITY_12MO.henderson1MPlus.median}
            {' '}
            in the third quarter of 2026, and Green Valley's share of that tier sits in The Fountains and the larger gated Green Valley Ranch lots. For those homes, plan on a formal appraisal and a written reconciliation rule.
          </p>

          <h2>Can one spouse keep the Green Valley home?</h2>
          <p>
            A buyout works when the keeping spouse can refinance in one name, pay out the other spouse's share of equity, and carry the payment, taxes, insurance and HOA dues after the decree. Green Valley is friendlier to buyouts than newer Henderson villages for two reasons. Many homes price below the
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            conforming limit, and long-held homes carry real equity.
          </p>
          <ul>
            <li>
              <strong>Large equity, large payout.</strong>
              {' '}
              A home bought decades ago may hold more equity than the keeping spouse can finance. A note secured by the house, or an offset against retirement assets, often bridges the gap.
            </li>
            <li>
              <strong>Separate-property claims.</strong>
              {' '}
              Homes bought before the marriage or with inherited funds raise tracing questions that the attorneys and a forensic accountant resolve. The valuation and the remodel history feed that analysis.
            </li>
            <li>
              <strong>Support obligations.</strong>
              {' '}
              Lenders count support from the decree as income or as debt. Order the pre-approval with the proposed decree terms in hand.
            </li>
          </ul>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            (
            {NEVADA_LAW.communityPropertyCite}
            ). The house is one line in that division, so a buyout that looks even on the home alone may not be even once the full balance sheet is counted.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Selling a Green Valley home while the case is open</h2>
          <p>
            Most Green Valley divorce sales close before the decree, under a stipulation or court order that names the agent, the pricing method, who occupies the home and how net proceeds are held at escrow. A neutral agent reports every showing, offer and price discussion to both spouses in writing at the same time.
          </p>
          <p>
            Two calendars run at once. The market calendar is fast for priced-right tract homes;
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of valley single-family homes sold within 30 days in September 2026. The court calendar is slower. A contested motion in Clark County family court waits weeks for a hearing, so file early and write escrow to close only after the order is signed.
          </p>
          <p>
            Older homes need more preparation. A buyer's inspector in Green Valley will look at the roof, the original HVAC, the pool equipment, polybutylene plumbing in some 1980s and early 1990s homes, and any unpermitted patio enclosure or garage conversion. The settlement should decide in advance who pays for repairs and whether the price absorbs the rest.
          </p>

          <h2>HOA, gates and the Henderson close</h2>
          <p>
            Green Valley Ranch runs through a master association and sub-associations, and the gated sections and The Fountains add gate access rules and in some cases guard staffing. Each association must deliver a resale package and a payoff demand before closing, so order them the week the listing goes live. Transfer fees, back dues and any special assessment come out of proceeds before the split, and the settlement should say who bears them.
          </p>
          <p>
            Some original Green Valley streets sit under a lighter HOA or none at all, which removes the resale package step but places more weight on permits and condition. With the HOA packages, repair decisions and proceeds instructions handled early, the house is usually the least contested asset in a Green Valley divorce.
          </p>
        </div>

        <HighValueHomeNote
          points={[
            `A buyout refinance above ${LUXURY_2026.jumboThreshold2026} is a jumbo loan with tighter reserve and income rules. In Green Valley that applies mostly to The Fountains, the larger gated Green Valley Ranch lots and Legacy frontage homes.`,
            'Custom and remodeled homes draw appraisals that can differ widely. Write a two-appraisal protocol and a reconciliation rule into the settlement before either spouse orders a report.',
            `Long-held Green Valley homes can carry gains above the Section 121 exclusion. ${NEVADA_LAW.capitalGainsExclusion} ${LEGAL_DISCLAIMER}`,
            `Clark County transfer tax on a third-party sale is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of price. A decree-based transfer between spouses is exempt, so the method of division changes the closing costs.`,
            'Guard-gated sections register buyer agents at the gate and may bar open houses. Showings are by appointment, which protects the occupying spouse and favors pre-qualified buyers.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the section, the loan and purchase history, who is living in the home, and where the case stands.' },
            { title: 'Neutral valuation', detail: 'A written value built on same-model and same-condition closings, delivered to both spouses and both attorneys at the same time.' },
            { title: 'Buyout or sale test', detail: 'A side-by-side of what each spouse nets under a buyout versus a sale, including HOA, repair and tax items.' },
            { title: 'Court-aligned plan', detail: 'A listing or transfer timeline matched to your stipulation or order, with escrow instructions drafted to it.' },
          ]}
          callPromise="You leave the call with a value range, a buyout verdict, and the next decision."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
      <RealScoutHomeValue />
      <RealScoutCondoListings />
      <RealScoutFamilyHomes />
    </>
  );
}
