import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import LoginForm from '../Utils/LoginForm';

const UserAuth = () => {
    const [isTeacher,setTeacher]=useState(1);
 
      if(isTeacher===1){
      return <Outlet/>
      }
      return <LoginForm/>
    
  
}

export default UserAuth
