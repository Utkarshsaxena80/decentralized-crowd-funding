const {deployments,getNamedAccounts, network}=require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");

module.exports=async function (){
const {deploy,log}= deployments;
const {deployer}=  await getNamedAccounts();
const chainId= network.config.chainId;
log(`Deployer address: ${deployer}`);

log(chainId);
try{
const crowdFund=await deploy("CrowdFund",{
            from:deployer,
            args:[],
            log:true,
            waitForConfirmations:network.config.blockConfirmations || 1,
        })
    
}catch(error){
    console.error(error);
}
}
module.exports.tags=["all"]