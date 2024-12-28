//create campaign
//fund campaign

const { getNamedAccounts, deployments, ethers } = require("hardhat")
const { assert, expect } = require("chai");

describe("Campaigns unit tests",function (){
    let camp,crowd;
    const minAmount=  ethers.parseEther("1");
    const maxAmount=  ethers.parseEther("2");
    const time= 20;
      beforeEach(async function (){
        deployer=( await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]);
        //console.log(deployer);
        //yha pe deploy nahi karna yha pe contract uthana hai
        camp=await deployments.get("CrowdFund");
        crowd=await ethers.getContractAt(
            "CrowdFund",
            camp.address
        )
    })
    describe("create campaign",function (){
        it("creates a campaign",async function (){
            //console.log(crowd);
            const create= await crowd.createCampaign(minAmount,maxAmount,time);
            await expect(create).to.emit(
            crowd,
            "campaignCreated"
         )
        })
                it("checks all conditions of fund are fulfilled ",async function(){
                    const create= await crowd.createCampaign(minAmount,maxAmount,time);
                    await expect(create).to.emit(
                    crowd,
                    "campaignCreated"
                )
                await expect(crowd.fundCampaign(0, { value: ethers.parseEther("0.009") }))
                .to.be.revertedWithCustomError(crowd, "NotEnoughETHEntered");
                
                //more than required eth donated
                await expect(crowd.fundCampaign(0,{value:ethers.parseEther("3")}))
                .to.emit(
                    crowd,
                    "RemainingETHSent"
                )
                  //get total funds
                const total=await crowd.getTotalFunds(0);
                await assert.equal(total,BigInt("2000000000000000000"));

          //should revert when donaitng on closed campaign
            const  stateOfCampaign= await crowd.getState(0);
            expect(stateOfCampaign).to.equals(1);//1 means campaign closed 

            await expect(crowd.fundCampaign(0, { value: ethers.parseEther("1") }))
                .to.be.revertedWithCustomError(crowd, "CampaignClosed");
        })
        it("does basic funding",async function (){
            const create= await crowd.createCampaign(minAmount,maxAmount,time);
            await expect(create).to.emit(
            crowd,
            "campaignCreated"
        )
             await expect(crowd.fundCampaign(0,{value:ethers.parseEther("1.5")}))
             .to.be.emit(
                crowd,
                "CampaignFunded"
             )           
             const total=await crowd.getTotalFunds(0);
             await assert.equal(total,"1500000000000000000");
             const contributors = await crowd.getContributors(0);
             expect(contributors).to.include(deployer);
        })
    })
})