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

const path = '/divorce-listing-process';

type IListingProcessProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'The Divorce Listing Process in Las Vegas | Dr. Jan Duffy',
    description: 'See the 6-stage divorce listing process: joint valuation, neutral agreement, agreed showings, confidential marketing, offers to both spouses, and closing.',
    alternates: { canonical, languages },
  };
}

export default async function ListingProcess(props: IListingProcessProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/divorce-listing-process';

  const faqs = [
    {
      question: 'How is a divorce listing different from a normal listing?',
      answer: 'Two sellers sign instead of one, their attorneys approve the terms, and a court may set the deadline. Every update goes to both spouses at the same time in writing. Price, showings, and repairs are decided before listing, and escrow holds the proceeds until the decree directs the split.',
    },
    {
      question: 'Does the listing say we are divorcing?',
      answer: 'No. The MLS description covers square footage, lot, upgrades, and HOA terms and never mentions the owners. A Coming Soon period lets agents preview before public portal syndication, and the yard sign can wait. When a buyer asks why you are selling, the answer is relocation.',
    },
    {
      question: 'Who signs the listing agreement?',
      answer: 'Both owners on title, or a court-appointed agent under the order. The agreement includes an addendum with price, showing windows, repair budget, decision deadlines, and signing authority. Both attorneys review it before signatures so nothing is renegotiated mid-escrow.',
    },
    {
      question: 'How do offers get reviewed?',
      answer: 'Each offer is summarized on one page: price, financing, contingencies, closing date, and the net to each spouse. It goes to both spouses and both attorneys at the same time with a response deadline. Counteroffers need both signatures unless an order says otherwise.',
    },
    {
      question: 'What happens if one spouse stops cooperating mid-listing?',
      answer: 'The escalation protocol starts: the event is logged with a date, both attorneys are notified the same day, and the listing addendum\'s deadlines are enforced. If the pattern continues, the attorneys can ask the court to enforce the terms or appoint a neutral agent.',
    },
    {
      question: 'How long does the process take?',
      answer: `The pre-listing stage depends on attorney calendars and two spouses making decisions. Once listed, homes move at market speed: ${LVR_SEPT_2026.soldWithin30DaysPct} of Las Vegas single-family homes sold within 30 days in September 2026. Closing follows the buyer's lender and any order the title company must record.`,
    },
  ];

  const articleSchema = generateArticleSchema(
    'The Divorce Listing Process in Las Vegas',
    'The six-stage divorce listing process: joint valuation, neutral listing agreement, agreed preparation and showings, confidential marketing, offers to both spouses, and a closing that matches the decree.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Listing Process Services',
    'A listing process built for two sellers, two attorneys, and a court deadline, for homes in Las Vegas, Henderson, and Summerlin.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="The Divorce Listing Process Explained"
        heroSubhead="Six stages, each with a written sign-off from both spouses"
        showHomeValue
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="What is the divorce listing process?">
          A divorce listing runs in six stages: a valuation both spouses accept, a neutral listing
          agreement with an addendum covering price and showings, preparation on an agreed schedule,
          marketing that never mentions the divorce, offers sent to both spouses at once, and a closing
          where escrow splits proceeds as the decree directs. Each stage ends with a written sign-off.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, September 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Homes sold within 30 days of listing', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Single-family closings in the month', value: LVR_SEPT_2026.sfrUnitsSold },
          ]}
          source={LVR_SEPT_2026.source}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Why a standard listing process fails in divorce</h2>
          <p>
            A standard listing assumes one decision-maker, one phone call per decision, and a seller who
            wants the sale. A divorce listing has two sellers who may not speak, two attorneys who must
            approve the terms, and sometimes a court deadline. Any update that reaches one spouse first
            becomes evidence of bias. The process below is built around that.
          </p>
          <p>
            Four things are different in practice: decisions are made before listing instead of during
            escrow, every message goes to both spouses at the same moment, deadlines replace
            back-and-forth, and the proceeds split is written down before the first showing.
          </p>

          <h2>The six stages</h2>
          <p>
            Valuation, listing agreement, preparation, marketing, offers, and closing. Each stage has a
            document both spouses sign before the next begins, so no decision is reopened later. The
            order matters: a listing launched before the valuation and the addendum are signed is the
            one most likely to stall.
          </p>
          <h3>Stage 1: valuation both spouses accept</h3>
          <p>
            A written comparative market analysis from closed sales in the same community and size band,
            with the comparables attached. Attorneys use it for the property division worksheet. When
            the spouses disagree, a jointly ordered appraisal settles it. Start at
            {' '}
            <Link href="/divorce-home-valuation" className="text-blue-600 underline hover:text-blue-700">divorce home valuation</Link>
            .
          </p>
          <h3>Stage 2: neutral listing agreement</h3>
          <p>
            Both owners sign one agreement. The agent represents the sale, not a side. An addendum
            covers list price, minimum terms, showing windows, repair budget and who advances it,
            decision deadlines, and signing authority. Both attorneys review it before signatures.
          </p>
          <h3>Stage 3: preparation on an agreed schedule</h3>
          <p>
            Depersonalize before photography, service the pool and HVAC, and fix what an inspector will
            flag. The occupying spouse controls day-to-day access, so the schedule is shared with both.
            See
            {' '}
            <Link href="/preparing-home-sale-divorce" className="text-blue-600 underline hover:text-blue-700">preparing the home</Link>
            {' '}
            and
            {' '}
            <Link href="/divorce-home-staging" className="text-blue-600 underline hover:text-blue-700">staging during divorce</Link>
            .
          </p>
          <h3>Stage 4: marketing that keeps the divorce private</h3>
          <p>
            The listing describes the property, never the owners. A Coming Soon period on the MLS
            reaches agents before public portal syndication, and the yard sign can wait if you prefer
            less neighborhood attention. Buyers' agents will ask why you are selling; the answer is
            relocation. No court mail, calendars, or family photos appear in photography.
          </p>
          <h3>Stage 5: offers to both spouses at once</h3>
          <p>
            Each offer is summarized on one page with price, financing, contingencies, closing date,
            and the net to each spouse, then sent to both spouses and both attorneys together with a
            response deadline. Counteroffers need both signatures unless an order says otherwise.
          </p>
          <h3>Stage 6: closing that matches the decree</h3>
          <p>
            Escrow instructions for the proceeds split copy the stipulation or decree word for word.
            Mortgage payoff, HOA transfer fees, and lien releases are itemized. Both spouses sign the
            deed, or the order authorizes a signature. Funds wire to each spouse directly.
          </p>

          <h2>Communication rules that keep the sale neutral</h2>
          <p>
            Every showing request, feedback note, offer, and price discussion goes to both spouses in
            the same message, at the same time, in writing. No private calls about the other spouse's
            conduct. Attorneys are copied on anything that changes terms. This is slower by a few
            minutes and faster by months, because nothing has to be re-explained or defended later.
          </p>
          <ul>
            <li>Weekly written status: showings, feedback, market activity, and open decisions.</li>
            <li>Decision deadlines on price, repairs, and offers, with silence reported as a missed deadline.</li>
            <li>Attorneys receive the same summary as the spouses, not a separate version.</li>
          </ul>

          <h2>Timeline transparency</h2>
          <p>
            You know the listing date, the showing windows, the offer deadline, and the expected closing
            before the sign goes up. The listing stage runs at market speed: in September 2026,
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of Las Vegas single-family homes sold within 30 days. The stages before and after depend on
            attorney calendars, the buyer's lender, and any order the title company must record.
          </p>
          <p>
            The stage-by-stage breakdown is on the
            {' '}
            <Link href="/divorce-home-sale-timeline" className="text-blue-600 underline hover:text-blue-700">divorce home sale timeline</Link>
            {' '}
            page.
          </p>

          <h2>The escalation protocol</h2>
          <p>
            If a spouse cancels showings, misses a signing deadline, or withdraws from an agreed term,
            the event is logged with a date and both attorneys are notified the same day. The listing
            addendum's deadlines are enforced rather than renegotiated. If the pattern continues, the
            attorneys can ask the court to enforce the terms or appoint a neutral agent.
          </p>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            That rule in
            {' '}
            {NEVADA_LAW.communityPropertyCite}
            {' '}
            is why the court will enforce a listing that is priced from closed comparables and split
            evenly: it is the division the statute expects. More at
            {' '}
            <Link href="/one-spouse-wont-sell-house-divorce" className="text-blue-600 underline hover:text-blue-700">one spouse won't sell</Link>
            {' '}
            and
            {' '}
            <Link href="/court-ordered-home-sale" className="text-blue-600 underline hover:text-blue-700">court-ordered sales</Link>
            .
            {' '}
            {LEGAL_DISCLAIMER}
          </p>
        </div>

        <HighValueHomeNote points={[
          `Above ${LUXURY_2026.jumboThreshold2026}, buyer financing is jumbo and underwrites more slowly. The addendum should set a closing window that allows for it, or favor cash offers.`,
          'Custom homes in The Ridges, MacDonald Highlands, and Southern Highlands appraise with wide spread. Stage 1 should include a two-appraisal protocol so a low appraisal in stage 5 does not reopen the division.',
          'Guard-gated communities require pre-registered showings. The gate list belongs in the stage 2 addendum so access is never withheld by one spouse.',
          'Club memberships at Red Rock CC, DragonRidge, Anthem CC, and Summit Club need a transfer decision and fee allocation before the listing launches.',
          'Off-market or private exposure to a vetted buyer list is a stage 4 option at this tier. Both spouses sign off, because it trades portal reach for privacy.',
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Tell me where the case stands, who is on title, and which stage you are stuck on.' },
            { title: 'Stage 1 valuation', detail: 'A written analysis with comparables attached and a net sheet for each spouse.' },
            { title: 'Stage 2 addendum', detail: 'Price, showing rules, repair budget, deadlines, and signing authority, ready for both attorneys.' },
          ]}
          callPromise="You leave the call with a stage-by-stage plan both attorneys can read in five minutes."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
