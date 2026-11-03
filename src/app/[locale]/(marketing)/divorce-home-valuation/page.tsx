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
import { COMMUNITY_12MO, LUXURY_2026, LVR_SEPT_2026 } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type IValuationProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-home-valuation';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Divorce Home Valuation in Las Vegas: Guide | Dr. Jan Duffy',
    description: 'Which valuation holds up in a Nevada divorce: CMA, BPO, or appraisal, how to set the valuation date, and a two-appraisal protocol for custom homes.',
    alternates: { canonical, languages },
  };
}

export default async function HomeValuation(props: IValuationProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/divorce-home-valuation';

  const faqs = [
    {
      question: 'Do I need an appraisal or is a market analysis enough?',
      answer: 'For most agreed settlements, a comparative market analysis with the comparable sales listed and the valuation date stated is enough. For contested cases, custom homes, or any buyout that needs a refinance, get a licensed appraisal. The lender will order its own appraisal for the refinance regardless of what the settlement used.',
    },
    {
      question: 'What date should the home be valued as of?',
      answer: 'The date your attorney and the court agree on, which is often the date of separation, the date of trial, or the date of the settlement. Values move, so a valuation from an earlier date may need to be updated if the case runs long. State the date on the report so there is no argument later about what it represents.',
    },
    {
      question: 'What if my spouse and I get different valuations?',
      answer: 'Agree on a method before you get them. A common protocol is for each spouse to order a licensed appraisal; if the two fall within an agreed band, the values are averaged; if not, the two appraisers select a third and that value controls. Writing the protocol into the settlement avoids a valuation trial.',
    },
    {
      question: 'Can a divorce valuation be used in court?',
      answer: 'A licensed appraisal can be submitted and the appraiser can testify. A comparative market analysis from an agent can support testimony about marketability and pricing but is not an appraisal. If the case is headed to trial, tell the agent and the appraiser so the report is written with that use in mind.',
    },
    {
      question: 'How does a home valuation differ from the lender’s appraisal in a buyout?',
      answer: 'The settlement valuation sets the buyout amount between the spouses. The lender’s appraisal sets how much the lender will loan. If the lender’s number comes in lower, the loan-to-value tightens and the keeping spouse may need more cash. Order the lender appraisal before the deed is signed, not after.',
    },
    {
      question: 'Does a valuation for divorce cost anything?',
      answer: 'A comparative market analysis from Dr. Jan Duffy is provided without charge as part of planning the sale or buyout. A licensed appraisal is a paid report from an independent appraiser, and the cost is usually shared or assigned in the settlement. Retrospective appraisals for a marriage-date value cost more than current ones.',
    },
  ];

  const articleSchema = generateArticleSchema(
    'Divorce Home Valuation in Las Vegas Explained',
    'Which valuation holds up in a Nevada divorce: CMA, BPO, or appraisal, how to set the valuation date, and a two-appraisal protocol for custom homes.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Home Valuation Services',
    'Dated comparative market analyses, appraisal coordination, and equity worksheets for property division in Las Vegas divorces.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Divorce Home Valuation Services Las Vegas"
        heroSubhead="Which valuation to use, what date it should carry, and how to settle a disagreement"
        currentPath={currentPath}
        showHomeValue
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How is a home valued in a Las Vegas divorce?">
          With a dated opinion of market value from comparable sales: a comparative market analysis for most settlements, a licensed appraisal for contested cases and buyouts that need a refinance. The value is set as of a date your attorney and the court agree on. On custom homes, where two appraisers can differ widely, a two-appraisal protocol written into the settlement decides the number.
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
          <h2>Which valuation holds up in a divorce</h2>
          <p>
            Three kinds of valuation show up in Nevada divorce cases. A comparative market analysis from an agent prices the home against recent sales and current competition. A broker price opinion is a shorter, form-based version lenders sometimes request. A licensed appraisal is an independent report that can be entered as evidence and that a refinance lender will require. Which one you need depends on how contested the case is.
          </p>
          <h3>Comparative market analysis</h3>
          <p>
            The right tool for an agreed settlement or for pricing a listing. A usable one lists the comparable sales, the adjustments made for size, lot, condition, and view, and the date it was prepared. It should also show the active competition, because in a market with
            {' '}
            {LVR_SEPT_2026.availableSfrListings}
            {' '}
            single-family homes for sale, buyers are comparing yours against what is on the market now.
          </p>
          <h3>Licensed appraisal</h3>
          <p>
            The right tool when the spouses disagree, when the home is custom, or when a buyout needs a refinance. The appraiser inspects the home, measures it, and writes to a standard the court and the lender recognize. The lender orders its own appraisal in any case, so a buyout usually involves at least two.
          </p>
          <h3>Broker price opinion</h3>
          <p>
            A lighter report built for lenders and asset managers. It is rarely the basis for a divorce settlement, but it can give both attorneys a fast check on whether the two sides are far apart before paying for appraisals.
          </p>

          <h2>Setting the valuation date</h2>
          <p>
            A value is only useful with a date on it. Nevada cases use different dates depending on the issue: the date of separation, the date of trial, or the date the settlement is signed. Agree on the date with your attorney first, then order the valuation to match. If the case runs long, update it. The number changes with every closed sale on the street and every mortgage payment.
          </p>
          <p>
            Separate-property claims add a second date. If one spouse owned the home before the marriage, the apportionment needs the value on the wedding date. That is a retrospective appraisal, a different assignment from a current one, and it takes longer because the comparable sales are historical.
          </p>

          <h2>Appraisal spread on custom homes, and the two-appraisal protocol</h2>
          <p>
            In a tract subdivision, two appraisers usually land close together, because the comparable sales are nearly identical homes. In The Ridges, MacDonald Highlands, Southern Highlands, or Anthem Country Club, they can land far apart. Custom homes have few true comparables, and view, lot, and finish adjustments are judgment calls. That spread is the biggest risk to a fair buyout, and the settlement should plan for it.
          </p>
          <p>A two-appraisal protocol handles it without a trial:</p>
          <ol>
            <li>Each spouse orders a licensed Nevada appraisal from an appraiser experienced in the community, as of the agreed date.</li>
            <li>If the two values fall within an agreed band, for example five percent of the lower value, the two are averaged.</li>
            <li>If they fall outside the band, the two appraisers select a third, and the third value controls, or the three are averaged, whichever the agreement says.</li>
            <li>The protocol, the band, and who pays for each report are written into the settlement before any appraisal is ordered.</li>
          </ol>
          <p>
            The protocol also sets expectations for the refinance. Loans above
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            are jumbo, and jumbo lenders often order a second appraisal or a review of the first. A buyout plan that already has two appraisals in hand is a buyout plan the lender can underwrite.
          </p>

          <h2>What moves value in Las Vegas, and what the comparables must share</h2>
          <p>
            Square footage is where a valuation starts, not where it ends. In Las Vegas the adjustments that move value most are lot size, view corridor, golf or park frontage, gate staffing, HOA level, and the age of the roof, HVAC, and pool equipment. Strip high-rises add floor level and building amenities. A comparable that shares the ZIP code but not those features is not a comparable.
          </p>
          <ul>
            <li>
              <strong>Views and lots:</strong>
              {' '}
              a Strip or Red Rock view, an elevated lot, or a double lot changes the price band, not just the price.
            </li>
            <li>
              <strong>Gate staffing and HOA:</strong>
              {' '}
              a guard-gated community with a high monthly HOA sells to a different buyer than an unstaffed gate.
            </li>
            <li>
              <strong>Community price bands:</strong>
              {' '}
              The Ridges closed at a
              {' '}
              {COMMUNITY_12MO.theRidges.median}
              {' '}
              median and Red Rock Country Club at
              {' '}
              {COMMUNITY_12MO.redRockCountryClub.median}
              {' '}
              over the trailing twelve months, with
              {' '}
              {COMMUNITY_12MO.theRidges.closings}
              {' '}
              and
              {' '}
              {COMMUNITY_12MO.redRockCountryClub.closings}
              {' '}
              closings respectively.
            </li>
            <li>
              <strong>Condition and systems:</strong>
              {' '}
              deferred maintenance on a pool, roof, or HVAC is priced in by buyers and by appraisers.
            </li>
          </ul>
          <p className="text-sm text-gray-600">
            Community figures:
            {' '}
            {COMMUNITY_12MO.source}
            ,
            {' '}
            {COMMUNITY_12MO.asOf}
            .
          </p>

          <h2>From value to equity to decision</h2>
          <p>
            The valuation feeds two numbers your attorney needs. Equity is the value minus every lien, and each spouse’s share of it drives a buyout. Net proceeds are the value minus liens and selling costs, and they drive the sale comparison. Both should be on one page, so the choice between selling and keeping is made on figures rather than instinct.
          </p>
          <p>
            Here is a hypothetical. Say the home appraises at $1,500,000 with a $700,000 loan balance. Equity is $800,000, so a buyout means one spouse pays the other $400,000 and refinances about $1,100,000, a jumbo loan. A sale at the same price nets less than $800,000 after commissions, closing costs, and transfer tax, but neither spouse needs a loan. The
            {' '}
            <Link href="/divorce-home-equity-split" className="text-blue-600 underline hover:text-blue-700">equity split page</Link>
            {' '}
            and the
            {' '}
            <Link href="/divorce-net-proceeds-calculator" className="text-blue-600 underline hover:text-blue-700">net proceeds calculator</Link>
            {' '}
            carry the math further.
          </p>

          <h2>What a court-ready valuation package contains</h2>
          <p>
            When a case may go to trial, the valuation has to be written for a reader who was not in the room. That means the comparable sales listed with addresses and closing dates, each adjustment explained, the active competition shown, and the valuation date on the cover. The agent can also testify to marketability and pricing, while the appraiser testifies to value.
          </p>
          <ul>
            <li>Comparable sales with closing dates, prices, and the adjustments applied.</li>
            <li>Active and pending listings the home competes against.</li>
            <li>The valuation date and the condition observed on that date.</li>
            <li>An equity worksheet and a net proceeds estimate at the concluded value.</li>
            <li>A statement of the agent’s neutral role in the transaction.</li>
          </ul>
          <p>
            Dr. Jan Duffy prepares the analysis for both attorneys at the same time, on the same date, so the valuation is a shared document rather than one side’s exhibit. See
            {' '}
            <Link href="/divorce-appraisal-services" className="text-blue-600 underline hover:text-blue-700">appraisal services</Link>
            {' '}
            for the appraiser referral process.
          </p>
        </div>

        <HighValueHomeNote
          points={[
            `Any buyout refinance above ${LUXURY_2026.jumboThreshold2026} is a jumbo loan. Jumbo lenders often order a second appraisal or a desk review, so a settlement that already uses a two-appraisal protocol matches what the lender will do.`,
            'Appraisal spread is widest on custom homes in The Ridges, MacDonald Highlands, and Southern Highlands, where view corridors and lot position drive price. Choose appraisers who have closed work in that community.',
            `The Summit Club and other developer-controlled enclaves have inventory that is largely off the MLS, which limits the comparable sales an appraiser can cite. ${COMMUNITY_12MO.summitClub.note.charAt(0).toUpperCase()}${COMMUNITY_12MO.summitClub.note.slice(1)}, so private sale records matter.`,
            'Club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, and The Summit Club are valued separately from the home. Do not let an appraiser fold a membership into the house value, and do not leave it off the asset schedule.',
            'Guard-gated communities require appointment-only access for appraisers and agents. Build that into the valuation timeline so a report is not delayed by gate rules.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the home, the community, and whether the case is agreed or contested.' },
            { title: 'Dated market analysis', detail: 'A comparative market analysis as of the date your attorney chooses, with comparables and competition listed.' },
            { title: 'Appraisal protocol', detail: 'If needed, a two-appraisal plan with a band and a tiebreaker, and referrals to appraisers who work in your community.' },
            { title: 'Equity and proceeds worksheet', detail: 'The concluded value turned into each spouse’s share and a net proceeds estimate for a sale.' },
          ]}
          callPromise="You leave the call with a value range, the right kind of valuation for your case, and the date it should carry."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
