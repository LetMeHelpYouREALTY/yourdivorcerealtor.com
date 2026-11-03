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

const path = '/selling-house-during-divorce-nevada-guide';

const faqs = [
  {
    question: 'Is Nevada a 50/50 state for the house?',
    answer: `${NEVADA_LAW.communityPropertyRule} A home bought during the marriage is community property, so the net equity is divided equally unless the court writes a reason to divide it otherwise. Separate property, such as a home owned before marriage, can still carry a community claim for payments made with marital funds. ${LEGAL_DISCLAIMER}`,
  },
  {
    question: 'Can a Nevada judge force the sale of our house?',
    answer: 'Yes. When the spouses cannot agree, the family court can order the home sold and set the terms: who signs the listing, how price is set and reduced, who approves offers, where proceeds are held, and what access the occupying spouse must provide. Orders are entered at the Family Courts and Services Center on North Pecos Road.',
  },
  {
    question: 'Do we pay transfer tax when one spouse keeps the house?',
    answer: `${NEVADA_LAW.transferTaxDivorceExemption} A sale to a third party owes Clark County transfer tax at ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of price, which is ${NEVADA_LAW.transferTaxExample2M}. The title officer applies the exemption code on a decree-based deed.`,
  },
  {
    question: 'Should we sell before or after the decree?',
    answer: 'Selling during the case lets proceeds sit in escrow until the decree directs them and stops one spouse carrying the mortgage alone. Selling after the decree is simpler on signatures but delays cash. The Section 121 exclusion is $500,000 for a joint return and $250,000 single, so on a large gain the timing of the sale relative to the decree matters.',
  },
  {
    question: 'How long will it take to sell in the Las Vegas market?',
    answer: `In September 2026, ${LVR_SEPT_2026.soldWithin30DaysPct} of single-family homes sold within 30 days with ${LVR_SEPT_2026.availableSfrListings} available listings. Add 30 to 45 days of escrow and time for counsel review or a court order. A tract home priced from comparable sales typically funds 60 to 120 days after listing.`,
  },
  {
    question: 'Who holds the money at closing?',
    answer: 'The title company disburses according to the decree, stipulation, or order on file. When those documents are silent or disputed, proceeds stay in escrow or move to an attorney trust account until an order directs payment. The closing statement itemizes every payoff, commission, tax, and credit so each spouse\'s share can be checked line by line.',
  },
];

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Selling a House During Divorce in Nevada | Dr. Jan Duffy',
    description: 'Nevada community property rules, what Clark County family court can order, transfer tax of $5.10 per $1,000, and the sale timeline for divorcing homeowners in Las Vegas.',
    alternates: { canonical, languages },
  };
}

