/**
 * JSON-LD Structured Data Schemas
 * For SEO and rich snippets in search results
 */

import {
  CLOUDFLARE_IMAGE_IDS,
  cloudflareImageUrl,
  getCloudflareHeroLcpVariant,
} from '@/lib/cloudflare-images';
import { siteUrl } from '@/lib/metadata';
import {
  BROKERAGE_NAME,
  NAP_ADDRESS_LOCALITY,
  NAP_ADDRESS_REGION,
  NAP_GEO_LATITUDE,
  NAP_GEO_LONGITUDE,
  NAP_POSTAL_CODE,
  NAP_STREET_ADDRESS,
  SITE_PHONE_E164,
} from '@/lib/site-contact';

type CitySchema = {
  '@type': 'City';
  'name': string;
};

export type RealEstateAgentSchema = {
  '@context': string;
  '@type': 'RealEstateAgent';
  'name': string;
  'jobTitle': string;
  'description': string;
  'url': string;
  'telephone': string;
  'email'?: string;
  'address': {
    '@type': 'PostalAddress';
    'streetAddress'?: string;
    'addressLocality': string;
    'addressRegion': string;
    'postalCode'?: string;
    'addressCountry': string;
  };
  'geo'?: {
    '@type': 'GeoCoordinates';
    'latitude': number;
    'longitude': number;
  };
  'worksFor': {
    '@type': 'RealEstateAgent';
    'name': string;
  };
  'priceRange'?: string;
  'areaServed': CitySchema[];
};

export type LocalBusinessSchema = {
  '@context': string;
  '@type': 'LocalBusiness';
  'name': string;
  'description': string;
  'url': string;
  'telephone': string;
  'address': {
    '@type': 'PostalAddress';
    'streetAddress'?: string;
    'addressLocality': string;
    'addressRegion': string;
    'postalCode'?: string;
    'addressCountry': string;
  };
  'geo'?: {
    '@type': 'GeoCoordinates';
    'latitude': number;
    'longitude': number;
  };
  'openingHoursSpecification'?: {
    '@type': 'OpeningHoursSpecification';
    'dayOfWeek': string[];
    'opens': string;
    'closes': string;
  }[];
  'priceRange'?: string;
  'areaServed': CitySchema[];
};

/**
 * FAQPage: Use for pages with MULTIPLE site-written Q&As and NO user-submitted answers.
 * Do NOT use QAPage for FAQ content — Google requires QAPage only for single-question
 * pages where users can submit answers (e.g. forum/support thread).
 */
export type FAQPageSchema = {
  '@context': string;
  '@type': 'FAQPage';
  'mainEntity': {
    '@type': 'Question';
    'name': string;
    'acceptedAnswer': {
      '@type': 'Answer';
      'text': string;
    };
  }[];
};

/**
 * QAPage: Use ONLY for a page focused on ONE question and its answers where USERS
 * can submit answers (forum, product support with user answers). One Question per page.
 * Required: mainEntity (Question), Question.name, answerCount, and acceptedAnswer and/or suggestedAnswer.
 * @see https://developers.google.com/search/docs/appearance/structured-data/qapage
 */
export type QAPageSchema = {
  '@context': string;
  '@type': 'QAPage';
  'mainEntity': QAPageQuestion;
};

export type QAPageQuestion = {
  '@type': 'Question';
  'name': string;
  'text'?: string;
  'answerCount': number;
  'datePublished'?: string;
  'dateModified'?: string;
  'author'?: { '@type': 'Person' | 'Organization'; 'name': string; 'url'?: string };
  'upvoteCount'?: number;
  'acceptedAnswer'?: QAPageAnswer;
  'suggestedAnswer'?: QAPageAnswer[];
};

export type QAPageAnswer = {
  '@type': 'Answer';
  'text': string;
  'url'?: string;
  'datePublished'?: string;
  'dateModified'?: string;
  'author'?: { '@type': 'Person' | 'Organization'; 'name': string; 'url'?: string };
  'upvoteCount'?: number;
  'image'?: string;
  'comment'?: QAPageComment;
};

export type QAPageComment = {
  '@type': 'Comment';
  'text': string;
  'datePublished'?: string;
  'author'?: { '@type': 'Person' | 'Organization'; 'name': string; 'url'?: string };
};

export type ServiceSchema = {
  '@context': string;
  '@type': 'Service';
  'serviceType': string;
  'name'?: string;
  'description': string;
  'provider': {
    '@type': 'RealEstateAgent';
    'name': string;
  };
  'areaServed': CitySchema | CitySchema[];
  'priceRange'?: string;
  'offers'?: {
    '@type': 'Offer';
    'price'?: string;
    'priceCurrency'?: string;
  };
};

