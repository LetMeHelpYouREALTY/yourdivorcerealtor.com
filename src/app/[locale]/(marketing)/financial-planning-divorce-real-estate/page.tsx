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
import { RealScoutCondoListings } from '@/components/widgets/RealScoutCondoListings';
import { RealScoutFamilyHomes } from '@/components/widgets/RealScoutFamilyHomes';
import { RealScoutHomeValue } from '@/components/widgets/RealScoutHomeValue';
import { CONTENT_LAST_UPDATED, toSchemaDateTime } from '@/lib/content-dates';
import { LEGAL_DISCLAIMER, LUXURY_2026, LVR_SEPT_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type IFinancialPlanningProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/financial-planning-divorce-real-estate';

const faqs = [
  {
    question: 'What is a net sheet and why do I need one before deciding anything?',
    answer: 'A net sheet shows what each spouse receives at several sale prices after the loan payoff, commission, Clark County transfer tax, title and escrow fees, prorated taxes and HOA, and any repair credits. It turns an argument about list price into a comparison of in-hand numbers, and it is the figure a buyout has to beat.',
  },
  {
    question: 'How do I know if I can afford to keep the house?',
    answer: 'Get a lender\'s written pre-qualification on your income alone, counting support the way the lender counts it, at the loan amount a buyout would require. Then add taxes, insurance, HOA, and a maintenance reserve. If the total is more than a third of your post-divorce gross income, the house is a strain, not a stability.',
  },
  {
    question: 'Does Nevada tax the gain on my home sale?',
    answer: `${NEVADA_LAW.noStateIncomeTax} Federal capital gains tax can apply above the Section 121 exclusion. ${NEVADA_LAW.capitalGainsExclusion} ${LEGAL_DISCLAIMER}`,
  },
  {
    question: 'What does the transfer tax cost and who pays it?',
    answer: `Clark County real property transfer tax is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of sale price, which is ${NEVADA_LAW.transferTaxExample2M}. The seller customarily pays it on a sale, and the stipulation should say how the spouses share it. ${NEVADA_LAW.transferTaxDivorceExemption}`,
  },
  {
    question: 'Should I take the house instead of retirement accounts?',
    answer: 'Compare after-tax, after-cost values, not face values. Home equity comes out only through a sale with commission, transfer tax, and possible capital gains, or through a refinance with interest. Retirement accounts carry their own tax on withdrawal. A CPA or financial planner should run both before you trade one for the other.',
  },
  {
    question: 'How much should I budget for the next place?',
    answer: `The Las Vegas single-family median was ${LVR_SEPT_2026.medianSfrPrice} in September 2026. Whether you buy or rent next, lenders and landlords look at your income alone after the decree, so build the next housing payment from that number, plus a reserve for the months between closing and settling in.`,
  },
];

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Financial Planning for a Divorce Home Sale | Dr. Jan Duffy',
    description: 'Net sheets, buyout math, the $250,000 and $500,000 Section 121 caps, Clark County transfer tax, and the next housing payment on 1 income in Las Vegas.',
    alternates: { canonical, languages },
  };
}

