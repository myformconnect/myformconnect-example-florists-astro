// =============================================================
// Form Action URLs & Configuration for MyFormCapture
//
// Setting up your forms is simple:
// Paste either your FULL form action URL:
//   'https://myformcapture.com/f/YOUR-UUID'
// OR just your form UUID:
//   'YOUR-UUID'
// =============================================================

export const FORMS = {
  /**
   * General Contact & Custom Order Enquiry Form
   * Used on Home and Contact pages.
   * Put your full URL OR just the UUID:
   */
  GENERAL_ENQUIRY: 'https://myformcapture.com/f/5ddb4177-17cc-4600-9af9-39be97a71ee5',

  /**
   * Wedding & Consultation Booking Widget
   * Used for the interactive booking calendar on /contact#booking.
   * Put your full URL OR just the UUID:
   */
  BOOKING_WIDGET: 'https://myformcapture.com/f/95cb0e2f-9a02-4b30-ab68-5aeb9e1220a7',
} as const;

/**
 * Normalizes any form input (full URL or bare UUID) into a complete form action URL.
 */
export function resolveFormUrl(urlOrUuid: string, base = 'https://myformcapture.com'): string {
  const value = (urlOrUuid || '').trim();
  if (!value) return '';
  return value.startsWith('http://') || value.startsWith('https://')
    ? value
    : `${base.replace(/\/$/, '')}/f/${value}`;
}

/**
 * Extracts the form UUID from either a full URL or a bare UUID.
 */
export function resolveFormUuid(urlOrUuid: string): string {
  const value = (urlOrUuid || '').trim();
  const match = value.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
  return match ? match[0] : value.replace(/^.*\/f\//, '');
}

export const SITE = {
  name: 'Bloom & Beyond Studio',
  tagline: 'Flowers that make every moment unforgettable.',
  url: 'https://bloomandbeyond.example',
  email: 'hello@bloomandbeyond.example',
  phone: '+1 (555) 010-2020',
  hours: 'Monday–Saturday, 9 AM – 6 PM',
  address: '123 Petal Lane, Garden City',
  attribution: {
    text: 'Powered by MyFormConnect',
    url: 'https://myformcapture.com',
  },
} as const;
