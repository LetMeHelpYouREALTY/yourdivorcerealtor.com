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

type IBuyingProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/buying-home-after-divorce';
const pageTitle = 'Buying a Home After Divorce in Las Vegas';
const pageDescription = 'Qualify on one income, count support correctly, and time the purchase after the decree. Las Vegas single-family median was $470,000 in September 2026.';

const faqs = [
  {
    question: 'Can I buy a house before my divorce is final in Nevada?',
    answer: `You can, but a home bought before the decree is entered is presumed community property in Nevada, and your spouse may have a claim to it. Lenders also struggle to count support income or exclude joint debts without an entered decree. Most buyers wait for the decree or a signed, court-approved settlement that addresses the purchase. ${LEGAL_DISCLAIMER}`,
  },
  {
    question: 'Does alimony or child support count as income for a mortgage?',
    answer: 'Yes, when it is ordered in a filed decree or court order, you can show it arriving on schedule in bank statements, and it is expected to continue well past closing. Support you pay to your former spouse counts as a monthly debt. Lenders want the court document and the deposit history, so keep both organized from the first payment.',
  },
  {
    question: 'How do I get the old mortgage out of my debt-to-income ratio?',
    answer: 'Three ways: the loan is refinanced into your former spouse\'s name, the house sells and the loan is paid off, or the decree assigns the payment to your former spouse and you can show a history of them paying it from their own account. A quitclaim deed alone does not do it, because the loan stays in both names until it is refinanced or paid off.',
  },
  {
    question: 'Can I use my share of the home sale or buyout as a down payment?',
    answer: 'Yes. Proceeds from the sale, the buyout paid by your former spouse, or assets awarded in the decree are all acceptable down payment sources. Lenders trace large deposits, so keep the closing statement, the decree pages that award the funds, and the wire confirmation. Retirement assets split under a qualified order have their own paperwork and timing.',
  },
  {
    question: 'Does Nevada having no state income tax change what I can afford?',
    answer: `${NEVADA_LAW.noStateIncomeTax} Lenders qualify you on gross income, so the ratio does not change, but your take-home pay does. Someone moving to Las Vegas from a state with an income tax keeps more of each paycheck, which matters when one income now covers the whole household. ${LEGAL_DISCLAIMER}`,
  },
  {
    question: 'What if I need a jumbo loan after the divorce?',
    answer: `A purchase loan above ${LUXURY_2026.jumboThreshold2026} in Clark County is jumbo in 2026. It is underwritten on your income alone with full documentation and reserves after closing measured in months of the full housing payment. Support income faces closer review, and assets awarded in the decree count as reserves once they are retitled in your name.`,
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

export default async function BuyingAfterDivorce(props: IBuyingProps) {
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
    'Post-Divorce Home Buying Representation',
    pageDescription,
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqSchema]} />
      <DivorcePageTemplate
        h1={pageTitle}
        heroSubhead="Qualifying on your own, and when to start"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="Can I buy a home after divorce in Las Vegas?">
          Yes, once three things line up: the decree is entered, the old joint mortgage is refinanced, paid off, or documented as your former spouse's payment, and your income on its own carries the new loan. Court-ordered support counts when it is documented and continuing. Your share of the sale or buyout can fund the down payment. Nevada has no state income tax, which helps one income cover the household.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Single-family listings available, Sept 2026', value: LVR_SEPT_2026.availableSfrListings },
            { label: '2026 jumbo loan line, Clark County', value: LUXURY_2026.jumboThreshold2026 },
          ]}
          source={`${LVR_SEPT_2026.source}; ${LUXURY_2026.jumboSource}`}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>When to buy: before or after the decree</h2>
          <p>
            After, in almost every case. A home bought while the divorce is pending is presumed community property in Nevada, so your spouse may hold a claim to it unless a court-approved agreement says otherwise. Lenders also need the entered decree to count support income, exclude debts assigned to your former spouse, and confirm the buyout or proceeds you plan to use. The decree is the document that unlocks the purchase.
          </p>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            (
            {NEVADA_LAW.communityPropertyCite}
            ). That rule is why a purchase during the case needs your attorney's sign-off and usually a written agreement that the new home is your separate property. If you must move before the decree, renting for the gap is often cheaper than litigating title to a house bought too early.
          </p>
          <p className="text-sm text-gray-600">{LEGAL_DISCLAIMER}</p>

          <h2>Qualifying with support income</h2>
          <p>
            Alimony and child support can count as qualifying income when three things are true: the support is ordered in a filed decree or court order, you can show it arriving on schedule in your bank statements, and it is expected to continue well beyond closing. Lenders want the court document and the deposit history. Support you pay counts against you as a monthly debt, so the same decree can help one spouse and limit the other.
          </p>
          <ul>
            <li>Keep support deposits in one account and do not mix them with transfers from family or friends.</li>
            <li>A temporary order is weaker than a final decree. Some lenders will issue a conditional approval and wait for entry.</li>
            <li>Support with a short remaining term may be excluded. Lenders look at the continuation period, not just the amount.</li>
            <li>Wages, self-employment income, and rental income from a property awarded to you all count on the usual documentation.</li>
          </ul>

          <h2>Getting the old mortgage off your ratio</h2>
          <p>
            If your name is still on the marital home's loan, the lender counts that payment against you until it is gone. The loan leaves your file when it is refinanced into your former spouse's name, paid off at a sale, or, for many programs, when the decree assigns the payment to your former spouse and you can show a history of them paying it from their own account. A quitclaim deed alone changes title, not the loan.
          </p>
          <p>
            Set that sequence in the decree: a refinance deadline for the keeping spouse, a sale fallback, and the payment history you will need. The
            {' '}
            <Link href="/remove-spouse-from-mortgage-after-divorce" className="text-blue-600 underline hover:text-blue-700">mortgage removal page</Link>
            {' '}
            explains each path. Buyers who skip this step find out at underwriting that two housing payments do not fit one income.
          </p>

          <h2>Down payment from the settlement</h2>
          <p>
            Your share of the sale proceeds, the buyout your former spouse paid, or assets the decree awarded can all fund the down payment. Lenders trace every large deposit, so keep the escrow closing statement, the decree pages that award the funds, and the wire confirmation together. Funds that landed within the last few months get the most questions, and the paperwork answers them.
          </p>
          <ul>
            <li>
              <strong>Sale proceeds:</strong>
              {' '}
              the final settlement statement from escrow is the source document.
            </li>
            <li>
              <strong>Buyout cash:</strong>
              {' '}
              the decree sets the amount; the refinance closing statement or wire receipt shows the transfer.
            </li>
            <li>
              <strong>Retirement assets:</strong>
              {' '}
              split under a qualified domestic relations order, with their own timing and possible tax on withdrawal.
            </li>
            <li>
              <strong>Gift funds:</strong>
              {' '}
              allowed on many programs with a gift letter, but not from your former spouse unless the decree calls it a buyout.
            </li>
          </ul>
          <p className="text-sm text-gray-600">{LEGAL_DISCLAIMER}</p>

          <h2>Nevada's no state income tax and your budget</h2>
          <p>
            {NEVADA_LAW.noStateIncomeTax}
            {' '}
            Lenders qualify you on gross income, so the ratio math is the same as anywhere. Your take-home pay is not. A buyer relocating to Las Vegas from a state that taxes income keeps more of each paycheck, and a single income covering a whole household feels that difference every month. Property tax and HOA dues are the lines to watch instead; both are part of the qualifying payment.
          </p>
          <p>
            The Las Vegas single-family median was
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            {' '}
            in September 2026, with
            {' '}
            {LVR_SEPT_2026.availableSfrListings}
            {' '}
            single-family listings available. A purchase above
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            is a jumbo loan, underwritten on your income alone with reserves after closing.
          </p>
          <p className="text-sm text-gray-600">{LEGAL_DISCLAIMER}</p>

          <h2>Choosing the home on your own terms</h2>
          <p>
            Compare homes on the facts that change your monthly life: square footage and layout, lot size, HOA dues and what they cover, gate staffing, commute to work, and the price band the lender approved. Many buyers after a divorce move from a large home to a townhome or high-rise condo with lower upkeep; others want a yard and a home office. Both are normal, and the search should start from your list, not a template.
          </p>
          <ul>
            <li>Townhomes and condos in Summerlin, Henderson, and the Strip high-rises carry HOA dues that cover exterior upkeep and sometimes utilities. Read the budget before the offer.</li>
            <li>Single-family homes in guard-gated communities add gate staffing to the dues. Ask what the gate does and does not do.</li>
            <li>Commute, drive time to the airport, and distance from the old neighborhood all count. Decide which matters more before touring.</li>
            <li>Pre-approval first, then the search. A written approval with the decree already reviewed makes the offer stronger and the escrow shorter.</li>
            <li>Once under contract, a financed escrow typically runs 30 to 45 days and a cash escrow 10 to 21 days. Those are typical ranges. Line up movers and the lease end date around the closing date, not the offer date.</li>
          </ul>
        </div>

        <HighValueHomeNote points={[
          `A purchase loan above ${LUXURY_2026.jumboThreshold2026} is jumbo: underwritten on your income alone, full documentation, and reserves after closing measured in months of the full housing payment.`,
          'Assets awarded in the decree count as reserves once retitled in your name. A brokerage account still in both names may not count until the transfer is done.',
          'Custom homes in The Ridges, MacDonald Highlands, or Southern Highlands Golf Club can appraise below contract. Negotiate an appraisal gap plan before you write the offer.',
          'Club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, and The Summit Club are separate purchases with their own fees and approval. Budget them outside the mortgage.',
          'At the top of the market many competing buyers pay cash. A jumbo pre-approval with reserves already verified is the closest a financed offer gets to competing with them.',
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Where the decree stands, what income and assets you have on your own, and whether your name is still on the old loan.' },
            { title: 'Lender review with the decree', detail: 'A pre-approval that already accounts for support, assigned debts, and the down payment source.' },
            { title: 'Search by your list', detail: 'Square footage, HOA, commute, gate staffing, and price band. Showings on your schedule.' },
            { title: 'Offer and close', detail: 'Terms matched to your approval, escrow run to the calendar, keys in your name only.' },
          ]}
          callPromise="You leave the call knowing what you can buy, when you can buy it, and what paperwork gets you there."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
      <RealScoutCondoListings />
      <RealScoutFamilyHomes />
    </>
  );
}
