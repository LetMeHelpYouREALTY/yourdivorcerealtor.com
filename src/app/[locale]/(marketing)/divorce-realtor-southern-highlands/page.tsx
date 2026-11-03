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
import { LEGAL_DISCLAIMER, LUXURY_2026, LVR_SEPT_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, siteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateLocalBusinessSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type ISouthernHighlandsProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-southern-highlands';

const pageTitle = 'Southern Highlands Divorce Real Estate Agent | Dr. Jan Duffy';
const pageDescription = `Southern Highlands divorce real estate agent for the Golf Club estates, gated villages and townhomes. Loans above ${LUXURY_2026.jumboThreshold2026} are jumbo. Plan a neutral valuation, buyout or private sale.`;

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
    question: 'How is a Southern Highlands Golf Club home valued for a divorce?',
    answer: 'Custom homes inside the Golf Club gates trade on lot, course frontage, view and finish quality, so two appraisers can land far apart. The settlement should name the method in advance: usually two independent appraisals plus a broker price opinion, with a written rule for reconciling them. The club membership is valued separately from the house.',
  },
  {
    question: 'Can one spouse keep a Southern Highlands home with a jumbo mortgage?',
    answer: `Loans above ${LUXURY_2026.jumboThreshold2026} are jumbo, and most Golf Club homes and many of the larger village homes exceed that line. The keeping spouse must qualify alone, with the decree's support terms counted and the master, sub-association and club dues included. Get a written jumbo pre-approval before the equity number is negotiated.`,
  },
  {
    question: 'Who handles showings inside the Southern Highlands gates during a divorce?',
    answer: 'The Golf Club estate section is guard-gated and the villages are gated. Buyer agents register at the gate, showings are by appointment, and some sections limit open houses. The listing agent clears each appointment with the occupying spouse and reports feedback and offers to both spouses in writing at the same time.',
  },
  {
    question: 'What happens to a Southern Highlands Golf Club membership in a divorce?',
    answer: 'The membership is a separate contract from the deed, with its own rules on transfer with the home, resignation refunds and waiting lists. The settlement should name the membership, its deposit value and who keeps it. If the home sells, confirm in writing whether the buyer can assume it.',
  },
  {
    question: 'How long does a Southern Highlands divorce sale take?',
    answer: `In September 2026, ${LVR_SEPT_2026.soldWithin30DaysPct} of Las Vegas area single-family homes sold within 30 days of listing. Southern Highlands village homes priced to same-model closings follow that pattern. Golf Club estates draw a smaller, often cash, buyer pool and need a longer window. The court calendar is usually the slowest clock.`,
  },
  {
    question: 'Is a transfer between spouses taxed in Clark County?',
    answer: `${NEVADA_LAW.transferTaxDivorceExemption} A sale to a third party is taxed at ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of price. ${LEGAL_DISCLAIMER}`,
  },
];

