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
import { CONTENT_LAST_UPDATED, toSchemaDateTime } from '@/lib/content-dates';
import { LEGAL_DISCLAIMER, LUXURY_2026, LVR_SEPT_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type IRefinancingProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/refinancing-after-divorce';
const pageTitle = 'Refinancing After Divorce in Las Vegas';
const pageDescription = 'How to refinance the marital home into one name after a Nevada divorce: qualifying on one income, the cash-out buyout, and jumbo rules above $832,750.';

const faqs = [
  {
    question: 'Do I have to refinance if the decree gives me the house?',
    answer: 'The decree does not require it, but the lender does not read the decree. Until you refinance, assume the loan with a written release, or sell, your former spouse remains a borrower and their credit rides on your payments. Most Nevada decrees set a refinance deadline for that reason, with a sale as the fallback if the loan is not approved by that date.',
  },
  {
    question: 'Can I use alimony or child support to qualify for the refinance?',
    answer: 'Usually, if three things are true: the support is ordered in a filed decree or court order, you can show it has been received on schedule, and it is expected to continue well beyond closing. Lenders want the court document and bank statements showing the deposits. Support you pay out is counted as a monthly debt on the other side of the ratio.',
  },
  {
    question: 'Is a divorce buyout refinance treated as cash-out?',
    answer: 'It depends on the lender and loan program. Some conventional programs treat a refinance that pays a spouse the equity awarded in a decree as a rate-and-term loan, which allows a higher loan-to-value. Others price it as cash-out. Bring the decree to the lender before the application so the program, rate, and maximum loan amount are set correctly.',
  },
  {
    question: 'What is different about a jumbo refinance after divorce?',
    answer: `Anything above ${LUXURY_2026.jumboThreshold2026} in Clark County is jumbo in 2026. The loan is underwritten on the keeping spouse's income alone with full documentation, a lower maximum loan-to-value than a conforming loan, and reserves after closing measured in months of the full housing payment. Custom homes often need two appraisals, and the lender uses the lower value.`,
  },
  {
    question: 'How long does a post-divorce refinance take?',
    answer: 'A typical range is 30 to 45 days from a complete application to funding, assuming the decree is entered and the appraisal comes in near the expected value. That is a range, not a promise. Jumbo loans, a second appraisal, or a decree still waiting for the judge\'s signature can push it longer. Start the lender conversation before the decree is final.',
  },
  {
    question: 'Do we owe transfer tax when the deed moves to me at the refinance?',
    answer: `${NEVADA_LAW.transferTaxDivorceExemption} The deed is recorded with a Declaration of Value citing ${NEVADA_LAW.transferTaxCite}, usually at the refinance closing. A sale would pay ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of value instead. ${LEGAL_DISCLAIMER}`,
  },
];

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: `${pageTitle} | Dr. Jan Duffy`,
    description: pageDescription,
    alternates: { canonical, languages },
  };
}

