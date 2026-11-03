import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { DirectAnswer } from '@/components/divorce/DirectAnswer';
import { DivorcePageTemplate } from '@/components/divorce/DivorcePageTemplate';
import { HighValueHomeNote } from '@/components/divorce/HighValueHomeNote';
import { KeyFacts } from '@/components/divorce/KeyFacts';
import { NextSteps } from '@/components/divorce/NextSteps';
import { PageFAQ } from '@/components/divorce/PageFAQ';
import { StructuredData } from '@/components/seo/StructuredData';
import { CONTENT_LAST_UPDATED } from '@/lib/content-dates';
import { COMMUNITY_12MO, LEGAL_DISCLAIMER, LUXURY_2026, LVR_SEPT_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, siteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateLocalBusinessSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type IParadiseProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-paradise';

const pageTitle = 'Paradise NV Divorce Real Estate Agent | Dr. Jan Duffy';
const pageDescription = `Paradise, Nevada divorce real estate agent for Strip high-rises, Las Vegas Country Club, Paradise Palms and the UNLV area. Waldorf Astoria median ${COMMUNITY_12MO.waldorfAstoriaStrip.median}. Plan a sale or buyout.`;

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical, languages },
  };
}

const faqs = [
  {
    question: 'How is a Strip high-rise condo valued for a divorce?',
    answer: `By building, floor, exposure and view, not by neighborhood. The Waldorf Astoria recorded a 12-month median of ${COMMUNITY_12MO.waldorfAstoriaStrip.median} at ${COMMUNITY_12MO.waldorfAstoriaStrip.pricePerSqFt} per square foot, and other towers trade at very different levels. The right comparables are recent closings in the same tower and stack, adjusted for floor and finish. Many high-rise buyers pay cash.`,
  },
  {
    question: 'Can one spouse keep a Paradise high-rise unit?',
    answer: `A buyout depends on financing. Many Strip towers exceed the ${LUXURY_2026.jumboThreshold2026} jumbo line, and some buildings have limited lender approval, so a refinance in one name may be harder than in a single-family home. Confirm the building's lender status and the keeping spouse's jumbo pre-approval before the equity number is negotiated.`,
  },
  {
    question: 'What about a mid-century home in Paradise Palms?',
    answer: 'Paradise Palms and the other 1950s and 1960s subdivisions near Desert Inn and Eastern trade on architecture, originality and lot as much as square footage. Comparables must be true mid-century matches, and restoration work affects value in ways a standard appraisal can miss. Plan on a broker price opinion plus an appraiser familiar with the area.',
  },
  {
    question: 'Our unit has been a short-term rental. Does that change the sale?',
    answer: 'Yes. Rental history, the building\'s rules and Clark County\'s short-term rental regulations all affect what a buyer can do with the unit and what a lender will approve. Rental income and any management contract belong in the settlement. Confirm the building\'s rental policy before listing.',
  },
  {
    question: 'How long does a Paradise divorce sale take?',
    answer: `In September 2026, ${LVR_SEPT_2026.soldWithin30DaysPct} of Las Vegas area single-family homes sold within 30 days of listing. Paradise single-family homes priced to recent closings follow that pattern. High-rise units draw a smaller, often cash, buyer pool and take longer. The court calendar is usually the slowest clock, so file early.`,
  },
  {
    question: 'Is a transfer between spouses taxed in Clark County?',
    answer: `${NEVADA_LAW.transferTaxDivorceExemption} A sale to a third party is taxed at ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of price. ${LEGAL_DISCLAIMER}`,
  },
];