export type BreadcrumbListSchema = {
  '@context': string;
  '@type': 'BreadcrumbList';
  'itemListElement': {
    '@type': 'ListItem';
    'position': number;
    'name': string;
    'item': string | { '@id': string; 'name': string };
  }[];
};

/**
 * ItemList + LocalBusiness carousel schema for Google's structured data carousel rich result (beta).
 * Eligibility: EEA, Turkey, South Africa only. Forward-looking for geographic expansion.
 * @see https://developers.google.com/search/docs/appearance/structured-data/carousels
 */
export type CarouselItemListSchema = {
  '@context': string;
  '@type': 'ItemList';
  'itemListElement': {
    '@type': 'ListItem';
    'position': number;
    'item': {
      '@type': 'LocalBusiness';
      'name': string;
      'image': string[];
      'url': string;
      'priceRange'?: string;
      'aggregateRating'?: {
        '@type': 'AggregateRating';
        'ratingValue': number;
        'reviewCount': number;
        'bestRating'?: number;
        'worstRating'?: number;
      };
    };
  }[];
};

export type WebSiteSchema = {
  '@context': string;
  '@type': 'WebSite';
  'name': string;
  'url': string;
  'potentialAction'?: {
    '@type': 'SearchAction';
    'target': {
      '@type': 'EntryPoint';
      'urlTemplate': string;
    };
    'query-input': string;
  };
};

export type OrganizationSchema = {
  '@context': string;
  '@type': 'Organization';
  'name': string;
  'url': string;
  'logo'?: string;
  'sameAs'?: string[];
  'contactPoint'?: {
    '@type': 'ContactPoint';
    'telephone': string;
    'contactType': string;
    'areaServed': string;
  };
};

export type ArticleSchema = {
  '@context': string;
  '@type': 'Article';
  'headline': string;
  'description': string;
  'author': {
    '@type': 'RealEstateAgent';
    'name': string;
  };
  'publisher': {
    '@type': 'Organization';
    'name': string;
    'logo'?: {
      '@type': 'ImageObject';
      'url': string;
    };
  };
  'datePublished'?: string;
  'dateModified'?: string;
  'mainEntityOfPage'?: {
    '@type': 'WebPage';
    '@id': string;
  };
};

export type ReviewSchema = {
  '@context': string;
  '@type': 'Review';
  'author': {
    '@type': 'Person';
    'name': string;
  };
  'datePublished'?: string;
  'reviewBody': string;
  'reviewRating'?: {
    '@type': 'Rating';
    'ratingValue': number;
    'bestRating'?: number;
  };
  /** Required for Review rich results - identifies what is being reviewed */
  'itemReviewed': {
    '@type': 'RealEstateAgent';
    'name': string;
    'url': string;
  };
};

/**
 * Generate RealEstateAgent schema for Dr. Jan Duffy
 */
export function generateRealEstateAgentSchema(): RealEstateAgentSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    'name': 'Dr. Jan Duffy',
    'jobTitle': 'Divorce Real Estate Specialist',
    'description': 'Expert divorce real estate services in Las Vegas. Helping divorcing homeowners navigate property division with compassion and expertise.',
    'url': siteUrl,
    'telephone': SITE_PHONE_E164,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': NAP_STREET_ADDRESS,
      'addressLocality': NAP_ADDRESS_LOCALITY,
      'addressRegion': NAP_ADDRESS_REGION,
      'postalCode': NAP_POSTAL_CODE,
      'addressCountry': 'US',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': NAP_GEO_LATITUDE,
      'longitude': NAP_GEO_LONGITUDE,
    },
    'worksFor': {
      '@type': 'RealEstateAgent',
      'name': BROKERAGE_NAME,
    },
    'areaServed': [
      { '@type': 'City', 'name': 'Las Vegas' },
      { '@type': 'City', 'name': 'Henderson' },
      { '@type': 'City', 'name': 'Summerlin' },
      { '@type': 'City', 'name': 'North Las Vegas' },
    ],
  };
}

/**
 * Generate LocalBusiness schema
 */
