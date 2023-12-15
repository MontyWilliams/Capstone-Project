import React from 'react'
// import campaigns from '../utils/campaigns.json'
import { Link } from "react-router-dom";
import SwiperComp from './Swiper';


function Profile() {
  return (
    <div className=''>
    <div className="">
      <h1 className='text-6xl pl-5 '>Your Profile</h1>
      <div className='p-8'>
        <h2 className='text-2xl'>Create a campaign.</h2>
        <Link to="/createCampaign" className=''>
          <button className='connectWalletBtn text-cyan-50'>
            Click Here!
          </button>
        </Link>
        <h2 className='text-2xl'>Join A campaign.</h2>
        <Link to="/campaigns" className=''>
          <button className='connectWalletBtn text-cyan-50'>
            Click Here!
          </button>
        </Link>
      </div>
    </div>
      <div className="profileModal">
      <div className="">
    <div className="">
      <h1 className='text-4xl p-5'>You currently arent in any campaigns</h1>
      <SwiperComp />
    </div>
</div>
      </div>
    </div>
  )
}

export default Profile
