import type { Metadata } from 'next';
import type { PageFAQItem } from '@/components/divorce/PageFAQ';
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

const path = '/divorce-home-sale-checklist';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Divorce Home Sale Checklist, Step by Step | Dr. Jan Duffy',
    description: 'Sell the marital home in a Nevada divorce with an 8-phase numbered checklist: listing authority, HOA resale package, showings, offers, escrow, and payout.',
    alternates: { canonical, languages },
  };
}

type Phase = {
  title: string;
  lead: string;
  items: string[];
};

const PHASES: Phase[] = [
  {
    title: 'Phase 1: Authority and documents',
    lead: 'Nothing can be listed until both spouses, or the court, authorize the sale and the paperwork is in one folder. The joint preliminary injunction in most Clark County cases bars either spouse from transferring the home alone. Gather the deed, payoff letters, the HOA resale package, any appraisal, and the decree or stipulation before pricing.',
    items: [
      'Confirm listing authority: both spouses sign, or obtain the court order directing the sale.',
      'Pull the recorded deed from the Clark County Recorder and check how title is held.',
      'Request written payoff letters for the first mortgage, any HELOC, and any solar or PACE lien.',
      'Order the HOA resale package: CC&Rs, budget, reserve study, and special assessment notices.',
      'Collect any appraisal or broker price opinion from the last two years and the original purchase closing statement.',
      'Place the decree, stipulation, or injunction in the file and give a copy to the listing agent.',
      'Agree in writing on who pays carrying costs, repairs, and staging until closing.',
    ],
  },
  {
    title: 'Phase 2: Value and price strategy',
    lead: 'Price comes from comparable closed sales, not from what either spouse needs out of the home. A written broker price opinion gives both attorneys the same comparables. If the two of you cannot agree on list price, an appraisal settles it faster than a hearing. Set the price before any photography.',
    items: [
      'Obtain a written broker price opinion with comparable sales attached.',
      'Order a licensed appraisal if either attorney requests one or the spread between opinions is wide.',
      'Agree on list price, the lowest acceptable price, and who approves price changes.',
      'Review the seller net sheet so both spouses see the expected payout before listing.',
    ],
  },
  {
    title: 'Phase 3: Prepare the home',
    lead: 'Preparation is where divorce sales lose time, because two people must agree on repairs and one may still live there. Decide the repair list once, assign the costs, and set a date for photography. Remove personal photographs and paperwork, including anything from the court file, before the first showing.',
    items: [
      'Walk the home with the agent and agree on a repair list with costs assigned to each spouse.',
      'Complete repairs, then deep clean, including carpets, windows, and the garage.',
      'Remove personal photographs, mail, prescriptions, and all court documents from view.',
      'Decide on staging: full, partial, or none, and who pays.',
      'Schedule professional photography and, for homes above $1 million, twilight and drone sessions.',
      'If one spouse remains, agree on a daily readiness standard and a notice period for showings.',
    ],
  },
  {
    title: 'Phase 4: List and show',
    lead: 'The listing goes live only after both spouses approve the photographs, the description, and the showing rules. Showings need a notice period that respects the spouse in residence, and guard-gated communities need a gate list the agent maintains. Feedback goes to both spouses at the same time.',
    items: [
      'Both spouses approve the listing description, photographs, and disclosures before activation.',
      'Complete the Nevada Seller\'s Real Property Disclosure with input from both spouses.',
      'Set showing rules: notice hours, lockbox or escorted, pets, and gate access names.',
      'Send showing feedback and market updates to both spouses on the same schedule.',
      'Review price after 14 days on market if showings are slow, with both approvals.',
    ],
  },
  {
    title: 'Phase 5: Offers and contract',
    lead: 'Every offer is presented to both spouses, and every counter carries both signatures or the authority of the court order. Compare price, financing strength, contingencies, and closing date together. Then confirm the contract terms do not conflict with the decree, especially on the closing date and on who signs.',
    items: [
      'Present each offer to both spouses in writing within one business day.',
      'Compare price, loan type, appraisal gap language, inspection period, and closing date.',
      'Counter and accept with both signatures, or per the court order.',
      'Send the executed contract to both attorneys and to the escrow officer with the decree.',
    ],
  },
  {
    title: 'Phase 6: Inspection, appraisal, and HOA',
    lead: 'The buyer inspects, the lender appraises, and the buyer reviews the HOA package, each with a deadline. Repair requests need both spouses to respond. A low appraisal needs a joint decision on whether to reduce, split the gap, or hold. Missing a deadline hands the buyer a free exit.',
    items: [
      'Attend or review the inspection and respond to repair requests with both approvals.',
      'Deliver the HOA resale package; the buyer\'s review period starts on receipt.',
      'Prepare for the appraisal with the comparable sales from Phase 2.',
      'Resolve any appraisal gap in writing with both spouses before the contingency expires.',
      'Confirm all contingencies are released in writing.',
    ],
  },
  {
    title: 'Phase 7: Escrow and closing',
    lead: 'Escrow pays off the loans, the commission, Clark County transfer tax, title and escrow fees, and HOA charges, then wires each spouse their share per the decree. Review the settlement statement three business days before closing. Each spouse gives wiring instructions directly to the title officer.',
    items: [
      'Confirm the escrow officer holds the decree or stipulation and the split formula.',
      'Review the estimated settlement statement at least three business days before closing.',
      'Each spouse delivers wiring instructions directly and verifies them by phone with the title officer.',
      'Sign closing documents separately if preferred; a mobile notary can come to each spouse.',
      'Complete the final walkthrough and hand over keys, remotes, and gate transponders.',
    ],
  },
  {
    title: 'Phase 8: After closing',
    lead: 'Keep the final settlement statement for the tax return and for both attorneys. Check that the old loan reconveyed and that each wire matched the decree. Cancel insurance and HOA autopay, and note the sale date and the Section 121 exclusion for the tax year.',
    items: [
      'Send the final settlement statement to both attorneys and your tax preparer.',
      'Verify the reconveyance of each loan recorded with the county.',
      'Cancel homeowners insurance, utilities, and HOA autopay.',
      'Confirm each spouse received the wire amount stated in the decree.',
    ],
  },
];

