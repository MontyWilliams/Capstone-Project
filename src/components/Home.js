import React from 'react'
import  '../styles/Home.css'
import  '../styles/globals.css'
import HomeSwiper from './HomeSwiper'


function Home() {
  return (
      <div className="" >
        <div className=" homePage">
          <div className="flex flex-row">
            <div className="flex flex-col homeBtn">
              <h1 className='text-6xl'>Start your campaign Now!</h1>
              <button className='pt-3 navbutton '>Start Campaign!</button>
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
