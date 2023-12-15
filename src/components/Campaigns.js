import React from 'react'
import campaignData from '../utils/campaigns.json'

function Campaigns() {
  return (
    <div className=''>
      <h1 className='text-6xl pl-5'>Campaigns</h1>
      <div className="">
      <div className="p-8 flex flex-wrap justify-center gap-[16px] pb-[100px]">
  {campaignData.campaigns.map((campaign) => (
    <div key={campaign.Id} className="p-8 bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8 w-full md:w-1/2 lg:w-1/3">
      <div className="text-black relative overflow-hidden shadow-md pb-80 mb-6">
        <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-green-600 text-3xl font-semibold">
          {campaign.name}
        </h1>
        <p className="text-center text-lg text-gray-800 font-normal px-4 lg:px-20 mb-8">
          {campaign.description}
        </p>
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
  )
}

export default Campaigns
