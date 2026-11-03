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
import { LEGAL_DISCLAIMER, LUXURY_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type IDocumentsProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-real-estate-documents';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Divorce Real Estate Documents Checklist | Dr. Jan Duffy',
    description: 'Gather the 12 documents a Nevada divorce home sale or buyout needs: deed, payoff letters, HOA resale package, appraisal, decree, and listing authority.',
    alternates: { canonical, languages },
  };
}

const faqs: PageFAQItem[] = [
  {
    question: 'Where do I get a copy of the deed to our house?',
    answer: 'From the Clark County Recorder, online or at the office on Grand Central Parkway. Search by name or parcel number and download the recorded deed for a small fee. The deed shows how title is held, which decides whether both signatures are needed on the listing agreement and the closing documents.',
  },
  {
    question: 'What is the difference between a mortgage statement and a payoff letter?',
    answer: 'A statement shows the principal balance on a given date. A payoff letter shows the exact amount needed to close the loan through a stated date, including accrued interest, fees, and any prepayment terms. Escrow and your attorney need the payoff letter; the statement is only a rough guide. Request one from each lender.',
  },
  {
    question: 'Do we need the HOA resale package before listing?',
    answer: 'Nevada requires the seller to deliver it to the buyer, and the buyer gets a review period after receipt. The association has ten days to produce it. Ordering it when the listing agreement is signed means the buyer\'s clock starts early and any special assessment surfaces before you price the home.',
  },
  {
    question: 'What gives one spouse authority to sell without the other?',
    answer: 'A court order. In Clark County most divorce filings trigger a joint preliminary injunction that stops either spouse from transferring community property alone. Absent an order, both spouses sign the listing agreement, the purchase contract, and the deed. A stipulation signed by both and filed with the court works the same way.',
  },
  {
    question: 'Which documents does the tax preparer need after the sale?',
    answer: 'The closing statement from the original purchase, receipts for capital improvements, and the final settlement statement from the sale. Together they establish the gain for the Section 121 exclusion, which shelters up to $250,000 per single filer or $500,000 for joint filers. Keep the decree too; it supports the divorce use rule.',
  },
];

