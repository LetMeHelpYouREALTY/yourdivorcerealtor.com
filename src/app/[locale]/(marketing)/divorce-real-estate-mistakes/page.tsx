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

const path = '/divorce-real-estate-mistakes';

type IMistakesProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const faqs = [
  {
    question: 'What is the single most expensive mistake in a divorce home sale?',
    answer: 'Agreeing to a buyout before the keeping spouse has a lender\'s written pre-qualification on one income. When the refinance fails months later, the home must be sold anyway, after carrying costs, a second valuation, and often a motion. Get the qualification letter first, then negotiate the buyout figure.',
  },
  {
    question: 'Should we price high to leave room for negotiation?',
    answer: `No. With ${LVR_SEPT_2026.availableSfrListings} single-family homes available in September 2026, buyers compare every listing against the closed comparables. An overpriced divorce listing sits while the comparables sell, then takes reductions that signal distress. Price from closed sales and let competition, not the list price, set the ceiling.`,
  },
  {
    question: 'Can I just quitclaim the house to my spouse and walk away?',
    answer: 'A quitclaim or interspousal deed transfers your ownership interest but does not remove you from the mortgage. If your former spouse misses payments, the lender pursues you and your credit takes the hit. Transfer the deed only when the refinance in their name has funded, or when the decree sets a refinance deadline with a sale as the fallback.',
  },
  {
    question: 'Is it a mistake to stay in the house during the sale?',
    answer: 'Not by itself. It is a mistake to stay without a written agreement on who pays the mortgage, taxes, insurance, and HOA, who keeps the home show-ready, and what notice showings require. Vacant and staged homes tend to show better, but three housing payments can strain both budgets. Decide on paper before listing.',
  },
  {
    question: 'What should be in the listing agreement that usually is not?',
    answer: 'Authority language: both spouses sign, the initial price comes from a stated valuation, reductions follow a schedule without new signatures, any offer at or above a named floor must be accepted, and access terms are fixed. Without those, one spouse can stall the sale by refusing to sign a price change.',
  },
  {
    question: 'Will telling the buyer we are divorcing speed things up?',
    answer: 'It will cost you money. Buyers who know the sellers must sell negotiate harder on price and repairs. Nevada requires disclosure of material facts about the property, not the sellers\' circumstances. Let the listing agent handle the question with a professional non-answer and keep the divorce out of the negotiation.',
  },
];

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Divorce Real Estate Mistakes to Avoid | Dr. Jan Duffy',
    description: 'The 7 mistakes that cost divorcing Las Vegas homeowners money: unqualified buyouts, overpricing, quitclaiming while on the loan, no listing authority, and telling buyers.',
    alternates: { canonical, languages },
  };
}

