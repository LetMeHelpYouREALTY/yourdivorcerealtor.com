/**
 * Las Vegas area communities served by Dr. Jan Duffy
 * Shared data for /communities page and ItemList carousel schema
 *
 * For carousel schema: add image path (e.g. /images/communities/henderson.jpg)
 * when community photos are available. Until then, schema uses fallback image.
 */

export type CommunityItem = {
  name: string;
  href: string;
  description: string;
  /** Image path for schema when community photo is available */
  image?: string;
};

export const communities: CommunityItem[] = [
  { name: 'Henderson', href: '/divorce-realtor-henderson', description: 'Divorce real estate and home sales in Henderson' },
  { name: 'Summerlin', href: '/divorce-realtor-summerlin', description: 'Divorce realtor services in Summerlin' },
  { name: 'North Las Vegas', href: '/divorce-realtor-north-las-vegas', description: 'Divorce home sale help in North Las Vegas' },
  { name: 'Green Valley', href: '/divorce-realtor-green-valley', description: 'Green Valley Henderson divorce real estate' },
  { name: 'Spring Valley', href: '/divorce-realtor-spring-valley', description: 'Spring Valley Las Vegas divorce realtor' },
  { name: 'Enterprise', href: '/divorce-realtor-enterprise', description: 'Enterprise area divorce real estate' },
  { name: 'Paradise', href: '/divorce-realtor-paradise', description: 'Paradise Las Vegas divorce real estate' },
  { name: 'Centennial Hills', href: '/divorce-realtor-centennial-hills', description: 'Centennial Hills divorce realtor' },
  { name: 'Southern Highlands', href: '/divorce-realtor-southern-highlands', description: 'Southern Highlands divorce real estate' },
  { name: 'Aliante', href: '/divorce-realtor-aliante', description: 'Aliante North Las Vegas divorce realtor' },
  { name: 'Mountains Edge', href: '/divorce-realtor-mountains-edge', description: 'Mountains Edge divorce real estate' },
  { name: 'Inspirada', href: '/divorce-realtor-inspirada', description: 'Inspirada Henderson divorce realtor' },
  { name: 'The Ridges', href: '/divorce-realtor-the-ridges', description: 'Guard-gated Summerlin custom estates' },
  { name: 'Red Rock Country Club', href: '/divorce-realtor-red-rock-country-club', description: 'Golf club homes in Summerlin' },
  { name: 'MacDonald Highlands', href: '/divorce-realtor-macdonald-highlands', description: 'Henderson hillside estates and DragonRidge' },
  { name: 'Anthem Country Club', href: '/divorce-realtor-anthem-country-club', description: 'Guard-gated golf community in Henderson' },
  { name: 'Strip High-Rises', href: '/strip-high-rise-condo-divorce', description: 'Condo towers on and near the Strip' },
];
