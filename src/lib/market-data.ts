/**
 * Sourced market and legal facts used across the site.
 *
 * Every number on a page must come from here (or from a cited source added here).
 * Each entry carries its source and the date it was verified so bylines and
 * copy stay honest. Re-verify when CONTENT_LAST_UPDATED moves.
 *
 * Verified 2026-11-03.
 */

export type SourcedFact = {
  /** Short label shown to readers. */
  label: string;
  /** The value, formatted for display. */
  value: string;
  /** Who published it. */
  source: string;
  /** The period or as-of date the figure covers. */
  asOf: string;
  /** Public URL for the source. */
  url?: string;
};

/** Las Vegas REALTORS® monthly statistics, September 2026 (released October 2026). */
export const LVR_SEPT_2026 = {
  medianSfrPrice: '$470,000',
  sfrUnitsSold: '1,745',
  soldWithin30DaysPct: '53.4%',
  availableSfrListings: '9,984',
  source: 'Las Vegas REALTORS® September 2026 statistics',
  asOf: 'September 2026',
  url: 'https://members.lasvegasrealtor.com/statistics/pdf/2026-09-GLVAR-Housing-Stats%28t3govm4R8h4%29.pdf',
} as const;

/** Luxury tier ($1M+) figures. */
export const LUXURY_2026 = {
  closingsAbove1MSept2026: '148',
  closingsAbove3MSept2026: '14',
  sept2026Source: 'Equity Title Greater Las Vegas market update, October 3, 2026',
  sales1MPlus2025: '2,462',
  sales1MPlus2025Change: '+13.6% vs 2024',
  summerlinShare2025: '927',
  hendersonShare2025: '517',
  source2025: 'Nevada State Bank High Net Worth Report, 2025 (as reported by Las Vegas REALTORS® IDX pages, November 1, 2026)',
  jumboThreshold2026: '$832,750',
  jumboSource: 'FHFA 2026 conforming loan limit, Clark County',
  median1MPlusTrailing12: '$1,400,000',
  median1MPlusSource: 'Las Vegas REALTORS® MLS analysis, September 2025 to August 2026',
} as const;

/** Community-level 12-month MLS figures (closings through September 2026). */
export const COMMUNITY_12MO = {
  theRidges: { median: '$3,250,000', closings: '39', medianDom: '55', hoaMonthly: 'about $804', lowSale: '$1,750,000', highSale: '$16,000,000', pricePerSqFt: '$797' },
  redRockCountryClub: { median: '$2,012,500', closings: '68', medianDom: '36', hoaMonthly: 'about $300', lowSale: '$1,100,000' },
  summitClub: { median: '$21,000,000', note: 'developer inventory largely off-MLS' },
  macdonaldHighlands: { median: '$4,000,000', closings: '83', medianDom: '61', topSale: '$17,000,000', pricePerSqFt: 'about $759' },
  anthemCountryClub: { median: '$1,700,000', closings: '75', range: '$550,000 to $8,260,000' },
  henderson1MPlus: { median: '$1,630,000', closings: '115', medianDom: '44', pricePerSqFt: '$420', period: 'Q3 2026' },
  summerlinFourZips: { median: '$649,000', closings: '2,449', medianDom: '34' },
  summerlinQ2_2026: { median: '$740,000', closedSales: '603', avgDom: '42', over2MClosings: '68', over2MChange: '+39% vs Q2 2025' },
  waldorfAstoriaStrip: { median: '$2,906,000', closings: '16', pricePerSqFt: '$1,421' },
  source: 'Las Vegas REALTORS® MLS data via Repliers (Nevada Real Estate Group analysis) and Sotheby\'s International Realty Q2 2026 Summerlin report',
  asOf: '12 months through September 2026',
} as const;

/** Nevada law and tax facts relevant to the marital home. */
export const NEVADA_LAW = {
  communityPropertyRule: 'Nevada courts must make an equal division of community property unless they find a compelling reason, set out in writing, to divide it unequally.',
  communityPropertyCite: 'NRS 125.150(1)(b)',
  communityPropertyUrl: 'https://www.leg.state.nv.us/Division/Legal/Lawlibrary/NRS/NRS-125.html',
  transferTaxClarkPer500: '$2.55',
  transferTaxClarkPer1000: '$5.10',
  transferTaxExample2M: '$10,200 on a $2,000,000 sale',
  transferTaxDivorceExemption: 'A transfer of title between former spouses in compliance with a decree of divorce is exempt from real property transfer tax.',
  transferTaxCite: 'NRS 375.090(6); Clark County Recorder',
  transferTaxUrl: 'https://www.clarkcountynv.gov/government/elected_officials/county_recorder/land-documents',
  capitalGainsExclusion: 'IRS Section 121 excludes up to $250,000 of gain for a single filer and $500,000 for a married couple filing jointly, if the home was owned and used as the main residence for 2 of the last 5 years. Divorce-related rules let a spouse who moved out count the other spouse\'s continued use under a divorce instrument.',
  capitalGainsCite: 'IRS Publication 523',
  capitalGainsUrl: 'https://www.irs.gov/publications/p523',
  noStateIncomeTax: 'Nevada has no state income tax.',
} as const;

/** Standard disclaimer for law and tax passages. */
export const LEGAL_DISCLAIMER = 'Dr. Jan Duffy is a licensed Nevada real estate agent, not an attorney or CPA. Confirm legal and tax questions with your family law attorney and tax advisor.';
