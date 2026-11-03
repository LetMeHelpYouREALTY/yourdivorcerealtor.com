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
import { LEGAL_DISCLAIMER, LUXURY_2026, LVR_SEPT_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

const path = '/divorce-real-estate-timeline';
const pageTitle = 'Divorce Real Estate Timeline in Las Vegas';
const pageDescription = 'How long the house takes in a Nevada divorce, valuation to closing. 53.4% of Las Vegas homes sold within 30 days in Sept 2026; escrow adds 30 to 45 days.';

type ITimelineProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const faqs = [
  {
    question: 'How long does the house take in a Las Vegas divorce?',
    answer: `For a sale, a typical range is three to five months from the first valuation to closing: a few weeks to decide and prepare, time on market, then escrow. In September 2026, ${LVR_SEPT_2026.soldWithin30DaysPct} of Las Vegas single-family sales closed within 30 days on market. A buyout refinance typically runs 30 to 45 days once the decree is entered. These are typical ranges, not promises.`,
  },
  {
    question: 'Can we list the house before the divorce is final?',
    answer: 'Yes, when both spouses sign the listing agreement, or when a court order authorizes the sale. Many Las Vegas divorce sales close before the decree is entered, with proceeds held in escrow or a trust account until the decree says how to split them. Listing early shortens the total timeline because market time and the legal process run side by side.',
  },
  {
    question: 'How long is escrow on a divorce sale?',
    answer: 'Escrow is the same as any other sale. A financed buyer typically closes in 30 to 45 days; a cash buyer in 10 to 21 days. Those are typical ranges. What adds time in a divorce is signatures: both spouses sign the contract, the disclosures, and the closing documents, and a spouse who lives out of state signs through a mobile notary or remote online notarization.',
  },
  {
    question: 'What is the timeline for a buyout instead of a sale?',
    answer: `Valuation and agreement on the number come first, often two to four weeks. Then the keeping spouse applies for the refinance, which typically runs 30 to 45 days to funding after the decree is entered. Above ${LUXURY_2026.jumboThreshold2026} the loan is jumbo, underwritten on one income with reserves, and a second appraisal can add time. The decree should set the deadline and a sale fallback.`,
  },
  {
    question: 'Does a court-ordered sale take longer?',
    answer: 'Usually, because the order itself has to be obtained first, and the order may specify the agent, the listing price method, and deadlines. Once the order is in hand the listing and escrow run on normal timelines. Court-ordered sales are covered on the court-ordered home sale page, including what the order typically says about price reductions and signatures.',
  },
  {
    question: 'When should I start looking for my next home?',
    answer: 'Once the decree or a signed settlement says what you will receive and when. Lenders need the entered decree to count support income or exclude debts assigned to your former spouse, and the old joint mortgage must be refinanced or paid off, or shown as paid by the other spouse, before it stops counting against you. The buying after divorce page covers the sequence.',
  },
];

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: `${pageTitle} | Dr. Jan Duffy`,
    description: pageDescription,
    alternates: { canonical, languages },
  };
}

