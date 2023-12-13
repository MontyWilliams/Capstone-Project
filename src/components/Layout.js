import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Home from './Home'
import Profile from './Profile'
import Campaigns from './Campaigns'

import '../styles/gradient.css'

import { Routes, Route, Link } from "react-router-dom";


function Layout({children}) {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/campaigns" element={<Campaigns />} />
      </Routes>
    </div>
  )
}

export default Layout
