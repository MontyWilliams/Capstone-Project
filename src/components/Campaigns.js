import React from 'react'
import campaignData from '../utils/campaigns.json'
import { Link } from "react-router-dom";


function Campaigns() {
  return (
    <div className=''>
    <div className="">
      <h1 className='text-6xl pl-5 '>Campaigns</h1>
      <div className='p-8'>
        <h2 className='text-2xl'>Ready To Create your Campaign?</h2>
        <Link to="/createCampaign" className=''>
          <button className='connectWalletBtn text-cyan-50'>
            Click Here!
          </button>
        </Link>
      </div>
    </div>
      <div className="">
      <div className="p-8 flex flex-wrap justify-center gap-[16px] pb-[100px]">
  {campaignData.campaigns.map((campaign) => (
    <div key={campaign.Id} className="p-8 bg-white shadow-lg rounded-lg lg:p-8 pb-12  md:w-1/2 lg:w-1/3 ">
      <div className="text-black relative overflow-hidden shadow-2xl h-full mb-6">
        <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-green-600 text-3xl font-semibold">
          {campaign.name}
        </h1>
        <p className="text-center text-lg text-gray-800 font-normal px-4 lg:px-20 mb-8">
          {campaign.description}
        </p>
        <div className="flex flex-col justify-center  items-center">Total Rewards Available: {campaign.totalRewards}</div>
        <div className="flex flex-col justify-center  items-center">
          <p className="text-lg">Start date: {campaign.startDate}</p>
          <p className="text-lg">End date: {campaign.endDate}</p>
        </div>
        <Link className='flex center justify-center  pl-[50%] pt-[20%]' to='/farmers'>
          <button className='campaignBtn text-white bg-gradient-to-t from-green-800 to-transparent'>
            Visit Campaign
          </button>
        </Link>
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
  )
}

export default Campaigns
