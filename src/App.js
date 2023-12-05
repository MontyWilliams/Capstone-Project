import React, { useState } from 'react';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'


const greeterAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

function App() {
  const [greeting, setGreetingValue ] = useState("");
  
  // this function calls the greeting in the smart contract
  async function fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      // this const will call the wallet in the browser 
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // this creates an instance of the contract, it needs the address, abi, and provider
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        setGreetingValue(data)
        console.log('data: ', data)
      } catch (err) {
        console.log('error: ', err)
      }
    }
  }

  async function setGreeting(value) {
    if (!value) return;
    if (!typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(value)
      await transaction.wait()
      fetchGreeting()
    }
  }
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await setGreeting(event.target.greetingInput.value)
    setGreeting(event.target.greetingInput.value)
    event.target.greetingInput.value = ""
  }


  return (
      <div>
        <div className="w-full max-w-lg container">
          <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
            <div className="text-gray-6000 font-bold text-lg mb-2">
              Simple Dapp
            </div>
            <div className="w-full border-4 p-2 mb-4 rounded border-gray-400">
              <div className="text-gray-600 font-bold text-md mb-2">
                Fetch Greeting from contract
              </div>
              <div className="flex">
                <button
                  className='bg-blue-500 hover:bg-blue-800 text-white'
                  onClick={() => fetchGreeting()}
                >Click</button>
              </div>
            </div>
            <div className="w-full border-4 p-2 mb-4 rounded border-gray-400">
              <div className="text-gray-600 font-bold text-md mb-2">
                Set Greeting
              </div>
              <form
                className='flex items-center justify-between'
                onSubmit={event => handleSubmit(event)}
                >
                <input
                  type="text"
                  className='shadow appearance-none border rounded py-2 px-3'
                  name="greetingInput"
                 />
                 <button className='bg-red-500 hover:bg-blue-500 text-white font-bold py-2 px-4'>Set Greeting</button>
                </form>
            </div>
            <div className="w-full border-4 p-2 mb-4 rounded border-gray-400">
              <div className="text-gray-600 font-bold text-md mb-2">
                Breeting Message
              </div>
              <p>{greeting}</p>
            </div>
          </div>
        </div>
      </div>
     );
}

export default App;
