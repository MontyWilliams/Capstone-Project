// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IRewardManager {
    function distributeRewards(uint256 campaignId, address user, uint256 amount) external;
    function claimRewards(uint256 campaignId, address user) external;
    function getTotalRewardsClaimed(uint256 campaignId) external view returns (uint256);
    function getTotalRewardsAvailable(uint256 campaignId) external view returns (uint256);

    // Additional functions can be added as needed
}

interface ICampaignManager {
    // Function to create a new campaign
    function createCampaign(
        string memory name,
        string memory description,
        uint256 initialFunding,
        uint256 rewardRate,
        uint256 startDate,
        uint256 endDate,
        string memory metadataCID
    ) payable external;

    // Function to dynamically replenish campaign funding
    function addCampaignFunding(uint256 campaignId, uint256 amount) payable external;

    // Function to get details of a specific campaign
    function getCampaignDetails(uint256 campaignId) external view returns (
        string memory name,
        string memory description,
        uint256 rewardRate,
        uint256 totalRewards,
        uint256 startDate,
        uint256 endDate,
        string memory metadataCID,
        bool isActive
    );
    // Additional functions can be added as needed
}
