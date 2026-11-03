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

const path = '/divorce-home-sale-taxes-nevada';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Divorce Home Sale Taxes in Nevada: A Guide | Dr. Jan Duffy',
    description: 'Every tax on a divorce home sale in Nevada: no state income tax, federal capital gains with the $500,000 exclusion, and $5.10 per $1,000 transfer tax.',
    alternates: { canonical, languages },
  };
}

export default async function DivorceHomeSaleTaxesNevada(props: PageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/divorce-home-sale-taxes-nevada';

  const faqs = [
    {
      question: 'Does Nevada tax the profit from selling my home in a divorce?',
      answer: 'No. Nevada has no state income tax, so there is no state tax on the gain. Federal capital gains tax applies to gain above the Section 121 exclusion of $250,000 per person or $500,000 for a married couple filing jointly. Clark County charges a transfer tax at closing, which is a transaction cost rather than a tax on gain.',
    },
    {
      question: 'How much is the Clark County transfer tax on a home sale?',
      answer: 'The rate is $2.55 per $500 of value, which is $5.10 per $1,000. On a $2,000,000 sale that is $10,200. It is customarily paid by the seller and comes out of the proceeds at closing. A transfer of title between former spouses in compliance with a divorce decree is exempt under NRS 375.090(6).',
    },
    {
      question: 'Is a buyout taxed the same as a sale?',
      answer: 'No. A deed from one spouse to the other under the decree is exempt from Clark County transfer tax, and the transfer is generally not treated as a taxable sale for federal purposes. The spouse who keeps the home carries the original basis forward, so the gain is deferred until that spouse sells.',
    },
    {
      question: 'What happens to property taxes at closing?',
      answer: 'Clark County property taxes are prorated through the closing date. Escrow charges the seller for the days owned and credits or debits the buyer for the rest of the installment. It is a settlement adjustment, not a new tax, and it shows on the closing statement that both spouses sign.',
    },
    {
      question: 'Can I still use the exclusion if I moved out during the divorce?',
      answer: 'Often yes. The divorce-related rules let a spouse who moved out count the other spouse’s continued use of the home under a divorce or separation instrument toward their own use test. You must still own the home at the sale, so do not deed your interest away before closing if you want the exclusion.',
    },
    {
      question: 'Who reports the sale on their tax return?',
      answer: 'Each owner reports their share of the sale in the year it closes. If you sell while married and file jointly, it goes on the joint return. If you sell after the decree, each former spouse reports their share and applies their own exclusion. Escrow issues the reporting form based on the ownership shown on title.',
    },
  ];

  const articleSchema = generateArticleSchema(
    'Divorce Home Sale Taxes in Nevada: Full Guide',
    'Every tax on a divorce home sale in Nevada: no state income tax, federal capital gains with the exclusion, Clark County transfer tax, and property tax proration.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Nevada Divorce Home Sale Tax Coordination',
    'Net proceeds estimates that include transfer tax and property tax proration, with coordination to your tax advisor on the federal gain.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Divorce Home Sale Taxes Nevada: Complete Tax Guide"
        heroSubhead="Which taxes apply, which do not, and what comes out at closing"
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
        currentPath={currentPath}
      >
        <DirectAnswer question="What taxes apply when you sell a home in a Nevada divorce?">
          Three things, and one of them is zero. Nevada has no state income tax, so there is no state tax on the gain. Federal capital gains tax applies only to gain above the Section 121 exclusion of $250,000 per person or $500,000 jointly. Clark County charges a transfer tax of $2.55 per $500 of value at closing, and property taxes are prorated to the closing date.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Clark County transfer tax per $500 of value', value: NEVADA_LAW.transferTaxClarkPer500 },
            { label: 'Clark County transfer tax per $1,000 of value', value: NEVADA_LAW.transferTaxClarkPer1000 },
            { label: 'Transfer tax on a $2,000,000 sale', value: NEVADA_LAW.transferTaxExample2M.replace(' on a $2,000,000 sale', '') },
          ]}
          source={NEVADA_LAW.transferTaxCite}
          sourceUrl={NEVADA_LAW.transferTaxUrl}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>The four tax items on a Nevada divorce home sale</h2>
          <p>
            Sellers in a Las Vegas divorce deal with four tax items: state income tax, which Nevada does not have; federal capital gains tax on gain above the exclusion; Clark County real property transfer tax at closing; and the property tax proration on the settlement statement. Only the federal gain needs a tax advisor. The other three are fixed by law or by the closing date.
          </p>
          <ul>
            <li>
              <strong>State income tax:</strong>
              {' '}
              none.
              {' '}
              {NEVADA_LAW.noStateIncomeTax}
            </li>
            <li>
              <strong>Federal capital gains:</strong>
              {' '}
              on gain above $250,000 single or $500,000 married filing jointly, if the tests are met.
            </li>
            <li>
              <strong>Transfer tax:</strong>
              {' '}
              {NEVADA_LAW.transferTaxClarkPer500}
              {' '}
              per $500 of value in Clark County, paid at closing.
            </li>
            <li>
              <strong>Property tax proration:</strong>
              {' '}
              the seller’s share of the current installment through the closing date.
            </li>
          </ul>
          <p>{LEGAL_DISCLAIMER}</p>

          <h2>No state income tax, and what that does and does not mean</h2>
          <p>
            {NEVADA_LAW.noStateIncomeTax}
            {' '}
            For a home sale, that means no state capital gains tax and no state withholding at closing. It is a real advantage over states that tax the gain and withhold a percentage of the price. It does not mean the sale is tax-free. The federal calculation still applies, and the Clark County transfer tax is charged regardless.
          </p>
          <p>
            One situation to flag: a spouse who has moved to another state before the sale may face that state’s rules on their share of the gain. Residency on the closing date, not the location of the home, drives that question, and it belongs with your tax advisor.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Clark County transfer tax and the divorce exemption</h2>
          <p>
            Clark County charges real property transfer tax at
            {' '}
            {NEVADA_LAW.transferTaxClarkPer500}
            {' '}
            per $500 of value, which works out to
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000. On a sale it is customarily paid by the seller and comes out of the proceeds before the split. That makes it
            {' '}
            {NEVADA_LAW.transferTaxExample2M}
            , paid in full before either spouse sees a dollar.
          </p>
          <p>
            {NEVADA_LAW.transferTaxDivorceExemption}
            {' '}
            That exemption is claimed on the declaration of value recorded with the deed, and the recorder expects the decree reference to match. It is one of the concrete reasons a buyout can net more than a sale for the spouse who stays. Source:
            {' '}
            {NEVADA_LAW.transferTaxCite}
            .
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Federal capital gains and the Section 121 exclusion</h2>
          <p>
            {NEVADA_LAW.capitalGainsExclusion}
            {' '}
            Gain is the sale price minus selling costs minus the adjusted basis, which is the purchase price plus documented improvements. The transfer tax and commissions count as selling costs. Most sellers near the Las Vegas median have gain inside the exclusion; owners who bought years ago in the luxury enclaves often do not.
          </p>
          <p>
            Two divorce-specific points. The divorce use rule lets a spouse who moved out count the other spouse’s continued use under a decree or separation agreement, as long as that spouse still owns the home at the sale. And a buyout transfer between spouses is generally not a taxable sale, so the keeping spouse carries the original basis forward and uses one exclusion later. The
            {' '}
            <Link href="/capital-gains-tax-divorce-home-sale" className="text-blue-600 underline hover:text-blue-700">capital gains page</Link>
            {' '}
            has a worked example. Source:
            {' '}
            {NEVADA_LAW.capitalGainsCite}
            .
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>What the closing statement shows: a worked example</h2>
          <p>
            The settlement statement is where the Nevada tax items appear in dollars. Here is a hypothetical. Say the home sells for $1,000,000 in a year when the couple still files jointly. The purchase price was $500,000 and they have $50,000 of documented improvements. The loan payoff is $300,000, and commissions and title costs total $55,000.
          </p>
          <div className="my-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <p className="mb-2 font-semibold">Hypothetical settlement and gain figures</p>
            <ul className="space-y-1 text-sm">
              <li>Sale price: $1,000,000</li>
              <li>Transfer tax at $5.10 per $1,000: $5,100</li>
              <li>Commissions and title costs: $55,000</li>
              <li>Property tax proration: seller’s share through closing</li>
              <li>Loan payoff: $300,000</li>
              <li className="border-t pt-1">Net proceeds to split: about $639,900 before the tax proration</li>
              <li className="border-t pt-1">Adjusted basis: $500,000 + $50,000 = $550,000</li>
              <li>Selling costs for the gain calculation: $60,100</li>
              <li>Gain: $1,000,000 − $60,100 − $550,000 = $389,900</li>
              <li>Married filing jointly, both qualify: $389,900 − $500,000 = no taxable gain</li>
              <li>State income tax: none</li>
            </ul>
          </div>
          <p>
            Change one input and the answer moves. If only one spouse qualified for the exclusion, $139,900 of that gain would be taxable at the federal level. If the home had been bought for $300,000, the gain would exceed the joint exclusion. Run the real numbers with a tax advisor before the closing date is set.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Timing the sale around the tax year and the decree</h2>
          <p>
            Filing status follows marital status on the last day of the tax year. A sale that closes while you are still married and file jointly uses the $500,000 exclusion against the whole gain. A sale after the decree gives each former spouse a $250,000 exclusion on their share. When both qualify, the totals usually match. When only one qualifies, the year of closing decides the bill.
          </p>
          <ul>
            <li>Agree the closing window with both attorneys and the tax advisor before listing.</li>
            <li>Keep both spouses on title until closing if both need the exclusion.</li>
            <li>Put the occupying spouse’s use under a written separation agreement or the decree.</li>
            <li>Hold proceeds in escrow if the decree is not yet entered and the split may change.</li>
          </ul>
          <p>
            The
            {' '}
            <Link href="/selling-house-before-or-after-divorce" className="text-blue-600 underline hover:text-blue-700">before-or-after page</Link>
            {' '}
            covers the market and legal side of that timing.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h3>Records to gather before listing</h3>
          <p>
            In a divorce the records are usually split between two households, and the improvement receipts are the ones that go missing. Every documented improvement raises the basis and lowers the federal gain. Collect them before the home is listed, and give copies to both attorneys so neither side is reconstructing a remodel from memory after closing.
          </p>
          <ul>
            <li>Purchase closing statement with the price and purchase costs.</li>
            <li>Contracts and receipts for improvements, including pool, roof, HVAC, solar if purchased, and remodels.</li>
            <li>The sale closing statement showing transfer tax, commissions, and the property tax proration.</li>
            <li>The decree or separation agreement, and any deeds between spouses.</li>
            <li>The most recent Clark County property tax bill for the proration check.</li>
          </ul>
        </div>

        <HighValueHomeNote
          points={[
            `Transfer tax scales with price: ${NEVADA_LAW.transferTaxExample2M}, paid before the split. A decree transfer between former spouses is exempt, which favors a buyout when one spouse can qualify.`,
            'On a home bought years ago in The Ridges, MacDonald Highlands, or Anthem Country Club, the gain often exceeds the $500,000 joint exclusion. The taxable amount above the cap belongs in the sell-versus-keep comparison.',
            `A buyout refinance above ${LUXURY_2026.jumboThreshold2026} is a jumbo loan, and the spouse who keeps the home also keeps the deferred federal gain with the original basis.`,
            'Construction files on a custom home are the largest basis adjustment available. Contractor invoices for the build or a major remodel can move the taxable gain by six figures.',
            'HOA resale packages, transfer fees, and capital contributions in guard-gated communities show on the settlement statement beside the transfer tax. Get the association’s demand early so both spouses see the full list of closing costs.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the purchase history, the loan, and where the case stands.' },
            { title: 'Net proceeds estimate', detail: 'A settlement-statement style estimate with transfer tax, commissions, payoff, and the property tax proration.' },
            { title: 'Tax advisor hand-off', detail: 'The sale price range and selling costs your CPA needs for the federal gain and exclusion calculation.' },
            { title: 'Closing window', detail: 'A timeline that fits the tax year, the decree, and the market, agreed with both attorneys.' },
          ]}
          callPromise="You leave the call with a net proceeds range and a clear list of which taxes apply to your sale."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
