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
import { COMMUNITY_12MO, LEGAL_DISCLAIMER, LUXURY_2026, LVR_SEPT_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, siteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateLocalBusinessSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type IInspiradaProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-inspirada';

const pageTitle = 'Inspirada Divorce Realtor, Henderson NV | Dr. Jan Duffy';
const pageDescription = `Inspirada divorce realtor for Solista, Capriola, Potenza, Burano and Aventura in Henderson. Valley median ${LVR_SEPT_2026.medianSfrPrice}. Plan a neutral valuation, buyout or sale.`;

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
    question: 'How is an Inspirada home valued for a divorce?',
    answer: 'Inspirada is a production-home master plan with repeating floor plans across its villages, so a broker price opinion built on same-model closings usually settles the number, adjusted for lot, pool, upgrades and view. Because builders are still selling new phases, the valuation also has to account for new-home pricing and incentives a short walk away.',
  },
  {
    question: 'Can one spouse keep an Inspirada house?',
    answer: `Often yes. Most Inspirada homes price below the ${LUXURY_2026.jumboThreshold2026} conforming limit, so the refinance is standard if the keeping spouse qualifies alone with the decree's support terms counted. The common obstacle is thin equity on a recent purchase. A written pre-approval and a payoff statement answer the question before negotiation starts.`,
  },
  {
    question: 'We bought in Inspirada within the last few years. Is a sale even worth it?',
    answer: 'It depends on the payoff and selling costs. With thin equity, a sale may net little, a buyout may need only a small equalizing payment, and a deferred sale under the decree is a third path. Each has tax and support consequences, so run the numbers with your attorney before choosing. The valuation is the first step in all three.',
  },
  {
    question: 'Does Inspirada have a guard gate or a golf course?',
    answer: 'No. Inspirada is built around parks, trails and village centers rather than a golf course, and its gated villages use codes rather than guard staff. Showings run through the listing agent by appointment, which still protects the occupying spouse. There is no club membership to divide, only the master and sub-association accounts.',
  },
  {
    question: 'How long does an Inspirada divorce sale take?',
    answer: `In September 2026, ${LVR_SEPT_2026.soldWithin30DaysPct} of Las Vegas area single-family homes sold within 30 days of listing, and Inspirada homes priced to same-model closings follow that pattern. The court calendar is slower. If a court order is needed to list or close, file early and write escrow to close only after the order is signed.`,
  },
  {
    question: 'Is a transfer between spouses taxed in Henderson?',
    answer: `${NEVADA_LAW.transferTaxDivorceExemption} A sale to a third party is taxed at ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of price. ${LEGAL_DISCLAIMER}`,
  },
];

