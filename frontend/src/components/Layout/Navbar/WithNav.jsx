import { Outlet } from 'react-router';
import NavBar from './NavBar';

function WithNav() {
  return (
    <>
      <NavBar/>
      <Outlet />
    </>
  )
}

export default WithNav