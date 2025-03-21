import React, { useState } from 'react';
import DevMatrix_Logo from '../../Images/DevMatrix_Logo.png';
import { IoHome, IoNotifications, IoLogOut, IoMenu, IoClose } from "react-icons/io5";
import { NavLink, useNavigate } from 'react-router-dom';
import { RiDashboard3Fill, RiProfileFill } from 'react-icons/ri';
import { FaHistory, FaTasks } from 'react-icons/fa';
import { MdCloudDownload, MdPerson } from 'react-icons/md';
import { BiHome } from 'react-icons/bi';

const TeacherDashboardHeader = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    if (window.confirm("Do you want to logout?")) {
      navigate('/logout');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='max-h-fit '>


      <div className="flex bg-white">
        <aside className='w-48 p-3' >
          <div className=''>
            <p className="text-gray-800  font-bold text-2xl pb-3 mb-3">
              Dev<span className="text-blue-600 font-bold text-2xl">Matrix</span>
            </p>
          </div>


          <div className='flex cursor items-center p-2 space-x-1 border hover:text-blue-600 hover:border-blue-600 hover:rounded-lg  rounded-lg mb-2'>
              <MdPerson className='w-6 h-6' />
            <p >
               Yuvraj
            </p>
          </div>

    
          <NavLink className="flex  items-center  p-2 space-x-1 hover:text-blue-600 hover:bg-blue-50 hover:rounded-lg" to="/">
            <BiHome /> <span>Home</span>
          </NavLink>
          <NavLink className="flex  items-center  p-2 space-x-1 hover:text-blue-600 hover:bg-blue-50 hover:rounded-lg" to="/teacher/profile">
            <RiProfileFill /> <span>Profile</span>
          </NavLink>
          <NavLink className="flex  items-center  p-2 space-x-1 hover:text-blue-600 hover:bg-blue-50 hover:rounded-lg" to="/teacher/course-management/view-all-course">
            <MdCloudDownload /> <span>Courses</span>
          </NavLink>
          <NavLink className="flex  items-center  p-2 space-x-1 hover:text-blue-600 hover:bg-blue-50 hover:rounded-lg" to="/teacher/blog-management/view-all-blogs">
            <FaHistory /> <span>Blogs</span>
          </NavLink>
          
          <NavLink className="flex  items-center  p-2 space-x-1 hover:text-blue-600 hover:bg-blue-50 hover:rounded-lg" to="/teacher/notification-management">
            <IoNotifications /> <span>Notifications</span>
          </NavLink>
          <button className="flex  items-center  p-2 space-x-1 hover:text-blue-600 hover:bg-blue-50 hover:rounded-lg" onClick={handleLogOut}>
            <IoLogOut /> <span>Log Out</span>
          </button>
        </aside>

        <main className="bg-white m-3 rounded-xl w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

export default TeacherDashboardHeader;
