import React from 'react';
import Navbar from './Navbar'
import Greeting from './Greeting'

const Layout = ({children}) => {
  return(
    <>
      <div>
        <p>test</p>
        <Greeting />
      </div>
    </>
  )
}

export default Layout;
