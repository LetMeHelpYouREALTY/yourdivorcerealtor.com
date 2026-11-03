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

const path = '/divorce-settlement-options';

type ISettlementProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Divorce Settlement Options for the House | Dr. Jan Duffy',
    description: 'Five ways to settle the house in a Nevada divorce: sell and split, buyout, deferred sale, refinance, or short sale. Compare costs, loan needs, and timing for each.',
    alternates: { canonical, languages },
  };
}

export default async function SettlementOptions(props: ISettlementProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/divorce-settlement-options';

  const faqs = [
    {
      question: 'Which settlement option is most common for the house?',
      answer: 'Sale and split, because it needs no one to qualify for a new loan and it ends the shared mortgage on closing day. Buyouts are next, and they depend on one spouse qualifying alone. Deferred sales are less common and work only with a written agreement that assigns every carrying cost until the sale date.',
    },
    {
      question: 'Can we agree on a settlement without the court deciding?',
      answer: 'Yes. Most Nevada divorces settle the house by stipulation, and the court enters the agreement as part of the decree. The judge decides only when the spouses cannot agree, and then the usual order is a sale with a neutral agent. Agreeing early keeps timing, pricing, and showing rules in your hands.',
    },
    {
      question: 'Does the option we choose affect taxes?',
      answer: 'It can. A sale triggers the capital gains calculation now, with the Section 121 exclusion of $250,000 per person or $500,000 jointly if you qualify. A buyout defers it, and the keeping spouse carries the original basis forward. A decree transfer between former spouses is exempt from Clark County transfer tax; a sale is not.',
    },
    {
      question: 'What if we choose a buyout and the refinance falls through?',
      answer: 'The settlement should say. A common term gives the keeping spouse a defined period to close the refinance, after which the home is listed with a named agent at a pricing method both spouses accepted. Without that term, the departing spouse is left on the loan with no deadline and no remedy.',
    },
    {
      question: 'Who pays the mortgage and HOA until the house is settled?',
      answer: 'Whoever the temporary orders or the written agreement say. The lender and the association expect payment either way, and a missed payment hits both credit reports. Put mortgage, taxes, insurance, HOA, and repairs in writing, with a reconciliation at closing if one spouse carried more than their share.',
    },
  ];

  const articleSchema = generateArticleSchema(
    'Divorce Settlement Options for the House',
    'Five ways to settle the house in a Nevada divorce: sell and split, buyout, deferred sale, refinance, or short sale, with costs, loan needs, and timing for each.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Settlement Options Services',
    'Neutral comparison of sale, buyout, deferred sale, refinance, and short sale for the marital home in a Las Vegas divorce.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Divorce Settlement Real Estate Options"
        heroSubhead="Five ways to settle the house, and how to compare them on numbers"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="What are the settlement options for the house in a divorce?">
          Sell and split the net proceeds, have one spouse buy out the other, defer the sale under a written co-ownership agreement, refinance to remove one spouse when the equity is small, or arrange a short sale if the loan exceeds the value. In Nevada each spouse starts with half the equity in a community home. The option that fits depends on who can carry the loan alone and how much equity there is.
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
          <h2>The rule every option starts from</h2>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            That is
            {' '}
            {NEVADA_LAW.communityPropertyCite}
            , and it means each spouse starts with half the equity in a home bought during the marriage. The settlement options below are different ways of delivering that half: in cash from a buyer, in cash from a refinance, or later under a deferred sale. The equity number, from a dated valuation, comes before any of them.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Option 1: Sell and split the net proceeds</h2>
          <p>
            Both spouses sign the listing, the home sells, and escrow pays the loan, commissions, closing costs, and Clark County transfer tax before dividing the balance. No one needs to qualify for a loan, and the shared mortgage ends on closing day. With
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of Las Vegas single-family homes selling inside 30 days, the timeline is usually measured in weeks once the home is listed.
          </p>
          <h3>What it costs</h3>
          <p>
            Commissions, title and escrow fees, the transfer tax at
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000, HOA transfer charges, and any repair credits. All of it comes off the top, so both shares shrink by the same amount.
          </p>
          <h3>What it needs</h3>
          <p>
            Agreement on list price, repairs, showing rules, and which offers to accept, plus a plan for who lives in the home until closing. The
            {' '}
            <Link href="/selling-home-during-divorce" className="text-blue-600 underline hover:text-blue-700">selling during divorce page</Link>
            {' '}
            covers the listing process built for two decision-makers.
          </p>

          <h2>Option 2: One spouse buys out the other</h2>
          <p>
            The spouse who stays pays the other their share of the equity, usually by refinancing the old loan plus the buyout into a new loan in one name. The departing spouse signs a deed, and that transfer is exempt from transfer tax under the decree. The whole plan depends on a loan approval, so the lender conversation happens before the settlement is drafted.
          </p>
          <h3>What it costs</h3>
          <p>
            Refinance closing costs and a new rate, which may be higher than the current one. No commission, and no transfer tax on the deed between former spouses.
          </p>
          <h3>What it needs</h3>
          <p>
            One income that carries the new payment, a credit file that qualifies, and an appraisal the lender accepts. Loans above
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            are jumbo and underwrite more strictly. The
            {' '}
            <Link href="/divorce-buyout-options" className="text-blue-600 underline hover:text-blue-700">buyout options page</Link>
            {' '}
            walks through the math and the refinance.
          </p>

          <h2>Option 3: Deferred sale with temporary co-ownership</h2>
          <p>
            Both names stay on title and the decree sets a future sale date, often tied to a child finishing a school year or a loan rate adjusting. One spouse usually lives in the home. It works only with a written agreement that assigns the mortgage, taxes, insurance, HOA, and repairs, names the agent and the pricing method, and says how the proceeds will be split when the day comes.
          </p>
          <ul>
            <li>
              <strong>Upside:</strong>
              {' '}
              time, and the chance to sell in a different market or after a rate change.
            </li>
            <li>
              <strong>Downside:</strong>
              {' '}
              market risk in both directions, credit exposure for the spouse who moved out, and disputes over repairs and upgrades that were not assigned.
            </li>
            <li>
              <strong>Must-have terms:</strong>
              {' '}
              sale date, agent, pricing method, expense split, and what happens if one spouse wants out early.
            </li>
          </ul>

          <h2>Option 4: Refinance to remove one spouse</h2>
          <p>
            When the equity is small, the buyout amount may be modest or offset by another asset, and the refinance stands on its own. The keeping spouse qualifies for a new loan in one name, the old loan is paid, and the departing spouse signs a deed. It protects the departing spouse’s credit and frees their borrowing power for their next purchase.
          </p>
          <p>
            A deed transfer alone does not remove anyone from the loan. Only a refinance or a payoff does. The
            {' '}
            <Link href="/refinancing-after-divorce" className="text-blue-600 underline hover:text-blue-700">refinancing page</Link>
            {' '}
            and the
            {' '}
            <Link href="/remove-spouse-from-mortgage-after-divorce" className="text-blue-600 underline hover:text-blue-700">mortgage removal page</Link>
            {' '}
            cover timing and lender requirements.
          </p>

          <h2>Option 5: Short sale when the loan exceeds the value</h2>
          <p>
            If the payoff is higher than what the home would sell for, a normal sale leaves a shortfall. A short sale asks the lender to accept less than the balance. It needs lender approval, takes longer, and can affect credit for both borrowers. It is usually preferable to foreclosure, which affects both credit reports regardless of what the decree says.
          </p>
          <p>
            Both borrowers sign the lender’s hardship package, and any forgiven balance can have federal tax consequences. Involve a tax advisor before the application goes in.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Comparing the options on one page</h2>
          <p>
            The decision is easier when the five options sit side by side with the same inputs. Here is a hypothetical. Say the home would sell for $800,000 and the loan balance is $350,000, so the equity is $450,000 and each spouse starts with $225,000. A sale nets less than $450,000 after costs, but ends the loan. A buyout means one spouse borrows about $575,000, with no transfer tax and no commission.
          </p>
          <ul>
            <li>
              <strong>Sale:</strong>
              {' '}
              each spouse receives half the net proceeds, in weeks, with no loan.
            </li>
            <li>
              <strong>Buyout:</strong>
              {' '}
              one spouse receives $225,000 at the refinance closing; the other owns the home with a larger loan.
            </li>
            <li>
              <strong>Deferred sale:</strong>
              {' '}
              both wait, both stay on the loan, and the split happens at a set future date.
            </li>
            <li>
              <strong>Refinance only:</strong>
              {' '}
              realistic here only if the $225,000 share is offset by another asset.
            </li>
            <li>
              <strong>Short sale:</strong>
              {' '}
              not applicable with $450,000 of equity.
            </li>
          </ul>
          <p>
            Dr. Jan Duffy prepares that comparison for both attorneys at once, so the choice is made on the same numbers from the same date.
          </p>
        </div>

        <HighValueHomeNote
          points={[
            `Above ${LUXURY_2026.jumboThreshold2026}, a buyout refinance is a jumbo loan with stricter income, reserve, and loan-to-value rules. Get the lender answer before choosing Option 2, not after the settlement is drafted.`,
            `A sale pays transfer tax of ${NEVADA_LAW.transferTaxExample2M}, plus commissions, before the split. A decree transfer between former spouses pays no transfer tax, which tilts the comparison toward a buyout when one spouse qualifies.`,
            'Appraisal spread on custom homes in The Ridges, MacDonald Highlands, and Southern Highlands can move the buyout amount by a large sum. A two-appraisal protocol in the settlement settles it without a trial.',
            'Section 121 excludes $250,000 per person or $500,000 jointly. On a home with a large built-in gain, selling while married and filing jointly may use more exclusion than selling after the decree; confirm the timing with your tax advisor.',
            'A deferred sale in a guard-gated community needs showing rules, club membership status, and HOA obligations written into the agreement, since the listing may be years away.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the equity, the loan, and which options each spouse is open to.' },
            { title: 'Side-by-side worksheet', detail: 'Sale net proceeds, buyout refinance amount, and deferred-sale carrying costs on one page with the same date.' },
            { title: 'Decree-ready terms', detail: 'The chosen option with dates, pricing method, and expense split your attorney can write into the agreement.' },
          ]}
          callPromise="You leave the call knowing which options are realistic and what each one costs."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
      <RealScoutHomeValue />
      <RealScoutCondoListings />
      <RealScoutFamilyHomes />
    </>
  );
}
