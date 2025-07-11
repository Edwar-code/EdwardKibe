// This page is a Server Component again. No 'use client', no state.
// This fixes the 404 error permanently.
import HomepageView from '../../components/HomePageView';

export default function Home() {
  // All it does is render the client component that holds all our logic.
  return <HomepageView />;
}