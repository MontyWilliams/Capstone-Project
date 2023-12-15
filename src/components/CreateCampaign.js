
import React, { useState } from 'react';

const CreateCampaign = () => {
  const [campaign, setCampaign] = useState({
    name: '',
    description: '',
    rewardRate: '',
    totalRewards: '',
    startDate: '',
    endDate: '',
    metadataCID: '',
  });

  const handleChange = (e) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(campaign);
  };

  return (
    <div className="mx-auto pl-80 pr-80 pb-40">
      <div className="bg-white rounded-lg shadow-lg p-6 ">
        <h1 className="text-3xl font-bold text-center text-black">Create New Campaign</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 ">
            <label className=" text-sm font-bold mb-2 text-black" htmlFor="name">
              Campaign Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Enter campaign name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              placeholder="Enter campaign description"
              rows="3"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rewardRate">
              Reward Rate (%)
            </label>
            <input
              type="number"
              name="rewardRate"
              onChange={handleChange}
              placeholder="Enter reward rate"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalRewards">
              Total Rewards
            </label>
            <input
              type="number"
              name="totalRewards"
              onChange={handleChange}
              placeholder="Enter total rewards"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Campaign
            </button>
          </div>
        </form>
      </div>
      </div>
  )
}
export default CreateCampaign;
