import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import LoginForm from '../Utils/LoginForm';

const UserAuth = () => {
  const isUser = JSON.parse(localStorage.getItem("setLoginInfo"));
  
      if(isUser.logintype===2){
      return <Outlet/>
      }
      else if(isUser.logintype===1){
      return <Outlet/>
      }
      else if(isUser.logintype==0){
      return <Outlet/>
      }
      return <LoginForm/>
    
  
}

export default UserAuth
