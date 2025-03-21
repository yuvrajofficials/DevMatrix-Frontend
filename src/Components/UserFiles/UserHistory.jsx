import React from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardHeader from './UserDashboardHeader';
const UserHistory = () => {
    const navigate = useNavigate();
  return (
    <>
   <DashboardHeader>
   <h1>
    This is history
   </h1>
   </DashboardHeader>
    
    </>
  )
}

export default UserHistory
