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

type IEnterpriseProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-enterprise';

const pageTitle = 'Enterprise NV Divorce Real Estate Agent | Dr. Jan Duffy';
const pageDescription = `Enterprise, Nevada divorce real estate agent for Southern Highlands, Mountains Edge and Rhodes Ranch. Valley median ${LVR_SEPT_2026.medianSfrPrice}. Plan a valuation or buyout.`;

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
    question: 'Where is Enterprise, and why does it matter for a divorce sale?',
    answer: 'Enterprise is the unincorporated Clark County township in the southwest valley, south of the 215 and west of Interstate 15. It contains Southern Highlands, Mountains Edge, Rhodes Ranch and Silverado Ranch. Clark County, not the City of Las Vegas, handles permits and records, and nearly every home sits under a master-planned HOA, which shapes the resale process.',
  },
  {
    question: 'How is an Enterprise home valued for a divorce?',
    answer: 'Most Enterprise homes are production builds from the 2000s onward with repeating floor plans, so a broker price opinion built on same-model closings usually settles the number. Custom and golf-frontage homes in Southern Highlands and Rhodes Ranch need a formal appraisal, often two, because view and lot drive price more than square footage.',
  },
  {
    question: 'Can one spouse keep an Enterprise house?',
    answer: `Often yes. Most Enterprise tract homes price below the ${LUXURY_2026.jumboThreshold2026} conforming limit, so the refinance is standard if the keeping spouse qualifies alone. The common obstacle is thin equity on a recent purchase. Southern Highlands Golf Club and custom homes are jumbo territory and need a written pre-approval before equity is negotiated.`,
  },
  {
    question: 'How do showings work inside Southern Highlands or Rhodes Ranch during a divorce?',
    answer: 'Both are gated, and the Southern Highlands Golf Club estate section is guard-gated. Buyer agents register at the gate, showings are by appointment, and some sections limit open houses. The listing agent clears each appointment with the occupying spouse and reports feedback and offers to both spouses in writing at the same time.',
  },
  {
    question: 'How long does an Enterprise divorce sale take?',
    answer: `In September 2026, ${LVR_SEPT_2026.soldWithin30DaysPct} of Las Vegas area single-family homes sold within 30 days of listing. Enterprise tract homes priced to same-model closings follow that pattern. The court calendar is slower. If a court order is needed to list or close, file early and write escrow to close only after the order is signed.`,
  },
  {
    question: 'Is a transfer between spouses taxed in Clark County?',
    answer: `${NEVADA_LAW.transferTaxDivorceExemption} A sale to a third party is taxed at ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of price. ${LEGAL_DISCLAIMER}`,
  },
];

