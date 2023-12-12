import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Footer from './Footer'
import Home from './Home'
import '../styles/gradient.css'

function Layout({children}) {
  return (
    <div className="app-container">
      <Navbar />
      <Home />
      <Hero />
      <Footer />
    </div>
  )
}

export default Layout