export default async function RefinancingAfterDivorce(props: IRefinancingProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = path;
  const articleSchema = generateArticleSchema(
    pageTitle,
    pageDescription,
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Post-Divorce Refinancing Guidance',
    pageDescription,
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqSchema]} />
      <DivorcePageTemplate
        h1="Refinancing Your Home After Divorce"
        heroSubhead="One name on the loan, one name on title"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="Can I refinance my home after divorce in Las Vegas?">
          Yes, if you qualify on your own. A post-divorce refinance replaces the joint loan with a new loan in the keeping spouse's name, pays off the old balance, and can add cash out to fund the buyout ordered in the decree. Lenders underwrite your income, your credit, and a new appraisal. Above
          {' '}
          {LUXURY_2026.jumboThreshold2026}
          {' '}
          the loan is jumbo and reserves are required. Until it funds, both names stay on the old loan.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: '2026 jumbo loan line, Clark County', value: LUXURY_2026.jumboThreshold2026 },
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Clark County transfer tax per $1,000 (sale)', value: NEVADA_LAW.transferTaxClarkPer1000 },
          ]}
          source={`${LUXURY_2026.jumboSource}; ${LVR_SEPT_2026.source}; ${NEVADA_LAW.transferTaxCite}`}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>What a divorce refinance actually does</h2>
          <p>
            A refinance pays off the joint mortgage with a new loan that carries only the keeping spouse's name. That is the moment the departing spouse's liability ends. Nothing earlier does it: not the decree, not a quitclaim deed, not a side letter. A quitclaim deed changes title; the refinance changes the loan. Most Nevada divorces need both, and the deed is often recorded at the refinance closing.
          </p>
          <p>
            Until the new loan funds, the departing spouse remains liable for every payment. Their credit file still shows the mortgage, their debt-to-income ratio still carries it, and a late payment lands on both reports. If the keeping spouse cannot refinance, the remaining exits are an assumption with a written release of liability or a sale. The
            {' '}
            <Link href="/divorce-and-mortgage" className="text-blue-600 underline hover:text-blue-700">mortgage overview</Link>
            {' '}
            compares all three.
          </p>

          <h2>Qualifying on one income</h2>
          <p>
            The lender underwrites the keeping spouse as a single borrower: one income, one credit file, one set of debts. Wages, self-employment income, rental income, and court-ordered support can all count when documented. Support you pay counts against you as a monthly debt. The decree itself becomes a loan document, because it sets the buyout amount, assigns debts, and shows which spouse is responsible for which payment.
          </p>
          <h3>Support income</h3>
          <p>
            Alimony and child support count when the support is ordered in a filed decree or court order, you can show it arriving on schedule in your bank statements, and it is expected to continue well beyond closing. Temporary orders are weaker than a final decree. If the decree is still in draft, the lender may issue a conditional approval and wait for the entered order.
          </p>
          <h3>Debts assigned to your former spouse</h3>
          <p>
            A car loan or credit card the decree assigns to the other spouse can usually be excluded from your ratio once the lender sees the decree and the account is being paid. The joint mortgage you are refinancing is paid off at closing, so it drops out. Other joint accounts should be closed or refinanced too, or they follow you.
          </p>

          <h2>Rate-and-term vs. cash-out buyout</h2>
          <p>
            If the decree awards equity to the departing spouse, the refinance has to produce that cash. Some loan programs treat a decree-ordered equity buyout as a rate-and-term refinance, which allows a higher loan-to-value and better pricing. Others classify any cash to a third party as cash-out, with a lower maximum loan and a higher rate. Bring the decree to the lender before applying so the program is chosen on purpose.
          </p>
          <ul>
            <li>
              <strong>Rate-and-term:</strong>
              {' '}
              new loan replaces the old balance plus closing costs, and in some programs the buyout named in the decree.
            </li>
            <li>
              <strong>Cash-out:</strong>
              {' '}
              new loan is larger than the payoff and the difference is wired to the departing spouse at closing.
            </li>
            <li>
              <strong>Streamline (FHA or VA):</strong>
              {' '}
              can remove a borrower with reduced documentation on some programs, but does not deliver buyout cash.
            </li>
          </ul>
          <p>
            The buyout number should come from a valuation both spouses accept, not a guess. The
            {' '}
            <Link href="/divorce-buyout-options" className="text-blue-600 underline hover:text-blue-700">buyout options page</Link>
            {' '}
            and the
            {' '}
            <Link href="/divorce-home-valuation" className="text-blue-600 underline hover:text-blue-700">valuation page</Link>
            {' '}
            explain how that number is set so the decree and the loan agree.
          </p>

          <h2>
            Jumbo refinance above
            {' '}
            {LUXURY_2026.jumboThreshold2026}
          </h2>
          <p>
            A loan above
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            is jumbo in Clark County in 2026, and jumbo underwriting is stricter on every line. The keeping spouse qualifies on their income alone with full documentation. The maximum loan-to-value is lower than a conforming loan. Lenders want reserves after closing, measured in months of principal, interest, taxes, insurance, and HOA dues. In Summerlin, Henderson, and the Strip high-rises this covers a large share of the homes that change hands in a divorce.
          </p>
          <ul>
            <li>Custom homes in The Ridges, MacDonald Highlands, or Southern Highlands Golf Club can draw two appraisals far apart. The lender uses the lower value, which caps the cash-out for the buyout.</li>
            <li>Reserves must be in the keeping spouse's name. Accounts still titled jointly may not count until the decree assigns them and they are retitled.</li>
            <li>Bonus, commission, and business income need a longer documented history for jumbo than for conforming loans.</li>
            <li>HOA dues and any special assessment are part of the qualifying payment. In a guard-gated community that line is not small.</li>
          </ul>

          <h2>Timeline and the decree deadline</h2>
          <p>
            A typical post-divorce refinance runs 30 to 45 days from a complete application to funding. Treat that as a typical range, not a promise. The appraisal, the decree's entry date, and any second appraisal on a jumbo loan are the usual reasons it stretches. The decree should name a refinance deadline and say what happens if the loan is not approved by that date, usually a listing.
          </p>
          <ol>
            <li>Before the decree: get a lender's pre-review of income, credit, and the likely value so the buyout and the deadline are realistic.</li>
            <li>At the decree: the refinance deadline, the buyout amount, and the sale fallback are written in.</li>
            <li>After entry: apply, order the appraisal, and record the deed at closing with the transfer tax exemption.</li>
            <li>At funding: the old loan is paid off and the departing spouse requests written confirmation that the account is closed.</li>
          </ol>

          <h2>Transfer tax, the deed, and closing</h2>
          <p>
            {NEVADA_LAW.transferTaxDivorceExemption}
            {' '}
            A sale would pay
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000 of value, or
            {' '}
            {NEVADA_LAW.transferTaxExample2M}
            . The decree transfer pays none of it under
            {' '}
            {NEVADA_LAW.transferTaxCite}
            . The deed is recorded with a Declaration of Value that cites the exemption, and the recorder may ask for the decree pages that award the house.
          </p>
          <p>
            The new lender will want the departing spouse off title before or at funding, so the quitclaim or interspousal transfer deed is usually signed in advance and recorded by the title company at closing. A deed signed before the decree is entered is not a transfer in compliance with a decree, so hold it until the order is filed.
          </p>
          <p className="text-sm text-gray-600">{LEGAL_DISCLAIMER}</p>
        </div>

        <HighValueHomeNote points={[
          `Above ${LUXURY_2026.jumboThreshold2026} the refinance is underwritten on the keeping spouse's income alone with full documentation and post-closing reserves. Get a jumbo lender's read before the decree sets the deadline.`,
          'Custom homes can draw appraisals far apart. A two-appraisal protocol, with the decree naming how the two values are reconciled, keeps the buyout and the loan amount from fighting each other.',
          'Lower maximum loan-to-value on jumbo loans means the cash-out may not cover the full buyout. The decree can allow a note secured by the house or a payment from other assets for the gap.',
          'Club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, and The Summit Club transfer under club rules, not with the deed. Confirm the fee and process before the decree assigns the membership.',
          `A decree transfer is exempt from transfer tax; a sale would pay ${NEVADA_LAW.transferTaxExample2M}. Confirm the exemption is on the Declaration of Value at closing.`,
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Who is keeping the home, what the current loan looks like, and whether a buyout is on the table.' },
            { title: 'Valuation and loan read', detail: 'A valuation both spouses can accept, plus a lender pre-review so the buyout number and the refinance amount match.' },
            { title: 'Decree language', detail: 'Refinance deadline, buyout amount, deed timing, and a sale fallback, drafted with your attorney.' },
            { title: 'Close', detail: 'Deed recorded with the exemption, old loan paid off, written confirmation to the departing spouse.' },
          ]}
          callPromise="You leave the call with a realistic loan amount, a deadline you can meet, and a fallback if you cannot."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
      <RealScoutCondoListings />
      <RealScoutFamilyHomes />
    </>
  );
}
