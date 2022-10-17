import { useSelector } from "react-redux"
import {useLocation, Navigate, Outlet} from "react-router-dom"

const RequireAuth = () =>{
    const auth = useSelector((state) => state.auth.login)
    const location = useLocation()
    return (
        auth?.currentUser
            ?<Outlet/> 
            :<Navigate to="/login" state={{from:location}} replace />
    )
}

export default RequireAuth;