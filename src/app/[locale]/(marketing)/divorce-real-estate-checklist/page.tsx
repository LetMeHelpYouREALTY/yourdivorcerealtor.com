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
import { LEGAL_DISCLAIMER, LUXURY_2026, LVR_SEPT_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type IChecklistProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-real-estate-checklist';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Divorce Real Estate Checklist Las Vegas | Dr. Jan Duffy',
    description: 'Gather the deed, payoff letters, HOA resale package, appraisal, and decree in 4 numbered stages. A Nevada divorce real estate checklist for sale or buyout.',
    alternates: { canonical, languages },
  };
}

const faqs: PageFAQItem[] = [
  {
    question: 'What documents do I need before talking to a divorce real estate agent?',
    answer: 'Bring the recorded deed, the most recent statement for every loan on the property, the HOA name and account number, any prior appraisal, and whatever the court has filed so far: a petition, a joint preliminary injunction, a stipulation, or a decree. With those five items an agent can give you a value range and a realistic timeline on the first call.',
  },
  {
    question: 'Can one spouse list the house without the other?',
    answer: 'Not when both names are on title. The listing agreement needs both signatures or a court order giving one spouse authority to sell. Clark County\'s joint preliminary injunction, issued in most divorce cases, also bars either spouse from transferring community property without consent or an order. Get the authority settled before any marketing starts.',
  },
  {
    question: 'How long does the checklist take from start to closing?',
    answer: 'Gathering documents and agreeing on value usually takes two to four weeks. Preparation and photography take one to three weeks depending on repairs. In September 2026, 53.4% of Las Vegas single-family homes sold within 30 days of listing. Escrow then runs about 30 to 45 days with financing, or faster for cash.',
  },
  {
    question: 'What is an HOA resale package and why is it on the list?',
    answer: 'Nevada requires the seller to give the buyer a resale package from the association: CC&Rs, budget, reserve study, pending litigation, and any special assessment. The HOA has ten days to produce it, and guard-gated communities often take the full window. Ordering it the day you sign the listing keeps the buyer\'s cancellation period from stalling the sale.',
  },
  {
    question: 'Should we get an appraisal or a broker price opinion?',
    answer: 'A broker price opinion is faster and cheaper, and it is enough when both spouses agree to sell on the open market. An appraisal from a licensed appraiser is the stronger document for a buyout, a contested valuation, or a refinance. Custom homes above $1 million often warrant two appraisals.',
  },
];

