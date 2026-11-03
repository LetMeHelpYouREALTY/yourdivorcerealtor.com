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

type IHendersonProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-henderson';

const pageTitle = 'Henderson Divorce Real Estate Agent | Dr. Jan Duffy';
const pageDescription = `Henderson divorce real estate agent for Green Valley, Anthem, Seven Hills, MacDonald Highlands and Lake Las Vegas. $1M+ median ${COMMUNITY_12MO.henderson1MPlus.median}. Plan sale or buyout.`;

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
    question: 'Do we both have to sign to list our Henderson house during the divorce?',
    answer: 'Usually yes. If both names are on title, both spouses sign the listing agreement, the purchase contract and the deed. When one spouse will not sign, your attorney can ask the family court for an order authorizing the sale, and escrow then follows that order. A signed stipulation between spouses is faster than a contested motion.',
  },
  {
    question: 'How is a MacDonald Highlands or Anthem Country Club home valued for a buyout?',
    answer: 'Custom and golf-frontage homes in Henderson trade on view, lot and finish quality, so two appraisers can land far apart. A practical method is a broker price opinion plus one or two independent appraisals, with both spouses agreeing in advance on how to average or reconcile them. Club membership deposits are valued separately from the house.',
  },
  {
    question: 'Can one spouse keep a Henderson home with a mortgage above the jumbo line?',
    answer: `A refinance above ${LUXURY_2026.jumboThreshold2026} is a jumbo loan. Lenders look at the keeping spouse's income alone, plus the new support obligations in the decree. Many Henderson buyouts fail at this step, so get a written pre-approval before you negotiate the equity figure, not after.`,
  },
  {
    question: 'Does Henderson charge transfer tax when the house moves to one spouse?',
    answer: `${NEVADA_LAW.transferTaxDivorceExemption} A sale to a third party is taxed at ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of price. ${LEGAL_DISCLAIMER}`,
  },
  {
    question: 'How long does a Henderson divorce home sale take?',
    answer: `In September 2026, ${LVR_SEPT_2026.soldWithin30DaysPct} of Las Vegas area single-family homes sold within 30 days of listing. Henderson homes priced to recent closings follow that pattern. Guard-gated and custom properties take longer because the buyer pool is smaller and financing is jumbo. The court calendar, not the market, is usually the slower clock.`,
  },
  {
    question: 'What happens to the HOA account when a Henderson home sells or transfers?',
    answer: 'Every Henderson master plan runs through an HOA, and many homes sit under a master association plus a sub-association. Escrow orders a resale package and demand for each one, and transfer fees and any special assessments are settled at closing. Decide in the settlement who pays those fees and any dues that are behind.',
  },
];

