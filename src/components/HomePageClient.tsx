'use client'; // This component handles all the interactivity

import { useState } from 'react';

// === CORRECTED IMPORT PATHS START HERE ===
// Instead of '../sections/...', we use '@/src/app/sections/...'
// Or, if your alias is configured for `src`, it would be '@/app/sections/...'
// Let's use the most explicit path to be safe.
import Hero from '@/src/app/sections/Hero';
import Projects from '@/src/app/sections/Projects';
import Banner from '@/src/app/sections/Banner';
import References from '@/src/app/sections/References';
import About from '@/src/app/sections/About';
import Contact from '@/src/app/sections/Contact';
import Footer from '@/src/app/sections/Footer';
import Navbar from '@/src/app/sections/Navbar';
import BuyMeACoffee from '@/src/app/sections/BuyMeACoffee';
import ThankYouSection from '@/src/app/sections/ThankYouSection';
// === CORRECTED IMPORT PATHS END HERE ===


// This new component contains all the logic that requires 'use client'
export default function HomePageClient() {
  // State to track whether to show the thank you message
  const [showThankYou, setShowThankYou] = useState(false);

  // Conditional rendering based on the state
  if (showThankYou) {
    return (
      <>
        <Navbar />
        {/* Pass the function to allow the user to return to the main view */}
        <ThankYouSection onReturnHome={() => setShowThankYou(false)} />
        <Footer />
      </>
    );
  }

  // Default view: Show the normal homepage content
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <Banner />
      <References />
      <About />
      <Contact />
      <Footer />
      {/* Pass the function to BuyMeACoffee so it can update our state on success */}
      <BuyMeACoffee onPaymentSuccess={() => setShowThankYou(true)} />
    </>
  );
}