import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/Auth'
import { logOut } from '../../Store/AuthSlice'

function Logout() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logOut());
      console.log("Log out successfull");
    }).catch((error) => {
      console.log(error);
    })
  }
  return (

    <button
      className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
      onClick={logoutHandler}
    >Logout</button>
  )
}

export default Logout