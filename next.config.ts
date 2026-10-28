import type { NextConfig } from 'next';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';
import './src/libs/Env';

/** Resolves monorepo / multiple lockfile warnings so tracing uses this app root. */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

// Define the base Next.js configuration
const baseConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  devIndicators: {
    position: 'bottom-right',
  },
  poweredByHeader: false,
  reactStrictMode: true,
  reactCompiler: true,
  /** Smaller prod bundles (keep error/warn for debugging). */
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },
  outputFileTracingIncludes: {
    '/': ['./migrations/**/*'],
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
    /** Inline CSS in HTML in production (App Router) to cut render-blocking CSS chain. */
    inlineCss: true,
    /** Smaller client chunks where Clerk is imported (dashboard / auth). */
    optimizePackageImports: ['@clerk/nextjs'],
  },
  // Non-www → www 301 so GSC indexes canonical (www) and reports "Page with redirect" as intended
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'header' as const, key: 'host', value: 'yourdivorcerealtor.com' }],
        destination: 'https://www.yourdivorcerealtor.com/:path*',
        permanent: true,
      },
    ];
  },
  // Security headers for divorce client privacy
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              'default-src \'self\'',
              'script-src https://widgetbe.com https://*.widgetbe.com \'self\' \'unsafe-inline\' \'unsafe-eval\' https://em.realscout.com https://*.posthog.com https://*.clerk.com https://assets.calendly.com',
              'style-src \'self\' \'unsafe-inline\' https://fonts.googleapis.com https://assets.calendly.com',
              'font-src \'self\' https://fonts.gstatic.com data:',
              'img-src https://widgetbe.com https://*.widgetbe.com \'self\' data: https: blob:',
              'connect-src https://widgetbe.com https://*.widgetbe.com \'self\' https://*.realscout.com https://*.posthog.com https://*.clerk.com https://*.sentry.io https://calendly.com',
              'frame-src https://widgetbe.com https://*.widgetbe.com \'self\' https://*.clerk.com https://calendly.com',
            ].join('; '),
          },
        ],
      },
    ];
  },
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'em.realscout.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.realscout.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
        pathname: '/byE6BTe9lNqo21V57n4aPQ/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    /** Long-lived cache for optimized images (Cloudflare + static assets). */
    minimumCacheTTL: 31536000,
  },
  // CacheLife profiles for Next.js 16 caching
  cacheLife: {
    static: {
      revalidate: 86400, // 24 hours - for marketing copy, about page
    },
    listings: {
      revalidate: 3600, // 1 hour - for property widgets
    },
    dynamic: {
      revalidate: 0, // No cache - for contact forms, consultations
    },
    communities: {
      revalidate: 14400, // 4 hours - for Las Vegas community pages
    },
  },
};

// Initialize the Next-Intl plugin
let configWithPlugins = createNextIntlPlugin('./src/libs/I18n.ts')(baseConfig);

// Conditionally enable bundle analysis
if (process.env.ANALYZE === 'true') {
  configWithPlugins = withBundleAnalyzer()(configWithPlugins);
}

// Conditionally enable Sentry configuration
if (
  !process.env.NEXT_PUBLIC_SENTRY_DISABLED
  && process.env.SENTRY_ORGANIZATION
  && process.env.SENTRY_PROJECT
) {
  configWithPlugins = withSentryConfig(configWithPlugins, {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options
    org: process.env.SENTRY_ORGANIZATION,
    project: process.env.SENTRY_PROJECT,

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    reactComponentAnnotation: {
      enabled: true,
    },

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: '/monitoring',

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Disable Sentry telemetry
    telemetry: false,
  });
}

const nextConfig = configWithPlugins;
export default nextConfig;
