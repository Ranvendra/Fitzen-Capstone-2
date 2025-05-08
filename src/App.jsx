import React from 'react'
import Navbar from './components/Navbar'
import HeroImages from './components/HeroImages'
import StatsSection from './components/StatsSection'
import WhatWeDo from './components/WhatWeDo'
import Experience from './components/Experience'
import NewsletterSection from './components/NewsLetterSection'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <Navbar />
      <HeroImages/>
      <WhatWeDo/>
      <Experience/>
      <StatsSection/>
      <NewsletterSection/>
      <Footer/>
    </div>
  )
}

export default App