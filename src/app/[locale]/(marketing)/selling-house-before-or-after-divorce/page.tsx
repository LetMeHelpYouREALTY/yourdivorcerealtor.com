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

const path = '/selling-house-before-or-after-divorce';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Sell the House Before or After Divorce? | Dr. Jan Duffy',
    description: 'Compare selling before or after the decree: the $500,000 joint gain exclusion, carrying costs, who must sign, and Las Vegas market timing in September 2026.',
    alternates: { canonical, languages },
  };
}

export default async function SellingHouseBeforeOrAfterDivorce(props: PageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/selling-house-before-or-after-divorce';

  const faqs = [
    {
      question: 'Is it better to sell the house before or after the divorce?',
      answer: 'Selling before the decree usually wins when both spouses agree, the gain is large, and neither can carry the mortgage alone. Selling after wins when the decree needs to settle the terms first or one spouse wants time to arrange a buyout. Carrying costs and the tax exclusion decide most cases.',
    },
    {
      question: 'How does the capital gains exclusion change after divorce?',
      answer: 'A married couple filing jointly may exclude up to $500,000 of gain under Section 121. After the divorce, each former spouse files single and may exclude $250,000 on their share. A spouse who moved out can still count the other\'s continued use under a divorce instrument.',
    },
    {
      question: 'Who pays the mortgage while we wait to sell?',
      answer: 'Both spouses remain liable to the lender regardless of who lives there. Temporary orders or the stipulation usually assign who pays and whether that payment is reimbursed from proceeds at closing. Missed payments hurt both credit reports, which also affects whichever spouse later needs a mortgage.',
    },
    {
      question: 'Can the decree force a sale after the divorce?',
      answer: 'Yes. A decree can order the home listed by a date, set a price floor, name the agent, and direct the proceeds split. If one spouse does not comply, the other asks the court to enforce it, and the court can authorize a signature on that spouse\'s behalf.',
    },
    {
      question: 'Does the Las Vegas market favor selling now?',
      answer: `In September 2026, Las Vegas REALTORS® reported a ${LVR_SEPT_2026.medianSfrPrice} single-family median and ${LVR_SEPT_2026.soldWithin30DaysPct} of homes sold within 30 days. Homes priced from closed comparables are moving. Waiting for a better market rarely beats the carrying cost of two households paying for one home.`,
    },
    {
      question: 'What if the home is above the jumbo line and one spouse wants to keep it?',
      answer: `A buyout above ${LUXURY_2026.jumboThreshold2026} is a jumbo refinance underwritten on income after support. If that approval is uncertain, selling before the decree avoids a failed buyout that forces a later sale on a court timeline.`,
    },
  ];

  const articleSchema = generateArticleSchema(
    'Sell the House Before or After Divorce?',
    'How timing a divorce home sale affects the capital gains exclusion, carrying costs, signatures, and market exposure in Las Vegas.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Home Sale Timing Services',
    'Timing analysis and neutral listing representation for Las Vegas homeowners deciding whether to sell before or after the divorce decree.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Selling the House Before or After Divorce: Timing Your Sale"
        heroSubhead="Taxes, carrying costs, signatures, and the market, weighed in one place"
        showHomeValue
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="Should I sell the house before or after the divorce is final?">
          Sell before the decree when both spouses agree, the gain may exceed $250,000, and neither can
          carry the mortgage alone. Sell after when the decree must settle the terms or one spouse needs
          time for a buyout. The joint $500,000 gain exclusion and the monthly carrying cost decide most
          Las Vegas cases. Your attorney and tax advisor confirm the rest.
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
          <h2>Selling before the divorce is final</h2>
          <p>
            Selling while the case is open resolves the largest asset early, ends joint mortgage
            payments, and keeps the joint $500,000 gain exclusion available for the year of sale. It
            requires both signatures or a stipulation, and it asks two people in conflict to make listing
            decisions together. Most couples who can agree choose this path.
          </p>
          <h3>Advantages</h3>
          <ul>
            <li>
              <strong>Larger exclusion:</strong>
              {' '}
              up to $500,000 of gain excluded on a joint return, against $250,000 each after.
            </li>
            <li>
              <strong>Clean break:</strong>
              {' '}
              proceeds sit in escrow and split at closing, ending shared mortgage, tax, and HOA bills.
            </li>
            <li>
              <strong>Market exposure now:</strong>
              {' '}
              the home sells into current demand instead of an unknown market after the decree.
            </li>
            <li>
              <strong>Less to litigate:</strong>
              {' '}
              a sold home turns into a number, which is easier to divide than a house.
            </li>
          </ul>
          <h3>Disadvantages</h3>
          <ul>
            <li>Both spouses must agree on price, showings, and repairs while the case is still contested.</li>
            <li>A standing order may require a stipulation before escrow can open.</li>
            <li>The spouse who wants a buyout loses the option once the home is in contract.</li>
          </ul>

          <h2>Selling after the divorce is final</h2>
          <p>
            Waiting for the decree gives you a document that sets the listing date, price floor, agent,
            and proceeds split, so fewer decisions depend on cooperation. The cost is months of two
            households carrying one mortgage, a smaller per-person gain exclusion, and exposure to
            whatever the market does in the meantime.
          </p>
          <h3>Advantages</h3>
          <ul>
            <li>
              <strong>Terms are fixed:</strong>
              {' '}
              the decree controls the sale, and the court can enforce it.
            </li>
            <li>
              <strong>Time for a buyout:</strong>
              {' '}
              the spouse keeping the home can arrange a refinance first.
            </li>
            <li>
              <strong>Separate tax planning:</strong>
              {' '}
              each former spouse times their share against their own income.
            </li>
          </ul>
          <h3>Disadvantages</h3>
          <ul>
            <li>Each former spouse excludes only $250,000 of gain on their share.</li>
            <li>Mortgage, taxes, insurance, HOA, and maintenance continue for both until closing.</li>
            <li>A spouse who later refuses to list forces a second trip to court.</li>
          </ul>

          <h2>How the tax exclusion compares</h2>
          <p>
            {NEVADA_LAW.capitalGainsExclusion}
            {' '}
            The difference matters most on homes bought years ago in Summerlin, Henderson, or the
            guard-gated communities, where the gain can pass $250,000 even at today's median prices.
          </p>
          <div className="my-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Filing status at sale</th>
                  <th className="p-2 text-left">Section 121 exclusion</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Married, filing jointly, before the decree</td>
                  <td className="p-2">$500,000</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Single, after the decree, each former spouse</td>
                  <td className="p-2">$250,000 on their share</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Nevada has no state income tax. Real property transfer tax is
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000 on an arm's-length sale, and a title transfer between spouses under the decree
            is exempt. Details at
            {' '}
            <Link href="/capital-gains-tax-divorce-home-sale" className="text-blue-600 underline hover:text-blue-700">capital gains tax on a divorce home sale</Link>
            .
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Carrying costs while you wait</h2>
          <p>
            Every month the home is unsold, both spouses stay liable for the mortgage, property tax,
            insurance, HOA dues, utilities, and repairs, whoever lives there. Temporary orders usually
            assign who pays and whether it is reimbursed at closing. Those months of cost are the real
            price of waiting, and they rarely come back in a higher sale price.
          </p>
          <ul>
            <li>Mortgage principal and interest, plus any HELOC.</li>
            <li>Property tax and homeowners insurance.</li>
            <li>HOA dues and any special assessment that lands during the wait.</li>
            <li>Pool, landscaping, and HVAC upkeep, which buyers inspect closely in Las Vegas.</li>
          </ul>
          <p>
            Market risk cuts both ways. In September 2026, the Las Vegas single-family median was
            {' '}
            {LVR_SEPT_2026.medianSfrPrice}
            {' '}
            with
            {' '}
            {LVR_SEPT_2026.availableSfrListings}
            {' '}
            homes available, and
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of sales closed within 30 days of listing. Correctly priced homes are moving; waiting for a
            better month is a guess.
          </p>

          <h2>What the law requires at each point</h2>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            Before the decree, a sale needs both signatures or a stipulation, and any standing order
            must be satisfied first. After the decree, the decree's terms control, and the court can
            enforce them against a spouse who will not sign.
          </p>
          <ul>
            <li>
              <strong>Before:</strong>
              {' '}
              both owners sign; proceeds held in escrow until a stipulation or the decree directs the split.
            </li>
            <li>
              <strong>After:</strong>
              {' '}
              the decree sets the listing date, price floor, agent, and distribution.
            </li>
            <li>
              <strong>Either:</strong>
              {' '}
              an existing court order on the home overrides the spouses' informal agreement.
            </li>
          </ul>
          <p>{LEGAL_DISCLAIMER}</p>

          <h2>Making the decision</h2>
          <p>
            Run four numbers with your attorney and tax advisor: the estimated gain against the
            exclusion, the monthly carrying cost times the months until the decree, the net to each
            spouse from a sale now, and the refinance approval for any buyout. Whichever option leaves
            each spouse with more after those four is usually the answer.
          </p>
          <ol>
            <li>Estimated gain, and whether it exceeds $250,000 per spouse.</li>
            <li>Months until the decree, times the monthly carrying cost.</li>
            <li>Net proceeds now, from a written valuation with comparables attached.</li>
            <li>Whether a buyout refinance has been approved, not just discussed.</li>
          </ol>
          <p>
            Related reading:
            {' '}
            <Link href="/divorce-home-sale-timeline" className="text-blue-600 underline hover:text-blue-700">divorce home sale timeline</Link>
            ,
            {' '}
            <Link href="/divorce-property-division" className="text-blue-600 underline hover:text-blue-700">property division options</Link>
            , and
            {' '}
            <Link href="/financial-planning-divorce-real-estate" className="text-blue-600 underline hover:text-blue-700">financial planning for divorce real estate</Link>
            .
          </p>
        </div>

        <HighValueHomeNote points={[
          `A buyout above ${LUXURY_2026.jumboThreshold2026} is a jumbo refinance. If approval is not in hand, selling before the decree avoids a failed buyout that forces a later sale on a court timeline.`,
          'Long-held custom homes in The Ridges, Red Rock Country Club, and MacDonald Highlands often carry gains far above $500,000. The exclusion covers only part, so the closing date and filing status need a tax advisor\'s review before listing.',
          `Transfer tax is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000, which is ${NEVADA_LAW.transferTaxExample2M}. A decree transfer between spouses is exempt, which favors a buyout over a sale when one spouse keeps the home.`,
          'Carrying costs at this tier include club dues, guard-gate HOA fees, and pool and landscape contracts. Months of waiting for the decree add up faster than at the median.',
          'Cash buyers are a larger share at the top tier. A sale before the decree can close quickly, but the stipulation must already say where the proceeds go.',
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Tell me where the case stands, who wants what, and whether a buyout is on the table.' },
            { title: 'Net sheet, two ways', detail: 'Net proceeds to each spouse from a sale now versus after the decree, with carrying costs shown.' },
            { title: 'Timing recommendation', detail: 'A one-page summary your attorney and tax advisor can react to.' },
          ]}
          callPromise="You leave the call with both net sheets and a clear case for one timing over the other."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
