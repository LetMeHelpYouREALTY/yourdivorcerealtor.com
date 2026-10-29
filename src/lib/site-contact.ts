/**
 * Canonical contact and license — align with JSON-LD (`schema.ts`) and Google Business Profile.
 */
export const SITE_PHONE_DISPLAY = '(702) 500-1955';
export const SITE_PHONE_TEL = 'tel:+17025001955';
export const SITE_PHONE_E164 = '+17025001955';
/** Office / professional line (footer) — keep in sync with GBP if listed. */
export const PROFESSIONAL_PHONE_DISPLAY = '(702) 500-1955';
export const PROFESSIONAL_PHONE_TEL = 'tel:+17025001955';
export const REAL_ESTATE_LICENSE_NV = 'S.0197614.LLC';
export const BROKERAGE_NAME = 'Berkshire Hathaway HomeServices Nevada Properties';
export const NAP_STREET_LINES = ['601 N. Pecos', 'Family Courts and Services Center'] as const;
export const NAP_ADDRESS_LOCALITY = 'Las Vegas';
export const NAP_ADDRESS_REGION = 'NV';
/** Short service-area line for header and nav — align with GBP primary market. */
export const HEADER_SERVICE_AREA = 'Las Vegas & Henderson, NV';
export const NAP_POSTAL_CODE = '89155';
/** Single-line street for PostalAddress in JSON-LD */
export const NAP_STREET_ADDRESS = '601 N. Pecos, Family Courts and Services Center';
/** Public contact email — align with GBP / site. */
export const SITE_EMAIL = 'DrDuffy@YourDivorceRealtor.com';
/**
 * Approximate map pin for NAP address (Family Courts area). Align decimals with Google Business Profile.
 * @see https://schema.org/GeoCoordinates
 */
export const NAP_GEO_LATITUDE = 36.1729;
export const NAP_GEO_LONGITUDE = -115.1041;
