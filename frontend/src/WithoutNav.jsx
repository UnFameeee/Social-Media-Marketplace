import React from 'react'
import { Outlet } from 'react-router';
function WithoutNav() {
  return (
    <>
      <Outlet />
    </>
  )
}

export default WithoutNav