const faqs: PageFAQItem[] = [
  {
    question: 'Do both spouses have to sign the listing agreement?',
    answer: 'Yes when both are on title, which is the usual case for a marital home. The alternative is a court order authorizing one spouse to sell. Nevada brokers will not market a jointly owned home on one signature, and escrow will not close without both or the order. Settle this in Phase 1.',
  },
  {
    question: 'Can we skip staging to save money?',
    answer: 'You can, and many couples do a partial stage of the main rooms only. The tradeoff is time on market. In September 2026, 53.4% of Las Vegas single-family homes sold within 30 days, and the well-presented ones lead that group. Decide staging together, assign the cost, and write it down.',
  },
  {
    question: 'What happens if we disagree about an offer?',
    answer: 'The offer cannot be accepted. Most decrees or stipulations set a tiebreaker: a minimum price at which both must accept, or a rule that the listing agent\'s recommendation governs. If yours is silent, the attorneys confer, and a motion is the last resort. Agree on the tiebreaker in Phase 2.',
  },
  {
    question: 'How is the money divided at closing?',
    answer: 'Escrow follows the decree or signed stipulation. It pays off loans and costs, then wires each spouse the stated share, or holds the funds if the paperwork is silent. Both spouses give wiring instructions directly to the title officer. See the net proceeds calculator for a worked example of what comes off the top.',
  },
  {
    question: 'What is the Clark County transfer tax on a sale?',
    answer: 'The rate is $2.55 per $500 of value, which is $5.10 per $1,000. On a $2,000,000 sale that is $10,200, customarily paid by the seller. A deed between former spouses under a divorce decree is exempt, so a buyout avoids the tax while a sale to a third party does not.',
  },
  {
    question: 'Do we need to attend closing together?',
    answer: 'No. Each spouse can sign on a different day with a mobile notary, and the escrow officer can meet with each separately. The final walkthrough can be handled by the agent. Only the documents need to be complete; the two of you do not need to be in the same room.',
  },
];

