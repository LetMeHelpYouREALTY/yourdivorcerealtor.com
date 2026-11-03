import type { Metadata } from 'next';
import type { PageProps } from '@/types';
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
import { LEGAL_DISCLAIMER, LUXURY_2026, LVR_SEPT_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

export const dynamic = 'force-dynamic';

const path = '/how-to-sell-house-during-divorce';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'How to Sell a House During Divorce: 10 Steps | Dr. Jan Duffy',
    description: 'Follow 10 steps to sell a house during divorce in Las Vegas: valuation, attorney sign-off, neutral listing, offers, and a closing that matches the decree.',
    alternates: { canonical, languages },
  };
}

export default async function HowToSellHouseDuringDivorce(props: PageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/how-to-sell-house-during-divorce';

  const faqs = [
    {
      question: 'What is the first step to selling a house during a divorce?',
      answer: 'Get a written valuation both spouses can accept, then take it to your attorneys. Every later decision, from whether to sell at all to how proceeds split, rests on that number. A comparative market analysis is enough when spouses agree. A jointly ordered appraisal settles it when they do not.',
    },
    {
      question: 'Do both spouses have to sign the listing agreement?',
      answer: 'Yes, if both are on title. The listing agreement, the purchase contract, and the deed each need both signatures unless a court order authorizes one spouse or a court-appointed agent to sign. Ask your attorney to put signing authority in the stipulation so a missed signature cannot stall escrow.',
    },
    {
      question: 'How long does it take to sell a house during a divorce in Las Vegas?',
      answer: `Las Vegas REALTORS® reported that ${LVR_SEPT_2026.soldWithin30DaysPct} of single-family homes sold within 30 days in September 2026. Add the time before listing for valuation, attorney review, and an agreed showing plan, and the time after contract for the buyer's financing and the recording of any order.`,
    },
    {
      question: 'Who decides which offer to accept?',
      answer: 'Both spouses, unless an order gives the decision to one spouse or to a court-appointed agent. Each offer is summarized on one page showing price, financing, contingencies, and the net to each spouse, then sent to both at the same time with a response deadline. Counteroffers need both signatures.',
    },
    {
      question: 'What mistakes cause divorce sales to fall apart?',
      answer: 'Pricing to a buyout number instead of the market, letting one spouse control showing access, skipping a pre-listing inspection, and leaving the proceeds split undefined until closing. Each one is fixed by writing the decision into the listing addendum before the sign goes up.',
    },
    {
      question: 'What changes if the home is above the jumbo loan line?',
      answer: `Above ${LUXURY_2026.jumboThreshold2026}, buyer financing is jumbo and takes longer to underwrite, appraisals spread widely on custom homes, and club memberships or guard-gate rules need their own paragraph in the plan. Cash buyers are common at this tier, which shortens escrow but raises the bar on price justification.`,
    },
  ];

  const articleSchema = generateArticleSchema(
    'How to Sell a House During Divorce: 10 Steps',
    'A ten-step guide to selling a house during divorce in Las Vegas: valuation, attorney coordination, neutral listing, preparation, marketing, offers, inspections, closing, and proceeds.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Home Sale Guide Services',
    'Step-by-step listing support for divorcing homeowners in Las Vegas, from valuation through court-compliant closing.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="How to Sell a House During Divorce: 10 Steps"
        heroSubhead="From the first valuation to the escrow split, in the order it has to happen"
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
        showHomeValue
        currentPath={currentPath}
      >
        <DirectAnswer question="How do I sell a house during a divorce?">
          Get a written valuation both spouses accept, have your attorneys approve the sale terms, and
          sign one listing agreement with a neutral agent. Prepare and show the home on an agreed
          schedule, review every offer together, and close with escrow instructions that match your
          settlement or court order. The ten steps below cover each decision in order.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, September 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Homes sold within 30 days of listing', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Available single-family listings', value: LVR_SEPT_2026.availableSfrListings },
          ]}
          source={LVR_SEPT_2026.source}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Steps 1 to 3: decide, value, and get legal sign-off</h2>
          <p>
            Before anything is listed, you need three things: a decision that selling beats a buyout or
            temporary co-ownership, a valuation both spouses and attorneys accept, and written approval
            of the sale terms. Skipping any of these is the most common reason a divorce listing stalls
            in its first month.
          </p>
          <h3>Step 1: understand your options</h3>
          <ul>
            <li>
              <strong>Sell and split:</strong>
              {' '}
              a clean break, with net proceeds divided per the decree.
            </li>
            <li>
              <strong>Buyout:</strong>
              {' '}
              one spouse refinances and pays the other's share.
            </li>
            <li>
              <strong>Deferred sale:</strong>
              {' '}
              co-own for a set period with a written exit date.
            </li>
          </ul>
          <p>
            Compare them on
            {' '}
            <Link href="/divorce-property-division" className="text-blue-600 underline hover:text-blue-700">divorce property division options</Link>
            {' '}
            and
            {' '}
            <Link href="/divorce-buyout-options" className="text-blue-600 underline hover:text-blue-700">buyout options</Link>
            .
          </p>
          <h3>Step 2: get a valuation that holds up</h3>
          <p>
            A divorce valuation includes closed comparable sales from the same community and size band,
            an equity calculation after the mortgage and liens, and a net proceeds estimate after
            commissions and closing costs. Attorneys put that number in the division worksheet, so it
            should come with its comparables attached. Start at
            {' '}
            <Link href="/divorce-home-valuation" className="text-blue-600 underline hover:text-blue-700">divorce home valuation</Link>
            .
          </p>
          <h3>Step 3: coordinate with your attorneys</h3>
          <p>
            Your attorney confirms whether the sale needs a stipulation, a court order, or only both
            signatures. The listing terms, who may sign, and how proceeds split should be written down
            before listing. If a spouse later refuses to cooperate, that document is what the court
            enforces.
          </p>

          <h2>Steps 4 to 6: choose the agent, prepare, and list</h2>
          <p>
            Pick one agent both spouses and both attorneys accept, agree on the preparation budget and
            showing schedule, then launch a listing that never mentions the divorce. These three steps
            take a few weeks when decisions are made on a deadline and much longer when they are not.
          </p>
          <h3>Step 4: choose a divorce real estate specialist</h3>
          <p>
            Look for an agent who will represent the sale rather than one spouse, who copies both spouses
            and both attorneys on every update, and who has a written escalation process for missed
            signatures or blocked showings. Court-appointment experience matters if an order is likely.
            See
            {' '}
            <Link href="/certified-divorce-real-estate-expert" className="text-blue-600 underline hover:text-blue-700">what a certified divorce real estate expert does</Link>
            .
          </p>
          <h3>Step 5: prepare the home</h3>
          <ul>
            <li>Depersonalize: court mail, calendars, and family photos come down before photography.</li>
            <li>Repair what an inspector will flag: roof, HVAC, water heater, pool equipment, irrigation.</li>
            <li>Agree on a repair budget and who advances it, with reimbursement from proceeds at closing.</li>
            <li>Set showing windows the occupying spouse can honor, and share them with both spouses.</li>
          </ul>
          <p>
            The full list is at
            {' '}
            <Link href="/divorce-home-staging" className="text-blue-600 underline hover:text-blue-700">preparing and staging a home during divorce</Link>
            .
          </p>
          <h3>Step 6: list and market</h3>
          <p>
            Professional photography, a floor plan, and an MLS description that covers square footage,
            lot, upgrades, and HOA terms. The word divorce appears nowhere. A Coming Soon period lets
            agents preview before public portal syndication if you want a quieter start.
          </p>

          <h2>Steps 7 to 10: offers, inspections, closing, and proceeds</h2>
          <p>
            Once offers arrive, both spouses review them on the same page at the same time, respond by a
            set deadline, and let the inspection and appraisal run on the buyer's clock. Closing follows
            the decree or stipulation, and escrow releases proceeds only as that document directs.
          </p>
          <h3>Step 7: handle offers and negotiation</h3>
          <ul>
            <li>Price, financing type, and earnest money.</li>
            <li>Closing date, which may be fixed by a court order.</li>
            <li>Inspection, appraisal, and loan contingencies.</li>
            <li>Repair credits and who absorbs them.</li>
          </ul>
          <h3>Step 8: inspections and appraisals</h3>
          <p>
            The buyer's inspection usually produces a repair request. Decide in advance how much credit
            both spouses will accept so the response does not require a new negotiation between them.
            If the appraisal comes in low, the options are a price cut, a buyer cash top-up, or a
            second appraisal.
          </p>
          <h3>Step 9: coordinate closing</h3>
          <ul>
            <li>Both spouses sign closing documents, or an order authorizes one signature.</li>
            <li>Mortgage payoff, HOA transfer fees, and lien releases are itemized on the settlement statement.</li>
            <li>Escrow instructions for the split match the decree or stipulation word for word.</li>
          </ul>
          <h3>Step 10: distribute proceeds and move on</h3>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            Under
            {' '}
            {NEVADA_LAW.communityPropertyCite}
            , that usually means an even split of net proceeds after documented separate-property
            reimbursements. Escrow wires each spouse directly. Nevada has no state income tax, and
            Section 121 may exclude part of the gain. Details at
            {' '}
            <Link href="/capital-gains-tax-divorce-home-sale" className="text-blue-600 underline hover:text-blue-700">capital gains tax on a divorce home sale</Link>
            .
          </p>
          <p>{LEGAL_DISCLAIMER}</p>

          <h2>Timeline: how long each stage takes</h2>
          <p>
            Expect the pre-listing stage to take longest, because it depends on attorney calendars and
            two spouses making decisions. The listing stage moves at market speed: in September 2026,
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of Las Vegas single-family homes sold within 30 days. The closing stage runs on the buyer's
            lender and on recording any order the title company needs.
          </p>
          <p>
            A stage-by-stage breakdown is on the
            {' '}
            <Link href="/divorce-home-sale-timeline" className="text-blue-600 underline hover:text-blue-700">divorce home sale timeline</Link>
            {' '}
            page.
          </p>

          <h2>Mistakes that stall a divorce sale</h2>
          <p>
            Most failed divorce listings share one of five causes: a price set to a buyout number, one
            spouse controlling showing access, no pre-listing inspection, an undefined proceeds split, or
            an agent who represents one side. Each is a decision that belongs in the listing addendum
            before launch.
          </p>
          <ul>
            <li>
              <strong>Overpricing:</strong>
              {' '}
              the home sits, collects low offers, and the other spouse blames the strategy.
            </li>
            <li>
              <strong>One-sided communication:</strong>
              {' '}
              any update that reaches one spouse first becomes evidence of bias.
            </li>
            <li>
              <strong>Ignoring the order:</strong>
              {' '}
              a court-set deadline or price floor controls the listing, not the agent's preference.
            </li>
            <li>
              <strong>Rushing preparation:</strong>
              {' '}
              inspection surprises cost more in escrow than repairs cost before listing.
            </li>
          </ul>
          <p>
            More on
            {' '}
            <Link href="/divorce-real-estate-mistakes" className="text-blue-600 underline hover:text-blue-700">common divorce real estate mistakes</Link>
            {' '}
            and the printable
            {' '}
            <Link href="/divorce-home-sale-checklist" className="text-blue-600 underline hover:text-blue-700">divorce home sale checklist</Link>
            .
          </p>
        </div>

        <HighValueHomeNote points={[
          `Buyer financing above ${LUXURY_2026.jumboThreshold2026} is jumbo, with longer underwriting and larger reserve requirements. Build that into the closing date you accept.`,
          'On custom homes in The Ridges, MacDonald Highlands, or Southern Highlands, expect the appraisal to spread. A two-appraisal protocol agreed before listing avoids a renegotiation between spouses at step 8.',
          'Club memberships at Red Rock CC, DragonRidge, Anthem CC, and Summit Club have transfer fees and waiting lists. Decide at step 3 whether the membership sells with the home or is surrendered.',
          'Guard-gated showings need pre-registered names. Put the gate list in the showing plan so access cannot be withheld by one spouse.',
          'Off-market or private exposure to a vetted buyer list is an option at this tier. It trades portal reach for privacy, so both spouses must agree in writing.',
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Tell me where the case stands, who is on title, and whether an order exists.' },
            { title: 'Valuation and net sheet', detail: 'A written analysis with comparables attached and the net to each spouse.' },
            { title: 'Listing addendum', detail: 'Price, showing rules, repair budget, and signing authority in one document both spouses sign.' },
          ]}
          callPromise="You leave the call knowing which of the ten steps you are on and what happens next."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
