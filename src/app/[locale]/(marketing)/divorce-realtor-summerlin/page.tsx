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
import { COMMUNITY_12MO, LEGAL_DISCLAIMER, LUXURY_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, siteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateLocalBusinessSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type ISummerlinProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-summerlin';

const pageTitle = 'Summerlin Divorce Real Estate Agent | Dr. Jan Duffy';
const pageDescription = `Summerlin divorce real estate agent for The Ridges, Red Rock Country Club, The Summit Club and the villages. Q2 2026 median ${COMMUNITY_12MO.summerlinQ2_2026.median}. Plan a sale or buyout.`;

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
    question: 'How is a home in The Ridges valued for a divorce settlement?',
    answer: `The Ridges posted a 12-month median of ${COMMUNITY_12MO.theRidges.median} with sales from ${COMMUNITY_12MO.theRidges.lowSale} to ${COMMUNITY_12MO.theRidges.highSale}, so a village average means little. Value rests on the specific lot, view corridor, builder and finish level. Most settlements use two independent appraisals plus a broker price opinion, with a written rule for reconciling the numbers.`,
  },
  {
    question: 'Can one spouse keep a Summerlin home with a jumbo mortgage?',
    answer: `Loans above ${LUXURY_2026.jumboThreshold2026} are jumbo, and most Summerlin homes west of the 215 and in the custom villages exceed that line. The keeping spouse must qualify alone, with the decree's support terms counted. Get a written jumbo pre-approval before the equity number is negotiated. If it fails, the fallback is a sale.`,
  },
  {
    question: 'Who handles showings inside the Summerlin guard gates during a divorce?',
    answer: 'The Ridges, Red Rock Country Club, Tournament Hills, Reverence and The Summit Club each register buyer agents at the gate, and some bar open houses. The listing agent clears every showing with the occupying spouse in advance and reports feedback to both spouses at the same time. Private, by-appointment exposure is normal at this tier.',
  },
  {
    question: 'What happens to a Red Rock Country Club or Summit Club membership in a divorce?',
    answer: 'Club memberships are separate contracts from the deed. Each club has its own rules on transfer with the home, resignation refunds and waiting lists. The settlement should name the membership, its deposit value and who keeps it. If the home sells, confirm in writing whether the buyer can assume the membership.',
  },
  {
    question: 'How fast do Summerlin homes sell during a divorce?',
    answer: `Across Summerlin's four main ZIP codes the 12-month median days on market was ${COMMUNITY_12MO.summerlinFourZips.medianDom}, and the Q2 2026 average was ${COMMUNITY_12MO.summerlinQ2_2026.avgDom} days. Tract homes in The Paseos, The Vistas or Stonebridge move at that pace when priced to same-model closings. Custom homes above $2 million take longer. The court calendar is usually the slower clock.`,
  },
  {
    question: 'Is a transfer between spouses taxed in Summerlin?',
    answer: `${NEVADA_LAW.transferTaxDivorceExemption} A sale to a third party is taxed at ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of price in Clark County. ${LEGAL_DISCLAIMER}`,
  },
];

