  import React, { useState } from 'react'
  import { Outlet, useNavigate } from 'react-router-dom';
  import AdminDashboard from './AdminDashboardComponent';
  import LoginForm from '../Utils/LoginForm';
  import UserDashboard from '../UserFiles/UserDashboard';


  const AdminAuth = () => {
    
    const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
    const [isAdmin,setAdmin]=useState(getLoginInfo.logintype);
    
  if(isAdmin==2){
    return <Outlet/>
  }

  return <LoginForm/>

  }
  export default AdminAuth