export default async function Timeline(props: ITimelineProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = path;
  const articleSchema = generateArticleSchema(
    pageTitle,
    pageDescription,
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Real Estate Timeline Planning',
    pageDescription,
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqSchema]} />
      <DivorcePageTemplate
        h1={pageTitle}
        heroSubhead="From first call to keys, with realistic ranges"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How long does the house take in a Nevada divorce?">
          A sale typically runs three to five months from valuation to closing. The legal decision and preparation take a few weeks, then the home goes on market. In September 2026,
          {' '}
          {LVR_SEPT_2026.soldWithin30DaysPct}
          {' '}
          of Las Vegas single-family sales closed within 30 days on market. Escrow typically adds 30 to 45 days financed or 10 to 21 days cash. A buyout refinance typically runs 30 to 45 days after the decree is entered. These are typical ranges, not promises.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Homes sold within 30 days on market, Sept 2026', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Single-family homes sold, Sept 2026', value: LVR_SEPT_2026.sfrUnitsSold },
            { label: 'Single-family listings available, Sept 2026', value: LVR_SEPT_2026.availableSfrListings },
            { label: 'Single-family median price, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
          ]}
          source={LVR_SEPT_2026.source}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>How long the whole process takes</h2>
          <p>
            Two tracks exist. A sale runs valuation, decision, preparation, market time, and escrow, and typically lands at three to five months. A buyout runs valuation, agreement on the number, and a refinance, and typically lands at six to ten weeks once the decree is entered. Both tracks share the first two steps, so the earliest decision that matters is which track you are on.
          </p>
          <p>
            The ranges on this page are typical ranges drawn from how Las Vegas escrows and lenders actually run, not statistics. The one figure that is data is the Las Vegas REALTORS® September 2026 number:
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of single-family sales closed within 30 days on market. Your home's price band, condition, and the cooperation between the two of you move you inside or outside those ranges.
          </p>

          <h2>Phase 1: valuation and the decision (one to three weeks)</h2>
          <p>
            Everything starts with a number both spouses can accept. A
            {' '}
            <Link href="/divorce-home-valuation" className="text-blue-600 underline hover:text-blue-700">divorce home valuation</Link>
            {' '}
            takes a few days to prepare once access to the home is arranged. With the value, the loan payoff, and the
            {' '}
            <Link href="/divorce-net-proceeds-calculator" className="text-blue-600 underline hover:text-blue-700">net proceeds</Link>
            {' '}
            in hand, the two of you and your attorneys decide: sell, buy out, or hold for a set period. That decision typically takes one to three weeks when both sides are talking.
          </p>
          <p>
            Nevada's community property rule shapes the math.
            {' '}
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            (
            {NEVADA_LAW.communityPropertyCite}
            ). Equity is usually split equally unless the decree says otherwise, so the valuation sets both the buyout and each spouse's share of a sale.
          </p>
          <p className="text-sm text-gray-600">{LEGAL_DISCLAIMER}</p>

          <h2>Phase 2: preparation and listing (two to four weeks)</h2>
          <p>
            Preparation is repairs, cleaning, staging if needed, photography, and the paperwork: the listing agreement signed by both spouses, Nevada's Seller's Real Property Disclosure, HOA documents, and a showing plan that works for whoever is living in the home. Two weeks is typical for a home in good condition; four when repairs or a move-out come first. The
            {' '}
            <Link href="/divorce-home-sale-checklist" className="text-blue-600 underline hover:text-blue-700">sale checklist</Link>
            {' '}
            lists each item.
          </p>
          <ul>
            <li>Both spouses sign the listing agreement, or a court order authorizes one spouse to sign.</li>
            <li>Agree on the list price method in writing now, including when and how a reduction happens.</li>
            <li>Guard-gated communities need gate access lists and showing windows arranged before photos go live.</li>
          </ul>

          <h2>Phase 3: on market</h2>
          <p>
            Market time is the one phase no one controls fully. In September 2026,
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of Las Vegas single-family sales closed within 30 days on market, with
            {' '}
            {LVR_SEPT_2026.availableSfrListings}
            {' '}
            single-family listings available and
            {' '}
            {LVR_SEPT_2026.sfrUnitsSold}
            {' '}
            sold that month. A home priced to its band and shown without friction typically draws offers within weeks. A home priced to settle an argument between spouses typically sits.
          </p>
          <p>
            Above $1 million the pool of buyers is smaller and more of them pay cash. Custom homes in The Ridges or MacDonald Highlands often take longer to find their buyer than a tract home in Summerlin or Henderson, and the offer, once it arrives, may close faster. Plan the listing around that rather than around a calendar date in the decree.
          </p>

          <h2>Phase 4: escrow to closing</h2>
          <p>
            Once a contract is signed, a financed escrow typically runs 30 to 45 days and a cash escrow 10 to 21 days. Those are typical ranges, not data. Inside escrow are the buyer's inspection period, the appraisal, loan approval, title work, and signing. Divorce adds one thing: two sellers who each sign every document, often from different addresses.
          </p>
          <ol>
            <li>Contract accepted and earnest money deposited.</li>
            <li>Inspection period, repair negotiation, and the buyer's appraisal.</li>
            <li>Loan approval and the closing disclosure.</li>
            <li>Both spouses sign with a notary. Proceeds wire per the decree or into a holding account until the decree is entered.</li>
          </ol>
          <p>
            Closing before the decree is entered is common and often wise, because the mortgage, HOA dues, and insurance stop running the day escrow closes. The title company holds the net proceeds, or wires them to an attorney trust account, until the decree or a signed settlement says how they split. The
            {' '}
            <Link href="/splitting-house-proceeds-divorce" className="text-blue-600 underline hover:text-blue-700">proceeds page</Link>
            {' '}
            explains the holding options.
          </p>

          <h2>What moves you inside or outside the ranges</h2>
          <p>
            Four things decide whether your timeline lands at the short end or the long end: price set to the band rather than to an argument, showing access that does not depend on one spouse's mood, signing authority agreed before the first offer, and a decree or temporary order that names who pays the mortgage until closing. Get those four in writing and the market does the rest.
          </p>
          <ul>
            <li>A written floor price and reduction schedule turns a two-week argument into a one-day decision.</li>
            <li>Fixed showing windows in an occupied home keep buyers coming without surprising the spouse who lives there.</li>
            <li>Remote online notarization or a mobile notary lets a spouse who moved out of state sign without a flight.</li>
            <li>A neutral agent who sends every offer to both spouses at the same time removes the delay that comes from one side hearing news second.</li>
          </ul>

          <h2>The buyout track and the court-ordered track</h2>
          <p>
            When one spouse keeps the home, the timeline is a refinance instead of a listing. After the decree is entered, a refinance typically runs 30 to 45 days to funding. Above
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            the loan is jumbo, underwritten on the keeping spouse's income alone with reserves, and a second appraisal is common. The
            {' '}
            <Link href="/refinancing-after-divorce" className="text-blue-600 underline hover:text-blue-700">refinancing page</Link>
            {' '}
            covers the steps.
          </p>
          <p>
            When the spouses cannot agree, a judge can order the sale. Obtaining the order adds time up front, and the order often names the agent, the pricing method, and the signing authority. After that the sale runs on the same market and escrow ranges above. The
            {' '}
            <Link href="/court-ordered-home-sale" className="text-blue-600 underline hover:text-blue-700">court-ordered sale page</Link>
            {' '}
            explains what the order usually contains. A decree transfer of title to one spouse is exempt from transfer tax under
            {' '}
            {NEVADA_LAW.transferTaxCite}
            ; a sale pays
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000.
          </p>
          <p className="text-sm text-gray-600">{LEGAL_DISCLAIMER}</p>
        </div>

        <HighValueHomeNote points={[
          'Above $1 million the buyer pool is smaller and more buyers pay cash, so market time can run longer while escrow runs shorter. Plan the decree deadline around both.',
          `A buyout refinance above ${LUXURY_2026.jumboThreshold2026} is underwritten on the keeping spouse's income alone with reserves, and a second appraisal is common. Add time for it.`,
          'Custom homes in The Ridges, MacDonald Highlands, or Southern Highlands Golf Club can draw appraisals far apart. A two-appraisal protocol agreed before listing avoids a mid-escrow dispute.',
          'Guard-gated communities need gate access and showing windows set before the listing goes live. Private or off-market exposure can run first when privacy matters more than days on market.',
          `A decree transfer of title is exempt from transfer tax, while a sale pays ${NEVADA_LAW.transferTaxExample2M}. The timeline choice changes the tax line.`,
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Where the divorce stands, who is living in the home, and whether a sale or a buyout is on the table.' },
            { title: 'Valuation', detail: 'A number both spouses can accept, with the net proceeds and the buyout math side by side.' },
            { title: 'Written timeline', detail: 'Dates for the decision, listing or refinance application, and closing, matched to the decree.' },
            { title: 'Execute', detail: 'Listing or refinance runs on schedule, with both spouses informed at the same time.' },
          ]}
          callPromise="You leave the call with a number, a timeline, and the next decision."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
