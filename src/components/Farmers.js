import React from 'react'
import campaignData from '../utils/campaigns.json'
import '../styles/Home.css'

function Farmers() {
  const Farmer = campaignData.campaigns[0];

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white text-black rounded-lg shadow-lg p-6">
        <h1 className="text-3xl  font-bold mb-4 text-center">{Farmer.name}</h1>
        <img src={Farmer.img} alt={Farmer.name} className="w-[400px] h-[400px] flex justify-center center items-center rounded-md mb-4 j" />
        <p className="text-lg text-gray-700 mb-3"><strong>Description:</strong> {Farmer.description}</p>
        <p className="text-md mb-2"><strong>Reward Rate:</strong> {Farmer.rewardRate}%</p>
        <p className="text-md mb-2"><strong>Total Rewards:</strong> {Farmer.totalRewards}</p>
        <p className="text-md mb-2"><strong>Start Date:</strong> {Farmer.startDate}</p>
        <p className="text-md mb-2"><strong>End Date:</strong> {Farmer.endDate}</p>
        <p className="text-md mb-2"><strong>Metadata CID:</strong> {Farmer.metadataCID}</p>
        <p className={`text-md font-bold mb-2 ${Farmer.isActive ? 'text-green-500' : 'text-red-500'}`}>
          <strong>Status:</strong> {Farmer.isActive ? 'Active' : 'Inactive'}
        </p>
      </div>
    </div>
  )
}

export default Farmers
