const hre = require("hardhat");
const ContractJson = require("../artifacts/contracts/Greeter.sol/Greeter.json")

// This is tha binary interface which allows the front end to used all the functions within the contract
const abi = ContractJson.abi;

async function main() {

  // use ehers to get the provider that will act as a bridge between our application and the contract which exists on the blockchain
  const alchemy = new hre.ethers.providers.AlchemyProvider(
    'maticmum',
    process.env.ALCHEMY_API_KEY
  );
  // the private key is used so that ethers can use our wallet to pay for the transactions
  const userWallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, alchemy);

  // ethers uses the contract address and the abi to understand where the contract is and what functiokns it contains 
  const Greeter = new hre.ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    abi,
    userWallet
  )

  // this script will make to write transactions to modify the stake of the blockchain via our smart contract
  const setTx1 = await Greeter.setGreeting("web3 is easy bro");
  await setTx1.wait();
  console.log("before: " + await Greeter.greet());

  const setTx2 = await Greeter.setGreeting("web3 is even easier after completing a fu*****ng  2 year course!");
  await setTx2.wait();
  console.log("after: " + await Greeter.greet())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
