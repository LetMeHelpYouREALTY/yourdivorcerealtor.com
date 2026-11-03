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

const path = '/divorce-home-sale-timeline';
const pageTitle = 'How Long to Sell a House in a Divorce';
const pageDescription = 'Typical Las Vegas divorce sale: 2 to 4 weeks to prepare, market time, then a 30 to 45 day financed escrow. 53.4% of homes sold within 30 days in September 2026.';

const faqs = [
  {
    question: 'How long does it take to sell a house during a divorce in Las Vegas?',
    answer: `A typical total is two to four months from the listing decision to closing. Preparation takes two to four weeks, then market time, then a 30 to 45 day financed escrow or a 10 to 21 day cash escrow. In September 2026, ${LVR_SEPT_2026.soldWithin30DaysPct} of Las Vegas single-family sales closed within 30 days on market. The rest are typical ranges, not promises.`,
  },
  {
    question: 'Does a divorce make the sale take longer?',
    answer: 'Only where the two of you disagree. The market does not know the sellers are divorcing. What adds time is a listing agreement one spouse will not sign, a price set to win an argument, showings blocked by the spouse living there, or a court approval step. With a written agreement on price, showings, and signing, a divorce sale runs on normal timelines.',
  },
  {
    question: 'Can we close before the decree is entered?',
    answer: 'Yes. Both spouses sign the contract and closing documents, and the net proceeds are wired into a holding account, an attorney trust account, or split per a signed settlement. The decree later confirms the split. Closing before the decree is common in Las Vegas because it stops the mortgage, HOA, and insurance bills from running while the case finishes.',
  },
  {
    question: 'What is the fastest a divorce home sale can close?',
    answer: 'A cash buyer with no financing can typically close in 10 to 21 days from an accepted contract. Preparation still takes time before listing, and the buyer usually keeps an inspection period. At the top of the Las Vegas market many buyers pay cash, so a well-priced home above $1 million can move from contract to closing quickly even when it took longer to find its buyer.',
  },
  {
    question: 'What happens if the house does not sell within the time the decree gave us?',
    answer: 'The decree should say. Good decrees name a price reduction schedule, a date to revisit the listing, and who decides. Without that language, the spouses go back to their attorneys or the court. The home did not sell page covers the usual causes, which are almost always price, access, or presentation rather than the market.',
  },
  {
    question: 'Who pays the mortgage while the house is on the market?',
    answer: `Whoever the decree or a temporary order says. Until then, both borrowers are liable to the lender, and a late payment during the listing hurts both credit files and can surface in the buyer's title search. Put the payment responsibility, the HOA dues, and the insurance in writing before the sign goes up. ${LEGAL_DISCLAIMER}`,
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

export default async function DivorceHomeSaleTimeline(props: PageProps) {
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
    'Divorce Home Sale Timeline Planning',
    pageDescription,
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqSchema]} />
      <DivorcePageTemplate
        h1="How Long Does It Take to Sell a House in a Divorce?"
        heroSubhead="Las Vegas ranges, stage by stage"
        showHomeValue
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How long does it take to sell a house in a divorce?">
          A typical Las Vegas divorce sale runs two to four months from the listing decision to closing. Preparation takes two to four weeks. Market time varies: in September 2026,
          {' '}
          {LVR_SEPT_2026.soldWithin30DaysPct}
          {' '}
          of Las Vegas single-family sales closed within 30 days on market. Escrow then typically runs 30 to 45 days with a financed buyer or 10 to 21 days with cash. Those escrow figures are typical ranges, not data.
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
          <h2>The short answer: two to four months, in three stages</h2>
          <p>
            Three stages make up the timeline: getting to a signed listing, finding the buyer, and closing escrow. The first and third are predictable. The middle one depends on price, condition, access, and the buyer pool in your price band. Add them up and a typical Las Vegas divorce sale lands between two and four months. A cash buyer or a fast decision pulls it shorter; a disputed price pushes it longer.
          </p>
          <div className="my-6 border-l-4 border-blue-600 bg-blue-50 p-6">
            <ul className="space-y-2">
              <li>
                <strong>Agreement and preparation:</strong>
                {' '}
                two to four weeks (typical range)
              </li>
              <li>
                <strong>Listing to accepted offer:</strong>
                {' '}
                {LVR_SEPT_2026.soldWithin30DaysPct}
                {' '}
                of Las Vegas single-family sales closed within 30 days on market in September 2026 (data)
              </li>
              <li>
                <strong>Escrow, financed buyer:</strong>
                {' '}
                30 to 45 days (typical range)
              </li>
              <li>
                <strong>Escrow, cash buyer:</strong>
                {' '}
                10 to 21 days (typical range)
              </li>
            </ul>
          </div>

          <h2>Stage 1: agreement and preparation (two to four weeks)</h2>
          <p>
            The clock starts when both spouses agree to sell, or a court orders it. From there, two to four weeks typically covers the valuation, the listing agreement, repairs and cleaning, staging if needed, photography, and the disclosure paperwork. Homes already in showing condition hit the short end. Homes that need a move-out, a repair, or a court approval hit the long end.
          </p>
          <ul>
            <li>
              Valuation and net proceeds, so both spouses see the same number. See the
              {' '}
              <Link href="/divorce-home-valuation" className="text-blue-600 underline hover:text-blue-700">valuation page</Link>
              .
            </li>
            <li>Listing agreement signed by both spouses, or one spouse under a court order.</li>
            <li>Written agreement on list price, the reduction schedule, showing hours, and who signs offers.</li>
            <li>Seller's Real Property Disclosure, HOA resale package ordered, gate access set for guard-gated communities.</li>
          </ul>
          <p>
            The
            {' '}
            <Link href="/divorce-home-sale-checklist" className="text-blue-600 underline hover:text-blue-700">divorce home sale checklist</Link>
            {' '}
            covers each item in order.
          </p>

          <h2>Stage 2: listing to accepted offer</h2>
          <p>
            Market time is the stage with real data behind it. In September 2026, Las Vegas REALTORS® reported
            {' '}
            {LVR_SEPT_2026.sfrUnitsSold}
            {' '}
            single-family homes sold,
            {' '}
            {LVR_SEPT_2026.availableSfrListings}
            {' '}
            available, and
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of sales closed within 30 days on market. A home priced to its band, with clean access for showings, typically draws offers inside that window. The rest of the market took longer, and price is almost always why.
          </p>
          <p>
            Divorce adds one variable the market does not have: two decision makers. An offer that one spouse wants to accept and the other wants to counter costs days each round. Agree in advance on the floor price and who answers offers, and the negotiation runs at normal speed. The
            {' '}
            <Link href="/divorce-listing-process" className="text-blue-600 underline hover:text-blue-700">listing process page</Link>
            {' '}
            shows how a neutral agent presents every offer to both spouses at the same time.
          </p>

          <h2>Stage 3: escrow to closing</h2>
          <p>
            Once the contract is signed, a financed escrow typically runs 30 to 45 days and a cash escrow 10 to 21 days. Those are typical ranges. The buyer's inspection period, the appraisal, loan approval, and title work fill the calendar. The divorce-specific step is signing: both spouses sign the closing documents, and the title company can send a mobile notary to each of them or use remote online notarization.
          </p>
          <ol>
            <li>Earnest money deposited; inspection period begins.</li>
            <li>Repair requests negotiated; appraisal ordered by the buyer's lender.</li>
            <li>Loan approval; closing disclosure issued.</li>
            <li>Both spouses sign; funds wire per the decree, a signed settlement, or into a holding account until the decree is entered.</li>
          </ol>
          <p>
            A sale pays Clark County transfer tax of
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000 of value, which comes out of proceeds at closing. A decree transfer of title to one spouse instead of a sale is exempt under
            {' '}
            {NEVADA_LAW.transferTaxCite}
            .
          </p>
          <p className="text-sm text-gray-600">{LEGAL_DISCLAIMER}</p>

          <h2>What slows a divorce sale</h2>
          <p>
            The delays are rarely the market. They are the listing agreement one spouse will not sign, the price set above the band to win an argument, the showings refused by the spouse still living there, the court approval nobody scheduled, and the offer that sits unanswered while two attorneys trade emails. Each is avoidable with a written plan before the listing goes live.
          </p>
          <ul>
            <li>
              <strong>One spouse will not cooperate:</strong>
              {' '}
              a court can order the sale and name who signs. See
              {' '}
              <Link href="/one-spouse-wont-sell-house-divorce" className="text-blue-600 underline hover:text-blue-700">when one spouse will not sell</Link>
              .
            </li>
            <li>
              <strong>Court approval required:</strong>
              {' '}
              add the hearing time up front; the sale itself runs normally afterward.
            </li>
            <li>
              <strong>Occupied home with restricted showings:</strong>
              {' '}
              fewer showings means more days on market. Fixed showing windows solve most of it.
            </li>
            <li>
              <strong>Guard-gated community:</strong>
              {' '}
              gate access lists and HOA rules on signage and open houses take setup time.
            </li>
            <li>
              <strong>Jumbo financing:</strong>
              {' '}
              a buyer borrowing above
              {' '}
              {LUXURY_2026.jumboThreshold2026}
              {' '}
              faces stricter underwriting and sometimes a second appraisal, which can stretch escrow.
            </li>
          </ul>

          <h2>How to shorten it</h2>
          <p>
            Price to the band on day one, agree on showings and signing authority before listing, and have both spouses pre-sign what the title company allows. Treat every offer as a same-day decision. Those four habits move a divorce sale from the long end of the range to the short end more reliably than anything about the market.
          </p>
          <ul>
            <li>Price from the valuation, not from the buyout number one spouse wanted.</li>
            <li>Order the HOA resale package and the preliminary title report before listing so escrow has no surprises.</li>
            <li>Decide now whether a cash offer below list beats a financed offer at list. In many divorces it does.</li>
            <li>Keep the mortgage, HOA, and insurance current through closing. A late payment during escrow can derail the buyer's title work.</li>
          </ul>
        </div>

        <HighValueHomeNote points={[
          'Above $1 million the buyer pool is smaller and more buyers pay cash. Market time can run longer; escrow can run shorter. Plan the decree deadline for both.',
          `A buyer borrowing above ${LUXURY_2026.jumboThreshold2026} faces jumbo underwriting and often a second appraisal. Ask for the lender's timeline before accepting a financed offer over a cash one.`,
          'Custom homes in The Ridges, MacDonald Highlands, or Red Rock Country Club can draw appraisals far apart. A two-appraisal protocol set before listing prevents a mid-escrow price fight between spouses.',
          'Guard-gated showing rules, HOA signage limits, and private exposure before the MLS all add setup days. Build them into stage one, not stage two.',
          `A sale of a $2,000,000 home pays ${NEVADA_LAW.transferTaxExample2M} in transfer tax; a decree transfer to one spouse pays none. The timeline choice changes the tax.`,
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Where the case stands, who is living in the home, and what deadline the decree or settlement sets.' },
            { title: 'Valuation and pricing plan', detail: 'A number both spouses accept, a list price, and a written reduction schedule.' },
            { title: 'Showing and signing plan', detail: 'Showing windows, gate access, offer authority, and how each spouse signs at closing.' },
            { title: 'List and close', detail: 'Every offer to both spouses the same day, escrow run to the calendar.' },
          ]}
          callPromise="You leave the call with a realistic closing window for your home and your price band."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