export default async function RealEstateDocuments(props: IDocumentsProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/divorce-real-estate-documents';
  const articleSchema = generateArticleSchema(
    'Divorce Real Estate Documents Checklist',
    'The documents a Nevada divorce home sale or buyout needs, where each comes from, and what to check on it.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Real Estate Documents',
    'Checklist of property, loan, HOA, valuation, and court documents needed for a marital home in a Las Vegas divorce.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, faqSchema, realEstateAgentSchema]} />
      <DivorcePageTemplate
        h1="Divorce Real Estate Documents Checklist"
        heroSubhead="Twelve documents, where each comes from, and what to check on it"
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
        currentPath={currentPath}
      >
        <DirectAnswer question="What documents do I need for the house in a Nevada divorce?">
          Twelve items cover almost every case: the recorded deed, a statement and payoff letter for each
          loan, the HOA resale package, the property tax bill, insurance declarations, any appraisal, the
          original purchase closing statement, the decree or stipulation, and written listing authority from
          both spouses or the court. For a buyout, add the refinance approval and the interspousal deed.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Clark County transfer tax', value: `${NEVADA_LAW.transferTaxClarkPer1000} per $1,000` },
            { label: 'Transfer under a divorce decree', value: 'Exempt' },
            { label: 'Section 121 exclusion, single / joint', value: '$250,000 / $500,000' },
            { label: '2026 jumbo loan line, Clark County', value: LUXURY_2026.jumboThreshold2026 },
          ]}
          source={`${NEVADA_LAW.transferTaxCite}; ${NEVADA_LAW.capitalGainsCite}; ${LUXURY_2026.jumboSource}`}
          sourceUrl={NEVADA_LAW.transferTaxUrl}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Property and title documents</h2>
          <p>
            Title documents answer who owns the home and how. The recorded deed shows the vesting: joint
            tenancy, community property with right of survivorship, or one spouse alone. A preliminary
            title report, which any title company runs at no charge before a listing, shows every lien
            recorded against the parcel. Both are needed before anyone discusses a split.
          </p>
          <ol>
            <li>
              <strong>Recorded deed.</strong>
              {' '}
              Clark County Recorder, by name or parcel number. Check the vesting and whether any later
              deed changed it.
            </li>
            <li>
              <strong>Preliminary title report.</strong>
              {' '}
              From a title company. Lists mortgages, HELOCs, HOA liens, tax liens, judgments, and solar
              filings.
            </li>
            <li>
              <strong>Property tax bill.</strong>
              {' '}
              Clark County Treasurer. Shows the assessed value, the tax cap status, and any delinquency.
            </li>
            <li>
              <strong>Homeowners insurance declarations.</strong>
              {' '}
              Needed for prorations and for a buyout refinance.
            </li>
          </ol>

          <h2>Loan documents</h2>
          <p>
            Every loan secured by the home must be paid off at closing or refinanced in a buyout. The
            monthly statement is not enough; escrow needs a written payoff letter with per-diem interest
            through the closing date. Request one from each lender as soon as a sale or buyout is on the
            table, and refresh it if the closing date moves.
          </p>
          <ol start={5}>
            <li>
              <strong>Mortgage statements.</strong>
              {' '}
              Most recent statement for the first mortgage and any HELOC, second mortgage, or solar loan.
            </li>
            <li>
              <strong>Payoff letters.</strong>
              {' '}
              From each lender, good through a stated date. Confirm there is no prepayment penalty.
            </li>
            <li>
              <strong>Original purchase closing statement.</strong>
              {' '}
              Establishes the cost basis and documents any separate-property down payment.
            </li>
          </ol>

          <h2>HOA and community documents</h2>
          <p>
            Most Las Vegas homes sit inside an association, and Nevada requires the seller to give the
            buyer a resale package before the buyer's review period can start. The package includes the
            CC&Rs, current budget, reserve study, pending litigation, and any special assessment. Guard-gated
            communities often take the full ten days to produce it.
          </p>
          <ol start={8}>
            <li>
              <strong>HOA resale package.</strong>
              {' '}
              Ordered from the association or its management company the day the listing agreement is
              signed. Check for special assessments and transfer fees.
            </li>
            <li>
              <strong>Gate and amenity records.</strong>
              {' '}
              Transponders, access cards, and any club membership certificate, with the transfer rules.
            </li>
          </ol>

          <h2>Valuation documents</h2>
          <p>
            Value drives every decision, so the valuation document must be one both attorneys accept. A
            broker price opinion with comparable sales attached works for an agreed open-market sale. A
            licensed appraisal is stronger for a buyout, a refinance, or a contested hearing. Keep any
            appraisal from the last two years; it shows the trend even if it is stale.
          </p>
          <ol start={10}>
            <li>
              <strong>Broker price opinion or appraisal.</strong>
              {' '}
              Dated, signed, with comparables. Two appraisals for custom homes where the spread is wide.
            </li>
          </ol>
          <p>
            The
            {' '}
            <Link href="/divorce-home-equity-calculator">equity calculator</Link>
            {' '}
            shows how the valuation and the payoff letters combine.
          </p>

          <h2>Court and authority documents</h2>
          <p>
            The court file tells the agent, the title company, and the lender what the spouses are allowed
            to do. The joint preliminary injunction limits transfers while the case is open. A stipulation
            or decree states who sells, who signs, how proceeds split, and any deadline. Listing authority
            from both spouses, or an order, is required before marketing.
          </p>
          <ol start={11}>
            <li>
              <strong>Decree, stipulation, or injunction.</strong>
              {' '}
              Whatever is filed. Give a copy to the listing agent and the escrow officer at the start.
            </li>
            <li>
              <strong>Listing authority.</strong>
              {' '}
              Both spouses' signatures on the listing agreement, or the court order authorizing one spouse
              to sell.
            </li>
          </ol>
          <p>
            For a buyout, add the refinance approval in the keeping spouse's name and the interspousal or
            quitclaim deed with the declaration of value claiming the exemption.
            {' '}
            {NEVADA_LAW.transferTaxDivorceExemption}
            {' '}
            Source:
            {' '}
            <a href={NEVADA_LAW.transferTaxUrl} rel="noopener noreferrer" target="_blank">{NEVADA_LAW.transferTaxCite}</a>
            .
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Documents created during the sale</h2>
          <p>
            Once the home is listed, a second set of documents accumulates. Keep them in the same shared
            folder so both attorneys and the tax preparer have one source. The settlement statement and
            the purchase closing statement together establish the gain for the Section 121 exclusion.
          </p>
          <ul>
            <li>Listing agreement and addenda</li>
            <li>Nevada Seller's Real Property Disclosure</li>
            <li>Purchase contract, counters, and contingency releases</li>
            <li>Inspection report and repair agreement</li>
            <li>Escrow instructions with the disbursement split</li>
            <li>Final settlement statement and wire confirmations</li>
            <li>Recorded deed to the buyer and loan reconveyances</li>
          </ul>
          <p>
            The
            {' '}
            <Link href="/divorce-home-sale-checklist">home sale checklist</Link>
            {' '}
            shows when each of these is signed.
          </p>
        </div>

        <HighValueHomeNote points={[
          `A buyout above ${LUXURY_2026.jumboThreshold2026} is a jumbo refinance. Add two years of tax returns, asset statements, and the decree showing the support obligations to the document list before applying.`,
          'Custom homes need permits and receipts for major work. The appraiser will ask for them, and a two-appraisal protocol needs the same packet delivered to both appraisers.',
          'Club membership certificates for Red Rock Country Club, DragonRidge, Anthem Country Club, or The Summit Club are separate documents with their own transfer forms and fees. Gather them with the HOA package.',
          'Guard-gated communities require written gate authorization for the appraiser, inspector, and photographer. Keep the access list with the listing file.',
          `On a sale the transfer tax is ${NEVADA_LAW.transferTaxExample2M}; the decree transfer between spouses is exempt. The declaration of value filed with the deed is where the exemption is claimed.`,
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Fifteen minutes to find out which of the twelve documents you already have and which are missing.' },
            { title: 'Pull the records', detail: 'Deed, preliminary title report, and HOA package ordered on your behalf where the title company can do it.' },
            { title: 'Build the folder', detail: 'One shared file both attorneys and the escrow officer receive, organized in the order above.' },
            { title: 'Valuation', detail: 'A written broker price opinion added to the folder, with an appraisal referral if the case needs one.' },
          ]}
          callPromise="You leave the call with a list of what is missing and who is retrieving each item."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
