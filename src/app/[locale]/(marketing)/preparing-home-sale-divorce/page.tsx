import type { Metadata } from 'next';
import type { PageFAQItem } from '@/components/divorce/PageFAQ';
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

type IPreparingProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/preparing-home-sale-divorce';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Preparing a Home for Sale During Divorce | Dr. Jan Duffy',
    description: 'Prepare a marital home for sale in 3 weeks: one agreed repair list, assigned costs, depersonalized rooms, and a showing routine with one spouse still home.',
    alternates: { canonical, languages },
  };
}

const faqs: PageFAQItem[] = [
  {
    question: 'Who pays for repairs and staging when we are divorcing?',
    answer: 'Whatever the decree or stipulation says. If it is silent, the usual arrangement is to split costs equally or to pay them from escrow at closing and deduct them before the proceeds are divided. Agree on the list and the payment method in writing before any work starts, and keep receipts for the settlement statement.',
  },
  {
    question: 'How much should we fix before listing?',
    answer: 'Fix what an inspector will flag and what a photograph will show: roof leaks, water heaters past their life, broken fixtures, scuffed paint, and dead landscaping. Skip kitchen and bath remodels; they rarely return their cost in a divorce timeline. A pre-listing inspection for a few hundred dollars shows you the list a buyer will see.',
  },
  {
    question: 'Should the spouse living in the home move out before listing?',
    answer: 'Not necessarily. Vacant homes show more easily but can look cold and cost double housing. If one spouse stays, agree on a readiness standard, a notice period for showings, and where that spouse goes during them. Many sales succeed with one spouse in residence when the routine is written down.',
  },
  {
    question: 'How long does preparation take?',
    answer: 'One to three weeks for most homes once the repair list is agreed. Painting and flooring add a week. Full staging takes two to three days to install after repairs. The slow part is usually the decision, not the work, so settle the list in one walkthrough with the agent and both spouses.',
  },
  {
    question: 'What should be removed from the home before showings?',
    answer: 'Personal photographs, mail, prescriptions, valuables, firearms, and every document from the divorce case. Buyers open drawers and closets. Court filings left on a counter tell a buyer the sellers are motivated, which costs you at the negotiating table. Box those items and store them off site.',
  },
];

