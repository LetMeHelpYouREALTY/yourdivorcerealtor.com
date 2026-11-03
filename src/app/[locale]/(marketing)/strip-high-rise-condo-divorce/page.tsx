import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { DirectAnswer } from '@/components/divorce/DirectAnswer';
import { DivorcePageTemplate } from '@/components/divorce/DivorcePageTemplate';
import { HighValueHomeNote } from '@/components/divorce/HighValueHomeNote';
import { KeyFacts } from '@/components/divorce/KeyFacts';
import { NextSteps } from '@/components/divorce/NextSteps';
import { PageFAQ } from '@/components/divorce/PageFAQ';
import { StructuredData } from '@/components/seo/StructuredData';
import { CONTENT_LAST_UPDATED, toSchemaDateTime } from '@/lib/content-dates';
import { COMMUNITY_12MO, LEGAL_DISCLAIMER, LUXURY_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateLocalBusinessSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type IStripHighRiseProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/strip-high-rise-condo-divorce';
const waldorf = COMMUNITY_12MO.waldorfAstoriaStrip;

const pageTitle = 'Strip High-Rise Condo Divorce Sales | Dr. Jan Duffy';
const pageDescription = `Dividing a Las Vegas high-rise condo in a divorce? Waldorf Astoria resales median ${waldorf.median}. See how HOA dues, rental rules and warrantability shape the sale.`;

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
    question: 'Why is a high-rise condo harder to finance than a house in a divorce buyout?',
    answer: `Lenders underwrite the building as well as the borrower. A tower that fails agency warrantability review, because of owner-occupancy ratios, commercial space, litigation, reserves or a hotel rental program, cannot get a conforming or standard jumbo loan. The buyout then needs a portfolio lender or cash. Confirm the building's status before the buyout number goes into the settlement.`,
  },
  {
    question: 'How do appraisers value a Strip high-rise unit?',
    answer: `From sales in the same tower first, then the same stack and floor band, then comparable towers. Floor height, orientation and view corridor set the premium. At Waldorf Astoria, the 12-month median resale was ${waldorf.median} at ${waldorf.pricePerSqFt} per square foot across ${waldorf.closings} closings, so a single tower can supply its own comparables. Two units of the same plan can still differ by view alone.`,
  },
  {
    question: 'Do rental restrictions affect what the condo is worth?',
    answer: `Yes. A tower that prohibits short-term rentals, one that allows them, and a hotel-condo with a managed rental program each attract different buyers and different lenders. The restriction is in the CC&Rs and the HOA's rules, and it changes both the buyer pool and the financing. Get the current rules into the file before pricing.`,
  },
  {
    question: 'Who pays the HOA dues while the condo is listed?',
    answer: `Usually the spouse occupying the unit, with reimbursement settled from proceeds. High-rise dues cover staffed lobby and valet, building insurance, amenities and reserves, so they are a large monthly figure. Any pending special assessment belongs in the settlement too, because the resale certificate will disclose it and the buyer will ask who pays.`,
  },
  {
    question: 'Can a high-rise condo be sold privately during a divorce?',
    answer: `Yes, within MLS rules. Showings run through the building's concierge or front desk by appointment, and the unit is never shown without notice. Private exposure to agent networks before public syndication is available if the settlement states how long the private window lasts. Listing remarks never mention the divorce.`,
  },
  {
    question: 'What taxes apply to a condo sale in a divorce?',
    answer: `${NEVADA_LAW.capitalGainsExclusion} The exclusion applies only if the condo was the main residence; a second home or rental does not qualify. Clark County transfer tax is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 on a sale, but a deed between spouses under the decree is exempt. ${LEGAL_DISCLAIMER}`,
  },
];

