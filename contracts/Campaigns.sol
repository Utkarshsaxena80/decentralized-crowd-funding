// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract CrowdFund {
    uint256 public campaignId = 0;

    enum State {
        OPEN,
        CLOSED
    }

    struct Campaign {
        uint256 i_minAmount;
        uint256 i_maxAmount;
        uint256 i_maxTime;
        address campaignOwner;
        uint256 campaignId;
        address[] Contributors;
        State state;
        uint256 totalFund;
    }

    Campaign[] private campaign;

    event CampaignFunded(address indexed contributor, uint256 amount);
    event RemainingETHSent(address indexed recipient, uint256 amount);
    event campaignCreated(uint256 indexed campaignId);

    error ErrorInSendingETH();
    error NotEnoughETHEntered();
    error CampaignClosed();
    error InvalidCampaign();

    function createCampaign(
        uint256 _minAmount,
        uint256 _maxAmount,
        uint256 _maxTime
    ) public {
        campaign.push(
            Campaign({
                i_minAmount: _minAmount,
                i_maxAmount: _maxAmount,
                i_maxTime: _maxTime,
                campaignOwner: msg.sender,
                campaignId: campaignId,
                Contributors: new address[](0),
                state: State.OPEN,
                totalFund: 0
            })
        );
        campaignId++;
        emit campaignCreated(campaignId);
    }

    function fundCampaign(uint256 cid) public payable {
        require(cid < campaign.length, "Invalid campaign ID");
        Campaign storage selectedCampaign = campaign[cid];

        if (selectedCampaign.state != State.OPEN) {
            revert CampaignClosed();
        }

        uint256 donatedETH = msg.value;

        if (donatedETH < selectedCampaign.i_minAmount) {
            revert NotEnoughETHEntered();
        }

        if (selectedCampaign.totalFund + donatedETH > selectedCampaign.i_maxAmount) {
            uint256 acceptedETH = selectedCampaign.i_maxAmount - selectedCampaign.totalFund;
            uint256 willReturnETH = donatedETH - acceptedETH;

            selectedCampaign.totalFund += acceptedETH;
            selectedCampaign.state = State.CLOSED;

            (bool success, ) = msg.sender.call{value: willReturnETH}("");
            if (!success) revert ErrorInSendingETH();

            emit RemainingETHSent(msg.sender, willReturnETH);
            
        } else {
            selectedCampaign.totalFund += donatedETH;
            selectedCampaign.Contributors.push(msg.sender);

            (bool success, ) = selectedCampaign.campaignOwner.call{value: donatedETH}("");
            if (!success) revert ErrorInSendingETH();

            emit CampaignFunded(msg.sender, donatedETH);
        }
    }

    function getContributors(uint256 cid) public view returns (address[] memory) {
        require(cid < campaign.length, "Invalid campaign ID");
        return campaign[cid].Contributors;
    }

    function getTotalFunds(uint256 cid) public view returns (uint256) {
        require(cid < campaign.length, "Invalid campaign ID");
        return campaign[cid].totalFund;
    }

    function getCampaignOwner(uint256 cid) public view returns (address) {
        require(cid < campaign.length, "Invalid campaign ID");
        return campaign[cid].campaignOwner;
    }

    function getState(uint256 cid) public view returns (State) {
        require(cid < campaign.length, "Invalid campaign ID");
        return campaign[cid].state;
    }
}
