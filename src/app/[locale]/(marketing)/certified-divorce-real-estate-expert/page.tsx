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

type ICDREProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/certified-divorce-real-estate-expert';

const faqs = [
  {
    question: 'What is a Certified Divorce Real Estate Expert?',
    answer: 'CDRE is a designation issued by the Ilumni Institute to real estate licensees who complete its coursework on divorce listings: neutrality, court orders, working with family law attorneys, valuation for property division, and the emotional dynamics of a two-seller sale. It is a training credential, not a license, and it does not confer legal or appraisal authority.',
  },
  {
    question: 'Does a divorce listing require a CDRE agent?',
    answer: 'No. Nevada law and Clark County family court do not require any designation. Judges and attorneys look for an agent who will act neutrally, document in writing, follow the order, and price from comparable sales. A designation signals training in those habits; the habits themselves are what matter in the file.',
  },
  {
    question: 'How is divorce listing work different from a standard listing?',
    answer: 'Two sellers who may not speak to each other, instructions that come from a stipulation or order, counsel on both sides who need written reports, and a closing statement the court will divide. Pricing, access, repairs, and offer decisions all need a method agreed in advance so the sale does not stall when one spouse disengages.',
  },
  {
    question: 'What questions should I ask any agent before a divorce listing?',
    answer: 'Will you represent both of us equally and put that in the listing agreement? How often will you report to both attorneys in writing? How will price reductions work if one of us will not sign? What happens to proceeds at closing? Have you worked from a court order before? Clear answers to those five matter more than any letters after a name.',
  },
  {
    question: 'Does Dr. Jan Duffy hold the CDRE designation?',
    answer: 'This page describes what the designation covers so you can evaluate any agent. Ask directly about current designations and training during the first call; the answer and the practice\'s written-report, neutral-listing, and court-order process are laid out on the attorney resources page and in the first consultation.',
  },
];

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Certified Divorce Real Estate Expert (CDRE) | Dr. Jan Duffy',
    description: 'What the Certified Divorce Real Estate Expert designation covers, what Clark County family court looks for, and 5 questions to ask before you sign.',
    alternates: { canonical, languages },
  };
}

