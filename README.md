### Deploying contract
  Deploying the contract using hardHat is simple. first we have the hardHat configuration file which has some simple logic to print the accounts and contains the configuration for the solidity version and the network we are using. In our case polygon.
  We use a dotenv file which is included in the git ignore. This file contains 2 important variables that are used to connect the applicaiton to the blockchain. The first is the api url which we use to access aclchemys node communication service. The second is the private key which holds the funds that we use to pay the gas fees for deploying. 

## Using Providers
  Within the deploy scripts you will notice the use of providers to connect to the blockchain. Without using providers you would have to create your own node and use jsonRPC, handle all your own errors, and deal with type conversions to accomplish this. We utilize ethers js as our provider and alchemy

### Running the app
  Requires latest stable version of node.js
  use npm or yarn to install dependencies
  ```
  npm install
  yarn install
  ```
  to run the deploy scripts enter the following command into the cli:
  ```
  npx hardhat compile
  ```
