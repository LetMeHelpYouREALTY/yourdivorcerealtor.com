import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { EngagementPhoneLink } from '@/components/analytics/EngagementPhoneLink';
import { CalendlyInline } from '@/components/calendly/CalendlyInline';
import { DirectAnswer } from '@/components/divorce/DirectAnswer';
import { DivorcePageTemplate } from '@/components/divorce/DivorcePageTemplate';
import { PageFAQ } from '@/components/divorce/PageFAQ';
import { WhatWeDoAndDontDo } from '@/components/divorce/WhatWeDoAndDontDo';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateLocaleAlternates } from '@/lib/metadata';
import {
  generateFAQPageSchema,
  generateRealEstateAgentSchema,
  generateServiceSchema,
} from '@/lib/schema';
import {
  BROKERAGE_NAME,
  NAP_ADDRESS_LOCALITY,
  NAP_ADDRESS_REGION,
  NAP_POSTAL_CODE,
  NAP_STREET_LINES,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from '@/lib/site-contact';

type IContactProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const contactFaqs = [
  {
    question: 'Is the first call private, and does it cost anything?',
    answer: 'Yes, it is private, and there is no fee. Nothing from the call is shared with your spouse or anyone else unless you ask for it. Fifteen minutes covers where the case stands, who is on title and on the loan, and what you need from the house. You leave with a value range and your realistic options.',
  },
  {
    question: 'What should I have ready for the call?',
    answer: 'The address, your best guess at the loan balance, and any filed paperwork or settlement draft that mentions the house. If a court order covers the sale, have it on hand. None of this is required to book; it just makes the value range and the options more precise on the first call.',
  },
  {
    question: 'Can both spouses or an attorney join the call?',
    answer: 'Yes. Many first calls include both spouses, one spouse and counsel, or a mediator. For a home above the jumbo line, bringing the lender into a second call is common so the buyout figure matches what can be borrowed. The same information goes to everyone on the call.',
  },
];

const path = '/contact';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Contact a Las Vegas Divorce Realtor | Dr. Jan Duffy',
    description: 'Book a private 15-minute call with Dr. Jan Duffy about the marital home: value range, sell or buyout options, and next steps. Phone or video, no fee.',
    alternates: { canonical, languages },
  };
}

export default async function Contact(props: IContactProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const serviceSchema = generateServiceSchema(
    'Divorce Real Estate Consultation',
    'A private 15-minute call with Dr. Jan Duffy about the marital home: value range, sell or buyout options, and next steps.',
    ['Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas'],
  );
  const realEstateAgentSchema = generateRealEstateAgentSchema();
  const faqPageSchema = generateFAQPageSchema(contactFaqs);

  return (
    <>
      <StructuredData data={[serviceSchema, realEstateAgentSchema, faqPageSchema]} />
      <DivorcePageTemplate
        h1="Contact Dr. Jan Duffy"
        heroSubhead="A private 15-minute call about the marital home. You leave with a value range, your options, and the next decision."
        showHomeValue
        currentPath="/contact"
      >
        <div className="mx-auto max-w-5xl">
          <DirectAnswer question="How does the first call work?">
            Pick a 15-minute slot below or call during office hours. The call is private and free. You describe where the
            case stands, who is on title and on the loan, and what you need from the house. Dr. Jan Duffy gives you a
            value range, your realistic options to sell, buy out, or refinance, and the single next decision. Both
            spouses or your attorney may join.
          </DirectAnswer>

          {/* Primary action: Schedule or call — above the fold */}
          <section className="mt-14 mb-14">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-12">
              <div className="lg:col-span-2">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Pick a time or call now</h2>
                <p className="mb-6 text-gray-600">
                  Choose a 15-minute slot below, or talk with Dr. Jan Duffy directly.
                </p>
                <EngagementPhoneLink
                  href={SITE_PHONE_TEL}
                  location="contact_primary_call"
                  className="mb-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-md transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
                >
                  <span aria-hidden>📞</span>
                  Call
                  {' '}
                  {SITE_PHONE_DISPLAY}
                </EngagementPhoneLink>
                <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4">
                  <p className="text-sm font-semibold text-gray-800">Dr. Jan Duffy, REALTOR®</p>
                  <p className="text-sm text-gray-600">{BROKERAGE_NAME}</p>
                  {NAP_STREET_LINES.map((line, index) => (
                    <p
                      key={line}
                      className={`text-sm text-gray-600 ${index === 0 ? 'mt-1' : ''}`}
                    >
                      {line}
                    </p>
                  ))}
                  <p className="text-sm text-gray-600">
                    {NAP_ADDRESS_LOCALITY}
                    ,
                    {' '}
                    {NAP_ADDRESS_REGION}
                    {' '}
                    {NAP_POSTAL_CODE}
                    {' '}
                    · Monday - Friday, 8 a.m. - 4 p.m.
                  </p>
                </div>
                <ul className="mt-6 space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>A value range for the house and your net equity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>Sell, buyout, co-own, or refinance, each with a number</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>The next decision and who needs to make it</span>
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-3">
                <h2 className="mb-2 text-2xl font-bold text-gray-900">Schedule your consultation</h2>
                <p className="mb-4 text-gray-600">
                  Pick a time. Fifteen minutes, private, no fee. Phone or video.
                </p>
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <CalendlyInline />
                </div>
              </div>
            </div>
          </section>

          <section className="mb-14">
            <PageFAQ title="Before you book" faqs={contactFaqs} />
          </section>

          {/* What we do / don't do — sets expectations before scheduling */}
          <section className="mb-14 rounded-xl border border-gray-200 bg-gray-50/50 p-6">
            <WhatWeDoAndDontDo variant="compact" />
          </section>

          {/* Second scheduler — if above fold is scrolled past */}
          <section className="mb-14">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Pick a time that works for you</h2>
            <p className="mb-6 text-gray-600">
              Fifteen minutes, private, no fee. Bring the address and a loan balance if you have one.
            </p>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <CalendlyInline />
            </div>
          </section>

          {/* Short supporting copy */}
          <section className="prose prose-lg max-w-none border-t border-gray-200 pt-10">
            <h2 className="text-xl font-bold text-gray-900">Questions worth asking on the call</h2>
            <p className="text-gray-700">
              What is the house worth today and what would it net after payoff and costs? Can one of us carry the loan
              alone, and above the jumbo line what does the lender need? How long from list to close, and when would the
              move-out date land? What does the listing plan say about showings, sign-offs, and disbursement?
            </p>
            <p className="mt-6 text-center text-lg font-semibold text-gray-800">
              Schedule above or call
              {' '}
              {SITE_PHONE_DISPLAY}
              . Valuations are prepared after the first call, once the address and loan details are in hand.
            </p>
          </section>
        </div>
      </DivorcePageTemplate>
    </>
  );
}
