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

const path = '/splitting-house-proceeds-divorce';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Splitting House Proceeds in a Nevada Divorce | Dr. Jan Duffy',
    description: 'How sale proceeds are split in a Nevada divorce: what escrow deducts, the $5.10 per $1,000 transfer tax, when the split is not 50/50, and how each spouse gets paid.',
    alternates: { canonical, languages },
  };
}

export default async function SplittingHouseProceedsDivorce(props: PageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/splitting-house-proceeds-divorce';

  const faqs = [
    {
      question: 'What if one spouse paid more of the mortgage?',
      answer: 'If the payments came from community income earned during the marriage, it does not change the split. That equity is community property and is divided equally. Payments made after separation from one spouse’s post-separation earnings are different, and your attorney may seek a credit for them at closing.',
    },
    {
      question: 'What if the house was owned before the marriage?',
      answer: 'The spouse who owned it usually keeps the equity that existed on the wedding date. Principal paid down and improvements paid with community income during the marriage create a community interest that is divided. The split of the proceeds then follows the apportionment your attorney and the court settle on.',
    },
    {
      question: 'When do we actually receive the proceeds?',
      answer: 'Escrow disburses after the deed records with the Clark County Recorder. Each spouse receives their share by wire or check according to the disbursement instructions both of you signed. If the decree or a court order directs a different split, escrow follows that document, not the listing agreement.',
    },
    {
      question: 'Can the proceeds be held in escrow until the divorce is final?',
      answer: 'Yes. Spouses often agree, or the court orders, that net proceeds stay in escrow or in an attorney trust account until the decree is entered. That protects both sides when other assets are still being divided, and it lets the final split be adjusted for credits and reimbursements decided later.',
    },
    {
      question: 'Do we pay capital gains tax on our share of the proceeds?',
      answer: 'Possibly, on gain above the Section 121 exclusion. The exclusion is $250,000 per person or $500,000 for a married couple filing jointly, if the ownership and use tests are met. A spouse who moved out can count the other spouse’s continued use under a divorce instrument. Nevada has no state income tax.',
    },
  ];

  const articleSchema = generateArticleSchema(
    'Splitting House Proceeds in a Nevada Divorce',
    'How sale proceeds are split in a Nevada divorce: what escrow deducts, the Clark County transfer tax, when the split is not 50/50, and how each spouse gets paid.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Proceeds Distribution Services',
    'Net proceeds estimates and escrow coordination for dividing home sale proceeds in a Nevada divorce.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Splitting House Proceeds in Divorce: Complete Guide"
        heroSubhead="What comes off the top, how the rest is divided, and how you get paid"
        showHomeValue
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How are house sale proceeds split in a Nevada divorce?">
          Escrow pays off the mortgage, any liens, commissions, closing costs, and Clark County transfer tax first. What remains is the net proceeds. In Nevada, net proceeds from a community home are divided equally unless the decree, a court order, or a separate-property claim directs otherwise. Each spouse is paid directly by escrow after the deed records.
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
          <h2>How proceeds are split under Nevada law</h2>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            That rule,
            {' '}
            {NEVADA_LAW.communityPropertyCite}
            , applies to the net proceeds of a community home. Each spouse starts with half. The split can move for a separate-property reimbursement, for post-separation payments one spouse made alone, or for a written finding by the court. The decree or the escrow instructions both of you sign tell escrow exactly how to pay.
          </p>
          <p>
            Three documents control the money at closing: the listing agreement, which both spouses sign; the decree or a stipulated order, which sets the split; and the escrow disbursement instructions, which turn that split into wires. If those three disagree, closing stops until they match.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Calculating net proceeds: a worked example</h2>
          <p>
            Net proceeds are what is left after every cost of the sale is paid. The gross price is not the number you split. Here is a hypothetical with round figures. Say the home sells for $900,000 and the mortgage payoff is $400,000. Commissions, title, escrow, and transfer tax are treated as one closing cost line for the example, and the buyer negotiated a repair credit.
          </p>
          <div className="my-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <p className="mb-4 text-center text-xl font-semibold">Hypothetical net proceeds</p>
            <div className="space-y-2">
              <p>
                <strong>Sale price:</strong>
                {' '}
                $900,000
              </p>
              <p className="ml-4">− Mortgage payoff, including interest to the payoff date: $400,000</p>
              <p className="ml-4">− Commissions and closing costs: $50,000</p>
              <p className="ml-4">− Clark County transfer tax at $5.10 per $1,000: $4,590</p>
              <p className="ml-4">− Repair credit to buyer: $5,000</p>
              <p className="mt-2 border-t pt-2">
                <strong>Net proceeds:</strong>
                {' '}
                $440,410
              </p>
              <p className="mt-2 border-t pt-2">
                <strong>Each spouse’s share at 50/50:</strong>
                {' '}
                $220,205
              </p>
            </div>
          </div>
          <p>
            Two things to notice. The payoff is higher than the last statement balance because interest accrues to the day escrow pays the lender. And the transfer tax is calculated on the full sale price, not on the equity. Use the
            {' '}
            <Link href="/divorce-net-proceeds-calculator" className="text-blue-600 underline hover:text-blue-700">net proceeds calculator</Link>
            {' '}
            to run your own numbers.
          </p>

          <h2>What escrow deducts before the split</h2>
          <p>
            Every dollar that leaves escrow before the split reduces both shares equally, so both spouses have the same interest in keeping the list short. The deductions are set by the purchase contract, the lender payoff demands, and Clark County recording rules. Most of them are fixed; the negotiable ones are commissions, repair credits, and who pays which HOA charges.
          </p>
          <ul>
            <li>
              <strong>Loan payoffs:</strong>
              {' '}
              first mortgage, HELOC, and any solar or improvement loan recorded as a lien, with interest to the payoff date.
            </li>
            <li>
              <strong>Commissions:</strong>
              {' '}
              as set in the listing agreement and the purchase contract.
            </li>
            <li>
              <strong>Title and escrow fees:</strong>
              {' '}
              owner’s title policy, escrow fee, and recording fees, split with the buyer as the contract says.
            </li>
            <li>
              <strong>Transfer tax:</strong>
              {' '}
              {NEVADA_LAW.transferTaxClarkPer500}
              {' '}
              per $500 of value in Clark County, customarily paid by the seller.
            </li>
            <li>
              <strong>Property tax proration:</strong>
              {' '}
              the seller’s share of the current installment through the closing date.
            </li>
            <li>
              <strong>HOA charges:</strong>
              {' '}
              prorated dues, the resale package, transfer fees, and any capital contribution the association assigns to the seller.
            </li>
            <li>
              <strong>Judgment liens and tax liens:</strong>
              {' '}
              anything recorded against either spouse that attaches to the property.
            </li>
            <li>
              <strong>Repair credits:</strong>
              {' '}
              negotiated after the buyer’s inspection.
            </li>
          </ul>

          <h2>When the split is not 50/50</h2>
          <p>
            Equal division is the default, but the decree can direct a different split for specific reasons. The most common are a separate-property down payment one spouse traces, mortgage payments one spouse made alone after separation, an agreed offset against another asset, and a court finding of a compelling reason. In each case escrow needs the signed document, not a verbal understanding.
          </p>
          <ul>
            <li>
              <strong>Separate-property reimbursement:</strong>
              {' '}
              the traced amount comes off the top for one spouse, and the balance is split equally.
            </li>
            <li>
              <strong>Post-separation credits:</strong>
              {' '}
              mortgage, HOA, or repair costs one spouse carried alone while the case was pending.
            </li>
            <li>
              <strong>Offsets:</strong>
              {' '}
              one spouse takes more proceeds in exchange for less of a retirement account or business interest.
            </li>
            <li>
              <strong>Court-ordered unequal division:</strong>
              {' '}
              available only with a compelling reason stated in writing.
            </li>
          </ul>
          <p>
            Read the
            {' '}
            <Link href="/divorce-home-equity-split" className="text-blue-600 underline hover:text-blue-700">equity split page</Link>
            {' '}
            for the separate-property math.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>How the money is actually paid out</h2>
          <p>
            Escrow disburses after the new deed records with the Clark County Recorder. The payoff goes to the lender first, then the closing costs, then each spouse’s share by wire to the account on their signed instructions. Spouses often agree to hold the net proceeds in escrow or an attorney trust account until the decree is entered, so the final split can absorb credits decided later.
          </p>
          <ol>
            <li>Both spouses sign the listing agreement and, later, the purchase contract.</li>
            <li>Escrow orders payoff demands and prepares a settlement statement each spouse reviews.</li>
            <li>Both spouses sign closing documents, including separate disbursement instructions.</li>
            <li>The deed records. Escrow pays the lender and the closing costs.</li>
            <li>Each spouse’s share is wired, or held per the decree or stipulation.</li>
          </ol>
          <p>
            A neutral agent gives both attorneys the same settlement statement at the same time, so neither side is surprised by a number at the closing table.
          </p>

          <h2>Taxes on your share</h2>
          <p>
            {NEVADA_LAW.capitalGainsExclusion}
            {' '}
            {NEVADA_LAW.noStateIncomeTax}
            {' '}
            Gain is measured against the adjusted basis, not against the net proceeds, so the number escrow wires is not the taxable figure. The
            {' '}
            <Link href="/capital-gains-tax-divorce-home-sale" className="text-blue-600 underline hover:text-blue-700">capital gains page</Link>
            {' '}
            covers the divorce use rule and timing. Source:
            {' '}
            {NEVADA_LAW.capitalGainsCite}
            .
            {' '}
            {LEGAL_DISCLAIMER}
          </p>
        </div>

        <HighValueHomeNote
          points={[
            `Transfer tax scales with price: ${NEVADA_LAW.transferTaxExample2M}, all of it off the top before the split. The decree-transfer exemption between former spouses is the reason a buyout can net more than a sale for the spouse who stays.`,
            'Section 121 excludes $250,000 per person or $500,000 jointly. On a home bought years ago in The Ridges or MacDonald Highlands, gain above that cap is taxed, and the timing of the sale relative to the decree changes which exclusion applies.',
            'HOA resale packages, transfer fees, and capital contributions in guard-gated communities are larger than in a standard subdivision. Get the association’s demand early so the settlement statement has no surprises.',
            `Cash buyers take a large share of closings at the top tier, and ${LUXURY_2026.closingsAbove1MSept2026} homes closed above $1 million in September 2026. A cash contract shortens the escrow and removes the appraisal contingency from the proceeds timeline.`,
            'Club memberships at Red Rock Country Club, DragonRidge, or Anthem Country Club are not part of the sale proceeds. Their transfer or refund is handled with the club and listed in the decree separately.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the home, the loans against it, and what the decree or stipulation says about the split.' },
            { title: 'Net proceeds estimate', detail: 'A line-by-line estimate at a realistic price, with transfer tax, HOA charges, and payoff interest included.' },
            { title: 'Escrow coordination', detail: 'Disbursement instructions that match the decree, shared with both attorneys before closing.' },
          ]}
          callPromise="You leave the call with a net proceeds range and each spouse’s expected share."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
