import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { DirectAnswer } from '@/components/divorce/DirectAnswer';
import { KeyFacts } from '@/components/divorce/KeyFacts';
import { StructuredData } from '@/components/seo/StructuredData';
import { communities } from '@/lib/communities';
import { CONTENT_LAST_UPDATED, toSchemaDateTime } from '@/lib/content-dates';
import { COMMUNITY_12MO, LUXURY_2026, LVR_SEPT_2026 } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl, siteUrl } from '@/lib/metadata';
import { generateArticleSchema, generateCarouselItemListSchema } from '@/lib/schema';

type CommunitiesPageProps = {
  params: Promise<{ locale: string }>;
};

const path = '/communities';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Las Vegas Divorce Realtor by Community | Dr. Jan Duffy',
    description: 'How a divorce sale differs across 12 Las Vegas and Henderson submarkets, from $470,000 median tract homes to guard-gated enclaves selling past $10 million.',
    alternates: { canonical, languages },
  };
}

export default async function CommunitiesPage(props: CommunitiesPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const carouselSchema = generateCarouselItemListSchema(communities, {
    baseUrl: siteUrl,
    priceRange: '$$',
  });
  const articleSchema = generateArticleSchema(
    'Las Vegas Divorce Real Estate by Community',
    'How the valley\'s submarkets differ for a divorce sale: price bands, days on market, HOA structure, gate staffing, and lender rules.',
    getCanonicalSiteUrl(path, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );

  return (
    <>
      <StructuredData data={[carouselSchema, articleSchema]} />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900">
            Las Vegas Area Communities
          </h1>
          <p className="text-xl text-gray-600">
            Divorce real estate across Las Vegas and Henderson, submarket by submarket.
          </p>
        </div>

        <div className="mx-auto mb-12 max-w-4xl space-y-8">
          <DirectAnswer question="Does the community change how a divorce sale works?">
            Yes. Price band, days on market, HOA structure, and gate staffing all change the listing plan. A
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            {' '}
            tract home in North Las Vegas sells on a different timeline and to a different lender pool than a
            {' '}
            {COMMUNITY_12MO.theRidges.median}
            {' '}
            custom home in The Ridges, where loans are jumbo, appraisals spread, and showings go through a guard gate.
            The pages below cover each submarket's rules.
          </DirectAnswer>

          <KeyFacts
            facts={[
              { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
              { label: 'Summerlin median, four ZIP codes, 12 months', value: COMMUNITY_12MO.summerlinFourZips.median },
              { label: 'Henderson $1M+ median, Q3 2026', value: COMMUNITY_12MO.henderson1MPlus.median },
              { label: 'Las Vegas sales above $1M in 2025', value: LUXURY_2026.sales1MPlus2025 },
            ]}
            source={`${LVR_SEPT_2026.source}; ${COMMUNITY_12MO.source}; ${LUXURY_2026.source2025}`}
            sourceUrl={LVR_SEPT_2026.url}
          />

          <div className="prose prose-lg max-w-none">
            <h2>How the valley's submarkets differ for a divorce sale</h2>
            <p>
              The decree may say "sell the house," but the house decides how. Four things vary by community and each
              one changes the listing plan: the price band and the lenders who serve it, how fast comparable homes
              sell, the HOA and any special assessments, and whether a staffed gate controls who can see the home.
            </p>
            <p>
              Across the four Summerlin ZIP codes the 12-month median was
              {' '}
              {COMMUNITY_12MO.summerlinFourZips.median}
              {' '}
              with
              {' '}
              {COMMUNITY_12MO.summerlinFourZips.medianDom}
              {' '}
              median days on market, so a timeline of list, contract, and close can be set with confidence. In
              Henderson's $1 million-plus tier the median was
              {' '}
              {COMMUNITY_12MO.henderson1MPlus.median}
              {' '}
              across
              {' '}
              {COMMUNITY_12MO.henderson1MPlus.closings}
              {' '}
              closings in Q3 2026, with
              {' '}
              {COMMUNITY_12MO.henderson1MPlus.medianDom}
              {' '}
              median days. Inside a guard-gated enclave the numbers thin out: The Ridges recorded
              {' '}
              {COMMUNITY_12MO.theRidges.closings}
              {' '}
              closings in 12 months at a
              {' '}
              {COMMUNITY_12MO.theRidges.median}
              {' '}
              median, which means fewer comparables, wider appraisal spread, and longer marketing periods that the
              settlement timeline must allow for.
            </p>
            <p>
              Financing shifts with price. Below the 2026 jumbo line of
              {' '}
              {LUXURY_2026.jumboThreshold2026}
              {' '}
              a buyout refinance is a conforming loan with standard underwriting. Above it, the staying spouse must
              qualify alone under jumbo rules, with reserves, which changes whether a buyout is possible at all. HOA
              structure matters too: a master association plus a sub-association, as in much of Summerlin and
              Inspirada, means two transfer fees and two sets of documents in escrow; a club community adds a
              membership that transfers under club bylaws, not the decree.
            </p>
            <p>
              Showing access is the last variable. Open houses work in Mountains Edge or Aliante. They are not allowed
              behind the gates at Red Rock Country Club, MacDonald Highlands, or Anthem Country Club, where each showing
              is called in by appointment with buyer verification. The listing plan for each community sets these rules
              in writing before the home goes live, so neither spouse can later dispute who had access and when.
            </p>
            <p>
              For homes above $1 million, see
              {' '}
              <Link href="/luxury-divorce-real-estate-las-vegas">luxury divorce real estate in Las Vegas</Link>
              {' '}
              and the enclave pages for
              {' '}
              <Link href="/divorce-realtor-the-ridges">The Ridges</Link>
              ,
              {' '}
              <Link href="/divorce-realtor-red-rock-country-club">Red Rock Country Club</Link>
              ,
              {' '}
              <Link href="/divorce-realtor-macdonald-highlands">MacDonald Highlands</Link>
              ,
              {' '}
              <Link href="/divorce-realtor-anthem-country-club">Anthem Country Club</Link>
              , and
              {' '}
              <Link href="/strip-high-rise-condo-divorce">Strip high-rise condos</Link>
              .
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {communities.map(community => (
            <Link
              key={community.href}
              href={community.href}
              className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:border-blue-500 hover:shadow-xl"
              prefetch={true}
            >
              <h2 className="mb-2 text-2xl font-bold text-gray-900 group-hover:text-blue-600">
                {community.name}
              </h2>
              <p className="text-gray-600">{community.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
