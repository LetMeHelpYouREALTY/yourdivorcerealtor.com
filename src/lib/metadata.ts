import type { Metadata } from 'next';
import { routing } from '@/libs/I18nRouting';
import { getI18nPath } from '@/utils/Helpers';

export const siteName = 'Dr. Jan Duffy | Las Vegas Divorce Real Estate Specialist';
export const siteUrl = 'https://www.yourdivorcerealtor.com';

/**
 * Locales included in hreflang `alternates.languages` and self-canonical rules.
 * The site is English-only. The French locale was removed on 2026-11-03 because every
 * /fr/* URL served the English page and Search Console flagged 22 of them as duplicates.
 * If a translated locale is ever added, extend AppConfig.locales and this list together.
 */
export const HREFLANG_LOCALES: readonly string[] = [routing.defaultLocale];

export type LocaleAlternatesOptions = {
  /** Defaults to HREFLANG_LOCALES. */
  hreflangLocales?: readonly string[];
};

/**
 * Resolves the canonical href for indexing. A locale that is not in the hreflang list
 * canonicalizes to the default-locale URL so it is never indexed as a duplicate.
 */
function resolveCanonicalHref(
  path: string,
  locale: string,
  options?: LocaleAlternatesOptions,
): string {
  const hreflangLocales = options?.hreflangLocales ?? HREFLANG_LOCALES;
  if (locale !== routing.defaultLocale && !hreflangLocales.includes(locale)) {
    return `${siteUrl}${getI18nPath(path, routing.defaultLocale)}`;
  }
  return `${siteUrl}${getI18nPath(path, locale)}`;
}

/**
 * Absolute canonical URL (matches HTML `link[rel=canonical]` and Article JSON-LD `url`).
 * Pass the same `options` as `generateLocaleAlternates` when the page uses `hreflangLocales`.
 */
export function getCanonicalSiteUrl(
  path: string,
  locale: string,
  options?: LocaleAlternatesOptions,
): string {
  return resolveCanonicalHref(path, locale, options);
}
const defaultDescription = 'Expert divorce real estate services in Las Vegas. Dr. Jan Duffy helps divorcing homeowners navigate property division with compassion and expertise.';

/**
 * Generate base metadata for all pages
 */
export function generateBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteUrl,
      siteName,
      title: siteName,
      description: defaultDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description: defaultDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        'index': true,
        'follow': true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generate page-specific metadata
 */
export function generatePageMetadata({
  title,
  description,
  keywords,
  path = '',
  noindex = false,
}: {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  noindex?: boolean;
}): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  const canonicalUrl = `${siteUrl}${path}`;

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
    },
    twitter: {
      title: fullTitle,
      description,
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
}

/**
 * Generate locale-aware canonical and hreflang alternates for [locale] pages.
 * Path is the pathname without locale (e.g. '/divorce-and-mortgage', '/' for homepage).
 */
export function generateLocaleAlternates(
  path: string,
  locale: string,
  options?: LocaleAlternatesOptions,
): { canonical: string; languages: Record<string, string> } {
  const localesForHreflang = options?.hreflangLocales ?? HREFLANG_LOCALES;
  const canonical = resolveCanonicalHref(path, locale, options);
  const languages: Record<string, string> = {};
  for (const loc of localesForHreflang) {
    languages[loc] = `${siteUrl}${getI18nPath(path, loc)}`;
  }
  languages['x-default'] = `${siteUrl}${getI18nPath(path, routing.defaultLocale)}`;
  return { canonical, languages };
}

/**
 * Generate full page metadata with locale-aware canonical and hreflang.
 * Use in [locale] marketing pages: pass path (no locale prefix) and locale from params.
 */
export function generateLocalePageMetadata({
  path,
  locale,
  title,
  description,
  keywords,
  noindex = false,
}: {
  path: string;
  locale: string;
  title: string;
  description: string;
  keywords?: string;
  noindex?: boolean;
}): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  const { canonical, languages } = generateLocaleAlternates(path, locale);
  return {
    title: fullTitle,
    description,
    keywords,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
    },
    twitter: {
      title: fullTitle,
      description,
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/**
 * Title template for consistent page titles
 */
export const titleTemplate = `%s | ${siteName}`;
