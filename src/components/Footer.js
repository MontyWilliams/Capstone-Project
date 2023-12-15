import React from 'react'
import '../styles/globals.css'

function Footer() {
  return (
    <div className='absolute h-auto bottom-0 w-full flex flex-row items-center justify-center bg-gradient-to-t from-slate-800 to-transparent'>
      <div className="flex flex-col items-center justify-items-center" >
        <h1>A Holberton Demo Day project</h1>
        <div className='flex row'>
          <div className="p-3">By:</div>
          <div className="flex flex-col">
            <p>Monty Williams</p>
            <p>Betrand bwashi</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
