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

type IStagingProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-home-staging';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Divorce Home Staging Tips for Las Vegas | Dr. Jan Duffy',
    description: 'Stage a marital home for sale while one spouse still lives there, with a 2-hour showing notice, plus what $1M+ homes need: staging, twilight photos, gate lists.',
    alternates: { canonical, languages },
  };
}

const faqs: PageFAQItem[] = [
  {
    question: 'Is staging worth it in a divorce sale?',
    answer: 'Usually for the main rooms, and almost always above $1 million. Staged homes photograph better, and the photographs decide which homes get showings. In September 2026, 53.4% of Las Vegas single-family homes sold within 30 days; well-presented homes lead that group. Partial staging of the living room, kitchen, and primary bedroom captures most of the benefit.',
  },
  {
    question: 'Can we stage around furniture if one spouse is still living there?',
    answer: 'Yes. Stagers routinely work with what is in the home, removing a third of it, rearranging the rest, and adding art, lamps, and linens. The resident spouse keeps a bedroom and a bathroom functional and private. Agree on which rooms are staged and which are off limits before the stager arrives.',
  },
  {
    question: 'What should the spouse living in the home do during showings?',
    answer: 'Leave. Buyers talk freely in an empty house and linger longer, and a seller in the next room shortens showings. Set a notice period, two hours is common, and keep a bag and a plan for where to go. The listing agent confirms every appointment so the resident spouse is never surprised.',
  },
  {
    question: 'Should we remove all photographs of the family?',
    answer: 'Remove personal photographs and anything that identifies either spouse by name. Buyers should picture their own life in the rooms, and a wall of personal photographs makes that harder. It also protects your privacy during a divorce, since buyers and their agents photograph everything they see.',
  },
  {
    question: 'Who pays for staging when we are divorcing?',
    answer: 'The decree or stipulation if it addresses it; otherwise agree in writing to split the cost or deduct it from proceeds at closing. Keep the invoice for the settlement statement. Staging contracts usually run 60 to 90 days with a monthly extension, so time the install to the photography date.',
  },
];

