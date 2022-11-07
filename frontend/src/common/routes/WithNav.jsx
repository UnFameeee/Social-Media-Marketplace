import { Outlet } from 'react-router';
import NavBar from '../../components/Layout/Navbar/NavBar'

function WithNav() {
  return (
    <>
      <NavBar/>
      <Outlet />
    </>
  )
}

export default WithNav