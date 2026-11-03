'use client';

import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState, useTransition } from 'react';
import { EngagementPhoneLink } from '@/components/analytics/EngagementPhoneLink';
import { CalendlyLink } from '@/components/calendly/CalendlyLink';
import { HEADER_SERVICE_AREA, SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from '@/lib/site-contact';
import { routing } from '@/libs/I18nRouting';
import { NavigationLink } from './NavigationLink';

/**
 * Optimized Header Component
 * - Split interactive parts (mobile menu) into client component
 * - Uses React 19.2 View Transitions for smooth animations
 * - Optimized for accessibility and SEO
 * - Prefetches navigation links on hover
 */
export function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, startTransition] = useTransition();

  const servicesHref = useMemo(
    () =>
      locale === routing.defaultLocale
        ? '/divorce-real-estate-services'
        : `/${locale}/divorce-real-estate-services`,
    [locale],
  );

  const toggleMobileMenu = () => {
    startTransition(() => {
      setMobileMenuOpen(prev => !prev);
    });
  };

  const closeMobileMenu = () => {
    startTransition(() => {
      setMobileMenuOpen(false);
    });
  };

  const navigationLinks = [
    { href: '/', label: 'Home', priority: 'high' as const },
    { href: '/divorce-real-estate-services', label: 'Divorce Specialist', priority: 'high' as const },
    { href: '/luxury-divorce-real-estate-las-vegas', label: 'Luxury Homes', priority: 'high' as const },
    { href: '/communities', label: 'Communities', priority: 'low' as const },
    { href: '/attorney-resources', label: 'Resources', priority: 'low' as const },
    { href: '/about', label: 'About Dr. Jan', priority: 'low' as const },
    { href: '/contact', label: 'Contact', priority: 'high' as const },
  ];

  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md" role="banner">
      {/* Top Banner */}
      <div className="bg-blue-600 py-2.5 text-center text-sm text-white sm:py-3">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="font-medium">
            Skip the Stress. Get Expert Divorce Real Estate Help.
            {' '}
            <CalendlyLink className="font-semibold underline transition-colors hover:text-blue-200">
              Schedule a Consultation
            </CalendlyLink>
          </p>
          <p className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-blue-100 sm:text-sm">
            <span>{HEADER_SERVICE_AREA}</span>
            <span className="hidden sm:inline" aria-hidden="true">
              ·
            </span>
            <EngagementPhoneLink
              href={SITE_PHONE_TEL}
              location="header_banner_phone"
              className="font-semibold text-white underline decoration-blue-200 underline-offset-2 transition-colors hover:text-blue-50"
              aria-label={`Call Dr. Jan Duffy at ${SITE_PHONE_DISPLAY}`}
            >
              {SITE_PHONE_DISPLAY}
            </EngagementPhoneLink>
            <span className="hidden sm:inline" aria-hidden="true">
              ·
            </span>
            <Link
              href={servicesHref}
              className="font-semibold text-white underline decoration-blue-200 underline-offset-2 transition-colors hover:text-blue-50"
              prefetch={true}
            >
              Divorce real estate services
            </Link>
          </p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 sm:px-6" aria-label="Main navigation">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - SEO Optimized with Schema Markup */}
          <Link
            href="/"
            className="flex rounded focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:outline-none"
            prefetch={true}
            aria-label="Dr. Jan Duffy - Divorce Real Estate Specialist Home"
            itemScope
            itemType="https://schema.org/RealEstateAgent"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo/berkshire-hathaway-quality-seal.png"
                alt="Berkshire Hathaway HomeServices Nevada Properties quality seal"
                width={40}
                height={40}
                priority
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-blue-600" itemProp="name">
                  Dr. Jan Duffy
                </span>
                <span className="text-sm font-medium text-gray-600" itemProp="description">
                  Divorce Real Estate Specialist
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-6 lg:flex">
            {navigationLinks.map(link => (
              <NavigationLink
                key={link.href}
                href={link.href}
                label={link.label}
                priority={link.priority}
                prefetch={true}
              />
            ))}
          </div>

          {/* Right Side — location, services, phone (NAP-forward) */}
          <div className="hidden max-w-md flex-col items-end gap-1 text-right lg:flex">
            <span className="text-xs font-medium text-gray-600">{HEADER_SERVICE_AREA}</span>
            <Link
              href={servicesHref}
              className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:outline-none"
              prefetch={true}
            >
              Divorce real estate services
            </Link>
            <div className="mt-1 flex flex-wrap items-center justify-end gap-2">
              <CalendlyLink className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:outline-none">
                Schedule a Call
              </CalendlyLink>
              <EngagementPhoneLink
                href={SITE_PHONE_TEL}
                location="header_desktop"
                className="inline-flex items-center justify-center rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-amber-300 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none"
                aria-label={`Call Dr. Jan Duffy at ${SITE_PHONE_DISPLAY}`}
              >
                Call
                {' '}
                {SITE_PHONE_DISPLAY}
              </EngagementPhoneLink>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="rounded p-2 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:outline-none lg:hidden"
            onClick={toggleMobileMenu}
            {...(mobileMenuOpen ? { 'aria-expanded': 'true' } : { 'aria-expanded': 'false' })}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              className="h-6 w-6 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileMenuOpen
                ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  )
                : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="lg:hidden" aria-hidden="false">
            <div className="space-y-3 border-t border-gray-200 px-4 py-4">
              <p className="text-sm font-medium text-gray-800">{HEADER_SERVICE_AREA}</p>
              <Link
                href={servicesHref}
                onClick={closeMobileMenu}
                className="block text-sm font-semibold text-blue-600 hover:text-blue-800"
                prefetch={true}
              >
                Divorce real estate services
              </Link>
              <EngagementPhoneLink
                href={SITE_PHONE_TEL}
                location="header_mobile_nap"
                onClick={closeMobileMenu}
                className="inline-flex w-full items-center justify-center rounded-lg bg-amber-400 px-4 py-3 text-base font-semibold text-gray-900 transition-colors hover:bg-amber-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                aria-label={`Call Dr. Jan Duffy at ${SITE_PHONE_DISPLAY}`}
              >
                Call
                {' '}
                {SITE_PHONE_DISPLAY}
              </EngagementPhoneLink>
            </div>
            <div className="space-y-4 border-t border-gray-200 py-4">
              {navigationLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`block rounded-md px-4 py-2 transition-colors focus:ring-2 focus:ring-blue-600 focus:outline-none ${
                    isActive(link.href)
                      ? 'bg-blue-50 font-semibold text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                  prefetch={true}
                >
                  {link.label}
                </Link>
              ))}
              <CalendlyLink
                onClick={closeMobileMenu}
                className="block rounded-md bg-blue-600 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                Schedule a Call
              </CalendlyLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
