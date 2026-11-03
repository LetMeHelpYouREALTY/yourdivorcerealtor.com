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

type ITheRidgesProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-the-ridges';
const community = COMMUNITY_12MO.theRidges;

const pageTitle = 'The Ridges Divorce Realtor, Summerlin | Dr. Jan Duffy';
const pageDescription = `Divorcing with a home in The Ridges? The 12-month median is ${community.median}. See how guard-gated showings, custom-home appraisals and jumbo buyouts are handled.`;

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
    question: 'How long does a home in The Ridges take to sell during a divorce?',
    answer: `The 12-month median days on market in The Ridges is ${community.medianDom}, with ${community.closings} closings through September 2026. A divorce sale that is priced from the first week and shown by appointment tracks that median. Overpricing to satisfy one spouse adds months, and every reduction is visible to the agents who follow the community.`,
  },
  {
    question: 'Can one spouse buy the other out of a home in The Ridges?',
    answer: `Usually only with a jumbo refinance, since almost every sale here is above the ${LUXURY_2026.jumboThreshold2026} conforming limit. The spouse keeping the home must qualify alone on post-divorce income, with reserves and a debt-to-income ratio that satisfies a jumbo lender. Get a written pre-approval at the full loan amount before the buyout figure goes into the settlement.`,
  },
  {
    question: 'Why do appraisals of Ridges homes differ so much?',
    answer: `Sales in the last 12 months ranged from ${community.lowSale} to ${community.highSale}, and the homes are custom. Two appraisers choose different comparables and adjust differently for lot size, view corridor, finish level and golf frontage. A two-appraisal protocol, agreed before any report is ordered, keeps that spread from becoming a courtroom argument.`,
  },
  {
    question: 'How do showings work inside a guard-gated community like The Ridges?',
    answer: `Every showing is scheduled. The guard station gets the buyer agent's name and time, the gate logs the visit, and there is no lockbox drive-by traffic. Proof of funds or a jumbo pre-approval is verified before the appointment, applied the same way to every buyer. For a divorcing owner this means the home is never shown without notice.`,
  },
  {
    question: 'What does the HOA cost in The Ridges, and who pays it during the sale?',
    answer: `Monthly HOA dues run ${community.hoaMonthly}. Until closing, the spouse living in the home usually pays dues, utilities and the mortgage, with a credit or reimbursement settled from proceeds. Put the allocation in writing early. An unpaid assessment surfaces in the resale certificate and can delay closing.`,
  },
  {
    question: 'Does a divorce sale in The Ridges owe Nevada transfer tax?',
    answer: `An open-market sale does, at ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of value, customarily paid by the seller. ${NEVADA_LAW.transferTaxDivorceExemption} So a buyout that moves title by deed under the decree pays none. ${LEGAL_DISCLAIMER}`,
  },
];

