import type { Metadata } from 'next';
import type { PageFAQItem } from '@/components/divorce/PageFAQ';
import type { ReferenceLink } from '@/lib/references-and-links';
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
  brochuresLinks,
  clarkCountyLinks,
  lawLibrariesLinks,
  stateOfNevadaLinks,
  videosLinks,
} from '@/lib/references-and-links';
import {
  generateArticleSchema,
  generateFAQPageSchema,
  generateRealEstateAgentSchema,
} from '@/lib/schema';

type ReferencesAndLinksProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/references-and-links';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Divorce and Real Estate Resources Nevada | Dr. Jan Duffy',
    description: 'Find 25+ annotated official links for a Nevada divorce home sale: Clark County courts, Family Law Self-Help Center, NRS statutes, transfer tax, IRS Section 121.',
    alternates: { canonical, languages },
  };
}

/* Market, tax, and transfer references sourced in src/lib/market-data.ts. */
const taxAndMarketLinks: ReferenceLink[] = [
  {
    title: 'Las Vegas REALTORS® monthly statistics',
    href: LVR_SEPT_2026.url,
    description: `Monthly closed sales, median price, and days on market for Clark County. The September 2026 report puts the single-family median at ${LVR_SEPT_2026.medianSfrPrice}.`,
  },
  {
    title: 'NRS 125.150, disposition of community property',
    href: NEVADA_LAW.communityPropertyUrl,
    description: 'The statute that requires an equal division of community property unless the court states a compelling reason in writing. Read subsection 1(b).',
  },
  {
    title: 'Clark County Recorder, land documents and transfer tax',
    href: NEVADA_LAW.transferTaxUrl,
    description: `Where deeds are recorded and the declaration of value is filed. Transfer tax is ${NEVADA_LAW.transferTaxClarkPer1000} per $1,000; a transfer under a divorce decree is exempt.`,
  },
  {
    title: 'IRS Publication 523, selling your home',
    href: NEVADA_LAW.capitalGainsUrl,
    description: 'The Section 121 exclusion of $250,000 single or $500,000 joint, including the divorce rule that lets a spouse who moved out count the other spouse\'s use.',
  },
];

const faqs: PageFAQItem[] = [
  {
    question: 'Where do I start if I cannot afford a divorce attorney in Las Vegas?',
    answer: 'The Family Law Self-Help Center at the Regional Justice Center provides forms, instructions, and classes at no charge, operated by Legal Aid Center of Southern Nevada under contract with Clark County. Start with its community resources page, then the e-filing guide. Legal Aid Center also offers free consultations for those who qualify.',
  },
  {
    question: 'Which Nevada statute governs how the house is divided?',
    answer: 'NRS 125.150 governs division of community property at divorce, and NRS Chapter 123 defines what is community and what is separate. Together they set the equal-division default and the exceptions. Both are linked above through the Nevada Legislature and the Family Law Self-Help Center statute pages.',
  },
  {
    question: 'How do I look up my divorce case in Clark County?',
    answer: 'Use the Look Up My Case link above, which goes to the Eighth Judicial District Court portal. Search by name or case number to see filings, hearing dates, and orders. The joint preliminary injunction and any order about the house will appear there once filed.',
  },
  {
    question: 'How do I check that a real estate agent or appraiser is licensed in Nevada?',
    answer: 'The Nevada Real Estate Division website has a public license lookup for agents, brokers, and appraisers. Search by name or license number and confirm the license is active and in good standing before signing a listing agreement or ordering an appraisal for the court.',
  },
  {
    question: 'Where is the Clark County transfer tax rate published?',
    answer: 'On the Clark County Recorder\'s land documents page, linked above, and in NRS 375. The rate is $2.55 per $500 of value, which is $5.10 per $1,000. The same page has the declaration of value form where the divorce decree exemption is claimed when title moves between former spouses.',
  },
];

