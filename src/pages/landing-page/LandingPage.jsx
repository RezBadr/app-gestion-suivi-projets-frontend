import React from 'react'
import AppAppBar from './components/AppAppBar'
import SwipeableTextMobileStepper from './components/Home';
import Services from './components/Services';
import Contact from './components/Contact';
import About from './components/About';
import Footer from './components/Footer';

export const LandingPage = () => {
  return (
    <div>
      <AppAppBar/>
      <SwipeableTextMobileStepper />
      <About />
      <Services />
      <Contact />
      <Footer />
    </div>
  )
}
export default LandingPage;