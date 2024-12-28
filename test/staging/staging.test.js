const { deployments,getNamedAccounts,network } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");
let camp,crowd;
const { assert, expect } = require("chai");
    const minAmount=  ethers.parseEther("1");
    const maxAmount=  ethers.parseEther("2");
    const time= 20;

!developmentChains.includes(network.name)
?describe.skip
:describe("Staging Tests",function (){
    beforeEach(async function (){
        deployer=( await getNamedAccounts()).deployer;
        console.log(deployer);
                await deployments.fixture(["all"]);
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
    

                    const  stateOfCampaign= await crowd.getState(0);
                                expect(stateOfCampaign).to.equals(1);//1 means campaign closed 
                    
                                await expect(crowd.fundCampaign(0, { value: ethers.parseEther("1") }))
                                    .to.be.revertedWithCustomError(crowd, "CampaignClosed");
                })
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
                    