export default async function FinancialPlanning(props: IFinancialPlanningProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = path;
  const description = 'Net sheets, buyout math, the Section 121 exclusion, Clark County transfer tax, and what the next housing payment looks like on one income after a Las Vegas divorce.';
  const articleSchema = generateArticleSchema(
    'Financial Planning for a Divorce Home Sale',
    description,
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Real Estate Financial Planning Guidance',
    description,
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Financial Planning for Divorce Real Estate"
        heroSubhead="The numbers behind sell, keep, or defer"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How do I plan the finances of the house in a divorce?">
          Start with a net sheet showing what each spouse receives at several sale prices after the loan payoff, commission, transfer tax, and closing costs. Compare that to a buyout: the keeping spouse's share of equity, the refinance it requires, and the monthly carrying cost on one income. Then layer on the Section 121 exclusion and your next housing payment. Decide from those numbers.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Clark County transfer tax per $1,000', value: NEVADA_LAW.transferTaxClarkPer1000 },
            { label: '2026 jumbo loan line, Clark County', value: LUXURY_2026.jumboThreshold2026 },
            { label: 'Sold within 30 days of listing', value: LVR_SEPT_2026.soldWithin30DaysPct },
          ]}
          source={`${LVR_SEPT_2026.source}; ${NEVADA_LAW.transferTaxCite}; ${LUXURY_2026.jumboSource}`}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Start with the net sheet</h2>
          <p>
            A net sheet is a one-page calculation of what each spouse receives at a given sale price after every cost comes out: the loan payoff with interest to the closing date, commission, Clark County transfer tax, title and escrow fees, prorated property taxes and HOA dues, and any repair credits. Run it at three or four prices and the list-price argument usually ends.
          </p>
          <p>
            The reason is arithmetic. A $20,000 difference in sale price, after commission and transfer tax, changes each spouse's share by less than $10,000. Spouses who have been fighting over the list price for weeks often settle in an afternoon once they see the in-hand numbers side by side. The net sheet is also the figure a buyout has to beat.
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Loan payoff, including per-diem interest to the closing date and any prepayment terms</li>
            <li>Commission as agreed in the listing</li>
            <li>
              Transfer tax at
              {' '}
              {NEVADA_LAW.transferTaxClarkPer1000}
              {' '}
              per $1,000 of price
            </li>
            <li>Title, escrow, and recording fees</li>
            <li>Prorated property taxes and HOA dues, plus any HOA transfer or capital fee</li>
            <li>Repair credits or seller-paid closing costs negotiated in the contract</li>
          </ul>

          <h2>Buyout math and the refinance test</h2>
          <p>
            A buyout starts with an agreed value, subtracts the loan balance, and divides the equity per the decree. The keeping spouse then pays the other's share, almost always by refinancing into a new loan in one name that also pulls that cash out. The buyout figure is easy to compute. The question is whether the refinance will fund on one income.
          </p>
          <p>
            Get a lender's written pre-qualification at the full new loan amount before the figure goes into the stipulation. Lenders count post-decree support only when it is documented and expected to continue, and they apply debt ratios that a household used to qualifying on two incomes may not meet. Above
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            the loan is jumbo, with reserve requirements measured in months of payments. See
            {' '}
            <Link href="/divorce-buyout-options" className="text-blue-600 underline hover:text-blue-700">buyout options</Link>
            {' '}
            and
            {' '}
            <Link href="/refinancing-after-divorce" className="text-blue-600 underline hover:text-blue-700">refinancing after divorce</Link>
            .
          </p>

          <h2>Carrying costs if you keep or defer</h2>
          <p>
            Keeping the home, or deferring the sale, means one budget carries the mortgage, property taxes, insurance, HOA dues, utilities, and maintenance that two incomes used to share. Write each line down at its current amount, add a maintenance reserve, and compare the total to your post-decree gross income. A total above a third of gross is a warning, not a plan.
          </p>
          <p>
            Deferred sales need the same list, allocated between the spouses in writing with a default remedy if a payment is missed. HOA special assessments, roof and HVAC replacement, and a pool are the items that surprise people. A written agreement on who pays what until the sale date keeps a deferred sale from becoming the next dispute. See
            {' '}
            <Link href="/what-to-do-with-house-in-divorce" className="text-blue-600 underline hover:text-blue-700">what to do with the house in divorce</Link>
            .
          </p>

          <h2>Taxes: Section 121, Nevada, and the transfer tax</h2>
          <p>
            {NEVADA_LAW.capitalGainsExclusion}
            {' '}
            The timing of the sale relative to the decree, and whether the couple can still file jointly for that tax year, decides which cap applies. On a large gain, that choice can be worth more than any negotiation over list price.
          </p>
          <p>
            {NEVADA_LAW.noStateIncomeTax}
            {' '}
            Clark County charges real property transfer tax of
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000, so
            {' '}
            {NEVADA_LAW.transferTaxExample2M}
            .
            {' '}
            {NEVADA_LAW.transferTaxDivorceExemption}
            {' '}
            Basis matters too: improvements made during the marriage raise basis and lower gain, so gather the receipts before the sale, not at tax time. See
            {' '}
            <Link href="/capital-gains-tax-divorce-home-sale" className="text-blue-600 underline hover:text-blue-700">capital gains tax on a divorce home sale</Link>
            .
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Trading the house against other assets</h2>
          <p>
            Spouses often offset the home against retirement accounts, a business interest, or cash. Compare after-tax, after-cost values rather than face values. Home equity comes out only through a sale with commission, transfer tax, and possible capital gains, or through a refinance that charges interest on it. A retirement account carries its own tax on withdrawal and may need a qualified domestic relations order to divide.
          </p>
          <p>
            A CPA or certified divorce financial analyst should run both sides of any offset. The listing agent supplies the home's side: the valuation, the net sheet, and the carrying cost. Your attorney drafts the offset into the stipulation.
            {' '}
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            (
            {NEVADA_LAW.communityPropertyCite}
            ).
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Planning the next housing payment</h2>
          <p>
            Whether you buy or rent next, lenders and landlords will look at your income alone after the decree. The Las Vegas single-family median was
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            {' '}
            in September 2026, and
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of homes sold within 30 days, so a well-priced home moves quickly on both the selling and the buying side. Build the next payment from your post-decree number, not from the household budget you had.
          </p>
          <p>
            Keep a reserve for the gap between closing and settling in: deposits, movers, overlapping rent, and the months before support payments are regular. Many clients rent for a year after the sale, then buy once their income, credit, and the decree are settled and a lender can underwrite them cleanly. The net sheet from the sale is the starting number for that plan.
          </p>
        </div>

        <HighValueHomeNote
          title="Financial planning above the jumbo line"
          points={[
            `A buyout refinance above ${LUXURY_2026.jumboThreshold2026} needs documented reserves and a lower debt ratio; the written pre-qualification comes before the buyout figure, not after.`,
            'On a large gain the Section 121 cap of $250,000 single or $500,000 joint is a real number; selling while still able to file jointly can be worth more than any list-price negotiation.',
            `Transfer tax of ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 means ${NEVADA_LAW.transferTaxExample2M}; allocate it in the stipulation.`,
            'HOA dues and special assessments in The Ridges, Red Rock Country Club, and MacDonald Highlands belong on the carrying-cost sheet at their current amounts, along with club dues if the membership is kept.',
            'Club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, and The Summit Club have transfer fees and resale rules that change their after-cost value; get them in writing from the club.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Fifteen minutes on the property, the loan balance, and whether sell, keep, or defer is on the table.' },
            { title: 'Net sheet and buyout worksheet', detail: 'A written valuation, net sheet at several prices, and buyout worksheet with the refinance figure, delivered to both spouses and both counsel.' },
            { title: 'Lender and CPA handoff', detail: 'Introductions to a lender for the one-income qualification and a CPA for the Section 121 and basis questions.' },
          ]}
          callPromise="You leave the call with the in-hand number for each option."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
      <RealScoutHomeValue />
      <RealScoutCondoListings />
      <RealScoutFamilyHomes />
    </>
  );
}
