import Hero from '../sections/Hero'
import Projects from '../sections/Projects'
import Banner from '../sections/Banner'
import References from '../sections/References'
import About from '../sections/About'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'
import Navbar from '../sections/Navbar'
// Previous import was from '@/components/BuyMeACoffee'
// This is the new, correct import path:
import BuyMeACoffee from '../sections/BuyMeACoffee' // <-- THE PATH IS UPDATED HERE

function Home() {
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
      <BuyMeACoffee /> {/* This part stays the same */}
    </div>
  )
}

export default Home