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
import { LEGAL_DISCLAIMER, LVR_SEPT_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type INetProceedsProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-net-proceeds-calculator';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Divorce Net Proceeds Calculator Las Vegas | Dr. Jan Duffy',
    description: 'See what a divorce home sale leaves to split after payoff, commission, and Clark County transfer tax at $5.10 per $1,000. Follow a worked Las Vegas example.',
    alternates: { canonical, languages },
  };
}

function parseDollars(value: string): number {
  return Number(value.replace(/[^0-9.]/g, ''));
}

function dollars(value: number): string {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

/* Worked example inputs. The sale price is the Las Vegas REALTORS® September 2026 median.
   Every other line is a labeled assumption, not a market figure. */
const EXAMPLE_PRICE = parseDollars(LVR_SEPT_2026.medianSfrPrice);
const ASSUMED_PAYOFF = 280_000;
const ASSUMED_COMMISSION_RATE = 0.05;
const ASSUMED_TITLE_ESCROW = 3_500;
const ASSUMED_REPAIR_CREDIT = 2_500;
const ASSUMED_HOA_TRANSFER = 600;
const ASSUMED_ORIGINAL_BASIS = 300_000;
const TRANSFER_TAX_PER_1000 = parseDollars(NEVADA_LAW.transferTaxClarkPer1000);

const commission = EXAMPLE_PRICE * ASSUMED_COMMISSION_RATE;
const transferTax = (EXAMPLE_PRICE / 1000) * TRANSFER_TAX_PER_1000;
const sellingCosts = commission + transferTax + ASSUMED_TITLE_ESCROW + ASSUMED_HOA_TRANSFER;
const netProceeds = EXAMPLE_PRICE - ASSUMED_PAYOFF - sellingCosts - ASSUMED_REPAIR_CREDIT;
const taxableGain = EXAMPLE_PRICE - ASSUMED_ORIGINAL_BASIS - sellingCosts;

const faqs: PageFAQItem[] = [
  {
    question: 'What are net proceeds in a divorce home sale?',
    answer: 'Net proceeds are what escrow wires out after the sale closes: price minus every loan payoff, commission, Clark County transfer tax, title and escrow fees, HOA transfer and resale fees, and any repair credit to the buyer. That is the number the decree or stipulation divides, not the list price or the gross equity.',
  },
  {
    question: 'Who pays the real property transfer tax in Clark County?',
    answer: 'By custom in Southern Nevada the seller pays it, though a contract can shift it. The rate is $2.55 per $500 of value, which is $5.10 per $1,000. On a $2,000,000 sale that is $10,200. A deed between former spouses made under a divorce decree is exempt; a sale to a buyer is not.',
  },
  {
    question: 'Can escrow split the proceeds between us directly?',
    answer: 'Yes, if the escrow instructions say so. Give the title company the decree or the signed stipulation that states the split, and both spouses sign separate wiring instructions. Escrow will not divide money on a verbal request, and it will hold the funds if the two of you give conflicting instructions.',
  },
  {
    question: 'Will we owe capital gains tax on the sale?',
    answer: 'Often not at the Las Vegas median. Section 121 excludes up to $250,000 of gain per single filer and $500,000 for a couple filing jointly when the home was the main residence for two of the last five years. A spouse who moved out can count the other spouse\'s use under a divorce instrument. Nevada adds no state income tax.',
  },
  {
    question: 'What if the mortgage payoff is more than the price?',
    answer: 'Then the sale is short and the lender must approve it, or one spouse brings cash to closing. The decree should say who covers the shortfall and in what share. Before listing, order payoff letters and a broker price opinion so a short position is known in advance rather than discovered at escrow.',
  },
  {
    question: 'Does the commission rate affect what each spouse receives?',
    answer: 'Directly. In the example above, each percentage point of commission on a $470,000 sale moves the split by $4,700 total, or $2,350 per spouse. Commission is negotiated in the listing agreement that both spouses, or the court, must sign. Ask for the rate in writing before anyone signs listing paperwork.',
  },
];

export default async function NetProceedsCalculator(props: INetProceedsProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/divorce-net-proceeds-calculator';
  const articleSchema = generateArticleSchema(
    'Divorce Net Proceeds Calculator for Las Vegas',
    'How to calculate net proceeds from a divorce home sale in Clark County, with a worked example including transfer tax, commission, and the Section 121 exclusion.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Net Proceeds Calculator',
    'Calculate net proceeds from selling a marital home during a Nevada divorce, with a worked Las Vegas example.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, faqSchema, realEstateAgentSchema]} />
      <DivorcePageTemplate
        h1="Divorce Net Proceeds Calculator for Las Vegas"
        heroSubhead="The number escrow actually wires, line by line"
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
        showHomeValue
        currentPath={currentPath}
      >
        <DirectAnswer question="How much will we each receive from selling the house in a divorce?">
          Start with the sale price. Subtract every loan payoff, the commission, Clark County transfer
          tax at
          {' '}
          {NEVADA_LAW.transferTaxClarkPer1000}
          {' '}
          per $1,000, title and escrow fees, HOA transfer fees, and any repair credit. What remains is net
          proceeds, and Nevada splits community proceeds equally unless the court records a reason not to.
          Escrow wires each share per the decree.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Single-family homes sold, Sept 2026', value: LVR_SEPT_2026.sfrUnitsSold },
            { label: 'Clark County transfer tax', value: `${NEVADA_LAW.transferTaxClarkPer1000} per $1,000` },
            { label: 'Section 121 exclusion, joint filers', value: '$500,000' },
          ]}
          source={`${LVR_SEPT_2026.source}; ${NEVADA_LAW.transferTaxCite}; ${NEVADA_LAW.capitalGainsCite}`}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>What comes off the top before anything is divided</h2>
          <p>
            Escrow pays the lenders and the costs of sale before either spouse sees a dollar. The list is
            predictable: loan payoffs, commission, transfer tax, title and escrow charges, HOA transfer and
            resale fees, prorated property tax, and any credit promised to the buyer. Knowing each line in
            advance keeps the settlement conference focused on the split rather than the arithmetic.
          </p>
          <ul>
            <li>
              <strong>Loan payoffs.</strong>
              {' '}
              First mortgage, HELOC, and any solar or PACE lien, each from a written payoff letter.
            </li>
            <li>
              <strong>Commission.</strong>
              {' '}
              Set in the listing agreement. It is negotiable and must be agreed by both spouses or ordered
              by the court.
            </li>
            <li>
              <strong>Transfer tax.</strong>
              {' '}
              {NEVADA_LAW.transferTaxClarkPer500}
              {' '}
              per $500 of value, which is
              {' '}
              {NEVADA_LAW.transferTaxClarkPer1000}
              {' '}
              per $1,000. Source:
              {' '}
              <a href={NEVADA_LAW.transferTaxUrl} rel="noopener noreferrer" target="_blank">{NEVADA_LAW.transferTaxCite}</a>
              .
            </li>
            <li>
              <strong>Title and escrow.</strong>
              {' '}
              Owner's title policy, escrow fee, recording, and courier charges.
            </li>
            <li>
              <strong>HOA charges.</strong>
              {' '}
              Transfer fee, resale package, and any unpaid assessment, collected by the association.
            </li>
            <li>
              <strong>Credits.</strong>
              {' '}
              Repair credits or closing cost help agreed during the inspection period.
            </li>
          </ul>

          <h2>Worked example at the Las Vegas median</h2>
          <p>
            This example sells at the September 2026 single-family median of
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            . The payoff, commission rate, title line, HOA fee, and repair credit are assumptions chosen to
            show the math, not quotes. Your listing agreement and title company set the real figures.
            Transfer tax uses the Clark County rate.
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
                <td>Sale price</td>
                <td>{dollars(EXAMPLE_PRICE)}</td>
                <td>Sept 2026 LVR median</td>
              </tr>
              <tr>
                <td>Mortgage payoff</td>
                <td>
                  −
                  {dollars(ASSUMED_PAYOFF)}
                </td>
                <td>Assumption</td>
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
                <td>HOA transfer and resale package</td>
                <td>
                  −
                  {dollars(ASSUMED_HOA_TRANSFER)}
                </td>
                <td>Assumption</td>
              </tr>
              <tr>
                <td>Repair credit to buyer</td>
                <td>
                  −
                  {dollars(ASSUMED_REPAIR_CREDIT)}
                </td>
                <td>Assumption</td>
              </tr>
              <tr>
                <td><strong>Net proceeds</strong></td>
                <td><strong>{dollars(netProceeds)}</strong></td>
                <td>Wired from escrow</td>
              </tr>
              <tr>
                <td>Each spouse at an equal split</td>
                <td>{dollars(netProceeds / 2)}</td>
                <td>NRS 125.150 default</td>
              </tr>
            </tbody>
          </table>
          <p>
            The split can be unequal when the decree says so, for example to reimburse a separate-property
            down payment or to offset other assets. Escrow follows the written instruction, so get the
            formula into the decree or stipulation before the home goes under contract. The
            {' '}
            <Link href="/divorce-home-equity-calculator">equity calculator</Link>
            {' '}
            covers the value side of the same math.
          </p>

          <h2>Section 121 and the tax on the gain</h2>
          <p>
            Net proceeds are not taxable gain. Gain is price minus your purchase price, minus capital
            improvements, minus selling costs. Section 121 excludes up to $250,000 of gain for a single
            filer and $500,000 for a married couple filing jointly, when the home was the main residence
            for two of the last five years. Most sales near the median owe nothing.
          </p>
          <p>
            Continuing the example: assume the couple bought for
            {' '}
            {dollars(ASSUMED_ORIGINAL_BASIS)}
            {' '}
            (an assumption). Gain is
            {' '}
            {dollars(EXAMPLE_PRICE)}
            {' '}
            minus
            {' '}
            {dollars(ASSUMED_ORIGINAL_BASIS)}
            {' '}
            minus
            {' '}
            {dollars(sellingCosts)}
            {' '}
            of selling costs, or about
            {' '}
            {dollars(taxableGain)}
            . That sits under the $500,000 joint cap and under $250,000 for each spouse's half if they file
            separately after the decree.
            {' '}
            {NEVADA_LAW.capitalGainsExclusion}
            {' '}
            {NEVADA_LAW.noStateIncomeTax}
            {' '}
            Source:
            {' '}
            <a href={NEVADA_LAW.capitalGainsUrl} rel="noopener noreferrer" target="_blank">{NEVADA_LAW.capitalGainsCite}</a>
            .
          </p>
          <p>{LEGAL_DISCLAIMER}</p>

          <h2>How the money is actually paid out</h2>
          <p>
            Escrow disburses on the recording date, usually by wire the same afternoon. Each spouse signs
            separate wiring instructions, verified by phone with the title officer, and the split follows
            the decree or stipulation on file. If the paperwork is silent, escrow holds the funds in a joint
            account until both spouses or the court direct otherwise.
          </p>
          <ol>
            <li>Deliver the decree or stipulation to the title company when escrow opens.</li>
            <li>Confirm the split formula in writing with the escrow officer, including any reimbursements.</li>
            <li>Each spouse submits wiring instructions directly, never through the other spouse.</li>
            <li>Review the estimated settlement statement at least three business days before closing.</li>
            <li>Keep the final settlement statement for the tax return and for the attorney's file.</li>
          </ol>
          <p>
            The home value widget below gives a starting range. Dr. Jan then prepares a seller net sheet
            with the title company's actual fee schedule so both attorneys work from one set of numbers.
          </p>
        </div>

        <HighValueHomeNote points={[
          `Transfer tax is ${NEVADA_LAW.transferTaxExample2M} and ${dollars((5_000_000 / 1000) * TRANSFER_TAX_PER_1000)} on a $5,000,000 sale. Model it before choosing between a sale and a buyout, since the decree transfer between spouses is exempt.`,
          'Gains on long-held custom homes often exceed the $500,000 joint cap. A sale in the year of the decree may still file jointly; a sale the year after uses two $250,000 exclusions. Ask your CPA which year is better.',
          'Cash buyers close a large share of $3 million-plus sales, which removes appraisal risk but shortens the timeline. Have the decree and wiring instructions ready before the listing goes live.',
          'HOA resale packages in guard-gated communities can take two weeks and carry special assessment disclosures that change the net. Order the package the day the listing agreement is signed.',
          'Club membership transfer fees at Red Rock Country Club, DragonRidge, or Anthem Country Club are separate from escrow. Decide who pays them in the stipulation so they do not surface at closing.',
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Fifteen minutes on the loans, the HOA, and what each attorney needs from the sale.' },
            { title: 'Seller net sheet', detail: 'A line-by-line estimate using the title company\'s fee schedule and your payoff letters.' },
            { title: 'Escrow instructions', detail: 'The split formula and both spouses\' wiring details drafted with the escrow officer before listing.' },
            { title: 'Closing', detail: 'Settlement statement reviewed with both sides three days out, funds wired per the decree.' },
          ]}
          callPromise="You leave the call with a net number, a closing timeline, and the next decision."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
