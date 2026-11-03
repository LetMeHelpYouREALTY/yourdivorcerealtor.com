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
import { COMMUNITY_12MO, LEGAL_DISCLAIMER, LUXURY_2026, LVR_SEPT_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type IExpertWitnessProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-real-estate-expert-witness';

const faqs = [
  {
    question: 'What can a real estate licensee testify about that an appraiser cannot?',
    answer: 'Marketability: whether a list price was reasonable, whether the marketing was adequate, whether showings were obstructed, whether an offer was at market, and what a realistic sale timeline looks like for that property type. An appraiser testifies to value on a date. A licensee testifies to how the market actually behaved toward this listing.',
  },
  {
    question: 'Is a broker price opinion admissible as evidence of value?',
    answer: 'That is a question for counsel and the judge. In practice, a broker price opinion is used to frame list price and settlement, while a licensed appraisal is the usual evidence of value for a buyout or an unequal division. When the two are offered together, the opinion explains the market context and the appraisal fixes the number.',
  },
  {
    question: 'What does the engagement include?',
    answer: 'A written report with comparable sales, active competition, marketing history, and conclusions; a declaration if counsel requests one; deposition; and testimony at hearing or trial. Fees are quoted in advance as a flat report fee plus hourly for deposition and court time, and are paid by the retaining party or as the court allocates.',
  },
  {
    question: 'Can the expert be retained by one spouse after acting as the neutral listing agent?',
    answer: 'No. An agent who listed the home for both spouses stays neutral and can testify to facts in the file for either side, but does not become a retained advocate. A retained expert engagement is taken only when the practice had no prior role in the sale, so the opinion cannot be attacked as a shift in loyalty.',
  },
  {
    question: 'How far in advance does counsel need to engage?',
    answer: 'Thirty days before any disclosure deadline is comfortable. The report needs a walk-through if possible, MLS history for the subject and comparables, and the other side\'s appraisal or opinion if one exists. Rush engagements are possible when the home is a tract product with ample sales; custom homes need more time to assemble comparables.',
  },
];

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Divorce Real Estate Expert Witness Las Vegas | Dr. Jan Duffy',
    description: 'Written reports and testimony on market value, list price, and marketing conduct for Clark County family court, drawn from 1,745 monthly closings.',
    alternates: { canonical, languages },
  };
}

