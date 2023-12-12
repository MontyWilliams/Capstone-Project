import React from 'react'
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
      <div className='flex flex-row justify-between p-2'>
        <div className='flex-1 flex'>
          <h1>Navbar</h1>
        </div>
        <div className='flex-row flex m-2 p-2'>
          <div className='p-2'>
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
