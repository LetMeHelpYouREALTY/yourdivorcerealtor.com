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

type IAttorneyResourcesProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/attorney-resources';

const faqs = [
  {
    question: 'Does Dr. Jan Duffy represent one spouse or both?',
    answer: 'Neither spouse individually. On a divorce listing she acts as a neutral listing agent for the community asset. Both owners sign the listing agreement, both receive the same information at the same time, and neither side gets private advice on strategy. Questions about leverage, timing of the decree, or offsets go back to counsel.',
  },
  {
    question: 'What goes in a written status report to counsel?',
    answer: 'A dated summary of showings, feedback, offers received with price and terms, any price-reduction recommendation with the comparable sales behind it, repair requests, and the escrow calendar. Each report goes to both attorneys and both clients in the same email. Nothing is said to one side that is not in the report.',
  },
  {
    question: 'How is the listing price set when the spouses disagree?',
    answer: 'The listing agreement names a method, not just a number. Common language sets the initial list price from a broker price opinion both sides have seen, and allows a reduction after a stated number of days or showings without a new signature. For custom homes above the jumbo line, two licensed appraisals averaged, or the court choosing between them, is the cleaner protocol.',
  },
  {
    question: 'Can the court order the home sold before the decree is final?',
    answer: 'Family court judges in Clark County regularly order interim sales when neither spouse can carry the mortgage alone. The order should name who signs the listing, who controls price and offers, where proceeds are held, and what each spouse must do for access and condition. A listing agent can work from that order without further motions.',
  },
  {
    question: 'How quickly can a referred client get a valuation?',
    answer: 'A broker price opinion with comparable sales usually takes three to five business days after a walk-through, and the same document goes to both counsel. A licensed appraisal is ordered separately and typically takes one to three weeks depending on the appraiser\'s calendar and whether the home is a custom build.',
  },
  {
    question: 'Is the real property transfer tax owed on a buyout deed?',
    answer: `No, when the deed is between former spouses under the decree. ${NEVADA_LAW.transferTaxDivorceExemption} Confirm the exemption code with the title officer when the deed is prepared. A sale to a third party owes the Clark County rate of ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000.`,
  },
];

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Attorney Referrals for Divorce Real Estate | Dr. Jan Duffy',
    description: 'How Las Vegas family law attorneys refer the marital home: neutral listing, written status reports to both counsel, and court-order compliance in 1 process.',
    alternates: { canonical, languages },
  };
}

