import React, { useState } from 'react';
import { ethers } from 'ethers';
import Greeter from '/artifacts/contracts/Greeter.sol/Greeter.json'

const greeterAddress = process.env.CONTRACT_ADDRESS

function App() {
  const [greeting, setGreetingValue ] = useState("");
  
  // this function calls the greeting in the smart contract
  async function fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      // this const will call the wallet in the browser 
      const provider = ethers.providers.Web3Provider(window.ethereum)
      // this creates an instance of the contract, it needs the address, abi, and provider
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
  }
}

  return (

      <div></div>
     );
}

export default App;
