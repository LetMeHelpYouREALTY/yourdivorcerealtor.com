import {
  CLOUDFLARE_IMAGE_IDS,
  cloudflareImageUrl,
  getCloudflareContentVariant,
} from '@/lib/cloudflare-images';

type HeroImageMeta = {
  src: string;
  alt: string;
};

const v = getCloudflareContentVariant();

export const heroImageMap: Record<string, HeroImageMeta> = {
  '/about': {
    src: cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['dr-jan-duffy-agent'], v),
    alt: 'Dr. Jan Duffy - Las Vegas divorce real estate specialist',
  },
  '/divorce-realtor-henderson': {
    src: cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['home-featured-1'], v),
    alt: 'Henderson, Nevada luxury homes',
  },
  '/divorce-realtor-summerlin': {
    src: cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['home-featured-2'], v),
    alt: 'Summerlin Las Vegas luxury homes',
  },
  '/divorce-realtor-north-las-vegas': {
    src: cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['home-featured-3'], v),
    alt: 'North Las Vegas neighborhood',
  },
  '/divorce-realtor-green-valley': {
    src: cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['home-featured-1'], v),
    alt: 'Green Valley master-planned community',
  },
  '/divorce-realtor-spring-valley': {
    src: cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['home-featured-2'], v),
    alt: 'Spring Valley homes and parks',
  },
  '/divorce-realtor-enterprise': {
    src: cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['centennial-hills-hero'], v),
    alt: 'Enterprise luxury real estate',
  },
  '/divorce-realtor-paradise': {
    src: cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['home-featured-3'], v),
    alt: 'Paradise, NV desert modern home',
  },
  '/divorce-realtor-centennial-hills': {
    src: cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['centennial-hills-hero'], v),
    alt: 'Centennial Hills neighborhood - modern home exterior',
  },
  '/divorce-realtor-southern-highlands': {
    src: cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['centennial-hills-clubhouse'], v),
    alt: 'Southern Highlands golf course community',
  },
  '/divorce-realtor-aliante': {
    src: cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['las-vegas-neighborhood'], v),
    alt: 'Aliante homes and parks',
  },
  '/divorce-realtor-mountains-edge': {
    src: cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['lone-mountain-hero'], v),
    alt: 'Mountains Edge desert landscape',
  },
  '/divorce-realtor-inspirada': {
    src: cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['home-featured-1'], v),
    alt: 'Inspirada planned community',
  },
  '/home-did-not-sell-during-divorce': {
    src: cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['property-default'], v),
    alt: 'Las Vegas home prepared for relaunch after divorce',
  },
  '/luxury-divorce-real-estate-las-vegas': {
    src: cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['home-featured-2'], v),
    alt: 'Las Vegas luxury home exterior at dusk',
  },
  '/divorce-realtor-the-ridges': {
    src: cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['home-featured-2'], v),
    alt: 'Custom home in The Ridges, Summerlin',
  },
  '/divorce-realtor-red-rock-country-club': {
    src: cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['home-featured-1'], v),
    alt: 'Golf course home in Red Rock Country Club',
  },
  '/divorce-realtor-macdonald-highlands': {
    src: cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['home-featured-3'], v),
    alt: 'Hillside estate in MacDonald Highlands, Henderson',
  },
  '/divorce-realtor-anthem-country-club': {
    src: cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['home-featured-1'], v),
    alt: 'Home in Anthem Country Club, Henderson',
  },
  '/strip-high-rise-condo-divorce': {
    src: cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['hero-las-vegas'], v),
    alt: 'Las Vegas Strip high-rise condominium towers',
  },
};