export function generateLocalBusinessSchema(): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Dr. Jan Duffy - Divorce Real Estate Specialist',
    'description': 'Expert divorce real estate services in Las Vegas. Specialized in helping divorcing homeowners navigate property division.',
    'url': siteUrl,
    'telephone': SITE_PHONE_E164,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': NAP_STREET_ADDRESS,
      'addressLocality': NAP_ADDRESS_LOCALITY,
      'addressRegion': NAP_ADDRESS_REGION,
      'postalCode': NAP_POSTAL_CODE,
      'addressCountry': 'US',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': NAP_GEO_LATITUDE,
      'longitude': NAP_GEO_LONGITUDE,
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '08:00',
        'closes': '16:00',
      },
    ],
    'areaServed': [
      { '@type': 'City', 'name': 'Las Vegas' },
      { '@type': 'City', 'name': 'Henderson' },
      { '@type': 'City', 'name': 'Summerlin' },
      { '@type': 'City', 'name': 'North Las Vegas' },
      { '@type': 'City', 'name': 'Green Valley' },
      { '@type': 'City', 'name': 'Spring Valley' },
    ],
  };
}

/**
 * Generate FAQPage schema (multiple Q&As, site-written, no user submission).
 */
export function generateFAQPageSchema(faqs: Array<{ question: string; answer: string }>): FAQPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };
}

/** Input for a single answer in QAPage (accepted or suggested). */
export type QAPageAnswerInput = {
  text: string;
  url?: string;
  datePublished?: string;
  dateModified?: string;
  author?: { name: string; url?: string };
  upvoteCount?: number;
  image?: string;
};

/**
 * Generate QAPage schema for a SINGLE question page where users can submit answers.
 * Use only for forum/support-style pages (one question + its answers). Not for FAQ pages.
 */
export function generateQAPageSchema(
  question: {
    name: string;
    text?: string;
    datePublished?: string;
    dateModified?: string;
    author?: { name: string; url?: string };
    upvoteCount?: number;
  },
  answers: {
    accepted?: QAPageAnswerInput;
    suggested?: QAPageAnswerInput[];
  },
): QAPageSchema {
  const totalAnswers = (answers.accepted ? 1 : 0) + (answers.suggested?.length ?? 0);
  const mainEntity: QAPageQuestion = {
    '@type': 'Question',
    'name': question.name,
    'answerCount': totalAnswers,
  };
  if (question.text) {
    mainEntity.text = question.text;
  }
  if (question.datePublished) {
    mainEntity.datePublished = question.datePublished;
  }
  if (question.dateModified) {
    mainEntity.dateModified = question.dateModified;
  }
  if (question.author) {
    mainEntity.author = {
      '@type': 'Person',
      'name': question.author.name,
      ...(question.author.url && { url: question.author.url }),
    };
  }
  if (question.upvoteCount !== undefined) {
    mainEntity.upvoteCount = question.upvoteCount;
  }

  const toAnswer = (a: QAPageAnswerInput): QAPageAnswer => {
    const ans: QAPageAnswer = { '@type': 'Answer', 'text': a.text };
    if (a.url) {
      ans.url = a.url;
    }
    if (a.datePublished) {
      ans.datePublished = a.datePublished;
    }
    if (a.dateModified) {
      ans.dateModified = a.dateModified;
    }
    if (a.author) {
      ans.author = { '@type': 'Person', 'name': a.author.name, ...(a.author.url && { url: a.author.url }) };
    }
    if (a.upvoteCount !== undefined) {
      ans.upvoteCount = a.upvoteCount;
    }
    if (a.image) {
      ans.image = a.image;
    }
    return ans;
  };

  if (answers.accepted) {
    mainEntity.acceptedAnswer = toAnswer(answers.accepted);
  }
  if (answers.suggested?.length) {
    mainEntity.suggestedAnswer = answers.suggested.map(toAnswer);
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity,
  };
}

/**
 * Generate BreadcrumbList schema (schema.org recommended format with item @id for GSC rich results)
 * @see https://schema.org/BreadcrumbList
 */
export function generateBreadcrumbListSchema(items: Array<{ name: string; url: string }>): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': { '@id': item.url, 'name': item.name },
    })),
  };
}

/** Input for carousel list item (LocalBusiness in ItemList) */
export type CarouselCommunityItem = {
  name: string;
  href: string;
  description: string;
  image?: string | string[];
};

/**
 * Generate ItemList + LocalBusiness carousel schema for summary pages (e.g. /communities).
 * Used for Google's carousel rich result (beta) - EEA, Turkey, South Africa only.
 */
