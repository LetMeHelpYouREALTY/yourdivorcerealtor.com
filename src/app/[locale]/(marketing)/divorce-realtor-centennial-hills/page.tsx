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

type ICentennialHillsProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-centennial-hills';

const pageTitle = 'Centennial Hills Divorce Real Estate Agent | Dr. Jan Duffy';
const pageDescription = `Centennial Hills divorce real estate agent for Providence, Skye Canyon and Lone Mountain. Valley median ${LVR_SEPT_2026.medianSfrPrice}. Plan a neutral valuation, buyout or sale.`;

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
    question: 'How is a Centennial Hills home valued for a divorce?',
    answer: 'For the tract villages in Providence, Skye Canyon and along Elkhorn Road, a broker price opinion built on same-model closings usually settles the number, adjusted for lot, pool and upgrades. Custom and semi-custom homes on the larger Lone Mountain lots need a formal appraisal, often two, because lot size, horse zoning and mountain views move value more than square footage.',
  },
  {
    question: 'Can one spouse keep a Centennial Hills house?',
    answer: `Often yes. Most Centennial Hills tract homes price below the ${LUXURY_2026.jumboThreshold2026} conforming limit, so the refinance is standard if the keeping spouse qualifies alone with the decree's support terms counted. Lone Mountain custom homes are frequently jumbo. A written pre-approval and a payoff statement answer the question before negotiation starts.`,
  },
  {
    question: 'What is different about a Lone Mountain home on a half-acre lot?',
    answer: 'Many Lone Mountain streets sit in Rural Neighborhood Preservation zoning with larger lots, horse privileges and no HOA. Comparables are thin and vary by lot size, outbuildings and view, so two appraisals with a reconciliation rule are worth the cost. Unpermitted casitas, barns and RV garages are common and must be sorted before listing.',
  },
  {
    question: 'Do we need both signatures to list our Centennial Hills home?',
    answer: 'Usually yes. If both names are on title, both spouses sign the listing agreement, the purchase contract and the deed. When one spouse will not sign, your attorney can ask the family court for an order authorizing the sale, and escrow follows that order. A signed stipulation between spouses is faster than a contested motion.',
  },
  {
    question: 'How long does a Centennial Hills divorce sale take?',
    answer: `In September 2026, ${LVR_SEPT_2026.soldWithin30DaysPct} of Las Vegas area single-family homes sold within 30 days of listing, and Centennial Hills tract homes priced to same-model closings follow that pattern. New builder phases in Skye Canyon are the resale's competition. The court calendar is slower, so file early if an order is needed.`,
  },
  {
    question: 'Is a transfer between spouses taxed in Clark County?',
    answer: `${NEVADA_LAW.transferTaxDivorceExemption} A sale to a third party is taxed at ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of price. ${LEGAL_DISCLAIMER}`,
  },
];

