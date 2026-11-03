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
import { RealScoutCondoListings } from '@/components/widgets/RealScoutCondoListings';
import { RealScoutFamilyHomes } from '@/components/widgets/RealScoutFamilyHomes';
import { CONTENT_LAST_UPDATED, toSchemaDateTime } from '@/lib/content-dates';
import { LEGAL_DISCLAIMER, LUXURY_2026, LVR_SEPT_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

const path = '/emotional-guide-selling-divorce';

type IEmotionalGuideProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const faqs = [
  {
    question: 'Do I have to be at the showings?',
    answer: 'No, and it is better if you are not. Buyers speak more freely in an empty house, and you are spared hearing strangers critique your kitchen. A lockbox with a showing-notice period in the listing agreement lets you leave for an hour. If you cannot leave, stay in one room with the door closed and let the agent handle questions.',
  },
  {
    question: 'How do I handle a spouse who keeps sabotaging the sale?',
    answer: 'Stop arguing with them and start documenting. A neutral listing agent records every refused showing, unanswered offer, and missed signature in a written status report to both attorneys. Your attorney can then ask the court to enforce the listing terms. The paper trail does the arguing so you do not have to.',
  },
  {
    question: 'Is it normal to feel worse after the offer comes in?',
    answer: 'Yes. An offer makes the sale real in a way a listing does not. Many sellers feel a wave of loss at acceptance, not at listing. Give yourself a day before responding to anything that is not time-sensitive, and let the agent and counsel handle the mechanics. The feeling passes; a rejected market-rate offer does not come back.',
  },
  {
    question: 'Should I tell the buyers why we are selling?',
    answer: 'No. Nevada requires disclosure of material facts about the property, not about you. Buyers who know a divorce is behind the sale negotiate harder on price and repairs. The listing agent answers that question with a professional non-answer every time. Keeping the divorce out of the transaction protects your net and your privacy.',
  },
  {
    question: 'What if I cannot bring myself to pack?',
    answer: 'Hire it out or break it into one room per day. Personal items, photographs, and children\'s belongings come out before the listing photos regardless, so the first pass is small and has a deadline. Many sellers find the memories live in the people, not the drywall, once the boxes are in the next home.',
  },
];

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Emotional Guide to Selling a Home in Divorce | Dr. Jan Duffy',
    description: 'How divorcing Las Vegas homeowners get through showings, offers, and moving day: 5 points where feelings cost money and the structure that protects you.',
    alternates: { canonical, languages },
  };
}