export default async function MistakesToAvoid(props: IMistakesProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = path;
  const description = 'The seven mistakes that cost divorcing Las Vegas homeowners money: unqualified buyouts, overpricing, quitclaiming while still on the loan, missing listing authority, and telling buyers.';
  const articleSchema = generateArticleSchema(
    'Divorce Real Estate Mistakes to Avoid',
    description,
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Real Estate Mistakes Guide Services',
    description,
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Divorce Real Estate Mistakes to Avoid"
        heroSubhead="Seven decisions that cost divorcing homeowners money, and what to do instead"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="What are the most common real estate mistakes in a divorce?">
          Agreeing to a buyout before the keeping spouse is pre-qualified on one income, pricing from what one spouse needs rather than from closed sales, signing a quitclaim deed while still on the mortgage, listing without authority language that survives one spouse going silent, letting buyers learn about the divorce, ignoring the tax timing, and leaving the deferred-sale terms unwritten.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Sold within 30 days of listing', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Available single-family listings', value: LVR_SEPT_2026.availableSfrListings },
            { label: '2026 jumbo loan line, Clark County', value: LUXURY_2026.jumboThreshold2026 },
          ]}
          source={`${LVR_SEPT_2026.source}; ${LUXURY_2026.jumboSource}`}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Mistake 1: Agreeing to a buyout nobody has qualified for</h2>
          <p>
            A buyout only works if the keeping spouse can refinance the existing loan plus the cash-out for the other's share, on one income, with post-decree support counted the way lenders count it. Couples agree on a number first and discover months later that the refinance will not fund. By then the home still has to be sold, after carrying costs and often a motion.
          </p>
          <p>
            Reverse the order. The keeping spouse gets a lender's written pre-qualification at the likely buyout loan amount before the figure goes into the stipulation. Above
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            that loan is jumbo, with tighter reserve and debt-ratio rules. The stipulation should also set a refinance deadline with a sale as the fallback so a failed refinance does not restart the case. See
            {' '}
            <Link href="/divorce-buyout-options" className="text-blue-600 underline hover:text-blue-700">buyout options</Link>
            .
          </p>

          <h2>Mistake 2: Pricing from need instead of from closed sales</h2>
          <p>
            One spouse needs the home to be worth enough to fund a down payment; the other wants it priced to move. Neither number is the market. In September 2026, Las Vegas had
            {' '}
            {LVR_SEPT_2026.availableSfrListings}
            {' '}
            single-family homes available, and buyers compare every listing against the closed comparables. An overpriced divorce listing sits while the comparables sell.
          </p>
          <p>
            The fix is a written broker price opinion delivered to both spouses and both attorneys at the same time, with the comparable sales attached, and a reduction schedule in the listing agreement. When
            {' '}
            {LVR_SEPT_2026.soldWithin30DaysPct}
            {' '}
            of homes sell within 30 days, a listing that passes 30 days without an offer is telling you something about price, not about the market.
          </p>

          <h2>Mistake 3: Signing a quitclaim while still on the mortgage</h2>
          <p>
            A quitclaim or interspousal deed transfers ownership. It does nothing to the loan. The spouse who deeds away the house and stays on the mortgage remains liable for every payment, and a missed payment lands on their credit while they are trying to qualify for their next home. Lenders do not care what the decree says about who pays.
          </p>
          <p>
            Deed the property only when the refinance in the other spouse's name has funded, or under a decree that sets a refinance deadline and orders a sale if it is missed. If the keeping spouse cannot refinance now, a deferred sale with written carrying terms is safer than a deed that leaves you exposed. See
            {' '}
            <Link href="/refinancing-after-divorce" className="text-blue-600 underline hover:text-blue-700">refinancing after divorce</Link>
            .
          </p>

          <h2>Mistake 4: A listing agreement with no authority language</h2>
          <p>
            A standard listing agreement assumes the sellers agree with each other. A divorce listing needs more: both spouses sign, the initial price comes from a stated valuation, reductions follow a schedule without new signatures, any offer at or above a named floor must be accepted, and access and show-ready terms are fixed. Without those, one spouse can stall the sale by declining to sign.
          </p>
          <p>
            The same terms belong in the stipulation or order so counsel can enforce them. Weekly written status reports to both attorneys, recording showings, refusals, and offers with dates, turn an obstruction claim into a short motion with exhibits. The language that has worked in Clark County cases is laid out on the
            {' '}
            <Link href="/attorney-resources" className="text-blue-600 underline hover:text-blue-700">attorney resources</Link>
            {' '}
            page.
          </p>

          <h2>Mistake 5: Letting buyers learn about the divorce</h2>
          <p>
            Buyers who know the sellers must sell negotiate harder on price, repairs, and closing dates. Nevada requires disclosure of material facts about the property, not about the sellers' circumstances. A yard sign on day one, a spouse who answers the showing agent's question, or a neighbor's comment can cost more than any commission difference.
          </p>
          <p>
            Keep the divorce out of the listing. A Coming Soon period on the MLS, no sign at first, personal items out before photos, and direct outreach to agents active in your area limit exposure while still reaching buyers. The listing agent fields the why-are-they-selling question with a professional non-answer every time. More on privacy in the
            {' '}
            <Link href="/divorce-real-estate-guide-divorcing-couples" className="text-blue-600 underline hover:text-blue-700">guide for divorcing couples</Link>
            .
          </p>

          <h2>Mistake 6: Ignoring tax timing</h2>
          <p>
            {NEVADA_LAW.capitalGainsExclusion}
            {' '}
            A couple with a large gain who sells after the decree as two single filers may lose half the exclusion. A spouse who keeps the home and sells years later may have a gain that outgrew the single cap. The timing of the sale relative to the decree, and whether the couple can still file jointly that year, is a real number.
          </p>
          <p>
            {NEVADA_LAW.noStateIncomeTax}
            {' '}
            {NEVADA_LAW.transferTaxDivorceExemption}
            {' '}
            A sale to a third party owes Clark County transfer tax at
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000. Bring a CPA in before the stipulation is signed, not after. See
            {' '}
            <Link href="/capital-gains-tax-divorce-home-sale" className="text-blue-600 underline hover:text-blue-700">capital gains tax on a divorce home sale</Link>
            .
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>Mistake 7: A deferred sale with the terms unwritten</h2>
          <p>
            Keeping the home in both names until a child finishes a school year or the market moves can be sensible. It fails when nobody wrote down who pays the mortgage, taxes, insurance, HOA, and repairs, who lives there, how the eventual sale is priced, and what happens if a payment is missed. Each unwritten term becomes the next dispute.
          </p>
          <p>
            Put the carrying terms, the sale date or trigger, the pricing method, and the default remedy in the stipulation. Revisit the valuation at the trigger date rather than relying on the number from the decree. A written broker price opinion at the start and again at the sale date keeps both spouses on the same page. See
            {' '}
            <Link href="/what-to-do-with-house-in-divorce" className="text-blue-600 underline hover:text-blue-700">what to do with the house in divorce</Link>
            .
          </p>
        </div>

        <HighValueHomeNote
          title="Mistakes that cost more above the jumbo line"
          points={[
            `A jumbo buyout above ${LUXURY_2026.jumboThreshold2026} needs documented reserves and a lower debt ratio than a conforming loan; a verbal "I can qualify" is the most expensive assumption in a luxury divorce.`,
            'Ordering a single appraisal on a custom home invites a challenge; agree a two-appraisal protocol with a tie-breaker before either report exists.',
            'Forgetting club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, or The Summit Club leaves a separate asset undivided and a transfer fee unallocated.',
            `On a $2,000,000 sale the transfer tax alone is ${NEVADA_LAW.transferTaxExample2M}; leaving it unallocated in the stipulation starts an argument at closing.`,
            'Public marketing of an estate can expose a spouse\'s business or personal affairs; off-market exposure to a vetted buyer pool is an option to decide on before photos are taken.',
          ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Fifteen minutes on the property, where the case stands, and which of these decisions is in front of you.' },
            { title: 'Valuation and net sheet', detail: 'A written broker price opinion and net sheet to both spouses and both counsel, so the numbers are shared before anyone commits.' },
            { title: 'Plan on paper', detail: 'Listing authority language, a buyout worksheet with the refinance figure, or deferred-sale carrying terms for counsel to review.' },
          ]}
          callPromise="You leave the call knowing which mistake you are closest to and the document that prevents it."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
