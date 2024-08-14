import React from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardHeader from './DashboardHeader';

const UserMyCourses = () => {
    const navigate = useNavigate();
  return (
  <>
      <DashboardHeader>
   <h1>
    This is mycourse
   </h1>
   </DashboardHeader>
    
  </>
  )
}

export default UserMyCourses
