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

type IQuitclaimProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/quitclaim-deed-divorce';
const pageTitle = 'Quitclaim Deed in a Las Vegas Divorce';
const pageDescription = 'A quitclaim deed moves title to one spouse but leaves both names on the loan. See when to sign it, how Clark County records it, and the NRS 375.090 exemption.';

const faqs = [
  {
    question: 'Does a quitclaim deed remove me from the mortgage?',
    answer: 'No. The deed transfers your ownership interest and is recorded with the Clark County Recorder. The loan is a separate contract with the lender, and your name stays on it until the keeping spouse refinances, the lender approves an assumption with a written release, or the house sells. Signing the deed first and refinancing never is the most common post-divorce mistake.',
  },
  {
    question: 'When should the quitclaim deed be signed in a Nevada divorce?',
    answer: 'Usually after the decree is entered and at or just before the refinance closing. A deed recorded before the decree is not a transfer made under a decree, so the transfer tax exemption may not apply. Many attorneys have the departing spouse sign the deed in advance and hold it in escrow until the refinance funds, so neither spouse gives up title or liability alone.',
  },
  {
    question: 'Is there transfer tax on a quitclaim deed between former spouses?',
    answer: `${NEVADA_LAW.transferTaxDivorceExemption} The exemption is claimed on the Declaration of Value filed with the deed, citing ${NEVADA_LAW.transferTaxCite}. A sale would pay ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000 of value instead. ${LEGAL_DISCLAIMER}`,
  },
  {
    question: 'Quitclaim deed or grant, bargain and sale deed: which is used in Nevada?',
    answer: 'Both are used. A quitclaim conveys whatever interest the signer has, with no promises about title. A grant, bargain and sale deed carries limited warranties. Between spouses who were both on title, the quitclaim is common and sufficient, but some lenders and title companies prefer an interspousal or grant deed at a refinance. Your attorney and the title company will choose the form.',
  },
  {
    question: 'Will the lender call the loan due when title changes?',
    answer: 'A transfer to a spouse under a divorce decree is protected from the due-on-sale clause by federal law, so the quitclaim itself does not trigger a payoff demand. It also releases no one. Tell the servicer about the transfer, keep the loan current, and complete the refinance or assumption within the deadline the decree sets.',
  },
  {
    question: 'What if the deed was signed but never recorded?',
    answer: 'An unrecorded deed can still be valid between the two spouses, but the public record shows both names, which confuses title searches, tax bills, and future sales. Record it with the Clark County Recorder along with the Declaration of Value. If the original is lost, a new deed can be signed, or a court order can confirm the transfer.',
  },
];

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: `${pageTitle} | Dr. Jan Duffy`,
    description: pageDescription,
    alternates: { canonical, languages },
  };
}

