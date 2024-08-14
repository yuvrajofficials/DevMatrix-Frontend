import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import LoginForm from '../Utils/LoginForm';

const TeacherAuth = () => {

     const isTeacher = JSON.parse(localStorage.getItem("setLoginInfo"));
     console.log(isTeacher)

      if(isTeacher.logintype===1){
      return <Outlet/>
      }
      return <LoginForm/>
    
  
}

export default TeacherAuth
