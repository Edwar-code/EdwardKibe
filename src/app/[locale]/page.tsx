'use client'; // <-- This page must be a client component to use state

import { useState } from 'react'; // <-- Import useState
import Hero from '../sections/Hero'
import Projects from '../sections/Projects'
import Banner from '../sections/Banner'
import References from '../sections/References'
import About from '../sections/About'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'
import Navbar from '../sections/Navbar'
import BuyMeACoffee from '../sections/BuyMeACoffee'
import ThankYouSection from '../sections/ThankYouSection'; // <-- Import the new section

function Home() {
  // Add a state variable to track whether to show the thank you message
  const [showThankYou, setShowThankYou] = useState(false);

  // If showThankYou is true, we ONLY show the Navbar and the ThankYouSection.
  if (showThankYou) {
    return (
      <div>
        <Navbar />
        {/* Pass a function to the component so it knows how to go back */}
        <ThankYouSection onReturnHome={() => setShowThankYou(false)} />
        <Footer />
      </div>
    );
  }

  // Otherwise, we show the normal homepage content.
  return (
    <div>
      <Navbar />
      <Hero />
      <Projects />
      <Banner />
      <References />
      <About />
      <Contact />
      <Footer />
      {/* Pass the function to BuyMeACoffee so it can update our state */}
      <BuyMeACoffee onPaymentSuccess={() => setShowThankYou(true)} />
    </div>
  )
}

export default Home;