export default async function Henderson(props: IHendersonProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/divorce-realtor-henderson';
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'Henderson' }];
  const serviceSchema = generateServiceSchema(
    'Henderson Divorce Real Estate Services',
    'Neutral divorce real estate representation in Henderson, Nevada: valuation, buyout planning and court-aware home sales across Green Valley, Anthem, Seven Hills, MacDonald Highlands and Lake Las Vegas.',
    'Henderson',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const articleSchema = generateArticleSchema(pageTitle, pageDescription, `${siteUrl}${path}`, CONTENT_LAST_UPDATED, CONTENT_LAST_UPDATED);
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[localBusinessSchema, serviceSchema, realEstateAgentSchema, articleSchema, faqSchema]} />
      <DivorcePageTemplate
        h1="Henderson Divorce Real Estate Agent"
        heroSubhead="Neutral valuation, buyout planning and court-aware sales from Green Valley to Lake Las Vegas"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How does a divorce home sale work in Henderson, Nevada?">
          Henderson homes are community property under Nevada law, so both spouses sign the listing, the contract and the deed, or a family court order replaces the missing signature. The work starts with a neutral valuation, then a buyout test against current financing, then a sale plan that fits the court calendar. Guard-gated and golf-course villages add club, HOA and showing steps.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Henderson $1M+ median sale, Q3 2026', value: COMMUNITY_12MO.henderson1MPlus.median },
            { label: 'Henderson $1M+ closings, Q3 2026', value: COMMUNITY_12MO.henderson1MPlus.closings },
            { label: 'Henderson $1M+ median days on market', value: COMMUNITY_12MO.henderson1MPlus.medianDom },
            { label: 'MacDonald Highlands 12-month median', value: COMMUNITY_12MO.macdonaldHighlands.median },
          ]}
          source={COMMUNITY_12MO.source}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>How Henderson's villages change a divorce sale</h2>
          <p>
            Henderson is a city of master plans, and each one sets its own rules for access, dues and resale. A divorce sale in Green Valley follows a different path than one inside the gates of MacDonald Highlands or on the water at Lake Las Vegas. The village decides who can show the home, what the HOA charges at transfer, and how wide the buyer pool is.
          </p>
          <p>
            The main areas and what they mean for a divorcing owner:
          </p>
          <ul>
            <li>
              <strong>Green Valley and Green Valley Ranch:</strong>
              {' '}
              Henderson's original master plan, with tract homes from the 1980s through the 2000s, townhomes along Green Valley Parkway, and a few gated custom pockets. Deep comparable data makes valuation disputes rare.
            </li>
            <li>
              <strong>Anthem:</strong>
              {' '}
              Three products under one name. Anthem Country Club is guard-gated with golf frontage, Sun City Anthem is an age-qualified community under its CC&Rs, and Anthem Highlands is open tract housing. Each has a separate HOA and a separate buyer pool.
            </li>
            <li>
              <strong>Seven Hills:</strong>
              {' '}
              Gated and guard-gated sections around Rio Secco Golf Club, with semi-custom homes and Strip-view lots that price differently from interior lots a street away.
            </li>
            <li>
              <strong>MacDonald Highlands:</strong>
              {' '}
              Guard-gated custom estates on the slope of Black Mountain around DragonRidge Country Club. Lot elevation and view corridor drive price more than square footage.
            </li>
            <li>
              <strong>Lake Las Vegas:</strong>
              {' '}
              SouthShore and Reflection Bay golf estates, MonteLago Village condos, and lakefront custom lots. Seasonal demand and resort HOA structures lengthen the sale timeline.
            </li>
            <li>
              <strong>Cadence, Inspirada, Whitney Ranch, Tuscany and Madeira Canyon:</strong>
              {' '}
              Newer tract villages and townhome product where most Henderson divorce sales happen, with master and sub-association HOAs and limited gate staffing.
            </li>
          </ul>

          <h2>What a Henderson house is worth when both spouses need the number</h2>
          <p>
            A divorce valuation has to survive two attorneys and sometimes a judge. The number should rest on closed Henderson sales from the same village, adjusted for lot, view, pool and condition, and it should be written up so either spouse can hand it to counsel. Online estimates and listing prices are not evidence of value.
          </p>
          <p>
            Henderson's price spread is wide. The valley single-family median was
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            {' '}
            in September 2026, while Henderson homes above $1 million posted a median of
            {' '}
            {COMMUNITY_12MO.henderson1MPlus.median}
            {' '}
            at about
            {' '}
            {COMMUNITY_12MO.henderson1MPlus.pricePerSqFt}
            {' '}
            per square foot in the third quarter. Anthem Country Club closings over the last year ranged from
            {' '}
            {COMMUNITY_12MO.anthemCountryClub.range}
            . That range inside one gate is why a per-square-foot shortcut fails in Henderson. The right comparables are the three to six homes most like yours, not the village average.
          </p>
          <p>
            For tract homes in Green Valley, Inspirada or Cadence, a broker price opinion with recent same-model sales usually settles the question. For custom homes in MacDonald Highlands or Seven Hills, plan on a formal appraisal, and sometimes two, because appraisers weigh view and finish differently.
          </p>

          <h2>Can one spouse keep the Henderson home?</h2>
          <p>
            A buyout works when the keeping spouse can refinance in one name, pay the other spouse their share of equity, and still carry the payment, dues and taxes after the decree. In Henderson that test depends on price band. Below the conforming loan limit, the refinance is routine if income supports it. Above
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            , the loan is jumbo and underwriting tightens.
          </p>
          <p>
            Three Henderson-specific items change the buyout math:
          </p>
          <ul>
            <li>
              <strong>HOA dues and club fees.</strong>
              {' '}
              A guard-gated village with golf membership can add a meaningful monthly obligation that a lender counts against the keeping spouse's ratios.
            </li>
            <li>
              <strong>Equity source.</strong>
              {' '}
              If the equity is paid with retirement assets or a note instead of cash, the decree must spell out timing, interest and security on the house.
            </li>
            <li>
              <strong>Transfer mechanics.</strong>
              {' '}
              {NEVADA_LAW.transferTaxDivorceExemption}
              {' '}
              The deed is recorded with the decree, and the released spouse should confirm the old loan is paid off, not just assumed.
            </li>
          </ul>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            (
            {NEVADA_LAW.communityPropertyCite}
            ). The house is only one line in that division, so a buyout that looks fair on the home alone may not be fair once retirement accounts and debt are counted.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Selling a Henderson home while the case is open</h2>
          <p>
            Most Henderson sales during a divorce happen before the decree, under a written agreement or a court order that names the agent, the list price method, who lives in the home, and how net proceeds are held at escrow. A neutral agent reports to both spouses in writing at the same time, so neither side gets information first.
          </p>
          <p>
            Timing in Henderson is driven by two calendars. The market calendar is fast for priced-right tract homes;
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of valley single-family homes sold within 30 days in September 2026. The court calendar is slower. Clark County family court motions take weeks to be heard, so a sale that needs an order should file early. Escrow can be set to close only after the order is signed.
          </p>
          <p>
            Guard-gated villages add a showing protocol. Anthem Country Club, MacDonald Highlands, Seven Hills and the Lake Las Vegas gates each require buyer agents to be registered at the gate, and some limit open houses. That protects the occupying spouse's privacy and also means fewer, better-qualified showings.
          </p>

          <h2>Henderson's luxury enclaves in a divorce</h2>
          <p>
            Henderson accounted for
            {' '}
            {LUXURY_2026.hendersonShare2025}
            {' '}
            of the valley's $1 million-plus sales in 2025, second only to Summerlin. Those sales cluster in MacDonald Highlands, Anthem Country Club, Seven Hills and Lake Las Vegas, where a divorce transaction carries extra steps that a standard listing does not.
          </p>
          <ul>
            <li>
              <strong>MacDonald Highlands:</strong>
              {' '}
              A 12-month median of
              {' '}
              {COMMUNITY_12MO.macdonaldHighlands.median}
              {' '}
              across
              {' '}
              {COMMUNITY_12MO.macdonaldHighlands.closings}
              {' '}
              closings, with a top sale of
              {' '}
              {COMMUNITY_12MO.macdonaldHighlands.topSale}
              . DragonRidge membership is a separate contract with its own transfer terms.
            </li>
            <li>
              <strong>Anthem Country Club:</strong>
              {' '}
              Median
              {' '}
              {COMMUNITY_12MO.anthemCountryClub.median}
              {' '}
              across
              {' '}
              {COMMUNITY_12MO.anthemCountryClub.closings}
              {' '}
              closings. Golf-frontage and interior lots must be compared separately.
            </li>
            <li>
              <strong>Seven Hills and Lake Las Vegas:</strong>
              {' '}
              Strip-view and lakefront premiums are real but inconsistent, so settlement agreements should name the valuation method before listing.
            </li>
          </ul>
          <p>
            Cash buyers are common at this tier, which shortens closing but raises the stakes on price. Off-market exposure to a short list of qualified buyers can protect privacy during a contested case, as long as both spouses agree in writing to that strategy.
          </p>

          <h2>The volume market: Green Valley, Inspirada, Cadence and Whitney Ranch</h2>
          <p>
            Most Henderson divorce sales involve a tract home with a master HOA, a sub-association and a conforming loan. These sales move quickly when the price matches same-model closings and the home shows well despite one spouse having moved out. The common mistakes are listing at a number one spouse needs rather than a number the market supports, and leaving the HOA resale package until the last week of escrow.
          </p>
          <p>
            A clear plan covers who pays for repairs and staging, how showings work around the occupying spouse's schedule, and where proceeds sit until the decree directs distribution. With that in writing, a Henderson tract home sale is usually the least contested part of the case.
          </p>
        </div>

        <HighValueHomeNote
          points={[
            `A buyout refinance above ${LUXURY_2026.jumboThreshold2026} is jumbo. Expect reserve requirements and full income review of the keeping spouse alone, with support payments from the decree counted as income or debt.`,
            'MacDonald Highlands and Seven Hills custom homes often draw appraisals that differ by hundreds of thousands. Agree on a two-appraisal protocol and a reconciliation rule before either spouse orders one.',
            'DragonRidge and Anthem Country Club memberships are separate assets with their own transfer and resignation terms. List them in the settlement, not just the house.',
            `Gains above the Section 121 exclusion are taxable. ${NEVADA_LAW.capitalGainsExclusion} ${LEGAL_DISCLAIMER}`,
            `Real property transfer tax on a third-party sale is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 in Clark County, for example ${NEVADA_LAW.transferTaxExample2M}. Decide in the settlement who bears it.`,
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the Henderson village, the loan, who is living in the home, and where the case stands.' },
            { title: 'Neutral valuation', detail: 'A written value based on closed sales in your village, delivered to both spouses and both attorneys at the same time.' },
            { title: 'Buyout or sale test', detail: 'A side-by-side of what each spouse nets under a buyout versus a sale, including HOA, club and tax items.' },
            { title: 'Court-aligned plan', detail: 'A listing or transfer timeline that matches your stipulation or order, with escrow instructions drafted to it.' },
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
