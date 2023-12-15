// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Useful for debugging. Remove when deploying to a live network.
// import "hardhat/console.sol";

// Interfaces
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./LoyaltyToknX.sol";
import "./_interfaces.sol";

contract LoyaltyCampaign is AccessControl, ReentrancyGuard, ICampaignManager, IRewardManager {
    using SafeMath for uint256;

	LoyaltyToknX public loyaltyToken;
    IRewardManager public rewardManager;

    struct Campaign {
        string name;
        string description;
        uint256 rewardRate;
        uint256 totalRewards;
        uint256 startDate;
        uint256 endDate;
        string metadataCID;
        bool isActive;
    }
    mapping(uint256 => Campaign) public campaigns;
	mapping(uint256 => uint256) public totalRewardsClaimed;

	struct RewardClaim {
		uint256 amount;
		uint256 claimableAfter; // Block timestamp after which rewards can be claimed
		bool claimed;
	}
	mapping(uint256 => mapping(address => RewardClaim)) public rewardClaims;

	struct UserParticipation {
		uint256 pointsEarned;
		RewardClaim rewardClaim;
	}
	mapping(uint256 => mapping(address => UserParticipation)) public userParticipations;

	bytes32 public constant AFFILIATE_ROLE = keccak256("AFFILIATE_ROLE");
    uint256 public nextCampaignId;

	bytes32 public constant CAMPAIGN_MANAGER_ROLE = keccak256("CAMPAIGN_MANAGER_ROLE");
    bytes32 public constant REWARD_DISTRIBUTOR_ROLE = keccak256("REWARD_DISTRIBUTOR_ROLE");

    event CampaignCreated(
		uint256 indexed campaignId,
		address indexed creator, 
		string name, 
		uint256 totalRewards
	);
	event CampaignFundingAdded(
		uint256 indexed campaignId,
		uint256 additionalFunding,
		uint256 additionalRewards
	);
    event RewardsDistributed(
		uint256 indexed campaignId, 
		address indexed user, 
		uint256 amount,
		uint256 points
	);
	event RewardsClaimed(
		uint256 indexed campaignId,
		address indexed user,
		uint256 amount
	);

    constructor(LoyaltyToknX _loyaltyToken) {
        loyaltyToken = _loyaltyToken;
		nextCampaignId = 0;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
		_setupRole(CAMPAIGN_MANAGER_ROLE, msg.sender);
		_setupRole(REWARD_DISTRIBUTOR_ROLE, msg.sender);
    }

	// Threshold for minimum funding
	uint256 public constant MIN_FUNDING = 10 * (10 ** 18); // 10 LTX

    function createCampaign(
        string memory name,
        string memory description,
		uint256 initialFunding,
        uint256 rewardRate,
        uint256 startDate,
        uint256 endDate,
        string memory metadataCID
    ) external override onlyRole(DEFAULT_ADMIN_ROLE) payable nonReentrant {
		// Validate inputs
		require(msg.value == initialFunding, "Funding amount must match the sent amount");
        require(bytes(name).length > 0, "Campaign name is required");
		require(bytes(description).length > 0, "Campaign description is required");
		require(rewardRate > 0, "Reward rate must be greater than zero");
        require(initialFunding >= MIN_FUNDING, "Total rewards below minimum funding threshold");
        require(startDate < endDate, "Start date must be before end date");
        //require(startDate > block.timestamp, "Start date must be in the future");
        require(endDate > block.timestamp, "End date must be in the future");
		require(bytes(metadataCID).length > 0, "Metadata CID is required");
		
		// Calculate rewards based on reward rate
		uint256 totalRewards = initialFunding.mul(rewardRate).div(100);

        Campaign storage newCampaign = campaigns[nextCampaignId];
        newCampaign.name = name;
        newCampaign.description = description;
        newCampaign.rewardRate = rewardRate;
        newCampaign.totalRewards = totalRewards;
        newCampaign.startDate = startDate;
        newCampaign.endDate = endDate;
        newCampaign.metadataCID = metadataCID;
        newCampaign.isActive = true;

		// For simplicity the contract is designed to hold the funds
        emit CampaignCreated(nextCampaignId, msg.sender, name, totalRewards);
		nextCampaignId = nextCampaignId.add(1);
    }

	function addCampaignFunding(
		uint256 campaignId, 
		uint256 funding) external override onlyRole(DEFAULT_ADMIN_ROLE) payable nonReentrant {
		require(campaigns[campaignId].isActive, "Campaign is not active");
		require(msg.value == funding, "Funding amount must match the sent amount");

		uint256 additionalRewards = funding.mul(campaigns[campaignId].rewardRate).div(100);
    	campaigns[campaignId].totalRewards = campaigns[campaignId].totalRewards.add(additionalRewards);

    	emit CampaignFundingAdded(campaignId, funding, additionalRewards);
}

	function getCampaignDetails(uint256 campaignId) external view override returns (
		string memory name, 
		string memory description, 
		uint256 rewardRate, 
		uint256 totalRewards,
		uint256 startDate,
		uint256 endDate,
		string memory metadataCID,
		bool isActive
	) {
		require(campaignId < nextCampaignId, "Campaign does not exist");

		Campaign storage campaign = campaigns[campaignId];
		return (
			campaign.name,
			campaign.description,
			campaign.rewardRate,
			campaign.totalRewards,
			campaign.startDate,
			campaign.endDate,
			campaign.metadataCID,
			campaign.isActive
		);
	}
	
    function distributeRewards(
		uint256 campaignId,
		address user, 
		uint256 amount 
		) public onlyRole(REWARD_DISTRIBUTOR_ROLE) nonReentrant {
        require(campaigns[campaignId].isActive, "Campaign is not active");
        require(block.timestamp >= campaigns[campaignId].startDate && block.timestamp <= campaigns[campaignId].endDate, "Campaign not in active period");
        require(campaigns[campaignId].totalRewards >= amount, "Insufficient rewards in campaign");
        require(user != address(0), "Invalid user address");

        // Update the user's reward and points
        UserParticipation storage participation = userParticipations[campaignId][user];
        participation.rewardClaim.amount = participation.rewardClaim.amount.add(amount);
        participation.pointsEarned = participation.pointsEarned.add(10); // Fixed 10 pts per distribution

        // Set claimableAfter timestamp for the user's rewards, if not already set
        if (participation.rewardClaim.claimableAfter == 0) {
            participation.rewardClaim.claimableAfter = campaigns[campaignId].startDate.add(7 days);
        }

        // Update the campaign's total rewards
        campaigns[campaignId].totalRewards = campaigns[campaignId].totalRewards.sub(amount);

        emit RewardsDistributed(campaignId, user, amount, 10);
    }

	// Claiming logic 'Time Vesting' and affiliate roles
	function claimRewards(uint256 campaignId, address user) external override nonReentrant {
      	require(hasRole(AFFILIATE_ROLE, user), "Affiliates only");
        require(campaigns[campaignId].isActive, "Campaign is not active");
        require(block.timestamp <= campaigns[campaignId].endDate, "Campaign has expired");
        
        UserParticipation storage participation = userParticipations[campaignId][user];
        require(participation.pointsEarned >= 100, "Minimum participation criteria not met");
        require(block.timestamp >= participation.rewardClaim.claimableAfter, "Rewards not yet claimable");
        require(!participation.rewardClaim.claimed, "Rewards already claimed");
        require(participation.rewardClaim.amount > 0, "No rewards to claim");

        uint256 rewardAmount = participation.rewardClaim.amount;
        participation.rewardClaim.claimed = true;

        // Transfer the reward tokens to the user
        require(loyaltyToken.transfer(user, rewardAmount), "Token transfer failed");

		// Update the total rewards claimed for the campaign
		totalRewardsClaimed[campaignId] = totalRewardsClaimed[campaignId].add(rewardAmount);

        emit RewardsClaimed(campaignId, user, rewardAmount);
    }

	function getTotalRewardsClaimed(uint256 campaignId) external view returns (uint256) {
    	require(campaignId < nextCampaignId, "Campaign does not exist");
		return totalRewardsClaimed[campaignId];
	}

	function getTotalRewardsAvailable(uint256 campaignId) external view returns (uint256) {
		require(campaignId < nextCampaignId, "Campaign does not exist");

    	// Simply return the totalRewards from the campaign struct
    	return campaigns[campaignId].totalRewards;
	}

    // ... [other functions and contract code] ...
}