export default async function AttorneyResources(props: IAttorneyResourcesProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = path;
  const description = 'How family law attorneys refer the marital home to a neutral listing agent: written status reports to both counsel, court-order compliance, and listing-authority language.';
  const articleSchema = generateArticleSchema(
    'Attorney Referrals for Divorce Real Estate in Las Vegas',
    description,
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Attorney Collaboration Services',
    description,
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        currentPath={currentPath}
        h1="Attorney Resources for Divorce Real Estate"
        heroSubhead="A neutral listing agent for the marital home, reporting to both counsel"
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="What does a family law attorney get when referring the marital home to Dr. Jan Duffy?">
          A neutral listing agent who takes instructions from the decree or stipulation, not from either spouse. Both counsel receive the same written status report after every showing week, every offer, and every price discussion. Pricing comes from documented comparable sales, and the listing agreement carries authority language that keeps the sale moving when one spouse stops responding.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Single-family homes sold, Sept 2026', value: LVR_SEPT_2026.sfrUnitsSold },
            { label: 'Sold within 30 days of listing', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Available single-family listings', value: LVR_SEPT_2026.availableSfrListings },
          ]}
          source={LVR_SEPT_2026.source}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>How neutrality works on a divorce listing</h2>
          <p>
            Neutrality means the agent represents the asset, not a spouse. Both owners sign the listing agreement, both get every showing report, offer, and counter at the same time, and neither gets a private phone call about what the other side might accept. Advice on leverage, timing, or offsets goes to counsel. The agent reports facts and market data only.
          </p>
          <p>
            In practice this means a few fixed habits. Every email about the property copies both clients and both attorneys. Showing feedback is forwarded unedited. When one spouse asks what the other is thinking, the answer is the same each time: that question belongs with your attorney. This protects the agent from a later claim of favoritism and protects your client from being surprised in court.
          </p>
          <p>
            The practice also stays out of the division itself. Whether proceeds split equally or one spouse receives an offset for separate-property contributions is a legal question. The agent supplies the numbers that question needs: list price, net sheet at several sale prices, and a closing statement that shows every disbursement.
          </p>

          <h2>Written status reports to both counsel</h2>
          <p>
            A written status report goes to both attorneys and both clients on a fixed schedule, usually weekly while the home is active and after every offer. It lists showings, buyer feedback, days on market against the comparable set, offers with price and terms, repair or credit requests, and the escrow calendar. Nothing is said to one side that is not in that report.
          </p>
          <p>
            Reports matter most when a case goes back before the judge at the Family Courts and Services Center on North Pecos Road. A dated record of showings and price recommendations lets counsel show the court that the listing was marketed in good faith, or that one spouse refused showings or declined a market-rate offer. The report format is consistent so it can be attached to a motion without reformatting.
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Showings and feedback for the period, with dates</li>
            <li>Offers received, with price, financing type, contingencies, and the response</li>
            <li>Price-reduction recommendations and the comparable sales supporting them</li>
            <li>Condition issues, access problems, or missed showings</li>
            <li>Escrow milestones once a contract is accepted</li>
          </ul>

          <h2>Court-order compliance and listing-authority language</h2>
          <p>
            A listing taken under a court order follows the order, not the spouses. The order or stipulation should name who signs the listing agreement, how the list price is set and reduced, who approves offers, who holds proceeds, and what happens when one spouse will not sign. When the order is silent, the agent asks counsel to fill the gap before listing rather than during escrow.
          </p>
          <p>
            Listing-authority language that has worked in Clark County cases covers four points. First, initial list price set from a stated valuation both sides have seen. Second, automatic reductions of a stated percentage after a stated number of days without a new signature. Third, an obligation to accept any offer at or above a stated floor, or a mechanism for the court to decide when the spouses split. Fourth, access terms: a lockbox, showing notice period, and a requirement that the occupying spouse keep the home show-ready.
          </p>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            (
            {NEVADA_LAW.communityPropertyCite}
            ). That rule is why the sale itself needs to be clean: the court divides what the closing statement shows. Proceeds are usually held in the title company's escrow or an attorney trust account until the decree or a stipulated order directs disbursement.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Broker price opinion or licensed appraisal</h2>
          <p>
            A broker price opinion is a real estate licensee's estimate of likely sale price, built from recent comparable sales and current competing listings. A licensed appraisal is an opinion of value prepared by a state-certified appraiser under USPAP and is what a lender, and usually a judge, will rely on. Use the opinion to set list price; use the appraisal to fix a buyout figure or to contest value.
          </p>
          <p>
            For a tract home in Summerlin or Henderson with a dozen model-match sales in the last six months, the two numbers usually land close together and a broker price opinion is enough to start. For a custom home in The Ridges or MacDonald Highlands, comparable sales may be months apart and vary widely in lot size, view corridor, and finish level. There, the appraisal spread between two qualified appraisers can run into six figures, and each side should expect to see both reports. See
            {' '}
            <Link href="/divorce-appraisal-services" className="text-blue-600 underline hover:text-blue-700">divorce appraisal services</Link>
            {' '}
            for the two-appraisal protocol.
          </p>

          <h2>The referral process</h2>
          <p>
            Most referrals start with a short call from counsel or a paralegal describing the property, the posture of the case, and any order already in place. The agent then schedules a walk-through with both spouses, or separately if contact is restricted, and delivers a written broker price opinion to both attorneys within a few business days.
          </p>
          <p>
            From there, counsel decides whether the valuation supports a buyout, a sale, or a deferred sale. If the home is to be listed, the agent sends a draft listing agreement with the authority language above for counsel to edit. Attorneys who work with the practice regularly keep that language in their stipulation templates. For mediated cases, the same materials go to the mediator; see
            {' '}
            <Link href="/divorce-mediator-resources" className="text-blue-600 underline hover:text-blue-700">mediator resources</Link>
            . For contested value, see
            {' '}
            <Link href="/divorce-real-estate-expert-witness" className="text-blue-600 underline hover:text-blue-700">expert witness services</Link>
            .
          </p>
        </div>

        <HighValueHomeNote
          title="Referrals involving homes above the jumbo line"
          points={[
            `A buyout refinance above ${LUXURY_2026.jumboThreshold2026} is a jumbo loan, so the keeping spouse's income, reserves, and post-decree support need to be documented before counsel builds a buyout around it.`,
            'Custom homes carry wider appraisal spread; write a two-appraisal protocol into the stipulation so the number is settled before the decree, not after.',
            'Club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, and The Summit Club transfer on their own rules and timelines, separate from the deed, and belong in the property schedule.',
            'Guard-gated communities require guest lists and advance notice for every showing; the listing agreement should name who approves access when one spouse controls the gate list.',
            `Clark County transfer tax of ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 means ${NEVADA_LAW.transferTaxExample2M}; the decree should say which side bears it on a third-party sale.`,
          ]}
        />

        <NextSteps
          title="How a referral works"
          steps={[
            { title: 'Attorney call', detail: 'A ten-minute call on the property, the posture of the case, and any order in place. No client contact until counsel authorizes it.' },
            { title: 'Walk-through and valuation', detail: 'Both spouses are offered the same walk-through. A written broker price opinion with comparable sales goes to both counsel.' },
            { title: 'Listing authority', detail: 'A draft listing agreement with price, reduction, offer, and access language for counsel to edit or attach to a stipulation.' },
            { title: 'Reporting', detail: 'Weekly written status reports to both attorneys and both clients until the closing statement is delivered.' },
          ]}
          callPromise="Counsel leaves the call with a valuation timeline and draft authority language."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
