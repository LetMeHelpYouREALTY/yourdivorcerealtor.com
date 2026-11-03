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

type IAttorneyCollabProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/family-law-attorney-collaboration';

const faqs = [
  {
    question: 'When in the case should the real estate agent be brought in?',
    answer: 'As soon as the home is on the asset schedule and before any motion about it. An early broker price opinion gives both counsel a shared number for negotiation, shows whether a buyout is realistic, and avoids a listing taken under a rushed interim order. Early involvement also lets the agent flag title, HOA, or occupancy issues before they become court issues.',
  },
  {
    question: 'Will the agent talk to my client without me?',
    answer: 'Only about logistics: showings, access, condition, and paperwork. Any question about strategy, what the other spouse wants, or whether to accept an offer is sent back to you. Every substantive email copies both clients and both attorneys. If your client needs a private valuation for settlement planning, that is a separate engagement you request directly.',
  },
  {
    question: 'Can one attorney order the broker price opinion for both sides?',
    answer: 'Yes, and that is the usual arrangement. One counsel requests it, the agent walks the home, and the same written document goes to both attorneys at the same time. Because both sides see the same comparable sales and the same reasoning, the opinion becomes a starting point rather than a disputed exhibit.',
  },
  {
    question: 'What happens when a spouse refuses showings after the listing is signed?',
    answer: 'The written status report records each refused or missed showing with the date and the buyer\'s agent. Counsel can attach that record to a motion to enforce the listing order. The listing agreement should already name a showing-notice period and lockbox access so the refusal is a breach of a signed term, not a gray area.',
  },
  {
    question: 'How are proceeds handled at closing?',
    answer: 'The title company disburses according to the decree, stipulation, or interim order on file. When those documents are silent or disputed, proceeds stay in escrow or go to an attorney trust account until an order directs payment. The closing statement itemizes every lien payoff, commission, tax, and credit so the division can be checked line by line.',
  },
];

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Collaborating with Family Law Attorneys | Dr. Jan Duffy',
    description: 'How a neutral Las Vegas listing agent works inside a family law case: one valuation for both counsel, weekly written reports, and listing authority that survives 1 spouse going silent.',
    alternates: { canonical, languages },
  };
}

