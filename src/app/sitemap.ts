import type { MetadataRoute } from 'next';

const baseUrl = 'https://www.yourdivorcerealtor.com';

/**
 * Dynamic sitemap for all 46 divorce-focused pages
 * Includes all marketing pages with appropriate priorities and change frequencies
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Core pages (highest priority)
  const corePages = [
    {
      url: `${baseUrl}/`,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/communities`,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/divorce-real-estate-services`,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/testimonials`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sell`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/homes`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/portfolio`,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: 'yearly' as const,
      priority: 0.35,
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: 'yearly' as const,
      priority: 0.35,
    },
    {
      url: `${baseUrl}/sitemap`,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];

  // Process pages (high priority)
  const processPages = [
    '/selling-home-during-divorce',
    '/buying-home-after-divorce',
    '/divorce-property-division',
    '/divorce-home-valuation',
    '/divorce-real-estate-timeline',
    '/divorce-settlement-options',
    '/divorce-buyout-options',
    '/refinancing-after-divorce',
    '/divorce-and-mortgage',
    '/quitclaim-deed-divorce',
    '/divorce-listing-process',
    '/court-ordered-home-sale',
    '/home-did-not-sell-during-divorce',
    // New long-tail content pages
    '/how-to-sell-house-during-divorce',
    '/can-i-sell-my-house-during-divorce',
    '/what-to-do-with-house-in-divorce',
    '/selling-house-before-or-after-divorce',
    '/one-spouse-wont-sell-house-divorce',
    '/remove-spouse-from-mortgage-after-divorce',
    '/divorce-home-equity-split',
    '/splitting-house-proceeds-divorce',
    '/community-property-divorce-house',
    '/capital-gains-tax-divorce-home-sale',
    '/divorce-home-sale-taxes-nevada',
  ];

  // Community pages (medium-high priority)
  const communityPages = [
    '/divorce-realtor-henderson',
    '/divorce-realtor-summerlin',
    '/divorce-realtor-north-las-vegas',
    '/divorce-realtor-green-valley',
    '/divorce-realtor-spring-valley',
    '/divorce-realtor-enterprise',
    '/divorce-realtor-paradise',
    '/divorce-realtor-centennial-hills',
    '/divorce-realtor-southern-highlands',
    '/divorce-realtor-aliante',
    '/divorce-realtor-mountains-edge',
    '/divorce-realtor-inspirada',
  ];

  // Attorney/Professional resource pages (medium priority)
  const attorneyPages = [
    '/attorney-resources',
    '/references-and-links',
    '/family-law-attorney-collaboration',
    '/divorce-mediator-resources',
    '/certified-divorce-real-estate-expert',
    '/divorce-real-estate-expert-witness',
    '/divorce-appraisal-services',
  ];

  // Homeowner resource pages (medium priority)
  const resourcePages = [
    '/divorce-home-equity-calculator',
    '/divorce-net-proceeds-calculator',
    '/divorce-real-estate-checklist',
    '/divorce-home-sale-checklist',
    '/divorce-home-sale-timeline',
    '/preparing-home-sale-divorce',
    '/divorce-real-estate-documents',
    '/divorce-home-staging',
  ];

  // Educational guide pages (medium priority)
  const guidePages = [
    '/divorce-real-estate-guide',
    '/divorce-real-estate-guide-divorcing-couples',
    '/selling-house-during-divorce-nevada-guide',
    '/divorce-real-estate-mistakes',
    '/emotional-guide-selling-divorce',
    '/financial-planning-divorce-real-estate',
  ];

  // Helper function to create sitemap entries
  const createEntries = (
    paths: string[],
    priority: number,
    changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'weekly',
  ) =>
    paths.map(path => ({
      url: `${baseUrl}${path}`,
      changeFrequency,
      priority,
    }));

  return [
    ...corePages,
    ...createEntries(processPages, 0.8, 'weekly'),
    ...createEntries(communityPages, 0.7, 'monthly'),
    ...createEntries(attorneyPages, 0.7, 'monthly'),
    ...createEntries(resourcePages, 0.7, 'monthly'),
    ...createEntries(guidePages, 0.7, 'monthly'),
  ];
}
