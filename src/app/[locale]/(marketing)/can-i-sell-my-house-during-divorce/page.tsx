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

const path = '/can-i-sell-my-house-during-divorce';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Can I Sell My House During a Divorce? | Dr. Jan Duffy',
    description: 'Yes. Learn the 4 situations where a Nevada divorce home sale can proceed, which signatures the title company needs, and what happens when one spouse refuses.',
    alternates: { canonical, languages },
  };
}

export default async function CanISellMyHouseDuringDivorce(props: PageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = '/can-i-sell-my-house-during-divorce';

  const faqs = [
    {
      question: 'Can I sell my house before the divorce is final?',
      answer: 'Yes, with both spouses\' signatures or a court order. Many Las Vegas couples sell while the case is open because it resolves the largest asset early and stops joint mortgage payments. The net proceeds stay in escrow until a stipulation or the decree tells the title company how to split them.',
    },
    {
      question: 'Can one spouse sell the house without the other?',
      answer: 'Not when both are on title. The listing agreement, purchase contract, and deed each need both signatures. The exception is a court order that authorizes one spouse or a court-appointed agent to sign. If the home is titled to one spouse alone, the other may still have a community interest in it.',
    },
    {
      question: 'Do I need court approval to sell during a divorce?',
      answer: 'Only when the spouses cannot agree, when a standing order restricts transfers of assets, or when the decree already sets sale terms. Your attorney will tell you which applies. When both spouses agree, a signed stipulation filed with the court is usually enough to let escrow proceed.',
    },
    {
      question: 'What if my spouse refuses to sell?',
      answer: 'Try mediation first, with a written valuation and net sheet on the table. If that fails, your attorney can file a motion asking the court to order the sale and, if needed, appoint a neutral agent. Document every refused showing or missed signature in the meantime.',
    },
    {
      question: 'How are the proceeds split in Nevada?',
      answer: `${NEVADA_LAW.communityPropertyRule} In practice that means an even split of net proceeds after the mortgage, liens, and closing costs, adjusted for any documented separate-property contribution such as a down payment from an inheritance.`,
    },
    {
      question: 'Does selling during divorce change my capital gains tax?',
      answer: 'It can. A married couple filing jointly may exclude up to $500,000 of gain under Section 121; a single filer may exclude $250,000. A spouse who moved out can still count the other spouse\'s continued use under a divorce instrument. Ask your tax advisor before you pick a closing date.',
    },
  ];

  const articleSchema = generateArticleSchema(
    'Can I Sell My House During a Divorce?',
    'Yes. When a Nevada divorce home sale can proceed, which signatures are required, what court approval looks like, and what to do when one spouse refuses.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Home Sale Services',
    'Neutral listing representation for Las Vegas homeowners selling before or during a divorce, with court-aware timelines and escrow instructions that match the decree.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Can I Sell My House During a Divorce? Yes, Here's How"
        heroSubhead="Who has to sign, when the court gets involved, and how the money is split"
        showHomeValue
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="Can I sell my house during a divorce in Nevada?">
          Yes. A home can be sold while a Nevada divorce is open when both spouses sign, or when a court
          order authorizes the sale. Both names on title means both signatures on the listing, the
          contract, and the deed. Net proceeds stay in escrow until a stipulation or the decree directs
          the split. If one spouse refuses, the court can order the sale.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Las Vegas single-family median, September 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: 'Homes sold within 30 days of listing', value: LVR_SEPT_2026.soldWithin30DaysPct },
            { label: 'Single-family closings in the month', value: LVR_SEPT_2026.sfrUnitsSold },
          ]}
          source={LVR_SEPT_2026.source}
          sourceUrl={LVR_SEPT_2026.url}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>The four situations where you can sell</h2>
          <p>
            A divorce home sale proceeds in four situations: both spouses agree, the case is still open
            and a stipulation authorizes the sale, the decree is final and orders or permits the sale,
            or the court orders a sale because the spouses cannot agree. Which one applies decides whose
            signature the title company needs and who sets the terms.
          </p>
          <h3>1. Both spouses agree</h3>
          <p>
            The simplest path. Both sign the listing agreement, agree on price and showing rules, and
            file a stipulation so escrow knows how to split proceeds. The sale runs at market speed.
          </p>
          <h3>2. Before the decree is entered</h3>
          <p>
            Selling while the case is open stops joint mortgage payments and resolves the largest asset
            early. The filing may trigger a standing order that restricts asset transfers, so your
            attorney files the stipulation first. Tax treatment can differ by closing date; see
            {' '}
            <Link href="/selling-house-before-or-after-divorce" className="text-blue-600 underline hover:text-blue-700">selling before or after the divorce</Link>
            .
          </p>
          <h3>3. After the decree</h3>
          <p>
            If the decree orders the sale, its terms control: listing date, price floor, who signs, and
            how proceeds split. If the decree is silent and both names remain on title, both spouses
            must still sign.
          </p>
          <h3>4. Court-ordered sale</h3>
          <p>
            When spouses cannot agree, the court can order the sale and appoint a neutral agent. The
            order sets the terms and the agent reports to both attorneys. See
            {' '}
            <Link href="/court-ordered-home-sale" className="text-blue-600 underline hover:text-blue-700">court-ordered home sales</Link>
            .
          </p>

          <h2>Who has to sign</h2>
          <p>
            In Nevada, every owner on title signs the listing agreement, the purchase contract, and the
            deed. A spouse who is not on title may still hold a community interest, so title companies
            often ask for that spouse's signature or a court order too. A court order can substitute for
            a missing signature when a spouse refuses.
          </p>
          <ul>
            <li>
              <strong>Listing agreement:</strong>
              {' '}
              both owners, or the court-appointed agent under the order.
            </li>
            <li>
              <strong>Purchase contract and counteroffers:</strong>
              {' '}
              both owners, unless the order gives authority to one.
            </li>
            <li>
              <strong>Deed and closing documents:</strong>
              {' '}
              both owners, signed in front of a notary. A spouse out of state can sign remotely with escrow's approval.
            </li>
          </ul>

          <h2>When court approval is required</h2>
          <p>
            Court approval is needed when a standing order restricts transfers while the case is open,
            when the spouses disagree about selling, or when the decree already sets terms that need
            changing. When both spouses agree, a signed stipulation filed with the court usually clears
            escrow without a hearing. Your attorney tells you which applies.
          </p>
          <p>
            {NEVADA_LAW.communityPropertyRule}
            {' '}
            That rule in
            {' '}
            {NEVADA_LAW.communityPropertyCite}
            {' '}
            is why the court looks at the sale terms: a below-market price or a lopsided split can only
            stand if the judge finds a written reason. A listing priced from closed comparable sales
            protects both spouses from that challenge.
          </p>
          <p>{LEGAL_DISCLAIMER}</p>

          <h2>What if one spouse won't agree</h2>
          <p>
            You have four options, in roughly this order: mediation with a written valuation on the
            table, a buyout where the spouse who wants the home refinances and pays the other's share,
            a deferred sale with a fixed exit date, or a motion asking the court to order the sale.
            Document every refused showing or missed signature while you work through them.
          </p>
          <ul>
            <li>
              <strong>Mediation:</strong>
              {' '}
              most refusals are about the number or the move-out date, and a net sheet settles both.
            </li>
            <li>
              <strong>Buyout:</strong>
              {' '}
              needs a refinance approval before it is negotiated, not after.
            </li>
            <li>
              <strong>Deferred sale:</strong>
              {' '}
              written exit date, who pays what, and what happens on a missed payment.
            </li>
            <li>
              <strong>Court order:</strong>
              {' '}
              the court may appoint a neutral agent and set price and timing.
            </li>
          </ul>
          <p>
            Full detail at
            {' '}
            <Link href="/one-spouse-wont-sell-house-divorce" className="text-blue-600 underline hover:text-blue-700">what to do when one spouse won't sell</Link>
            .
          </p>

          <h2>Taxes and the closing date</h2>
          <p>
            {NEVADA_LAW.capitalGainsExclusion}
            {' '}
            Nevada has no state income tax, so the federal rule is the one that matters. A transfer of
            title between spouses under the decree is exempt from Nevada transfer tax; an arm's-length
            sale pays
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000 of price.
          </p>
          <p>
            Read
            {' '}
            <Link href="/capital-gains-tax-divorce-home-sale" className="text-blue-600 underline hover:text-blue-700">capital gains tax on a divorce home sale</Link>
            {' '}
            before you choose a closing date.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>

          <h2>How to proceed</h2>
          <p>
            Confirm the signing requirements with your attorney, get a written valuation with
            comparables attached, and put price, showing rules, and the proceeds split in a stipulation
            before the listing goes live. Then choose one neutral agent who copies both spouses on every
            update. The
            {' '}
            <Link href="/how-to-sell-house-during-divorce" className="text-blue-600 underline hover:text-blue-700">ten-step guide</Link>
            {' '}
            walks through each stage.
          </p>
        </div>

        <HighValueHomeNote points={[
          `A buyout above ${LUXURY_2026.jumboThreshold2026} is a jumbo refinance. Lenders underwrite income after support and require larger reserves, so the spouse keeping the home needs a pre-approval before the stipulation is drafted.`,
          'Custom homes in The Ridges, MacDonald Highlands, and Lake Las Vegas appraise with wide spread. Agree in writing to a two-appraisal protocol so a low appraisal does not reopen the property division.',
          'If the home carries a Red Rock CC, DragonRidge, Anthem CC, or Summit Club membership, decide now whether it transfers with the sale or is surrendered, and who pays the transfer fee.',
          `Transfer tax runs ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000, which is ${NEVADA_LAW.transferTaxExample2M}. A decree transfer between spouses is exempt, which favors a buyout when one spouse keeps the home.`,
          'Privacy matters more at this tier. A Coming Soon period, pre-registered guard-gate showings, and no yard sign are all available and should be agreed by both spouses in advance.',
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Tell me who is on title, whether a standing order exists, and where your spouse stands on selling.' },
            { title: 'Valuation and net sheet', detail: 'A written number your attorney can file, with the net to each spouse after payoff and costs.' },
            { title: 'Stipulation-ready terms', detail: 'Price, showing rules, and the proceeds split drafted for your attorney to file.' },
          ]}
          callPromise="You leave the call knowing which of the four situations you are in and what signature escrow will need."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
