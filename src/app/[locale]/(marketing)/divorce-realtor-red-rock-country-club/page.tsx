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

type IRedRockCCProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-red-rock-country-club';
const community = COMMUNITY_12MO.redRockCountryClub;

const pageTitle = 'Red Rock Country Club Divorce Realtor | Dr. Jan Duffy';
const pageDescription = `Divorcing with a home in Red Rock Country Club? The 12-month median is ${community.median}. Learn how club membership, gate showings and jumbo buyouts are handled.`;

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
    question: 'Does the Red Rock Country Club membership transfer with the house in a divorce?',
    answer: `Not automatically. Membership is a contract between a member and the club, separate from the deed. The club sets its own transfer rules, fees and deposit handling. The decree should say which spouse keeps the membership, how any refundable deposit is divided, and whether the home will be marketed with a membership available to the buyer, subject to club approval.`,
  },
  {
    question: 'How fast do homes in Red Rock Country Club sell?',
    answer: `The 12-month median days on market is ${community.medianDom}, across ${community.closings} closings through September 2026. That is quicker than most guard-gated luxury communities in the valley because the price band is broad and the buyer pool is larger. A divorce sale priced correctly from the first week should track that median.`,
  },
  {
    question: 'Is a buyout realistic for a Red Rock Country Club home?',
    answer: `Often, yes. Sales start around ${community.lowSale}, so nearly every buyout refinance is above the ${LUXURY_2026.jumboThreshold2026} jumbo line. The spouse keeping the home needs a written jumbo pre-approval on post-divorce income before the buyout figure goes into the settlement. If the loan does not work, a sale with equal division is the fallback.`,
  },
  {
    question: 'What does the HOA cover and who pays it during the sale?',
    answer: `Monthly HOA dues run ${community.hoaMonthly} and cover the staffed gates and common areas. Club dues are separate. Until closing, the spouse in the home usually pays HOA, club dues, utilities and the mortgage, with reimbursement handled from proceeds. Put that allocation in writing early so it does not become a closing-table dispute.`,
  },
  {
    question: 'Can we sell quietly without the neighbors knowing it is a divorce?',
    answer: `Yes. Showings are by appointment through the gate, listing remarks and photos never mention the divorce, and the agent handles every buyer question. If you want private exposure before public syndication, that can be arranged within MLS rules, as long as the settlement states how long the private window lasts and when the listing goes public.`,
  },
  {
    question: 'What taxes apply when we sell during the divorce?',
    answer: `${NEVADA_LAW.capitalGainsExclusion} Clark County transfer tax is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 on a sale, customarily paid by the seller, but a deed between spouses under the decree is exempt. ${NEVADA_LAW.noStateIncomeTax} ${LEGAL_DISCLAIMER}`,
  },
];

