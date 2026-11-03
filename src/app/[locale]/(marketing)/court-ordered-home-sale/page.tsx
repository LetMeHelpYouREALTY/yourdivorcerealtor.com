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

type ICourtOrderedProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/court-ordered-home-sale';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Court-Ordered Home Sale in a Nevada Divorce | Dr. Jan Duffy',
    description: 'Learn what a court-ordered home sale requires in Clark County: the order\'s 5 usual terms, the appointed agent\'s duties, and how escrow follows the order.',
    alternates: { canonical, languages },
  };
}

export default async function CourtOrderedSale(props: ICourtOrderedProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/court-ordered-home-sale';

  const faqs = [
    {
      question: 'What is a court-ordered home sale in a divorce?',
      answer: 'It is a sale the family court directs when spouses cannot agree on the marital home. The order sets the listing date, price or price floor, the agent, showing access, and how proceeds are split. It can authorize a signature on behalf of a spouse who refuses to sign. Escrow follows the order, not the spouses.',
    },
    {
      question: 'Who chooses the agent in a court-ordered sale?',
      answer: 'The order does. Sometimes the attorneys stipulate to a neutral agent and the court adopts it; sometimes the court appoints one. Either way, the agent represents the sale rather than a spouse, reports to both attorneys, and follows the order\'s price and timing without side arrangements.',
    },
    {
      question: 'Can the price be lowered below what the order says?',
      answer: 'Not without a new order. If the market does not support the ordered price, the agent documents showings, feedback, and comparable closings and sends that record to both attorneys. One of them files a motion to amend. The court decides; the agent does not.',
    },
    {
      question: 'What if my spouse blocks showings after the order?',
      answer: 'That is a violation of the order. Each refused or cancelled showing is logged with a date and sent to both attorneys the same day. A pattern supports a motion to enforce, and the court can grant the agent or the other spouse direct access, or sanction the spouse who refused.',
    },
    {
      question: 'How are the proceeds handled?',
      answer: `Escrow holds the net proceeds and releases them as the order directs. ${NEVADA_LAW.communityPropertyRule} So most orders direct an even split after documented reimbursements, such as carrying costs one spouse paid during the dispute.`,
    },
    {
      question: 'Does a court-ordered sale take longer?',
      answer: `Once the order is entered, no. The listing moves at market speed; in September 2026, ${LVR_SEPT_2026.soldWithin30DaysPct} of Las Vegas single-family homes sold within 30 days. The time is in getting the order, and in any motion to amend if the ordered price is above the market.`,
    },
  ];

  const articleSchema = generateArticleSchema(
    'Court-Ordered Home Sale in a Nevada Divorce',
    'What a court-ordered divorce home sale requires in Clark County: the order\'s terms, the court-appointed agent\'s duties, reporting to both attorneys, and escrow that follows the order.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Court-Ordered Home Sale Services',
    'Court-appointed and neutral listing representation for divorce home sales ordered by the Clark County family court.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Court-Ordered Home Sale in a Nevada Divorce"
        heroSubhead="What the order says, what the appointed agent does, and how escrow follows it"
        showHomeValue
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How does a court-ordered home sale work in a Nevada divorce?">
          The family court orders the marital home sold when the spouses cannot agree. The order sets
          the listing date, price or price floor, the agent, showing access, and the proceeds split, and
          it can authorize a signature for a spouse who refuses. A neutral or court-appointed agent
          runs the sale, reports to both attorneys, and escrow releases funds exactly as the order
          directs.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Nevada equal-division rule', value: NEVADA_LAW.communityPropertyCite },
            { label: 'Las Vegas single-family median, September 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Homes sold within 30 days of listing', value: LVR_SEPT_2026.soldWithin30DaysPct },
          ]}
          source={`Nevada Revised Statutes; ${LVR_SEPT_2026.source}`}
          sourceUrl={NEVADA_LAW.communityPropertyUrl}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>When a Nevada court orders the home sold</h2>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            When neither spouse can buy the other out and they cannot agree to list, selling is how the
            court makes that division under
            {' '}
            {NEVADA_LAW.communityPropertyCite}
            . The order can come during the case, in the decree, or afterward when a decree term is not
            being followed.
          </p>
          <p>
            Typical triggers: one spouse refuses to sign a listing, a buyout refinance fails, a decree
            sets a listing date that passes, or carrying costs are draining both households. The spouse
            asking for the order files a motion; the court hears both sides and issues written terms.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>What the order usually says</h2>
          <p>
            Most Clark County orders cover five things: who the agent is, when the home lists, the list
            price or a floor and how it may be reduced, who controls access and showings, and how escrow
            splits the proceeds. Orders often add signing authority so a refusing spouse cannot stall
            the deed, and a reporting schedule to the attorneys.
          </p>
          <ul>
            <li>
              <strong>Agent:</strong>
              {' '}
              named in the order, or chosen by stipulation and adopted by the court.
            </li>
            <li>
              <strong>Listing date and price:</strong>
              {' '}
              a date certain, a price or floor, and sometimes a schedule of permitted reductions.
            </li>
            <li>
              <strong>Access:</strong>
              {' '}
              showing windows, lockbox authority, and what the occupying spouse must do before showings.
            </li>
            <li>
              <strong>Offers:</strong>
              {' '}
              who may accept, and whether the court or both attorneys must approve.
            </li>
            <li>
              <strong>Proceeds:</strong>
              {' '}
              payoff order, reimbursements, and the split, written for escrow to follow.
            </li>
          </ul>
          <p>
            If the order is silent on something, the agent asks both attorneys for a written answer
            rather than guessing. Where the order is unclear, a short stipulation fixes it faster than a
            dispute in escrow.
          </p>

          <h2>What the court-appointed agent does</h2>
          <p>
            A court-appointed agent represents the sale, not either spouse. Every update goes to both
            spouses and both attorneys in the same message. Price and timing follow the order. Offers
            are summarized on one page and sent to everyone at once. Non-compliance is logged and
            reported the day it happens, and the agent makes no side arrangements with one spouse.
          </p>
          <ul>
            <li>Reads the order with both attorneys before listing and confirms each term in writing.</li>
            <li>Prices from closed comparables and documents them, so a motion to amend has a record.</li>
            <li>Logs every showing request, response, and cancellation with a date.</li>
            <li>Sends a written status report at each milestone the order or attorneys require.</li>
            <li>Delivers escrow instructions that copy the order's distribution language word for word.</li>
          </ul>

          <h2>How the sale proceeds under the order</h2>
          <p>
            Once the order is entered, the listing runs at market speed. In September 2026, Las Vegas
            REALTORS® reported
            {' '}
            {LVR_SEPT_2026.sfrUnitsSold}
            {' '}
            single-family closings at a
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            {' '}
            median, with
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            sold within 30 days. The delays in a court-ordered sale come from the order itself: an
            above-market price, blocked access, or a spouse who will not sign.
          </p>
          <ol>
            <li>
              <strong>Order review:</strong>
              {' '}
              agent and both attorneys confirm every term and fill gaps by stipulation.
            </li>
            <li>
              <strong>Listing:</strong>
              {' '}
              on the ordered date, at the ordered price, with the ordered showing access.
            </li>
            <li>
              <strong>Offers:</strong>
              {' '}
              summarized and sent to both spouses and both attorneys together, with the approval path the order sets.
            </li>
            <li>
              <strong>Escrow:</strong>
              {' '}
              instructions mirror the order; the title company records the order with the deed when required.
            </li>
            <li>
              <strong>Distribution:</strong>
              {' '}
              payoffs, reimbursements, then the split, wired to each spouse directly.
            </li>
          </ol>

          <h2>When the order and the market disagree</h2>
          <p>
            An ordered price above what buyers will pay does not sell, and the agent cannot lower it on
            their own. The fix is a record: showings, feedback, days on market, and comparable closings,
            sent to both attorneys so one can file a motion to amend. Building that record from day one
            is the difference between a one-month correction and a six-month stall.
          </p>
          <p>
            The same applies to access. A spouse who cancels showings after the order is violating it,
            and the log is what the court acts on. See
            {' '}
            <Link href="/one-spouse-wont-sell-house-divorce" className="text-blue-600 underline hover:text-blue-700">what to do when one spouse won't sell</Link>
            {' '}
            and, if a listing already failed,
            {' '}
            <Link href="/home-did-not-sell-during-divorce" className="text-blue-600 underline hover:text-blue-700">relisting after a divorce listing expired</Link>
            .
          </p>

          <h2>Proceeds, taxes, and the transfer</h2>
          <p>
            Escrow pays the mortgage, liens, commissions, and closing costs, then any reimbursement the
            order names, then splits the rest as the order directs. Nevada transfer tax is
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000 on the sale. A transfer of title between spouses under the decree is exempt,
            which is one reason a buyout can cost less than a sale when one spouse can qualify.
          </p>
          <p>
            Section 121 may exclude up to $250,000 of gain per single filer or $500,000 on a joint
            return, with divorce rules that let a spouse who moved out count the other's continued use.
            Nevada has no state income tax. More at
            {' '}
            <Link href="/splitting-house-proceeds-divorce" className="text-blue-600 underline hover:text-blue-700">splitting house proceeds in divorce</Link>
            .
            {' '}
            {LEGAL_DISCLAIMER}
          </p>
        </div>

        <HighValueHomeNote points={[
          `Above ${LUXURY_2026.jumboThreshold2026}, buyer financing is jumbo. Ask the attorneys to write a closing window into the order that allows for jumbo underwriting, or to favor cash offers at this tier.`,
          'Custom homes in The Ridges, MacDonald Highlands, and Red Rock Country Club appraise with wide spread. An order that sets a price from a single appraisal invites a motion to amend; a two-appraisal protocol in the order avoids it.',
          'Guard-gated communities require pre-registered showings. The order should direct the gate list and lockbox authority so access cannot be withheld by the occupying spouse.',
          'Club memberships at Red Rock CC, DragonRidge, Anthem CC, and Summit Club need a line in the order: transfers with the home or surrendered, and who pays the fee.',
          `Transfer tax is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000, which is ${NEVADA_LAW.transferTaxExample2M}. Cash buyers are a larger share at the top tier and can close quickly once the order is recorded.`,
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Send the order or the draft motion. We walk through each term and what is missing.' },
            { title: 'Order-ready valuation', detail: 'A written analysis with comparables attached that the court can adopt as the price.' },
            { title: 'Compliance plan', detail: 'Showing access, logging, reporting schedule, and escrow instructions that mirror the order.' },
          ]}
          callPromise="You leave the call knowing exactly what the order needs to say for the sale to close without a second hearing."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
