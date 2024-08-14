import React from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardHeader from './DashboardHeader';

const UserNotifications = () => {
    const navigate = useNavigate();
  return (
   <>
       <DashboardHeader>
   <h1>
    This is notifications
   </h1>
   </DashboardHeader>
    
   </>
  )
}

export default UserNotifications
