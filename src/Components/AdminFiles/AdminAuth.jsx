  import React, { useState } from 'react'
  import { Outlet, useNavigate } from 'react-router-dom';
  import LoginForm from '../Utils/LoginForm';


  const AdminAuth = () => {
    
    const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
    const [isAdmin,setAdmin]=useState(getLoginInfo.logintype);
    
  if(isAdmin==2){
    return <Outlet/>
  }

  return <LoginForm/>

  }
  export default AdminAuth