export default async function AttorneyCollaboration(props: IAttorneyCollabProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = path;
  const description = 'How a neutral listing agent works inside a Las Vegas family law case: one valuation for both counsel, weekly written reports, and listing authority that survives a spouse going silent.';
  const articleSchema = generateArticleSchema(
    'Collaborating with Family Law Attorneys on the Marital Home',
    description,
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Family Law Attorney Collaboration Services',
    description,
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Working with Family Law Attorneys on Divorce Property"
        heroSubhead="One valuation, one report, both counsel"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How does a listing agent collaborate with family law attorneys in a Las Vegas divorce?">
          The agent works from the stipulation or order, delivers one valuation to both counsel, and sends the same written status report to both sides on a fixed schedule. Strategy questions go back to the attorneys. Logistics, pricing data, and the closing statement come from the agent. The arrangement keeps the home sale out of the dispute and gives the court a clean record if enforcement is needed.
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
          <h2>Where the agent fits in the case</h2>
          <p>
            The agent supplies three things counsel cannot produce in-house: a documented market value, a listing that complies with the order, and a closing statement that shows where every dollar went. Everything else, including whether to sell, who gets an offset, and when the decree should enter, stays with the attorneys. Keeping those lines clear is what makes the collaboration useful.
          </p>
          <p>
            Early involvement pays off. A broker price opinion before the first settlement conference gives both counsel a shared number and shows at once whether the keeping spouse can refinance at that figure. When the home is a Summerlin or Henderson tract house with many model-match sales, that opinion is often enough to settle the number. When it is a custom home, the opinion identifies the spread and tells counsel an appraisal, or two, will be needed.
          </p>

          <h2>What neutrality looks like day to day</h2>
          <p>
            Neutral means both spouses sign the listing, both receive every document at the same time, and neither gets private advice. The agent answers questions about showings, pricing data, repairs, and escrow dates. Questions about what the other spouse will accept, whether to hold out, or how proceeds should split are redirected to counsel every time, in writing.
          </p>
          <p>
            This discipline protects your client. A spouse who later claims the agent favored the other side has a full email record showing identical communication. It also protects the sale. Buyers' agents learn quickly that offers get a clear, timely response from one source rather than two competing ones.
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Every substantive email copies both clients and both attorneys</li>
            <li>Showing feedback is forwarded unedited to both sides</li>
            <li>Offers and counters are presented to both spouses at the same time</li>
            <li>Price-change recommendations come with the comparable sales attached</li>
          </ul>

          <h2>Written status reports and court-order compliance</h2>
          <p>
            A written status report goes to both counsel weekly while the home is active and after every offer. It records showings, feedback, days on market against the comparable set, offers and responses, repair requests, and the escrow calendar. When the case returns to the Family Courts and Services Center, that dated record is what shows the listing was marketed in good faith.
          </p>
          <p>
            Court-order compliance starts with reading the order before the listing is drafted. The order should say who signs, how price is set and reduced, who approves offers, where proceeds go, and what access the occupying spouse must provide. When it is silent on any of these, the agent sends counsel a short list of gaps so they can be stipulated before marketing starts. Listing-authority language used in Clark County cases is laid out on the
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
            ). The closing statement is the document the court divides, so it itemizes every payoff, commission, tax, and credit.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Valuation: opinion versus appraisal</h2>
          <p>
            A broker price opinion is a licensee's estimate of likely sale price from recent comparable sales and active competition. A licensed appraisal is prepared by a state-certified appraiser under USPAP and is what a lender or judge relies on for a buyout. Counsel usually starts with the opinion to frame negotiation and orders an appraisal when a buyout figure must be fixed or value is contested.
          </p>
          <p>
            For custom homes above the jumbo line, the two-appraisal protocol is the cleaner path: each side selects a certified appraiser, the reports are exchanged, and the stipulation says in advance whether the figures are averaged or the court chooses. Details are on the
            {' '}
            <Link href="/divorce-appraisal-services" className="text-blue-600 underline hover:text-blue-700">divorce appraisal services</Link>
            {' '}
            page. If value will be litigated, see
            {' '}
            <Link href="/divorce-real-estate-expert-witness" className="text-blue-600 underline hover:text-blue-700">expert witness services</Link>
            .
          </p>

          <h2>Transaction coordination through closing</h2>
          <p>
            Once a contract is accepted, the agent manages inspections, repair negotiations, appraisal access, and the title file, and reports each milestone to both counsel. Signatures from a spouse who has moved out of state are handled through mobile notary or the title company's remote closing. Proceeds are disbursed per the order on file or held until one issues.
          </p>
          <p>
            The closing statement is sent to both attorneys the day it is final. For a buyout rather than a sale, the agent coordinates with the lender's appraiser and the title officer on the interspousal deed and the transfer-tax exemption, then confirms the loan payoff and recording to both sides.
          </p>
        </div>

        <HighValueHomeNote
          title="When the marital home is above the jumbo line"
          points={[
            `Buyout refinances above ${LUXURY_2026.jumboThreshold2026} are jumbo loans; counsel should confirm the keeping spouse's qualification with a lender before the stipulation relies on it.`,
            'Custom-home appraisal spread can reach six figures; the stipulation should fix the two-appraisal protocol and tie-breaker before reports are ordered.',
            'Club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, and The Summit Club are separate assets with their own transfer rules and fees.',
            'Guard-gated showings need guest-list approval; name the spouse who controls access in the listing authority.',
            'Off-market or private exposure to a vetted buyer pool is available when public marketing would compromise a client\'s privacy or business.',
          ]}
        />

        <NextSteps
          title="How collaboration starts"
          steps={[
            { title: 'Counsel call', detail: 'A short call on the property, the case posture, and any order already entered.' },
            { title: 'Shared valuation', detail: 'A written broker price opinion with comparable sales delivered to both attorneys at the same time.' },
            { title: 'Authority language', detail: 'A draft listing agreement for counsel to edit into the stipulation or interim order.' },
            { title: 'Reporting through closing', detail: 'Weekly written status reports to both sides, then the itemized closing statement.' },
          ]}
          callPromise="Counsel leaves the call with a valuation date and a draft stipulation paragraph."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