export default async function DivorceHomeSaleChecklist(props: PageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/divorce-home-sale-checklist';
  const articleSchema = generateArticleSchema(
    'Divorce Home Sale Checklist: Eight Phases from Authority to Payout',
    'A numbered eight-phase checklist for selling a marital home during a Nevada divorce: authority, documents, pricing, preparation, showings, offers, escrow, and after closing.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Home Sale Checklist',
    'Step-by-step checklist for selling a home during a Las Vegas divorce, from listing authority through escrow disbursement.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqSchema = generateFAQPageSchema(faqs);

  const phaseStarts = PHASES.reduce<number[]>((starts, _phase, index) => {
    const previous = index === 0 ? 1 : (starts[index - 1] ?? 1) + (PHASES[index - 1]?.items.length ?? 0);
    starts.push(previous);
    return starts;
  }, []);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, faqSchema, realEstateAgentSchema]} />
      <DivorcePageTemplate
        h1="Divorce Home Sale Checklist: Eight Phases from Authority to Payout"
        heroSubhead="Every step numbered, from the first signature to the last wire"
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
        currentPath={currentPath}
      >
        <DirectAnswer question="What are the steps to sell a house during a Nevada divorce?">
          Confirm listing authority from both spouses or the court, gather the deed, payoff letters, HOA
          resale package, appraisal, and decree, then agree on price. Prepare and photograph the home, set
          showing rules, review offers together, clear inspection and appraisal, and close through escrow,
          which wires each spouse their share per the decree. Eight phases, numbered below.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Homes sold within 30 days', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Single-family homes sold, Sept 2026', value: LVR_SEPT_2026.sfrUnitsSold },
            { label: 'Clark County transfer tax', value: `${NEVADA_LAW.transferTaxClarkPer1000} per $1,000` },
          ]}
          source={LVR_SEPT_2026.source}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          {PHASES.map((phase, index) => (
            <section key={phase.title}>
              <h2>{phase.title}</h2>
              <p>{phase.lead}</p>
              <ol start={phaseStarts[index]}>
                {phase.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </section>
          ))}

          <h2>Documents to keep after the sale</h2>
          <p>
            Keep one folder, shared with both attorneys, that holds every signed document from the sale.
            The tax preparer needs the settlement statement and the purchase closing statement to compute
            the gain under Section 121. The attorneys need the listing agreement, the contract, and proof
            each wire matched the decree. Scan everything the week of closing.
          </p>
          <ul>
            <li>Broker price opinion or appraisal</li>
            <li>Listing agreement and any commission or price change addenda</li>
            <li>Purchase contract, counters, and contingency releases</li>
            <li>Inspection report, repair agreement, and HOA resale package receipt</li>
            <li>Final settlement statement and wire confirmations</li>
            <li>Recorded deed and loan reconveyances</li>
            <li>Decree or stipulation governing the split</li>
          </ul>
          <p>
            {NEVADA_LAW.capitalGainsExclusion}
            {' '}
            {NEVADA_LAW.noStateIncomeTax}
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Related checklists</h2>
          <ul>
            <li><Link href="/divorce-real-estate-checklist">Divorce real estate checklist (sale and buyout paths)</Link></li>
            <li><Link href="/divorce-real-estate-documents">Documents to gather and where to find them</Link></li>
            <li><Link href="/preparing-home-sale-divorce">Preparing the home for sale</Link></li>
            <li><Link href="/divorce-net-proceeds-calculator">Net proceeds calculator with a worked example</Link></li>
            <li><Link href="/divorce-home-sale-timeline">Sale timeline</Link></li>
          </ul>
        </div>

        <HighValueHomeNote points={[
          'Phase 3 for homes above $1 million means professional staging of the main living spaces, twilight photography, drone and video, and a floor plan. Buyers at this tier expect all of it before they book a showing.',
          'Phase 4 in guard-gated communities such as The Ridges, Red Rock Country Club, and MacDonald Highlands needs a gate access list the listing agent maintains, plus proof-of-funds or pre-approval before a showing is confirmed.',
          `Phase 6 appraisals on custom homes can land far apart. Loans above ${LUXURY_2026.jumboThreshold2026} are jumbo, and the buyer's lender may order a second appraisal, so build time into the contract.`,
          `Phase 7 transfer tax scales with price: ${NEVADA_LAW.transferTaxExample2M}. Put it on the net sheet in Phase 2 so neither spouse is surprised at closing.`,
          'Club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, or The Summit Club transfer outside escrow. Add the membership paperwork to Phase 1 and decide who pays the transfer fee.',
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Fifteen minutes to find your phase and what is missing from it.' },
            { title: 'Document and authority check', detail: 'Deed, payoffs, HOA, and the court file reviewed so the listing can go live on schedule.' },
            { title: 'Price and net sheet', detail: 'A written broker price opinion and a seller net sheet both attorneys receive the same day.' },
            { title: 'Listing to payout', detail: 'Showings, offers, and escrow run with both spouses updated at the same time.' },
          ]}
          callPromise="You leave the call with your phase identified and the next three items assigned."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
