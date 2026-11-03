import type { Metadata } from 'next';
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

const path = '/home-did-not-sell-during-divorce';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Home Didn\'t Sell During Divorce? Next Steps | Dr. Jan Duffy',
    description: `Relist an expired divorce listing with a market price, fixed access, and decree-aligned terms. ${LVR_SEPT_2026.soldWithin30DaysPct} of Las Vegas homes sold within 30 days in September 2026.`,
    alternates: { canonical, languages },
  };
}

export default async function HomeDidNotSellDuringDivorce(props: PageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/home-did-not-sell-during-divorce';

  const faqs = [
    {
      question: 'Why did our home not sell during the divorce?',
      answer: 'Usually one of four reasons: the price was set to a buyout number instead of the market, one spouse controlled or blocked showings, the marketing was thin, or the contract terms did not match the decree. Pull the MLS history and showing feedback; the cause is almost always visible there.',
    },
    {
      question: 'Should we relist right away or wait?',
      answer: `Relist once the cause is fixed, not before. In September 2026, ${LVR_SEPT_2026.soldWithin30DaysPct} of Las Vegas single-family homes sold within 30 days, so a correctly priced home with open access moves. Waiting adds carrying costs for both spouses and rarely improves the price.`,
    },
    {
      question: 'Do we need a new listing agreement?',
      answer: 'Yes. The expired agreement ends, and a new one needs both signatures or the court\'s authority. Use the relaunch to add an addendum covering price, showing windows, repair budget, decision deadlines, and signing authority, so the second listing does not fail for the same reason as the first.',
    },
    {
      question: 'What if one spouse wants to cancel and the other wants to relist?',
      answer: 'Document every offer, feedback note, and repair request from the first listing. That record supports a motion asking the court to order the relisting, set the price, and appoint a neutral agent if needed. A deferred-sale agreement with a fixed exit date is the middle ground.',
    },
    {
      question: 'Does a failed listing change how proceeds are split?',
      answer: `${NEVADA_LAW.communityPropertyRule} A failed listing does not change that. A court can order reimbursement for carrying costs one spouse paid while the home sat, if it writes down the reason, so keep the payment records.`,
    },
    {
      question: 'How is relisting different above $1 million?',
      answer: `Above ${LUXURY_2026.jumboThreshold2026}, the buyer pool is smaller, financing is jumbo, and appraisals spread. A relaunch at this tier often means a two-appraisal price, pre-registered guard-gate showings, and private exposure to a vetted buyer list before public portals.`,
    },
  ];

  const articleSchema = generateArticleSchema(
    'What to Do When Your Home Didn\'t Sell During Divorce',
    'Why divorce listings expire, what to audit before relisting, and how to relaunch with a market price, fixed access, and terms that match the decree.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Expired Listing Relaunch',
    'Relisting strategy and neutral representation for Las Vegas divorce listings that expired or were withdrawn.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Home Didn't Sell During Divorce? How to Relist"
        heroSubhead="Find the cause in the MLS record, fix it in writing, and relaunch once"
        showHomeValue
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="What should I do if my home did not sell during the divorce?">
          Pull the MLS history, showing log, and feedback to find the cause: price set to a buyout
          number, blocked showings, thin marketing, or terms that did not match the decree. Fix that
          cause in a new listing addendum both spouses sign, reprice from closed comparables, refresh
          the marketing, and relaunch. Document everything in case the court must compel cooperation.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, September 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Homes sold within 30 days of listing', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Available single-family listings', value: LVR_SEPT_2026.availableSfrListings },
          ]}
          source={LVR_SEPT_2026.source}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Why divorce listings fail the first time</h2>
          <p>
            Divorce listings fail for different reasons than ordinary ones. The price is set to satisfy
            a negotiation between spouses instead of buyers. Showing access depends on the spouse who
            lives there. Updates reach one spouse before the other, and decisions stall. Court deadlines
            add pressure without adding buyers. The MLS record usually shows which one it was.
          </p>
          <ul>
            <li>
              <strong>Chasing the market down:</strong>
              {' '}
              listed high to win a spouse's agreement, then reduced too late and too little.
            </li>
            <li>
              <strong>Fragmented communication:</strong>
              {' '}
              missed updates between spouses, attorneys, and the agent, so offers expired unanswered.
            </li>
            <li>
              <strong>Blocked access:</strong>
              {' '}
              cancelled showings, an unpresentable home, or a yard sign refused.
            </li>
            <li>
              <strong>Weak marketing:</strong>
              {' '}
              phone photos, no floor plan, no video, and no agent preview.
            </li>
            <li>
              <strong>Decree friction:</strong>
              {' '}
              inspection responses, repairs, or possession dates that conflicted with the order.
            </li>
          </ul>

          <h2>What to audit before relisting</h2>
          <p>
            Before a new agreement is signed, review five records: the MLS history with every price
            change and days on market, the showing log and feedback, every offer received and how it was
            answered, the marketing assets, and the decree or stipulation terms that touch the sale.
            The relaunch plan is written from what those records show.
          </p>
          <ol>
            <li>MLS history: list price, each reduction, days on market, and cumulative days.</li>
            <li>Showing log and feedback, including every cancellation and who cancelled.</li>
            <li>Offers received, the net to each spouse, and why each was declined or lost.</li>
            <li>Photos, floor plan, video, description, and where the listing was syndicated.</li>
            <li>Decree, stipulation, or order terms: deadlines, possession, repairs, and signing authority.</li>
          </ol>
          <p>
            Then meet with your attorney to confirm what the relisting may change and what it may not.
            Some orders fix the price or the agent, and those need a motion to amend before relaunch.
          </p>

          <h2>The relaunch plan</h2>
          <p>
            Reprice from closed comparables in the same community and size band, not from the last list
            price minus a little. Fix access in writing with showing windows the occupying spouse can
            honor. Replace the marketing. And put price, access, repairs, deadlines, and signing
            authority in a new addendum so the second listing cannot fail the way the first did.
          </p>
          <div className="not-prose grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-6">
              <h3 className="mb-2 text-xl font-semibold">Pricing and positioning</h3>
              <p>
                Closed comparables, not the buyout number. A pre-listing inspection so repairs are
                priced in, not negotiated twice. Reductions, if needed, on a written schedule tied to
                showing counts rather than to court dates.
              </p>
            </div>
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-6">
              <h3 className="mb-2 text-xl font-semibold">Marketing relaunch</h3>
              <p>
                New photography after depersonalizing, a floor plan, video, an agent preview, and a
                description built on square footage, lot, upgrades, and HOA terms. Nothing about the
                owners. A Coming Soon window if you want a quieter start.
              </p>
            </div>
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-6">
              <h3 className="mb-2 text-xl font-semibold">Access and communication</h3>
              <p>
                Showing windows in the addendum, a date-stamped log, and every update sent to both
                spouses and both attorneys in one message. Offers summarized on one page with the net to
                each spouse and a response deadline.
              </p>
            </div>
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-6">
              <h3 className="mb-2 text-xl font-semibold">Decree alignment</h3>
              <p>
                Acceptable concessions, repair budget, possession date, and escrow instructions agreed
                before launch and matched to the decree or order. Move-out and proceeds distribution
                planned so closing does not collide with settlement terms.
              </p>
            </div>
          </div>

          <h2>Pricing the second listing</h2>
          <p>
            In September 2026, Las Vegas REALTORS® reported a
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            {' '}
            single-family median with
            {' '}
            {LVR_SEPT_2026.availableSfrListings}
            {' '}
            homes available, and
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of sales closed within 30 days of listing. That is the market a relisted home competes in.
            A price from closed comparables draws offers in the first weeks; a price from the first
            listing's history draws the same silence.
          </p>
          <p>
            Pre-listing work that pays on a relaunch: pool and HVAC service records, a clean HOA account
            statement, and a pre-listing inspection on older homes. Buyers who see a listing that
            expired once look harder for the reason. Remove the reason before they look.
          </p>

          <h2>When you are stuck between spouses</h2>
          <p>
            If one spouse wants to cancel and the other wants to relist, the first listing's record is
            your evidence. Every offer, feedback note, cancelled showing, and repair request shows the
            court why the home did not sell and what the relisting needs. A neutral agent can carry the
            relaunch while the attorneys sort out the order.
          </p>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            A listing that sits costs both spouses carrying costs the court may later reallocate, so
            keep payment records. Related reading:
            {' '}
            <Link href="/one-spouse-wont-sell-house-divorce" className="text-blue-600 underline hover:text-blue-700">one spouse won't sell</Link>
            ,
            {' '}
            <Link href="/court-ordered-home-sale" className="text-blue-600 underline hover:text-blue-700">court-ordered home sales</Link>
            ,
            {' '}
            <Link href="/divorce-home-sale-timeline" className="text-blue-600 underline hover:text-blue-700">the divorce home sale timeline</Link>
            , and the
            {' '}
            <Link href="/divorce-home-sale-checklist" className="text-blue-600 underline hover:text-blue-700">divorce home sale checklist</Link>
            .
            {' '}
            {LEGAL_DISCLAIMER}
          </p>
        </div>

        <HighValueHomeNote points={[
          `Above ${LUXURY_2026.jumboThreshold2026}, the buyer pool is smaller and financing is jumbo. A relaunch should set a closing window that allows for jumbo underwriting or favor cash offers.`,
          'Custom homes in The Ridges, MacDonald Highlands, and Red Rock Country Club often expire because the first price came from one appraisal. Reprice from two appraisals and the closed comparables.',
          'Guard-gated showings need pre-registered names. If access was the problem the first time, the new addendum should set the gate list and lockbox authority.',
          'Club memberships at Red Rock CC, DragonRidge, Anthem CC, and Summit Club should be resolved before relaunch: transfer or surrender, and who pays the fee.',
          'Private exposure to a vetted buyer list before public portals can relaunch a top-tier home without the days-on-market history following it.',
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Send the expired listing\'s MLS history and any order. We find the cause together.' },
            { title: 'Relisting audit', detail: 'A written review of price, access, marketing, and decree terms, with the fix for each.' },
            { title: 'Relaunch addendum', detail: 'Price, showing windows, repair budget, deadlines, and signing authority for both attorneys to approve.' },
          ]}
          callPromise="You leave the call knowing why the first listing failed and what the second one changes."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
