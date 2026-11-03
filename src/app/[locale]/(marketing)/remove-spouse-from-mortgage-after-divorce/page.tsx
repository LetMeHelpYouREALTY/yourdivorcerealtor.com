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

const path = '/remove-spouse-from-mortgage-after-divorce';
const pageTitle = 'Remove Spouse From Mortgage After Divorce';
const pageDescription = 'Only 3 things remove a spouse from a mortgage after a Nevada divorce: refinance, assumption with a release, or sale. See how each works and the decree language.';

const faqs = [
  {
    question: 'Can my spouse be removed from the mortgage without refinancing?',
    answer: 'Only two ways. The lender can approve an assumption and issue a written release of liability, which is common on FHA, VA, and USDA loans and rare on conventional loans. Or the house sells and the loan is paid off. A quitclaim deed, a decree, or a notarized agreement between the two of you does not change the loan.',
  },
  {
    question: 'Does a quitclaim deed remove my spouse from the mortgage?',
    answer: 'No. A quitclaim deed changes title at the Clark County Recorder. The promissory note and deed of trust stay with the lender, with both names, until the loan is refinanced, assumed with a release, or paid off. The departing spouse stays liable for every payment in between, and their credit shows the loan.',
  },
  {
    question: 'What does the keeping spouse need to qualify alone?',
    answer: 'Enough documented income to carry the new payment plus other debts, a credit file the program accepts, and an appraised value that supports the loan amount. Court-ordered support counts when it is in a filed order, arriving on schedule, and expected to continue well past closing. Above the jumbo line, reserves after closing are required too.',
  },
  {
    question: 'How long does it take to remove a spouse from the mortgage?',
    answer: 'A refinance typically runs 30 to 45 days from a complete application to funding, as a typical range rather than a promise. An assumption often takes longer because servicers process them slowly. A sale depends on the market plus escrow; in September 2026 most Las Vegas single-family homes sold within 30 days on market, then a 30 to 45 day financed escrow.',
  },
  {
    question: 'What should the decree say about the mortgage?',
    answer: 'Name who keeps the house, the buyout amount and how it was set, a refinance or assumption deadline, who pays the mortgage and HOA until then, and what happens if the loan is not approved by the deadline, usually a listing at a price set by a named method. Also say when the quitclaim deed is signed and recorded.',
  },
  {
    question: 'Is there transfer tax when title moves to one spouse?',
    answer: `${NEVADA_LAW.transferTaxDivorceExemption} The deed is recorded with a Declaration of Value citing ${NEVADA_LAW.transferTaxCite}. A sale pays ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of value instead. ${LEGAL_DISCLAIMER}`,
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

export default async function RemoveSpouseFromMortgageAfterDivorce(props: PageProps) {
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
    'Post-Divorce Mortgage Release Guidance',
    pageDescription,
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqSchema]} />
      <DivorcePageTemplate
        h1="Remove Your Spouse From the Mortgage After Divorce"
        heroSubhead="Refinance, assumption, or sale: the only three ways"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How do I remove my spouse from the mortgage after divorce?">
          Three ways, and only three: refinance the loan into your name alone, have the lender approve an assumption and issue a written release of liability, or sell the house and pay the loan off. A quitclaim deed moves title, not the debt. Until one of those three happens, your former spouse stays liable and the loan stays on their credit. Above
          {' '}
          {LUXURY_2026.jumboThreshold2026}
          {' '}
          the refinance is jumbo and underwritten on your income alone with reserves.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: '2026 jumbo loan line, Clark County', value: LUXURY_2026.jumboThreshold2026 },
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Homes sold within 30 days, Sept 2026', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Clark County transfer tax per $1,000 (sale)', value: NEVADA_LAW.transferTaxClarkPer1000 },
          ]}
          source={`${LUXURY_2026.jumboSource}; ${LVR_SEPT_2026.source}; ${NEVADA_LAW.transferTaxCite}`}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Why the mortgage outlives the decree</h2>
          <p>
            The decree divides property between two spouses. The mortgage is a contract with a lender who was not in the courtroom. When the decree awards the house to one spouse, the lender still holds a note signed by two borrowers and will collect from either one. The departing spouse stays liable until the loan is refinanced, assumed with a release, or paid off at sale. Nothing in family court changes that.
          </p>
          <p>
            The cost of leaving it alone is real. The departing spouse carries the payment in their debt-to-income ratio when they try to buy or rent. Any late payment posts to both files. And if the keeping spouse stops paying, the lender forecloses on a house the other spouse no longer owns but still owes on.
          </p>

          <h2>Deed vs. mortgage: two documents, two jobs</h2>
          <p>
            A quitclaim deed transfers one spouse's ownership interest to the other and is recorded with the Clark County Recorder. It changes title. The promissory note and deed of trust are the loan, and only the lender can change who owes it. Signing a quitclaim without refinancing leaves the departing spouse in the worst position: no ownership, full liability.
          </p>
          <ul>
            <li>
              <strong>Quitclaim or interspousal deed:</strong>
              {' '}
              changes ownership. Recorded with a Declaration of Value. Exempt from transfer tax when made under the decree.
            </li>
            <li>
              <strong>Note and deed of trust:</strong>
              {' '}
              the debt and the lender's lien. Changed only by refinance, assumption with release, or payoff.
            </li>
          </ul>
          <p>
            The
            {' '}
            <Link href="/quitclaim-deed-divorce" className="text-blue-600 underline hover:text-blue-700">quitclaim deed guide</Link>
            {' '}
            covers when to sign the deed and how it is recorded. Most lenders want it recorded at or before the refinance closing.
          </p>

          <h2>Option 1: Refinance in your name alone</h2>
          <p>
            The keeping spouse applies for a new loan that pays off the joint mortgage. The lender underwrites one income, one credit file, and a fresh appraisal. If the decree awards equity to the departing spouse, the new loan can include cash out to pay it. When the new loan funds, the old one is closed and the departing spouse's liability ends that day.
          </p>
          <h3>What the lender looks at</h3>
          <ul>
            <li>Income in your name: wages, self-employment, rental income, and court-ordered support that is documented, being received, and expected to continue.</li>
            <li>Debts the decree assigns to you, plus support you pay out, against the new payment including taxes, insurance, and HOA dues.</li>
            <li>The appraised value against the loan amount. A buyout that pushes the loan-to-value too high may be reclassified as cash-out or declined.</li>
            <li>The entered decree. Lenders will not close on a draft.</li>
          </ul>
          <h3>Jumbo loans</h3>
          <p>
            Above
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            the loan is jumbo in Clark County in 2026. It is underwritten on the keeping spouse's income alone with full documentation, a lower maximum loan-to-value, and reserves after closing measured in months of the full housing payment. The
            {' '}
            <Link href="/refinancing-after-divorce" className="text-blue-600 underline hover:text-blue-700">refinancing page</Link>
            {' '}
            goes deeper on jumbo and on cash-out vs. rate-and-term.
          </p>

          <h2>Option 2: Assumption with a release of liability</h2>
          <p>
            An assumption keeps the existing loan and its rate while the lender re-qualifies the keeping spouse and, if approved, issues a written release that removes the departing borrower. FHA, VA, and USDA loans generally allow it. Most conventional loans do not, although servicers sometimes process a release of liability on a conventional loan after a divorce when the remaining borrower qualifies.
          </p>
          <p>
            Two cautions. An assumption delivers no buyout cash, so any equity owed to the departing spouse has to come from somewhere else. And the release letter is the whole point: an assumption that leaves both names on the note, or a servicer who approves the assumption but never issues the release, has removed no one. Ask for the letter in writing and keep it with the decree.
          </p>

          <h2>Option 3: Sell and pay the loan off</h2>
          <p>
            When the keeping spouse cannot qualify, or neither spouse wants the house, a sale ends the loan for both. Escrow wires the payoff, the deed of trust is reconveyed, and net proceeds split per the decree. In September 2026,
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of Las Vegas single-family sales closed within 30 days on market. A financed escrow typically adds 30 to 45 days; a cash escrow 10 to 21 days. Those are typical ranges.
          </p>
          <p>
            The decree should make the sale automatic if the refinance deadline passes. Name the listing date, how the price is set, and who signs. That keeps a missed deadline from turning into a second court hearing. The
            {' '}
            <Link href="/how-to-sell-house-during-divorce" className="text-blue-600 underline hover:text-blue-700">sale guide</Link>
            {' '}
            covers the listing itself.
          </p>

          <h2>Timeline, the decree, and transfer tax</h2>
          <p>
            A refinance typically runs 30 to 45 days from complete application to funding. An assumption often takes longer. A sale runs market time plus escrow. Each is a typical range, not a promise. Write the chosen path and its deadline into the decree, along with who pays the mortgage, insurance, and HOA dues until it closes, and what happens if the deadline passes.
          </p>
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
            , claimed on the Declaration of Value when the deed is recorded. Record the deed after the decree is entered, not before, so the exemption applies.
          </p>
          <p className="text-sm text-gray-600">{LEGAL_DISCLAIMER}</p>
        </div>

        <HighValueHomeNote points={[
          `A refinance above ${LUXURY_2026.jumboThreshold2026} is underwritten on the keeping spouse's income alone, with full documentation and post-closing reserves. Get a jumbo lender's read before the decree sets a deadline.`,
          'Custom homes in The Ridges, MacDonald Highlands, or Anthem Country Club can draw appraisals far apart. A two-appraisal protocol keeps the buyout and the loan amount consistent.',
          'A jumbo cash-out may not cover the full buyout at the allowed loan-to-value. The decree can bridge the gap with a note secured by the house or a payment from other assets.',
          'Club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, and The Summit Club transfer under club rules, not the deed. Settle the transfer fee and process in the decree.',
          `A decree transfer is exempt from transfer tax; a sale would pay ${NEVADA_LAW.transferTaxExample2M}. Make sure the exemption is on the Declaration of Value.`,
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Which spouse keeps the house, what the loan is, and whether a buyout is owed.' },
            { title: 'Valuation and lender read', detail: 'A value both spouses accept and a lender pre-review of the keeping spouse so the path is chosen on facts.' },
            { title: 'Decree language', detail: 'Refinance or assumption deadline, buyout amount, deed timing, and the sale fallback, drafted with your attorney.' },
            { title: 'Close and confirm', detail: 'Loan refinanced, assumed with a release letter, or paid off at sale. Deed recorded with the exemption.' },
          ]}
          callPromise="You leave the call knowing which of the three exits is realistic, by when, and what to put in the decree."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
