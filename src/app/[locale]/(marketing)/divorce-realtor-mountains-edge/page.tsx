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

type IMountainsEdgeProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-mountains-edge';

const pageTitle = 'Mountains Edge Divorce Real Estate Agent | Dr. Jan Duffy';
const pageDescription = `Mountains Edge divorce real estate agent for the gated and open builder villages on Blue Diamond Road. Valley median ${LVR_SEPT_2026.medianSfrPrice}. Plan a valuation, buyout or sale.`;

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
    question: 'How is a Mountains Edge home valued for a divorce?',
    answer: 'Mountains Edge is almost entirely production homes with repeating floor plans, so a broker price opinion built on same-model closings usually settles the number, adjusted for lot, pool, upgrades and whether the village is gated. Homes backing Exploration Peak Park or with mountain views compare separately. New builder phases nearby are the resale\'s real competition.',
  },
  {
    question: 'Can one spouse keep a Mountains Edge house?',
    answer: `Often yes. Most Mountains Edge homes price below the ${LUXURY_2026.jumboThreshold2026} conforming limit, so the refinance is standard if the keeping spouse qualifies alone with the decree's support terms counted. The common obstacle is thin equity on a recent purchase. A written pre-approval and a payoff statement answer the question before negotiation starts.`,
  },
  {
    question: 'We bought in Mountains Edge recently and have little equity. What are the options?',
    answer: 'With thin equity, a sale may net little after costs and a buyout may need only a small equalizing payment. A third path is a deferred sale, where one spouse occupies the home for a set period under the decree and the sale happens later. Each option has tax and support consequences, so run the numbers with your attorney before choosing.',
  },
  {
    question: 'Do we need both signatures to list our Mountains Edge home?',
    answer: 'Usually yes. If both names are on title, both spouses sign the listing agreement, the purchase contract and the deed. When one spouse will not sign, your attorney can ask the family court for an order authorizing the sale, and escrow follows that order. A signed stipulation between spouses is faster than a contested motion.',
  },
  {
    question: 'How long does a Mountains Edge divorce sale take?',
    answer: `In September 2026, ${LVR_SEPT_2026.soldWithin30DaysPct} of Las Vegas area single-family homes sold within 30 days of listing, and Mountains Edge homes priced to same-model closings follow that pattern. The court calendar is slower. If a court order is needed to list or close, file early and write escrow to close only after the order is signed.`,
  },
  {
    question: 'Is a transfer between spouses taxed in Clark County?',
    answer: `${NEVADA_LAW.transferTaxDivorceExemption} A sale to a third party is taxed at ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of price. ${LEGAL_DISCLAIMER}`,
  },
];

