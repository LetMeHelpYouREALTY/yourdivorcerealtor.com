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

type IMediatorProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-mediator-resources';

const faqs = [
  {
    question: 'Can the agent attend a mediation session?',
    answer: 'Yes, when both parties and the mediator agree. The agent presents the valuation, answers questions about the comparable sales and the net sheet, and leaves before the parties negotiate. Attendance is limited to the real estate portion so the agent is never present for discussion of support, custody, or other assets.',
  },
  {
    question: 'What is a net sheet and why does mediation need one?',
    answer: 'A net sheet shows what each spouse would receive at several sale prices after the loan payoff, commission, Clark County transfer tax, title and escrow fees, and any agreed credits. Mediation stalls when parties argue over a gross price; it moves when both see that a $20,000 difference in list price changes each share by less than half that.',
  },
  {
    question: 'How does a buyout number get set in mediation?',
    answer: 'From a valuation both parties accept, minus the loan balance, divided per the agreement, adjusted for any separate-property claims counsel has identified. For tract homes a broker price opinion is often enough. For custom homes the two-appraisal protocol gives each party a report they chose, with the average or a tie-breaker agreed in advance.',
  },
  {
    question: 'Does the agent give an opinion on whether to sell or keep?',
    answer: 'No. The agent supplies what each option costs and yields: the sale net sheet, the buyout figure, the refinance qualification the keeping spouse would need, and the carrying cost of a deferred sale. The choice is the parties\' to make with the mediator. That boundary keeps the agent neutral and keeps the data credible to both sides.',
  },
  {
    question: 'What if the parties agree in mediation but one later refuses to sign the listing?',
    answer: 'The mediated agreement should include the listing-authority terms: who signs, the initial price and reduction schedule, the offer floor, and access. When those terms are in the signed memorandum of understanding and later the stipulated decree, counsel can enforce them without a new hearing on the merits. The agent\'s written status reports document any refusal.',
  },
];

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Divorce Mediator Real Estate Resources | Dr. Jan Duffy',
    description: 'Neutral valuations and net sheets for Las Vegas divorce mediators: one number both parties can accept, delivered 3 to 5 business days after a walk-through.',
    alternates: { canonical, languages },
  };
}

