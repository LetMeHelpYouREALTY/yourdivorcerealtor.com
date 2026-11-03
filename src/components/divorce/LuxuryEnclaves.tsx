import Link from 'next/link';
import { KeyFacts } from '@/components/divorce/KeyFacts';
import { SectionHeader } from '@/components/layouts/SectionHeader';
import { COMMUNITY_12MO, LUXURY_2026 } from '@/lib/market-data';

type Enclave = {
  name: string;
  href: string;
  detail: string;
};

const enclaves: Enclave[] = [
  {
    name: 'The Ridges',
    href: '/divorce-realtor-the-ridges',
    detail: `Guard-gated Summerlin custom homes. 12-month median ${COMMUNITY_12MO.theRidges.median} across ${COMMUNITY_12MO.theRidges.closings} closings, HOA ${COMMUNITY_12MO.theRidges.hoaMonthly} a month.`,
  },
  {
    name: 'The Summit Club',
    href: '/luxury-divorce-real-estate-las-vegas',
    detail: `Private golf club community in Summerlin. Median ${COMMUNITY_12MO.summitClub.median}; ${COMMUNITY_12MO.summitClub.note}.`,
  },
  {
    name: 'Red Rock Country Club',
    href: '/divorce-realtor-red-rock-country-club',
    detail: `Two Arnold Palmer courses behind a staffed gate. Median ${COMMUNITY_12MO.redRockCountryClub.median}, ${COMMUNITY_12MO.redRockCountryClub.closings} closings, ${COMMUNITY_12MO.redRockCountryClub.medianDom} median days on market.`,
  },
  {
    name: 'MacDonald Highlands',
    href: '/divorce-realtor-macdonald-highlands',
    detail: `Henderson hillside estates around DragonRidge. Median ${COMMUNITY_12MO.macdonaldHighlands.median}, top sale ${COMMUNITY_12MO.macdonaldHighlands.topSale}, ${COMMUNITY_12MO.macdonaldHighlands.pricePerSqFt} per square foot.`,
  },
  {
    name: 'Anthem Country Club',
    href: '/divorce-realtor-anthem-country-club',
    detail: `Guard-gated golf community in Henderson. Median ${COMMUNITY_12MO.anthemCountryClub.median}; sales ran ${COMMUNITY_12MO.anthemCountryClub.range}.`,
  },
  {
    name: 'Southern Highlands Golf Club',
    href: '/divorce-realtor-southern-highlands',
    detail: 'Private Robert Trent Jones course inside a guard-gated enclave off I-15. Club membership is handled apart from the deed.',
  },
  {
    name: 'Lake Las Vegas',
    href: '/luxury-divorce-real-estate-las-vegas',
    detail: 'Lakefront and golf-course homes in Henderson with two courses and marina access. Views and water frontage drive the appraisal.',
  },
  {
    name: 'Strip high-rises',
    href: '/strip-high-rise-condo-divorce',
    detail: `Waldorf Astoria, Veer, Turnberry and similar towers. Waldorf Astoria median ${COMMUNITY_12MO.waldorfAstoriaStrip.median} at ${COMMUNITY_12MO.waldorfAstoriaStrip.pricePerSqFt} per square foot.`,
  },
];

/**
 * Homepage positioning block for owners of $1M+ homes: names the enclaves served,
 * shows sourced top-tier figures, and links to each enclave page.
 */
export function LuxuryEnclaves() {
  return (
    <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Divorce sales in the valley's luxury enclaves"
          description="A guard-gated estate or a Strip high-rise follows different rules than a tract home: jumbo underwriting, appraisal spread, club memberships, and privacy. The practice covers all of it."
        />

        <div className="mx-auto mb-10 max-w-4xl">
          <KeyFacts
            title="The $1 million-plus market"
            facts={[
              { label: 'Las Vegas sales above $1M in 2025', value: LUXURY_2026.sales1MPlus2025 },
              { label: 'Closings above $1M, September 2026', value: LUXURY_2026.closingsAbove1MSept2026 },
              { label: '2026 jumbo loan line, Clark County', value: LUXURY_2026.jumboThreshold2026 },
            ]}
            source={`${LUXURY_2026.source2025}; ${LUXURY_2026.sept2026Source}; ${LUXURY_2026.jumboSource}`}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {enclaves.map(enclave => (
            <Link
              key={enclave.name}
              href={enclave.href}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-200 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              <h3 className="mb-2 text-lg font-bold text-gray-900">{enclave.name}</h3>
              <p className="flex-1 text-sm leading-relaxed text-gray-600">{enclave.detail}</p>
              <span className="mt-4 text-sm font-semibold text-blue-600">Divorce sale details →</span>
            </Link>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-gray-700">
          Above
          {' '}
          {LUXURY_2026.jumboThreshold2026}
          {' '}
          a buyout refinance is a jumbo loan, a custom home can draw two appraisals far apart, and club membership transfers follow the club's bylaws, not the decree.
          {' '}
          <Link href="/luxury-divorce-real-estate-las-vegas" className="font-semibold text-blue-600 hover:underline">
            Read how high-value divorce sales work in Las Vegas
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
