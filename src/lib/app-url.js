import { headers } from 'next/headers';

/** Base URL for server-side fetches to this app's own API (matches current host/port). */
export function getAppBaseUrl() {
  try {
    const headerList = headers();
    const host = headerList.get('x-forwarded-host') || headerList.get('host');
    if (host) {
      const proto = headerList.get('x-forwarded-proto') || (process.env.NODE_ENV === 'production' ? 'https' : 'http');
      return `${proto}://${host}`.replace(/\/$/, '');
    }
  } catch {
    /* headers() unavailable outside request */
  }

  if (process.env.BETTER_AUTH_URL) {
    return process.env.BETTER_AUTH_URL.replace(/\/$/, '');
  }

  return 'http://localhost:3000';
}
