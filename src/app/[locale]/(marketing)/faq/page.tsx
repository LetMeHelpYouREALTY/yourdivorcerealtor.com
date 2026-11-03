import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { CalendlyInline } from '@/components/calendly/CalendlyInline';
import { CalendlyLink } from '@/components/calendly/CalendlyLink';
import { DirectAnswer } from '@/components/divorce/DirectAnswer';
import { DivorcePageTemplate } from '@/components/divorce/DivorcePageTemplate';
import { FAQAccordion } from '@/components/faq/FAQAccordion';
import { StructuredData } from '@/components/seo/StructuredData';
import { CONTENT_LAST_UPDATED, toSchemaDateTime } from '@/lib/content-dates';
import { COMMUNITY_12MO, LEGAL_DISCLAIMER, LUXURY_2026, NEVADA_LAW } from '@/lib/market-data';
import { generateLocaleAlternates, getCanonicalSiteUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateRealEstateAgentSchema,
} from '@/lib/schema';

type IFAQProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/faq';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Las Vegas Divorce Real Estate Questions | Dr. Jan Duffy',
    description: 'Twenty answers on selling, buyouts, deeds, court-ordered sales, and luxury issues: jumbo refinancing, appraisal spread, and $5.10 per $1,000 transfer tax.',
    alternates: { canonical, languages },
  };
}