export function generateCarouselItemListSchema(
  items: CarouselCommunityItem[],
  options: {
    baseUrl: string;
    defaultImage?: string;
    priceRange?: string;
    aggregateRating?: { ratingValue: number; reviewCount: number };
  },
): CarouselItemListSchema {
  const { baseUrl, defaultImage, priceRange = '$$' } = options;
  const fallbackImage
    = defaultImage
      ?? cloudflareImageUrl(CLOUDFLARE_IMAGE_IDS['dr-jan-duffy-agent'], getCloudflareHeroLcpVariant());

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': items.map((item, index) => {
      const imageUrls = item.image
        ? Array.isArray(item.image)
          ? item.image.map(url => (url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`))
          : [`${baseUrl}${item.image.startsWith('/') ? '' : '/'}${item.image}`]
        : [fallbackImage];

      return {
        '@type': 'ListItem',
        'position': index + 1,
        'item': {
          '@type': 'LocalBusiness',
          'name': `${item.name} Divorce Real Estate - Dr. Jan Duffy`,
          'image': imageUrls,
          'url': `${baseUrl}${item.href.startsWith('/') ? '' : '/'}${item.href}`,
          ...(priceRange && { priceRange }),
        },
      };
    }),
  };
}

/**
 * Generate WebSite schema for homepage
 */
export function generateWebSiteSchema(): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Dr. Jan Duffy - Divorce Real Estate Specialist',
    'url': siteUrl,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Dr. Jan Duffy - Divorce Real Estate Specialist',
    'url': siteUrl,
    'logo': `${siteUrl}/images/logo/berkshire-hathaway-quality-seal.png`,
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': SITE_PHONE_E164,
      'contactType': 'Customer Service',
      'areaServed': 'US',
    },
  };
}

/**
 * Generate Article schema for guide/educational pages
 */
export function generateArticleSchema(
  headline: string,
  description: string,
  url: string,
  datePublished?: string,
  dateModified?: string,
): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    'author': {
      '@type': 'RealEstateAgent',
      'name': 'Dr. Jan Duffy',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Dr. Jan Duffy - Divorce Real Estate Specialist',
      'logo': {
        '@type': 'ImageObject',
        'url': `${siteUrl}/images/logo/berkshire-hathaway-quality-seal.png`,
      },
    },
    datePublished,
    'dateModified': dateModified || datePublished,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

/**
 * Generate enhanced Service schema
 */
export function generateServiceSchema(
  serviceType: string,
  description: string,
  areaServed: string | string[],
  name?: string,
  priceRange?: string,
): ServiceSchema {
  const areas: CitySchema | CitySchema[] = Array.isArray(areaServed)
    ? areaServed.map(area => ({ '@type': 'City', 'name': area } as CitySchema))
    : { '@type': 'City', 'name': areaServed };

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType,
    'name': name || serviceType,
    description,
    'provider': {
      '@type': 'RealEstateAgent',
      'name': 'Dr. Jan Duffy',
    },
    'areaServed': areas,
    priceRange,
  };
}

/**
 * Generate Review schema for testimonials.
 * Google requires: author (@type + name), itemReviewed (@type + name + url).
 */
export function generateReviewSchema(
  authorName: string,
  reviewBody: string,
  rating?: number,
  datePublished?: string,
): ReviewSchema {
  const schema: ReviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    'author': {
      '@type': 'Person',
      'name': authorName,
    },
    reviewBody,
    'itemReviewed': {
      '@type': 'RealEstateAgent',
      'name': 'Dr. Jan Duffy',
      'url': siteUrl,
    },
  };
  if (datePublished) {
    schema.datePublished = datePublished;
  }
  if (rating !== undefined && rating > 0) {
    schema.reviewRating = {
      '@type': 'Rating',
      'ratingValue': rating,
      'bestRating': 5,
    };
  }
  return schema;
}

/** Shared Review schemas for use across marketing pages (e.g. layout, homepage) */
export function getSharedReviewSchemas(): ReviewSchema[] {
  return [
    generateReviewSchema(
      'Sarah M.',
      'Dr. Jan Duffy made selling our home during divorce so much easier than I expected. She was neutral, professional, and kept both of us informed every step of the way. The process was smooth, and we got a great price. I can\'t recommend her enough.',
      5,
      '2024-06-15',
    ),
    generateReviewSchema(
      'Michael R.',
      'I needed to buy out my ex-wife and keep the house. Dr. Jan Duffy helped me understand the process, coordinated with my lender for refinancing, and made sure everything was done correctly. Her expertise saved me time and money.',
      5,
      '2024-07-22',
    ),
    generateReviewSchema(
      'Jennifer L.',
      'Going through a divorce with kids is hard enough. Dr. Jan Duffy understood our situation and helped us sell our home quickly so we could both move on. She was compassionate, professional, and got results. We\'re both in our new homes now, and the kids are adjusting well.',
      5,
      '2024-08-10',
    ),
  ];
}

/**
 * Generate SiteNavigationElement schema
 */
export type SiteNavigationElementSchema = {
  '@context': string;
  '@type': 'SiteNavigationElement';
  'name': string;
  'url': string;
};

export function generateSiteNavigationElementSchema(
  name: string,
  url: string,
): SiteNavigationElementSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name,
    url,
  };
}
