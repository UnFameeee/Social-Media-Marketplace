import React from 'react'
import { Outlet } from 'react-router';
import NavBar from './components/Layout/Navbar/NavBar';
import NavigationBar from './components/Navbar/NavigationBar';
function WithNav() {
  return (
    <>
      <NavBar/>
      {/* <NavigationBar/> */}
      <Outlet />
    </>
  )
}

export default WithNav