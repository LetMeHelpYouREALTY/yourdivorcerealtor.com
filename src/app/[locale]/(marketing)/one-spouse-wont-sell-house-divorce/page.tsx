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

const path = '/one-spouse-wont-sell-house-divorce';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'One Spouse Won\'t Sell the House in Divorce | Dr. Jan Duffy',
    description: 'When one spouse refuses to sell, Nevada courts can order the sale under NRS 125.150. Compare 4 options: mediation, buyout, deferred sale, and court order.',
    alternates: { canonical, languages },
  };
}

export default async function OneSpouseWontSellHouseDivorce(props: PageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/one-spouse-wont-sell-house-divorce';

  const faqs = [
    {
      question: 'Can my spouse stop the sale of our house during divorce?',
      answer: 'Temporarily. When both names are on title, escrow needs both signatures, so a refusal stalls the listing. It does not end it. Your attorney can ask the court to order the sale, appoint a neutral agent, and authorize a signature on the refusing spouse\'s behalf. Document every refusal in the meantime.',
    },
    {
      question: 'How does a forced sale work in Nevada?',
      answer: 'Your attorney files a motion asking the court to order the home sold. The court holds a hearing, and if it agrees, issues an order setting the listing date, price floor, agent, and proceeds split. The court may appoint a neutral agent. Proceeds are held by escrow and released as the order directs.',
    },
    {
      question: 'What if my spouse wants to keep the house instead?',
      answer: `Then the question is whether they can afford a buyout. They need a refinance approval in their own name, and above ${LUXURY_2026.jumboThreshold2026} that is a jumbo loan underwritten on income after support. Ask for the approval letter before agreeing to delay the sale.`,
    },
    {
      question: 'Who pays the mortgage while my spouse refuses to sell?',
      answer: 'Both spouses remain liable to the lender. Temporary orders usually assign the payment to the spouse living in the home, with reimbursement from proceeds at closing. If the refusing spouse also stops paying, raise it with your attorney immediately; a missed payment damages both credit reports.',
    },
    {
      question: 'What counts as sabotaging the sale?',
      answer: 'Refusing or cancelling showings, leaving the home unpresentable, declining to sign counteroffers by the deadline, or telling buyers the sale is contested. Each one is logged with a date and reported to both attorneys the same day. A pattern is what the court acts on.',
    },
    {
      question: 'Does the court have to split the proceeds evenly?',
      answer: `${NEVADA_LAW.communityPropertyRule} So an even split is the default. A court can order reimbursement to one spouse for documented separate-property contributions or for carrying costs paid during a refusal, if it writes down the reason.`,
    },
  ];

  const articleSchema = generateArticleSchema(
    'One Spouse Won\'t Sell the House in Divorce: Your Options',
    'What to do when one spouse refuses to sell the marital home in Nevada: mediation, buyout, deferred sale, and court-ordered sale under NRS 125.150.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Contested Divorce Home Sale Services',
    'Neutral and court-appointed listing representation for Las Vegas divorces where one spouse refuses to sell.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="One Spouse Won't Sell the House in Divorce: Your Options"
        heroSubhead="Mediation, buyout, deferred sale, or a court order, and how each one actually plays out"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="What can I do if my spouse refuses to sell the house during our divorce?">
          A refusal delays the sale but does not stop it. Start with mediation using a written valuation
          and net sheet. If your spouse wants the home, require a refinance approval for a buyout. If
          neither works, your attorney can ask the Nevada court to order the sale, set the terms, and
          appoint a neutral agent. Log every refused showing or missed signature meanwhile.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, September 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Homes sold within 30 days of listing', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Nevada equal-division rule', value: NEVADA_LAW.communityPropertyCite },
          ]}
          source={`${LVR_SEPT_2026.source}; Nevada Revised Statutes`}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Why a spouse refuses, and what each reason needs</h2>
          <p>
            Most refusals come down to one of five things: the number, the move-out date, a wish to keep
            the home, leverage in another part of the case, or not understanding the carrying cost. Each
            has a different fix. Find the reason before choosing between mediation, a buyout, and a
            motion, because the wrong tool wastes months.
          </p>
          <ul>
            <li>
              <strong>The number:</strong>
              {' '}
              a written valuation with comparables attached, or a jointly ordered appraisal.
            </li>
            <li>
              <strong>The move-out date:</strong>
              {' '}
              a closing date and possession terms written into the stipulation.
            </li>
            <li>
              <strong>Wanting to keep it:</strong>
              {' '}
              a buyout, which starts with a refinance approval, not a promise.
            </li>
            <li>
              <strong>Leverage:</strong>
              {' '}
              a motion, because negotiation rewards the delay.
            </li>
            <li>
              <strong>Cost blindness:</strong>
              {' '}
              a monthly carrying-cost sheet showing what the refusal costs both spouses.
            </li>
          </ul>

          <h2>Your four options, in order</h2>
          <p>
            Try mediation first, because most refusals are about a number or a date. If your spouse
            wants the home, test the buyout with a lender before agreeing to wait. A deferred sale with a
            fixed exit date is the fallback when a buyout is close but not ready. A court-ordered sale is
            the last option and the one the other three are measured against.
          </p>
          <h3>Option 1: mediation with the numbers on the table</h3>
          <p>
            Bring the valuation, the net sheet showing proceeds to each spouse, and the monthly carrying
            cost. Agreements reached here go into a stipulation your attorney files. See
            {' '}
            <Link href="/divorce-mediator-resources" className="text-blue-600 underline hover:text-blue-700">divorce mediation resources</Link>
            .
          </p>
          <h3>Option 2: buyout</h3>
          <p>
            The spouse keeping the home refinances in their own name and pays the other's share at
            closing. Ask for the approval letter before the sale is delayed. A buyout that fails after
            months of waiting puts the sale back on a court timeline. Details at
            {' '}
            <Link href="/divorce-buyout-options" className="text-blue-600 underline hover:text-blue-700">divorce buyout options</Link>
            .
          </p>
          <h3>Option 3: deferred sale with an exit date</h3>
          <p>
            Co-own for a set period with a written listing date, who pays which bills, who may occupy,
            and what happens on a missed payment. Without those four terms, a deferred sale is a refusal
            with a new name.
          </p>
          <h3>Option 4: court-ordered sale</h3>
          <p>
            Your attorney files a motion. The order sets the listing date, price floor, agent, and
            proceeds split, and can authorize a signature on the refusing spouse's behalf. See
            {' '}
            <Link href="/court-ordered-home-sale" className="text-blue-600 underline hover:text-blue-700">how a court-ordered home sale works</Link>
            .
          </p>

          <h2>How a forced sale works in Nevada</h2>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            Under
            {' '}
            {NEVADA_LAW.communityPropertyCite}
            , the home is community property the court must divide, and selling it is the usual way to
            divide it when one spouse cannot buy the other out. The court can order the sale, set its
            terms, and appoint a neutral agent to carry it out.
          </p>
          <ol>
            <li>
              <strong>Motion:</strong>
              {' '}
              your attorney asks the court to order the sale and states the proposed terms.
            </li>
            <li>
              <strong>Hearing:</strong>
              {' '}
              both sides are heard; a written valuation and a log of refusals carry weight here.
            </li>
            <li>
              <strong>Order:</strong>
              {' '}
              listing date, price floor, agent, showing access, and the proceeds split.
            </li>
            <li>
              <strong>Appointment:</strong>
              {' '}
              the court may name a neutral agent who reports to both attorneys.
            </li>
            <li>
              <strong>Sale and distribution:</strong>
              {' '}
              escrow follows the order, and the court can sign for a spouse who will not.
            </li>
          </ol>
          <p>{LEGAL_DISCLAIMER}</p>

          <h2>Working with a court-appointed agent</h2>
          <p>
            A court-appointed agent represents the sale, not either spouse. Every update goes to both
            spouses and both attorneys at the same time, in writing. The agent follows the order's price
            and timing, reports non-compliance the day it happens, and does not negotiate side
            arrangements with one spouse. That neutrality is what makes the order enforceable.
          </p>
          <ul>
            <li>Showing windows set by the order, with every request and response logged.</li>
            <li>Offers summarized on one page and sent to both spouses and both attorneys together.</li>
            <li>Price changes only within the order's floor, or with a new order.</li>
            <li>A written status report at each milestone the court or attorneys ask for.</li>
          </ul>

          <h2>Preventing sale sabotage</h2>
          <p>
            A refusing spouse who cannot stop the sale may slow it: cancelled showings, an unpresentable
            home, counteroffers left unsigned past the deadline. The answer is a log, not an argument.
            Each event is recorded with a date and sent to both attorneys the same day. A pattern of
            events is what the court enforces against.
          </p>
          <ul>
            <li>Date-stamped log of every showing request, response, and cancellation.</li>
            <li>Decision deadlines on price, repairs, and offers, with silence reported as a missed deadline.</li>
            <li>No private calls with one spouse about the other's conduct; everything goes to both attorneys.</li>
            <li>A request for court intervention only after the log shows a pattern.</li>
          </ul>

          <h2>What the refusal costs</h2>
          <p>
            Every month of delay keeps both spouses liable for the mortgage, taxes, insurance, HOA dues,
            and upkeep, and adds legal fees for each round of letters. Meanwhile the market moves on
            its own schedule: in September 2026, the Las Vegas single-family median was
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            {' '}
            and
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of homes sold within 30 days. Carrying costs rarely come back in the price.
          </p>
          <p>
            Related reading:
            {' '}
            <Link href="/selling-home-during-divorce" className="text-blue-600 underline hover:text-blue-700">selling a house during divorce</Link>
            {' '}
            and
            {' '}
            <Link href="/divorce-property-division" className="text-blue-600 underline hover:text-blue-700">property division in Nevada</Link>
            .
          </p>
        </div>

        <HighValueHomeNote points={[
          `A spouse who wants to keep a home above ${LUXURY_2026.jumboThreshold2026} needs a jumbo refinance approval, underwritten on income after support with larger reserves. Ask for the letter before agreeing to any delay.`,
          'On custom homes in The Ridges, MacDonald Highlands, and Red Rock Country Club, a refusing spouse often disputes the valuation. A two-appraisal protocol written into the order removes that argument.',
          'Guard-gated showings require pre-registered names. The order should direct the gate list and showing access so one spouse cannot block buyers by withholding it.',
          'Club memberships at Red Rock CC, DragonRidge, Anthem CC, and Summit Club have transfer fees and waiting lists. The order should say whether the membership transfers and who pays.',
          'Cash buyers are a larger share at this tier and can close quickly once the order is entered. Off-market exposure to a vetted buyer list keeps a contested sale out of public view.',
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Tell me what your spouse has refused, whether an order exists, and what your attorney has filed.' },
            { title: 'Valuation and carrying-cost sheet', detail: 'The two documents that move mediation and support a motion.' },
            { title: 'Neutral or court-appointed listing', detail: 'A plan that both attorneys can file, with logging and reporting built in.' },
          ]}
          callPromise="You leave the call knowing which of the four options fits and what to hand your attorney."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