export default async function MountainsEdge(props: IMountainsEdgeProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const currentPath = '/divorce-realtor-mountains-edge';
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'Mountains Edge' }];
  const serviceSchema = generateServiceSchema(
    'Mountains Edge Divorce Real Estate Services',
    'Neutral divorce real estate representation in Mountains Edge, Las Vegas: valuation, buyout planning and court-aware home sales across the gated and non-gated builder villages of the southwest valley master plan.',
    'Mountains Edge',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const articleSchema = generateArticleSchema(pageTitle, pageDescription, `${siteUrl}${path}`, CONTENT_LAST_UPDATED, CONTENT_LAST_UPDATED);
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[localBusinessSchema, serviceSchema, realEstateAgentSchema, articleSchema, faqSchema]} />
      <DivorcePageTemplate
        h1="Mountains Edge Divorce Real Estate Agent"
        heroSubhead="Neutral valuation, buyout planning and court-aware sales across the southwest valley's largest builder master plan"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How does a divorce home sale work in Mountains Edge?">
          A Mountains Edge home is community property under Nevada law, so both spouses sign the listing and deed, or a family court order replaces the missing signature. The sequence is a neutral valuation from same-model closings, a buyout test against the loan and the keeping spouse's income, then a sale or transfer plan timed to the court calendar and the master and sub-association resale process.
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
          <h2>How Mountains Edge's villages change a divorce sale</h2>
          <p>
            Mountains Edge is a master plan in the Enterprise township along Blue Diamond Road, between Rainbow Boulevard and the foothills, built from the mid-2000s onward around Exploration Peak Park, Mountain's Edge Regional Park and Nathaniel Jones Park. Nearly every home is a production build from a national builder, sold in named villages that are either gated with codes or open. One master association covers the plan, and most villages add a sub-association.
          </p>
          <ul>
            <li>
              <strong>Gated builder villages:</strong>
              {' '}
              Repeating floor plans behind a coded gate without guard staff, with a sub-association on top of the master dues. Gate access runs through the listing agent for showings.
            </li>
            <li>
              <strong>Open villages:</strong>
              {' '}
              The same builders and plans without a gate, often with slightly lower dues and the deepest comparable data in the plan.
            </li>
            <li>
              <strong>Park-adjacent and view lots:</strong>
              {' '}
              Homes backing Exploration Peak Park, the regional park or the foothills carry a premium that compares only to other park and view lots.
            </li>
            <li>
              <strong>Newer phases and adjacent builder communities:</strong>
              {' '}
              Construction continues along Blue Diamond Road and toward the 215, where builder pricing and incentives are the resale's real competition.
            </li>
          </ul>

          <h2>What a Mountains Edge house is worth when both spouses need the number</h2>
          <p>
            A divorce valuation must hold up to two attorneys and sometimes a judge. It should rest on closed sales of the same model, adjusted for lot, pool, upgrades, gate and condition, and be written so either spouse can hand it to counsel. List prices, builder base prices and online estimates are not evidence of value.
          </p>
          <p>
            Mountains Edge is the clearest production-home market in the valley, which cuts both ways. Same-model closings are plentiful, so a broker price opinion usually settles the number without a formal appraisal, and the valley median of
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            {' '}
            is a workable reference. But new phases a short drive away offer the same floor plans with builder incentives, and a buyer compares the resale against that new home. The valuation has to account for it.
          </p>
          <p>
            Where the spouses disagree, the usual cause is upgrades. One spouse counts the solar lease, the pool, the extended patio and the finished garage at cost; the market pays a fraction of that. A written adjustment schedule tied to actual closings settles the argument faster than a second appraisal.
          </p>

          <h2>Can one spouse keep the Mountains Edge home?</h2>
          <p>
            A buyout works when the keeping spouse can refinance in one name, pay out the other spouse's share of equity, and carry the payment, taxes, insurance and HOA dues after the decree. In Mountains Edge the loan size is rarely the obstacle, because most homes sit below the
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            conforming limit. The usual obstacles are thin equity and single-income qualification.
          </p>
          <ul>
            <li>
              <strong>Recent purchases.</strong>
              {' '}
              A home bought in the last few years may hold little equity after selling costs. A buyout can still work with a small equalizing payment, and a deferred sale under the decree is a third option.
            </li>
            <li>
              <strong>Solar leases and PACE liens.</strong>
              {' '}
              Leased solar and property-assessed financing are common in Mountains Edge and must be assumed or paid off at transfer. They belong in the decree.
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

          <h2>Selling a Mountains Edge home while the case is open</h2>
          <p>
            Most Mountains Edge divorce sales close before the decree, under a stipulation or court order that names the agent, the pricing method, who occupies the home and how net proceeds are held at escrow. A neutral agent reports every showing, offer and price discussion to both spouses in writing at the same time.
          </p>
          <p>
            Two calendars run at once. The market calendar is fast for priced-right homes;
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of valley single-family homes sold within 30 days in September 2026, with
            {' '}
            {LVR_SEPT_2026.availableSfrListings}
            {' '}
            competing listings available. The court calendar is slower. A contested motion in Clark County family court waits weeks for a hearing, so file early and write escrow to close only after the order is signed.
          </p>
          <p>
            In a production market the buyer is comparing your home against the same floor plan a few streets away and against a new build with incentives. Deferred maintenance, a half-emptied house and a tired yard all show in the offer. A short written plan for repairs, staging and showing windows around the occupying spouse keeps the sale on schedule. Gated villages route gate codes through the listing agent, so showings are by appointment.
          </p>

          <h2>HOA, solar and the Clark County close</h2>
          <p>
            Every Mountains Edge sale needs a resale package and a payoff demand from the master association and the sub-association. Order them the week the listing goes live so transfer fees, back dues and any special assessment are known when offers are negotiated. Those costs come out of proceeds before the split, and the settlement should say who bears them.
          </p>
          <p>
            Solar is the second file. A leased system transfers to the buyer by assignment and needs the solar company's approval; a financed system is a lien that is paid at closing. Either one changes the net proceeds and belongs in the settlement. Clark County is the permitting authority in Enterprise, so permit searches for patio covers, casitas and pool work run through the county. With the HOA packages, solar paperwork and proceeds instructions handled early, the house is usually the least contested asset in a Mountains Edge divorce.
          </p>
        </div>

        <HighValueHomeNote
          points={[
            `A buyout refinance above ${LUXURY_2026.jumboThreshold2026} is a jumbo loan with tighter reserve and income rules. Few Mountains Edge homes reach that line, mostly the largest view and park-adjacent lots, so confirm the loan type before negotiating equity.`,
            'View and park-adjacent lots have a thinner comparable set. Two independent appraisals with a written reconciliation rule protect both spouses from a single outlier report.',
            `Gains above the Section 121 exclusion are taxable. ${NEVADA_LAW.capitalGainsExclusion} ${LEGAL_DISCLAIMER}`,
            `Clark County transfer tax on a third-party sale is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of price. A decree-based transfer between spouses is exempt, so the method of division changes the closing costs.`,
            'Gated villages run showings by appointment through the listing agent, which protects the occupying spouse and favors pre-qualified buyers.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the village, the loan and purchase date, solar or PACE items, who is living in the home, and where the case stands.' },
            { title: 'Neutral valuation', detail: 'A written value built on same-model closings and current builder competition, delivered to both spouses and both attorneys at the same time.' },
            { title: 'Buyout or sale test', detail: 'A side-by-side of what each spouse nets under a buyout, a sale or a deferred sale, including HOA, solar and tax items.' },
            { title: 'Court-aligned plan', detail: 'A listing or transfer timeline matched to your stipulation or order, with escrow instructions drafted to it.' },
          ]}
          callPromise="You leave the call with a value range, a buyout verdict, and the next decision."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
