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

const path = '/divorce-home-equity-split';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'How Home Equity Is Split in a Nevada Divorce | Dr. Jan Duffy',
    description: 'How home equity is split in a Nevada divorce: the equal-division rule, separate-property adjustments, and a worked example with round numbers.',
    alternates: { canonical, languages },
  };
}

export default async function DivorceHomeEquitySplit(props: PageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/divorce-home-equity-split';

  const equitySplitFaqs = [
    {
      question: 'How is equity split if I owned the home before marriage?',
      answer: 'The equity you had on the wedding date is usually yours. Equity built during the marriage from community income, such as principal paid down and improvements paid with joint funds, creates a community interest that is divided. Your attorney may raise an apportionment claim, and it rests on the value at marriage, the value now, and the payment records.',
    },
    {
      question: 'What if one spouse made all the mortgage payments?',
      answer: 'In Nevada it does not matter which spouse wrote the check if the money was community income earned during the marriage. That equity is community property and is divided equally. The analysis changes only if the payments can be traced to separate funds, such as an inheritance kept in a separate account.',
    },
    {
      question: 'How do home improvements affect the equity split?',
      answer: 'Improvements paid with community funds add to community equity and are divided equally. Improvements paid from one spouse’s separate funds may support a reimbursement claim. What matters is the paper trail: the invoice, the account it was paid from, and whether the improvement actually raised the value.',
    },
    {
      question: 'Is the equity split based on the purchase price or today’s value?',
      answer: 'Today’s value. Equity is the current market value minus what is owed, and the current value comes from a dated comparative market analysis or appraisal. The purchase price only matters for tracing separate contributions and for the capital gains calculation if the home is sold.',
    },
    {
      question: 'Does a HELOC or second mortgage reduce the equity?',
      answer: 'Yes. Every lien recorded against the home comes off the value before the equity is split, including a HELOC, a second mortgage, a solar loan recorded as a lien, and any judgment lien. If one spouse drew on a HELOC for a non-marital purpose, your attorney may treat that balance differently, but the lender still gets paid first.',
    },
  ];

  const articleSchema = generateArticleSchema(
    'Divorce Home Equity Split in Nevada Explained',
    'How home equity is split in a Nevada divorce: the equal-division rule, separate-property adjustments, a worked example, and why the valuation date changes the number.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Home Equity Split Services',
    'Dated valuation and equity worksheets for dividing the marital home in a Nevada divorce, including separate-property adjustments.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(equitySplitFaqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Divorce Home Equity Split: Understanding Your Equity Position"
        heroSubhead="What equity is, how Nevada divides it, and what changes the number"
        showHomeValue
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How is home equity split in a Nevada divorce?">
          Equity is the home’s current market value minus the mortgage balance and any other liens. In Nevada, equity in a community home is divided equally unless the court finds a compelling written reason to divide it another way. A spouse who owned the home before marriage or paid the down payment from separate funds may claim that portion back before the rest is split.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Homes sold within 30 days', value: LVR_SEPT_2026.soldWithin30DaysPct },
          ]}
          source={LVR_SEPT_2026.source}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>What home equity is, and what it is not</h2>
          <p>
            Equity is what would be left if the home sold today and every lien was paid. It is the current market value minus the first mortgage, any HELOC or second loan, and any recorded lien. It is not the purchase price, the assessed value on the tax bill, or the number a lender quoted years ago. For a divorce, the value must be dated, because the split is only as fair as the number it starts from.
          </p>
          <div className="my-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <p className="text-center text-xl font-semibold">
              Equity = Current market value − Mortgage balance − HELOC and other liens
            </p>
          </div>
          <p>
            Two things people miss. First, selling costs are not part of equity, but they do reduce what each spouse receives if the home is sold. Second, a buyout uses gross equity, so the spouse who keeps the home pays for the full half without a commission deduction. That difference is a fair point to raise in negotiation, and it should be raised with numbers.
          </p>

          <h2>Nevada’s equal-division rule</h2>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            The rule is
            {' '}
            {NEVADA_LAW.communityPropertyCite}
            . For a home bought during the marriage with community income, that means each spouse starts with half the equity. It does not matter which name is on the deed or who wrote the mortgage checks. Community income is community money, whichever account it passed through.
          </p>
          <p>
            Unequal division is possible but rare. The court has to find a compelling reason and write it down. Common grounds involve one spouse wasting community assets or hiding them, not one spouse earning more. If you think your case has such a reason, that is a conversation with your attorney, and the numbers should be ready when you have it.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Separate property, down payments, and reimbursement</h2>
          <p>
            Separate property is what a spouse owned before the marriage or received during it by gift or inheritance. When separate money went into the house, the spouse who contributed it may claim it back before the community equity is split. The claim depends on tracing: showing the money came from a separate account and went into the purchase, the mortgage, or an improvement.
          </p>
          <p>Three patterns come up again and again in Las Vegas cases:</p>
          <ul>
            <li>
              <strong>Separate down payment on a community home.</strong>
              {' '}
              One spouse used an inheritance for the down payment. The documents are the closing disclosure and the account statement showing the wire.
            </li>
            <li>
              <strong>Pre-marital home paid down with community income.</strong>
              {' '}
              One spouse owned the home before the wedding, and community wages paid the mortgage for years. The community has an interest in the principal paid down and often in the appreciation.
            </li>
            <li>
              <strong>Spouse added to title later.</strong>
              {' '}
              Adding a spouse to the deed can change the character of the property. Whether it did is a legal question that turns on intent and the deed language.
            </li>
          </ul>
          <p>
            The agent’s role in all three is the same: supply the value at the date of marriage, the value at the date the spouse was added, and the value today. The attorney does the apportionment.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>A worked example with round numbers</h2>
          <p>
            Here is a hypothetical to show how the pieces fit. Say the home appraises at $1,500,000 today. The first mortgage balance is $600,000 and a HELOC has $50,000 drawn. Equity is $850,000. If the home is pure community property, each spouse’s starting share is $425,000. Now add a separate-property wrinkle: one spouse paid a $150,000 down payment from an inheritance.
          </p>
          <div className="my-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <p className="mb-2 font-semibold">Hypothetical equity split</p>
            <ul className="space-y-1 text-sm">
              <li>Appraised value: $1,500,000</li>
              <li>First mortgage: $600,000</li>
              <li>HELOC balance: $50,000</li>
              <li className="border-t pt-1">Gross equity: $850,000</li>
              <li>Separate down payment reimbursed first: $150,000</li>
              <li className="border-t pt-1">Community equity to divide: $700,000</li>
              <li>Each spouse’s community share: $350,000</li>
              <li>Spouse who paid the down payment: $350,000 + $150,000 = $500,000</li>
              <li>Other spouse: $350,000</li>
            </ul>
          </div>
          <p>
            Whether the reimbursement is a flat dollar amount or a share of the appreciation is a legal question, and Nevada attorneys argue it both ways. The example shows why the valuation and the tracing both matter. Change the appraised value by $100,000 and each share moves by $50,000.
          </p>

          <h2>How the equity number turns into a buyout or a proceeds split</h2>
          <p>
            Once the shares are set, the equity number drives every option. In a buyout, the spouse keeping the home pays the other spouse’s share, usually by refinancing the old loan plus the buyout amount into one new loan. In a sale, the same shares are applied to net proceeds after commissions, closing costs, and Clark County transfer tax. Either way, the split is written into the decree.
          </p>
          <ul>
            <li>
              <strong>Buyout:</strong>
              {' '}
              in the example above, the keeping spouse would need a new loan of about $1,000,000 to retire $650,000 of debt and pay a $350,000 share. That is a jumbo loan. See
              {' '}
              <Link href="/divorce-buyout-options" className="text-blue-600 underline hover:text-blue-700">buyout options</Link>
              .
            </li>
            <li>
              <strong>Sale:</strong>
              {' '}
              selling costs reduce the $850,000 before it is shared. See
              {' '}
              <Link href="/splitting-house-proceeds-divorce" className="text-blue-600 underline hover:text-blue-700">splitting house proceeds</Link>
              .
            </li>
            <li>
              <strong>Offset:</strong>
              {' '}
              the share can also be paid with other community assets, such as a retirement account, which changes the tax picture for each side.
            </li>
          </ul>

          <h2>Why the valuation date changes the answer</h2>
          <p>
            Equity moves with the market and with every mortgage payment. A value from the date of separation can differ from a value at trial, and a Las Vegas home listed in one season may sell differently in the next. Agree with your attorney on the valuation date, then get a comparative market analysis or appraisal dated to it. Update it if the case runs long.
          </p>
          <p>
            For most settlements, a comparative market analysis with the comparable sales listed is enough. For contested cases and custom homes, a licensed appraisal holds up better, and a two-appraisal protocol settles disagreements without a trial. The
            {' '}
            <Link href="/divorce-home-valuation" className="text-blue-600 underline hover:text-blue-700">valuation page</Link>
            {' '}
            explains which to use and when.
          </p>
        </div>

        <HighValueHomeNote
          points={[
            `At $2,000,000 and up, half the equity is often more than ${LUXURY_2026.jumboThreshold2026} by itself. A buyout then depends on jumbo underwriting: documented income, reserves, and a loan-to-value the lender will accept on a custom home.`,
            'Appraisal spread is the biggest risk to the equity number on custom homes in The Ridges, MacDonald Highlands, and Southern Highlands. Two licensed appraisals, with a method for reconciling them, protect both spouses.',
            'View corridors, lot size, and golf frontage move value more than square footage at the top tier. The comparable sales used should share those features, not just the ZIP code.',
            `If the home is sold, transfer tax at ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 is ${NEVADA_LAW.transferTaxExample2M}. A decree transfer between former spouses is exempt, which matters when comparing a buyout with a sale.`,
            'Club memberships at Red Rock Country Club, DragonRidge, or Anthem Country Club carry their own value and transfer rules. They belong on the asset schedule beside the home equity, not inside it.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the home, the loans against it, and any separate-property history.' },
            { title: 'Dated valuation', detail: 'A comparative market analysis or appraisal referral tied to the valuation date your attorney chooses.' },
            { title: 'Equity worksheet', detail: 'Value, liens, separate contributions, and each spouse’s share in a form that attaches to a filing.' },
            { title: 'Option comparison', detail: 'Buyout refinance amount against net proceeds from a sale, so the decision is made on numbers.' },
          ]}
          callPromise="You leave the call with a value range, the equity, and each spouse’s starting share."
        />

        <PageFAQ faqs={equitySplitFaqs} />
      </DivorcePageTemplate>
    </>
  );
}
