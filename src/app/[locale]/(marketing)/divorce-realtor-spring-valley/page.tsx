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
import { LEGAL_DISCLAIMER, LUXURY_2026, LVR_SEPT_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, siteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateLocalBusinessSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type ISpringValleyProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-realtor-spring-valley';

const pageTitle = 'Spring Valley Divorce Real Estate Agent | Dr. Jan Duffy';
const pageDescription = `Spring Valley divorce real estate agent for Spanish Trail, Spanish Hills, the Durango corridor and the 1970s to 1990s subdivisions. Valley median ${LVR_SEPT_2026.medianSfrPrice}. Plan a neutral valuation or buyout.`;

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
    question: 'How is a Spring Valley home valued for a divorce?',
    answer: 'For the tract subdivisions between Sahara and the 215, a broker price opinion built on same-model and same-street closings usually settles the number, adjusted for pool, lot, remodel level and system age. Custom homes in Spanish Trail and Spanish Hills need a formal appraisal, often two, because golf frontage and lot size move value more than square footage.',
  },
  {
    question: 'Can one spouse keep a Spring Valley house?',
    answer: `Often yes. Most Spring Valley homes price below the ${LUXURY_2026.jumboThreshold2026} conforming limit, and long-held homes carry real equity. The keeping spouse must qualify alone, with support from the decree counted, and pay out the other spouse's share. Spanish Trail and Spanish Hills buyouts are usually jumbo and need a written pre-approval first.`,
  },
  {
    question: 'Who handles showings inside the Spanish Trail gates during a divorce?',
    answer: 'Spanish Trail and Spanish Hills are guard-gated and register buyer agents at the gate. The listing agent clears each showing with the occupying spouse in advance, and some sections limit open houses. Feedback and offers go to both spouses in writing at the same time, so neither side learns anything first.',
  },
  {
    question: 'We own a condo near Chinatown. Does anything change?',
    answer: 'Attached product along Spring Mountain Road and the Flamingo and Rainbow corridors carries its own HOA, reserve study and rental-cap questions that affect a buyer\'s financing. Escrow orders the resale package early. If the unit has been rented, the lease and deposit are part of the settlement, and the tenant\'s notice period sets the earliest listing date.',
  },
  {
    question: 'How long does a Spring Valley divorce sale take?',
    answer: `In September 2026, ${LVR_SEPT_2026.soldWithin30DaysPct} of Las Vegas area single-family homes sold within 30 days of listing, and Spring Valley tract homes priced to same-model closings follow that pattern. The court calendar is slower. If a court order is needed, file early and write escrow to close only after the order is signed.`,
  },
  {
    question: 'Is a transfer between spouses taxed in Clark County?',
    answer: `${NEVADA_LAW.transferTaxDivorceExemption} A sale to a third party is taxed at ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of price. ${LEGAL_DISCLAIMER}`,
  },
];

