import type { Metadata } from 'next';
import type { PageFAQItem } from '@/components/divorce/PageFAQ';
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

type IEquityCalculatorProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-home-equity-calculator';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Divorce Home Equity Calculator Las Vegas | Dr. Jan Duffy',
    description: 'Work out the equity in your marital home before a Nevada divorce settlement. Follow a worked example at the $470,000 Las Vegas median, with each spouse\'s half.',
    alternates: { canonical, languages },
  };
}

function parseDollars(value: string): number {
  return Number(value.replace(/[^0-9.]/g, ''));
}

function dollars(value: number): string {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

/* Worked example inputs. The home value is the Las Vegas REALTORS® September 2026 median.
   Every other line is a labeled assumption, not a market figure. */
const EXAMPLE_VALUE = parseDollars(LVR_SEPT_2026.medianSfrPrice);
const ASSUMED_FIRST_MORTGAGE = 280_000;
const ASSUMED_HELOC = 25_000;
const ASSUMED_COMMISSION_RATE = 0.05;
const ASSUMED_TITLE_ESCROW = 3_500;
const TRANSFER_TAX_PER_1000 = parseDollars(NEVADA_LAW.transferTaxClarkPer1000);

const grossEquity = EXAMPLE_VALUE - ASSUMED_FIRST_MORTGAGE - ASSUMED_HELOC;
const commission = EXAMPLE_VALUE * ASSUMED_COMMISSION_RATE;
const transferTax = (EXAMPLE_VALUE / 1000) * TRANSFER_TAX_PER_1000;
const sellingCosts = commission + transferTax + ASSUMED_TITLE_ESCROW;
const netEquity = grossEquity - sellingCosts;

const faqs: PageFAQItem[] = [
  {
    question: 'What is home equity in a divorce?',
    answer: 'Equity is the home\'s current market value minus every loan and lien recorded against it: the first mortgage, any HELOC or second mortgage, and unpaid tax or HOA liens. Nevada treats equity built during the marriage as community property, which the court divides equally unless it records a compelling reason not to.',
  },
  {
    question: 'Is equity the same as what we split at closing?',
    answer: 'No. Equity is value minus debt. Net proceeds are equity minus the cost of selling: commission, Clark County transfer tax, title and escrow fees, and any repair credits. In the worked example above, selling costs lower the number to divide by roughly a sixth. Use the net proceeds page for the full closing math.',
  },
  {
    question: 'Which value should we use: appraisal, broker opinion, or a website estimate?',
    answer: 'For a buyout or a contested case, a licensed appraisal is the number attorneys and judges rely on. A broker price opinion is useful early and costs less. Automated online estimates are not accepted as evidence and are not used on this site. For custom homes above $1 million, many couples order two appraisals and average them.',
  },
  {
    question: 'How does equity turn into a buyout number?',
    answer: 'The spouse keeping the home typically pays the other spouse half of the agreed equity, often adjusted for the selling costs a sale would have incurred. That payment usually comes from a cash-out refinance, so the keeping spouse must qualify alone. Above the jumbo line, that refinance needs full documentation and a fresh appraisal.',
  },
  {
    question: 'What if one spouse paid the down payment with separate money?',
    answer: 'Nevada law can recognize a separate property contribution and reimburse it before the community share is split, but the spouse claiming it must trace the money with records. Bring the closing statement from the original purchase and bank statements showing the source. Your attorney decides how to present the claim.',
  },
  {
    question: 'Does a HELOC count against equity even if only one spouse used the money?',
    answer: 'Yes. The lender records the HELOC against the property, so it is paid off at closing or refinanced before title changes. Whether the court treats the debt as community or assigns it to one spouse is a separate question for your attorney. The payoff still reduces what the sale can distribute.',
  },
];

export default async function HomeEquityCalculator(props: IEquityCalculatorProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/divorce-home-equity-calculator';
  const articleSchema = generateArticleSchema(
    'Divorce Home Equity Calculator for Las Vegas',
    'How to calculate the equity in a marital home for a Nevada divorce, with a worked example and the difference between equity and net proceeds.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Home Equity Calculator',
    'Calculate the equity in your marital home for Nevada divorce property division, with a worked Las Vegas example.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, faqSchema, realEstateAgentSchema]} />
      <DivorcePageTemplate
        h1="Divorce Home Equity Calculator for Las Vegas"
        currentPath={currentPath}
        heroSubhead="Value minus debt, then what a sale would leave to divide"
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
        showHomeValue
      >
        <DirectAnswer question="How do I calculate home equity for a Nevada divorce?">
          Take the home's current market value and subtract the first mortgage payoff, any HELOC or second
          mortgage, and any recorded liens. That is gross equity. Nevada divides community equity equally
          unless the court finds a written reason not to. For a sale, subtract commission, Clark County
          transfer tax at
          {' '}
          {NEVADA_LAW.transferTaxClarkPer1000}
          {' '}
          per $1,000, and title fees to reach the number you actually split.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Homes sold within 30 days', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Clark County transfer tax', value: `${NEVADA_LAW.transferTaxClarkPer1000} per $1,000` },
            { label: '2026 jumbo loan line, Clark County', value: LUXURY_2026.jumboThreshold2026 },
          ]}
          source={LVR_SEPT_2026.source}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>What counts as equity in a divorce</h2>
          <p>
            Equity is the home's market value minus every debt secured by it. The first mortgage is the
            obvious one. HELOCs, second mortgages, solar loans recorded as liens, unpaid property tax, and
            HOA liens all reduce it too. The value side should come from a licensed appraisal or a broker
            price opinion, not a website estimate. Nevada treats equity built during the marriage as
            community property.
          </p>
          <p>
            Under
            {' '}
            <a href={NEVADA_LAW.communityPropertyUrl} rel="noopener noreferrer" target="_blank">{NEVADA_LAW.communityPropertyCite}</a>
            ,
            {' '}
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            A separate-property down payment, an inheritance used for a remodel, or payments made after the
            date of separation can shift the split. Those claims need records, so start gathering them now.
          </p>
          <p>{LEGAL_DISCLAIMER}</p>

          <h2>The three numbers you need</h2>
          <p>
            You need a defensible value, an exact payoff for every loan, and a list of recorded liens.
            Value comes from an appraiser or a broker price opinion. Payoffs come from each lender's
            written payoff letter, which includes interest through a stated date. Liens show up on a
            preliminary title report, which a title company can run before you list.
          </p>
          <ol>
            <li>
              <strong>Market value.</strong>
              {' '}
              Order a broker price opinion first. If a buyout or a contested hearing is likely, follow with
              a licensed appraisal. Custom homes and view lots often need two.
            </li>
            <li>
              <strong>Loan payoffs.</strong>
              {' '}
              Request a payoff letter from every lender, not the balance on the monthly statement. The
              payoff includes accrued interest and any prepayment terms.
            </li>
            <li>
              <strong>Recorded liens.</strong>
              {' '}
              Ask a title company for a preliminary report. It lists HOA liens, tax liens, judgments, and
              solar UCC filings that a statement never shows.
            </li>
          </ol>

          <h2>Worked example at the Las Vegas median</h2>
          <p>
            This example uses the September 2026 single-family median of
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            {' '}
            as the value. The loan balances, commission rate, and title line are assumptions chosen to show
            the math. Your numbers will differ. Transfer tax uses the Clark County rate of
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000 of price.
          </p>
          <table>
            <thead>
              <tr>
                <th>Line (example only)</th>
                <th>Amount</th>
                <th>Basis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Market value</td>
                <td>{dollars(EXAMPLE_VALUE)}</td>
                <td>Sept 2026 LVR median</td>
              </tr>
              <tr>
                <td>First mortgage payoff</td>
                <td>
                  −
                  {dollars(ASSUMED_FIRST_MORTGAGE)}
                </td>
                <td>Assumption</td>
              </tr>
              <tr>
                <td>HELOC payoff</td>
                <td>
                  −
                  {dollars(ASSUMED_HELOC)}
                </td>
                <td>Assumption</td>
              </tr>
              <tr>
                <td><strong>Gross equity</strong></td>
                <td><strong>{dollars(grossEquity)}</strong></td>
                <td>Value minus debt</td>
              </tr>
              <tr>
                <td>Commission</td>
                <td>
                  −
                  {dollars(commission)}
                </td>
                <td>
                  Assumed
                  {' '}
                  {ASSUMED_COMMISSION_RATE * 100}
                  % total; negotiable
                </td>
              </tr>
              <tr>
                <td>Clark County transfer tax</td>
                <td>
                  −
                  {dollars(transferTax)}
                </td>
                <td>
                  {NEVADA_LAW.transferTaxClarkPer1000}
                  {' '}
                  per $1,000
                </td>
              </tr>
              <tr>
                <td>Title, escrow, and recording</td>
                <td>
                  −
                  {dollars(ASSUMED_TITLE_ESCROW)}
                </td>
                <td>Assumption</td>
              </tr>
              <tr>
                <td><strong>Net equity if sold</strong></td>
                <td><strong>{dollars(netEquity)}</strong></td>
                <td>What a sale would leave</td>
              </tr>
              <tr>
                <td>Each spouse at an equal split</td>
                <td>{dollars(netEquity / 2)}</td>
                <td>NRS 125.150 default</td>
              </tr>
            </tbody>
          </table>
          <p>
            Notice the gap. Gross equity is
            {' '}
            {dollars(grossEquity)}
            , but a sale leaves
            {' '}
            {dollars(netEquity)}
            {' '}
            to divide. When one spouse keeps the home, couples often negotiate whether the buyout uses gross
            or net equity. Either is defensible; the point is to decide it in writing before the refinance
            is ordered. The
            {' '}
            <Link href="/divorce-net-proceeds-calculator">net proceeds calculator</Link>
            {' '}
            walks through the full closing side.
          </p>

          <h2>Equity, taxes, and the Section 121 exclusion</h2>
          <p>
            Equity and taxable gain are different numbers. Gain is sale price minus what you paid, minus
            improvements, minus selling costs. The IRS Section 121 exclusion shelters up to $250,000 of
            gain for a single filer and $500,000 for a married couple filing jointly, if the home was your
            main residence for two of the last five years. At the Las Vegas median, most couples owe
            nothing.
          </p>
          <p>
            {NEVADA_LAW.capitalGainsExclusion}
            {' '}
            That divorce rule matters when one spouse moved out two years ago and the sale happens after the
            decree. Keep the decree language on use of the home, because it is what supports the claim.
            {' '}
            {NEVADA_LAW.noStateIncomeTax}
            {' '}
            Source:
            {' '}
            <a href={NEVADA_LAW.capitalGainsUrl} rel="noopener noreferrer" target="_blank">{NEVADA_LAW.capitalGainsCite}</a>
            .
          </p>
          <p>{LEGAL_DISCLAIMER}</p>

          <h2>Using the number for a buyout or a sale</h2>
          <p>
            Once both spouses accept a value, equity drives every option. A sale splits net proceeds at
            closing. A buyout means one spouse refinances and pays the other a share of equity. A deferred
            sale keeps both names on title for a set period, with the equity split written into the decree.
            The right choice depends on who can qualify for the loan alone.
          </p>
          <ul>
            <li>
              <strong>Sale:</strong>
              {' '}
              the cleanest math. Proceeds are wired per the decree or stipulation from escrow.
            </li>
            <li>
              <strong>Buyout:</strong>
              {' '}
              the keeping spouse needs income to carry the new loan plus the cash-out. Get a lender's
              pre-approval before agreeing to a number.
            </li>
            <li>
              <strong>Deferred sale:</strong>
              {' '}
              common when children are finishing a school year. Write down who pays what, and when the
              listing must start.
            </li>
          </ul>
          <p>
            The home value widget below gives a starting range. Dr. Jan then prepares a written broker
            price opinion you can hand to counsel, and coordinates an appraisal when the case needs one.
          </p>
        </div>

        <HighValueHomeNote points={[
          `Loans above ${LUXURY_2026.jumboThreshold2026} are jumbo. A buyout refinance at that size needs full income documentation, reserves, and a new appraisal, so confirm the keeping spouse qualifies before the equity number is fixed.`,
          'Custom homes in The Ridges, MacDonald Highlands, and Southern Highlands often appraise with a wide spread between two appraisers. A two-appraisal protocol, averaging both, avoids a second fight over value.',
          `Transfer tax scales with price: ${NEVADA_LAW.transferTaxExample2M}. A transfer between former spouses under the decree is exempt, but a sale to a third party is not.`,
          'Large gains can exceed the $250,000 or $500,000 Section 121 cap. Model the tax on a sale against a buyout before choosing, because the buyout defers the gain while the sale triggers it.',
          'Club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, and The Summit Club are separate assets with their own transfer rules and fees. Price them outside the home equity.',
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Fifteen minutes to cover where the case stands, who is on title, and what the lenders are owed.' },
            { title: 'Written valuation', detail: 'A broker price opinion in a format counsel can file, with the equity math laid out line by line.' },
            { title: 'Option comparison', detail: 'Sale, buyout, and deferred sale side by side, using your payoffs and a lender\'s read on the refinance.' },
            { title: 'Decision in writing', detail: 'The agreed value and split go to both attorneys so the decree or stipulation matches the numbers.' },
          ]}
          callPromise="You leave the call with a value range, the equity math, and a clear next decision."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
