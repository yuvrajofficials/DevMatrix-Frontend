import React from 'react'
import DevMatrix_Logo from '../../Images/DevMatrix_Logo.png'
import LoginAuth from '../Utils/LoginAuth'
import { IoHome, IoNotifications } from "react-icons/io5";
import { NavLink, useNavigate } from 'react-router-dom'
import { IoLogOut } from 'react-icons/io5';
import { RiDashboard3Fill, RiProfileFill } from 'react-icons/ri';
import { FaHistory, FaTasks } from 'react-icons/fa';
import { MdCloudDownload } from 'react-icons/md';


const DashboardLeft = () => {
    const navigate = useNavigate();
    const handleLogOut = () => {
      if (window.confirm("Do you want to logout?")) {
        navigate('/logout');
      }
    };
    
  return (
    <>
          <section className="bg-[#002333]  w-48 px-2 h-screen">
            <NavLink to="/user/dashboard"  className="text-white  font-semibold w-full  flex items-center h-10 py-4 px-2  text-sm rounded-md hover:bg-[#01ff85]  hover:text-[#002333]">
              <RiDashboard3Fill className="h-6 w-6  " /> <span className="p-1">Dashboard</span></NavLink>  
            <NavLink to="/user/profile" className="text-white  font-semibold w-full  flex items-center h-10 py-4 px-2  text-sm rounded-md hover:bg-[#01ff85]  hover:text-[#002333]">
              <RiProfileFill className="h-6 w-6  " /> <span className="p-1">Profile</span></NavLink>  
            <NavLink to="/user/mycourses"  className="text-white  font-semibold w-full  flex items-center h-10 py-4 px-2  text-sm rounded-md hover:bg-[#01ff85]  hover:text-[#002333]">
              <MdCloudDownload className="h-6 w-6  " /> <span className="p-1">My Courses</span></NavLink>  
            <NavLink  to="/user/myhistory" className="text-white  font-semibold w-full  flex items-center h-10 py-4 px-2  text-sm rounded-md hover:bg-[#01ff85]  hover:text-[#002333]">
              <FaHistory className="h-6 w-6  " /> <span className="p-1">History</span></NavLink>  
            <NavLink  to="/user/mytasks" className="text-white  font-semibold w-full  flex items-center h-10 py-4 px-2  text-sm rounded-md hover:bg-[#01ff85]  hover:text-[#002333]">
              <FaTasks className="h-6 w-6  " /> <span className="p-1">Tasks</span></NavLink>  
            <NavLink  to="/user/notifications" className="text-white  font-semibold w-full  flex items-center h-10 py-4 px-2  text-sm rounded-md hover:bg-[#01ff85]  hover:text-[#002333]">
              <IoNotifications className="h-6 w-6  " /> <span className="p-1">Notifications</span>
            </NavLink>    
            <button
              onClick={handleLogOut}
              className="text-white  font-semibold w-full  flex items-center h-10 py-4 px-2  text-sm rounded-md hover:bg-[#01ff85]  hover:text-[#002333]">
              <IoLogOut className="h-6 w-6  " /> <span className="p-1">Log Out</span>
            </button>
          </section>
    </>
  )
}

export default DashboardLeft