export default async function QuitclaimDeed(props: IQuitclaimProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = path;
  const articleSchema = generateArticleSchema(
    pageTitle,
    pageDescription,
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const serviceSchema = generateServiceSchema(
    'Divorce Deed Transfer Coordination',
    pageDescription,
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, serviceSchema, realEstateAgentSchema, faqSchema]} />
      <DivorcePageTemplate
        h1={pageTitle}
        heroSubhead="What the deed does, and what it does not"
        currentPath={currentPath}
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="What does a quitclaim deed do in a Nevada divorce?">
          A quitclaim deed transfers one spouse's ownership interest in the home to the other. It is signed, notarized, and recorded with the Clark County Recorder along with a Declaration of Value. It changes title only. Both names stay on the mortgage until the keeping spouse refinances, the lender approves an assumption with a written release, or the house sells. A transfer made under the decree is exempt from Nevada transfer tax.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Clark County transfer tax per $1,000 (sale)', value: NEVADA_LAW.transferTaxClarkPer1000 },
            { label: 'Transfer tax on a decree transfer', value: 'Exempt' },
            { label: '2026 jumbo loan line, Clark County', value: LUXURY_2026.jumboThreshold2026 },
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
          ]}
          source={`${NEVADA_LAW.transferTaxCite}; ${LUXURY_2026.jumboSource}; ${LVR_SEPT_2026.source}`}
          sourceUrl={NEVADA_LAW.transferTaxUrl}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>What a quitclaim deed transfers</h2>
          <p>
            A quitclaim deed conveys whatever interest the signer holds in the property, with no warranty that the title is clear. In a divorce where both spouses are already on title, that is usually enough: the departing spouse signs away their half, the keeping spouse ends up as sole owner of record. Nevada also uses grant, bargain and sale deeds and interspousal transfer deeds for the same job, and the title company or attorney picks the form.
          </p>
          <p>
            The deed names the grantor (the spouse giving up the interest), the grantee (the spouse receiving it), the legal description and parcel number, and the consideration. In a decree transfer the consideration is typically stated as the property division, not a dollar sale price. It is signed before a notary and delivered to the recorder with the Declaration of Value form.
          </p>

          <h2>Why the deed does not touch the mortgage</h2>
          <p>
            The deed is a contract about ownership. The loan is a contract about money, and the lender is not a party to the deed. After the quitclaim records, the departing spouse owns nothing and still owes everything until the keeping spouse refinances, the lender approves an assumption with a written release of liability, or the house sells and the loan is paid off. That is the single most important fact on this page.
          </p>
          <ul>
            <li>A late payment after the deed records still posts to the departing spouse's credit.</li>
            <li>The old loan still counts in the departing spouse's debt-to-income ratio when they apply for their own mortgage.</li>
            <li>If the keeping spouse defaults, the lender forecloses and reports it against both borrowers.</li>
          </ul>
          <p>
            Federal law protects a transfer to a spouse under a divorce decree from the loan's due-on-sale clause, so the quitclaim does not trigger a payoff demand. It also releases no one. The
            {' '}
            <Link href="/remove-spouse-from-mortgage-after-divorce" className="text-blue-600 underline hover:text-blue-700">mortgage removal guide</Link>
            {' '}
            covers the three ways the loan actually changes. Above
            {' '}
            {LUXURY_2026.jumboThreshold2026}
            {' '}
            that refinance is jumbo and underwritten on the keeping spouse's income alone, with reserves.
          </p>
          <p className="text-sm text-gray-600">{LEGAL_DISCLAIMER}</p>

          <h2>Recording with the Clark County Recorder</h2>
          <p>
            The signed and notarized deed is recorded with the Clark County Recorder together with a Declaration of Value. That form is where the transfer tax exemption is claimed.
            {' '}
            {NEVADA_LAW.transferTaxDivorceExemption}
            {' '}
            Cite
            {' '}
            {NEVADA_LAW.transferTaxCite}
            {' '}
            on the form and have the decree pages available if the recorder asks for them.
          </p>
          <p>
            Without the exemption, Clark County charges
            {' '}
            {NEVADA_LAW.transferTaxClarkPer1000}
            {' '}
            per $1,000 of value, which is
            {' '}
            {NEVADA_LAW.transferTaxExample2M}
            . The exemption is worth real money on any home, and far more on a home in The Ridges, MacDonald Highlands, or a Strip high-rise. Title companies record deeds daily and usually handle this at the refinance closing; an attorney's office can record a standalone deed when there is no refinance.
          </p>
          <ol>
            <li>Confirm the decree is entered and awards the home to the grantee.</li>
            <li>Prepare the deed with the exact legal description and assessor's parcel number from the current vesting deed.</li>
            <li>Sign before a notary. Complete the Declaration of Value with the exemption and citation.</li>
            <li>Record. Keep the recorded copy with the decree, and send a copy to the lender and the HOA.</li>
          </ol>
          <p className="text-sm text-gray-600">{LEGAL_DISCLAIMER}</p>

          <h2>Timing: before the decree, at the decree, or at the refinance</h2>
          <p>
            The best timing is usually at the refinance closing, after the decree is entered. The departing spouse signs the deed in advance and the title company holds it, then records it the day the new loan funds. That way neither spouse gives up title while still owing on the loan, and the transfer tax exemption clearly applies because the decree already exists.
          </p>
          <ul>
            <li>
              <strong>Before the decree:</strong>
              {' '}
              risky. The transfer is not yet under a decree, the exemption may be denied, and the grantor has given up ownership with the loan unchanged.
            </li>
            <li>
              <strong>At the decree with no refinance:</strong>
              {' '}
              workable when the loan will be assumed or the house will sell soon. The decree should set that deadline.
            </li>
            <li>
              <strong>At the refinance closing:</strong>
              {' '}
              the lender gets clean title, the departing spouse gets off the loan, and the deed and payoff happen on the same day.
            </li>
          </ul>

          <h2>Title insurance, liens, and what the deed does not promise</h2>
          <p>
            A quitclaim deed makes no promise that title is clear. Liens recorded against either spouse, an unpaid HOA assessment, or a judgment follow the property. Before the deed records, order a title report or a lender's title commitment so the keeping spouse knows what they are taking on. A refinance lender requires this anyway; a standalone transfer often skips it, which is where surprises come from.
          </p>
          <p>
            The keeping spouse's existing owner's title policy generally continues to cover them after a transfer from a spouse, but confirm with the title company. If a sale is coming, the buyer's title company will search back through the divorce transfer, so a clean recorded deed with the decree reference saves days in escrow.
          </p>

          <h2>Mistakes that come back later</h2>
          <p>
            Most quitclaim problems surface years after the divorce, when the keeping spouse sells or refinances or the departing spouse applies for a loan. The common ones are easy to prevent at the time of the decree, and each one costs more to fix later than it would have cost to get right at recording. Check the list before the deed is signed.
          </p>
          <ul>
            <li>Signing the deed and never refinancing. The departing spouse is off title and on the loan, with no deadline.</li>
            <li>Recording before the decree is entered and losing the transfer tax exemption.</li>
            <li>A legal description copied wrong, so the deed conveys the wrong parcel or none of it.</li>
            <li>Forgetting the HOA. The association keeps billing both owners until it sees the recorded deed.</li>
            <li>Leaving a club membership unaddressed. At Red Rock Country Club, DragonRidge, Anthem Country Club, or The Summit Club the membership transfers under club rules, not with the deed.</li>
          </ul>
        </div>

        <HighValueHomeNote points={[
          `A decree transfer is exempt from transfer tax, which on a sale would be ${NEVADA_LAW.transferTaxExample2M}. Confirm the exemption and citation are on the Declaration of Value before recording.`,
          `When the keeping spouse refinances above ${LUXURY_2026.jumboThreshold2026}, the jumbo lender underwrites their income alone with reserves, and wants the deed recorded at closing so title is clean.`,
          'Custom homes in The Ridges or MacDonald Highlands can draw appraisals far apart. Set the buyout from a two-appraisal protocol before the deed is signed, not after.',
          'Club memberships at Red Rock Country Club, DragonRidge, Anthem Country Club, and The Summit Club transfer under club rules, not the deed. Name the membership and the transfer fee in the decree.',
          'Order a title report before a standalone transfer. Liens and special assessments on a large home are the surprises that cost the most later.',
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Who is keeping the house, whether a refinance is planned, and what the decree currently says about the deed.' },
            { title: 'Title and loan check', detail: 'Current vesting, liens, HOA status, and the loan type, so the deed and the mortgage plan line up.' },
            { title: 'Sequence with your attorney', detail: 'Deed timing, the refinance or sale deadline, and the transfer tax exemption, written into the decree.' },
            { title: 'Record and confirm', detail: 'Deed recorded with the exemption, copies to the lender and HOA, loan refinanced or released.' },
          ]}
          callPromise="You leave the call knowing when to sign the deed, when to record it, and how to keep it from costing you tax."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
