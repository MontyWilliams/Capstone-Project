import React from 'react'
import { Link } from "react-router-dom";
import { useConnectionStatus } from "@thirdweb-dev/react";
import { useWallet } from "@thirdweb-dev/react";
import { ConnectWallet } from '@thirdweb-dev/react'
import  '../styles/globals.css'

function Navbar() {
  const connectionStatus = useConnectionStatus();
  const walletInstance = useWallet();
  const renderConnectionStatus = () =>{
    if (connectionStatus === "unknown") return <p> Loading... </p>;
    if (connectionStatus === "connecting") return <p> Connecting... </p>;
    if (connectionStatus === "connected") return <p> You are connected </p>;
    if (connectionStatus === "disconnected") return <p> You are not connected to a wallet </p>;
  }
  console.log(walletInstance)
  return (
    <div >
      <div className='flex flex-row justify-between p-2 items-center'>
        <div className='flex-1 flex'>
          <img src="/LoyaltyTkn_animate.svg" alt="" width={150} height={100}/>
        </div>
        <div className="flex flex-1 flex-row">
          <Link to="/">
            <h1 className="text-green-600 lg:text-5xl p-5 md:text-2xl sm:text-xl"> Home </h1>
          </Link>
          <Link to="/hero">
            <h1 className=" text-green-600 lg:text-5xl p-5 md:text-2xl sm:text-xl"> Hero </h1>
          </Link>
          <Link to="/profile">
            <h1 className=" text-green-600 lg:text-5xl p-5 md:text-2xl sm:text-xl"> profile </h1>
          </Link>
          <Link to="/campaigns">
            <h1 className=" text-green-600 lg:text-5xl p-5 md:text-2xl sm:text-xl"> campaigns </h1>
          </Link>
          
        </div>
        <div className='flex-row flex m-2 p-2'>
          <div className='p-3'>
            <h2>{renderConnectionStatus()}</h2>
            {(connectionStatus === "connected") ? <h2>{walletInstance.walletId}</h2> : "please connect wallet" }
          </div>
          <div>
        <ConnectWallet
            btnTitle="Login"
            className='connectWalletBtn '
        />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
