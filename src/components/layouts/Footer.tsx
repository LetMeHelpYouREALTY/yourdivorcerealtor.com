import Link from 'next/link';
import { EngagementPhoneLink } from '@/components/analytics/EngagementPhoneLink';
import { CalendlyLink } from '@/components/calendly/CalendlyLink';
import { generateLocalBusinessSchema } from '@/lib/schema';
import {
  BROKERAGE_NAME,
  NAP_ADDRESS_LOCALITY,
  NAP_ADDRESS_REGION,
  NAP_POSTAL_CODE,
  NAP_STREET_LINES,
  PROFESSIONAL_PHONE_DISPLAY,
  PROFESSIONAL_PHONE_TEL,
  REAL_ESTATE_LICENSE_NV,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from '@/lib/site-contact';

/**
 * Optimized Footer Component
 * - Server Component (static content)
 * - Includes LocalBusiness structured data
 * - Optimized for SEO and accessibility
 * - Cached year calculation
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  // Generate structured data for SEO
  const localBusinessSchema = generateLocalBusinessSchema();

  const communities = [
    { name: 'Henderson', href: '/divorce-realtor-henderson' },
    { name: 'Summerlin', href: '/divorce-realtor-summerlin' },
    { name: 'North Las Vegas', href: '/divorce-realtor-north-las-vegas' },
    { name: 'Green Valley', href: '/divorce-realtor-green-valley' },
    { name: 'Spring Valley', href: '/divorce-realtor-spring-valley' },
    { name: 'Enterprise', href: '/divorce-realtor-enterprise' },
    { name: 'Paradise', href: '/divorce-realtor-paradise' },
    { name: 'Centennial Hills', href: '/divorce-realtor-centennial-hills' },
    { name: 'Southern Highlands', href: '/divorce-realtor-southern-highlands' },
    { name: 'Aliante', href: '/divorce-realtor-aliante' },
    { name: 'Mountains Edge', href: '/divorce-realtor-mountains-edge' },
    { name: 'Inspirada', href: '/divorce-realtor-inspirada' },
  ];

  const resources = [
    { name: 'Home Valuation', href: '/divorce-home-valuation' },
    { name: 'Selling During Divorce', href: '/selling-home-during-divorce' },
    { name: 'Buying After Divorce', href: '/buying-home-after-divorce' },
    { name: 'Attorney Resources', href: '/attorney-resources' },
    { name: 'References & Links', href: '/references-and-links' },
    { name: 'FAQ', href: '/faq' },
  ];

  // Pages Search Console reported as never crawled or "discovered, not indexed":
  // a site-wide link gives Googlebot a path to every one of them.
  const guides = [
    { name: 'Divorce Real Estate Guide', href: '/divorce-real-estate-guide' },
    { name: 'Nevada Divorce Home Sale Guide', href: '/selling-house-during-divorce-nevada-guide' },
    { name: 'Can I Sell My House During Divorce?', href: '/can-i-sell-my-house-during-divorce' },
    { name: 'How to Sell a House During Divorce', href: '/how-to-sell-house-during-divorce' },
    { name: 'Remove a Spouse From the Mortgage', href: '/remove-spouse-from-mortgage-after-divorce' },
    { name: 'Divorce and Your Mortgage', href: '/divorce-and-mortgage' },
    { name: 'Community Property and the House', href: '/community-property-divorce-house' },
    { name: 'Preparing Your Home for Sale', href: '/preparing-home-sale-divorce' },
    { name: 'Home Sale Timeline', href: '/divorce-home-sale-timeline' },
    { name: 'Certified Divorce Real Estate Expert', href: '/certified-divorce-real-estate-expert' },
    { name: 'All Las Vegas Communities', href: '/communities' },
    { name: 'Client Experience', href: '/portfolio' },
  ];

  const externalResources = [
    { name: 'IRS Publication 523', href: 'https://www.irs.gov/publications/p523', description: 'Home sale tax rules' },
    { name: 'Nevada NRS Chapter 123', href: 'https://www.leg.state.nv.us/NRS/NRS-123.html', description: 'Community property' },
    { name: 'Nevada Real Estate Division', href: 'https://red.nv.gov/', description: 'License lookup' },
    { name: 'Nevada State Bar', href: 'https://nvbar.org/', description: 'Find an attorney' },
  ];

  return (
    <footer className="bg-gray-900 py-12 text-white" role="contentinfo">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml -- JSON-LD LocalBusiness
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="container mx-auto px-4">
        {/* Primary CTA: Schedule a consultation */}
        <div className="mb-10 flex flex-col items-center gap-4 rounded-xl bg-blue-600/20 px-6 py-8 text-center">
          <p className="text-lg font-semibold text-white sm:text-xl">
            Ready to discuss your options?
          </p>
          <CalendlyLink className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition-colors hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none">
            Schedule a Free 15-Minute Call
          </CalendlyLink>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Las Vegas Communities */}
          <nav aria-label="Las Vegas Communities">
            <h3 className="mb-4 text-lg font-semibold">Las Vegas Communities</h3>
            <ul className="space-y-2">
              {communities.map(community => (
                <li key={community.href}>
                  <Link
                    href={community.href}
                    className="rounded text-gray-300 transition-colors hover:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    prefetch={true}
                  >
                    {community.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources">
            <h3 className="mb-4 text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              {resources.map(resource => (
                <li key={resource.href}>
                  <Link
                    href={resource.href}
                    className="rounded text-gray-300 transition-colors hover:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    prefetch={true}
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Guides */}
          <nav aria-label="Divorce real estate guides">
            <h3 className="mb-4 text-lg font-semibold">Guides</h3>
            <ul className="space-y-2">
              {guides.map(guide => (
                <li key={guide.href}>
                  <Link
                    href={guide.href}
                    className="rounded text-gray-300 transition-colors hover:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    prefetch={true}
                  >
                    {guide.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company Info */}
          <address className="not-italic">
            <h3 className="mb-4 text-lg font-semibold">Dr. Jan Duffy, REALTOR</h3>
            <ul className="space-y-2 text-gray-300">
              <li>{BROKERAGE_NAME}</li>
              <li>
                License #
                {REAL_ESTATE_LICENSE_NV}
              </li>
              {NAP_STREET_LINES.map(line => (
                <li key={line}>{line}</li>
              ))}
              <li>
                {NAP_ADDRESS_LOCALITY}
                ,
                {NAP_ADDRESS_REGION}
                {' '}
                {NAP_POSTAL_CODE}
              </li>
              <li>
                <EngagementPhoneLink
                  href={SITE_PHONE_TEL}
                  location="footer_client_phone"
                  className="rounded transition-colors hover:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  aria-label={`Call client phone number ${SITE_PHONE_DISPLAY}`}
                >
                  Client Phone:
                  {' '}
                  {SITE_PHONE_DISPLAY}
                </EngagementPhoneLink>
              </li>
              <li>
                <EngagementPhoneLink
                  href={PROFESSIONAL_PHONE_TEL}
                  location="footer_professional_phone"
                  className="rounded transition-colors hover:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  aria-label={`Call professional phone number ${PROFESSIONAL_PHONE_DISPLAY}`}
                >
                  Professional Phone:
                  {' '}
                  {PROFESSIONAL_PHONE_DISPLAY}
                </EngagementPhoneLink>
              </li>
              <li className="mt-4">
                <Link
                  href="/about"
                  className="rounded text-gray-300 transition-colors hover:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  prefetch={true}
                >
                  About Dr. Jan
                </Link>
              </li>
            </ul>
          </address>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Connect With Us</h3>
            <p className="text-sm text-gray-400">
              Social profile links are not listed here until they are verified for this site. Use the scheduling button
              above, call
              {' '}
              <EngagementPhoneLink
                href={SITE_PHONE_TEL}
                location="footer_connect_blurb"
                className="text-gray-300 underline hover:text-white"
              >
                {SITE_PHONE_DISPLAY}
              </EngagementPhoneLink>
              , or visit
              {' '}
              <Link href="/contact" className="text-gray-300 underline hover:text-white">
                Contact
              </Link>
              .
            </p>
          </div>
        </div>

        {/* External / Official Resources */}
        <nav className="mt-8 border-t border-gray-800 pt-8" aria-label="Official resources">
          <h3 className="mb-3 text-sm font-semibold text-gray-300">Legal &amp; Tax Resources</h3>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {externalResources.map(resource => (
              <li key={resource.href}>
                <a
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded text-gray-400 transition-colors hover:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {resource.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Copyright and Legal Links */}
        <div className="mt-6 border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <p>
            ©
            {' '}
            {currentYear}
            {' '}
            Dr. Jan Duffy,
            {' '}
            {BROKERAGE_NAME}
            . #
            {REAL_ESTATE_LICENSE_NV}
            {' '}
            All Rights Reserved.
          </p>
          <nav className="mt-4 space-x-4" aria-label="Legal links">
            <Link
              href="/sitemap"
              className="rounded transition-colors hover:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Sitemap
            </Link>
            <Link
              href="/privacy"
              className="rounded transition-colors hover:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="rounded transition-colors hover:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Terms of Use
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