export default async function RealEstateChecklist(props: IChecklistProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/divorce-real-estate-checklist';
  const articleSchema = generateArticleSchema(
    'Divorce Real Estate Checklist for Las Vegas',
    'A four-stage checklist of what to gather and decide for a marital home in a Nevada divorce: documents, valuation, sale or buyout, and closing.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Real Estate Checklist',
    'Numbered checklist of documents and decisions for a marital home in a Las Vegas divorce, covering sale and buyout paths.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, faqSchema, realEstateAgentSchema]} />
      <DivorcePageTemplate
        h1="Divorce Real Estate Checklist for Las Vegas"
        heroSubhead="What to gather, decide, and sign, in order"
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
        currentPath={currentPath}
      >
        <DirectAnswer question="What should I gather first for the house in a Nevada divorce?">
          Gather the recorded deed, a current statement and payoff letter for every loan, the HOA resale
          package, any appraisal, and the decree or stipulation if one exists. Then settle who has listing
          authority: both spouses sign, or the court orders the sale. With those in hand, valuation and the
          sale-or-buyout decision take weeks instead of months.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Homes sold within 30 days', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Available single-family listings', value: LVR_SEPT_2026.availableSfrListings },
            { label: '2026 jumbo loan line, Clark County', value: LUXURY_2026.jumboThreshold2026 },
          ]}
          source={LVR_SEPT_2026.source}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Stage 1: Documents to gather</h2>
          <p>
            Every path, sale or buyout, starts with the same paper. The deed shows who holds title and how.
            Loan statements show what must be paid off. The HOA resale package shows fees and assessments.
            A prior appraisal anchors value. The court file shows what you are allowed to do. Collect all
            of it before anyone talks about price.
          </p>
          <ol>
            <li>
              <strong>Recorded deed.</strong>
              {' '}
              Pull it from the Clark County Recorder. Confirm whether title is joint tenancy, community
              property, or in one name only.
            </li>
            <li>
              <strong>Mortgage statements and payoff letters.</strong>
              {' '}
              One for the first mortgage, one for any HELOC or second, and one for any solar or PACE lien.
            </li>
            <li>
              <strong>HOA resale package.</strong>
              {' '}
              CC&Rs, budget, reserve study, and special assessment notices. Order it early; the association
              has ten days to deliver.
            </li>
            <li>
              <strong>Appraisal or broker price opinion.</strong>
              {' '}
              Any report from the last two years, plus the original purchase closing statement for the
              cost basis.
            </li>
            <li>
              <strong>Decree, stipulation, or injunction.</strong>
              {' '}
              Whatever the court has filed. The joint preliminary injunction limits transfers until the
              case resolves.
            </li>
            <li>
              <strong>Listing authority.</strong>
              {' '}
              Both spouses' agreement to sell in writing, or the order giving one spouse authority.
            </li>
            <li>
              <strong>Insurance declarations and tax bill.</strong>
              {' '}
              Needed for prorations and for the buyer's lender.
            </li>
          </ol>
          <p>
            The
            {' '}
            <Link href="/divorce-real-estate-documents">documents page</Link>
            {' '}
            explains where each item comes from and what to check on it.
          </p>

          <h2>Stage 2: Value and equity</h2>
          <p>
            Value is the number both attorneys need before any option can be compared. A broker price
            opinion comes first and costs little. If a buyout or a contested hearing is likely, a licensed
            appraisal follows. Equity is value minus every payoff, and net equity subtracts the cost of a
            sale. Agree on which equity figure governs the buyout.
          </p>
          <ol start={8}>
            <li>Order a broker price opinion in writing, with the comparable sales attached.</li>
            <li>Order an appraisal if either attorney asks, or if one spouse plans to refinance.</li>
            <li>Compute gross equity and net equity with the payoff letters, not statement balances.</li>
            <li>Note any separate-property claim, such as a down payment from inheritance, with its records.</li>
            <li>Confirm the split formula with both attorneys before the next stage.</li>
          </ol>
          <p>
            The
            {' '}
            <Link href="/divorce-home-equity-calculator">equity calculator</Link>
            {' '}
            shows the math with a worked example at the Las Vegas median.
          </p>

          <h2>Stage 3A: If you sell</h2>
          <p>
            A sale needs both signatures on the listing agreement, an agreed price strategy, and a showing
            plan that works when one spouse still lives in the home. Repairs, staging, and photography come
            next. Offers are reviewed by both spouses, and the purchase contract must match the decree or
            stipulation on the split and on who signs.
          </p>
          <ol start={13}>
            <li>Both spouses, or the court, sign the listing agreement and the commission terms.</li>
            <li>Order the HOA resale package the same day.</li>
            <li>Agree on repairs and who pays, then on staging and photography dates.</li>
            <li>Set a showing protocol: notice period, lockbox or escorted, and gate access list if guarded.</li>
            <li>Review every offer with both spouses; counter in writing with both approvals.</li>
            <li>Deliver the decree or stipulation to escrow and confirm the disbursement split.</li>
            <li>Complete inspection and appraisal, then sign closing documents and separate wiring instructions.</li>
          </ol>
          <p>
            The
            {' '}
            <Link href="/divorce-home-sale-checklist">home sale checklist</Link>
            {' '}
            breaks this stage into eight phases.
          </p>

          <h2>Stage 3B: If one spouse keeps the home</h2>
          <p>
            A buyout turns on one question: can the keeping spouse qualify for the loan alone? Get a
            lender's answer before agreeing on a number. Then the refinance pays off the existing loan and
            funds the cash-out to the departing spouse, who signs a deed releasing their interest. The
            transfer under the decree is exempt from Clark County transfer tax.
          </p>
          <ol start={20}>
            <li>Get a written pre-approval for the refinance in the keeping spouse's name only.</li>
            <li>Agree on the buyout figure and whether it uses gross or net equity.</li>
            <li>Close the refinance; the departing spouse signs an interspousal or quitclaim deed at the same table.</li>
            <li>Record the deed with the transfer tax exemption noted on the declaration of value.</li>
            <li>Confirm the old loan shows paid in full and the departing spouse is off the credit obligation.</li>
          </ol>
          <p>
            {NEVADA_LAW.transferTaxDivorceExemption}
            {' '}
            Source:
            {' '}
            <a href={NEVADA_LAW.transferTaxUrl} rel="noopener noreferrer" target="_blank">{NEVADA_LAW.transferTaxCite}</a>
            .
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Stage 4: After closing</h2>
          <p>
            Closing is not the last step. Keep the settlement statement for the tax return, confirm the
            lien releases recorded, and update insurance and utilities. If the home sold, check that each
            spouse's wire matched the decree. If one spouse kept it, confirm the old lender reported the
            loan closed on both credit files.
          </p>
          <ol start={25}>
            <li>File the final settlement statement and the deed with your attorney and your tax preparer.</li>
            <li>Verify the reconveyance of the old loan recorded with the county.</li>
            <li>Cancel or transfer insurance, utilities, and HOA autopay.</li>
            <li>Note the Section 121 exclusion and the sale date for the tax year.</li>
          </ol>
        </div>

        <HighValueHomeNote points={[
          `Loans above ${LUXURY_2026.jumboThreshold2026} are jumbo. Add a lender pre-approval to Stage 2 before anyone agrees to a buyout number, because jumbo underwriting takes longer and asks for more.`,
          'Add a second appraisal to Stage 2 for custom homes, golf frontage, or Strip-view lots. Averaging two reports is the standard way to settle a wide spread.',
          'Add club membership paperwork to Stage 1. Red Rock Country Club, DragonRidge, Anthem Country Club, and Summit Club memberships transfer under their own rules and fees.',
          'Add the guard gate access list to Stage 3A. Showings in The Ridges, MacDonald Highlands, or Southern Highlands need names at the gate, and a listing agent who manages that list.',
          `Add the transfer tax line to Stage 2: ${NEVADA_LAW.transferTaxExample2M}, exempt on the decree transfer but not on a sale.`,
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Fifteen minutes to see which stage you are in and what is missing from the document list.' },
            { title: 'Document review', detail: 'Deed, payoffs, HOA, and court filings checked together so nothing surprises escrow.' },
            { title: 'Written valuation', detail: 'A broker price opinion both attorneys can use, with an appraisal referral if the case needs it.' },
            { title: 'Path and timeline', detail: 'Sale or buyout chosen with dates attached, and the paperwork routed to both sides.' },
          ]}
          callPromise="You leave the call knowing which stage you are in and what to gather next."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
