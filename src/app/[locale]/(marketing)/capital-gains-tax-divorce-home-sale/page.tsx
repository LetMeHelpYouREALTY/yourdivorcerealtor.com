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
import { LEGAL_DISCLAIMER, LUXURY_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

export const dynamic = 'force-dynamic';

const path = '/capital-gains-tax-divorce-home-sale';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Capital Gains Tax on a Divorce Home Sale | Dr. Jan Duffy',
    description: 'How the Section 121 exclusion of $250,000 or $500,000 applies when you sell the home in a divorce, the use rule for a spouse who moved out, timing, and a worked example.',
    alternates: { canonical, languages },
  };
}

export default async function CapitalGainsTaxDivorceHomeSale(props: PageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/capital-gains-tax-divorce-home-sale';

  const faqs = [
    {
      question: 'Do I pay capital gains tax when we sell the house in a divorce?',
      answer: 'Only on gain above your Section 121 exclusion. The exclusion is $250,000 for a single filer and $500,000 for a married couple filing jointly, if the home was owned and used as the main residence for two of the last five years. Gain is sale price minus selling costs minus adjusted basis, not the amount escrow wires you.',
    },
    {
      question: 'I moved out two years ago. Do I still qualify for the exclusion?',
      answer: 'Often yes. Under the divorce-related rules in IRS Publication 523, a spouse who moved out can count the other spouse’s continued use of the home under a divorce or separation instrument toward their own use test. The ownership test still applies, so stay on title until the sale if you want the exclusion.',
    },
    {
      question: 'Is it better to sell before or after the divorce is final?',
      answer: 'It depends on the size of the gain and your filing status. Selling in a year you file jointly gives access to the $500,000 exclusion. Selling after the decree gives each former spouse a $250,000 exclusion on their share, which can reach the same total if both qualify. Run both scenarios with your tax advisor before setting the closing date.',
    },
    {
      question: 'Is a buyout between spouses a taxable sale?',
      answer: 'Generally a transfer between spouses that is part of the divorce is not treated as a taxable sale, and the spouse who keeps the home carries the original basis forward. That means the built-in gain is deferred, not erased. When the keeping spouse eventually sells, only their own exclusion applies. Confirm the treatment with your tax advisor.',
    },
    {
      question: 'Does Nevada charge capital gains tax on the sale?',
      answer: 'No. Nevada has no state income tax, so there is no state capital gains tax on the sale. Federal capital gains tax still applies to gain above the exclusion. Clark County does charge a real property transfer tax at closing, which is a separate cost and not a tax on gain.',
    },
    {
      question: 'What records do I need to calculate the gain?',
      answer: 'The purchase closing statement, receipts for improvements that added to basis, the sale closing statement, and the divorce decree or separation agreement showing who lived in the home and when. Improvements raise the basis and lower the gain, so a remodel without receipts is a lost deduction.',
    },
  ];

  const articleSchema = generateArticleSchema(
    'Capital Gains Tax on a Divorce Home Sale',
    'How the Section 121 exclusion applies when you sell the home in a divorce, the use rule for a spouse who moved out, timing, and a worked example.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Home Sale Tax Coordination',
    'Sale timing, basis records, and coordination with your tax advisor when selling the marital home in a Nevada divorce.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Capital Gains Tax on Divorce Home Sale: Complete Tax Guide"
        heroSubhead="The exclusion, the divorce use rule, and when timing changes the bill"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="Do you pay capital gains tax when selling a house in a divorce?">
          Only on gain above the Section 121 exclusion: $250,000 for a single filer, $500,000 for a married couple filing jointly, if the home was owned and used as the main residence for two of the last five years. A spouse who moved out can count the other spouse’s continued use under a divorce instrument. Nevada has no state income tax, so only the federal tax applies.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Section 121 exclusion, single filer', value: '$250,000' },
            { label: 'Section 121 exclusion, married filing jointly', value: '$500,000' },
            { label: 'Ownership and use test', value: '2 of the last 5 years' },
          ]}
          source={NEVADA_LAW.capitalGainsCite}
          sourceUrl={NEVADA_LAW.capitalGainsUrl}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>How the home sale exclusion works</h2>
          <p>
            {NEVADA_LAW.capitalGainsExclusion}
            {' '}
            The exclusion applies to gain, not to proceeds. Gain is the sale price minus selling costs minus the adjusted basis, which is what you paid plus the cost of improvements. Most Las Vegas sellers at the median price have gain inside the exclusion. Owners of homes bought years ago in the luxury enclaves often do not.
          </p>
          <ul>
            <li>
              <strong>Ownership test:</strong>
              {' '}
              you owned the home for at least two of the five years before the sale.
            </li>
            <li>
              <strong>Use test:</strong>
              {' '}
              you lived in it as your main home for at least two of those five years.
            </li>
            <li>
              <strong>Frequency:</strong>
              {' '}
              you did not exclude gain on another home sale in the two years before this one.
            </li>
          </ul>
          <p>
            Source:
            {' '}
            {NEVADA_LAW.capitalGainsCite}
            .
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>The divorce use rule for a spouse who moved out</h2>
          <p>
            The use test is where divorcing sellers get caught. One spouse moves out during the case, the sale closes a year or two later, and that spouse no longer meets two years of use in the last five on their own. The divorce-related rules solve it: a spouse who moved out can count the other spouse’s continued use of the home under a divorce or separation instrument as their own use.
          </p>
          <p>
            Two conditions make that rule work. The spouse who moved out must still own the home, so stay on title until the sale rather than deeding it over early. And the other spouse’s occupancy should be under a decree or written separation agreement, not an informal arrangement. Your attorney can draft the agreement with that in mind.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Calculating the gain: a worked example</h2>
          <p>
            Gain is measured against basis, not against the check from escrow. Here is a hypothetical with round numbers. Say a couple bought a home for $600,000, spent $100,000 on a documented kitchen and pool remodel, and sells it during the divorce for $1,500,000 with $80,000 of selling costs. Their adjusted basis is $700,000, and the gain is $720,000.
          </p>
          <div className="my-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <p className="mb-2 font-semibold">Hypothetical gain calculation</p>
            <ul className="space-y-1 text-sm">
              <li>Sale price: $1,500,000</li>
              <li>Selling costs: $80,000</li>
              <li>Purchase price: $600,000</li>
              <li>Documented improvements: $100,000</li>
              <li className="border-t pt-1">Adjusted basis: $700,000</li>
              <li className="border-t pt-1">Gain: $1,500,000 − $80,000 − $700,000 = $720,000</li>
              <li>Married filing jointly, both qualify: $720,000 − $500,000 = $220,000 taxable</li>
              <li>Each former spouse filing single on half: $360,000 − $250,000 = $110,000 taxable each</li>
            </ul>
          </div>
          <p>
            In this example the total taxable gain is the same either way, because both spouses qualify for the exclusion. The answer changes when one spouse does not qualify, when the gain is smaller than $500,000, or when one spouse keeps the home and sells it alone later. That is why the timing conversation belongs with a tax advisor before the closing date is set.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Timing: before or after the decree</h2>
          <p>
            Filing status follows your marital status on the last day of the tax year. A sale that closes in a year you are still married and file jointly can use the $500,000 exclusion. A sale after the decree gives each former spouse a $250,000 exclusion on their share of the gain. When both spouses qualify, the totals often match. When only one qualifies, the year the sale closes decides the bill.
          </p>
          <ul>
            <li>
              <strong>Sell while married, file jointly:</strong>
              {' '}
              one $500,000 exclusion against the whole gain, if both meet the tests.
            </li>
            <li>
              <strong>Sell after the decree:</strong>
              {' '}
              each former spouse reports their share and applies their own $250,000 exclusion.
            </li>
            <li>
              <strong>Buyout now, sale later:</strong>
              {' '}
              the keeping spouse carries the original basis and uses one exclusion at the eventual sale.
            </li>
          </ul>
          <p>
            The
            {' '}
            <Link href="/selling-house-before-or-after-divorce" className="text-blue-600 underline hover:text-blue-700">before-or-after page</Link>
            {' '}
            covers the non-tax side of that timing.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Buyouts, basis, and the deferred gain</h2>
          <p>
            When one spouse keeps the home in the settlement, the transfer between spouses is generally not treated as a taxable sale, and the keeping spouse carries forward the original basis and holding period. The gain is deferred, not erased. At the eventual sale, the keeping spouse measures gain against that old basis and has one exclusion, not two.
          </p>
          <p>
            That makes the deferred tax a real cost of keeping the home, and a fair point in the buyout negotiation. A spouse who takes a $1,500,000 home with a $700,000 basis takes a future tax bill with it. The
            {' '}
            <Link href="/divorce-buyout-options" className="text-blue-600 underline hover:text-blue-700">buyout options page</Link>
            {' '}
            shows where that belongs in the worksheet.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Nevada and Clark County: what applies and what does not</h2>
          <p>
            {NEVADA_LAW.noStateIncomeTax}
            {' '}
            There is no state capital gains tax on the sale, so the federal calculation is the whole picture on gain. Clark County does charge a real property transfer tax at
            {' '}
            {NEVADA_LAW.transferTaxClarkPer500}
            {' '}
            per $500 of value at closing. That is a transaction cost, not a tax on gain, and it counts as a selling cost in the gain calculation.
          </p>
          <p>
            {NEVADA_LAW.transferTaxDivorceExemption}
            {' '}
            The
            {' '}
            <Link href="/divorce-home-sale-taxes-nevada" className="text-blue-600 underline hover:text-blue-700">Nevada home sale taxes page</Link>
            {' '}
            covers transfer tax and property tax proration in detail. Source:
            {' '}
            {NEVADA_LAW.transferTaxCite}
            .
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Records that lower the bill</h2>
          <p>
            Every dollar of documented improvement raises the basis and lowers the gain. In a divorce, those records are often split between two households, so gather them before the listing goes live. The closing statement from the sale and the decree are the other two documents the tax return will need.
          </p>
          <ul>
            <li>Purchase closing statement showing the original price and purchase costs.</li>
            <li>Receipts and contracts for improvements: remodels, additions, pool, roof, HVAC, solar if purchased.</li>
            <li>Sale closing statement with commissions, title, escrow, and transfer tax.</li>
            <li>The decree or separation agreement showing who occupied the home and under what terms.</li>
            <li>Deeds and any transfer documents between spouses.</li>
          </ul>
        </div>

        <HighValueHomeNote
          points={[
            'On a home bought years ago in The Ridges, MacDonald Highlands, or Red Rock Country Club, the gain routinely exceeds the $500,000 joint exclusion. The taxable amount above the cap belongs in the sell-versus-buyout comparison, not in a surprise the following April.',
            `A buyout refinance above ${LUXURY_2026.jumboThreshold2026} is a jumbo loan, and the spouse who keeps the home also keeps the deferred gain. Price both into the buyout negotiation.`,
            `Transfer tax of ${NEVADA_LAW.transferTaxExample2M} counts as a selling cost in the gain calculation. A decree transfer between former spouses is exempt from it.`,
            'Construction and remodel records on a custom home are the largest basis adjustments available. A build file with contractor invoices can move the taxable gain by six figures.',
            'Cash buyers and private exposure shorten the sale timeline at the top tier, which gives you more control over which tax year the closing lands in.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the purchase history, improvements, and where the case stands.' },
            { title: 'Gain estimate', detail: 'A sale price range and a selling cost estimate your tax advisor can turn into a gain and exclusion calculation.' },
            { title: 'Timing plan', detail: 'A closing window that fits the tax year, the decree, and the market, agreed with both attorneys.' },
          ]}
          callPromise="You leave the call with a sale price range, an estimate of selling costs, and the questions to take to your tax advisor."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
