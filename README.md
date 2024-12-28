# Decentralized CrowdFunding

This project is a decentralized crowdfunding platform where users can create campaigns, contribute funds, and withdraw collected funds using blockchain technology. The backend is fully implemented using Hardhat and deployed on the Sepolia test network. The frontend is under development.

## Features

- **Campaign Creation:** Users can create new crowdfunding campaigns with a funding goal and deadline.
- **Contribute to Campaigns:** Supporters can contribute funds to active campaigns.
- **Withdraw Funds:** Campaign creators can withdraw collected funds once the goal is reached.
- **Refunds:** Supporters can get refunds if the campaign fails to meet its goal by the deadline.

## Tech Stack

### Backend
- **Solidity:** Smart contracts for handling crowdfunding logic.
- **Hardhat:** Development environment and testing framework.
- **Sepolia Network:** Ethereum test network for deployment.

### Frontend (In Progress)
- **React.js:** User interface for interacting with the platform.
- **Ethers.js:** Library for connecting the frontend to the blockchain.

## Installation

### Prerequisites
- Node.js
- npm or yarn
- Hardhat

### Clone the Repository
```bash
git clone https://github.com/utkarshsaxena851/decentralized-crowdfunding.git
cd decentralized-crowdfunding
```

### Install Dependencies
```bash
npm install
```

### Configure Environment Variables
Create a `.env` file in the root directory and add the following:

```
PRIVATE_KEY=<Your_Wallet_Private_Key>
SEPOLIA_RPC_URL=<Your_Infura_or_Alchemy_Sepolia_RPC_URL>
```

### Compile Smart Contracts
```bash
npx hardhat compile
```

### Deploy Smart Contracts
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## Usage

### Interacting with the Backend

1. **Deploy Contracts:** Ensure the contracts are deployed to the Sepolia network.
2. **Update Frontend:** Copy the contract addresses and ABIs to the frontend directory (if applicable).

### Testing
Run the unit tests for the smart contracts:
```bash
npx hardhat test
```

## Frontend Development
The frontend is being developed using React.js and Ethers.js. You can contribute to the frontend by cloning the repository and working on the `/frontend` directory.

### Start Frontend Development Server
```bash
cd frontend
npm install
npm start
```

## Contributing
Feel free to fork this repository and create pull requests for improvements or new features.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

### Contact
For any queries or issues, please contact [utkarshsaxena851@gmail.com].
