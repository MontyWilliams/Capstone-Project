import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Footer from './Footer'
import Home from './Home'

function Layout({children}) {
  return (
    <div>
      <Navbar />
      <Home />
      <Hero />
      <Footer />
    </div>
  )
}

export default Layout