export default async function StripHighRiseCondoDivorce(props: IStripHighRiseProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = path;
  const articleSchema = generateArticleSchema(
    'Strip High-Rise Condo Divorce Sales in Las Vegas',
    pageDescription,
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'Las Vegas Strip' }];
  const serviceSchema = generateServiceSchema(
    'High-Rise Condo Divorce Real Estate Services',
    pageDescription,
    'Las Vegas Strip',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, localBusinessSchema, serviceSchema, realEstateAgentSchema, faqSchema]} />
      <DivorcePageTemplate
        h1="Strip High-Rise Condo Divorce Sales"
        heroSubhead="Waldorf Astoria, Veer, Turnberry Place, Palms Place and One Queensridge Place, handled by a neutral agent"
        showHomeValue
        showCondoListings
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How is a Las Vegas high-rise condo handled in a divorce?">
          A high-rise condo is valued from sales in the same tower, adjusted for floor and view, and financed
          only if the building passes lender warrantability review. HOA dues, pending assessments and rental
          restrictions change both the value and the buyer pool. At Waldorf Astoria, 12-month resales ran a
          median of
          {' '}
          {waldorf.median}
          {' '}
          at
          {' '}
          {waldorf.pricePerSqFt}
          {' '}
          per square foot. A neutral agent runs showings through the concierge and reports to both spouses on the same schedule.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Waldorf Astoria median resale, 12 months', value: waldorf.median },
            { label: 'Waldorf Astoria closings, 12 months', value: waldorf.closings },
            { label: 'Waldorf Astoria price per square foot', value: waldorf.pricePerSqFt },
            { label: '2026 jumbo loan line, Clark County', value: LUXURY_2026.jumboThreshold2026 },
          ]}
          source={`${COMMUNITY_12MO.source}, ${COMMUNITY_12MO.asOf}; ${LUXURY_2026.jumboSource}`}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>The towers, and why a condo divorce differs from a house</h2>
          <p>
            The Las Vegas high-rise market centers on a handful of towers. Waldorf Astoria Residences and
            Veer Towers sit inside CityCenter on the Strip. Turnberry Place is east of the Strip near the
            convention corridor. Palms Place is west of the Strip on Flamingo Road, attached to the Palms. One
            Queensridge Place is in Summerlin, near Rampart and the Badlands, with Strip views from upper floors.
          </p>
          <p>
            Each building has its own HOA, its own rental rules, its own lender status and its own price per
            square foot. Waldorf Astoria recorded
            {' '}
            {waldorf.closings}
            {' '}
            resales in 12 months at a median of
            {' '}
            {waldorf.median}
            {' '}
            and
            {' '}
            {waldorf.pricePerSqFt}
            {' '}
            per square foot, a figure no single-family community in the valley approaches.
          </p>
          <p>
            A house is valued against a neighborhood. A condo is valued against its own tower and judged by
            lenders as a building before the borrower is considered. That is why a condo divorce needs four
            documents on day one: the current CC&Rs and rules, the HOA budget and reserve study, the resale
            certificate, and the building's current lender warrantability status.
          </p>

          <h2>HOA dues, assessments and who pays until closing</h2>
          <p>
            High-rise dues are large because they fund staffed lobbies, valet, security, building insurance,
            elevators, pools, fitness facilities and reserves. Dues are usually set per unit based on square
            footage. They continue until closing regardless of who occupies the unit, so the settlement should
            assign them, along with utilities and the mortgage, and state how reimbursement is handled from proceeds.
          </p>
          <p>
            Special assessments are the hidden item. A tower facing facade work, elevator modernization or an
            insurance increase may have an assessment pending or already levied. The resale certificate discloses it,
            the buyer will ask who pays, and the answer should already be in the decree. Ask the HOA for minutes
            from the last year of board meetings before pricing.
          </p>

          <h2>Rental restrictions and lender warrantability</h2>
          <p>
            Rental rules differ by tower. Some prohibit short-term rentals outright. Some allow long-term leases
            with a minimum term. Palms Place operates as a hotel-condo with a managed rental program. Those rules
            are in the CC&Rs and the HOA's current policies, and they decide which buyers can use the unit and
            therefore which buyers will pay for it.
          </p>
          <p>
            Warrantability is the lending side of the same question. Fannie Mae, Freddie Mac and most jumbo
            investors review the building: owner-occupancy ratio, share of commercial space, pending litigation,
            reserve funding, single-entity ownership concentration and any hotel rental program. A tower that
            fails review is non-warrantable, and buyers there need a portfolio lender or cash. That shrinks the
            buyer pool and affects the price.
          </p>
          <p>
            For a divorce buyout, the same review applies to the spouse keeping the unit. A conforming
            refinance works only in a warrantable building and only below
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            . Above the line, or in a non-warrantable tower, the buyout needs a jumbo or portfolio lender with a
            written pre-approval at the full amount. The
            {' '}
            <Link href="/divorce-buyout-options">buyout options guide</Link>
            {' '}
            covers structures when a refinance will not close in time.
          </p>

          <h2>View pricing and same-tower comparables</h2>
          <p>
            Appraisers and buyers price high-rise units by floor and view before anything else. A Strip-facing
            unit on a high floor and a parking-facing unit on a low floor with the same floor plan close far apart.
            Corner units, terrace size and whether the view is protected by setbacks or exposed to future
            construction all move the number.
          </p>
          <p>
            Comparables come from the same tower first, ideally the same stack and a nearby floor band. Only
            when the tower lacks recent sales does an appraiser reach for a comparable building, and the
            adjustment between towers is large. That is why a divorce valuation should start with a full list of
            closed and pending sales in the building, including floor, orientation and sale terms.
          </p>
          <p>
            A two-appraisal protocol works for condos as it does for custom homes: each spouse chooses an
            appraiser, both get the same package, and the attorneys set a tolerance band in advance. A broker
            price opinion adds what the reports miss, including which units in the building are listed now and
            how long they have sat. The
            {' '}
            <Link href="/divorce-home-valuation">divorce home valuation page</Link>
            {' '}
            explains how the reports are reconciled.
          </p>

          <h2>Showings, privacy, taxes and the settlement language</h2>
          <p>
            Showings run through the building's concierge or front desk by appointment. The buyer agent is
            registered, the visit is logged, and proof of funds or a pre-approval is confirmed first, applied the
            same way to every buyer. The unit is never shown without notice. Listing remarks and photos never
            mention the divorce, and the agent handles buyer questions so neither spouse has to.
          </p>
          <p>
            Private exposure before the MLS is available within MLS rules if both spouses agree and the
            settlement states how long the private window lasts. Cash buyers are common in the towers, in part
            because of financing limits, and cash shortens the timeline but often comes with a price expectation.
          </p>
          <p>
            {NEVADA_LAW.capitalGainsExclusion}
            {' '}
            The exclusion applies only if the condo was the main residence. A unit held as a second home or a
            rental does not qualify, and gain on it is fully taxable at the federal level. Clark County transfer
            tax is
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000 on an open-market sale.
            {' '}
            {NEVADA_LAW.transferTaxDivorceExemption}
            {' '}
            {LEGAL_DISCLAIMER}
            {' '}
            For the valley-wide picture, see the
            {' '}
            <Link href="/luxury-divorce-real-estate-las-vegas">luxury divorce real estate guide</Link>
            .
          </p>

          <h2>If the court orders the sale of the unit</h2>
          <p>
            When spouses cannot agree, the court can order the sale and set the terms. The order usually names
            the listing agent, fixes the list price or the method for setting it, schedules reductions, assigns
            occupancy and carrying costs, and states how offers are accepted. Nevada's rule is equal division of
            community property unless the judge writes down a compelling reason not to (
            {NEVADA_LAW.communityPropertyCite}
            ).
          </p>
          <p>
            For a high-rise unit, the order should address the building file: who obtains the resale
            certificate, who pays any special assessment levied before closing, and whether the unit may be
            leased while listed if the tower allows it. It should also say whether a private-exposure window is
            allowed and what happens if one spouse refuses to sign a listing amendment or closing documents.
          </p>
          <p>
            Financing terms belong in the order too. If the tower is non-warrantable, the order can state that
            cash and portfolio-loan offers are acceptable and that the list price reflects that buyer pool.
            That prevents one spouse from rejecting every offer because it is not a conventional loan. A
            court-appointed neutral agent gives both attorneys the same showing log from the concierge, the same
            feedback and the same offer summaries on the same day. The
            {' '}
            <Link href="/court-ordered-home-sale">court-ordered home sale page</Link>
            {' '}
            lays out the procedure step by step.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>
        </div>

        <HighValueHomeNote points={[
          `At ${waldorf.pricePerSqFt} per square foot, most Strip tower resales are well above ${LUXURY_2026.jumboThreshold2026}, and a buyout needs a jumbo or portfolio lender that accepts the building. Confirm warrantability before negotiating the number.`,
          'Comparables come from the same tower, stack and floor band. Build the valuation from a full list of closed and pending sales in the building with floor, orientation and terms.',
          'HOA dues and any pending special assessment continue until closing. Assign them in the decree and get the last year of board minutes before pricing.',
          'Rental restrictions and hotel-condo programs change the buyer pool and the financing. Put the current CC&Rs and rules in the file on day one.',
          'Concierge showings are scheduled and logged. A private-exposure window before the MLS is available if the settlement allows it, and cash buyers are a large part of this market.',
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the tower, the unit, how it has been used, and the timeline your attorneys are working toward.' },
            { title: 'Building file', detail: 'CC&Rs, HOA budget and reserves, resale certificate and lender warrantability status, gathered before any number is discussed.' },
            { title: 'Valuation package', detail: 'A broker price opinion built on same-tower comparables, with a recommended appraisal protocol for counsel.' },
            { title: 'Neutral execution', detail: 'Concierge showings, identical updates to both spouses, and a closing calendar that matches the decree.' },
          ]}
          callPromise="You leave the call with a value range, a financing answer for the building, and a clear next decision."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