export default async function Paradise(props: IParadiseProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const currentPath = '/divorce-realtor-paradise';
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'Paradise' }];
  const serviceSchema = generateServiceSchema(
    'Paradise Divorce Real Estate Services',
    'Neutral divorce real estate representation in Paradise, Nevada: valuation, buyout planning and court-aware sales for Strip high-rise condos, Las Vegas Country Club, Paradise Palms and the UNLV area.',
    'Paradise',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const articleSchema = generateArticleSchema(pageTitle, pageDescription, `${siteUrl}${path}`, CONTENT_LAST_UPDATED, CONTENT_LAST_UPDATED);
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[localBusinessSchema, serviceSchema, realEstateAgentSchema, articleSchema, faqSchema]} />
      <DivorcePageTemplate
        h1="Paradise Divorce Real Estate Agent"
        heroSubhead="Neutral valuation, buyout planning and private sales for Strip high-rises, Las Vegas Country Club and the township's homes"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How does a divorce home sale work in Paradise, Nevada?">
          A Paradise home or condo is community property under Nevada law, so both spouses sign the listing and deed, or a family court order replaces the missing signature. The sequence is a neutral valuation from same-tower or same-street closings, a buyout test against jumbo or conforming financing, then a sale plan that handles building rules, rental history and the court calendar.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Waldorf Astoria Strip 12-month median', value: COMMUNITY_12MO.waldorfAstoriaStrip.median },
            { label: 'Waldorf Astoria price per square foot', value: COMMUNITY_12MO.waldorfAstoriaStrip.pricePerSqFt },
            { label: 'Waldorf Astoria 12-month closings', value: COMMUNITY_12MO.waldorfAstoriaStrip.closings },
          ]}
          source={COMMUNITY_12MO.source}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>How Paradise's housing types change a divorce sale</h2>
          <p>
            Paradise is the unincorporated Clark County township that holds the Strip, Harry Reid International Airport, UNLV, the Convention Center and the Hughes Center. Its housing is unlike any other part of the valley: high-rise condo towers, a gated country club, mid-century subdivisions and 1970s to 1990s tract streets, all within a few miles. The product type, more than the street, sets the valuation method, the financing and the buyer pool.
          </p>
          <ul>
            <li>
              <strong>Strip and near-Strip high-rises:</strong>
              {' '}
              Towers such as the Waldorf Astoria, Veer Towers, Turnberry Place, Panorama Towers and Palms Place, each with its own HOA, reserve study, rental policy and lender approval status. Many buyers pay cash.
            </li>
            <li>
              <strong>Las Vegas Country Club:</strong>
              {' '}
              A gated golf community east of the Strip with custom homes, townhomes and condos, a club membership that is a separate asset, and gate protocol for showings.
            </li>
            <li>
              <strong>Paradise Palms and the mid-century streets:</strong>
              {' '}
              1950s and 1960s homes near Desert Inn Road and Eastern Avenue, where architecture, originality and lot size drive value and comparables must be true matches.
            </li>
            <li>
              <strong>The UNLV, Flamingo and Tropicana corridors:</strong>
              {' '}
              1970s to 1990s single-family streets, condo conversions and townhome blocks with a steady investor buyer pool and frequent rental history.
            </li>
            <li>
              <strong>Hughes Center and the Paradise Road corridor:</strong>
              {' '}
              Mid-rise and high-rise condos near the Convention Center with their own HOA structures and a buyer pool that includes second-home purchasers.
            </li>
          </ul>

          <h2>What a Paradise property is worth when both spouses need the number</h2>
          <p>
            A divorce valuation must hold up to two attorneys and sometimes a judge. For a single-family home it rests on closed sales of the same model or the same street, adjusted for lot, pool, remodel level and condition. For a high-rise unit it rests on recent closings in the same tower and ideally the same stack, adjusted for floor, exposure and finish. Either way it is written so either spouse can hand it to counsel.
          </p>
          <p>
            High-rise valuation is the part most agents get wrong. The Waldorf Astoria recorded
            {' '}
            {COMMUNITY_12MO.waldorfAstoriaStrip.closings}
            {' '}
            closings over 12 months at a median of
            {' '}
            {COMMUNITY_12MO.waldorfAstoriaStrip.median}
            {' '}
            and
            {' '}
            {COMMUNITY_12MO.waldorfAstoriaStrip.pricePerSqFt}
            {' '}
            per square foot, while other towers a short walk away trade at a fraction of that. A per-square-foot figure borrowed from another building is not evidence. Floor, Strip exposure, hotel services and the building's financial health each move the number.
          </p>
          <p>
            For tract streets near UNLV and Tropicana, a broker price opinion built on same-model closings usually settles the question. For Las Vegas Country Club custom homes and Paradise Palms originals, plan on a formal appraisal with an appraiser who works that product, and a written reconciliation rule if two reports are ordered.
          </p>

          <h2>Can one spouse keep the Paradise home or condo?</h2>
          <p>
            A buyout works when the keeping spouse can refinance in one name, pay out the other spouse's share of equity, and carry the payment, taxes, insurance and HOA dues after the decree. In Paradise the building often decides the answer before income does.
          </p>
          <ul>
            <li>
              <strong>High-rise financing.</strong>
              {' '}
              Many Strip towers sit above the
              {' '}
              {LUXURY_2026.jumboThreshold2026}
              {' '}
              jumbo line, and some buildings have limited lender approval because of rental concentration or reserve levels. Confirm the building's status before negotiating equity.
            </li>
            <li>
              <strong>HOA dues and assessments.</strong>
              {' '}
              High-rise dues are substantial and special assessments are common. Lenders count them, and the settlement should assign any assessment already levied.
            </li>
            <li>
              <strong>Rental income.</strong>
              {' '}
              If the unit has been rented, the lease, deposit, management contract and income move with the unit and belong in the decree.
            </li>
            <li>
              <strong>Club membership.</strong>
              {' '}
              A Las Vegas Country Club membership is a separate asset with its own transfer and resignation terms.
            </li>
          </ul>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            (
            {NEVADA_LAW.communityPropertyCite}
            ). The property is one line in that division, so test the buyout against the whole balance sheet.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Selling a Paradise property while the case is open</h2>
          <p>
            Most Paradise divorce sales close before the decree, under a stipulation or court order that names the agent, the pricing method, who occupies the property and how net proceeds are held at escrow. A neutral agent reports every showing, offer and price discussion to both spouses in writing at the same time.
          </p>
          <p>
            Timelines split by product. Priced-right single-family homes move at the valley pace;
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of valley single-family homes sold within 30 days in September 2026, against a valley median of
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            . High-rise units draw a smaller, often cash, buyer pool and need a longer window. The court calendar is slower still. A contested motion in Clark County family court waits weeks for a hearing, so file early and write escrow to close only after the order is signed.
          </p>
          <p>
            High-rise showings run through the building: concierge check-in, elevator access and sometimes restricted hours. Las Vegas Country Club runs gate protocol. Both suit private, by-appointment exposure, which protects the occupying spouse during a contested case and matches how most top-tier buyers shop.
          </p>

          <h2>Building rules, rentals and the Clark County close</h2>
          <p>
            Every Paradise condo and townhome sale needs the association's resale package, payoff demand, reserve study and insurance certificate before closing, and a buyer's lender will read all of them. Order them the week the listing goes live. Transfer fees, back dues and any special assessment come out of proceeds before the split, and the settlement should say who bears them.
          </p>
          <p>
            Rental history is the second file. Clark County regulates short-term rentals in the unincorporated township, and each tower sets its own minimum lease term. A unit marketed as a rental to one buyer pool and as a residence to another needs the facts straight before listing. Older single-family streets near UNLV frequently carry unpermitted conversions, and the county is the permitting authority. With the building package, rental file and proceeds instructions handled early, the property is usually the least contested asset in a Paradise divorce.
          </p>
        </div>

        <HighValueHomeNote
          points={[
            `A buyout refinance above ${LUXURY_2026.jumboThreshold2026} is jumbo, and in a Strip tower the building's lender approval status can block it entirely. Confirm both before the equity payment is negotiated.`,
            `The Waldorf Astoria median of ${COMMUNITY_12MO.waldorfAstoriaStrip.median} is tower-specific. High-rise appraisals must use same-tower, same-stack closings, and a two-appraisal protocol with a reconciliation rule protects both spouses.`,
            'Cash buyers dominate the top of the high-rise market. That shortens closing but raises the stakes on price and on private, off-market exposure to a short list of qualified buyers.',
            `Gains above the Section 121 exclusion are taxable, and a unit that was rented may not qualify. ${NEVADA_LAW.capitalGainsExclusion} ${LEGAL_DISCLAIMER}`,
            `Clark County transfer tax on a third-party sale is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of price, for example ${NEVADA_LAW.transferTaxExample2M}. High-rise special assessments and Las Vegas Country Club membership terms belong in the settlement.`,
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the building or street, the loan, rental history, who is living in the property, and where the case stands.' },
            { title: 'Neutral valuation', detail: 'A written value built on same-tower or same-street closings, delivered to both spouses and both attorneys at the same time.' },
            { title: 'Buyout or sale test', detail: 'A side-by-side of what each spouse nets under a buyout versus a sale, including HOA, assessment, rental and tax items.' },
            { title: 'Court-aligned plan', detail: 'A listing or transfer timeline matched to your stipulation or order, with building access and escrow instructions drafted to it.' },
          ]}
          callPromise="You leave the call with a value range, a buyout verdict, and the next decision."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
