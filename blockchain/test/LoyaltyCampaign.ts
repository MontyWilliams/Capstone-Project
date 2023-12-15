const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LoyaltyCampaign Contract", function () {
    let LoyaltyCampaign, LoyaltyToknX;
    let campaign, loyaltyToken;
    let owner, addr1, addr2;
    let campaignId;

    beforeEach(async function () {
        LoyaltyToknX = await ethers.getContractFactory("LoyaltyToknX");
        loyaltyToken = await LoyaltyToknX.deploy();
        await loyaltyToken.deployed();

        LoyaltyCampaign = await ethers.getContractFactory("LoyaltyCampaign");
        [owner, addr1, addr2] = await ethers.getSigners();
        campaign = await LoyaltyCampaign.deploy(loyaltyToken.address);
        await campaign.deployed();

        const now = Math.floor(Date.now() / 1000);
        const startDate = now - 300; // Start date 5 minutes in the past
        const endDate = now + (3 * 86400); // End date 3 days from now
        // Create a campaign for testing
        const initialFunding = ethers.utils.parseEther("10"); // 10 ETH as initial funding
        const tx = await campaign.createCampaign(
            "Test Campaign",
            "Description",
            initialFunding,
            50, // 50% reward rate
            startDate, // Start date 5 minutes from now
            endDate, // End date 1 day from now
            "CID",
            { value: initialFunding } // Send matching Ether value
        );
        const affiliateRole = await campaign.AFFILIATE_ROLE();
        await campaign.grantRole(affiliateRole, addr1.address); // Grant affiliate role to addr1
        const receipt = await tx.wait();
        const event = receipt.events.find(x => x.event === "CampaignCreated");
        campaignId = event.args.campaignId;
    });

    describe("Campaign Creation", function () {
        it("Should allow the owner to create a new campaign", async function () {
            const campaignData = await campaign.campaigns(campaignId);
            expect(campaignData.name).to.equal("Test Campaign");
            expect(campaignData.totalRewards).to.equal(ethers.utils.parseEther("5")); // 50% of 10 ETH
        });
    });

    describe("Funding a Campaign", function () {
        it("Should allow the owner to fund a campaign", async function () {
            await campaign.addCampaignFunding(campaignId, ethers.utils.parseEther("5"), { value: ethers.utils.parseEther("5") });
            const campaignData = await campaign.campaigns(campaignId);
            expect(campaignData.totalRewards).to.equal(ethers.utils.parseEther("7.5")); // Additional 50% of 5 ETH
        });
    });

    describe("Reward Distribution", function () {
        it("Should distribute rewards to a user", async function () {
            await campaign.distributeRewards(campaignId, addr1.address, ethers.utils.parseEther("1"));
            const userParticipation = await campaign.userParticipations(campaignId, addr1.address);
            expect(userParticipation.rewardClaim.amount).to.equal(ethers.utils.parseEther("1"));
            expect(userParticipation.pointsEarned).to.equal(10);
        });
    });

    describe("Reward Claiming", function () {
        it("Should allow a user to claim their rewards", async function () {
            // Connect the campaign contract to the owner signer for distributing rewards
            const campaignAsOwner = campaign.connect(owner);
    
            // Distribute rewards to the user multiple times to accumulate enough points
            const rewardAmount = ethers.utils.parseEther("0.1"); // Smaller reward amount for multiple distributions
            for (let i = 0; i < 10; i++) { // Distribute 10 times to accumulate 100 points
                await campaignAsOwner.distributeRewards(campaignId, addr1.address, rewardAmount);
            }
            // Manipulate time: Advance the blockchain's timestamp
            // Assuming claimableAfter is set to 7 days after the start date
            await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60]); // Advance time by 7 days
            await ethers.provider.send("evm_mine"); // Mine a new block
    
            // Connect the campaign contract to addr1 signer for claiming rewards
            const campaignAsUser = campaign.connect(addr1);
    
            // Now, attempt to claim rewards for addr1
            await campaignAsUser.claimRewards(campaignId, addr1.address);
    
            // Retrieve updated user participation data
            const userParticipation = await campaign.userParticipations(campaignId, addr1.address);
            expect(userParticipation.rewardClaim.claimed).to.be.true;
        });
    });
     
    // Additional tests for other functionalities like campaign updates, role management, etc.
});