export default async function CDRE(props: ICDREProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = path;
  const description = 'What the Certified Divorce Real Estate Expert designation covers, what Clark County family court looks for in a listing agent, and the questions to ask before you sign a divorce listing.';
  const articleSchema = generateArticleSchema(
    'Certified Divorce Real Estate Expert: What the Designation Covers',
    description,
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Real Estate Listing Services',
    description,
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Certified Divorce Real Estate Expert: What It Means in Las Vegas"
        heroSubhead="What the designation covers, and what the court looks for"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="What does the Certified Divorce Real Estate Expert designation cover?">
          CDRE is a training designation from the Ilumni Institute for agents who list homes in divorce. The coursework covers neutral representation of both spouses, taking instructions from a court order or stipulation, written reporting to family law attorneys, valuation for property division, and managing a sale when the sellers disagree. It is not a license, and no Nevada court requires it.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Sold within 30 days of listing', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Closings above $1M, Sept 2026', value: LUXURY_2026.closingsAbove1MSept2026 },
          ]}
          source={`${LVR_SEPT_2026.source}; ${LUXURY_2026.sept2026Source}`}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>What the CDRE coursework covers</h2>
          <p>
            The designation trains licensees in the parts of a divorce listing that a standard sale never touches: two sellers with opposing interests, instructions that come from a legal document, attorneys who need a record, and a closing statement a judge will divide. The curriculum is built around neutrality, documentation, and court-order compliance rather than marketing.
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Community property division and how it shapes the listing and closing statement</li>
            <li>Court-ordered sales and reading an order for listing authority</li>
            <li>Buyout math and the refinance the keeping spouse must qualify for</li>
            <li>Neutral communication when the sellers do not speak to each other</li>
            <li>Written reporting to family law attorneys and mediators</li>
            <li>Timeline management and escalation when one spouse stops cooperating</li>
          </ul>
          <p>
            Those topics map directly onto what Clark County family law attorneys ask of a listing agent. Whether an agent learned them through a designation course or through years of court-ordered files, the test is the same: can they show you the process in writing before you sign.
          </p>

          <h2>What family court looks for in a listing agent</h2>
          <p>
            No Nevada statute or Eighth Judicial District rule requires a designation for a divorce listing. Judges at the Family Courts and Services Center look for an agent who treats both spouses the same, works from the order, prices from documented comparable sales, and keeps a dated record counsel can attach to a motion. A designation signals training in those habits; the file proves them.
          </p>
          <p>
            The habits show up in specific documents. A listing agreement signed by both spouses with price, reduction, offer-floor, and access terms. Weekly written status reports copied to both attorneys. A broker price opinion with the comparable sales attached. A closing statement that itemizes every payoff and credit. When those exist, enforcement is a short motion. When they do not, the sale becomes another contested issue.
          </p>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            (
            {NEVADA_LAW.communityPropertyCite}
            ). The agent's job is to produce a clean closing statement for the court to divide, not to decide the division.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>How this practice handles a divorce listing</h2>
          <p>
            Every divorce listing runs the same way regardless of price band. Both spouses sign the listing agreement. Both receive the same email, the same showing feedback, and the same offer at the same time. Counsel on both sides gets a written status report weekly and after every offer. Pricing comes from a written broker price opinion both sides have seen, and price reductions follow a schedule in the agreement.
          </p>
          <p>
            For a tract home in Summerlin, Henderson, or North Las Vegas, that process is usually enough to close within the market's typical window. For custom homes in The Ridges, MacDonald Highlands, or Southern Highlands, the process adds a two-appraisal protocol, guard-gate access language, and off-market exposure when privacy requires it. The full process for attorneys is on the
            {' '}
            <Link href="/attorney-resources" className="text-blue-600 underline hover:text-blue-700">attorney resources</Link>
            {' '}
            page, and for mediators on
            {' '}
            <Link href="/divorce-mediator-resources" className="text-blue-600 underline hover:text-blue-700">mediator resources</Link>
            .
          </p>

          <h2>Questions to ask any divorce listing agent</h2>
          <p>
            Ask these five before signing, and ask for the answers in writing. They separate agents who have run a court-ordered sale from agents who have only read about one. Any designation is a reasonable sixth question, but the first five decide whether your sale will survive a spouse who disengages.
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>Will you represent both of us equally, and will the listing agreement say so?</li>
            <li>How often will both attorneys receive a written status report, and what will it contain?</li>
            <li>How does the list price get reduced if one of us will not sign a change?</li>
            <li>Who holds the proceeds at closing, and what document tells the title company how to disburse?</li>
            <li>Show me a redacted listing agreement from a prior court-ordered sale.</li>
          </ol>

          <h2>Designations, licenses, and who does what</h2>
          <p>
            A real estate licensee prices, markets, negotiates, and closes the sale. A state-certified appraiser produces the appraisal a lender or judge relies on. A family law attorney advises each spouse and drafts the stipulation or order. A CPA advises on the Section 121 exclusion and basis. No single designation replaces any of those roles, and an agent who claims otherwise should be asked to explain.
          </p>
          <p>
            That division of labor is why the agent's written process matters more than letters. The agent is the one professional in the file who talks to both spouses, both attorneys, the appraiser, the lender, and the title officer every week. The reports, the valuation, and the closing statement are what each of those parties relies on.
          </p>
        </div>

        <HighValueHomeNote
          title="Divorce listings above the jumbo line"
          points={[
            `A buyout above ${LUXURY_2026.jumboThreshold2026} is a jumbo refinance; the keeping spouse's qualification should be confirmed in writing before the stipulation depends on it.`,
            'Custom homes with few comparable sales need a two-appraisal protocol agreed before the reports are ordered, with the tie-breaker named.',
            'Club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, and The Summit Club are separate assets; ask how the agent documents them in the property schedule.',
            'Guard-gated communities require guest-list approval for every showing; the listing agreement should name who approves access.',
            `Clark County transfer tax runs ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000, so ${NEVADA_LAW.transferTaxExample2M}; a buyout deed between former spouses under the decree is exempt.`,
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Fifteen minutes on your property, where the case stands, and whether your attorney has an order or stipulation in place.' },
            { title: 'Walk-through and valuation', detail: 'Both spouses offered the same appointment. A written broker price opinion with comparable sales goes to both of you and both counsel.' },
            { title: 'Listing or buyout plan', detail: 'A draft listing agreement with authority language, or a buyout worksheet with the refinance figure, for counsel to review.' },
          ]}
          callPromise="You leave the call knowing the process in writing and what your attorney needs to send next."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
