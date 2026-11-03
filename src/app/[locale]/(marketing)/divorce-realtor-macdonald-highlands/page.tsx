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

type IMacDonaldHighlandsProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-macdonald-highlands';
const community = COMMUNITY_12MO.macdonaldHighlands;
const henderson = COMMUNITY_12MO.henderson1MPlus;

const pageTitle = 'MacDonald Highlands Divorce Realtor | Dr. Jan Duffy';
const pageDescription = `Divorcing with a home in MacDonald Highlands? The 12-month median is ${community.median}. See how DragonRidge membership, hillside appraisals and buyouts are handled.`;

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
    question: 'How long does a MacDonald Highlands home take to sell during a divorce?',
    answer: `The 12-month median days on market is ${community.medianDom}, across ${community.closings} closings through September 2026. Hillside custom homes take longer than the Henderson $1M+ average of ${henderson.medianDom} days because each one has a small buyer pool. A divorce sale priced from the first week, with scheduled gate showings, should track the community median.`,
  },
  {
    question: 'Does a DragonRidge Country Club membership transfer with the home?',
    answer: `Not by deed. DragonRidge membership is a contract with the club, with its own transfer rules, fees and deposit terms. The decree should state which spouse keeps the membership, how any refundable deposit is divided, and whether the home will be marketed with a membership available to the buyer, subject to club approval.`,
  },
  {
    question: 'Can one spouse buy the other out of a MacDonald Highlands home?',
    answer: `Only with a jumbo refinance, since the community median of ${community.median} is far above the ${LUXURY_2026.jumboThreshold2026} conforming limit. The spouse keeping the home must qualify alone on post-divorce income, with reserves and a debt-to-income ratio a jumbo lender accepts. A written pre-approval at the full loan amount should exist before the buyout figure is negotiated.`,
  },
  {
    question: 'Why do appraisals of hillside custom homes vary so much?',
    answer: `Lots in MacDonald Highlands step up the McCullough Range foothills, so elevation, view corridor and lot engineering change value as much as square footage does. The top sale in 12 months reached ${community.topSale}. Two appraisers will pick different comparables and adjust differently. A two-appraisal protocol with a shared package and a tolerance band resolves the spread in advance.`,
  },
  {
    question: 'How does the Four Seasons Private Residences project affect a sale now?',
    answer: `The Four Seasons Private Residences Las Vegas is under construction inside MacDonald Highlands. Until units close and resell, it does not supply comparables for existing homes, but it does draw buyer attention to the community and adds a branded alternative at the top of the market. Pricing an existing custom home should rest on closed MLS sales, not on project list prices.`,
  },
  {
    question: 'What taxes apply to a divorce sale in MacDonald Highlands?',
    answer: `${NEVADA_LAW.capitalGainsExclusion} Clark County transfer tax is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 on an open-market sale, customarily paid by the seller, but a deed between spouses under the decree is exempt. ${NEVADA_LAW.noStateIncomeTax} ${LEGAL_DISCLAIMER}`,
  },
];

