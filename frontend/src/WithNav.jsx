import React from 'react'
import { Outlet } from 'react-router';
import NavigationBar from './components/Navbar/NavigationBar';
function WithNav() {
  return (
    <>
      <NavigationBar/>
      <Outlet />
    </>
  )
}

export default WithNav