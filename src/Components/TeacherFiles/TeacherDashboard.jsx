import React from 'react'
import { useNavigate } from 'react-router-dom'
import TeacherDashboardHeader from './TeacherDashboardHeader';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  return (
<>
<TeacherDashboardHeader>
   <h1>
    This is dashboard
   </h1>
   </TeacherDashboardHeader>
    
</>
  )
}

export default TeacherDashboard