export default async function SellingHouseDuringDivorceNevadaGuide(props: PageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = path;
  const description = 'Nevada community property rules, what Clark County family court can order, transfer tax, and the sale timeline for divorcing homeowners in Las Vegas.';
  const articleSchema = generateArticleSchema(
    'Selling a House During Divorce in Nevada',
    description,
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Nevada Divorce Real Estate Guide Services',
    description,
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Selling a House During Divorce in Nevada"
        heroSubhead="Community property, court orders, taxes, and timeline"
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
        showHomeValue
        currentPath={currentPath}
      >
        <DirectAnswer question="Can I sell my house during a Nevada divorce?">
          Yes, with both spouses' signatures or a family court order. Nevada divides community property equally, so the net proceeds are usually split 50/50 unless the court writes a reason to do otherwise or the spouses agree to an offset. Proceeds can be held in escrow until the decree. A sale to a third party owes Clark County transfer tax; a buyout deed under the decree does not.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Sold within 30 days of listing', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Clark County transfer tax per $1,000', value: NEVADA_LAW.transferTaxClarkPer1000 },
            { label: 'Single-family homes sold, Sept 2026', value: LVR_SEPT_2026.sfrUnitsSold },
          ]}
          source={`${LVR_SEPT_2026.source}; ${NEVADA_LAW.transferTaxCite}`}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Nevada community property and the house</h2>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            (
            {NEVADA_LAW.communityPropertyCite}
            ). A home bought during the marriage with marital funds is community property regardless of whose name is on the deed. A home owned before marriage or received by gift or inheritance is separate property, though marital mortgage payments and improvements can give the community a claim on part of its equity.
          </p>
          <p>
            Equal division applies to net equity, not to the physical house. The spouses can split the sale proceeds, or one can keep the home and the other can receive equivalent value from other assets or a buyout payment. When they cannot agree, the court decides, and it divides what the appraisal or the closing statement shows.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Property acquired during marriage with marital funds is community property</li>
            <li>Community property is divided equally unless the court writes a compelling reason</li>
            <li>Separate property stays with its owner, subject to any community claim for contributions</li>
            <li>The court can order the home sold when the spouses cannot agree</li>
          </ul>

          <h2>The process from decision to funded proceeds</h2>
          <p>
            A Nevada divorce sale runs in six steps: confirm whether the home is community or separate, get a documented value, decide between sale, buyout, or deferred sale, put the decision in a stipulation or order, list and sell under those terms, and disburse per the decree. Each step produces a document counsel can rely on if the other spouse changes course.
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>
              <strong>Characterization.</strong>
              {' '}
              Counsel confirms community, separate, or mixed, from the deed, purchase date, and source of funds.
            </li>
            <li>
              <strong>Valuation.</strong>
              {' '}
              A written broker price opinion to both counsel, and a licensed appraisal if a buyout or contested value calls for it.
            </li>
            <li>
              <strong>Decision.</strong>
              {' '}
              Sell, buy out, or defer, based on who can carry the payment alone and whether a refinance is realistic.
            </li>
            <li>
              <strong>Stipulation or order.</strong>
              {' '}
              Who signs, how price is set and reduced, who approves offers, where proceeds go, and access terms.
            </li>
            <li>
              <strong>Sale.</strong>
              {' '}
              Listing, showings, offers, and escrow with written status reports to both attorneys.
            </li>
            <li>
              <strong>Disbursement.</strong>
              {' '}
              Title company pays per the decree or holds proceeds until an order issues.
            </li>
          </ol>
          <p>
            Step-by-step detail is in
            {' '}
            <Link href="/how-to-sell-house-during-divorce" className="text-blue-600 underline hover:text-blue-700">how to sell a house during divorce</Link>
            {' '}
            and the
            {' '}
            <Link href="/divorce-home-sale-checklist" className="text-blue-600 underline hover:text-blue-700">divorce home sale checklist</Link>
            .
          </p>

          <h2>Court-ordered sales in Clark County</h2>
          <p>
            When one spouse will not agree to sell or cannot refinance to buy out, the other's attorney can move for an order of sale at the Family Courts and Services Center on North Pecos Road. The order should name who signs the listing, how the list price is set and reduced, who approves offers, where proceeds are held, and what the occupying spouse must do for access and condition.
          </p>
          <p>
            A listing agent then works from the order rather than from either spouse. Written status reports to both attorneys record every showing, refusal, offer, and price recommendation with dates, so a spouse who obstructs the sale leaves a record counsel can attach to a motion. Interim orders during the case are common when neither spouse can carry the mortgage alone. See
            {' '}
            <Link href="/court-ordered-home-sale" className="text-blue-600 underline hover:text-blue-700">court-ordered home sale</Link>
            {' '}
            and
            {' '}
            <Link href="/one-spouse-wont-sell-house-divorce" className="text-blue-600 underline hover:text-blue-700">one spouse won't sell</Link>
            .
          </p>

          <h2>Taxes and transfer costs in Nevada</h2>
          <p>
            Three tax rules shape a Nevada divorce sale.
            {' '}
            {NEVADA_LAW.noStateIncomeTax}
            {' '}
            {NEVADA_LAW.capitalGainsExclusion}
            {' '}
            And Clark County charges real property transfer tax of
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000 of sale price, which comes to
            {' '}
            {NEVADA_LAW.transferTaxExample2M}
            .
          </p>
          <p>
            {NEVADA_LAW.transferTaxDivorceExemption}
            {' '}
            That makes a buyout deed cheaper to record than a sale, though the keeping spouse still pays refinance costs. On a gain above the exclusion, whether the sale closes before or after the decree, and whether the couple can still file jointly for that year, changes the tax bill. Bring a CPA in before the stipulation is signed. See
            {' '}
            <Link href="/capital-gains-tax-divorce-home-sale" className="text-blue-600 underline hover:text-blue-700">capital gains tax on a divorce home sale</Link>
            {' '}
            and
            {' '}
            <Link href="/divorce-home-sale-taxes-nevada" className="text-blue-600 underline hover:text-blue-700">Nevada tax considerations</Link>
            .
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>The Las Vegas market and your timeline</h2>
          <p>
            In September 2026 the Las Vegas single-family median was
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            ,
            {' '}
            {LVR_SEPT_2026.sfrUnitsSold}
            {' '}
            homes sold, and
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of them went under contract within 30 days. With
            {' '}
            {LVR_SEPT_2026.availableSfrListings}
            {' '}
            homes available, buyers have choices, so a divorce listing priced above the comparable set sits while the comparables sell.
          </p>
          <p>
            Price from closed sales, not from what either spouse needs the home to be worth. A tract home in Summerlin, Henderson, or North Las Vegas priced from model-match sales typically funds 60 to 120 days after listing once counsel review and any order are accounted for. Custom homes in The Ridges, MacDonald Highlands, or Southern Highlands trade on a smaller buyer pool with more cash and longer marketing periods. Timeline detail is in the
            {' '}
            <Link href="/divorce-home-sale-timeline" className="text-blue-600 underline hover:text-blue-700">divorce home sale timeline</Link>
            .
          </p>

          <h2>Working with your Nevada divorce attorney</h2>
          <p>
            Your attorney characterizes the property, drafts the stipulation or moves for an order, and decides which valuation document the case needs. The listing agent supplies the valuation, the net sheet, the listing authority language, the weekly written reports, and the closing statement. Keeping those roles separate is what keeps the sale from becoming another contested issue.
          </p>
          <p>
            Attorneys who refer the practice can read the neutral process on the
            {' '}
            <Link href="/attorney-resources" className="text-blue-600 underline hover:text-blue-700">attorney resources</Link>
            {' '}
            page. For options beyond a sale, see
            {' '}
            <Link href="/divorce-buyout-options" className="text-blue-600 underline hover:text-blue-700">buyout options</Link>
            {' '}
            and
            {' '}
            <Link href="/what-to-do-with-house-in-divorce" className="text-blue-600 underline hover:text-blue-700">what to do with the house in divorce</Link>
            .
          </p>

          <h2>Quick reference: Nevada divorce real estate terms</h2>
          <div className="my-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <dl className="space-y-3">
              <dt className="font-semibold">Community property</dt>
              <dd className="ml-4">Property acquired during marriage with marital funds, divided equally in Nevada absent a written reason</dd>

              <dt className="font-semibold">Separate property</dt>
              <dd className="ml-4">Property owned before marriage or received by gift or inheritance</dd>

              <dt className="font-semibold">Order of sale</dt>
              <dd className="ml-4">A family court order directing the home be sold and naming the terms</dd>

              <dt className="font-semibold">Interspousal or quitclaim deed</dt>
              <dd className="ml-4">Transfers one spouse's ownership interest; does not remove them from the mortgage</dd>

              <dt className="font-semibold">Buyout</dt>
              <dd className="ml-4">One spouse pays the other's equity share, usually through a refinance in one name</dd>
            </dl>
          </div>
        </div>

        <HighValueHomeNote
          points={[
            `A buyout refinance above ${LUXURY_2026.jumboThreshold2026} is a jumbo loan underwritten on one income and documented reserves; confirm qualification in writing before the stipulation relies on it.`,
            `Transfer tax at ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 is ${NEVADA_LAW.transferTaxExample2M}; the stipulation should say which side bears it on a third-party sale.`,
            'Custom-home appraisal spread can reach six figures; agree a two-appraisal protocol with a tie-breaker before either report is ordered.',
            'Club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, and The Summit Club transfer separately from the deed and belong on the asset schedule.',
            'Guard-gated communities require guest-list approval for showings; name the spouse who controls access in the listing authority.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Fifteen minutes on the property, where the case stands, and what your attorney has asked for.' },
            { title: 'Valuation and net sheet', detail: 'A walk-through both spouses are offered, then a written broker price opinion and net sheet to both of you and both counsel.' },
            { title: 'Listing authority', detail: 'Draft language on price, reductions, offers, proceeds, and access for counsel to put in the stipulation or order.' },
            { title: 'Sale and reporting', detail: 'Weekly written status reports to both attorneys through the closing statement.' },
          ]}
          callPromise="You leave the call with a number, a timeline, and the next decision."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