export default async function RedRockCountryClubDivorceRealtor(props: IRedRockCCProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = path;
  const articleSchema = generateArticleSchema(
    'Red Rock Country Club Divorce Real Estate Agent',
    pageDescription,
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'Red Rock Country Club' }];
  const serviceSchema = generateServiceSchema(
    'Red Rock Country Club Divorce Real Estate Services',
    pageDescription,
    'Red Rock Country Club',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, localBusinessSchema, serviceSchema, realEstateAgentSchema, faqSchema]} />
      <DivorcePageTemplate
        h1="Red Rock Country Club Divorce Real Estate Agent"
        heroSubhead="Club membership, gate showings and jumbo buyouts, handled by a neutral agent in Summerlin"
        showHomeValue
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How is a divorce home sale handled in Red Rock Country Club?">
          Red Rock Country Club is a guard-gated golf community in Summerlin with a 12-month median sale of
          {' '}
          {community.median}
          {' '}
          and
          {' '}
          {community.closings}
          {' '}
          closings. A divorce sale here has one issue most communities do not: the club membership, which
          transfers by club contract rather than by deed. Add scheduled showings through the gate, a jumbo
          pre-approval for any buyout, and a settlement that assigns HOA and club dues until closing. A neutral agent manages all of it for both spouses.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Red Rock Country Club median sale, 12 months', value: community.median },
            { label: 'Closings, 12 months through September 2026', value: community.closings },
            { label: 'Median days on market', value: community.medianDom },
            { label: 'Monthly HOA dues', value: community.hoaMonthly },
          ]}
          source={`${COMMUNITY_12MO.source}, ${COMMUNITY_12MO.asOf}`}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>What Red Rock Country Club is, and why it matters in a divorce</h2>
          <p>
            Red Rock Country Club is a guard-gated community in Summerlin West built around two Arnold Palmer
            golf courses, the private Mountain course and the Arroyo course. Homes range from production
            golf-frontage lots to custom estates, which is why 12-month sales start around
            {' '}
            {community.lowSale}
            {' '}
            and the median sits at
            {' '}
            {community.median}
            . Monthly HOA dues run
            {' '}
            {community.hoaMonthly}
            ; club membership dues are separate and depend on the tier.
          </p>
          <p>
            The community sits off Charleston Boulevard west of the 215, with Red Rock Canyon to the west and
            Downtown Summerlin a short drive east. The price band is broad enough that the buyer pool is larger
            than in The Ridges or MacDonald Highlands, and the median days on market of
            {' '}
            {community.medianDom}
            {' '}
            reflects that.
          </p>
          <p>
            In a divorce, the home itself follows the usual path: value it, decide between buyout and sale,
            and close under the decree. The membership does not. It is a separate asset with its own contract,
            and it needs its own line in the settlement.
          </p>

          <h2>Club membership: what transfers and what does not</h2>
          <p>
            A Red Rock Country Club membership belongs to the member, not to the lot. The club controls
            whether a membership can be transferred to a buyer, what fee applies, and how any refundable
            deposit is returned. Some clubs keep a resignation list that determines when a departing member's
            deposit is paid. None of that is governed by the deed or the purchase contract.
          </p>
          <p>
            The decree should answer four questions. Which spouse keeps the membership if one keeps the home?
            How is any deposit split if the membership is resigned? Will the home be marketed with a membership
            available to the buyer, subject to club approval? And who pays club dues until closing? Buyers at
            this price ask about membership early, so the answers need to exist before the listing goes live.
          </p>
          <p>
            Golf, sports and social tiers carry different dues and different transfer terms. Get the club's
            current membership documents into the file at the start, and route membership questions to the club's
            membership office rather than relaying them between spouses.
          </p>

          <h2>Valuing a home here: golf frontage, lot and finish</h2>
          <p>
            Comparables inside the gates are the only ones that matter. With
            {' '}
            {community.closings}
            {' '}
            closings in 12 months there are enough recent sales to work with, but the spread between a
            production home on an interior lot and a custom home on the Mountain course is large. Adjustments
            for golf frontage, lot size, view and finish level drive the value more than square footage does.
          </p>
          <p>
            For custom homes near the top of the range, use a two-appraisal protocol: each spouse chooses an
            appraiser, both get the same package of plans, improvement invoices, HOA and club documents, and the
            attorneys set a tolerance band in advance. For production homes, a single appraisal plus a broker
            price opinion is often enough. The
            {' '}
            <Link href="/divorce-home-valuation">divorce home valuation page</Link>
            {' '}
            explains how to reconcile the reports.
          </p>

          <h2>Buyout or sale above the jumbo line</h2>
          <p>
            With sales starting around
            {' '}
            {community.lowSale}
            , nearly every buyout refinance here is above
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            and therefore jumbo. The spouse keeping the home qualifies alone, on post-divorce income, with
            reserves and a debt-to-income ratio a jumbo lender will accept. Support income typically counts only
            once the decree is final and payments have a history.
          </p>
          <p>
            A written pre-approval at the full loan amount should exist before the buyout number is negotiated.
            If the refinance will not close in time, the
            {' '}
            <Link href="/divorce-buyout-options">buyout options guide</Link>
            {' '}
            covers deferred buyouts and other structures. If no buyout works, a sale with equal division of net
            proceeds is the fallback, and the sooner that is decided, the less both spouses pay in carrying costs.
          </p>

          <h2>Showings, privacy and the settlement language</h2>
          <p>
            Showings run by appointment through the staffed gate. The buyer agent is registered, the visit is
            logged, and proof of funds or a jumbo pre-approval is confirmed first, applied the same way to every
            buyer. Open houses may be limited by the HOA. Listing remarks and photos never mention the divorce,
            and the agent fields every buyer question so neither spouse has to.
          </p>
          <p>
            Private exposure before the MLS is available within MLS rules if both spouses agree and the settlement
            states how long the private window lasts. Pricing is set from the first week; with a median of
            {' '}
            {community.medianDom}
            {' '}
            days on market, a home that opens above the market will be noticed.
          </p>
          <p>
            {NEVADA_LAW.capitalGainsExclusion}
            {' '}
            Clark County transfer tax is
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000 on an open-market sale.
            {' '}
            {NEVADA_LAW.transferTaxDivorceExemption}
            {' '}
            The settlement should also assign HOA dues, club dues, utilities and mortgage payments until closing.
            {' '}
            {LEGAL_DISCLAIMER}
            {' '}
            For the valley-wide picture, see the
            {' '}
            <Link href="/luxury-divorce-real-estate-las-vegas">luxury divorce real estate guide</Link>
            .
          </p>

          <h2>If the court orders the sale of a Red Rock Country Club home</h2>
          <p>
            When spouses cannot agree, the court can order the sale and set the terms. The order usually names
            the listing agent, fixes the list price or the method for setting it, schedules reductions, assigns
            occupancy and carrying costs, and states how offers are accepted. Nevada's rule is equal division of
            community property unless the judge writes down a compelling reason not to (
            {NEVADA_LAW.communityPropertyCite}
            ).
          </p>
          <p>
            For a home here, the order should also cover the membership: who holds it during the listing, who
            pays club dues, whether the home is marketed with a membership available, and how any deposit is
            divided when the club processes a resignation or transfer. Without that language, the membership
            becomes a second dispute after the house is sold.
          </p>
          <p>
            The order should also state whether a private-exposure window is allowed, what happens if one
            spouse refuses to sign a listing amendment or closing documents, and who maintains the home and pays
            the
            {' '}
            {community.hoaMonthly}
            {' '}
            monthly HOA while it is on the market. A court-appointed neutral agent gives both attorneys the same
            showing log, the same feedback and the same offer summaries on the same day. With a median of
            {' '}
            {community.medianDom}
            {' '}
            days on market, a correctly priced home should be under contract before carrying costs become the
            larger problem. The
            {' '}
            <Link href="/court-ordered-home-sale">court-ordered home sale page</Link>
            {' '}
            lays out the procedure step by step.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>
        </div>

        <HighValueHomeNote points={[
          'The club membership is a separate asset with its own transfer rules, fees and deposit terms. Put it in the decree, and confirm with the club what a buyer can be offered.',
          `With sales from ${community.lowSale} upward, a buyout refinance is jumbo. Get a written pre-approval at the full loan amount before the settlement figure is fixed.`,
          'Golf-frontage and Mountain-course custom homes appraise with wide spreads. Use a two-appraisal protocol with a shared package and a tolerance band for homes near the top of the range.',
          'Gate showings are scheduled, logged and limited to verified buyers. A private-exposure window before the MLS is available if the settlement allows it.',
          `HOA dues of ${community.hoaMonthly} per month plus club dues continue until closing. Assign them in writing and clear any assessment before the resale certificate is ordered.`,
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the home, the membership tier, and the timeline your attorneys are working toward.' },
            { title: 'Valuation package', detail: 'A broker price opinion built on in-community comparables, with a recommended appraisal protocol for counsel.' },
            { title: 'Written plan', detail: 'Buyout feasibility, membership handling, marketing approach and settlement line items in one document both sides can review.' },
            { title: 'Neutral execution', detail: 'Scheduled gate showings, identical updates to both spouses, and a closing calendar that matches the decree.' },
          ]}
          callPromise="You leave the call with a value range, a membership answer, and a clear next decision."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
