import React from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../appwrite/auth"
import { logout } from '../../store/authSlice';
function LogoutButton() {
    const dispatch = useDispatch();
    const handleLogout = ()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
<button type="button" className="btn btn-info" onClick={handleLogout}>Logout</button>
  )
}

export default LogoutButton