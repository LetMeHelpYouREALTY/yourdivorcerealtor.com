import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { DirectAnswer } from '@/components/divorce/DirectAnswer';
import { DivorcePageTemplate } from '@/components/divorce/DivorcePageTemplate';
import { HighValueHomeNote } from '@/components/divorce/HighValueHomeNote';
import { KeyFacts } from '@/components/divorce/KeyFacts';
import { NextSteps } from '@/components/divorce/NextSteps';
import { PageFAQ } from '@/components/divorce/PageFAQ';
import { StructuredData } from '@/components/seo/StructuredData';
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

type INorthLasVegasProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-north-las-vegas';

const pageTitle = 'North Las Vegas Divorce Real Estate Agent | Dr. Jan Duffy';
const pageDescription = `North Las Vegas divorce real estate agent for Aliante, Eldorado, Tule Springs and the Nellis corridor. Valley median ${LVR_SEPT_2026.medianSfrPrice}. Plan a neutral valuation, buyout or sale.`;

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
    question: 'Can we sell our North Las Vegas house before the divorce is final?',
    answer: 'Yes. Most North Las Vegas divorce sales close before the decree under a written stipulation or a court order that names the agent, the pricing method, who lives in the home and how proceeds are held at escrow. Both spouses sign the listing and deed unless the order says otherwise. Proceeds are usually held until the decree directs distribution.',
  },
  {
    question: 'Is a buyout realistic for a North Las Vegas home?',
    answer: `Often yes. Most North Las Vegas homes price below the ${LUXURY_2026.jumboThreshold2026} conforming limit, so the refinance is a standard loan if the keeping spouse's income supports it alone. The usual obstacle is thin equity on a recent purchase, not loan size. A written pre-approval and a payoff statement settle the question quickly.`,
  },
  {
    question: 'What if one spouse has a VA loan on the home?',
    answer: 'A VA loan near Nellis Air Force Base is common. If the non-veteran spouse keeps the house, the loan usually must be refinanced into a conventional product, and the veteran should confirm entitlement is restored. If the veteran keeps it, a VA streamline or cash-out refinance may work. Confirm options with the lender before negotiating equity.',
  },
  {
    question: 'How are HOA fees handled when a North Las Vegas home sells in a divorce?',
    answer: 'Aliante, Eldorado and the newer villages near Tule Springs run master and sub-associations. Escrow orders a resale package and demand from each one, and transfer fees, delinquent dues and any special assessments settle at closing. Decide in the settlement who pays those items, because they come out of proceeds before the split.',
  },
  {
    question: 'How long will a North Las Vegas divorce sale take?',
    answer: `In September 2026, ${LVR_SEPT_2026.soldWithin30DaysPct} of Las Vegas area single-family homes sold within 30 days. North Las Vegas tract homes priced to same-model closings follow that pattern. The slower clock is the court: a contested motion waits weeks for a hearing, so file early and write escrow to close after the order is signed.`,
  },
  {
    question: 'Is the transfer to one spouse taxed?',
    answer: `${NEVADA_LAW.transferTaxDivorceExemption} A sale to a third party is taxed at ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of price. ${LEGAL_DISCLAIMER}`,
  },
];