export default async function Enterprise(props: IEnterpriseProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const currentPath = '/divorce-realtor-enterprise';
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'Enterprise' }];
  const serviceSchema = generateServiceSchema(
    'Enterprise Divorce Real Estate Services',
    'Neutral divorce real estate representation in Enterprise, Nevada: valuation, buyout planning and court-aware home sales across Southern Highlands, Mountains Edge, Rhodes Ranch and Silverado Ranch.',
    'Enterprise',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const articleSchema = generateArticleSchema(pageTitle, pageDescription, `${siteUrl}${path}`, CONTENT_LAST_UPDATED, CONTENT_LAST_UPDATED);
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[localBusinessSchema, serviceSchema, realEstateAgentSchema, articleSchema, faqSchema]} />
      <DivorcePageTemplate
        h1="Enterprise Divorce Real Estate Agent"
        heroSubhead="Neutral valuation, buyout planning and court-aware sales across the southwest valley's master plans"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How does a divorce home sale work in Enterprise, Nevada?">
          An Enterprise home is community property under Nevada law, so both spouses sign the listing and deed, or a family court order replaces the missing signature. The sequence is a neutral valuation from same-model closings, a buyout test against the loan and the keeping spouse's income, then a sale or transfer plan timed to the court calendar and the master-plan HOA resale process.
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
          <h2>How Enterprise's master plans change a divorce sale</h2>
          <p>
            Enterprise is the unincorporated township that covers most of the southwest valley, from the 215 beltway south along Blue Diamond Road, St. Rose Parkway and Interstate 15. Almost all of its housing was built from the late 1990s onward inside master plans, so a divorce sale here is shaped by HOA structure, gate type and how recently the home was bought. The master plan sets the comparables and the resale steps.
          </p>
          <ul>
            <li>
              <strong>Southern Highlands:</strong>
              {' '}
              A master plan around the private Southern Highlands Golf Club, with a guard-gated estate section of custom homes, gated tract villages, and townhome product. The golf club membership is a separate asset.
            </li>
            <li>
              <strong>Mountains Edge:</strong>
              {' '}
              A large master plan along Blue Diamond Road near Exploration Peak Park, almost entirely production homes in gated and non-gated villages, with a master association and sub-associations.
            </li>
            <li>
              <strong>Rhodes Ranch:</strong>
              {' '}
              A gated golf community near Durango and Warm Springs with production homes on and off the course, where frontage lots compare separately from interior lots.
            </li>
            <li>
              <strong>Silverado Ranch:</strong>
              {' '}
              The eastern side of Enterprise near Interstate 15 and the Las Vegas Boulevard South corridor, with 1990s and 2000s tract villages, condos and townhomes.
            </li>
            <li>
              <strong>The Blue Diamond and St. Rose corridors:</strong>
              {' '}
              Newer builder villages still adding phases, where recent purchase prices and builder incentives anchor value.
            </li>
          </ul>

          <h2>What an Enterprise house is worth when both spouses need the number</h2>
          <p>
            A divorce valuation must hold up to two attorneys and sometimes a judge. It should rest on closed sales of the same model, adjusted for lot, pool, upgrades and condition, and be written so either spouse can hand it to counsel. List prices, builder base prices and online estimates are not evidence of value.
          </p>
          <p>
            Enterprise is a production-home market, which cuts both ways. Same-model closings are plentiful, so a broker price opinion usually settles the number without a formal appraisal. But builders in Mountains Edge and along St. Rose are still selling new phases, and a new home with incentives a mile away is the resale's real competition. The valuation has to account for that.
          </p>
          <p>
            The exceptions are the Southern Highlands Golf Club estates and Rhodes Ranch frontage, where the comparable set is thin and view, lot size and finish drive the spread. Those homes need a formal appraisal, often two, with a written reconciliation rule agreed before anyone orders a report.
          </p>

          <h2>Can one spouse keep the Enterprise home?</h2>
          <p>
            A buyout works when the keeping spouse can refinance in one name, pay out the other spouse's share of equity, and carry the payment, taxes, insurance and HOA dues after the decree. For most Enterprise tract homes the loan stays below the
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            conforming limit, and the question is single-income qualification and equity.
          </p>
          <ul>
            <li>
              <strong>Recent purchases.</strong>
              {' '}
              A home bought in the last few years in Mountains Edge or along St. Rose may hold little equity after selling costs. A buyout can still work with a small equalizing payment, but the number must be honest.
            </li>
            <li>
              <strong>Layered HOA dues.</strong>
              {' '}
              Master association plus sub-association dues, and golf club fees in Southern Highlands or Rhodes Ranch, all count against the keeping spouse's ratios.
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

          <h2>Selling an Enterprise home while the case is open</h2>
          <p>
            Most Enterprise divorce sales close before the decree, under a stipulation or court order that names the agent, the pricing method, who occupies the home and how net proceeds are held at escrow. A neutral agent reports every showing, offer and price discussion to both spouses in writing at the same time.
          </p>
          <p>
            Two calendars run at once. The market calendar is fast for priced-right tract homes;
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of valley single-family homes sold within 30 days in September 2026. The court calendar is slower. A contested motion in Clark County family court waits weeks for a hearing, so file early and write escrow to close only after the order is signed.
          </p>
          <p>
            In a production market the buyer is comparing your home against the same floor plan a few streets away and against a new build with incentives. Deferred maintenance, a half-emptied house and a tired yard all show in the offer. A short written plan for repairs, staging and showing windows around the occupying spouse keeps the sale on schedule. Gated villages add gate protocol: buyer agents register, and showings are by appointment.
          </p>

          <h2>HOA, gates and the Clark County close</h2>
          <p>
            Every Enterprise master plan runs through a master association and sub-associations, and each one must deliver a resale package and a payoff demand before closing. Order them the week the listing goes live so transfer fees, back dues and any special assessment are known when offers are negotiated. The settlement should say who bears those costs, because they come out of proceeds before the split.
          </p>
          <p>
            Southern Highlands and Rhodes Ranch add golf club paperwork. A membership is a separate contract with its own transfer and resignation terms, and the buyer may or may not be able to assume it. Clark County is the permitting authority, so permit searches for patio covers, casitas and pool work run through the county. With the HOA packages, club terms and proceeds instructions handled early, the house is usually the least contested asset in an Enterprise divorce.
          </p>
        </div>

        <HighValueHomeNote
          points={[
            `A buyout refinance above ${LUXURY_2026.jumboThreshold2026} is a jumbo loan with tighter reserve and income rules. In Enterprise that applies to the Southern Highlands Golf Club estates, Rhodes Ranch frontage and the largest custom lots.`,
            'Custom and golf-frontage homes draw appraisals that can differ widely. Write a two-appraisal protocol and a reconciliation rule into the settlement before either spouse orders a report.',
            'Southern Highlands Golf Club and Rhodes Ranch memberships are separate assets with their own deposit, resignation and transfer terms. Name them in the settlement.',
            `Gains above the Section 121 exclusion are taxable. ${NEVADA_LAW.capitalGainsExclusion} ${LEGAL_DISCLAIMER}`,
            `Clark County transfer tax on a third-party sale is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of price. Guard-gated showings are by appointment only, which protects the occupying spouse and suits private, off-market exposure during a contested case.`,
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the master plan, the loan and purchase date, who is living in the home, and where the case stands.' },
            { title: 'Neutral valuation', detail: 'A written value built on same-model closings and current builder competition, delivered to both spouses and both attorneys at the same time.' },
            { title: 'Buyout or sale test', detail: 'A side-by-side of what each spouse nets under a buyout versus a sale, including HOA, club and tax items.' },
            { title: 'Court-aligned plan', detail: 'A listing or transfer timeline matched to your stipulation or order, with escrow instructions drafted to it.' },
          ]}
          callPromise="You leave the call with a value range, a buyout verdict, and the next decision."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