export default async function Summerlin(props: ISummerlinProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const currentPath = '/divorce-realtor-summerlin';
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'Summerlin' }];
  const serviceSchema = generateServiceSchema(
    'Summerlin Divorce Real Estate Services',
    'Neutral divorce real estate representation in Summerlin, Las Vegas: valuation, buyout planning and court-aware home sales across The Ridges, Red Rock Country Club, The Summit Club, Reverence and the Summerlin villages.',
    'Summerlin',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const articleSchema = generateArticleSchema(pageTitle, pageDescription, `${siteUrl}${path}`, CONTENT_LAST_UPDATED, CONTENT_LAST_UPDATED);
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[localBusinessSchema, serviceSchema, realEstateAgentSchema, articleSchema, faqSchema]} />
      <DivorcePageTemplate
        h1="Summerlin Divorce Real Estate Agent"
        heroSubhead="Neutral valuation, buyout planning and private sales from the village tracts to The Ridges and The Summit Club"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How does a divorce home sale work in Summerlin?">
          A Summerlin home is community property under Nevada law, so both spouses sign the listing and deed, or a family court order stands in for a missing signature. The sequence is a neutral valuation using same-village closings, a buyout test against jumbo or conforming financing, then a sale plan that respects gate rules, club memberships and the court calendar.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Summerlin median sale, Q2 2026', value: COMMUNITY_12MO.summerlinQ2_2026.median },
            { label: 'Summerlin closed sales, Q2 2026', value: COMMUNITY_12MO.summerlinQ2_2026.closedSales },
            { label: 'Summerlin $2M+ closings, Q2 2026', value: `${COMMUNITY_12MO.summerlinQ2_2026.over2MClosings} (${COMMUNITY_12MO.summerlinQ2_2026.over2MChange})` },
            { label: 'The Ridges 12-month median', value: COMMUNITY_12MO.theRidges.median },
          ]}
          source={COMMUNITY_12MO.source}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>How Summerlin's villages change a divorce sale</h2>
          <p>
            Summerlin is one master plan divided into villages, and the village sets the terms of a divorce sale. A tract home in The Paseos has deep comparable data, an open street and a single sub-association. A custom home in The Ridges has a guard gate, a view corridor that drives price, and a Summerlin Council assessment on top of the village HOA. The plan for each is different.
          </p>
          <p>
            The main Summerlin areas and what each means for a divorcing owner:
          </p>
          <ul>
            <li>
              <strong>Summerlin South (The Paseos, The Vistas, The Willows, The Mesa, The Arbors):</strong>
              {' '}
              Tract and semi-custom homes from the late 1990s onward, many in gated sub-villages without guard staff. Same-model closings make valuation disputes rare.
            </li>
            <li>
              <strong>Summerlin West (Stonebridge, Redpoint, Kestrel, Reverence):</strong>
              {' '}
              The newest villages beyond the 215, with current-generation floor plans. Reverence is gated with elevated lots and larger homes. Builder warranties and recent purchase prices matter here.
            </li>
            <li>
              <strong>Summerlin North (The Trails, The Hills, The Pueblos, Sun City Summerlin):</strong>
              {' '}
              The original villages near TPC Summerlin and Tournament Hills. Sun City Summerlin is an age-qualified community under its CC&Rs, which narrows the buyer pool on resale.
            </li>
            <li>
              <strong>The Ridges, Red Rock Country Club and Tournament Hills:</strong>
              {' '}
              Guard-gated golf communities with custom and semi-custom homes, club memberships and showing rules.
            </li>
            <li>
              <strong>The Summit Club:</strong>
              {' '}
              A private club community where inventory largely trades off the MLS. Valuation relies on private sales data and the club's own transfer rules.
            </li>
            <li>
              <strong>Downtown Summerlin and Summerlin Centre:</strong>
              {' '}
              Condos, townhomes and mid-rise product with their own HOA structures and a different buyer pool.
            </li>
          </ul>

          <h2>What a Summerlin house is worth when both spouses need the number</h2>
          <p>
            A divorce valuation must hold up to two attorneys and possibly a judge. It should rest on closed sales in the same village, adjusted for lot, view, pool, elevation and condition, and be written so either spouse can hand it to counsel. The Summerlin median of
            {' '}
            {COMMUNITY_12MO.summerlinQ2_2026.median}
            {' '}
            in Q2 2026 is a useful anchor for tract product, but it says nothing about a custom lot in The Ridges.
          </p>
          <p>
            The spread across villages is the reason. Summerlin's four main ZIP codes recorded
            {' '}
            {COMMUNITY_12MO.summerlinFourZips.closings}
            {' '}
            closings at a median of
            {' '}
            {COMMUNITY_12MO.summerlinFourZips.median}
            {' '}
            over the last 12 months. In the same period The Ridges recorded
            {' '}
            {COMMUNITY_12MO.theRidges.closings}
            {' '}
            closings at a median of
            {' '}
            {COMMUNITY_12MO.theRidges.median}
            {' '}
            and about
            {' '}
            {COMMUNITY_12MO.theRidges.pricePerSqFt}
            {' '}
            per square foot, and Red Rock Country Club recorded
            {' '}
            {COMMUNITY_12MO.redRockCountryClub.closings}
            {' '}
            closings at a median of
            {' '}
            {COMMUNITY_12MO.redRockCountryClub.median}
            . The Summit Club median sits near
            {' '}
            {COMMUNITY_12MO.summitClub.median}
            {' '}
            with most inventory off the MLS.
          </p>
          <p>
            For tract homes, a broker price opinion built on same-model sales usually ends the debate. For custom homes, plan on a formal appraisal, often two, because appraisers weigh Red Rock views, Strip views and golf frontage differently. Agree on the reconciliation rule before anyone orders a report.
          </p>

          <h2>Can one spouse keep the Summerlin home?</h2>
          <p>
            A buyout works when the keeping spouse can refinance in one name, pay out the other spouse's share of equity, and carry the payment, HOA dues and any club fees after the decree. In Summerlin the price band decides the difficulty. Many tract homes sit near or above the
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            conforming limit, so the refinance is often jumbo even outside the custom villages.
          </p>
          <ul>
            <li>
              <strong>Layered HOA costs.</strong>
              {' '}
              A Summerlin home pays the Summerlin Council assessment, the village association and sometimes a gated sub-association. The Ridges runs
              {' '}
              {COMMUNITY_12MO.theRidges.hoaMonthly}
              {' '}
              a month and Red Rock Country Club
              {' '}
              {COMMUNITY_12MO.redRockCountryClub.hoaMonthly}
              , before any club dues. Lenders count all of it.
            </li>
            <li>
              <strong>Club membership value.</strong>
              {' '}
              A Red Rock Country Club or Summit Club deposit is an asset separate from the house, with its own refund and transfer terms.
            </li>
            <li>
              <strong>Equity payment timing.</strong>
              {' '}
              If equity is paid with retirement assets or a note, the decree must state timing, interest and whether the house secures it.
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

          <h2>Selling a Summerlin home while the case is open</h2>
          <p>
            Most Summerlin divorce sales close before the decree, under a stipulation or court order that names the agent, the pricing method, who occupies the home and how net proceeds are held. A neutral agent delivers every offer, every showing report and every price discussion to both spouses in writing at the same moment.
          </p>
          <p>
            The market side is fast for priced-right tract homes. Summerlin's four main ZIP codes carried a 12-month median of
            {' '}
            {COMMUNITY_12MO.summerlinFourZips.medianDom}
            {' '}
            days on market. The court side is slower. A contested motion in Clark County family court waits weeks for a hearing, so file early and write escrow instructions that close only once the order is signed. Custom homes above $2 million draw a smaller, often cash, buyer pool and should be given a longer window.
          </p>
          <p>
            Gate protocol is part of the plan. The Ridges, Red Rock Country Club, Tournament Hills, Reverence and The Summit Club register buyer agents at the gate, and some bar open houses. That limits foot traffic, protects the occupying spouse's privacy, and favors by-appointment showings to pre-qualified buyers.
          </p>

          <h2>Summerlin's luxury enclaves in a divorce</h2>
          <p>
            Summerlin produced
            {' '}
            {LUXURY_2026.summerlinShare2025}
            {' '}
            of the valley's $1 million-plus sales in 2025, more than any other area, and
            {' '}
            {COMMUNITY_12MO.summerlinQ2_2026.over2MClosings}
            {' '}
            closings above $2 million in Q2 2026 alone. Those sales sit in The Ridges, Red Rock Country Club, The Summit Club, Reverence and the larger lots of The Vistas and The Paseos. A divorce transaction there carries steps a standard listing does not.
          </p>
          <ul>
            <li>
              <strong>The Ridges:</strong>
              {' '}
              Custom lots around Bear's Best, with a 12-month high sale of
              {' '}
              {COMMUNITY_12MO.theRidges.highSale}
              . Lot elevation and the Red Rock or Strip view corridor set price more than square footage.
            </li>
            <li>
              <strong>Red Rock Country Club:</strong>
              {' '}
              Two Arnold Palmer courses, a 12-month low sale of
              {' '}
              {COMMUNITY_12MO.redRockCountryClub.lowSale}
              {' '}
              and a median of
              {' '}
              {COMMUNITY_12MO.redRockCountryClub.medianDom}
              {' '}
              days on market. Golf-frontage and interior lots compare separately.
            </li>
            <li>
              <strong>The Summit Club:</strong>
              {' '}
              Off-MLS trading means the valuation method must be agreed in the settlement, with private sales data and the club's transfer terms in hand.
            </li>
            <li>
              <strong>Reverence:</strong>
              {' '}
              Gated, elevated lots on the west edge with recent builder pricing as a floor for value.
            </li>
          </ul>

          <h2>The tract villages: where most Summerlin divorce sales happen</h2>
          <p>
            Most Summerlin divorce sales involve a production home in The Paseos, The Vistas, Stonebridge, The Trails or Summerlin Centre with a village HOA and a conforming or modest jumbo loan. These move quickly when priced to same-model closings and prepared well despite one spouse having moved out. The common errors are listing at the number one spouse needs rather than the number the village supports, and ordering the HOA resale package too late.
          </p>
          <p>
            A clear written plan covers repairs and staging costs, showing windows around the occupying spouse, and where proceeds sit until the decree directs distribution. With that in place, the Summerlin home is usually the least contested asset in the case.
          </p>
        </div>

        <HighValueHomeNote
          points={[
            `A buyout refinance above ${LUXURY_2026.jumboThreshold2026} is jumbo, and most Summerlin homes in The Ridges, Red Rock Country Club, Reverence and The Summit Club are well past that line. Secure a written jumbo pre-approval before negotiating the equity payment.`,
            `The Ridges ran from ${COMMUNITY_12MO.theRidges.lowSale} to ${COMMUNITY_12MO.theRidges.highSale} in 12 months. Custom homes draw appraisals that can differ widely, so write a two-appraisal protocol and a reconciliation rule into the settlement.`,
            'Red Rock Country Club and Summit Club memberships are separate assets with their own deposit, resignation and transfer terms. Name them in the settlement and confirm whether a buyer can assume them.',
            `Gains above the Section 121 exclusion are taxable. ${NEVADA_LAW.capitalGainsExclusion} ${LEGAL_DISCLAIMER}`,
            `Clark County transfer tax on a third-party sale is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000, for example ${NEVADA_LAW.transferTaxExample2M}. Cash buyers are common above $2 million, which shortens closing but raises the stakes on price and on private, off-market exposure.`,
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the village, the loan balance, who is living in the home, and where the case stands.' },
            { title: 'Neutral valuation', detail: 'A written value built on closed sales in your village, delivered to both spouses and both attorneys at the same time.' },
            { title: 'Buyout or sale test', detail: 'A side-by-side of what each spouse nets under a buyout versus a sale, including HOA layers, club deposits and tax items.' },
            { title: 'Court-aligned plan', detail: 'A listing or transfer timeline matched to your stipulation or order, with gate protocol and escrow instructions drafted to it.' },
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