export default async function MediatorResources(props: IMediatorProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = path;
  const description = 'Neutral property valuations, net sheets, and buyout figures for Las Vegas divorce mediators, delivered to both parties at the same time.';
  const articleSchema = generateArticleSchema(
    'Divorce Mediator Real Estate Resources',
    description,
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Mediation Real Estate Support',
    description,
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Divorce Mediator Real Estate Resources"
        heroSubhead="A neutral number both parties can work from"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="What can a divorce mediator get from a neutral real estate agent?">
          A written valuation both parties receive at the same time, a net sheet showing each spouse's share at several sale prices, a buyout figure with the refinance qualification it requires, and the carrying cost of a deferred sale. The agent presents the data, answers questions, and leaves the decision to the parties. Nothing is shared with one side that the other does not see.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Sold within 30 days of listing', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Clark County transfer tax per $1,000', value: NEVADA_LAW.transferTaxClarkPer1000 },
          ]}
          source={`${LVR_SEPT_2026.source}; ${NEVADA_LAW.transferTaxCite}`}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Why mediation needs one valuation, not two</h2>
          <p>
            Mediation about the home stalls when each spouse arrives with a different number. One valuation, ordered through the mediator or by agreement and delivered to both parties at the same time, replaces two advocacy figures with one set of comparable sales both can question. The agent walks the home once, writes once, and answers questions from both sides in the same session.
          </p>
          <p>
            The valuation is a broker price opinion: a licensee's estimate of likely sale price from recent closed sales and current competing listings, with the adjustments written out. It is not a licensed appraisal. For a tract home with many model-match sales it is usually enough to settle on a number. For a custom home or a Strip high-rise with few comparables, the opinion identifies the likely spread and the parties decide whether to order appraisals.
          </p>

          <h2>Materials delivered to both parties</h2>
          <p>
            Each engagement produces the same four documents for both spouses and the mediator: the written valuation with comparable sales, a net sheet at three or more sale prices, a buyout worksheet, and a deferred-sale carrying-cost summary. Each is dated and sent in one email to everyone. If a party asks a follow-up question, the answer goes to the whole group.
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Valuation.</strong>
              {' '}
              Comparable sales, active competition, adjustments, and a likely sale range rather than a single point.
            </li>
            <li>
              <strong>Net sheet.</strong>
              {' '}
              Each spouse's share after loan payoff, commission, transfer tax at
              {' '}
              {NEVADA_LAW.transferTaxClarkPer1000}
              {' '}
              per $1,000, title and escrow fees, and agreed credits.
            </li>
            <li>
              <strong>Buyout worksheet.</strong>
              {' '}
              Equity at the agreed value, the keeping spouse's share to pay, and the loan amount a refinance would need to carry.
            </li>
            <li>
              <strong>Deferred-sale summary.</strong>
              {' '}
              Monthly mortgage, taxes, insurance, HOA, and maintenance the parties must allocate until the sale date.
            </li>
          </ul>
          <p>
            Each document is built to be read by a party who has never sold a home. Terms are defined on the page, the arithmetic is shown, and the comparable sales carry addresses and closing dates so either party can verify them in the public record.
          </p>

          <h2>Neutrality in the mediation room</h2>
          <p>
            The agent represents the property, not a spouse, and never advises either side on whether to sell, keep, or hold out. Questions about what a spouse should accept go back to the mediator or counsel. When the agent attends a session, attendance is limited to the real estate portion and ends before the parties negotiate. The same email list, both spouses and the mediator, is used throughout.
          </p>
          <p>
            This matters because a valuation that one party believes was shaded toward the other is worthless in mediation. Both parties see the same comparable sales, hear the same answers, and can challenge the same adjustments. If one party wants a private strategy opinion, that is a separate engagement through that party's attorney, and the agent would then step out of the neutral role.
          </p>

          <h2>From mediated agreement to listing or buyout</h2>
          <p>
            When the parties agree to sell, the memorandum of understanding should carry the listing terms: who signs, the initial price and reduction schedule, the offer floor, who approves repairs, and access rules for the occupying spouse. When they agree to a buyout, it should carry the agreed value, the payment deadline, the refinance deadline, and what happens if the refinance fails.
          </p>
          <p>
            Those terms then flow into the stipulated decree so counsel can enforce them if a party changes course. The agent provides draft language on request and, once the listing is signed, sends written status reports to both parties and the mediator or counsel. The same format used with attorneys is described on the
            {' '}
            <Link href="/attorney-resources" className="text-blue-600 underline hover:text-blue-700">attorney resources</Link>
            {' '}
            page.
          </p>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            (
            {NEVADA_LAW.communityPropertyCite}
            ). A mediated split that departs from equal division should be documented with the reasons so the court can approve it.
            {' '}
            {NEVADA_LAW.transferTaxDivorceExemption}
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Timing and cost</h2>
          <p>
            A walk-through can usually be scheduled within a week of the mediator's request, with both spouses invited to the same appointment or separate ones if contact is restricted. The written valuation and net sheet follow within three to five business days. Licensed appraisals, when the parties order them, typically add one to three weeks depending on the appraiser's calendar and whether the home is a custom build.
          </p>
          <p>
            Mediators who want the materials before the first joint session should allow two weeks from the request. That leaves time for a walk-through, the written opinion, a round of follow-up questions from each party, and a revised net sheet if the loan balance or an agreed credit changes. Sessions scheduled sooner can still proceed on a preliminary range, with the full documents following.
          </p>
          <p>
            There is no charge to the parties for the valuation when the home is later listed with the practice. When the parties choose a buyout or another agent, a flat fee for the written work is quoted in advance so the mediator can allocate it. Appraisal fees are paid directly to the appraiser by whichever party or allocation the parties agree.
          </p>
        </div>

        <HighValueHomeNote
          title="Mediating a home above the jumbo line"
          points={[
            `A buyout refinance above ${LUXURY_2026.jumboThreshold2026} is a jumbo loan; the keeping spouse should get a lender's written pre-qualification before the parties agree on a buyout.`,
            'Custom-home comparables are sparse and the appraisal spread can be wide; the two-appraisal protocol with an agreed tie-breaker belongs in the memorandum of understanding.',
            'Club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, and The Summit Club are separate from the deed and should be valued and allocated on their own line.',
            'The IRS Section 121 exclusion caps at $250,000 per single filer and $500,000 for a joint return; on a large gain, who sells and when can change the tax outcome, and a CPA should be in the room.',
            'Private, off-market exposure is an option when a public listing would expose a party\'s business or personal affairs.',
          ]}
        />

        <NextSteps
          title="How mediators engage the practice"
          steps={[
            { title: 'Mediator request', detail: 'A short call or email with the property address, the parties\' contact status, and what the session needs: valuation, net sheet, buyout figure, or all three.' },
            { title: 'Walk-through', detail: 'Both parties offered the same appointment, or separate ones if required.' },
            { title: 'Delivery', detail: 'Valuation, net sheet, and worksheets sent to both parties and the mediator in one email within three to five business days.' },
            { title: 'Session support', detail: 'Attendance for the real estate portion of a session when the parties and mediator agree.' },
          ]}
          callPromise="The mediator leaves the call with a delivery date and a list of what the parties need to bring."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