function LinkCard({ resource }: { resource: ReferenceLink }) {
  return (
    <a
      href={resource.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-blue-400 hover:bg-blue-50/50"
    >
      <h3 className="mb-1 font-semibold text-gray-900 group-hover:text-blue-700">
        {resource.title}
      </h3>
      <p className="text-sm text-gray-600">{resource.description}</p>
      <span className="mt-2 inline-flex items-center text-sm font-medium text-blue-600">
        Visit resource
        <svg
          className="ml-1 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </span>
    </a>
  );
}

function LinkSection({
  id,
  title,
  intro,
  links,
}: {
  id: string;
  title: string;
  intro: string;
  links: ReferenceLink[];
}) {
  if (links.length === 0) {
    return null;
  }
  return (
    <section aria-labelledby={id} className="space-y-4">
      <h2 id={id} className="text-xl font-bold text-gray-900 sm:text-2xl">
        {title}
      </h2>
      <p className="text-gray-700">{intro}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map(resource => (
          <LinkCard key={resource.href} resource={resource} />
        ))}
      </div>
    </section>
  );
}

export default async function ReferencesAndLinksPage(props: ReferencesAndLinksProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const currentPath = path;
  const articleSchema = generateArticleSchema(
    'Divorce and Real Estate Resources for Nevada',
    'Annotated official links for a Nevada divorce involving a home: Clark County courts, the Family Law Self-Help Center, statutes, transfer tax, and the IRS home sale exclusion.',
    getCanonicalSiteUrl(currentPath, locale),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
    toSchemaDateTime(CONTENT_LAST_UPDATED),
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <StructuredData data={[articleSchema, faqSchema, realEstateAgentSchema]} />
      <DivorcePageTemplate
        currentPath={currentPath}
        h1="Divorce and Real Estate Resources for Nevada"
        heroSubhead="Official court, statute, tax, and market sources, each with a note on what it is for"
        datePublished={CONTENT_LAST_UPDATED}
        dateModified={CONTENT_LAST_UPDATED}
      >
        <DirectAnswer question="Where are the official sources for a Nevada divorce that involves a house?">
          Start with the Family Law Self-Help Center for forms and e-filing, the Eighth Judicial District
          Court portal to look up your case, NRS 125.150 and Chapter 123 for how community property
          divides, the Clark County Recorder for deeds and transfer tax, and IRS Publication 523 for the
          home sale exclusion. Every link below is a primary source, annotated with what it answers.
        </DirectAnswer>

        <KeyFacts
          facts={[
            { label: 'Clark County transfer tax', value: `${NEVADA_LAW.transferTaxClarkPer1000} per $1,000` },
            { label: 'Section 121 exclusion, single / joint', value: '$250,000 / $500,000' },
            { label: 'Las Vegas single-family median, Sept 2026', value: LVR_SEPT_2026.medianSfrPrice },
            { label: '2026 jumbo loan line, Clark County', value: LUXURY_2026.jumboThreshold2026 },
          ]}
          source={`${NEVADA_LAW.transferTaxCite}; ${NEVADA_LAW.capitalGainsCite}; ${LVR_SEPT_2026.source}`}
          sourceUrl={NEVADA_LAW.transferTaxUrl}
        />

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>How to use this page</h2>
          <p>
            Each section below links to a government, court, or nonprofit source, with a short note on
            what the page answers. Use the court links to find your case and your filing deadlines, the
            statute links to understand how the house divides, and the tax and market links to check the
            numbers used across this site. None of these sources replaces advice from your attorney.
          </p>
          <p>
            The order follows a typical case: filing and self-help first, then the court and its rules,
            then state agencies, then the tax and market references that decide what the home is worth and
            what a sale costs.
            {' '}
            {LEGAL_DISCLAIMER}
          </p>
        </div>

        <div className="mx-auto max-w-5xl space-y-12">
          <LinkSection
            id="brochures"
            title="Filing guides"
            intro="Clark County family court filings are electronic. This guide from the Family Law Self-Help Center walks through creating an account, uploading a document, and paying or waiving the fee. Read it before the first filing, and keep it open during the process, since rejected filings restart the clock on a motion about the house."
            links={brochuresLinks}
          />
          <LinkSection
            id="clark-county"
            title="Clark County courts and self-help"
            intro="These links cover the Eighth Judicial District Court, the clerk's e-filing support desk, and the Family Law Self-Help Center at the Regional Justice Center, which Legal Aid Center of Southern Nevada runs under contract with the county. The community resources page lists housing, domestic violence, and legal aid contacts for those who qualify."
            links={clarkCountyLinks}
          />
          <LinkSection
            id="law-libraries"
            title="Case lookup, rules, and statutes"
            intro="Look up your case to see every filing, hearing date, and order, including the joint preliminary injunction that limits what either spouse can do with the home. The rules pages explain local filing requirements, and the statutes page is the entry point to NRS Chapter 123 on community property and NRS 125 on divorce."
            links={lawLibrariesLinks}
          />
          <LinkSection
            id="state-nevada"
            title="State of Nevada agencies"
            intro="Statewide e-filing, NRS Chapter 123 on the property rights of married people, the Real Estate Division for checking an agent's or appraiser's license, and the State Bar for finding a licensed family law attorney. Verify any licensee on the Real Estate Division site before signing a listing agreement or paying for an appraisal."
            links={stateOfNevadaLinks}
          />
          <LinkSection
            id="tax-and-market"
            title="Tax, transfer, and market references"
            intro="The sources behind the numbers on this site. The Las Vegas REALTORS® report sets the monthly median, NRS 125.150 sets the equal-division default, the Clark County Recorder publishes the transfer tax rate and the decree exemption, and IRS Publication 523 explains the Section 121 exclusion and its divorce rule."
            links={taxAndMarketLinks}
          />
          <LinkSection
            id="videos"
            title="Videos"
            intro="Legal Aid Center of Southern Nevada records its self-help classes and posts them on YouTube. The family law series covers filing, financial disclosures, and what to expect at a hearing, in plain language and in Spanish for several topics."
            links={videosLinks}
          />
        </div>

        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2>Tools on this site that use these sources</h2>
          <p>
            The calculators and checklists on this site cite the sources above and nothing else. The
            equity and net proceeds calculators use the Las Vegas REALTORS® median and the Clark County
            transfer tax rate in their worked examples. The document checklist tells you which court and
            county pages to pull each record from. Use them together.
          </p>
          <ul>
            <li><Link href="/divorce-home-equity-calculator">Home equity calculator with a worked example</Link></li>
            <li><Link href="/divorce-net-proceeds-calculator">Net proceeds calculator with transfer tax and Section 121</Link></li>
            <li><Link href="/divorce-real-estate-documents">Documents to gather and where each comes from</Link></li>
            <li><Link href="/divorce-home-sale-checklist">Eight-phase home sale checklist</Link></li>
          </ul>
        </div>

        <HighValueHomeNote points={[
          `Loans above ${LUXURY_2026.jumboThreshold2026} are jumbo under the FHFA 2026 conforming limit for Clark County. The Real Estate Division link above also covers mortgage lender licensing if you need to verify a jumbo lender.`,
          `Transfer tax on a sale is ${NEVADA_LAW.transferTaxExample2M}. The Clark County Recorder page above has the declaration of value form where the divorce decree exemption is claimed on a buyout transfer.`,
          'IRS Publication 523 covers gains above the $500,000 joint cap, including how improvements raise the cost basis. Keep permits and receipts for custom work; they reduce the taxable gain.',
          'Club membership transfers at Red Rock Country Club, DragonRidge, Anthem Country Club, or The Summit Club follow the club\'s bylaws, not any statute above. Request the bylaws and transfer schedule directly from the club.',
          'Guard-gated HOAs publish their own access and resale rules in the CC&Rs, which the HOA resale package includes. NRS Chapter 116, reachable through the statutes link above, governs what the package must contain.',
        ]}
        />

        <NextSteps
          steps={[
            { title: 'Private call', detail: 'Fifteen minutes on where the case stands and which of these sources you need first.' },
            { title: 'Records pulled', detail: 'Deed, case filings, and HOA package located using the links above, with help where a title company can order them.' },
            { title: 'Valuation', detail: 'A written broker price opinion using the same MLS data the Las Vegas REALTORS® report draws from.' },
          ]}
          callPromise="You leave the call knowing which source answers each open question and what to gather next."
        />

        <PageFAQ faqs={faqs} />
      </DivorcePageTemplate>
    </>
  );
}