export default async function Inspirada(props: IInspiradaProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const currentPath = '/divorce-realtor-inspirada';
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'Inspirada' }];
  const serviceSchema = generateServiceSchema(
    'Inspirada Divorce Real Estate Services',
    'Neutral divorce real estate representation in Inspirada, Henderson: valuation, buyout planning and court-aware home sales across Solista, Capriola, Potenza, Burano, Terrazza and Aventura.',
    'Inspirada',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const articleSchema = generateArticleSchema(pageTitle, pageDescription, `${siteUrl}${path}`, CONTENT_LAST_UPDATED, CONTENT_LAST_UPDATED);
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[localBusinessSchema, serviceSchema, realEstateAgentSchema, articleSchema, faqSchema]} />
      <DivorcePageTemplate
        h1="Inspirada Divorce Realtor"
        heroSubhead="Neutral valuation, buyout planning and court-aware sales across southwest Henderson's newest master plan"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How does a divorce home sale work in Inspirada, Henderson?">
          An Inspirada home is community property under Nevada law, so both spouses sign the listing and deed, or a family court order replaces the missing signature. The sequence is a neutral valuation from same-model closings and current builder pricing, a buyout test against the loan and the keeping spouse's income, then a sale or transfer plan timed to the court calendar and the HOA resale process.
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
          <h2>How Inspirada's villages change a divorce sale</h2>
          <p>
            Inspirada is a master plan in southwest Henderson off St. Rose Parkway and Bicentennial Parkway, near Henderson Executive Airport and the Interstate 15 corridor, built from the late 2000s onward around a network of parks and trails rather than a golf course. Its homes are production builds from several national builders, sold in named villages under one master association, with gated sections that use codes rather than guard staff and a townhome and condo product near the village centers.
          </p>
          <ul>
            <li>
              <strong>Solista, Capriola and Potenza:</strong>
              {' '}
              The earlier villages around Solista Park, Capriola Park and Potenza Park, with the deepest resale history in the plan and repeating floor plans from the first builder phases.
            </li>
            <li>
              <strong>Burano, Terrazza and Aventura:</strong>
              {' '}
              Later villages with current-generation floor plans, where recent purchase prices and builder incentives anchor value and builder warranties may still be in force.
            </li>
            <li>
              <strong>Gated sections:</strong>
              {' '}
              Coded gates without guard staff, a sub-association on top of master dues, and gate access routed through the listing agent for showings.
            </li>
            <li>
              <strong>Townhomes and condos:</strong>
              {' '}
              Attached product near the village centers with its own association, reserve study and rental questions that affect a buyer's financing.
            </li>
          </ul>

          <h2>What an Inspirada house is worth when both spouses need the number</h2>
          <p>
            A divorce valuation must hold up to two attorneys and sometimes a judge. It should rest on closed sales of the same model, adjusted for lot, pool, upgrades, view and condition, and be written so either spouse can hand it to counsel. List prices, builder base prices and online estimates are not evidence of value.
          </p>
          <p>
            Inspirada's uniformity is an advantage. Same-model closings are plentiful, so a broker price opinion usually settles the number without a formal appraisal, and the valley median of
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            {' '}
            is a workable reference. The complication is new construction. Builders are still selling phases in and around the plan, and a buyer compares the resale against a new home with incentives. The valuation has to account for that competition.
          </p>
          <p>
            Where spouses disagree, the usual cause is upgrades paid at the design center. The market pays a fraction of design-center cost for flooring, cabinets and lot premiums, and a written adjustment schedule tied to actual closings settles that argument faster than a second appraisal. Henderson's $1 million-plus tier recorded a median of
            {' '}
            {COMMUNITY_12MO.henderson1MPlus.median}
            {' '}
            in the third quarter of 2026, and only Inspirada's largest view lots approach it.
          </p>

          <h2>Can one spouse keep the Inspirada home?</h2>
          <p>
            A buyout works when the keeping spouse can refinance in one name, pay out the other spouse's share of equity, and carry the payment, taxes, insurance and HOA dues after the decree. In Inspirada the loan size is rarely the obstacle, because most homes sit below the
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
              <strong>Solar leases and builder financing.</strong>
              {' '}
              Leased solar and builder-affiliated loans with rate buydowns are common in newer villages. A lease transfers by assignment and a buydown does not survive a refinance, which changes the keeping spouse's payment.
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

          <h2>Selling an Inspirada home while the case is open</h2>
          <p>
            Most Inspirada divorce sales close before the decree, under a stipulation or court order that names the agent, the pricing method, who occupies the home and how net proceeds are held at escrow. A neutral agent reports every showing, offer and price discussion to both spouses in writing at the same time.
          </p>
          <p>
            Two calendars run at once. The market calendar is fast for priced-right homes;
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of valley single-family homes sold within 30 days in September 2026. The court calendar is slower. A contested motion in Clark County family court waits weeks for a hearing, so file early and write escrow to close only after the order is signed.
          </p>
          <p>
            In a production market the buyer is comparing your home against the same floor plan a few streets away and against a new build with incentives. Deferred maintenance, a half-emptied house and a tired yard all show in the offer. A short written plan for repairs, staging and showing windows around the occupying spouse keeps the sale on schedule. Gated villages route gate codes through the listing agent, so showings are by appointment.
          </p>

          <h2>HOA, solar and the Henderson close</h2>
          <p>
            Every Inspirada sale needs a resale package and a payoff demand from the master association and the sub-association. Order them the week the listing goes live so transfer fees, back dues and any special assessment are known when offers are negotiated. Those costs come out of proceeds before the split, and the settlement should say who bears them.
          </p>
          <p>
            Solar and builder paperwork come next. A leased system transfers to the buyer by assignment and needs the solar company's approval; a financed system is a lien paid at closing. Builder warranties transfer to the buyer and are a selling point worth documenting. The City of Henderson is the permitting authority, so permit searches for patio covers, casitas and pool work run through the city. With the HOA packages, solar file and proceeds instructions handled early, the house is usually the least contested asset in an Inspirada divorce.
          </p>
        </div>

        <HighValueHomeNote
          points={[
            `A buyout refinance above ${LUXURY_2026.jumboThreshold2026} is a jumbo loan with tighter reserve and income rules. Few Inspirada homes reach that line, mostly the largest view lots in the newer villages, so confirm the loan type before negotiating equity.`,
            'View lots and heavily upgraded homes have a thinner comparable set. Two independent appraisals with a written reconciliation rule protect both spouses from a single outlier report.',
            `Gains above the Section 121 exclusion are taxable. ${NEVADA_LAW.capitalGainsExclusion} ${LEGAL_DISCLAIMER}`,
            `Clark County transfer tax on a third-party sale is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of price. A decree-based transfer between spouses is exempt, so the method of division changes the closing costs.`,
            'Gated villages run showings by appointment through the listing agent, which protects the occupying spouse and favors pre-qualified buyers.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the village, the loan and purchase date, solar or builder financing, who is living in the home, and where the case stands.' },
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
