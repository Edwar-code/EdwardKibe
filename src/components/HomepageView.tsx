'use client'; // This component MUST be a client component

import { useState } from 'react';
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

// Note: I have fixed the import paths to use your project's `@/` alias.
// This was the cause of the "Module not found" errors.

export default function HomepageView() {
  const [showThankYou, setShowThankYou] = useState(false);

  if (showThankYou) {
    return (
      <>
        <Navbar />
        <ThankYouSection onReturnHome={() => setShowThankYou(false)} />
        <Footer />
      </>
    );
  }

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
      {/*
        The BuyMeACoffee component is modified slightly to accept a prop.
        We will do that in the next step.
      */}
      <BuyMeACoffee onPaymentSuccess={() => setShowThankYou(true)} />
    </>
  );
}