export default async function HomeStaging(props: IStagingProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/divorce-home-staging';
  const articleSchema = generateArticleSchema(
    'Divorce Home Staging Tips for Las Vegas',
    'How to stage a marital home for sale during a divorce, including showings while one spouse still lives there and what homes above $1 million need.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Home Staging Guidance for Divorce Sales',
    'Staging and showing guidance for selling a Las Vegas home during divorce, including occupied-home showings and luxury presentation.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, faqSchema, realEstateAgentSchema]} />
      <DivorcePageTemplate
        h1="Divorce Home Staging Tips for Las Vegas"
        heroSubhead="Presentation that works with one spouse in residence, and what the top tier expects"
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
        currentPath={currentPath}
      >
        <DirectAnswer question="How do we stage a home for sale during a divorce?">
          Remove personal photographs, paperwork, and a third of the furniture, paint the main rooms one
          neutral color, and stage the living room, kitchen, and primary bedroom. If one spouse still lives
          there, keep one bedroom and bath private, set a two-hour showing notice, and have the listing
          agent confirm every appointment. Above $1 million, add full staging and twilight photography.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Homes sold within 30 days', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'The Ridges median days on market, 12 months', value: COMMUNITY_12MO.theRidges.medianDom },
            { label: 'Red Rock CC median days on market, 12 months', value: COMMUNITY_12MO.redRockCountryClub.medianDom },
          ]}
          source={`${LVR_SEPT_2026.source}; ${COMMUNITY_12MO.source}`}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Why staging matters more in a divorce sale</h2>
          <p>
            A divorce sale usually has a deadline, and staging is the fastest lever on days on market.
            Photographs decide which homes get showings, and staged rooms photograph better. Staging also
            removes the visible signs of a household in transition, such as half-empty closets and a
            missing dining table, that tell buyers the sellers are motivated and invite low offers.
          </p>
          <p>
            Buyers in Las Vegas compare every resale against new model homes in Summerlin and Henderson
            that are staged to the last towel. A resale that looks lived-in loses that comparison. The
            goal is not to hide that the home is occupied; it is to make the rooms read as space the
            buyer can use.
          </p>

          <h2>The three staging moves that pay</h2>
          <p>
            Depersonalize, neutralize, and edit. Remove anything that names or pictures either spouse.
            Paint bold rooms one warm neutral. Take out a third of the furniture so rooms feel larger and
            traffic flows. Those three steps cost little and change the photographs more than any remodel.
            Professional staging adds art, lamps, and linens on top.
          </p>
          <ul>
            <li>
              <strong>Depersonalize.</strong>
              {' '}
              Personal photographs, monogrammed items, mail, awards, and every piece of paper from the
              case go into storage. Buyers open drawers.
            </li>
            <li>
              <strong>Neutralize.</strong>
              {' '}
              One paint color through the main rooms, white or off-white linens, and bulbs at the same
              color temperature in every fixture.
            </li>
            <li>
              <strong>Edit.</strong>
              {' '}
              Remove oversized pieces, extra chairs, and anything blocking a window or a view. Closets at
              half full, counters clear.
            </li>
            <li>
              <strong>Highlight.</strong>
              {' '}
              Stage toward the home's best feature: the pool, the mountain view, the great room. Furniture
              faces the feature, not the television.
            </li>
          </ul>

          <h2>Staging and showing a home one spouse still lives in</h2>
          <p>
            Most divorce sales happen with one spouse in residence, and that works when the rules are
            written down. Agree on which rooms are staged and which stay private, usually one bedroom and
            one bath. Set a showing notice period, two hours is common, and a daily readiness standard.
            The listing agent confirms every appointment; the other spouse never does.
          </p>
          <p>
            The resident spouse leaves during showings. Buyers linger longer and speak freely in an empty
            house, and a seller in the next room shortens the visit. Keep a show-ready kit by the door: a
            basket for clutter, a bag for pet items, a lamp timer for evening showings. Decide in advance
            whether open houses are allowed; many resident spouses prefer scheduled showings only.
          </p>
          <ol>
            <li>Rooms staged and rooms private, listed in one email both attorneys receive.</li>
            <li>Notice period for showings, with a daily window when no showings are allowed.</li>
            <li>Where the resident spouse goes during showings, and who handles pets.</li>
            <li>Lockbox or escorted showings, and the gate access process if the community is guarded.</li>
            <li>Feedback sent to both spouses at the same time, in writing.</li>
          </ol>
          <p>
            Staying in the home can hold down housing costs during the case, since one household is not
            paying a mortgage and a separate rent. The
            {' '}
            <Link href="/divorce-real-estate-guide-divorcing-couples">guide for divorcing couples</Link>
            {' '}
            covers who pays what while the home is listed.
          </p>

          <h2>What homes above $1 million need</h2>
          <p>
            Above $1 million, presentation is not optional. Buyers expect full professional staging of the
            living spaces, primary suite, and outdoor rooms, twilight photography that shows the Strip or
            mountain view, drone and video, and a measured floor plan. In guard-gated communities, showings
            also need a gate access list and a pre-approval or proof of funds before confirmation.
          </p>
          <ul>
            <li>
              <strong>Professional staging.</strong>
              {' '}
              Full stage for vacant homes; a designer edit with rented art and accessories for occupied
              ones. Contracts run 60 to 90 days.
            </li>
            <li>
              <strong>Twilight photography.</strong>
              {' '}
              Pool lighting, landscape lighting, and view corridors read only at dusk. Schedule a second
              session for twilight.
            </li>
            <li>
              <strong>Guard-gated access.</strong>
              {' '}
              The Ridges, Red Rock Country Club, MacDonald Highlands, Anthem Country Club, and Southern
              Highlands require names at the gate. The listing agent maintains the list and screens buyers
              before adding them.
            </li>
            <li>
              <strong>Private exposure.</strong>
              {' '}
              Off-market showings to qualified buyers before the MLS protect privacy during a divorce.
              They require both spouses' written consent.
            </li>
          </ul>
          <p>
            Over the last twelve months, homes in The Ridges took a median of
            {' '}
            {COMMUNITY_12MO.theRidges.medianDom}
            {' '}
            days to sell and homes in Red Rock Country Club a median of
            {' '}
            {COMMUNITY_12MO.redRockCountryClub.medianDom}
            . Presentation is a large part of the difference between the fast half and the slow half.
          </p>

          <h2>Timing the stage to the photography</h2>
          <p>
            Staging goes in after repairs and cleaning, and photography follows within two days. Both
            spouses approve the photographs and the listing description before the home goes live. For
            occupied homes, the stager returns before photography to reset the rooms, then the resident
            spouse keeps the standard until closing.
          </p>
          <p>
            The
            {' '}
            <Link href="/preparing-home-sale-divorce">preparation page</Link>
            {' '}
            covers the repair list and the launch schedule that lead up to staging day.
          </p>
        </div>

        <HighValueHomeNote points={[
          'Full professional staging with designer furniture is the norm above $1 million. Budget for a 90-day contract timed to the photography date, and decide in the stipulation who pays.',
          'Twilight photography, drone, cinematic video, and a floor plan are expected by buyers and their agents at this tier. View lots in The Ridges and MacDonald Highlands sell on the twilight shot.',
          'Guard-gated showings need a maintained gate list, screened buyers, and escorted visits. Lockbox showings are rarely allowed, so the listing agent attends each one.',
          `Appraisers on custom homes rely on condition and finish quality. Loans above ${LUXURY_2026.jumboThreshold2026} are jumbo, and a well-presented home helps the appraisal match the contract price.`,
          'Private, off-market exposure to qualified buyers protects privacy during a divorce. It needs both spouses\' written consent and a clear plan for when the MLS listing follows.',
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Fifteen minutes on who is living in the home, the price tier, and the target photography date.' },
            { title: 'Walkthrough and staging plan', detail: 'Rooms to stage, rooms to keep private, and a stager referral matched to the price tier.' },
            { title: 'Showing rules', detail: 'Notice period, access process, and feedback routine written and sent to both attorneys.' },
            { title: 'Photography and launch', detail: 'Daytime and twilight sessions, both spouses approve, listing live.' },
          ]}
          callPromise="You leave the call with a staging plan, a showing routine, and a photography date."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
