import type { Metadata } from 'next';
import type { PageProps } from '@/types';
import fs from 'node:fs';
import path from 'node:path';
import { setRequestLocale } from 'next-intl/server';
import { MarkdownContent } from '@/components/content/MarkdownContent';
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

const pagePath = '/what-to-do-with-house-in-divorce';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(pagePath, locale);
  return {
    title: 'What to Do With the House in a Divorce | Dr. Jan Duffy',
    description: 'Six ways to settle the house in a Nevada divorce: sell and split, buyout, deferred sale, refinance, short sale, or court order, with one worked example.',
    alternates: { canonical, languages },
  };
}

export default async function WhatToDoWithHouseInDivorce(props: PageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const contentPath = path.join(process.cwd(), 'src/content/what-to-do-with-house-in-divorce.md');
  const markdownContent = fs
    .readFileSync(contentPath, 'utf-8')
    .replaceAll('{{COMMUNITY_PROPERTY_RULE}}', `${NEVADA_LAW.communityPropertyRule} (${NEVADA_LAW.communityPropertyCite})`)
    .replaceAll('{{LEGAL_DISCLAIMER}}', LEGAL_DISCLAIMER);

  const faqs = [
    {
      question: 'What happens to the house in a Nevada divorce?',
      answer: 'A home bought during the marriage is community property and is divided equally unless the court finds a compelling written reason not to. That division happens by selling and splitting the net proceeds, by one spouse buying out the other, by a deferred sale set in the decree, or by a court-ordered sale when the spouses cannot agree.',
    },
    {
      question: 'Can I keep the house if my spouse wants to sell?',
      answer: 'Usually yes, if you can pay your spouse their share of the equity and qualify for the mortgage in your name alone. If you cannot refinance or fund the buyout from other assets, your spouse can ask the court to order a sale. A lender pre-approval early in the case tells you which path is open.',
    },
    {
      question: 'Should we sell before or after the divorce is final?',
      answer: 'It depends on taxes, timing, and agreement. Selling while married lets you file jointly and use the $500,000 Section 121 exclusion if you both qualify. Selling after the decree gives each spouse a $250,000 exclusion, and a spouse who moved out can count the other’s continued use under the divorce rules. Confirm the plan with your tax advisor.',
    },
    {
      question: 'What if the house is worth less than the mortgage?',
      answer: 'Then a normal sale leaves a shortfall. The options are to keep paying under a deferred sale agreement until the equity recovers, to bring cash to closing, or to ask the lender for a short sale. A short sale needs both borrowers to sign the hardship package and can have credit and tax effects for each of you.',
    },
    {
      question: 'Who pays the mortgage while the divorce is pending?',
      answer: 'Whoever the temporary orders or the written agreement say. Absent an agreement, the lender still expects payment from both borrowers, and a missed payment hits both credit reports. Put mortgage, taxes, insurance, HOA, and repairs in writing early, with a reconciliation at closing if one spouse carried more than their share.',
    },
  ];

  const articleSchema = generateArticleSchema(
    'What to Do With the House in a Divorce',
    'Six ways to settle the house in a Nevada divorce: sell and split, buyout, deferred sale, refinance, short sale, or court order, with a worked example.',
    getCanonicalSiteUrl(pagePath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Property Options Services',
    'Neutral valuation and option comparison for the marital home in a Nevada divorce: sale, buyout, deferred sale, refinance, or court-ordered sale.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="What to Do With the House in a Divorce"
        heroSubhead="Six options, one worked example, and how to choose"
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
        showHomeValue
        currentPath={pagePath}
      >
        <DirectAnswer question="What should we do with the house in a divorce?">
          Sell it and split the net proceeds, have one spouse buy the other out, defer the sale under a written agreement, or let the court order a sale if you cannot agree. In Nevada the equity in a community home is divided equally. The deciding questions are how much equity there is and whether either spouse can qualify for the mortgage alone.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Homes sold within 30 days', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Single-family homes sold in the month', value: LVR_SEPT_2026.sfrUnitsSold },
          ]}
          source={LVR_SEPT_2026.source}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <MarkdownContent content={markdownContent} />

        <HighValueHomeNote
          points={[
            `A buyout on a $2,500,000 home usually means a new loan well above ${LUXURY_2026.jumboThreshold2026}. Jumbo underwriting wants documented income, reserves measured in months of payments, and a lower loan-to-value, so get the lender answer before choosing Option 2.`,
            'On custom homes in The Ridges, MacDonald Highlands, or Anthem Country Club, two appraisers can land far apart. A two-appraisal protocol in the settlement decides the number before anyone signs a deed.',
            `A sale pays Clark County transfer tax at ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000. A deed transfer between former spouses under the decree is exempt, which tilts the math toward a buyout when one spouse can qualify.`,
            'Section 121 caps the excluded gain at $250,000 per person or $500,000 jointly. On a home bought years ago at a fraction of its value, the taxable gain above the cap belongs in the sell-versus-keep comparison.',
            'Club memberships, guard-gated showing rules, and the preference for private or off-market exposure all change how a deferred sale or a listing is written.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the equity, the loan, and where the case stands. Nothing is listed or shared.' },
            { title: 'Option comparison', detail: 'A one-page worksheet showing sale net proceeds against a buyout, with the refinance amount and the tax picture.' },
            { title: 'Decree-ready plan', detail: 'The chosen option with dates, pricing method, and expense split your attorney can write into the agreement.' },
          ]}
          callPromise="You leave the call knowing which of the six options is realistic and what it costs."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
