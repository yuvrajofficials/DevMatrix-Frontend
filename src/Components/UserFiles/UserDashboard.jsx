import React from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardHeader from './UserDashboardHeader';

const UserDashboard = () => {
  const navigate = useNavigate();
  return (
<>
<DashboardHeader>
   <h1>
    This is dashboard
   </h1>
   </DashboardHeader>
    
</>
  )
}

export default UserDashboard