export default async function SpringValley(props: ISpringValleyProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const currentPath = '/divorce-realtor-spring-valley';
  const localBusinessSchema = generateLocalBusinessSchema();
  localBusinessSchema.areaServed = [{ '@type': 'City', 'name': 'Spring Valley' }];
  const serviceSchema = generateServiceSchema(
    'Spring Valley Divorce Real Estate Services',
    'Neutral divorce real estate representation in Spring Valley, Las Vegas: valuation, buyout planning and court-aware home sales across Spanish Trail, Spanish Hills, the Durango corridor and the Spring Mountain Road area.',
    'Spring Valley',
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const articleSchema = generateArticleSchema(pageTitle, pageDescription, `${siteUrl}${path}`, CONTENT_LAST_UPDATED, CONTENT_LAST_UPDATED);
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[localBusinessSchema, serviceSchema, realEstateAgentSchema, articleSchema, faqSchema]} />
      <DivorcePageTemplate
        h1="Spring Valley Divorce Real Estate Agent"
        heroSubhead="Neutral valuation, buyout planning and court-aware sales from the Spring Mountain corridor to Spanish Trail"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How does a divorce home sale work in Spring Valley, Las Vegas?">
          A Spring Valley home is community property under Nevada law, so both spouses sign the listing and deed, or a family court order replaces the missing signature. The sequence is a neutral valuation from same-model closings, a buyout test against the loan and the keeping spouse's income, then a sale or transfer plan timed to the court calendar, the HOA and any guard gate.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Sold within 30 days of listing', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Available single-family listings', value: LVR_SEPT_2026.availableSfrListings },
          ]}
          source={LVR_SEPT_2026.source}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>How Spring Valley's sections change a divorce sale</h2>
          <p>
            Spring Valley is an unincorporated Clark County township west of the Strip, roughly between Sahara Avenue and the southwest, with Durango Drive running through its center. It holds some of the valley's widest range of housing in one area: 1970s ranch homes on larger lots, 1980s and 1990s tract subdivisions, condo and townhome blocks along Spring Mountain Road and Flamingo Road, and two guard-gated golf and custom enclaves. The section sets the comparables, the HOA and the gate rules.
          </p>
          <ul>
            <li>
              <strong>Spanish Trail:</strong>
              {' '}
              A guard-gated country club community with a Robert Trent Jones Jr. course, custom and semi-custom homes, townhomes and a club membership that is a separate asset from the house.
            </li>
            <li>
              <strong>Spanish Hills:</strong>
              {' '}
              Guard-gated custom estates on larger lots near Tropicana and Durango, where lot size, elevation and finish quality set price rather than square footage.
            </li>
            <li>
              <strong>The Durango corridor and the Rainbow corridor:</strong>
              {' '}
              1990s and 2000s tract villages, many in gated sub-associations without guard staff, with deep same-model sales data.
            </li>
            <li>
              <strong>The Spring Mountain Road and Chinatown area:</strong>
              {' '}
              Condos, townhomes and older single-family streets close to the Strip, with mixed-use pressure and a steady investor buyer pool.
            </li>
            <li>
              <strong>The 1970s and 1980s subdivisions near Sahara and Jones:</strong>
              {' '}
              Ranch and two-story homes on larger lots, frequently without an HOA, where condition and permit history drive the spread between comparables.
            </li>
          </ul>

          <h2>What a Spring Valley house is worth when both spouses need the number</h2>
          <p>
            A divorce valuation must hold up to two attorneys and sometimes a judge. It should rest on closed sales of the same model or the same street, adjusted for pool, lot, remodel level and the age of the roof and HVAC, and be written so either spouse can hand it to counsel. List prices and online estimates are not evidence of value.
          </p>
          <p>
            Spring Valley's range is the challenge. The valley single-family median was
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            {' '}
            in September 2026, and Spring Valley has homes well below and well above that line within a few blocks. A tract home on the Durango corridor has dozens of same-model closings to lean on. A custom home in Spanish Hills has a thin comparable set where one golf-frontage or view sale can swing the number.
          </p>
          <p>
            For tract and condo product, a broker price opinion usually settles the question. For Spanish Trail and Spanish Hills, plan on a formal appraisal, often two, with a written reconciliation rule agreed before anyone orders a report. For a condo, the HOA's financial health affects what a buyer's lender will approve, so the resale package is part of the valuation.
          </p>

          <h2>Can one spouse keep the Spring Valley home?</h2>
          <p>
            A buyout works when the keeping spouse can refinance in one name, pay out the other spouse's share of equity, and carry the payment, taxes, insurance and HOA dues after the decree. For most Spring Valley tract homes the loan stays below the
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            conforming limit, and the question is single-income qualification. For Spanish Trail and Spanish Hills, the refinance is jumbo and underwriting tightens.
          </p>
          <ul>
            <li>
              <strong>Long-held homes.</strong>
              {' '}
              A 1970s or 1980s home may hold more equity than the keeping spouse can finance. A note secured by the house, or an offset against retirement assets, often bridges the gap.
            </li>
            <li>
              <strong>Rental units.</strong>
              {' '}
              Spring Valley condos are often rented. If one spouse keeps the unit, the lease, deposit and rental income move with it and belong in the decree.
            </li>
            <li>
              <strong>Club membership.</strong>
              {' '}
              A Spanish Trail membership has its own transfer and resignation terms and is valued separately from the house.
            </li>
          </ul>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            (
            {NEVADA_LAW.communityPropertyCite}
            ). The house is one line in that division, so test the buyout against the whole balance sheet.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Selling a Spring Valley home while the case is open</h2>
          <p>
            Most Spring Valley divorce sales close before the decree, under a stipulation or court order that names the agent, the pricing method, who occupies the home and how net proceeds are held at escrow. A neutral agent reports every showing, offer and price discussion to both spouses in writing at the same time.
          </p>
          <p>
            Two calendars run at once. The market calendar is fast for priced-right tract homes;
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of valley single-family homes sold within 30 days in September 2026, with
            {' '}
            {LVR_SEPT_2026.availableSfrListings}
            {' '}
            competing listings available. The court calendar is slower. A contested motion in Clark County family court waits weeks for a hearing, so file early and write escrow to close only after the order is signed.
          </p>
          <p>
            Older Spring Valley homes need preparation. A buyer's inspector will look at the roof, original HVAC, pool equipment, and any unpermitted addition or garage conversion, which are common on the larger 1970s lots. The settlement should decide in advance who pays for repairs and whether the price absorbs the rest. Guard-gated homes follow gate protocol: buyer agents register, showings are by appointment, and open houses may be barred.
          </p>

          <h2>HOA, permits and the Clark County close</h2>
          <p>
            Spring Valley's gated tract villages and condo buildings run through associations that must deliver a resale package and a payoff demand before closing. Order them the week the listing goes live so transfer fees, back dues and any special assessment are known when offers are negotiated. Condo buildings add a reserve study and insurance questions that a buyer's lender will review.
          </p>
          <p>
            Many of the older subdivisions sit outside any HOA, which removes the resale package step and places more weight on county permit records. Clark County, not the City of Las Vegas, is the permitting authority in Spring Valley, so permit searches run through the county. With the HOA packages, permit questions and proceeds instructions handled early, the house is usually the least contested asset in a Spring Valley divorce.
          </p>
        </div>

        <HighValueHomeNote
          points={[
            `A buyout refinance above ${LUXURY_2026.jumboThreshold2026} is a jumbo loan with tighter reserve and income rules. In Spring Valley that applies to Spanish Trail, Spanish Hills and the largest remodeled lots near Sahara and Durango.`,
            'Custom and golf-frontage homes draw appraisals that can differ widely. Write a two-appraisal protocol and a reconciliation rule into the settlement before either spouse orders a report.',
            'A Spanish Trail membership is a separate asset with its own deposit, resignation and transfer terms. Name it in the settlement and confirm whether a buyer can assume it.',
            `Long-held homes can carry gains above the Section 121 exclusion. ${NEVADA_LAW.capitalGainsExclusion} ${LEGAL_DISCLAIMER}`,
            `Clark County transfer tax on a third-party sale is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of price. Guard-gated showings are by appointment only, which protects the occupying spouse and suits private, off-market exposure during a contested case.`,
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the section, the loan and purchase history, who is living in the home, and where the case stands.' },
            { title: 'Neutral valuation', detail: 'A written value built on same-model and same-condition closings, delivered to both spouses and both attorneys at the same time.' },
            { title: 'Buyout or sale test', detail: 'A side-by-side of what each spouse nets under a buyout versus a sale, including HOA, rental and tax items.' },
            { title: 'Court-aligned plan', detail: 'A listing or transfer timeline matched to your stipulation or order, with gate protocol and escrow instructions drafted to it.' },
          ]}
          callPromise="You leave the call with a value range, a buyout verdict, and the next decision."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