export default async function MacDonaldHighlandsDivorceRealtor(props: IMacDonaldHighlandsProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = path;
  const articleSchema = generateArticleSchema(
    'MacDonald Highlands Divorce Real Estate Agent',
    pageDescription,
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'MacDonald Highlands' }];
  const serviceSchema = generateServiceSchema(
    'MacDonald Highlands Divorce Real Estate Services',
    pageDescription,
    'MacDonald Highlands',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, localBusinessSchema, serviceSchema, realEstateAgentSchema, faqSchema]} />
      <DivorcePageTemplate
        h1="MacDonald Highlands Divorce Real Estate Agent"
        heroSubhead="Hillside custom homes, DragonRidge membership and jumbo buyouts, handled by a neutral agent in Henderson"
        showHomeValue
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How is a divorce home sale handled in MacDonald Highlands?">
          MacDonald Highlands is a guard-gated hillside community in Henderson built around DragonRidge
          Country Club, with a 12-month median sale of
          {' '}
          {community.median}
          {' '}
          and a top sale of
          {' '}
          {community.topSale}
          . A divorce sale here needs a two-appraisal protocol for elevation and view, a jumbo pre-approval for
          any buyout, a decree line for the DragonRidge membership, and scheduled showings through the gate. A neutral agent reports to both spouses and both attorneys on the same schedule.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'MacDonald Highlands median sale, 12 months', value: community.median },
            { label: 'Closings, 12 months through September 2026', value: community.closings },
            { label: 'Median days on market', value: community.medianDom },
            { label: 'Price per square foot', value: community.pricePerSqFt },
          ]}
          source={`${COMMUNITY_12MO.source}, ${COMMUNITY_12MO.asOf}`}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>What MacDonald Highlands is, and why it matters in a divorce</h2>
          <p>
            MacDonald Highlands climbs the foothills of the McCullough Range in Henderson, south of Horizon
            Ridge Parkway, with a staffed main gate and gated enclaves inside. Lots are engineered into the
            hillside, so elevation and view corridor toward the Strip and the valley vary from street to street.
            Homes are custom, with
            {' '}
            {community.closings}
            {' '}
            closings in 12 months at a median of
            {' '}
            {community.median}
            {' '}
            and
            {' '}
            {community.pricePerSqFt}
            {' '}
            per square foot.
          </p>
          <p>
            DragonRidge Country Club anchors the community with its golf course, clubhouse and sports
            facilities. Membership is separate from home ownership. The Four Seasons Private Residences Las
            Vegas is under construction inside the gates, which brings branded-residence buyers to the area and
            adds a new top tier to the market once it delivers.
          </p>
          <p>
            For the broader context, Henderson's $1M+ market recorded
            {' '}
            {henderson.closings}
            {' '}
            closings in
            {' '}
            {henderson.period}
            {' '}
            at a median of
            {' '}
            {henderson.median}
            {' '}
            and
            {' '}
            {henderson.pricePerSqFt}
            {' '}
            per square foot. MacDonald Highlands sits well above both figures, which is why its sales take
            {' '}
            {community.medianDom}
            {' '}
            median days against Henderson's
            {' '}
            {henderson.medianDom}
            .
          </p>

          <h2>Valuing a hillside custom home</h2>
          <p>
            Elevation and view drive value here more than square footage. Two homes of the same size on
            different tiers of the hillside can close far apart. Lot engineering, pool and outdoor-living
            build-out, and finish level add further spread. With a top sale of
            {' '}
            {community.topSale}
            {' '}
            in 12 months, the range is wide enough that any single appraisal is one opinion among several.
          </p>
          <p>
            Use a two-appraisal protocol. Each spouse selects a licensed appraiser with hillside custom-home
            experience. Both receive the same package: plans, permits, improvement invoices, HOA and club
            documents, and closed and pending sales inside the gates. The attorneys set a tolerance band before
            the reports are ordered. Inside the band, the average is the value. Outside it, a third appraiser or a
            negotiated figure settles it.
          </p>
          <p>
            A broker price opinion covers what appraisals cannot: current competition, which listings are sitting,
            and whether the Four Seasons project is pulling buyers at a given price. The
            {' '}
            <Link href="/divorce-home-valuation">divorce home valuation page</Link>
            {' '}
            explains how the reports are reconciled.
          </p>

          <h2>DragonRidge membership in the settlement</h2>
          <p>
            A DragonRidge membership is a contract between the member and the club. The club sets transfer
            rules, fees and deposit handling, and may keep a resignation list that controls when a deposit is
            returned. The purchase contract for the home does not transfer it, and a buyer who expects a
            membership needs club approval.
          </p>
          <p>
            The decree should say which spouse keeps the membership if one keeps the home, how any deposit is
            divided if the membership is resigned, whether the home will be marketed with a membership available,
            and who pays club dues until closing. Get the club's current membership documents into the file at
            the start, and route membership questions to the club rather than between spouses.
          </p>

          <h2>Buyout or sale above the jumbo line</h2>
          <p>
            With a median of
            {' '}
            {community.median}
            , every buyout refinance here is a jumbo loan, well above
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            . The spouse keeping the home qualifies alone, on post-divorce income, with months of reserves and
            a debt-to-income ratio the jumbo lender accepts. Support income usually counts only after the decree is
            final and payments have a history.
          </p>
          <p>
            A written pre-approval at the full loan amount should exist before the buyout number is negotiated.
            If the lender's appraisal comes in below the settlement value, the loan shrinks and the spouse leaving
            may wait for the balance. The
            {' '}
            <Link href="/divorce-buyout-options">buyout options guide</Link>
            {' '}
            covers deferred buyouts and other structures. If no buyout works, a sale with equal division of net
            proceeds is the fallback, and deciding early saves both spouses carrying costs on a large home.
          </p>

          <h2>Showings, privacy, taxes and the settlement language</h2>
          <p>
            Showings are by appointment through the staffed gate. The buyer agent is registered, the visit is
            logged, and proof of funds or a jumbo pre-approval is confirmed first, applied the same way to every
            buyer. Open houses may be limited by the HOA. Listing remarks and photos never mention the divorce,
            and the agent handles every buyer question so neither spouse has to.
          </p>
          <p>
            Private exposure before the MLS is available within MLS rules if both spouses agree and the settlement
            states how long the private window lasts. Pricing is set from the first week. With
            {' '}
            {community.medianDom}
            {' '}
            median days on market, a home that opens above the market will sit, and a visible reduction on a
            hillside custom home is noticed by every agent tracking the community.
          </p>
          <p>
            {NEVADA_LAW.capitalGainsExclusion}
            {' '}
            Gains here often exceed the cap, so basis documentation matters: keep invoices for every remodel,
            the pool, outdoor kitchen and landscaping. Clark County transfer tax is
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
            {' '}
            and the
            {' '}
            <Link href="/divorce-realtor-henderson">Henderson divorce real estate page</Link>
            .
          </p>

          <h2>If the court orders the sale of a MacDonald Highlands home</h2>
          <p>
            When spouses cannot agree, the court can order the sale and set the terms. The order usually names
            the listing agent, fixes the list price or the method for setting it, schedules reductions, assigns
            occupancy and carrying costs, and states how offers are accepted. Nevada's rule is equal division of
            community property unless the judge writes down a compelling reason not to (
            {NEVADA_LAW.communityPropertyCite}
            ).
          </p>
          <p>
            For a hillside custom home, the order should require the two-appraisal protocol and define the
            tolerance band, because a single appraisal on a lot with a view corridor invites a second dispute.
            It should also address the DragonRidge membership, whether a private-exposure window is allowed
            before the MLS, and what happens if one spouse refuses to sign a listing amendment or closing documents.
          </p>
          <p>
            Carrying costs on a home at this price are the reason to move quickly once the order is signed.
            Mortgage, HOA, club dues, insurance, pool and landscape service add up every month. With a median of
            {' '}
            {community.medianDom}
            {' '}
            days on market, the listing has to be priced correctly in week one, not after two reductions. A
            court-appointed neutral agent gives both attorneys the same showing log, the same feedback and the
            same offer summaries on the same day. The
            {' '}
            <Link href="/court-ordered-home-sale">court-ordered home sale page</Link>
            {' '}
            lays out the procedure step by step.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>
        </div>

        <HighValueHomeNote points={[
          `With a median of ${community.median}, every buyout refinance is jumbo. Get a written pre-approval at the full loan amount before the settlement figure is fixed.`,
          `Elevation and view corridor drive value more than square footage, and the top sale reached ${community.topSale}. Use a two-appraisal protocol with a shared package and a tolerance band set in advance.`,
          'DragonRidge membership transfers by club contract, not by deed. Put the membership, its deposit and the dues allocation in the decree before the listing goes live.',
          'Gate showings are scheduled, logged and limited to verified buyers. A private-exposure window before the MLS is available if the settlement allows it.',
          `Clark County transfer tax runs ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 on a sale but not on a decree transfer between spouses, which is one reason a buyout can cost less to close.`,
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the home, its lot position, the DragonRidge membership, and the timeline your attorneys are working toward.' },
            { title: 'Valuation package', detail: 'A broker price opinion built on in-community comparables, with a recommended two-appraisal protocol for counsel.' },
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
