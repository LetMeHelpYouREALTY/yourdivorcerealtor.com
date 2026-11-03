import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { DivorcePageTemplate } from '@/components/divorce/DivorcePageTemplate';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateLocaleAlternates, siteUrl } from '@/lib/metadata';
import { generateRealEstateAgentSchema } from '@/lib/schema';
import {
  BROKERAGE_NAME,
  NAP_ADDRESS_LOCALITY,
  NAP_ADDRESS_REGION,
  NAP_POSTAL_CODE,
  NAP_STREET_LINES,
  REAL_ESTATE_LICENSE_NV,
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from '@/lib/site-contact';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

const path = '/sitemap';

const coreLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Dr. Jan' },
  { href: '/contact', label: 'Contact' },
  { href: '/divorce-real-estate-services', label: 'Divorce real estate services' },
  { href: '/communities', label: 'Communities overview' },
  { href: '/faq', label: 'FAQ' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/sell', label: 'Sell' },
  { href: '/homes', label: 'Homes / search' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/references-and-links', label: 'References & links' },
  { href: '/attorney-resources', label: 'Attorney resources' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
];

const communityLinks = [
  { href: '/divorce-realtor-henderson', label: 'Henderson' },
  { href: '/divorce-realtor-summerlin', label: 'Summerlin' },
  { href: '/divorce-realtor-north-las-vegas', label: 'North Las Vegas' },
  { href: '/divorce-realtor-green-valley', label: 'Green Valley' },
  { href: '/divorce-realtor-spring-valley', label: 'Spring Valley' },
  { href: '/divorce-realtor-enterprise', label: 'Enterprise' },
  { href: '/divorce-realtor-paradise', label: 'Paradise' },
  { href: '/divorce-realtor-centennial-hills', label: 'Centennial Hills' },
  { href: '/divorce-realtor-southern-highlands', label: 'Southern Highlands' },
  { href: '/divorce-realtor-aliante', label: 'Aliante' },
  { href: '/divorce-realtor-mountains-edge', label: 'Mountains Edge' },
  { href: '/divorce-realtor-inspirada', label: 'Inspirada' },
  { href: '/luxury-divorce-real-estate-las-vegas', label: 'Luxury divorce real estate (overview)' },
  { href: '/divorce-realtor-the-ridges', label: 'The Ridges' },
  { href: '/divorce-realtor-red-rock-country-club', label: 'Red Rock Country Club' },
  { href: '/divorce-realtor-macdonald-highlands', label: 'MacDonald Highlands' },
  { href: '/divorce-realtor-anthem-country-club', label: 'Anthem Country Club' },
  { href: '/strip-high-rise-condo-divorce', label: 'Strip high-rise condos' },
];

const topicLinks = [
  { href: '/selling-home-during-divorce', label: 'Selling home during divorce' },
  { href: '/buying-home-after-divorce', label: 'Buying after divorce' },
  { href: '/divorce-property-division', label: 'Property division' },
  { href: '/divorce-home-valuation', label: 'Home valuation' },
  { href: '/divorce-buyout-options', label: 'Buyout options' },
  { href: '/court-ordered-home-sale', label: 'Court-ordered sale' },
  { href: '/family-law-attorney-collaboration', label: 'Family law collaboration' },
  { href: '/divorce-mediator-resources', label: 'Mediator resources' },
];

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: 'Site Map, Las Vegas Divorce Real Estate | Dr. Jan Duffy',
    description:
      'Every main page on yourdivorcerealtor.com in one list: services, 18 community and enclave pages, guides on selling and buyouts, and the XML sitemap.',
    alternates: { canonical, languages },
    robots: { index: true, follow: true },
  };
}

function LinkList({ items }: { items: { href: string; label: string }[] }) {
  return (
    <ul className="list-none space-y-2 pl-0">
      {items.map(item => (
        <li key={item.href}>
          <Link href={item.href} className="text-blue-700 hover:underline" prefetch={true}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function SitemapHtmlPage(props: PageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const xmlUrl = `${siteUrl}/sitemap.xml`;

  return (
    <>
      <StructuredData data={[generateRealEstateAgentSchema()]} />
      <DivorcePageTemplate
        h1="Site map"
        heroSubhead="Every main page in one list: services, community and enclave pages, and the guides."
        currentPath={path}
        showHomeValue={false}
        showRelatedLinks={false}
      >
        <div className="prose prose-lg mx-auto max-w-4xl">
          <p>
            Start with the core pages, then the community page closest to your house. Crawlers should use the XML
            sitemap.
          </p>
          <p>
            <strong>XML sitemap:</strong>
            {' '}
            <a href={xmlUrl} className="font-semibold text-blue-700 hover:underline">
              {xmlUrl}
            </a>
          </p>

          <h2 className="text-xl font-bold text-gray-900">Business (NAP)</h2>
          <address className="text-gray-800 not-italic">
            <p className="font-semibold">Dr. Jan Duffy</p>
            <p>{BROKERAGE_NAME}</p>
            <p>
              License #
              {REAL_ESTATE_LICENSE_NV}
            </p>
            {NAP_STREET_LINES.map(line => (
              <p key={line}>{line}</p>
            ))}
            <p>
              {NAP_ADDRESS_LOCALITY}
              ,
              {NAP_ADDRESS_REGION}
              {' '}
              {NAP_POSTAL_CODE}
            </p>
            <p>
              <a href={SITE_PHONE_TEL}>{SITE_PHONE_DISPLAY}</a>
            </p>
            <p>
              <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
            </p>
          </address>

          <h2 className="mt-10 text-xl font-bold text-gray-900">Core pages</h2>
          <LinkList items={coreLinks} />

          <h2 className="mt-10 text-xl font-bold text-gray-900">Las Vegas area communities and luxury enclaves</h2>
          <LinkList items={communityLinks} />

          <h2 className="mt-10 text-xl font-bold text-gray-900">Popular topics</h2>
          <LinkList items={topicLinks} />

          <p className="mt-10 text-sm text-gray-600">
            The remaining guides and calculators are listed in the
            {' '}
            <a href={xmlUrl} className="text-blue-700 hover:underline">
              XML sitemap
            </a>
            .
          </p>
        </div>
      </DivorcePageTemplate>
    </>
  );
}
