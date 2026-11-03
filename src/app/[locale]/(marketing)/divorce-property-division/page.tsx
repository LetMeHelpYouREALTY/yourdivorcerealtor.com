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

const path = '/divorce-property-division';

type IPropertyDivisionProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Nevada Divorce Property Division: The House | Dr. Jan Duffy',
    description: 'How Nevada divides the marital home: NRS 125.150 equal division, four ways to split the house, and what the $470,000 Las Vegas median means for your equity.',
    alternates: { canonical, languages },
  };
}

export default async function PropertyDivision(props: IPropertyDivisionProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/divorce-property-division';
  const articleSchema = generateArticleSchema(
    'Nevada Divorce Property Division: The House',
    'How Nevada divides the marital home: NRS 125.150 equal division, four ways to split the house, and what the Las Vegas median means for your equity.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Property Division Services',
    'Neutral valuation, equity calculation, and sale or buyout coordination for dividing the marital home in a Nevada divorce.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const propertyDivisionFaqs = [
    {
      question: 'How is the house divided in a Nevada divorce?',
      answer: 'Nevada is a community property state. A home bought during the marriage with community funds is divided equally unless the court finds a compelling reason, stated in writing, to divide it another way. The house itself is handled by a sale and split of net proceeds, a buyout by one spouse, a deferred sale, or a court-ordered sale.',
    },
    {
      question: 'Who gets the house in a divorce in Nevada?',
      answer: 'Either spouse can keep the house if they can pay the other for half the equity and qualify for a mortgage alone. If neither can, or neither wants to, the home is sold and the net proceeds are split. The decision turns on finances and agreement, not on whose name is on the deed.',
    },
    {
      question: 'Do I need a home valuation for property division?',
      answer: 'Yes. Equal division is only equal if both sides accept the same value. A comparative market analysis dated near the division works for most settlements. Contested cases and custom homes usually need a licensed appraisal, and sometimes two. The valuation date matters as much as the number.',
    },
    {
      question: 'What if we cannot agree on who gets the house?',
      answer: 'The court can order the home sold and the net proceeds divided. Clark County judges often name a neutral agent in that order, with deadlines for listing, pricing, and accepting offers. Agreeing on a neutral agent before it reaches that point keeps control of timing and price with the two of you.',
    },
    {
      question: 'Does it matter whose name is on the title?',
      answer: 'Not by itself. In Nevada, a home acquired during the marriage with community funds is community property even if only one spouse is on the deed. Title matters for the mechanics, such as who signs the deed and who the lender recognizes, but not for whether the equity is shared.',
    },
    {
      question: 'Is there transfer tax when one spouse keeps the house?',
      answer: 'Clark County charges real property transfer tax at $2.55 per $500 of value. A transfer between former spouses that complies with a divorce decree is exempt under NRS 375.090(6). A sale to a third party is not exempt, and the tax is paid out of the proceeds at closing.',
    },
  ];
  const faqPageSchema = generateFAQPageSchema(propertyDivisionFaqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Divorce Property Division in Las Vegas"
        heroSubhead="How Nevada divides the house, and how the numbers get settled"
        showHomeValue
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How is the house divided in a Nevada divorce?">
          Nevada is a community property state. A home bought during the marriage with marital funds is divided equally unless a judge finds a compelling reason, stated in writing, to do otherwise. In practice that means one of four outcomes: sell and split the net proceeds, one spouse buys out the other, a deferred sale, or a court-ordered sale. Every one of them rests on the home’s current value.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Homes sold within 30 days', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Single-family homes available for sale', value: LVR_SEPT_2026.availableSfrListings },
          ]}
          source={LVR_SEPT_2026.source}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>What Nevada law says about the marital home</h2>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            That rule, from
            {' '}
            {NEVADA_LAW.communityPropertyCite}
            , covers the house when it was bought during the marriage with community funds. Title alone does not decide it. A home one spouse owned before the wedding, or received as a gift or inheritance, starts as separate property. Community payments made on it during the marriage can still create a community claim.
          </p>
          <p>The usual sorting looks like this:</p>
          <ul>
            <li>
              <strong>Community:</strong>
              {' '}
              a home purchased during the marriage, mortgage payments made from wages, and improvements paid with joint funds.
            </li>
            <li>
              <strong>Separate:</strong>
              {' '}
              a home owned before the marriage, an inherited home, or a down payment traced to one spouse’s separate account.
            </li>
            <li>
              <strong>Mixed:</strong>
              {' '}
              a separate home that community income paid down for years, or a community home bought with a separate down payment.
            </li>
          </ul>
          <p>
            Mixed homes are where most disputes live, and they are decided on documents.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>The four ways a Las Vegas house gets divided</h2>
          <p>
            Most Las Vegas divorces resolve the house one of four ways: sell and split, buyout, deferred sale, or court-ordered sale. Which one fits depends on whether either spouse can carry the mortgage alone, how much equity is in the home, and whether the two of you can agree. The market shapes it too. With a
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            {' '}
            median and
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of homes selling inside 30 days, a clean sale is realistic at most price points.
          </p>
          <h3>Sell and split the net proceeds</h3>
          <p>
            Both spouses sign the listing, the home sells, and escrow pays off the loan and closing costs before dividing what is left. This is the cleanest break and the only option that needs no one to qualify for a new loan. It does require agreement on price, repairs, and timing. See
            {' '}
            <Link href="/splitting-house-proceeds-divorce" className="text-blue-600 underline hover:text-blue-700">how house proceeds are split</Link>
            .
          </p>
          <h3>One spouse buys out the other</h3>
          <p>
            The spouse who stays pays the other for their share of the equity, usually by refinancing into a new loan in one name. The departing spouse signs a deed and is released from the mortgage. The whole plan depends on a loan approval, so the lender conversation comes first. Details are on the
            {' '}
            <Link href="/divorce-buyout-options" className="text-blue-600 underline hover:text-blue-700">buyout options page</Link>
            .
          </p>
          <h3>Deferred sale</h3>
          <p>
            The decree sets a future sale date, often tied to a child finishing a school year or a loan maturing. Until then it spells out who lives in the home, who pays the mortgage, taxes, insurance, and HOA, and how repairs are handled. It only works with a written agreement that covers every expense.
          </p>
          <h3>Court-ordered sale</h3>
          <p>
            When spouses cannot agree, the court can order the sale and set the terms. The order often names a neutral agent, a listing deadline, and a pricing method. Read more on
            {' '}
            <Link href="/court-ordered-home-sale" className="text-blue-600 underline hover:text-blue-700">court-ordered home sales</Link>
            .
          </p>

          <h2>Start with the value, then the equity</h2>
          <p>
            Every division method starts with the same two numbers: what the home would sell for today, and what is owed against it. Value minus the mortgage balance, any HELOC, and any liens equals equity. In a community home, each spouse’s starting share is half of that equity. Take the value from a comparative market analysis or an appraisal dated near the division, not from a purchase price that is years old.
          </p>
          <p>
            Here is a hypothetical to show the arithmetic. Say the home would sell for $900,000 and the mortgage balance is $400,000. Equity is $500,000, and each spouse’s starting share is $250,000. If the home is sold instead of kept, commissions, closing costs, and transfer tax come off before the split, so each share is smaller than half the gross equity. A buyout uses the gross equity but adds refinance costs on the keeping spouse’s side.
          </p>
          <p>
            The
            {' '}
            <Link href="/divorce-home-valuation" className="text-blue-600 underline hover:text-blue-700">valuation page</Link>
            {' '}
            explains which kind of valuation holds up in a settlement, and the
            {' '}
            <Link href="/divorce-home-equity-split" className="text-blue-600 underline hover:text-blue-700">equity split page</Link>
            {' '}
            walks through separate-property adjustments.
          </p>

          <h2>Separate property, reimbursement, and unequal division</h2>
          <p>
            Equal division is the default, not the only outcome. A spouse who put separate funds into the down payment, or who owned the home before the marriage, may have a reimbursement or apportionment claim that their attorney raises. A judge can also divide unequally when there is a compelling reason, but the reason must be written into the decision. All of these claims are won or lost on records.
          </p>
          <ul>
            <li>Closing disclosures and bank statements showing where the down payment came from.</li>
            <li>The deed history, including any date a spouse was added to title.</li>
            <li>Mortgage statements showing principal paid down during the marriage.</li>
            <li>Invoices for improvements, with the account that paid them.</li>
          </ul>
          <p>
            A neutral agent can supply the value at the date of marriage and the value today, which is what the apportionment math needs.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Deeds, decrees, and the transfer tax</h2>
          <p>
            When one spouse keeps the house, the other signs a deed, usually an interspousal or quitclaim deed, and the decree is recorded alongside it. Clark County charges real property transfer tax at
            {' '}
            {NEVADA_LAW.transferTaxClarkPer500}
            {' '}
            per $500 of value, which works out to
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000.
            {' '}
            {NEVADA_LAW.transferTaxDivorceExemption}
            {' '}
            A sale to a third party has no such exemption, and the tax is paid from the proceeds at closing. On a $2,000,000 sale that is
            {' '}
            {NEVADA_LAW.transferTaxExample2M.replace(' on a $2,000,000 sale', '')}
            .
          </p>
          <p>
            Two practical points follow. First, the deed should match the decree exactly, including the legal description and how title is held afterward. Second, the lender does not read the decree. Until the loan is refinanced or paid off, both borrowers remain liable, whatever the deed says. The
            {' '}
            <Link href="/quitclaim-deed-divorce" className="text-blue-600 underline hover:text-blue-700">quitclaim deed page</Link>
            {' '}
            covers the recording steps. Source:
            {' '}
            {NEVADA_LAW.transferTaxCite}
            .
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Working with your attorney and the court</h2>
          <p>
            Your family law attorney handles the legal division. A neutral agent supplies the numbers that make it work: a dated valuation, a net proceeds estimate, and a listing or buyout plan both sides can accept. Clark County courts regularly order a sale when spouses cannot agree, and the order often names a neutral agent. Having one in place early usually avoids that step.
          </p>
          <p>What the agent hands your attorney, in a form that can be attached to a filing:</p>
          <ul>
            <li>A comparative market analysis with the comparable sales listed and the valuation date stated.</li>
            <li>A net proceeds estimate showing payoff, commissions, closing costs, and transfer tax.</li>
            <li>A buyout worksheet showing the equity, each share, and the refinance amount needed.</li>
            <li>A listing plan with pricing, showing rules, and a decision timeline both spouses sign.</li>
          </ul>
          <p>
            Dr. Jan Duffy works on behalf of the transaction, not either spouse, and communicates with both attorneys on the same schedule.
          </p>
        </div>

        <HighValueHomeNote
          points={[
            `Equal division of a $3,000,000 home is a $1,500,000 question for the spouse who wants to keep it. Loans above ${LUXURY_2026.jumboThreshold2026} are jumbo, so a buyout refinance needs documented income, cash reserves, and a lower loan-to-value than a conforming loan.`,
            'Custom homes in The Ridges, MacDonald Highlands, and Southern Highlands can appraise with a wide spread between two appraisers. Write a two-appraisal protocol into the settlement so the number is fixed before any deed is drawn.',
            'Club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, and The Summit Club are separate assets with their own transfer rules and fees. List them in the decree, not just the house.',
            `Transfer tax at ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 is ${NEVADA_LAW.transferTaxExample2M}, but zero on a decree transfer between former spouses. That difference belongs in the sell-versus-buyout comparison.`,
            'Guard-gated showings by appointment and off-market exposure keep a pending divorce out of the neighborhood while the home is valued or marketed.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the home, the loan, and where the divorce stands. Nothing is listed or filed.' },
            { title: 'Valuation and equity worksheet', detail: 'A dated market analysis and a net proceeds and buyout comparison your attorney can use.' },
            { title: 'Division plan', detail: 'Sell, buyout, or deferred sale, with a timeline and showing rules both spouses sign off on.' },
            { title: 'Execution', detail: 'Listing or refinance coordination, deed and decree alignment, and closing on the agreed schedule.' },
          ]}
          callPromise="You leave the call with a value range, each spouse’s share, and the next decision."
        />

        <PageFAQ faqs={propertyDivisionFaqs} />
      </DivorcePageTemplate>
    </>
  );
}
