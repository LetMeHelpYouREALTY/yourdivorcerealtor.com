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
import { COMMUNITY_12MO, LEGAL_DISCLAIMER, LUXURY_2026, LVR_SEPT_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';
import { BROKERAGE_NAME, REAL_ESTATE_LICENSE_NV } from '@/lib/site-contact';

type IAboutProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/about';

const aboutFaqs = [
  {
    question: 'Does Dr. Jan Duffy represent one spouse or both?',
    answer: 'On a listing, she acts as a neutral for both spouses, with written consent and the disclosures Nevada requires. Both parties receive the same offers, the same market updates, and the same deadlines on the same day. When the court appoints her, she reports to the court and follows the order as written.',
  },
  {
    question: 'What does a Certified Divorce Real Estate Expert actually do differently?',
    answer: 'The CDRE training covers how a listing fits inside a family law case: decree language that controls the sale, sign-off deadlines, escrow instructions both attorneys approve, and what to do when one party stops cooperating. A standard listing has none of that. The training also covers testimony on value when a judge needs it.',
  },
  {
    question: 'Does the practice handle homes above $1 million?',
    answer: `Yes. The practice covers The Ridges, The Summit Club, Red Rock Country Club, MacDonald Highlands, Anthem Country Club, Southern Highlands Golf Club, Lake Las Vegas, and the Strip high-rises. In 2025 Las Vegas recorded ${LUXURY_2026.sales1MPlus2025} sales above $1 million, and the work at that tier involves jumbo underwriting, appraisal spread, club memberships, and guard-gated showing rules.`,
  },
  {
    question: 'Will Dr. Jan Duffy give legal or tax advice?',
    answer: 'No. She provides valuations, equity math, options analysis, and transaction management. Questions about decree language, custody, support, or taxes go to your family law attorney and CPA. She coordinates with both so the real estate pieces line up with the legal ones.',
  },
  {
    question: 'How does the first call work?',
    answer: 'A private 15-minute call, by phone or video. You describe where the case stands, who is on title and on the loan, and what you need from the house. You leave with a value range, your realistic options, and the single next decision. There is no fee for the call.',
  },
];

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Las Vegas Divorce Real Estate Specialist | Dr. Jan Duffy',
    description: 'Dr. Jan Duffy, Certified Divorce Real Estate Expert with Berkshire Hathaway HomeServices Nevada Properties: neutral listings, buyouts, and court-ordered sales.',
    alternates: { canonical, languages },
  };
}

