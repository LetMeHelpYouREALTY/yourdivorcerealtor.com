/**
 * Related Links Helper
 * Topic cluster mappings for internal linking strategy
 * Ensures all pages have contextual, relevant internal links
 */

// Page title mappings for anchor text
const pageTitles: Record<string, string> = {
  // Core pages
  '/': 'Home',
  '/about': 'About Dr. Jan Duffy',
  '/contact': 'Contact Dr. Jan Duffy',
  '/divorce-real-estate-services': 'Divorce Real Estate Services',
  '/testimonials': 'Client Testimonials',
  '/faq': 'Frequently Asked Questions',

  // Process pages - Selling
  '/selling-home-during-divorce': 'Selling Home During Divorce',
  '/how-to-sell-house-during-divorce': 'How to Sell House During Divorce',
  '/can-i-sell-my-house-during-divorce': 'Can I Sell My House During Divorce?',
  '/selling-house-before-or-after-divorce': 'Selling House Before or After Divorce',
  '/one-spouse-wont-sell-house-divorce': 'One Spouse Won\'t Sell House Divorce',
  '/divorce-listing-process': 'Divorce Listing Process',
  '/court-ordered-home-sale': 'Court Ordered Home Sale',
  '/home-did-not-sell-during-divorce': 'Home Didn’t Sell During Divorce',

  // Process pages - Property Division
  '/divorce-property-division': 'Divorce Property Division',
  '/what-to-do-with-house-in-divorce': 'What to Do with House in Divorce',
  '/divorce-home-equity-split': 'Divorce Home Equity Split',
  '/splitting-house-proceeds-divorce': 'Splitting House Proceeds Divorce',
  '/community-property-divorce-house': 'Community Property Divorce House',

  // Process pages - Financial
  '/divorce-home-valuation': 'Divorce Home Valuation',
  '/divorce-buyout-options': 'Divorce Buyout Options',
  '/divorce-settlement-options': 'Divorce Settlement Options',
  '/capital-gains-tax-divorce-home-sale': 'Capital Gains Tax Divorce Home Sale',
  '/divorce-home-sale-taxes-nevada': 'Divorce Home Sale Taxes Nevada',

  // Process pages - Mortgage & Refinancing
  '/divorce-and-mortgage': 'Divorce and Mortgage',
  '/refinancing-after-divorce': 'Refinancing After Divorce',
  '/remove-spouse-from-mortgage-after-divorce': 'Remove Spouse from Mortgage After Divorce',
  '/quitclaim-deed-divorce': 'Quitclaim Deed Divorce',

  // Process pages - Timeline & Buying
  '/divorce-real-estate-timeline': 'Divorce Real Estate Timeline',
  '/buying-home-after-divorce': 'Buying Home After Divorce',

  // City pages
  '/divorce-realtor-henderson': 'Henderson Divorce Realtor',
  '/divorce-realtor-summerlin': 'Summerlin Divorce Realtor',
  '/divorce-realtor-north-las-vegas': 'North Las Vegas Divorce Realtor',
  '/divorce-realtor-green-valley': 'Green Valley Divorce Realtor',
  '/divorce-realtor-spring-valley': 'Spring Valley Divorce Realtor',
  '/divorce-realtor-enterprise': 'Enterprise Divorce Realtor',
  '/divorce-realtor-paradise': 'Paradise Divorce Realtor',
  '/divorce-realtor-centennial-hills': 'Centennial Hills Divorce Realtor',
  '/divorce-realtor-southern-highlands': 'Southern Highlands Divorce Realtor',
  '/divorce-realtor-aliante': 'Aliante Divorce Realtor',
  '/divorce-realtor-mountains-edge': 'Mountains Edge Divorce Realtor',
  '/divorce-realtor-inspirada': 'Inspirada Divorce Realtor',

  // Luxury pages
  '/luxury-divorce-real-estate-las-vegas': 'Luxury Divorce Real Estate Las Vegas',
  '/divorce-realtor-the-ridges': 'The Ridges Divorce Realtor',
  '/divorce-realtor-red-rock-country-club': 'Red Rock Country Club Divorce Realtor',
  '/divorce-realtor-macdonald-highlands': 'MacDonald Highlands Divorce Realtor',
  '/divorce-realtor-anthem-country-club': 'Anthem Country Club Divorce Realtor',
  '/strip-high-rise-condo-divorce': 'Strip High-Rise Condo Divorce',

  // Attorney/Professional pages
  '/attorney-resources': 'Attorney Resources',
  '/family-law-attorney-collaboration': 'Family Law Attorney Collaboration',
  '/divorce-mediator-resources': 'Divorce Mediator Resources',
  '/certified-divorce-real-estate-expert': 'Certified Divorce Real Estate Expert',
  '/divorce-real-estate-expert-witness': 'Divorce Real Estate Expert Witness',
  '/divorce-appraisal-services': 'Divorce Appraisal Services',

  // Resource pages
  '/divorce-home-equity-calculator': 'Divorce Home Equity Calculator',
  '/divorce-net-proceeds-calculator': 'Divorce Net Proceeds Calculator',
  '/divorce-real-estate-checklist': 'Divorce Real Estate Checklist',
  '/divorce-home-sale-checklist': 'Divorce Home Sale Checklist',
  '/divorce-home-sale-timeline': 'Divorce Home Sale Timeline',
  '/preparing-home-sale-divorce': 'Preparing Home Sale Divorce',
  '/divorce-real-estate-documents': 'Divorce Real Estate Documents',
  '/divorce-home-staging': 'Divorce Home Staging',

  // Guide pages
  '/divorce-real-estate-guide': 'Divorce Real Estate Guide',
  '/divorce-real-estate-guide-divorcing-couples': 'Real Estate Guide for Divorcing Couples',
  '/selling-house-during-divorce-nevada-guide': 'Selling House During Divorce Nevada Guide',
  '/divorce-real-estate-mistakes': 'Divorce Real Estate Mistakes',
  '/emotional-guide-selling-divorce': 'Emotional Guide Selling Divorce',
  '/financial-planning-divorce-real-estate': 'Financial Planning Divorce Real Estate',
};

