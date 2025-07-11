// This file is now a simple Server Component again.
// No 'use client', no 'useState'.
// This makes your internationalization and routing work correctly.

import HomePageClient from '../../components/HomePageClient'; // <-- Corrected import path

// The Home function is now extremely simple.
// Its only job is to render the interactive client component.
function Home() {
  return <HomePageClient />;
}

export default Home;