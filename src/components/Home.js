import React from 'react'
import  '../styles/Home.css'
import  '../styles/globals.css'
import HomeSwiper from './HomeSwiper'
import { Link } from "react-router-dom";

function Home() {
  return (
      <div className="" >
        <div className=" homePage">
          <div className="flex flex-row">
            <div className="flex flex-col homeBtn">
              <h1 className='text-6xl'>Start your campaign Now!</h1>
                <Link to="/campaigns" className='p-3'>
                  <button className='connectWalletBtn text-white'>
                    Start Campaign!
                  </button>
                </Link>
            </div>
          </div>
        </div>
        <div className="homeSwipeImg">
          <HomeSwiper />
          
        </div>
      </div>
  )
}

export default Home
