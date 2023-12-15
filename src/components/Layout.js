import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Home from './Home'
import Profile from './Profile'
import Campaigns from './Campaigns'
import Footer from './Footer'

import '../styles/gradient.css'

import { Routes, Route, Link } from "react-router-dom";


function Layout({children}) {
  return (
    <div className="app-container gradient-bg">
      <div className="gradient-container">
      {/* <div className="g1"></div>
          <div className="g2"></div>

          <div className="interactive"></div> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/campaigns" element={<Campaigns />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