export default async function ExpertWitness(props: IExpertWitnessProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = path;
  const description = 'Written reports and testimony on market value, reasonable list price, and marketing conduct for contested divorce cases in Clark County family court.';
  const articleSchema = generateArticleSchema(
    'Divorce Real Estate Expert Witness Services in Las Vegas',
    description,
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Real Estate Expert Witness Services',
    description,
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Divorce Real Estate Expert Witness Services"
        heroSubhead="Written reports and testimony on value, list price, and marketing conduct"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="When does a divorce case need a real estate expert witness?">
          When the spouses dispute what the home is worth, whether a list price was reasonable, whether one spouse obstructed the sale, or whether an offer should have been accepted. A real estate licensee testifies to market behavior and marketing conduct from MLS history and comparable sales. A state-certified appraiser testifies to value on a date. Contested cases often need both.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Single-family homes sold, Sept 2026', value: LVR_SEPT_2026.sfrUnitsSold },
            { label: 'Sold within 30 days of listing', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'The Ridges median days on market, 12 months', value: COMMUNITY_12MO.theRidges.medianDom },
            { label: 'Red Rock Country Club median days on market', value: COMMUNITY_12MO.redRockCountryClub.medianDom },
          ]}
          source={`${LVR_SEPT_2026.source}; ${COMMUNITY_12MO.source}`}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>What a licensee can testify to</h2>
          <p>
            A real estate licensee testifies to how the market treated a property: whether the list price was within the range the comparable sales supported, whether the marketing was adequate, how days on market compared to the competing set, whether showings were refused, and whether an offer was at market. Those are marketing-conduct questions, and they decide motions to enforce a listing order.
          </p>
          <p>
            That testimony is built from MLS records. Listing history shows every price change and status change with a date. Showing logs show requests and cancellations. The comparable set shows what similar homes listed for, sold for, and how long they took. When one spouse claims the home was underpriced or that the other obstructed the sale, those records answer the question with dates rather than recollection.
          </p>
          <p>
            It is not appraisal testimony. A broker price opinion is a licensee's estimate of likely sale price. A licensed appraisal is an opinion of value under USPAP from a state-certified appraiser, and it is what a judge usually relies on to fix a buyout figure. Counsel decides which is needed; often it is both, with the licensee explaining the market and the appraiser fixing the number. See
            {' '}
            <Link href="/divorce-appraisal-services" className="text-blue-600 underline hover:text-blue-700">divorce appraisal services</Link>
            {' '}
            for how the two fit together.
          </p>

          <h2>Typical issues in contested cases</h2>
          <p>
            Most engagements come down to one of five disputes: the value used for a buyout, whether a list price was reasonable, whether one spouse's conduct delayed or killed the sale, whether a rejected offer was at market, and what the home would bring on a realistic timeline. Each has a documentary answer in the MLS record and the comparable sales.
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Buyout value.</strong>
              {' '}
              Comparable sales and adjustments supporting a range, and where each side's number sits within it.
            </li>
            <li>
              <strong>List price reasonableness.</strong>
              {' '}
              Whether the initial price and reductions tracked the competing set or sat above it.
            </li>
            <li>
              <strong>Obstruction.</strong>
              {' '}
              Showing requests refused, access denied, condition allowed to deteriorate, with dates.
            </li>
            <li>
              <strong>Rejected offers.</strong>
              {' '}
              Price and terms against closed sales in the same window, and what the home later sold for.
            </li>
            <li>
              <strong>Timeline.</strong>
              {' '}
              Days on market for the comparable set, so a deferred-sale or interim-sale order has a realistic date.
            </li>
          </ul>

          <h2>What the written report contains</h2>
          <p>
            The report states the question asked, the records reviewed, the comparable sales with adjustments, the subject's listing and showing history, and the conclusion. It is written so it can be read by a judge who has never seen the property and attached to a motion without reformatting. Every number ties to an MLS record or a public document counsel can produce.
          </p>
          <p>
            Reports are delivered to retaining counsel only. If the practice acted as the neutral listing agent in the same case, no retained report is prepared for either side; instead, the file's written status reports, listing agreement, and closing statement are produced to both counsel and the agent testifies to them as fact witness. That rule protects the record and the agent's neutrality.
          </p>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            (
            {NEVADA_LAW.communityPropertyCite}
            ). A written finding for unequal division often rests on conduct during the sale, which is where marketing-conduct testimony applies.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Custom homes and the two-appraisal protocol</h2>
          <p>
            Value disputes are widest on custom homes. In The Ridges, the twelve-month MLS range ran from
            {' '}
            {COMMUNITY_12MO.theRidges.lowSale}
            {' '}
            to
            {' '}
            {COMMUNITY_12MO.theRidges.highSale}
            {' '}
            across
            {' '}
            {COMMUNITY_12MO.theRidges.closings}
            {' '}
            closings, so the nearest comparable may differ from the subject by lot size, view corridor, and finish level worth hundreds of dollars per square foot. Two qualified appraisers can land six figures apart in good faith.
          </p>
          <p>
            The two-appraisal protocol handles that spread before trial. Each side retains a certified appraiser, reports are exchanged, and the stipulation says in advance whether the figures are averaged, a third appraiser breaks the tie, or the court chooses. A licensee's report then explains why the spread exists, which comparables each appraiser relied on, and how the market has moved since the effective dates.
          </p>

          <h2>Engagement, fees, and timing</h2>
          <p>
            Counsel engages the practice by letter stating the question, the deadline, and the records available. A flat fee covers the written report; deposition and court time are hourly and quoted in advance. Fees are paid by the retaining party or as the court allocates. A conflict check against both spouses, both counsel, and the property address runs before any records are reviewed.
          </p>
          <p>
            Records needed for the report are the subject's full MLS history, the showing log if the home was listed, both spouses' valuations or appraisals if any exist, the listing agreement and any order of sale, and photographs or inspection reports that bear on condition at the effective date. Counsel can request MLS history through the practice; the rest comes from the file.
          </p>
          <p>
            Thirty days before a disclosure deadline is a comfortable timeline for a tract home. Custom homes, Strip high-rises, and properties with partial MLS history take longer to assemble comparables. Testimony is available at the Family Courts and Services Center on North Pecos Road and by remote appearance when the court allows. Attorneys who work with the practice on listings can read the neutral process on the
            {' '}
            <Link href="/attorney-resources" className="text-blue-600 underline hover:text-blue-700">attorney resources</Link>
            {' '}
            page.
          </p>
        </div>

        <HighValueHomeNote
          title="Expert work on homes above the jumbo line"
          points={[
            `Appraisal spread on custom homes is the usual trigger for an engagement; ${COMMUNITY_12MO.macdonaldHighlands.closings} closings in MacDonald Highlands over twelve months still leave few true comparables for any one estate.`,
            'View-corridor and lot-premium adjustments are where appraisers diverge most; the report isolates those adjustments so counsel can cross-examine on them.',
            'Cash buyers dominate the top tier, so financing contingencies in a rejected offer are evaluated against what actually closed, not against a conforming-loan buyer pool.',
            'Club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, and The Summit Club are valued separately from the real property and should not be folded into a home appraisal.',
            `A buyout above ${LUXURY_2026.jumboThreshold2026} depends on jumbo underwriting; testimony on whether the keeping spouse could realistically refinance uses lender guidelines, not the appraisal alone.`,
          ]}
        />

        <NextSteps
          title="How counsel engages the practice"
          steps={[
            { title: 'Conflict check', detail: 'Names of both spouses, both counsel, and the property address, before any records are reviewed.' },
            { title: 'Engagement letter', detail: 'The question, the deadline, the records available, and the fee quoted in advance.' },
            { title: 'Report', detail: 'Written report with comparable sales, listing history, and conclusions, delivered to retaining counsel.' },
            { title: 'Testimony', detail: 'Declaration, deposition, and hearing or trial appearance as the case requires.' },
          ]}
          callPromise="Counsel leaves the call with a conflict clearance, a fee quote, and a report date."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