export default async function TheRidgesDivorceRealtor(props: ITheRidgesProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = path;
  const articleSchema = generateArticleSchema(
    'The Ridges Divorce Real Estate Agent',
    pageDescription,
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'The Ridges' }];
  const serviceSchema = generateServiceSchema(
    'The Ridges Divorce Real Estate Services',
    pageDescription,
    'The Ridges',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, localBusinessSchema, serviceSchema, realEstateAgentSchema, faqSchema]} />
      <DivorcePageTemplate
        h1="The Ridges Divorce Real Estate Agent"
        heroSubhead="Neutral, court-aware handling of custom homes in Summerlin's guard-gated enclave"
        showHomeValue
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How is a divorce home sale handled in The Ridges?">
          The Ridges is a guard-gated custom-home community in Summerlin with a 12-month median sale of
          {' '}
          {community.median}
          {' '}
          and sales from
          {' '}
          {community.lowSale}
          {' '}
          to
          {' '}
          {community.highSale}
          . A divorce sale here needs a two-appraisal protocol, scheduled showings through the gate, a jumbo
          pre-approval for any buyout, and a marketing plan that keeps the divorce out of the listing. A neutral agent reports to both spouses and both attorneys on the same schedule.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'The Ridges median sale, 12 months', value: community.median },
            { label: 'Closings, 12 months through September 2026', value: community.closings },
            { label: 'Median days on market', value: community.medianDom },
            { label: 'Price per square foot', value: community.pricePerSqFt },
          ]}
          source={`${COMMUNITY_12MO.source}, ${COMMUNITY_12MO.asOf}`}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>What The Ridges is, and why that matters in a divorce</h2>
          <p>
            The Ridges sits on the western rim of Summerlin, above the Bear's Best golf course, with a staffed
            main gate and gated villages inside it. Homes are custom or semi-custom on elevated lots, many with
            Strip and valley views to the east and Red Rock views to the west. That combination is why sales
            over the last 12 months ran from
            {' '}
            {community.lowSale}
            {' '}
            to
            {' '}
            {community.highSale}
            , and why no two homes value the same way.
          </p>
          <p>
            Villages include Promontory, Falcon Ridge, Azure, Silver Ridge, Indigo, Topaz Ridge and Sterling
            Ridge, each with its own lot pattern and build era. Monthly HOA dues run
            {' '}
            {community.hoaMonthly}
            , which covers the gate staffing, common landscaping and the community center. Access is from
            Flamingo Road and Summerlin Parkway; Downtown Summerlin is a short drive east.
          </p>
          <p>
            For a divorcing couple, the practical consequences are three. The home is almost certainly above the
            jumbo line, so a buyout is a jumbo refinance. Comparable sales are few and far apart in price, so
            appraisals will disagree. And the gate means every showing is scheduled and logged, which protects
            privacy but slows exposure. The plan below addresses each.
          </p>

          <h2>Valuing a custom home in The Ridges</h2>
          <p>
            Start with the community itself, not the Summerlin average. The 12-month median in The Ridges is
            {' '}
            {community.median}
            {' '}
            at
            {' '}
            {community.pricePerSqFt}
            {' '}
            per square foot, across
            {' '}
            {community.closings}
            {' '}
            closings. Those are the numbers an appraiser will anchor on, and the spread around them is wide.
            A view lot on the rim and an interior lot of the same square footage can differ by a large margin.
          </p>
          <p>
            The two-appraisal protocol works well here. Each spouse chooses a licensed appraiser with experience
            in guard-gated custom homes. Both get the same package: plans, permits, improvement invoices, HOA
            documents, and a list of closed and pending sales inside The Ridges. The attorneys set a tolerance
            band in advance. Inside the band, the average is the settlement value. Outside it, a third appraiser
            or a negotiated figure resolves the gap.
          </p>
          <p>
            A broker price opinion adds what appraisals miss: current competing listings, which homes are
            sitting, and what buyers at this price are actually choosing. The
            {' '}
            <Link href="/divorce-home-valuation">divorce home valuation page</Link>
            {' '}
            explains how the reports are reconciled.
          </p>

          <h2>Buyout or sale: the jumbo question</h2>
          <p>
            A buyout keeps one spouse in the home. Above
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            , the refinance that funds it is jumbo, and the spouse keeping the home must qualify alone. Jumbo
            lenders want reserves measured in months of payments, lower debt-to-income ratios, and documented
            income after the decree. Support payments usually count only once the decree is final and a payment history exists.
          </p>
          <p>
            Run the numbers before the negotiation, not after. A written pre-approval at the full loan amount tells
            both attorneys whether the buyout is real. If it is not, a sale with equal division of net proceeds is
            the fallback, and the earlier that decision is made, the less carrying cost both spouses pay. The
            {' '}
            <Link href="/divorce-buyout-options">buyout options guide</Link>
            {' '}
            covers deferred buyouts and other structures when a refinance will not close in time.
          </p>

          <h2>Showings, privacy and marketing behind the gate</h2>
          <p>
            Guard-gated showings are by appointment. The buyer agent is registered at the gate, the visit is
            logged, and there is no lockbox traffic. Proof of funds or a jumbo pre-approval is confirmed before
            the appointment is set, with the same requirement applied to every buyer. Open houses are
            uncommon and may be restricted by the HOA, so the marketing plan relies on scheduled private tours.
          </p>
          <p>
            Many owners in The Ridges prefer private exposure before the MLS. The home is presented through
            office and agent networks first, within MLS rules, before public syndication. The settlement should
            say whether that is allowed, for how long, and when the listing goes public. Photography and
            listing remarks never mention the divorce. The agent, not either spouse, handles buyer questions.
          </p>
          <p>
            Pricing should be set from the first week. The median days on market here is
            {' '}
            {community.medianDom}
            , and a home that opens above the market tends to sit well past it. A visible price cut on a
            custom home is read by every agent tracking the community. One correct price beats three reductions.
          </p>

          <h2>Taxes, transfer tax and the settlement language</h2>
          <p>
            {NEVADA_LAW.capitalGainsExclusion}
            {' '}
            Many Ridges homes carry gains well above the cap, so basis documentation matters: keep invoices for
            the pool, casita, landscaping and every remodel. The
            {' '}
            <Link href="/capital-gains-tax-divorce-home-sale">capital gains guide</Link>
            {' '}
            covers timing and the divorce-instrument rule.
          </p>
          <p>
            Clark County transfer tax is
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000 on an open-market sale, customarily paid by the seller.
            {' '}
            {NEVADA_LAW.transferTaxDivorceExemption}
            {' '}
            The settlement should also assign HOA dues, utilities and mortgage payments until closing, and
            state how the proceeds are split after liens, commissions and credits.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>
          <p>
            For the broader picture across the valley's luxury enclaves, see the
            {' '}
            <Link href="/luxury-divorce-real-estate-las-vegas">luxury divorce real estate guide</Link>
            .
          </p>

          <h2>If the court orders the sale of a Ridges home</h2>
          <p>
            When spouses cannot agree on price, timing or who moves out, the court can order the sale and set
            the terms. The order usually names the listing agent, fixes the list price or the method for
            setting it, schedules reductions, assigns occupancy and carrying costs, and states how offers are
            accepted. Nevada's rule is equal division of community property unless the judge writes down a
            compelling reason not to (
            {NEVADA_LAW.communityPropertyCite}
            ).
          </p>
          <p>
            For a home in The Ridges the order should go further. It should say whether two appraisals are
            required and how the band works, whether a private-exposure window is allowed before the MLS,
            what happens if one spouse refuses to sign a listing amendment or closing documents, and who
            maintains the home and pays the
            {' '}
            {community.hoaMonthly}
            {' '}
            monthly HOA while it is on the market. A court-appointed neutral agent gives both attorneys the same
            showing log, the same feedback and the same offer summaries on the same day.
          </p>
          <p>
            Carrying costs on a home at this price are the reason to move quickly once the order is signed.
            Mortgage, HOA, insurance, utilities, pool and landscape service add up every month the home sits.
            A correct list price in week one, scheduled showings through the gate and a clean offer process
            shorten that period. The
            {' '}
            <Link href="/court-ordered-home-sale">court-ordered home sale page</Link>
            {' '}
            lays out the procedure step by step.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>
        </div>

        <HighValueHomeNote points={[
          `Nearly every Ridges sale is above ${LUXURY_2026.jumboThreshold2026}, so a buyout refinance is jumbo. Get a written pre-approval at the full amount before the settlement number is fixed.`,
          `Sales ran from ${community.lowSale} to ${community.highSale} in 12 months. Use a two-appraisal protocol with a shared information package and a tolerance band set in advance.`,
          'View-corridor lots on the rim price differently from interior lots of the same square footage. Comparables must match lot position, not just size.',
          'Guard-gated showings are scheduled, logged and limited to verified buyers. Plan the pricing timeline around slower exposure and consider a private-exposure window.',
          `HOA dues of ${community.hoaMonthly} per month continue until closing. Assign them in the settlement and clear any assessment before the resale certificate is ordered.`,
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the home, which village it is in, and the timeline your attorneys are working toward.' },
            { title: 'Valuation package', detail: 'A broker price opinion built on Ridges comparables, plus a recommended two-appraisal protocol for counsel.' },
            { title: 'Written plan', detail: 'Buyout feasibility, marketing approach, showing rules and settlement line items in one document both sides can review.' },
            { title: 'Neutral execution', detail: 'Scheduled gate showings, identical updates to both spouses, and a closing calendar that matches the decree.' },
          ]}
          callPromise="You leave the call with a value range, a realistic timeline, and a clear next decision."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