// Topic cluster mappings - related pages for each URL
export const relatedLinksMap: Record<string, string[]> = {
  // Homepage
  '/': [
    '/divorce-real-estate-services',
    '/divorce-home-valuation',
    '/selling-home-during-divorce',
    '/about',
  ],

  // Core pages
  '/about': [
    '/divorce-real-estate-services',
    '/testimonials',
    '/contact',
    '/faq',
  ],
  '/contact': [
    '/divorce-real-estate-services',
    '/about',
    '/divorce-home-valuation',
    '/faq',
  ],
  '/divorce-real-estate-services': [
    '/selling-home-during-divorce',
    '/divorce-property-division',
    '/divorce-home-valuation',
    '/divorce-buyout-options',
  ],
  '/testimonials': [
    '/about',
    '/divorce-real-estate-services',
    '/contact',
    '/faq',
  ],
  '/faq': [
    '/divorce-property-division',
    '/selling-home-during-divorce',
    '/divorce-home-valuation',
    '/divorce-real-estate-services',
  ],

  // Selling cluster
  '/selling-home-during-divorce': [
    '/divorce-listing-process',
    '/divorce-home-valuation',
    '/divorce-property-division',
    '/divorce-real-estate-timeline',
  ],
  '/how-to-sell-house-during-divorce': [
    '/divorce-listing-process',
    '/selling-home-during-divorce',
    '/divorce-home-valuation',
    '/preparing-home-sale-divorce',
  ],
  '/can-i-sell-my-house-during-divorce': [
    '/selling-home-during-divorce',
    '/divorce-property-division',
    '/what-to-do-with-house-in-divorce',
    '/divorce-real-estate-services',
  ],
  '/selling-house-before-or-after-divorce': [
    '/divorce-real-estate-timeline',
    '/selling-home-during-divorce',
    '/divorce-settlement-options',
    '/divorce-property-division',
  ],
  '/one-spouse-wont-sell-house-divorce': [
    '/court-ordered-home-sale',
    '/divorce-property-division',
    '/divorce-mediator-resources',
    '/attorney-resources',
  ],
  '/divorce-listing-process': [
    '/selling-home-during-divorce',
    '/divorce-home-valuation',
    '/preparing-home-sale-divorce',
    '/divorce-home-staging',
  ],
  '/court-ordered-home-sale': [
    '/one-spouse-wont-sell-house-divorce',
    '/divorce-property-division',
    '/attorney-resources',
    '/divorce-real-estate-expert-witness',
  ],
  '/home-did-not-sell-during-divorce': [
    '/selling-home-during-divorce',
    '/divorce-listing-process',
    '/court-ordered-home-sale',
    '/divorce-real-estate-services',
  ],

  // Property Division cluster
  '/divorce-property-division': [
    '/selling-home-during-divorce',
    '/divorce-buyout-options',
    '/divorce-home-equity-split',
    '/community-property-divorce-house',
  ],
  '/what-to-do-with-house-in-divorce': [
    '/divorce-property-division',
    '/divorce-settlement-options',
    '/selling-home-during-divorce',
    '/divorce-buyout-options',
  ],
  '/divorce-home-equity-split': [
    '/divorce-property-division',
    '/divorce-home-valuation',
    '/splitting-house-proceeds-divorce',
    '/divorce-home-equity-calculator',
  ],
  '/splitting-house-proceeds-divorce': [
    '/divorce-home-equity-split',
    '/divorce-property-division',
    '/capital-gains-tax-divorce-home-sale',
    '/divorce-net-proceeds-calculator',
  ],
  '/community-property-divorce-house': [
    '/divorce-property-division',
    '/divorce-home-equity-split',
    '/divorce-home-sale-taxes-nevada',
    '/attorney-resources',
  ],

  // Valuation & Financial cluster
  '/divorce-home-valuation': [
    '/divorce-property-division',
    '/divorce-home-equity-calculator',
    '/divorce-appraisal-services',
    '/selling-home-during-divorce',
  ],
  '/divorce-buyout-options': [
    '/divorce-property-division',
    '/divorce-home-valuation',
    '/refinancing-after-divorce',
    '/remove-spouse-from-mortgage-after-divorce',
  ],
  '/divorce-settlement-options': [
    '/divorce-property-division',
    '/what-to-do-with-house-in-divorce',
    '/divorce-buyout-options',
    '/selling-home-during-divorce',
  ],
  '/capital-gains-tax-divorce-home-sale': [
    '/divorce-home-sale-taxes-nevada',
    '/splitting-house-proceeds-divorce',
    '/selling-home-during-divorce',
    '/divorce-property-division',
  ],
  '/divorce-home-sale-taxes-nevada': [
    '/capital-gains-tax-divorce-home-sale',
    '/divorce-property-division',
    '/selling-home-during-divorce',
    '/financial-planning-divorce-real-estate',
  ],

  // Mortgage & Refinancing cluster
  '/divorce-and-mortgage': [
    '/refinancing-after-divorce',
    '/remove-spouse-from-mortgage-after-divorce',
    '/divorce-buyout-options',
    '/quitclaim-deed-divorce',
  ],
  '/refinancing-after-divorce': [
    '/divorce-buyout-options',
    '/remove-spouse-from-mortgage-after-divorce',
    '/divorce-and-mortgage',
    '/buying-home-after-divorce',
  ],
  '/remove-spouse-from-mortgage-after-divorce': [
    '/refinancing-after-divorce',
    '/quitclaim-deed-divorce',
    '/divorce-buyout-options',
    '/divorce-and-mortgage',
  ],
  '/quitclaim-deed-divorce': [
    '/remove-spouse-from-mortgage-after-divorce',
    '/divorce-buyout-options',
    '/divorce-property-division',
    '/divorce-real-estate-documents',
  ],

  // Timeline & Buying cluster
  '/divorce-real-estate-timeline': [
    '/selling-home-during-divorce',
    '/divorce-listing-process',
    '/divorce-home-sale-timeline',
    '/divorce-real-estate-checklist',
  ],
  '/buying-home-after-divorce': [
    '/divorce-property-division',
    '/refinancing-after-divorce',
    '/divorce-real-estate-services',
    '/divorce-home-valuation',
  ],

  // City pages - link to process pages and other cities
  '/divorce-realtor-henderson': [
    '/selling-home-during-divorce',
    '/divorce-home-valuation',
    '/divorce-realtor-green-valley',
    '/divorce-realtor-summerlin',
  ],
  '/divorce-realtor-summerlin': [
    '/divorce-property-division',
    '/divorce-home-valuation',
    '/divorce-realtor-henderson',
    '/divorce-realtor-north-las-vegas',
  ],
  '/divorce-realtor-north-las-vegas': [
    '/selling-home-during-divorce',
    '/divorce-buyout-options',
    '/divorce-realtor-summerlin',
    '/divorce-realtor-paradise',
  ],
  '/divorce-realtor-green-valley': [
    '/divorce-home-valuation',
    '/divorce-property-division',
    '/divorce-realtor-henderson',
    '/divorce-realtor-spring-valley',
  ],
  '/divorce-realtor-spring-valley': [
    '/selling-home-during-divorce',
    '/divorce-home-valuation',
    '/divorce-realtor-green-valley',
    '/divorce-realtor-enterprise',
  ],
  '/divorce-realtor-enterprise': [
    '/divorce-property-division',
    '/divorce-buyout-options',
    '/divorce-realtor-spring-valley',
    '/divorce-realtor-paradise',
  ],
  '/divorce-realtor-paradise': [
    '/selling-home-during-divorce',
    '/divorce-home-valuation',
    '/divorce-realtor-north-las-vegas',
    '/divorce-realtor-enterprise',
  ],
  '/divorce-realtor-centennial-hills': [
    '/divorce-property-division',
    '/divorce-home-valuation',
    '/divorce-realtor-southern-highlands',
    '/divorce-realtor-aliante',
  ],
  '/divorce-realtor-southern-highlands': [
    '/selling-home-during-divorce',
    '/divorce-buyout-options',
    '/divorce-realtor-centennial-hills',
    '/divorce-realtor-mountains-edge',
  ],
  '/divorce-realtor-aliante': [
    '/divorce-home-valuation',
    '/divorce-property-division',
    '/divorce-realtor-centennial-hills',
    '/divorce-realtor-inspirada',
  ],
  '/divorce-realtor-mountains-edge': [
    '/divorce-property-division',
    '/divorce-home-valuation',
    '/divorce-realtor-southern-highlands',
    '/divorce-realtor-inspirada',
  ],
  '/divorce-realtor-inspirada': [
    '/selling-home-during-divorce',
    '/divorce-buyout-options',
    '/divorce-realtor-aliante',
    '/divorce-realtor-mountains-edge',
  ],

  // Luxury cluster
  '/luxury-divorce-real-estate-las-vegas': [
    '/divorce-realtor-the-ridges',
    '/divorce-realtor-macdonald-highlands',
    '/divorce-buyout-options',
    '/capital-gains-tax-divorce-home-sale',
  ],
  '/divorce-realtor-the-ridges': [
    '/luxury-divorce-real-estate-las-vegas',
    '/divorce-realtor-red-rock-country-club',
    '/divorce-realtor-summerlin',
    '/divorce-home-valuation',
  ],
  '/divorce-realtor-red-rock-country-club': [
    '/luxury-divorce-real-estate-las-vegas',
    '/divorce-realtor-the-ridges',
    '/divorce-realtor-summerlin',
    '/divorce-buyout-options',
  ],
  '/divorce-realtor-macdonald-highlands': [
    '/luxury-divorce-real-estate-las-vegas',
    '/divorce-realtor-anthem-country-club',
    '/divorce-realtor-henderson',
    '/divorce-appraisal-services',
  ],
  '/divorce-realtor-anthem-country-club': [
    '/luxury-divorce-real-estate-las-vegas',
    '/divorce-realtor-macdonald-highlands',
    '/divorce-realtor-henderson',
    '/refinancing-after-divorce',
  ],
  '/strip-high-rise-condo-divorce': [
    '/luxury-divorce-real-estate-las-vegas',
    '/divorce-home-valuation',
    '/divorce-and-mortgage',
    '/divorce-settlement-options',
  ],

  // Attorney/Professional pages
  '/attorney-resources': [
    '/family-law-attorney-collaboration',
    '/certified-divorce-real-estate-expert',
    '/divorce-real-estate-expert-witness',
    '/divorce-property-division',
  ],
  '/family-law-attorney-collaboration': [
    '/attorney-resources',
    '/certified-divorce-real-estate-expert',
    '/divorce-mediator-resources',
    '/divorce-property-division',
  ],
  '/divorce-mediator-resources': [
    '/family-law-attorney-collaboration',
    '/attorney-resources',
    '/divorce-property-division',
    '/one-spouse-wont-sell-house-divorce',
  ],
  '/certified-divorce-real-estate-expert': [
    '/attorney-resources',
    '/divorce-real-estate-expert-witness',
    '/divorce-real-estate-services',
    '/divorce-appraisal-services',
  ],
  '/divorce-real-estate-expert-witness': [
    '/certified-divorce-real-estate-expert',
    '/attorney-resources',
    '/court-ordered-home-sale',
    '/divorce-appraisal-services',
  ],
  '/divorce-appraisal-services': [
    '/divorce-home-valuation',
    '/certified-divorce-real-estate-expert',
    '/divorce-real-estate-expert-witness',
    '/divorce-home-equity-calculator',
  ],

  // Resource pages
  '/divorce-home-equity-calculator': [
    '/divorce-home-valuation',
    '/divorce-home-equity-split',
    '/divorce-net-proceeds-calculator',
    '/divorce-appraisal-services',
  ],
  '/divorce-net-proceeds-calculator': [
    '/divorce-home-equity-calculator',
    '/splitting-house-proceeds-divorce',
    '/divorce-home-valuation',
    '/capital-gains-tax-divorce-home-sale',
  ],
  '/divorce-real-estate-checklist': [
    '/divorce-real-estate-timeline',
    '/divorce-home-sale-checklist',
    '/preparing-home-sale-divorce',
    '/divorce-real-estate-documents',
  ],
  '/divorce-home-sale-checklist': [
    '/divorce-real-estate-checklist',
    '/preparing-home-sale-divorce',
    '/divorce-listing-process',
    '/divorce-home-staging',
  ],
  '/divorce-home-sale-timeline': [
    '/divorce-real-estate-timeline',
    '/divorce-listing-process',
    '/selling-home-during-divorce',
    '/divorce-home-sale-checklist',
  ],
  '/preparing-home-sale-divorce': [
    '/divorce-home-sale-checklist',
    '/divorce-home-staging',
    '/divorce-listing-process',
    '/selling-home-during-divorce',
  ],
  '/divorce-real-estate-documents': [
    '/divorce-real-estate-checklist',
    '/quitclaim-deed-divorce',
    '/divorce-property-division',
    '/divorce-settlement-options',
  ],
  '/divorce-home-staging': [
    '/preparing-home-sale-divorce',
    '/divorce-listing-process',
    '/selling-home-during-divorce',
    '/divorce-home-sale-checklist',
  ],

  // Guide pages
  '/divorce-real-estate-guide': [
    '/divorce-real-estate-guide-divorcing-couples',
    '/divorce-property-division',
    '/selling-home-during-divorce',
    '/divorce-home-valuation',
    '/divorce-real-estate-services',
  ],
  '/divorce-real-estate-guide-divorcing-couples': [
    '/divorce-real-estate-guide',
    '/what-to-do-with-house-in-divorce',
    '/community-property-divorce-house',
    '/divorce-listing-process',
    '/selling-home-during-divorce',
  ],
  '/selling-house-during-divorce-nevada-guide': [
    '/selling-home-during-divorce',
    '/divorce-home-sale-taxes-nevada',
    '/community-property-divorce-house',
    '/divorce-listing-process',
  ],
  '/divorce-real-estate-mistakes': [
    '/divorce-real-estate-guide',
    '/divorce-property-division',
    '/selling-home-during-divorce',
    '/financial-planning-divorce-real-estate',
  ],
  '/emotional-guide-selling-divorce': [
    '/selling-home-during-divorce',
    '/divorce-real-estate-guide',
    '/divorce-property-division',
    '/testimonials',
  ],
  '/financial-planning-divorce-real-estate': [
    '/divorce-home-valuation',
    '/divorce-home-sale-taxes-nevada',
    '/capital-gains-tax-divorce-home-sale',
    '/divorce-settlement-options',
  ],
};

