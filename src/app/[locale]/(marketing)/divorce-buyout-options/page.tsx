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
import { LEGAL_DISCLAIMER, LUXURY_2026, LVR_SEPT_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';

type IBuyoutProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/divorce-buyout-options';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Divorce Buyout Options for Las Vegas Homes | Dr. Jan Duffy',
    description: 'How a divorce home buyout works in Nevada: the equity math, refinancing in one name, jumbo loans above $832,750, and the decree transfer tax exemption.',
    alternates: { canonical, languages },
  };
}

export default async function BuyoutOptions(props: IBuyoutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/divorce-buyout-options';

  const faqs = [
    {
      question: 'How is a divorce buyout amount calculated?',
      answer: 'Take the home’s current value from a dated appraisal or market analysis, subtract the mortgage balance and any other liens, and the result is the equity. In a community home each spouse’s share is half, adjusted for any separate-property claim. The buyout is the departing spouse’s share, paid by refinance, cash, or an offset against other assets.',
    },
    {
      question: 'Can I buy out my spouse without refinancing?',
      answer: 'Only if you can pay their share from other assets and the lender agrees to release them from the loan, which lenders rarely do. More often the departing spouse accepts an offset, such as a larger share of a retirement account, but stays on the mortgage until it is refinanced. A deed transfer alone does not remove anyone from the loan.',
    },
    {
      question: 'What if the lender’s appraisal comes in lower than our settlement value?',
      answer: 'The buyout amount between the spouses stays what the settlement says, but the lender will loan against its own appraisal. A lower number tightens the loan-to-value, so the keeping spouse may need more cash or a different loan program. Order the lender appraisal before the deed is signed so the gap is known early.',
    },
    {
      question: 'Is there transfer tax on a buyout?',
      answer: 'Not when the deed between former spouses complies with the divorce decree. Clark County charges $2.55 per $500 of value on most transfers, but NRS 375.090(6) exempts a transfer between former spouses under a decree. The exemption is claimed on the declaration of value recorded with the deed.',
    },
    {
      question: 'Does support income count toward qualifying for the refinance?',
      answer: 'Many lenders count court-ordered spousal or child support if it is documented in the decree and has a track record of payment, with a required continuation period ahead. The rules vary by loan program and by lender, and jumbo programs are stricter. A pre-approval conversation early in the case answers it for your situation.',
    },
    {
      question: 'What happens if I cannot qualify for the buyout?',
      answer: 'Then the realistic paths are a sale and split, or a deferred sale under a written agreement that keeps both names on the loan until a set date. Some couples agree to a deferred buyout, where the keeping spouse has a defined period to refinance and the home is listed if that deadline passes.',
    },
  ];

  const articleSchema = generateArticleSchema(
    'Divorce Buyout Options for Las Vegas Homes',
    'How a divorce home buyout works in Nevada: the equity math, the refinance in one name, jumbo loans, appraisal spread, and the decree transfer tax exemption.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Buyout Services',
    'Valuation, buyout worksheets, and refinance coordination for the spouse who keeps the home in a Las Vegas divorce.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Divorce Buyout Options for Las Vegas Homes"
        heroSubhead="The equity math, the refinance, and what changes above the jumbo line"
        showHomeValue
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="How does a divorce home buyout work in Nevada?">
          One spouse pays the other for their share of the equity and takes sole title. The share is half the equity in a community home, adjusted for any separate-property claim. The buyout is usually funded by refinancing the existing loan plus the buyout amount into a new loan in one name. The departing spouse signs a deed, and that transfer is exempt from Clark County transfer tax under the decree.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Single-family homes available for sale', value: LVR_SEPT_2026.availableSfrListings },
            { label: 'Homes sold within 30 days', value: LVR_SEPT_2026.soldWithin30DaysPct },
          ]}
          source={LVR_SEPT_2026.source}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>When a buyout makes sense, and when it does not</h2>
          <p>
            A buyout fits when one spouse wants the home, can qualify for the loan alone, and the equity is small enough to pay for without draining everything else. It keeps children in the home they know, avoids commissions and transfer tax, and ends the shared loan on the day the refinance funds. It fails when the keeping spouse cannot qualify, or when paying half the equity leaves no reserves.
          </p>
          <ul>
            <li>
              <strong>Buyout is realistic when:</strong>
              {' '}
              one income carries the new payment, the lender pre-approves the full amount, and the equity share can be paid by refinance, cash, or an offset.
            </li>
            <li>
              <strong>A sale is more realistic when:</strong>
              {' '}
              neither spouse qualifies alone, the equity is most of the couple’s net worth, or the home carries costs one person cannot sustain.
            </li>
            <li>
              <strong>A deferred buyout bridges the two:</strong>
              {' '}
              the keeping spouse gets a defined period to refinance, and the home is listed if the deadline passes.
            </li>
          </ul>

          <h2>The buyout math with round numbers</h2>
          <p>
            Every buyout starts with the equity. Take a dated value, subtract every lien, and divide by two for a community home. Then adjust for separate-property claims and any post-separation credits. The result is what the departing spouse is owed. Here is a hypothetical to show it. Say the home appraises at $1,500,000 and the mortgage balance is $600,000.
          </p>
          <div className="my-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <p className="mb-2 font-semibold">Hypothetical buyout worksheet</p>
            <ul className="space-y-1 text-sm">
              <li>Appraised value: $1,500,000</li>
              <li>Mortgage balance: $600,000</li>
              <li className="border-t pt-1">Equity: $900,000</li>
              <li>Each spouse’s share: $450,000</li>
              <li>Buyout owed to the departing spouse: $450,000</li>
              <li className="border-t pt-1">New loan to pay off $600,000 and fund $450,000: about $1,050,000 plus closing costs</li>
              <li>Loan-to-value on the new loan: about 70 percent</li>
            </ul>
          </div>
          <p>
            Notice that the keeping spouse pays the full half without a commission deduction, while a sale would reduce both shares by the selling costs. Some couples adjust the buyout for that difference, and some do not. It is a negotiation point, and it should be made with the
            {' '}
            <Link href="/splitting-house-proceeds-divorce" className="text-blue-600 underline hover:text-blue-700">sale net proceeds</Link>
            {' '}
            on the same page.
          </p>

          <h2>Refinancing in one name: conforming versus jumbo</h2>
          <p>
            The refinance is where most buyouts succeed or fail. The keeping spouse applies alone, and the lender underwrites one income, one credit file, and the new loan amount against its own appraisal. Loans at or below the 2026 Clark County conforming limit follow standard agency rules. Loans above
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            are jumbo, and the rules tighten.
          </p>
          <p>In the hypothetical above, the new loan is about $1,050,000, which is jumbo. That changes four things:</p>
          <ul>
            <li>
              <strong>Income documentation:</strong>
              {' '}
              full tax returns, and for self-employed borrowers, business returns and profit-and-loss statements. Support income counts only when documented in the decree with a payment history.
            </li>
            <li>
              <strong>Reserves:</strong>
              {' '}
              jumbo lenders want several months of the new payment in liquid accounts after closing, on top of the cash to close.
            </li>
            <li>
              <strong>Loan-to-value:</strong>
              {' '}
              maximum loan-to-value is lower than on a conforming loan, so a lower appraisal has a bigger effect.
            </li>
            <li>
              <strong>Appraisal review:</strong>
              {' '}
              many jumbo programs order a second appraisal or a desk review above certain loan amounts.
            </li>
          </ul>
          <p>
            Rates, programs, and limits change, so the lender conversation should happen before the settlement is drafted, not after. The
            {' '}
            <Link href="/refinancing-after-divorce" className="text-blue-600 underline hover:text-blue-700">refinancing page</Link>
            {' '}
            covers timing and the
            {' '}
            <Link href="/divorce-and-mortgage" className="text-blue-600 underline hover:text-blue-700">mortgage page</Link>
            {' '}
            covers what happens to the old loan.
          </p>

          <h2>Appraisal spread and the two-appraisal protocol</h2>
          <p>
            A buyout has two valuations in it: the settlement value that sets the buyout amount, and the lender’s appraisal that sets the loan. In a tract subdivision they usually agree. On custom homes in The Ridges, MacDonald Highlands, Southern Highlands, or Anthem Country Club, they can differ by a wide margin, because comparable sales are scarce and view and lot adjustments are judgment calls.
          </p>
          <p>A two-appraisal protocol protects both spouses:</p>
          <ol>
            <li>Each spouse orders a licensed appraisal as of the agreed valuation date, from an appraiser who has worked in the community.</li>
            <li>If the two values fall within an agreed band, for example five percent, the buyout uses the average.</li>
            <li>If not, the two appraisers choose a third, and the agreement says whether the third controls or the three are averaged.</li>
            <li>The lender appraisal is ordered before the deed is signed, so a low number is known while the settlement can still absorb it.</li>
          </ol>
          <p>
            The
            {' '}
            <Link href="/divorce-home-valuation" className="text-blue-600 underline hover:text-blue-700">valuation page</Link>
            {' '}
            explains how to choose the valuation date and what a court-ready report contains.
          </p>

          <h2>Deed, decree, and the transfer tax exemption</h2>
          <p>
            The buyout closes in two documents. The refinance pays off the old loan and funds the buyout. The departing spouse signs an interspousal or quitclaim deed that records with a reference to the decree. Clark County charges real property transfer tax at
            {' '}
            {NEVADA_LAW.transferTaxClarkPer500}
            {' '}
            per $500 of value on most transfers.
            {' '}
            {NEVADA_LAW.transferTaxDivorceExemption}
          </p>
          <p>
            That exemption is one of the real financial advantages of a buyout over a sale. On a sale, transfer tax alone is
            {' '}
            {NEVADA_LAW.transferTaxExample2M}
            , paid from the proceeds before the split. Two cautions: the deed must match the decree, and the deed does nothing to the loan. Until the refinance funds, both borrowers remain liable. Source:
            {' '}
            {NEVADA_LAW.transferTaxCite}
            .
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h3>Taxes and the buyout</h3>
          <p>
            {NEVADA_LAW.capitalGainsExclusion}
            {' '}
            For the spouse who keeps the home, that matters later: the eventual sale is measured against the original basis, not the buyout price, and only the keeping spouse’s exclusion applies.
            {' '}
            {NEVADA_LAW.noStateIncomeTax}
            {' '}
            Source:
            {' '}
            {NEVADA_LAW.capitalGainsCite}
            .
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>How the buyout is sequenced</h2>
          <p>
            Order matters. The valuation comes first, then the lender pre-approval, then the settlement terms, then the appraisals, then the refinance and the deed. Doing it in that order means the buyout amount, the loan, and the decree all describe the same transaction. Doing it out of order is how a signed deed ends up with no refinance behind it.
          </p>
          <ol>
            <li>Dated valuation and equity worksheet shared with both attorneys.</li>
            <li>Lender pre-approval for the keeping spouse at the expected loan amount.</li>
            <li>Settlement terms: buyout amount, valuation protocol, refinance deadline, and what happens if it is missed.</li>
            <li>Appraisals under the protocol, and the lender appraisal.</li>
            <li>Refinance funds, old loan is paid, deed records with the decree reference, and the departing spouse is paid.</li>
          </ol>
          <p>
            Dr. Jan Duffy coordinates the valuation, the appraiser referrals, and the lender timeline so each step is ready when the attorneys need it.
          </p>
        </div>

        <HighValueHomeNote
          points={[
            `Any buyout refinance above ${LUXURY_2026.jumboThreshold2026} is a jumbo loan. Expect full income documentation, reserves measured in months of the new payment, a lower maximum loan-to-value, and often a second appraisal or desk review.`,
            'Appraisal spread is widest on custom homes in The Ridges, MacDonald Highlands, and Southern Highlands. Write a two-appraisal protocol with a band and a tiebreaker into the settlement before any report is ordered.',
            `A sale pays transfer tax of ${NEVADA_LAW.transferTaxExample2M}. A decree transfer between former spouses pays none, which is a real advantage for the spouse who can qualify to keep the home.`,
            'Club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, and The Summit Club transfer under the club’s rules, not the deed. Decide who keeps the membership, and who pays any transfer fee, in the decree.',
            'Section 121 excludes $250,000 per person or $500,000 jointly. The spouse who keeps a home with a large built-in gain inherits that gain, and only one exclusion will apply at the eventual sale.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'A short conversation about the home, the loan balance, and whether one spouse wants to stay.' },
            { title: 'Buyout worksheet', detail: 'A dated value, the equity, each share, and the refinance amount needed, in a form your attorney can use.' },
            { title: 'Lender and appraisal plan', detail: 'A pre-approval conversation for the keeping spouse and a two-appraisal protocol if the home calls for one.' },
            { title: 'Closing coordination', detail: 'Refinance, deed, and decree aligned so they fund and record together.' },
          ]}
          callPromise="You leave the call knowing the buyout amount, the loan it needs, and whether that loan is realistic."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
