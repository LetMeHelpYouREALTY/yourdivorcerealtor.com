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

const path = '/community-property-divorce-house';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Community Property and the House in Nevada | Dr. Jan Duffy',
    description: 'How Nevada community property law treats the house: the NRS 125.150 equal-division rule, separate property, mixed homes, and the transfer tax exemption.',
    alternates: { canonical, languages },
  };
}

export default async function CommunityPropertyDivorceHouse(props: PageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/community-property-divorce-house';

  const communityPropertyFaqs = [
    {
      question: 'Does it matter whose name is on the title?',
      answer: 'Not for whether the equity is shared. In Nevada, a home acquired during the marriage with community funds is community property even if only one spouse is on the deed. Title matters for the mechanics: who signs the deed at closing, and whether a spouse was added later, which can raise a question about the character of the property.',
    },
    {
      question: 'What if only one spouse paid the mortgage?',
      answer: 'It does not change the division if the payments came from community income earned during the marriage. That money belongs to both spouses, so the equity it built is community property divided equally. The result differs only when the payments can be traced to one spouse’s separate funds, such as an inheritance kept apart.',
    },
    {
      question: 'What if we used separate property for the down payment?',
      answer: 'The spouse who contributed separate funds may be entitled to recover that amount, or a share of the appreciation tied to it, before the community equity is divided. The claim depends on tracing the money from a separate account into the purchase. Closing disclosures and bank statements are the evidence.',
    },
    {
      question: 'Can a judge divide the house unequally in Nevada?',
      answer: 'Yes, but only with a compelling reason set out in writing under NRS 125.150. Unequal division is the exception. It usually involves one spouse wasting or hiding community assets, not a difference in income. Most Las Vegas cases end with an equal split of the home’s equity, by sale or by buyout.',
    },
    {
      question: 'Is a home I inherited during the marriage community property?',
      answer: 'An inheritance is separate property, even if received during the marriage. It can become mixed if community income paid the mortgage or funded improvements, or if you added your spouse to the deed. Keeping it separate means keeping the records that show no community money went in.',
    },
  ];

  const articleSchema = generateArticleSchema(
    'Community Property and the House in Nevada',
    'How Nevada community property law treats the marital home: the equal-division rule, separate property, mixed homes, and the decree transfer tax exemption.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Community Property Divorce Services',
    'Dated valuations and equity worksheets that support community and separate property claims on the marital home in a Nevada divorce.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(communityPropertyFaqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Community Property and Divorce House: Nevada Law Guide"
        heroSubhead="What the equal-division rule means for the home, and where it bends"
        showHomeValue
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="Is the house community property in a Nevada divorce?">
          Usually, yes. A home bought during the marriage with community funds is community property in Nevada, whichever spouse is on the deed. The court divides community property equally unless it finds a compelling reason, stated in writing, to do otherwise. A home owned before the marriage or received by gift or inheritance is separate property, though community payments on it can create a community claim.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Single-family homes sold in the month', value: LVR_SEPT_2026.sfrUnitsSold },
            { label: 'Homes sold within 30 days', value: LVR_SEPT_2026.soldWithin30DaysPct },
          ]}
          source={LVR_SEPT_2026.source}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>What community property means for the house</h2>
          <p>
            Community property is what either spouse acquires during the marriage, other than by gift or inheritance. Wages are community income, so a home bought with wages, or paid down with them, is community property. The practical effect is that each spouse owns half the equity, regardless of whose name is on the deed or the loan. That half is what gets divided when the marriage ends.
          </p>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            The rule is
            {' '}
            {NEVADA_LAW.communityPropertyCite}
            . Equal does not mean the house is cut in half. It means each spouse walks away with half the value, by selling and splitting the net proceeds or by one spouse paying the other for their share.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Community property versus separate property</h2>
          <p>
            Separate property is what a spouse owned before the marriage, or received during it by gift or inheritance, and kept apart from community funds. It stays with that spouse. The line is clean on paper and blurry in practice, because most couples mix money over years of marriage. Deciding which bucket the house sits in is the first step in every division.
          </p>
          <h3>Usually community</h3>
          <ul>
            <li>A home purchased during the marriage with wages or joint savings.</li>
            <li>Equity built by mortgage payments made from community income.</li>
            <li>Improvements paid with joint funds, and the value they added.</li>
          </ul>
          <h3>Usually separate</h3>
          <ul>
            <li>A home one spouse owned before the wedding.</li>
            <li>A home received as a gift or inheritance during the marriage.</li>
            <li>A down payment traced to a separate account that never held community money.</li>
          </ul>
          <h3>When separate property becomes mixed</h3>
          <ul>
            <li>The other spouse was added to the deed.</li>
            <li>Community income paid the mortgage on a pre-marital home for years.</li>
            <li>Joint funds paid for a remodel that raised the value.</li>
            <li>Separate and community money were pooled in one account and then used for the house.</li>
          </ul>
          <p>
            If there is any question about who is entitled to what, that is a conversation with a family law attorney before the home is listed or a buyout is priced.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Title does not decide ownership, but it does decide the mechanics</h2>
          <p>
            Many spouses believe the house belongs to whoever is on the deed. In Nevada, it does not work that way for property acquired during the marriage. The character of the property comes from when and how it was acquired and what money paid for it. Title still matters for the paperwork: the spouse on the deed signs the transfer, and the lender recognizes only the borrowers on the note.
          </p>
          <p>
            Two consequences follow. A spouse who is not on title still needs to sign a listing agreement and the closing documents, or the sale will not close cleanly. And a spouse who is on the loan but gives up the house remains liable to the lender until that loan is refinanced or paid off, whatever the deed or the decree says. The
            {' '}
            <Link href="/quitclaim-deed-divorce" className="text-blue-600 underline hover:text-blue-700">quitclaim deed page</Link>
            {' '}
            and the
            {' '}
            <Link href="/remove-spouse-from-mortgage-after-divorce" className="text-blue-600 underline hover:text-blue-700">mortgage removal page</Link>
            {' '}
            cover both.
          </p>

          <h2>A mixed-home example with round numbers</h2>
          <p>
            Here is a hypothetical to show why mixed homes need records. Say one spouse bought a home before the marriage and had $200,000 of equity on the wedding date. During a ten-year marriage, community income paid the mortgage down by $150,000 and funded a $100,000 remodel. Today the home appraises at $1,200,000 with a $350,000 loan balance, so the equity is $850,000.
          </p>
          <div className="my-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <p className="mb-2 font-semibold">Hypothetical mixed-home figures</p>
            <ul className="space-y-1 text-sm">
              <li>Equity at date of marriage (separate): $200,000</li>
              <li>Principal paid down with community income: $150,000</li>
              <li>Remodel paid with community funds: $100,000</li>
              <li>Appraised value today: $1,200,000</li>
              <li>Loan balance today: $350,000</li>
              <li className="border-t pt-1">Equity today: $850,000</li>
              <li>Appreciation during the marriage: to be apportioned</li>
            </ul>
          </div>
          <p>
            How the appreciation is apportioned between the separate and community interests is a legal question that Nevada attorneys argue on the facts. The agent’s contribution is the value at the date of marriage, the value today, and the comparable sales behind both. Without the marriage-date value, the apportionment cannot be done at all.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Selling or buying out a community home</h2>
          <p>
            Once the character of the home is settled, the division happens one of two ways. In a sale, both spouses sign the listing and the net proceeds are split according to the decree. In a buyout, one spouse pays the other for their share, usually by refinancing into one name, and the other signs a deed. The equity number drives both, so a dated valuation comes first.
          </p>
          <ul>
            <li>
              <strong>Both signatures:</strong>
              {' '}
              a community home cannot be listed or sold by one spouse alone. If one refuses, the other can ask the court to order the sale.
            </li>
            <li>
              <strong>Buyout amount:</strong>
              {' '}
              the other spouse’s share of the equity, adjusted for any separate-property claim. See
              {' '}
              <Link href="/divorce-buyout-options" className="text-blue-600 underline hover:text-blue-700">buyout options</Link>
              .
            </li>
            <li>
              <strong>Proceeds split:</strong>
              {' '}
              net of payoff, commissions, closing costs, and transfer tax. See
              {' '}
              <Link href="/splitting-house-proceeds-divorce" className="text-blue-600 underline hover:text-blue-700">splitting house proceeds</Link>
              .
            </li>
          </ul>

          <p>
            Whichever path you take, the agent should work for the transaction rather than for one spouse. That means the same valuation, the same net proceeds estimate, and the same timeline delivered to both attorneys on the same day, with showing rules and offer decisions handled in writing so neither spouse is surprised.
          </p>

          <h2>Deeds, decrees, and the transfer tax exemption</h2>
          <p>
            When one spouse keeps the home, the other signs an interspousal or quitclaim deed and the decree is recorded with it. Clark County charges real property transfer tax at
            {' '}
            {NEVADA_LAW.transferTaxClarkPer500}
            {' '}
            per $500 of value, or
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000.
            {' '}
            {NEVADA_LAW.transferTaxDivorceExemption}
            {' '}
            A sale to a third party pays the full tax from the proceeds.
          </p>
          <p>
            The exemption is claimed on the declaration of value filed with the deed, and the recorder expects the decree reference to match. Source:
            {' '}
            {NEVADA_LAW.transferTaxCite}
            .
            {' '}
            {LEGAL_DISCLAIMER}
          </p>
        </div>

        <HighValueHomeNote
          points={[
            `Half the equity in a $3,000,000 community home is a $1,500,000 obligation for the spouse who stays. Any refinance above ${LUXURY_2026.jumboThreshold2026} is a jumbo loan with stricter income, reserve, and loan-to-value requirements.`,
            'Separate-property tracing on a custom home often reaches back to a lot purchase and a construction loan. The value at the date of marriage may need a retrospective appraisal, which is a different assignment from a current one.',
            'Two licensed appraisals, with a written method for reconciling them, settle the equity number on homes in The Ridges, MacDonald Highlands, and Southern Highlands where appraisal spread is widest.',
            `Transfer tax on a sale is ${NEVADA_LAW.transferTaxExample2M}. A decree transfer between former spouses is exempt, which favors a buyout when one spouse can qualify.`,
            'Club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, and The Summit Club have their own community or separate character and their own transfer rules. List them in the decree beside the home.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about when the home was bought, what paid for it, and whose names are on the deed and loan.' },
            { title: 'Dated valuation', detail: 'A current comparative market analysis, and a marriage-date value if a separate-property claim is in play.' },
            { title: 'Equity worksheet', detail: 'Community and separate figures laid out for your attorney, with the comparable sales attached.' },
            { title: 'Division plan', detail: 'Sale or buyout, with the timeline and documents escrow will need.' },
          ]}
          callPromise="You leave the call knowing which bucket the home sits in and what the equity is."
        />

        <PageFAQ faqs={communityPropertyFaqs} />
      </DivorcePageTemplate>
    </>
  );
}