export default async function About(props: IAboutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const articleSchema = generateArticleSchema(
    'About Dr. Jan Duffy, Las Vegas Divorce Real Estate Specialist',
    'Credentials, approach, and luxury practice of Dr. Jan Duffy, Certified Divorce Real Estate Expert in Las Vegas and Henderson.',
    getCanonicalSiteUrl(path, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Real Estate Consultation',
    'Neutral divorce real estate services in Las Vegas and Henderson: valuation, listing, buyout coordination, and court-ordered sales.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(aboutFaqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Dr. Jan Duffy, Las Vegas Divorce Real Estate Specialist"
        heroSubhead="A neutral, court-aware agent for the marital home, from tract homes to guard-gated estates."
        currentPath={path}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="Who is Dr. Jan Duffy?">
          Dr. Jan Duffy is a Certified Divorce Real Estate Expert and REALTOR® with
          {' '}
          {BROKERAGE_NAME}
          , based at the Family Courts and Services Center in Las Vegas. She values, lists, and transfers marital homes as a
          neutral for both spouses and their attorneys, including court-appointed sales. Her practice runs from
          {' '}
          {LVR_SEPT_2026.medianSfrPrice}
          {' '}
          median homes to the valley's guard-gated enclaves and Strip high-rises.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Single-family homes sold, Sept 2026', value: LVR_SEPT_2026.sfrUnitsSold },
            { label: 'Closings above $1M, Sept 2026', value: LUXURY_2026.closingsAbove1MSept2026 },
            { label: '2026 jumbo loan line, Clark County', value: LUXURY_2026.jumboThreshold2026 },
          ]}
          source={`${LVR_SEPT_2026.source}; ${LUXURY_2026.sept2026Source}; ${LUXURY_2026.jumboSource}`}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Why a divorce listing needs its own specialist</h2>
          <p>
            A standard listing assumes one decision-maker who wants the sale to close. A divorce listing has two owners,
            two attorneys, often a judge, and a decree that controls price, timing, and disbursement. Apply the standard
            process to that case and deadlines slip, one spouse stops signing, and the matter goes back to court.
          </p>
          <p>
            The practice is built for the second case. Every listing starts with written showing rules, sign-off
            deadlines, and escrow instructions both attorneys approve. Both spouses receive each offer and each update on
            the same day. If one party blocks the sale, a written escalation protocol moves it forward without a new
            motion where that is possible.
          </p>

          <h2>Credentials and experience</h2>
          <p>
            Dr. Jan Duffy holds a Ph.D. in Market Research and Consumer Behavior and a Nevada real estate license with
            {' '}
            {BROKERAGE_NAME}
            . She trained as a Certified Divorce Real Estate Expert through the Ilumni Institute and takes court-appointed
            listings in Clark County family court. Her office sits at the Family Courts and Services Center on North Pecos.
          </p>

          <div className="my-8 rounded-lg bg-blue-50 p-6">
            <h3 className="mb-4 text-xl font-bold">Professional credentials</h3>
            <ul className="space-y-2">
              <li>
                <strong>Ph.D.</strong>
                {' '}
                in Market Research and Consumer Behavior
              </li>
              <li>
                <strong>Nevada real estate license:</strong>
                {' '}
                #
                {REAL_ESTATE_LICENSE_NV}
              </li>
              <li>
                <strong>Brokerage:</strong>
                {' '}
                {BROKERAGE_NAME}
              </li>
              <li>
                <strong>Designation:</strong>
                {' '}
                Certified Divorce Real Estate Expert (CDRE)
              </li>
              <li>
                <strong>Training:</strong>
                {' '}
                Ilumni® Institute
              </li>
              <li>
                <strong>Court work:</strong>
                {' '}
                Court-appointed listings and valuation testimony
              </li>
            </ul>
          </div>

          <div className="my-8 rounded-lg bg-gray-50 p-6">
            <h3 className="mb-4 text-xl font-bold">Track record</h3>
            <ul className="space-y-2">
              <li>
                <strong>500+ families</strong>
                {' '}
                served through divorce real estate transactions
              </li>
              <li>
                <strong>$127M+</strong>
                {' '}
                in sales volume
              </li>
              <li>
                <strong>99%</strong>
                {' '}
                of listings sold
              </li>
              <li>
                <strong>4X faster</strong>
                {' '}
                average sale time than comparable traditional listings
              </li>
              <li>
                <strong>100%</strong>
                {' '}
                referral-based business
              </li>
            </ul>
          </div>

          <h2>How the practice works</h2>
          <p>
            Three rules govern every file: neutrality, one channel of communication, and a dated timeline. Neutrality
            means both spouses get identical information and neither gets a side conversation. One channel means every
            update goes to both parties and both attorneys at once. The timeline names the list date, expected contract
            date, close date, and move-out date before anything is signed.
          </p>
          <h3>Neutral representation</h3>
          <p>
            Whether you are the spouse staying, the spouse leaving, or you are both selling, you receive the same
            service. Nevada requires written consent and disclosure when one agent serves both owners; that paperwork is
            part of the first meeting, not an afterthought.
          </p>
          <h3>Working with attorneys and mediators</h3>
          <p>
            Family law attorneys and mediators across Las Vegas send valuation requests, equity analyses, and listing
            coordination here. When a judge needs a number, Dr. Jan Duffy provides a written valuation and testifies to
            it. Decree and settlement language about the sale is drafted by counsel; the practice supplies the real
            estate terms so that language works in escrow.
          </p>

          <h2>The luxury practice</h2>
          <p>
            Above
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            the rules change. A buyout refinance becomes a jumbo loan with tighter reserve and income requirements. A
            custom home in The Ridges, where 12-month sales ran from
            {' '}
            {COMMUNITY_12MO.theRidges.lowSale}
            {' '}
            to
            {' '}
            {COMMUNITY_12MO.theRidges.highSale}
            , can draw two appraisals hundreds of thousands of dollars apart. Club memberships at Red Rock Country Club,
            DragonRidge, Anthem Country Club, and The Summit Club transfer under the club's bylaws, not the decree.
          </p>
          <p>
            The practice covers The Ridges, The Summit Club, Red Rock Country Club, MacDonald Highlands, Anthem Country
            Club, Southern Highlands Golf Club, Lake Las Vegas, and the Strip towers. Guard-gated showings run by
            appointment with buyer verification before entry. Where privacy matters more than reach, off-market and
            private-network exposure replaces the public MLS launch, with both spouses' written agreement.
          </p>
          <ul>
            <li>
              <Link href="/luxury-divorce-real-estate-las-vegas">Luxury divorce real estate in Las Vegas</Link>
            </li>
            <li>
              <Link href="/divorce-realtor-the-ridges">The Ridges</Link>
              {', '}
              <Link href="/divorce-realtor-red-rock-country-club">Red Rock Country Club</Link>
              {', '}
              <Link href="/divorce-realtor-macdonald-highlands">MacDonald Highlands</Link>
              {', '}
              <Link href="/divorce-realtor-anthem-country-club">Anthem Country Club</Link>
            </li>
            <li>
              <Link href="/strip-high-rise-condo-divorce">Strip high-rise condos in divorce</Link>
            </li>
          </ul>

          <h2>What the practice does and does not do</h2>
          <p>
            The practice provides valuations, equity analyses, listing and sale management, buyout and refinance
            coordination, and valuation testimony. It does not give legal advice, recommend specific attorneys, predict
            court outcomes, or give tax advice. Nevada divides community property equally unless the court finds a
            written reason not to (
            {NEVADA_LAW.communityPropertyCite}
            ); how that applies to your house is a question for counsel.
          </p>
          <p className="text-sm text-gray-600 italic">{LEGAL_DISCLAIMER}</p>
        </div>

        <HighValueHomeNote points={[
          `Loans above ${LUXURY_2026.jumboThreshold2026} are jumbo; the spouse keeping the home must qualify alone, with reserves, before the buyout figure is final.`,
          'Custom homes get a two-appraisal protocol: each spouse selects an appraiser, and the agreement names how a gap is resolved.',
          'Club membership transfer at Red Rock CC, DragonRidge, Anthem CC, and The Summit Club follows the club bylaws; get the policy in writing before the settlement is drafted.',
          'Guard-gated enclaves allow no open houses; showings are called in by appointment with buyer verification.',
          `Clark County transfer tax is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000, so ${NEVADA_LAW.transferTaxExample2M}; a deed between former spouses under the decree is exempt.`,
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Fifteen minutes on where the case stands, who is on title and the loan, and what you need from the house.' },
            { title: 'Valuation', detail: 'A written value range with comparable sales, loan payoff, and net equity, shared with both spouses.' },
            { title: 'Options with numbers', detail: 'Sell, buy out, co-own for a period, or refinance, each with a dollar figure and a date.' },
            { title: 'Plan both attorneys approve', detail: 'Showing rules, sign-off deadlines, and escrow instructions in writing before the listing goes live.' },
          ]}
          callPromise="You leave the call with a value range, your options, and the next decision."
        />

        <PageFAQ faqs={aboutFaqs} />
      </DivorcePageTemplate>
    </>
  );
}
