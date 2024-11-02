import React from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../appwrite/auth"
import { logout } from '../../store/authSlice';
import { IoIosLogOut } from "react-icons/io";

function LogoutButton() {
    const dispatch = useDispatch();
    const handleLogout = ()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
<button type="button" className="btn btn-info" onClick={handleLogout}>Logout <IoIosLogOut className='mb-1 fw-bolder '/>
</button>
  )
}

export default LogoutButton