export default async function SouthernHighlands(props: ISouthernHighlandsProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const currentPath = '/divorce-realtor-southern-highlands';
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'Southern Highlands' }];
  const serviceSchema = generateServiceSchema(
    'Southern Highlands Divorce Real Estate Services',
    'Neutral divorce real estate representation in Southern Highlands, Las Vegas: valuation, buyout planning and private, court-aware sales across the Golf Club estates, the gated villages and the townhome product.',
    'Southern Highlands',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const articleSchema = generateArticleSchema(pageTitle, pageDescription, `${siteUrl}${path}`, CONTENT_LAST_UPDATED, CONTENT_LAST_UPDATED);
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[localBusinessSchema, serviceSchema, realEstateAgentSchema, articleSchema, faqSchema]} />
      <DivorcePageTemplate
        h1="Southern Highlands Divorce Real Estate Agent"
        heroSubhead="Neutral valuation, buyout planning and private sales from the gated villages to the Golf Club estates"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How does a divorce home sale work in Southern Highlands?">
          A Southern Highlands home is community property under Nevada law, so both spouses sign the listing and deed, or a family court order replaces the missing signature. The sequence is a neutral valuation using same-village closings, a buyout test against jumbo or conforming financing with all HOA and club dues counted, then a sale plan that respects gate protocol, membership terms and the court calendar.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: '2026 jumbo loan threshold, Clark County', value: LUXURY_2026.jumboThreshold2026 },
            { label: 'Las Vegas $1M+ closings, Sept 2026', value: LUXURY_2026.closingsAbove1MSept2026 },
            { label: 'Las Vegas $3M+ closings, Sept 2026', value: LUXURY_2026.closingsAbove3MSept2026 },
          ]}
          source={`${LUXURY_2026.jumboSource}; ${LUXURY_2026.sept2026Source}`}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>How Southern Highlands' sections change a divorce sale</h2>
          <p>
            Southern Highlands is a master plan in the Enterprise township south of the 215, built around the private Southern Highlands Golf Club and its Robert Trent Jones Sr. and Jr. course. It holds three distinct products under one master association, and each one changes the plan for a divorce sale: the valuation method, the loan type, the gate rules and the paperwork.
          </p>
          <ul>
            <li>
              <strong>The Golf Club estates:</strong>
              {' '}
              A guard-gated section of custom homes on and around the course, where lot, frontage, view corridor and finish level set price. Club membership is a separate asset with its own transfer terms.
            </li>
            <li>
              <strong>The gated villages:</strong>
              {' '}
              Production and semi-custom homes from several builders in gated sub-associations without guard staff, with repeating floor plans and deep comparable data. Many sit near or above the conforming loan limit.
            </li>
            <li>
              <strong>Townhomes and condos:</strong>
              {' '}
              Attached product along the parkway with its own association, reserve study and rental questions that affect a buyer's financing.
            </li>
            <li>
              <strong>Newer phases and adjacent builder villages:</strong>
              {' '}
              Recent construction along St. Rose Parkway where builder pricing and incentives are the resale's real competition.
            </li>
          </ul>

          <h2>What a Southern Highlands house is worth when both spouses need the number</h2>
          <p>
            A divorce valuation must hold up to two attorneys and sometimes a judge. It should rest on closed sales in the same village, adjusted for lot, frontage, view, pool and finish, and be written so either spouse can hand it to counsel. The valley median of
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            {' '}
            is a reference point for the townhome product and little else here.
          </p>
          <p>
            In the villages, same-model closings usually settle the number through a broker price opinion. Inside the Golf Club gates the comparable set is thin. One course-frontage sale or one view-lot sale can swing the number, and two appraisers weighing finish quality differently can land far apart. The valley recorded
            {' '}
            {LUXURY_2026.closingsAbove1MSept2026}
            {' '}
            closings above $1 million and
            {' '}
            {LUXURY_2026.closingsAbove3MSept2026}
            {' '}
            above $3 million in September 2026, so the top-tier comparable pool is small everywhere, not just here.
          </p>
          <p>
            For Golf Club homes, plan on two independent appraisals plus a broker price opinion, with a written reconciliation rule agreed before anyone orders a report. The settlement should also say whether the membership deposit is counted inside or outside the house value.
          </p>

          <h2>Can one spouse keep the Southern Highlands home?</h2>
          <p>
            A buyout works when the keeping spouse can refinance in one name, pay out the other spouse's share of equity, and carry the payment, taxes, insurance, master and sub-association dues and any club fees after the decree. In Southern Highlands the price band decides the difficulty, and much of the community sits above the
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            jumbo line.
          </p>
          <ul>
            <li>
              <strong>Layered dues.</strong>
              {' '}
              Master association, sub-association and club dues all count against the keeping spouse's ratios. A guard-gated golf home can carry a monthly obligation that changes the pre-approval.
            </li>
            <li>
              <strong>Membership value.</strong>
              {' '}
              A Golf Club deposit is an asset separate from the house, with its own refund and transfer terms. It belongs on the balance sheet.
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

          <h2>Selling a Southern Highlands home while the case is open</h2>
          <p>
            Most Southern Highlands divorce sales close before the decree, under a stipulation or court order that names the agent, the pricing method, who occupies the home and how net proceeds are held at escrow. A neutral agent delivers every offer, showing report and price discussion to both spouses in writing at the same moment.
          </p>
          <p>
            The market side is fast for priced-right village homes;
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of valley single-family homes sold within 30 days in September 2026. Golf Club estates draw a smaller, often cash, buyer pool and should be given a longer window. The court side is slower. A contested motion in Clark County family court waits weeks for a hearing, so file early and write escrow to close only after the order is signed.
          </p>
          <p>
            Gate protocol is part of the plan. The Golf Club section registers buyer agents at the guard gate and limits open houses, and the villages run gate codes through the listing agent. That limits foot traffic, protects the occupying spouse's privacy, and favors by-appointment showings to pre-qualified buyers. For a contested case, private exposure to a short list of qualified buyers can be agreed in writing by both spouses.
          </p>

          <h2>HOA, club and the Clark County close</h2>
          <p>
            Every Southern Highlands sale needs a resale package and a payoff demand from the master association and the sub-association, and the Golf Club adds its own transfer paperwork. Order all of it the week the listing goes live so transfer fees, back dues, any special assessment and the membership terms are known when offers are negotiated. Those costs come out of proceeds before the split, and the settlement should say who bears them.
          </p>
          <p>
            Clark County, not the City of Las Vegas, is the permitting authority in Enterprise, so permit searches for casitas, pool work and outdoor kitchens run through the county. With the HOA packages, club terms and proceeds instructions handled early, the house is usually the least contested asset in a Southern Highlands divorce.
          </p>
        </div>

        <HighValueHomeNote
          points={[
            `A buyout refinance above ${LUXURY_2026.jumboThreshold2026} is jumbo. Expect reserve requirements and full income review of the keeping spouse alone, with master, sub-association and club dues counted.`,
            'Golf Club custom homes draw appraisals that can differ by hundreds of thousands. Agree on a two-appraisal protocol and a reconciliation rule before either spouse orders one.',
            'The Southern Highlands Golf Club membership is a separate asset with its own deposit, resignation and transfer terms. List it in the settlement and confirm whether a buyer can assume it.',
            `Gains above the Section 121 exclusion are taxable. ${NEVADA_LAW.capitalGainsExclusion} ${LEGAL_DISCLAIMER}`,
            `Clark County transfer tax on a third-party sale is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000, for example ${NEVADA_LAW.transferTaxExample2M}. Cash buyers are common at the top tier, which shortens closing but raises the stakes on price and on private exposure.`,
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the section, the loan balance, the membership, who is living in the home, and where the case stands.' },
            { title: 'Neutral valuation', detail: 'A written value built on closed sales in your village, delivered to both spouses and both attorneys at the same time.' },
            { title: 'Buyout or sale test', detail: 'A side-by-side of what each spouse nets under a buyout versus a sale, including HOA layers, club deposit and tax items.' },
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
