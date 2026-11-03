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
import { CONTENT_LAST_UPDATED, toSchemaDateTime } from '@/lib/content-dates';
import { LEGAL_DISCLAIMER, LUXURY_2026, LVR_SEPT_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type IMortgageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-and-mortgage';
const pageTitle = 'Divorce and Your Mortgage in Las Vegas';
const pageDescription = 'Both spouses stay liable on a joint mortgage until it is refinanced, assumed, or paid off at sale. Learn the 3 exits, the jumbo line, and transfer tax.';

const faqs = [
  {
    question: 'Does a quitclaim deed take me off the mortgage?',
    answer: 'No. A quitclaim deed transfers your ownership interest to your former spouse and is recorded with the Clark County Recorder. The promissory note and deed of trust are separate contracts with the lender, and both names stay on them until the loan is refinanced, assumed with a written release, or paid off at sale.',
  },
  {
    question: 'How long does the departing spouse stay liable after the decree?',
    answer: 'Until the loan is gone. A Nevada decree binds the two spouses, not the lender, so the departing borrower remains responsible for every payment and every late mark until a refinance, an approved assumption with a release of liability, or a sale pays the loan off. A decree deadline for the refinance keeps that window short.',
  },
  {
    question: 'Can my ex keep paying the joint loan instead of refinancing?',
    answer: 'The lender will accept the payments, but you remain a borrower. Late payments post to your credit, the balance counts against your debt-to-income ratio when you apply for your own loan, and your name on title exposes the house to your creditors. Most decrees set a refinance deadline with a sale as the fallback for this reason.',
  },
  {
    question: 'What is a release of liability on a mortgage?',
    answer: 'It is the lender\'s written agreement to drop one borrower from the note, usually after the remaining borrower qualifies on their own through an assumption. FHA, VA, and USDA loans are commonly assumable; most conventional loans are not. Without the release letter in hand, the departing spouse is still on the loan no matter what the decree says.',
  },
  {
    question: 'Do we pay transfer tax when the house goes to one spouse?',
    answer: `${NEVADA_LAW.transferTaxDivorceExemption} Clark County charges ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 on a sale, so the exemption matters on any home and especially above $1 million. The deed is recorded with a Declaration of Value that cites ${NEVADA_LAW.transferTaxCite}. ${LEGAL_DISCLAIMER}`,
  },
  {
    question: 'What if neither of us can refinance the house alone?',
    answer: `Then the home usually sells. In September 2026, ${LVR_SEPT_2026.soldWithin30DaysPct} of Las Vegas single-family sales closed within 30 days on market, so a correctly priced listing can resolve the loan within a typical 30 to 45 day financed escrow, or faster with a cash buyer. The decree should name that fallback and a date so one stalled application does not freeze both of you.`,
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

export default async function DivorceAndMortgage(props: IMortgageProps) {
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
    'Divorce Mortgage Guidance',
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
        heroSubhead="Title, liability, and the three ways out of a joint loan"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="What happens to the mortgage in a Nevada divorce?">
          The loan does not change because you divorce. Both borrowers stay liable to the lender until the balance is paid off at sale, refinanced into one name, or formally assumed with a written release. A decree that gives the house to one spouse binds the spouses, not the bank. A quitclaim deed moves title, not the debt. In Las Vegas the practical exits are a sale, a refinance, or an assumption, and each has its own timeline.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: '2026 jumbo loan line, Clark County', value: LUXURY_2026.jumboThreshold2026 },
            { label: 'Clark County transfer tax per $1,000', value: NEVADA_LAW.transferTaxClarkPer1000 },
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Homes sold within 30 days, Sept 2026', value: LVR_SEPT_2026.soldWithin30DaysPct },
          ]}
          source={`${LUXURY_2026.jumboSource}; ${NEVADA_LAW.transferTaxCite}; ${LVR_SEPT_2026.source}`}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Why both spouses stay on the loan after the decree</h2>
          <p>
            A divorce decree is an agreement between two spouses, enforced by a family court. The mortgage is a contract between two borrowers and a lender, and the lender never signed the decree. When the decree says one spouse takes the house and the payment, the other spouse is still a borrower until the loan is paid off, refinanced, or assumed. Missed payments post to both credit reports.
          </p>
          <p>
            That gap causes most post-divorce mortgage trouble in Clark County. The departing spouse moves, rents, and later applies for a loan of their own. The old mortgage still shows on their credit file, and underwriters count that payment against their debt-to-income ratio unless the decree and a year of payment records show the other spouse paying it.
          </p>
          <p>
            The keeping spouse carries a second risk. If the departing spouse files bankruptcy or a judgment creditor records a lien while that name is still on title, the house is exposed. Clearing both the deed and the loan closes the door.
          </p>

          <h2>Quitclaim deed vs. mortgage: title is not the loan</h2>
          <p>
            A quitclaim deed changes who owns the house. It does not change who owes the lender. In a Nevada divorce the departing spouse usually signs a quitclaim or interspousal transfer deed conveying their interest to the keeping spouse, and the deed is recorded with the Clark County Recorder. The promissory note and deed of trust stay exactly as they were, with both names on them.
          </p>
          <ul>
            <li>
              <strong>Deed:</strong>
              {' '}
              ownership. Recorded at the county. Changed by a quitclaim or grant deed.
            </li>
            <li>
              <strong>Note and deed of trust:</strong>
              {' '}
              the debt and the lender's lien. Changed only by payoff, refinance, or a lender-approved assumption.
            </li>
          </ul>
          <p>
            Most loans carry a due-on-sale clause. Federal law (the Garn-St Germain Act) bars a lender from calling the loan when title moves to a spouse under a divorce decree, so the quitclaim itself will not trigger a payoff demand. It simply releases no one. The
            {' '}
            <Link href="/quitclaim-deed-divorce" className="text-blue-600 underline hover:text-blue-700">quitclaim deed guide</Link>
            {' '}
            covers the recording steps.
          </p>
          <p className="text-sm text-gray-600">{LEGAL_DISCLAIMER}</p>

          <h2>Three exits: sell, refinance, or assume</h2>
          <p>
            There are three ways to get a name off a mortgage: sell the house and pay the loan off at closing, refinance into the keeping spouse's name alone, or have the lender approve an assumption that releases the departing borrower. Nothing else works. A decree, a quitclaim, a notarized side agreement, or years of on-time payments by one spouse do not release the other.
          </p>
          <h3>Sell</h3>
          <p>
            The cleanest exit. Escrow wires the payoff, the lien is reconveyed, and both spouses are done. Net proceeds split per the decree. In September 2026,
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of Las Vegas single-family sales closed within 30 days on market, so a correctly priced home usually finds its buyer fast. Financed escrows typically run 30 to 45 days; cash escrows 10 to 21 days. Those are typical ranges, not guarantees.
          </p>
          <h3>Refinance</h3>
          <p>
            The keeping spouse applies alone. The new loan pays off the old one and, if the decree calls for a buyout, can include cash out to pay the departing spouse. Underwriting uses one income, one credit file, and a fresh appraisal. The
            {' '}
            <Link href="/refinancing-after-divorce" className="text-blue-600 underline hover:text-blue-700">refinancing page</Link>
            {' '}
            walks through qualification.
          </p>
          <h3>Assume</h3>
          <p>
            FHA, VA, and USDA loans are generally assumable with lender approval. Most conventional loans are not. An assumption keeps the existing rate, which matters when the current loan was written below today's rates. The lender re-qualifies the keeping spouse and must issue a written release of liability for the other borrower. Without that letter, the departing spouse is still on the hook.
          </p>

          <h2>What changes above the jumbo line</h2>
          <p>
            Loans above
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            in Clark County are jumbo in 2026. A jumbo refinance to buy out a spouse is underwritten on the keeping spouse's income alone, with full documentation, a lower maximum loan-to-value than a conforming loan, and post-closing reserves measured in months of the full housing payment. Owners in The Ridges, MacDonald Highlands, or Red Rock Country Club should price this out before the decree fixes a refinance deadline.
          </p>
          <ul>
            <li>Support income counts only when it is ordered in writing, already being received, and expected to continue well past closing.</li>
            <li>Custom homes can draw appraisals far apart. A low value cuts the cash-out available for the buyout, so a two-appraisal protocol protects both spouses.</li>
            <li>Assets still titled jointly may not count as reserves until the decree assigns them and the accounts are retitled.</li>
            <li>At the top tier many buyers pay cash, so a sale can close in a short escrow when a jumbo refinance does not pencil.</li>
          </ul>

          <h2>Transfer tax, the decree, and the recorder</h2>
          <p>
            {NEVADA_LAW.transferTaxDivorceExemption}
            {' '}
            Clark County charges
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000 of value on a sale, which comes to
            {' '}
            {NEVADA_LAW.transferTaxExample2M}
            . A decree transfer between former spouses pays none of it under
            {' '}
            {NEVADA_LAW.transferTaxCite}
            .
          </p>
          <p>
            To claim the exemption, the deed is recorded with a Declaration of Value form citing the exemption and usually a copy of the decree or the pages that award the house. Timing matters: a deed signed before the decree is entered is not a transfer in compliance with a decree, and the recorder may ask for tax. Record after entry, or have your attorney hold the deed until the decree is filed.
          </p>
          <p className="text-sm text-gray-600">{LEGAL_DISCLAIMER}</p>

          <h2>Protecting your credit while the loan is still shared</h2>
          <p>
            Until the loan is paid off or refinanced, treat the mortgage as a shared account. Keep online access for both borrowers, set autopay from the account the decree assigns, and write a refinance deadline with a sale fallback into the decree so a stalled application becomes a listing rather than a standoff. Pull your own credit report after the first post-decree payment to confirm it posted on time.
          </p>
          <ul>
            <li>Ask the servicer for a payment history letter every quarter. Lenders accept it as proof the other spouse pays.</li>
            <li>Keep homeowner's insurance and HOA dues current. A lapse can trigger force-placed insurance billed to both borrowers.</li>
            <li>If a payment is missed, call the servicer the same week. A late mark that posts to both files is far harder to undo than a short delay.</li>
            <li>
              Review the
              {' '}
              <Link href="/divorce-buyout-options" className="text-blue-600 underline hover:text-blue-700">buyout options</Link>
              {' '}
              early so the refinance amount and the decree agree.
            </li>
          </ul>
        </div>

        <HighValueHomeNote points={[
          `A buyout refinance above ${LUXURY_2026.jumboThreshold2026} is underwritten on the keeping spouse's income alone, and jumbo lenders expect reserves after closing. Line up the loan before the decree sets a deadline.`,
          'Custom homes in The Ridges or MacDonald Highlands can draw appraisals far apart. A two-appraisal protocol protects both the buyout number and the refinance loan amount.',
          `A decree transfer is exempt from transfer tax. On a sale the tax is ${NEVADA_LAW.transferTaxExample2M}, so the exemption is worth confirming on the Declaration of Value.`,
          'Club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, and The Summit Club move under club rules, not the deed. Confirm transfer fees before the decree assigns the membership.',
          'At the top tier many buyers pay cash, so a sale can close in a 10 to 21 day escrow when a jumbo refinance does not pencil.',
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Fifteen minutes on who wants the house, what the loan looks like, and what the decree says or should say.' },
            { title: 'Loan and equity snapshot', detail: 'Current balance, rate, loan type, and a valuation so the buyout math and the refinance math use the same number.' },
            { title: 'Lender and attorney plan', detail: 'A refinance or assumption path with a date, and a sale fallback written into the decree.' },
            { title: 'Execute and close', detail: 'Deed recorded with the transfer tax exemption, loan refinanced or paid off, release letter in hand.' },
          ]}
          callPromise="You leave the call knowing which exit fits, what it costs, and what to ask your attorney for."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
