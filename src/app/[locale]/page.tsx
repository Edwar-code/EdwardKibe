// This page is a Server Component again. No 'use client', no state.
// This fixes the 404 error permanently.

// === THE ONLY CHANGE IS THIS ONE LINE ===
import HomepageView from '@/components/HomepageView';

export default function Home() {
  // All it does is render the client component that holds all our logic.
  return <HomepageView />;
}