'use client'; // This component handles all the interactivity

import { useState } from 'react';
import Hero from '../sections/Hero';
import Projects from '../sections/Projects';
import Banner from '../sections/Banner';
import References from '../sections/References';
import About from '../sections/About';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import Navbar from '../sections/Navbar';
import BuyMeACoffee from '../sections/BuyMeACoffee';
import ThankYouSection from '../sections/ThankYouSection';

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