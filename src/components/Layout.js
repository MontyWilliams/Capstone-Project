import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Home from './Home'
import '../styles/gradient.css'
import { Routes, Route, Link } from "react-router-dom";


function Layout({children}) {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hero" element={<Hero />} />
      </Routes>
    </div>
  )
}

export default Layout
