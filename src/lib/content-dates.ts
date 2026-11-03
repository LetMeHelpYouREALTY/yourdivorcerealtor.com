/**
 * Content dates for byline and Article schema (Google byline-date best practices).
 * Use a single stable date so user-visible byline and structured data stay consistent.
 * Update CONTENT_LAST_UPDATED when you do a site-wide content review.
 */

/** Date-only (YYYY-MM-DD) for "last updated" used across article pages. */
export const CONTENT_LAST_UPDATED = '2026-11-03';

/**
 * Format an ISO date string for user-visible byline (e.g. "Feb 16, 2025").
 * Accepts YYYY-MM-DD or full ISO; time/timezone are optional for display.
 */
export function formatBylineDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    return iso;
  }
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Return ISO 8601 string with time and timezone for Article datePublished/dateModified.
 * Uses noon Pacific to avoid DST edge cases; Google recommends time+timezone for precision.
 */
export function toSchemaDateTime(dateOnly: string): string {
  return `${dateOnly}T12:00:00-08:00`;
}