/**
 * Get related links for a given pathname
 * Returns array of {title, href} objects with descriptive anchor text
 */
export function getRelatedLinks(pathname: string, limit = 4): Array<{ title: string; href: string }> {
  // Normalize pathname (remove locale prefix if present, ensure leading slash)
  const normalizedPath = pathname.replace(/^\/(en|fr)/, '') || '/';
  const cleanPath = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;

  // Get related paths from map
  const relatedPaths = relatedLinksMap[cleanPath] || [];

  // If no direct mapping, try to find related pages by category
  if (relatedPaths.length === 0) {
    // Fallback: return core pages
    return [
      { title: pageTitles['/divorce-real-estate-services'] || 'Divorce Real Estate Services', href: '/divorce-real-estate-services' },
      { title: pageTitles['/divorce-home-valuation'] || 'Divorce Home Valuation', href: '/divorce-home-valuation' },
      { title: pageTitles['/about'] || 'About', href: '/about' },
      { title: pageTitles['/contact'] || 'Contact', href: '/contact' },
    ].slice(0, limit);
  }

  // Map paths to titles and return
  return relatedPaths
    .slice(0, limit)
    .map(href => ({
      title: pageTitles[href] || href.split('/').pop()?.replace(/-/g, ' ') || href,
      href,
    }))
    .filter(link => link.href !== cleanPath); // Exclude self-reference
}
