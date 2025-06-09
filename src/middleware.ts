import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing'; // Your import remains the same

// Apply your existing routing configuration
export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  // The key change is here: We ignore API routes and static files.
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Match all root locales
    '/(de|en|es|fr|ja|ko|ru)'
  ]
};