export default async function CentennialHills(props: ICentennialHillsProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const currentPath = '/divorce-realtor-centennial-hills';
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'Centennial Hills' }];
  const serviceSchema = generateServiceSchema(
    'Centennial Hills Divorce Real Estate Services',
    'Neutral divorce real estate representation in Centennial Hills, Las Vegas: valuation, buyout planning and court-aware home sales across Providence, Skye Canyon, Lone Mountain and the Elkhorn corridor.',
    'Centennial Hills',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const articleSchema = generateArticleSchema(pageTitle, pageDescription, `${siteUrl}${path}`, CONTENT_LAST_UPDATED, CONTENT_LAST_UPDATED);
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[localBusinessSchema, serviceSchema, realEstateAgentSchema, articleSchema, faqSchema]} />
      <DivorcePageTemplate
        h1="Centennial Hills Divorce Real Estate Agent"
        heroSubhead="Neutral valuation, buyout planning and court-aware sales across the northwest valley"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How does a divorce home sale work in Centennial Hills?">
          A Centennial Hills home is community property under Nevada law, so both spouses sign the listing and deed, or a family court order replaces the missing signature. The sequence is a neutral valuation from same-model or same-lot-size closings, a buyout test against the loan and the keeping spouse's income, then a sale or transfer plan timed to the court calendar and the HOA or permit file.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Sold within 30 days of listing', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Available single-family listings', value: LVR_SEPT_2026.availableSfrListings },
          ]}
          source={LVR_SEPT_2026.source}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>How Centennial Hills' sections change a divorce sale</h2>
          <p>
            Centennial Hills is the northwest corner of the City of Las Vegas, roughly between US-95, the 215 beltway and the Kyle Canyon foothills, anchored by Centennial Hills Hospital and Floyd Lamb Park at Tule Springs. It mixes recent master-planned tract villages with some of the valley's largest residential lots, and the two trade on different rules. The section sets the comparables, the HOA and the permit file.
          </p>
          <ul>
            <li>
              <strong>Providence:</strong>
              {' '}
              A master plan near Centennial Hills Hospital with gated and non-gated tract villages, a master association and sub-associations, and deep same-model sales data.
            </li>
            <li>
              <strong>Skye Canyon:</strong>
              {' '}
              The newest master plan toward Kyle Canyon, still adding builder phases, where recent purchase prices and builder incentives anchor resale value and warranties may still be in force.
            </li>
            <li>
              <strong>Lone Mountain:</strong>
              {' '}
              Custom and semi-custom homes on larger lots around the peak, many in Rural Neighborhood Preservation zoning with horse privileges and no HOA. Lot size, outbuildings and view drive price.
            </li>
            <li>
              <strong>Iron Mountain Ranch and the Elkhorn and Ann Road corridors:</strong>
              {' '}
              1990s and 2000s tract villages, many gated without guard staff, with repeating floor plans and lighter HOA structures.
            </li>
            <li>
              <strong>Painted Desert, Los Prados and Silverstone Ranch:</strong>
              {' '}
              Golf-oriented communities from earlier decades, where course status and frontage history must be checked before comparables are chosen.
            </li>
          </ul>

          <h2>What a Centennial Hills house is worth when both spouses need the number</h2>
          <p>
            A divorce valuation must hold up to two attorneys and sometimes a judge. It should rest on closed sales of the same model or the same lot class, adjusted for pool, upgrades, outbuildings, view and condition, and be written so either spouse can hand it to counsel. List prices, builder base prices and online estimates are not evidence of value.
          </p>
          <p>
            Centennial Hills splits into two valuation problems. In Providence, Skye Canyon and the Elkhorn villages, same-model closings are plentiful and a broker price opinion usually settles the number, with the caveat that a new build with incentives a mile away is the resale's real competition. In Lone Mountain, the comparable set is thin and a half-acre lot with a casita, an RV garage and a mountain view has few true matches.
          </p>
          <p>
            For those larger-lot homes, plan on a formal appraisal, often two, with a written reconciliation rule agreed before anyone orders a report. The valley median of
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            {' '}
            is a reference point for tract product and almost meaningless for a Lone Mountain custom.
          </p>

          <h2>Can one spouse keep the Centennial Hills home?</h2>
          <p>
            A buyout works when the keeping spouse can refinance in one name, pay out the other spouse's share of equity, and carry the payment, taxes, insurance and any HOA dues after the decree. For most tract homes the loan stays below the
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            conforming limit, and the question is single-income qualification. Lone Mountain customs are often jumbo.
          </p>
          <ul>
            <li>
              <strong>Recent purchases.</strong>
              {' '}
              A home bought in the last few years in Skye Canyon may hold little equity after selling costs. A buyout can still work with a small equalizing payment if the number is honest.
            </li>
            <li>
              <strong>Larger lots and outbuildings.</strong>
              {' '}
              A lender's appraiser may give little value to unpermitted structures, which lowers the refinance amount even when the market would pay for them. Sort permits before the buyout test.
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

          <h2>Selling a Centennial Hills home while the case is open</h2>
          <p>
            Most Centennial Hills divorce sales close before the decree, under a stipulation or court order that names the agent, the pricing method, who occupies the home and how net proceeds are held at escrow. A neutral agent reports every showing, offer and price discussion to both spouses in writing at the same time.
          </p>
          <p>
            Two calendars run at once. The market calendar is fast for priced-right tract homes;
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of valley single-family homes sold within 30 days in September 2026, with
            {' '}
            {LVR_SEPT_2026.availableSfrListings}
            {' '}
            competing listings available. Larger-lot customs draw a smaller buyer pool and need a longer window. The court calendar is slower. A contested motion in Clark County family court waits weeks for a hearing, so file early and write escrow to close only after the order is signed.
          </p>
          <p>
            Preparation differs by section. A tract home competes against the same floor plan a few streets away and against a new build, so condition and presentation show in the offer. A Lone Mountain property competes on land, so fencing, grading, well or septic status where applicable, and the permit file for every structure matter more than paint.
          </p>

          <h2>HOA, permits and the City of Las Vegas close</h2>
          <p>
            Providence, Skye Canyon and the Elkhorn villages run through associations that must deliver a resale package and a payoff demand before closing. Order them the week the listing goes live so transfer fees, back dues and any special assessment are known when offers are negotiated. The settlement should say who bears those costs, because they come out of proceeds before the split.
          </p>
          <p>
            Lone Mountain and the other non-HOA streets replace that step with a permit review. Centennial Hills is inside the City of Las Vegas, so permit searches for casitas, barns, RV garages and pool work run through the city, not the county. A buyer's appraiser and inspector will flag unpermitted work, and the settlement should decide in advance who pays to permit or remove it, or whether the price absorbs it. With the HOA packages, permit file and proceeds instructions handled early, the house is usually the least contested asset in a Centennial Hills divorce.
          </p>
        </div>

        <HighValueHomeNote
          points={[
            `A buyout refinance above ${LUXURY_2026.jumboThreshold2026} is a jumbo loan with tighter reserve and income rules. In Centennial Hills that applies mainly to Lone Mountain customs and the largest Providence and Skye Canyon lots.`,
            'Larger-lot and custom homes draw appraisals that can differ widely, especially where outbuildings and horse zoning are involved. Write a two-appraisal protocol and a reconciliation rule into the settlement.',
            `Gains above the Section 121 exclusion are taxable. ${NEVADA_LAW.capitalGainsExclusion} ${LEGAL_DISCLAIMER}`,
            `Clark County transfer tax on a third-party sale is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of price. A decree-based transfer between spouses is exempt, so the method of division changes the closing costs.`,
            'Gated villages register buyer agents at the gate, and larger-lot customs suit private, by-appointment exposure. Both protect the occupying spouse during a contested case.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the section, the lot and permit history, the loan, who is living in the home, and where the case stands.' },
            { title: 'Neutral valuation', detail: 'A written value built on same-model or same-lot-class closings, delivered to both spouses and both attorneys at the same time.' },
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