export default async function PreparingHomeSale(props: IPreparingProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/preparing-home-sale-divorce';
  const articleSchema = generateArticleSchema(
    'Preparing a Home for Sale During Divorce',
    'How divorcing spouses prepare a Las Vegas home for sale: the agreed repair list, cost assignment, depersonalizing, staging decisions, and a showing routine when one spouse remains.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Home Preparation for Divorce Sales',
    'Guidance on preparing a marital home for sale during a Las Vegas divorce, from the repair list to photography.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, faqSchema, realEstateAgentSchema]} />
      <DivorcePageTemplate
        h1="Preparing a Home for Sale During Divorce"
        heroSubhead="One repair list, assigned costs, and a routine that works with one spouse in residence"
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
        showHomeValue
        currentPath={currentPath}
      >
        <DirectAnswer question="How do we prepare the house for sale while divorcing?">
          Walk the home once with the agent and both spouses, agree on a single repair list, and assign
          each cost in writing. Fix what an inspector or a camera will catch, skip remodels, remove personal
          items and court paperwork, and decide on staging. If one spouse stays, set a readiness standard
          and a showing notice period. Most homes are photo-ready in one to three weeks.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Homes sold within 30 days', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Available single-family listings', value: LVR_SEPT_2026.availableSfrListings },
            { label: 'Summerlin median days on market, 12 months', value: COMMUNITY_12MO.summerlinFourZips.medianDom },
          ]}
          source={`${LVR_SEPT_2026.source}; ${COMMUNITY_12MO.source}`}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Agree on one list before any work starts</h2>
          <p>
            The preparation phase stalls when two people make two lists. Do one walkthrough with the
            listing agent and both spouses, in person or on video, and leave with a single repair list,
            a cost next to each line, and a name next to each cost. Put it in an email both attorneys
            receive. From then on, the list is the plan.
          </p>
          <p>
            A pre-listing inspection is the cheapest way to settle arguments about what needs fixing. The
            inspector's report becomes the list, and neither spouse is accused of padding it. With nearly
            {' '}
            {LVR_SEPT_2026.availableSfrListings}
            {' '}
            single-family homes available in September 2026, buyers have choices, and a home with a
            clean report competes better than one with deferred repairs priced in.
          </p>

          <h2>Repairs that pay and repairs that do not</h2>
          <p>
            Fix what a buyer's inspector will write up and what a photograph will show. Roof leaks, aging
            water heaters, HVAC that does not cool, broken fixtures, and worn paint all cost more in
            credits later than in repairs now. Kitchen and bath remodels rarely return their cost inside a
            divorce timeline. Spend on the items below and stop.
          </p>
          <ul>
            <li>
              <strong>Paint.</strong>
              {' '}
              Scuffed walls and bold colors cost showings. One neutral color through the main rooms.
            </li>
            <li>
              <strong>Flooring.</strong>
              {' '}
              Stretch or clean carpet; replace only what is stained or torn.
            </li>
            <li>
              <strong>Mechanical.</strong>
              {' '}
              Service the HVAC and water heater and keep the invoices for the disclosure.
            </li>
            <li>
              <strong>Exterior.</strong>
              {' '}
              Desert landscaping trimmed, drip lines working, pool serviced and clear, garage door
              operating.
            </li>
            <li>
              <strong>Small fixes.</strong>
              {' '}
              Leaking faucets, cracked outlet covers, missing screens, burned-out bulbs. A handyman day.
            </li>
          </ul>
          <p>
            Skip remodels, new appliances unless one is dead, and anything that takes more than two weeks.
            Price adjustments cover the rest faster than construction does.
          </p>

          <h2>Depersonalize, including the divorce itself</h2>
          <p>
            Buyers should see a house, not a household in transition. Remove personal photographs, mail,
            prescriptions, valuables, and every piece of paper from the case. A decree on the kitchen
            counter tells a buyer the sellers need to close, and that costs money in negotiation. Box
            those items and store them off site before photography.
          </p>
          <ul>
            <li>Clear counters, nightstands, and the refrigerator door.</li>
            <li>Thin closets to half full so storage reads as ample.</li>
            <li>Remove one third of the furniture from each room if it is crowded.</li>
            <li>Put away anything that names either spouse: monogrammed items, mail, awards.</li>
            <li>Lock the court file, financial statements, and any attorney correspondence in a car or office.</li>
          </ul>

          <h2>When one spouse still lives in the home</h2>
          <p>
            A sale can succeed with one spouse in residence if the routine is written down. Agree on a
            daily readiness standard, a showing notice period such as two hours, and where the resident
            spouse goes during showings. The listing agent, not the other spouse, confirms every
            appointment. Feedback goes to both spouses at the same time, in writing.
          </p>
          <p>
            Keep a show-ready kit by the door: a laundry basket for clutter, a bag for pet items, and a
            lamp timer so the home is lit for evening showings. Decide in advance whether open houses are
            allowed; many resident spouses prefer scheduled showings only. The
            {' '}
            <Link href="/divorce-home-staging">staging page</Link>
            {' '}
            covers the presentation side in more detail.
          </p>

          <h2>Photography and the launch date</h2>
          <p>
            Photography is the deadline everything else works toward. Book it only after repairs and
            staging are done, because reshoots cost a week. Both spouses approve the photographs and the
            listing description before the home goes live. For homes above $1 million, add twilight
            photography, drone, video, and a floor plan; buyers at that tier expect them.
          </p>
          <ol>
            <li>Repairs complete and receipts filed.</li>
            <li>Staging installed and personal items removed.</li>
            <li>Photography, with twilight and drone where the price warrants.</li>
            <li>Both spouses approve photos, description, and showing rules.</li>
            <li>Listing goes live on a Thursday for a weekend of showings.</li>
          </ol>
          <p>
            The home value widget below gives a starting range. Dr. Jan then walks the home with both of
            you and turns the list above into dates and assigned costs.
          </p>
        </div>

        <HighValueHomeNote points={[
          'Above $1 million, professional staging of the main living spaces, primary suite, and outdoor living areas is the norm. Buyers compare against model homes in Summerlin and Henderson that are staged to the last towel.',
          'Twilight photography, drone, cinematic video, and a measured floor plan are standard at this tier. Strip and mountain views need twilight shots to read on screen.',
          'Guard-gated communities such as The Ridges, Red Rock Country Club, and MacDonald Highlands require a gate access list for photographers, stagers, and contractors as well as buyers. The listing agent manages it.',
          `Custom finishes complicate appraisal. Loans above ${LUXURY_2026.jumboThreshold2026} are jumbo, and the buyer's appraiser will need the receipts and permits for major work, so collect them during preparation.`,
          'Decide early whether to expose the home privately before the MLS. Off-market showings to qualified buyers protect privacy during a divorce, but they need both spouses\' written consent.',
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Fifteen minutes on who is living in the home, what the court allows, and the target listing date.' },
            { title: 'Walkthrough', detail: 'One visit with both spouses, or two separate visits, producing one repair list with costs assigned.' },
            { title: 'Preparation schedule', detail: 'Repairs, staging, and photography on a calendar both attorneys receive.' },
            { title: 'Launch', detail: 'Photos and description approved by both spouses, showing rules set, listing live.' },
          ]}
          callPromise="You leave the call with a repair list, a launch date, and the showing routine agreed."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
