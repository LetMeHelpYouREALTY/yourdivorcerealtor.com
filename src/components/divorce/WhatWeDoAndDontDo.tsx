/**
 * What We Do (and Don't Do) — Sets expectations for the realtor's role.
 * Adapted from the Family Law Self-Help Center model for a divorce-specialist realtor.
 * Use on About, Contact, Attorney Resources, CDRE, and other service pages.
 */

import Link from 'next/link';

type WhatWeDoAndDontDoProps = {
  /** 'full' = full section with lists; 'compact' = short summary + link to services */
  variant?: 'full' | 'compact';
  /** Optional wrapper class (e.g. for prose) */
  className?: string;
};

const DO_ITEMS = [
  'Provide real estate information and market data (comparable sales, market conditions, timing)',
  'Assist with home valuation and equity analysis for property division and buyout discussions',
  'List and sell properties; help buyers purchase homes with divorce-tailored representation',
  'Coordinate with both spouses, attorneys, mediators, and lenders when authorized',
  'Refer clients to the Nevada State Bar for attorney referrals and to CPAs for tax advice',
  'Provide expert witness services when engaged (property values, market conditions, feasibility)',
  'Support buyout and refinancing (calculations, coordination, documentation per attorney/court)',
];

const DONT_ITEMS = [
  'Give legal advice (e.g., whether to sell or buy out, how to divide equity, decree language)',
  'Advise on divorce strategy (when to file, how to respond, legal approach)',
  'Recommend specific attorneys or law firms—we refer to the Nevada State Bar',
  'Advise on custody, support, or non–real estate terms',
  'Predict court outcomes',
  'Complete or advise on legal forms (petitions, settlements); we handle real estate forms',
  'Give tax advice—we refer to a CPA or tax attorney',
  'Represent both spouses in the same transaction without proper disclosure and written consent',
];

const DISCLAIMER
  = 'The real estate information provided here and in consultations is not a substitute for legal advice from an attorney licensed in Nevada or for tax advice from a qualified professional. Consult a Nevada family law attorney for legal questions and a CPA or tax professional for tax questions.';

export function WhatWeDoAndDontDo({ variant = 'full', className = '' }: WhatWeDoAndDontDoProps) {
  if (variant === 'compact') {
    return (
      <section className={className}>
        <h2 className="mb-3 text-xl font-bold text-gray-900">What we do (and don&apos;t do)</h2>
        <p className="mb-3 text-gray-700">
          We provide real estate valuation, listing, buyout, and transaction services and refer you to attorneys and
          CPAs for legal and tax advice. We don&apos;t give legal advice, recommend specific attorneys, or predict court
          outcomes.
        </p>
        <p className="text-sm text-gray-600 italic">{DISCLAIMER}</p>
        <p className="mt-3 text-sm">
          <Link href="/divorce-real-estate-services" className="text-blue-600 underline hover:text-blue-700">
            Full list of what we do and don&apos;t do
          </Link>
        </p>
      </section>
    );
  }

  return (
    <section className={className}>
      <h2 className="mb-2 text-2xl font-bold text-gray-900">What We Do (and Don&apos;t Do)</h2>
      <p className="mb-6 text-gray-700">
        The practice covers valuation, listing, buyout, and transaction work for divorcing homeowners in Las Vegas and
        Henderson, from a tract home to a guard-gated estate. Legal and tax questions go to your attorney and CPA.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-gray-900">What We Do</h3>
      <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
        {DO_ITEMS.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h3 className="mb-3 text-lg font-semibold text-gray-900">What We Don&apos;t Do</h3>
      <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
        {DONT_ITEMS.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <p className="text-sm text-gray-600 italic">{DISCLAIMER}</p>
    </section>
  );
}
