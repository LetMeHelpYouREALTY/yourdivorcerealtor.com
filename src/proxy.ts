import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './libs/I18nRouting';

// Create the next-intl middleware for i18n routing
const intlMiddleware = createIntlMiddleware(routing);

/**
 * Next.js 16 proxy.ts replaces middleware.ts
 * Runs on Node.js runtime (not Edge)
 * Handles redirects, i18n routing, and request processing
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // Redirect non-www to www (primary domain)
  if (hostname === 'yourdivorcerealtor.com' || hostname === 'yourdivorcerealtor.com:3000') {
    url.hostname = 'www.yourdivorcerealtor.com';
    return Response.redirect(url, 301);
  }

  // Handle trailing slashes - remove trailing slash except for root
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1);
    return Response.redirect(url, 301);
  }

  // Skip i18n for API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/api')
    || pathname.startsWith('/_next')
    || pathname.startsWith('/_vercel')
    || pathname.includes('.')
  ) {
    return undefined;
  }

  // Apply i18n middleware for all other routes
  return intlMiddleware(request);
}

// Export config for matcher (required for proxy.ts in Next.js 16)
export const config = {
  matcher: ['/', '/(en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