export default async function EmotionalGuide(props: IEmotionalGuideProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = path;
  const description = 'How divorcing Las Vegas homeowners get through showings, offers, and moving day: the points where feelings cost money and the structure that keeps the sale on track.';
  const articleSchema = generateArticleSchema(
    'Emotional Guide to Selling Your Home in Divorce',
    description,
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Home Sale Support Services',
    description,
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Emotional Guide to Selling Your Home in Divorce"
        heroSubhead="Where feelings cost money, and the structure that protects you"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How do I get through selling my home during a divorce?">
          Separate the decisions from the feelings by putting the decisions on paper first: the list price from closed sales, the reduction schedule, who pays what until closing, and how offers get answered. Then let a neutral agent and your attorney run the mechanics. Grief, anger, and second-guessing are normal; they cost money only when they drive a decision that should have been fixed in advance.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Sold within 30 days of listing, Sept 2026', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Available single-family listings', value: LVR_SEPT_2026.availableSfrListings },
          ]}
          source={LVR_SEPT_2026.source}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Why this sale feels different</h2>
          <p>
            A normal home sale has one household moving toward something. A divorce sale has two people moving apart, through a house that holds the years they spent together, on a timeline neither fully controls. The sale also sets the money each of you starts over with. That combination of loss, conflict, and stakes is why ordinary advice about staying positive does not help much.
          </p>
          <p>
            What helps is structure. When the price method, the reduction schedule, the carrying costs, and the offer process are fixed in writing before the sign goes up, the hard moments have a script. You do not have to negotiate with your spouse at the kitchen table about whether to drop the price; the listing agreement already says when and by how much.
          </p>

          <h2>The five points where feelings cost money</h2>
          <p>
            Most of the financial damage in a divorce sale happens at five predictable moments: setting the price, preparing the house, the first showings, the first offer, and the final walk-through. Each has an emotional pull in one direction and a market answer in the other. Knowing where they are lets you plan for them instead of being ambushed.
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Pricing.</strong>
              {' '}
              The pull is to price at what you need or what you paid. The market answer is the closed comparables. With
              {' '}
              {LVR_SEPT_2026.availableSfrListings}
              {' '}
              homes available, buyers have options.
            </li>
            <li>
              <strong>Preparing.</strong>
              {' '}
              The pull is to leave it as it is or to over-improve. The answer is a clean, depersonalized house and the repairs an inspector will flag.
            </li>
            <li>
              <strong>Showings.</strong>
              {' '}
              The pull is to be there, or to refuse. The answer is a lockbox, a notice period, and leaving for an hour.
            </li>
            <li>
              <strong>The first offer.</strong>
              {' '}
              The pull is to reject it because it makes the sale real. The answer is a net sheet and a comparison to closed sales.
            </li>
            <li>
              <strong>Walk-through and keys.</strong>
              {' '}
              The pull is to delay. The answer is a moving date set the day the contract is signed.
            </li>
          </ul>

          <h2>Living in the house while it sells</h2>
          <p>
            Vacant, staged homes tend to show better, but three housing payments can strain both budgets, so one spouse often stays. That works when the terms are written: who pays the mortgage, taxes, insurance, and HOA until closing, what notice showings require, and that the house stays show-ready. Without those terms, every showing becomes a negotiation.
          </p>
          <p>
            If you are the one staying, take the personal items down before photographs: family pictures, children's artwork, anything that tells a buyer who lived here. It is painful for a day and then it is done. If you are the one who moved out, resist the urge to inspect the house before every showing. The agent's written status report tells you what you need to know.
          </p>

          <h2>When your spouse will not cooperate</h2>
          <p>
            A spouse who refuses showings, ignores offers, or will not sign a price change is trying to control the one thing left to control. Arguing with them rarely works. Documenting them does. A neutral listing agent records every refusal and missed signature in a written status report to both attorneys, and your attorney can ask the family court to enforce the listing terms.
          </p>
          <p>
            That is why the listing agreement should carry authority language from the start: both spouses sign, reductions follow a schedule, any offer at or above a named floor must be accepted, and access terms are fixed. When those exist, obstruction becomes a short motion with exhibits rather than a new fight. See
            {' '}
            <Link href="/one-spouse-wont-sell-house-divorce" className="text-blue-600 underline hover:text-blue-700">one spouse won't sell</Link>
            {' '}
            and
            {' '}
            <Link href="/court-ordered-home-sale" className="text-blue-600 underline hover:text-blue-700">court-ordered home sale</Link>
            .
          </p>

          <h2>Keeping the divorce out of the transaction</h2>
          <p>
            Buyers will ask why you are selling. They are not entitled to an answer, and giving one costs money, because buyers who know a divorce is behind a sale negotiate harder. Nevada requires disclosure of material facts about the property, not about the sellers. The listing agent fields the question with a professional non-answer every time.
          </p>
          <p>
            Practical privacy steps: a Coming Soon period on the MLS before full exposure, no yard sign at first, personal items out before photos, and direct outreach to agents active in your area. For homes in guard-gated communities, showings run through the gate's guest list, which limits foot traffic on its own. Your affairs stay yours.
          </p>

          <h2>After the sale</h2>
          <p>
            Net proceeds are disbursed per the decree or held in escrow until it issues.
            {' '}
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            (
            {NEVADA_LAW.communityPropertyCite}
            ). On taxes,
            {' '}
            {NEVADA_LAW.capitalGainsExclusion}
            {' '}
            {LEGAL_DISCLAIMER}
          </p>
          <p>
            Then there is the next place. Many clients find that choosing the next home, even a rental for a year, gives the sale a direction it lacked. Some include their children in that choice so they have a voice in where they land. The house you are leaving held a chapter; the next one is where the new one starts. Support from a therapist, friends, and family through the move is not a luxury.
          </p>
        </div>

        <HighValueHomeNote
          title="Selling an estate during divorce"
          points={[
            'Privacy is the first emotional issue at the top tier: off-market exposure to a vetted buyer pool and guard-gated showing rules keep neighbors, club members, and business contacts out of the sale.',
            'Custom homes take longer to sell than tract homes and draw more cash buyers; a longer marketing period is normal, not a verdict on your decisions.',
            `A buyout above ${LUXURY_2026.jumboThreshold2026} depends on jumbo underwriting; decide whether to keep the home only after a lender has confirmed qualification in writing.`,
            'Club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, and The Summit Club carry their own social weight; settle who keeps the membership before the listing, not at closing.',
            'Two appraisers can disagree by six figures on an estate; a two-appraisal protocol agreed in advance keeps the value argument out of the kitchen.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Fifteen minutes on the property, where the case stands, and which of the five moments is closest.' },
            { title: 'Plan on paper', detail: 'Price method, reduction schedule, carrying terms, and offer process drafted for both spouses and both counsel.' },
            { title: 'Hands-off sale', detail: 'A neutral listing with written status reports to both attorneys, so you can step back from the mechanics.' },
          ]}
          callPromise="You leave the call with a plan that does not depend on your spouse's mood."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
      <RealScoutCondoListings />
      <RealScoutFamilyHomes />
    </>
  );
}