export default async function FAQ(props: IFAQProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/faq';
  const faqs = [
    {
      question: 'Do I need to sell my home during divorce?',
      answer: 'Not necessarily. You have four options: sell and split the net proceeds, one spouse buys out the other, co-own for a set period, or refinance to remove one spouse from the loan. Which one fits depends on equity, who can carry the loan alone, and the timeline in your case. Each option gets a number and a date so you can compare them.',
    },
    {
      question: 'How do I know what my home is worth?',
      answer: 'A written valuation built from closed comparable sales in your subdivision or tower, active competition, and the condition of the home, minus loan payoff, liens, and selling costs. Both spouses receive the same report. It supports settlement talks, the buyout figure, and, when a judge needs it, testimony.',
    },
    {
      question: 'What if my spouse won\'t cooperate?',
      answer: 'The listing plan sets showing access and sign-off deadlines in writing before the home goes live. If a spouse blocks showings or will not sign, the escalation protocol documents each event with dates so counsel can act on a record. Neutrality holds throughout; the sale moves on the schedule, not on the argument.',
    },
    {
      question: 'How long does selling a home during divorce take?',
      answer: 'It depends on price band, condition, and any court order or settlement terms. You receive a dated timeline before listing: list date, expected contract date, close date, and move-out date. Most Las Vegas sales run 60 to 90 days from listing to closing; custom homes above $1 million often take longer.',
    },
    {
      question: 'Can one spouse keep the home?',
      answer: 'Yes. The staying spouse buys out the other spouse\'s share. That takes a valuation, a buyout figure based on net equity, and a refinance into one name so the leaving spouse comes off the loan. The decree or settlement sets the figure; the lender needs it before underwriting.',
    },
    {
      question: 'What is a quitclaim deed?',
      answer: 'A quitclaim deed transfers whatever interest one person holds in a property to another. In divorce it moves one spouse\'s interest to the other as part of a buyout or division. It does not remove anyone from the mortgage; that takes a refinance. A deed between former spouses under the decree is exempt from Nevada transfer tax.',
    },
    {
      question: 'Do I need a realtor if I\'m going through a divorce?',
      answer: 'Not by law. A divorce listing has two owners, two attorneys, and often a decree that controls price, timing, and disbursement. A specialist builds the listing around that: written showing rules, sign-off deadlines, escrow instructions counsel approves, and one update to everyone. That is what keeps the sale out of court a second time.',
    },
    {
      question: 'How much does divorce real estate service cost?',
      answer: 'The first call is free. On a sale, compensation is a commission paid from proceeds at closing, agreed in writing before listing. Valuation reports for mediation or court, and testimony, are quoted separately. Every fee is in writing before work starts so both spouses and both attorneys see the same terms.',
    },
    {
      question: 'What if the court orders us to sell?',
      answer: 'The order controls the sale: list price, price-reduction schedule, showing access, and how proceeds are disbursed. The listing follows it as written and progress is reported back to the court and both counsel. If a party blocks the sale, the record of each event goes to counsel so the court can act.',
    },
    {
      question: 'Can I buy a new home before the divorce is final?',
      answer: 'Yes, with care. A home bought before the decree may be community property under Nevada law unless the settlement says otherwise, and lenders count your current mortgage against you until the refinance or sale closes. Talk with counsel and a lender before writing an offer. Timing the purchase after the decree is often simpler.',
    },
    {
      question: 'Do I need to disclose the divorce to buyers?',
      answer: 'No. Divorce is a personal matter—you are not obligated to disclose it to buyers. You must disclose material facts that affect the property, but divorce is not one of them. Your agent will deflect "why are you selling" questions professionally and protect your confidentiality.',
    },
    {
      question: 'Can we defer the sale of our home?',
      answer: 'Yes. You can agree between yourselves or have a court order to delay the sale, for example to let children finish school or wait for a better market. If you defer the sale, you must agree in writing on who pays the mortgage, taxes, insurance, and maintenance until the home sells.',
    },
    {
      question: 'Should we live in the home while it\'s on the market?',
      answer: 'It depends on your finances and staging goals. Vacated and staged homes often sell faster and for more money. If someone stays, remove personal items (family photos, children\'s belongings), keep the home show-ready, and be flexible with showings. Having one person stay can help with housing costs if you cannot afford three payments.',
    },
    {
      question: 'What if we own multiple properties?',
      answer: 'The same principles apply—divide or sell each property. With multiple properties you have more options, such as offsetting values between homes. An attorney can help structure the division, for example using LLCs or a trust to manage sales and disbursements.',
    },
    {
      question: 'Can I refinance a jumbo loan to buy out my spouse?',
      answer: `Often, yes, but underwriting is stricter. In 2026 any Clark County loan above ${LUXURY_2026.jumboThreshold2026} is jumbo. Jumbo lenders want the staying spouse to qualify on one income, show reserves, and document the buyout funds. The decree or settlement sets the buyout figure, and the lender needs it before underwriting. Start the lender conversation before the valuation so the number you agree to is one you can borrow.`,
    },
    {
      question: 'Why do two appraisals on a custom home come back so far apart?',
      answer: `Custom homes have few true comparables. In The Ridges, 12-month sales ran from ${COMMUNITY_12MO.theRidges.lowSale} to ${COMMUNITY_12MO.theRidges.highSale}, so two appraisers choosing different comps and view adjustments can land hundreds of thousands apart. The fix is a two-appraisal protocol written into the agreement: each spouse selects an appraiser, and the agreement names how a gap is resolved, by averaging or by a third report.`,
    },
    {
      question: 'What happens to our country club membership in the divorce?',
      answer: 'Memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, and The Summit Club are separate from the deed. Transfer rules, deposits, resignation lists, and whether a buyer can assume the membership are set by club bylaws, not the decree. Ask the club for its transfer policy in writing before the settlement is drafted, so the agreement names who keeps the membership and who pays dues until then.',
    },
    {
      question: 'How do showings work in a guard-gated community during a divorce?',
      answer: 'No open houses. Each showing is called in to the gate with the agent\'s name, the buyer\'s name, and a time window, and the buyer is verified before entry. Both spouses agree in writing to a showing schedule, who vacates during showings, and whether private-network exposure comes before the public MLS. That protects privacy and gives the court a clean record if access is later disputed.',
    },
    {
      question: 'We have about $2 million of gain on the house. How much is excluded from tax?',
      answer: `Section 121 excludes up to $250,000 of gain for a single filer and $500,000 for a married couple filing jointly, if you owned and used the home as your main residence for 2 of the last 5 years. On a $2,000,000 gain that leaves at least $1,500,000 taxable, so whether you sell before or after the decree can change the result. ${NEVADA_LAW.noStateIncomeTax} Confirm the timing with a CPA.`,
    },
    {
      question: 'Who pays Nevada transfer tax on a $2 million sale?',
      answer: `Clark County charges ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of value, which is ${NEVADA_LAW.transferTaxExample2M}. By local custom the seller pays it, though the contract can shift it. ${NEVADA_LAW.transferTaxDivorceExemption} So a buyout deed under the decree owes no transfer tax, but a later sale to a third party does.`,
    },
  ];

  const faqPageSchema = generateFAQPageSchema(faqs);
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const articleSchema = generateArticleSchema(
    'Las Vegas Divorce Real Estate Questions',
    'Twenty answers on selling, buyouts, quitclaim deeds, court-ordered sales, and luxury issues such as jumbo refinancing, appraisal spread, and transfer tax.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );

  return (
    <>
      <StructuredData data={[articleSchema, faqPageSchema, realEstateAgentSchema]} />
      <DivorcePageTemplate
        h1="Divorce Real Estate Questions"
        heroSubhead="Selling, buyouts, deeds, court orders, and what changes above $1 million."
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <div className="mx-auto max-w-4xl">
          <DirectAnswer question="What are the most common divorce real estate questions in Las Vegas?">
            Whether you must sell, what the house is worth, how a buyout and refinance work, how long a sale takes, and
            what a court order controls. For homes above the 2026 jumbo line of
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            the questions shift to jumbo underwriting, appraisal spread on custom homes, club membership transfer,
            guard-gated showings, Section 121 on a large gain, and transfer tax. All twenty are answered below.
          </DirectAnswer>

          <div className="prose prose-lg mt-10 mb-12">
            <h2>Twenty questions, answered with numbers</h2>
            <p>
              The first fourteen cover every divorce sale. The last six cover what changes when the home is a custom
              build in The Ridges or MacDonald Highlands, a club property, or a Strip tower. If your question is not
              here, a 15-minute call usually answers it.
            </p>
          </div>

          {/* Interactive FAQ Accordion */}
          <div className="mb-4">
            <FAQAccordion faqs={faqs} />
          </div>
          <p className="mb-12 text-sm text-gray-600 italic">{LEGAL_DISCLAIMER}</p>

          <div className="mb-12">
            <h3 className="mb-4 text-xl font-bold text-gray-900">Ask about your house</h3>
            <p className="mb-4 text-gray-600">
              A private 15-minute call, no fee. You leave with a value range, your options, and the next decision.
            </p>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <CalendlyInline />
            </div>
          </div>

          <div className="prose prose-lg max-w-none rounded-lg bg-gray-50 p-8">
            <h2>Still have a question?</h2>
            <p>
              Most remaining questions are about one house, one loan, and one decree. Those are answered on a call, with
              the address and the paperwork in front of us.
            </p>

            <h3>What to have ready</h3>
            <ul>
              <li>Filed paperwork or the settlement draft, if there is one</li>
              <li>Loan balance, any HELOC, and any liens</li>
              <li>Any court order that mentions the house</li>
              <li>For a club property, the membership agreement</li>
            </ul>
            <p className="mt-6">
              <CalendlyLink className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700">
                Schedule a private 15-minute call
              </CalendlyLink>
            </p>
          </div>
        </div>
      </DivorcePageTemplate>
    </>
  );
}
