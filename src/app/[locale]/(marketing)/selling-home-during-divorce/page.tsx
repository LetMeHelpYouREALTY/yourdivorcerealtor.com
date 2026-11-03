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

type ISellingProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/selling-home-during-divorce';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Selling a House During Divorce in Las Vegas | Dr. Jan Duffy',
    description: `Sell the marital home with one neutral agent, two informed spouses, and a court-aware timeline. ${LVR_SEPT_2026.soldWithin30DaysPct} of Las Vegas homes sold within 30 days in September 2026.`,
    alternates: { canonical, languages },
  };
}

export default async function SellingDuringDivorce(props: ISellingProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/selling-home-during-divorce';

  const sellingFaqs = [
    {
      question: 'How do you sell a house during a divorce?',
      answer: 'Agree on one neutral listing agent, get a written valuation both spouses accept, and put the listing terms in your settlement or a stipulated order. The agent then prices, markets, and negotiates with both spouses copied on every update. Proceeds go to escrow and are released as the decree or order directs.',
    },
    {
      question: 'Can I sell my house during a divorce?',
      answer: 'Yes. If both spouses are on title, both must sign the listing agreement and the deed, or a court order must authorize the sale. Many couples sell while the case is open because it settles the largest asset early. If one spouse refuses, your attorney can ask the court to order the sale.',
    },
    {
      question: 'How long does it take to sell a house during a divorce?',
      answer: `In September 2026, ${LVR_SEPT_2026.soldWithin30DaysPct} of Las Vegas single-family homes sold within 30 days of listing. A divorce sale adds time before the listing for valuation, attorney sign-off, and showing rules, and may add time at closing if a decree or order must be recorded first.`,
    },
    {
      question: 'What happens to the proceeds when a house is sold during a divorce?',
      answer: `Net proceeds are held by escrow and distributed as your settlement agreement or court order states. ${NEVADA_LAW.communityPropertyRule} Separate property contributions, such as a down payment from an inheritance, may be reimbursed before the split if documented.`,
    },
    {
      question: 'Do I have to tell buyers we are divorcing?',
      answer: 'No. Divorce is not a material fact about the property, and the listing does not mention it. Agents and buyers will ask why you are selling. The answer is that the owners are relocating. Keep court documents, mail, and calendars out of sight during showings and photography.',
    },
    {
      question: 'What if my home is worth more than $1 million?',
      answer: `Above ${LUXURY_2026.jumboThreshold2026}, any buyout refinance is a jumbo loan with tighter reserve and income rules. Appraisals on custom homes spread widely, so two appraisals are common. Club memberships, guard-gate showing rules, and off-market exposure each need a line in the listing plan.`,
    },
  ];

  const articleSchema = generateArticleSchema(
    'Selling a House During Divorce in Las Vegas',
    'How a Las Vegas divorce home sale works: neutral representation, valuation both spouses accept, court-aware timelines, and proceeds held in escrow until the decree directs release.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Home Sale Services',
    'Neutral listing representation for divorcing homeowners in Las Vegas, Henderson, and Summerlin, from valuation through court-compliant closing.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(sellingFaqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        currentPath={currentPath}
        h1="Selling a House During Divorce in Las Vegas"
        heroSubhead="One neutral agent, two informed spouses, and a timeline your attorneys can work with"
        showHomeValue
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How does selling a house during divorce work in Las Vegas?">
          Both spouses sign one listing agreement with a neutral agent, accept a written valuation, and
          set the sale terms in a settlement or stipulated order. The home is marketed without any mention
          of the divorce. Offers go to both spouses at the same time. Escrow holds the net proceeds and
          releases them exactly as the decree or order directs.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, September 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Homes sold within 30 days of listing', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Single-family homes sold in the month', value: LVR_SEPT_2026.sfrUnitsSold },
            { label: '2026 jumbo loan line, Clark County', value: LUXURY_2026.jumboThreshold2026 },
          ]}
          source={LVR_SEPT_2026.source}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Why selling during divorce is different</h2>
          <p>
            A divorce sale has two sellers who may not be speaking, attorneys who must approve the terms,
            and a court that may set the deadline. The house is usually the largest asset in the case, so
            the price, the net sheet, and the timing all feed property division. A standard listing
            process assumes one decision-maker. This one cannot.
          </p>
          <p>
            Three things change in practice. Every update goes to both spouses at the same moment, in
            writing. Showing rules, repairs, and price changes are agreed before listing, not argued
            mid-escrow. And the net proceeds stay in escrow until the decree or a signed stipulation tells
            the title company how to split them.
          </p>
          <p>
            The emotional weight is real. Most sellers in this position want a clear plan and fewer
            surprises, not reassurance. The process below is built for that.
          </p>

          <h2>The divorce listing process, step by step</h2>
          <p>
            The sale runs in six stages: a private valuation both spouses can accept, a neutral
            listing agreement, property preparation on an agreed schedule, marketing that never
            references the divorce, offer review with both spouses copied, and a closing coordinated with
            your attorneys and the title company. Each stage has a written sign-off so nobody is surprised.
          </p>
          <h3>Valuation both spouses accept</h3>
          <p>
            The first step is a written comparative market analysis using closed sales from the same
            community, square footage band, and lot type. Attorneys use this number for the property
            division worksheet, so it needs to hold up. When the spouses disagree on value, a licensed
            appraisal ordered jointly settles it faster than two competing opinions.
          </p>
          <h3>Neutral listing agreement</h3>
          <p>
            Both spouses sign the same listing agreement. The agent represents the sale, not one side.
            Price, minimum acceptable terms, showing windows, and who pays for repairs are written into
            an addendum. If the court has appointed the agent, the order controls those terms.
          </p>
          <h3>Preparation and showings</h3>
          <p>
            Whoever occupies the home controls day-to-day access, so showing windows are set in advance
            and shared with both spouses. Depersonalize before photography: court mail, calendars, and
            family photos come down. See
            {' '}
            <Link href="/preparing-home-sale-divorce" className="text-blue-600 underline hover:text-blue-700">preparing the home for sale during divorce</Link>
            {' '}
            for the full checklist.
          </p>
          <h3>Marketing and confidentiality</h3>
          <p>
            You are not obligated to disclose a divorce to buyers. The listing describes square footage,
            lot, upgrades, and HOA terms, nothing about the owners. When a buyer's agent asks why you are
            selling, the answer is relocation. A Coming Soon period on the MLS lets agents preview without
            public portal syndication if you want a quieter launch.
          </p>
          <h3>Offers, negotiation, and closing</h3>
          <p>
            Every offer is summarized on one page with price, financing, contingencies, and the net to
            each spouse, then sent to both at the same time. Counteroffers need both signatures. At
            closing, the title company follows the decree or stipulation for the split, and both spouses
            sign the deed unless an order says otherwise.
          </p>

          <h2>How long the sale takes</h2>
          <p>
            In September 2026, Las Vegas REALTORS® reported
            {' '}
            {LVR_SEPT_2026.sfrUnitsSold}
            {' '}
            single-family closings at a
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            {' '}
            median, and
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of homes sold within 30 days of listing. A divorce sale adds time before the listing, not
            usually during it: valuation, attorney review, and an agreed showing plan come first.
          </p>
          <p>
            Three things stretch the timeline. A spouse who delays signatures. A price set to satisfy a
            negotiation instead of the market. And a decree that must be entered before the deed can be
            recorded. Each is avoidable with a written schedule agreed before the sign goes up. The
            {' '}
            <Link href="/divorce-home-sale-timeline" className="text-blue-600 underline hover:text-blue-700">divorce home sale timeline</Link>
            {' '}
            lays out each stage.
          </p>

          <h2>How the proceeds are divided in Nevada</h2>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            That rule, in
            {' '}
            {NEVADA_LAW.communityPropertyCite}
            , is why most Las Vegas divorce sales split net proceeds evenly after the mortgage, liens,
            commissions, and closing costs are paid. Escrow holds the funds until the decree or a signed
            stipulation directs the release.
          </p>
          <p>
            Separate property claims change the math. A down payment traced to an inheritance or a
            pre-marriage account may be reimbursed before the even split. Nevada real property transfer
            tax is
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000 of price on an arm's-length sale, and
            {' '}
            {NEVADA_LAW.transferTaxDivorceExemption.toLowerCase()}
            {' '}
            Read more on
            {' '}
            <Link href="/splitting-house-proceeds-divorce" className="text-blue-600 underline hover:text-blue-700">splitting house proceeds in divorce</Link>
            .
          </p>
          <p>{LEGAL_DISCLAIMER}</p>

          <h2>When a spouse stops cooperating</h2>
          <p>
            Refused showings, missed signatures, or a withdrawn agreement do not end the sale. They move
            it to a written escalation: document the event, notify both attorneys the same day, and ask
            the court to enforce the listing terms or appoint a neutral agent if needed. Most sales
            resume within one round of attorney letters.
          </p>
          <ul>
            <li>Every showing request, response, and no-show is logged with a timestamp.</li>
            <li>Repair and price decisions have a deadline. Silence past the deadline is reported, not argued.</li>
            <li>When an order already exists, the agent reports non-compliance to both attorneys, not to one spouse.</li>
          </ul>
          <p>
            If you are already at that point, start with
            {' '}
            <Link href="/one-spouse-wont-sell-house-divorce" className="text-blue-600 underline hover:text-blue-700">what to do when one spouse won't sell</Link>
            {' '}
            or
            {' '}
            <Link href="/court-ordered-home-sale" className="text-blue-600 underline hover:text-blue-700">court-ordered home sales</Link>
            .
          </p>

          <h2>Pricing the home so it sells once</h2>
          <p>
            Price from closed sales in the same community and size band, not from the number one spouse
            needs for a buyout. An overpriced divorce listing sits, collects low offers, and invites the
            other spouse to blame the strategy. A correctly priced one draws competing offers in the first
            weeks and gives both attorneys a clean record.
          </p>
          <p>
            Pre-listing work that pays in Las Vegas: pool and HVAC service records, a clean HOA account
            statement, and a pre-listing inspection on older homes. Buyers in
            escrow use inspection findings to renegotiate, and a divorce seller has the least room to
            absorb a surprise. The
            {' '}
            <Link href="/divorce-listing-process" className="text-blue-600 underline hover:text-blue-700">divorce listing process</Link>
            {' '}
            page shows each sign-off in order.
          </p>
        </div>

        <HighValueHomeNote points={[
          `Loans above ${LUXURY_2026.jumboThreshold2026} are jumbo. If one spouse wants to keep the home instead of selling, underwriting looks at reserves and income after support, so get a lender pre-read before the buyout is negotiated.`,
          'Custom homes in The Ridges, MacDonald Highlands, and Red Rock Country Club appraise with wide spread. Order two appraisals and average them, or agree in writing to use the listing price as the division value.',
          'Club memberships at Red Rock CC, DragonRidge, Anthem CC, and Summit Club do not transfer automatically. Confirm the transfer fee and waiting list before the listing goes live.',
          'Guard-gated communities require pre-registered showings. Build the gate list into the showing plan so neither spouse can block access by withholding names.',
          `Transfer tax runs ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000, which is ${NEVADA_LAW.transferTaxExample2M}. Section 121 caps the gain exclusion at $250,000 per single filer or $500,000 jointly, which matters on long-held estates.`,
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Fifteen minutes, one spouse or both. You describe where the case stands and who is on title.' },
            { title: 'Written valuation', detail: 'A comparative analysis both attorneys can use, with a net sheet showing proceeds to each spouse.' },
            { title: 'Listing plan', detail: 'Price, showing rules, repair budget, and decision deadlines in one addendum both spouses sign.' },
            { title: 'Launch and close', detail: 'Marketing with no mention of the divorce, offers to both spouses at once, and escrow instructions that match the decree.' },
          ]}
          callPromise="You leave the call with a number, a timeline, and the next decision."
        />

        <PageFAQ faqs={sellingFaqs} />
      </DivorcePageTemplate>
    </>
  );
}
