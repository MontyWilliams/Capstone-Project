const hre = require("hardhat");
const ContractJson = require("../artifacts/contracts/Greeter.sol/Greeter.json")

// This is tha binary interface which allows the front end to used all the functions within the contract
const abi = ContractJson.abi;

async function main() {

  const alchemy = new hre.ethers.providers.AlchemyProvider(
    'maticmum',
    process.env.ALCHEMY_API_KEY
  );
  
  const userWallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, alchemy);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
