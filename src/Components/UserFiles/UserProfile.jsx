import React from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardHeader from './DashboardHeader';
const UserProfile = () => {
    const navigate = useNavigate();
  return (
   <>
     <DashboardHeader>
   <h1>
    This is profile
   </h1>
   </DashboardHeader>
    
   </>
  )
}

export default UserProfile