export default async function NorthLasVegas(props: INorthLasVegasProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const currentPath = '/divorce-realtor-north-las-vegas';
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'North Las Vegas' }];
  const serviceSchema = generateServiceSchema(
    'North Las Vegas Divorce Real Estate Services',
    'Neutral divorce real estate representation in North Las Vegas, Nevada: valuation, buyout planning and court-aware home sales across Aliante, Eldorado, Tule Springs and the Nellis corridor.',
    'North Las Vegas',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const articleSchema = generateArticleSchema(pageTitle, pageDescription, `${siteUrl}${path}`, CONTENT_LAST_UPDATED, CONTENT_LAST_UPDATED);
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[localBusinessSchema, serviceSchema, realEstateAgentSchema, articleSchema, faqSchema]} />
      <DivorcePageTemplate
        h1="North Las Vegas Divorce Real Estate Agent"
        heroSubhead="Neutral valuation, buyout planning and court-aware sales across Aliante, Eldorado and the Nellis corridor"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How does a divorce home sale work in North Las Vegas?">
          A North Las Vegas home is community property under Nevada law, so both spouses sign the listing and deed, or a family court order replaces the missing signature. The sequence is a neutral valuation from same-model closings, a buyout test against the loan and the keeping spouse's income, then a sale or transfer plan timed to the court calendar and the HOA resale process.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Single-family homes sold, Sept 2026', value: LVR_SEPT_2026.sfrUnitsSold },
            { label: 'Sold within 30 days of listing', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Available single-family listings', value: LVR_SEPT_2026.availableSfrListings },
          ]}
          source={LVR_SEPT_2026.source}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>How North Las Vegas neighborhoods change a divorce sale</h2>
          <p>
            North Las Vegas is a separate city with its own recorder, permitting and code enforcement, and its housing splits into clear bands. A divorce sale in a newer Aliante tract follows a different path than one in the older subdivisions south of Craig Road. The neighborhood sets the comparable sales, the HOA layers and the likely loan type.
          </p>
          <p>
            The main areas and what each means for a divorcing owner:
          </p>
          <ul>
            <li>
              <strong>Aliante:</strong>
              {' '}
              A master plan around Aliante Golf Club with gated and non-gated tract villages and Sun City Aliante, an age-qualified community under its CC&Rs. Master and sub-association HOAs apply, and golf-frontage lots compare separately from interior lots.
            </li>
            <li>
              <strong>Eldorado:</strong>
              {' '}
              A 1990s master plan along Ann Road and Centennial Parkway with a mature inventory of tract homes and a lighter HOA structure. Same-model closings are plentiful.
            </li>
            <li>
              <strong>Tule Springs and the Villages at Tule Springs:</strong>
              {' '}
              The newest tract villages at the city's northern edge, where recent builder purchase prices anchor value and warranties may still be in force.
            </li>
            <li>
              <strong>The Nellis corridor and the Craig Ranch area:</strong>
              {' '}
              Subdivisions near Nellis Air Force Base and the North Las Vegas VA Medical Center, where VA financing is common and relocation timelines often drive the sale date.
            </li>
            <li>
              <strong>The original city core:</strong>
              {' '}
              Pre-1990 homes near Lake Mead Boulevard and Civic Center Drive, often without an HOA, on larger lots with more variation in condition and permitting history.
            </li>
          </ul>

          <h2>What a North Las Vegas house is worth when both spouses need the number</h2>
          <p>
            A divorce valuation has to satisfy two attorneys and sometimes a judge. It should rest on closed sales of the same model or the same street, adjusted for lot, pool, upgrades and condition, and be written so either spouse can hand it to counsel. List prices and online estimates are not evidence of value.
          </p>
          <p>
            North Las Vegas trades mostly below the valley median of
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            , which has two consequences. First, a broker price opinion with recent same-model closings usually settles the number without a formal appraisal, because tract inventory is uniform. Second, small adjustments matter more. A pool, a three-car garage or a corner lot can be a meaningful share of equity, so the comparables must be true matches.
          </p>
          <p>
            The exceptions are golf-frontage homes in Aliante and the larger custom lots in the older core, where the comparable set is thin. For those, a formal appraisal with a written reconciliation rule is worth the fee.
          </p>

          <h2>Can one spouse keep the North Las Vegas home?</h2>
          <p>
            A buyout works when the keeping spouse can refinance in one name, pay the other spouse their share of equity, and still carry the payment, taxes, insurance and HOA dues after the decree. In North Las Vegas the loan size is rarely the obstacle, because most homes sit below the
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            conforming limit. The usual obstacles are thin equity and single-income qualification.
          </p>
          <ul>
            <li>
              <strong>Recent purchases.</strong>
              {' '}
              A home bought in the last few years in Tule Springs or Aliante may have little equity after selling costs. A buyout can still work with a small equalizing payment, but the number must be honest.
            </li>
            <li>
              <strong>VA and FHA loans.</strong>
              {' '}
              A VA loan held by one spouse cannot simply be assumed by the other without lender approval, and the veteran's entitlement stays tied to the loan until it is refinanced or released.
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
            ). The house is one line in that division, so a buyout that looks even on the home alone may not be even once retirement accounts, vehicles and debt are counted.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Selling a North Las Vegas home while the case is open</h2>
          <p>
            Most North Las Vegas divorce sales close before the decree, under a stipulation or court order that names the agent, the pricing method, who occupies the home and how net proceeds are held at escrow. A neutral agent reports every showing, offer and price discussion to both spouses in writing at the same time.
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
            homes available for buyers to compare against. The court calendar is slower. A contested motion in Clark County family court waits weeks for a hearing, so file early and write escrow to close only after the order is signed.
          </p>
          <p>
            Preparation matters more in a uniform tract market. The buyer is comparing your home against the same floor plan a few streets away, so deferred maintenance, a half-emptied house and an unpermitted conversion all show up in the offer. A short written plan for repairs, staging and showing windows around the occupying spouse keeps the sale on schedule.
          </p>

          <h2>HOA, permits and the North Las Vegas close</h2>
          <p>
            Aliante, Eldorado and the Tule Springs villages run through master and sub-associations, and each one must deliver a resale package and a payoff demand before closing. Order them the week the listing goes live, not the week before closing, so transfer fees, back dues and any special assessment are known when offers are negotiated.
          </p>
          <p>
            Homes in the older core often sit outside an HOA, which removes that step but raises another. Unpermitted additions, converted garages and casitas are common, and the City of North Las Vegas records are the reference. A buyer's appraiser and inspector will flag them, so the settlement should decide in advance who pays to permit or remove the work, or whether the price absorbs it.
          </p>
          <p>
            With the HOA packages, permits and proceeds instructions handled early, the house is usually the least contested asset in a North Las Vegas divorce.
          </p>
        </div>

        <HighValueHomeNote
          points={[
            `A buyout refinance above ${LUXURY_2026.jumboThreshold2026} is a jumbo loan with tighter reserve and income rules. Only a small share of North Las Vegas homes reach that line, mostly golf-frontage lots in Aliante and larger custom properties, so confirm the loan type before negotiating equity.`,
            'Where the comparable set is thin, two independent appraisals with a written reconciliation rule protect both spouses from a single outlier report.',
            `Gains above the Section 121 exclusion are taxable. ${NEVADA_LAW.capitalGainsExclusion} ${LEGAL_DISCLAIMER}`,
            `Clark County transfer tax on a third-party sale is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of price. A decree-based transfer between spouses is exempt, so the method of division changes the closing costs.`,
            'Gated sections of Aliante register buyer agents at the gate. Showings there are by appointment, which protects the occupying spouse and favors pre-qualified buyers.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the neighborhood, the loan type, who is living in the home, and where the case stands.' },
            { title: 'Neutral valuation', detail: 'A written value built on same-model closings, delivered to both spouses and both attorneys at the same time.' },
            { title: 'Buyout or sale test', detail: 'A side-by-side of what each spouse nets under a buyout versus a sale, including HOA, permit and tax items.' },
            { title: 'Court-aligned plan', detail: 'A listing or transfer timeline matched to your stipulation or order, with escrow instructions drafted to it.' },
          ]}
          callPromise="You leave the call with a value range, a buyout verdict, and the next decision."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
      <RealScoutHomeValue />
      <RealScoutFamilyHomes />
    </>
  );
}
