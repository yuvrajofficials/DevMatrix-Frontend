import React, { Children, useState } from 'react';
import DevMatrix_Logo from '../../Images/DevMatrix_Logo.png';
import { IoHome, IoNotifications, IoLogOut, IoMenu, IoClose } from "react-icons/io5";
import { NavLink, useNavigate } from 'react-router-dom';
import { RiDashboard3Fill, RiProfileFill } from 'react-icons/ri';
import { FaHistory, FaTasks } from 'react-icons/fa';
import { MdCloudDownload } from 'react-icons/md';
import { FaCartShopping } from 'react-icons/fa6';

const DashboardHeader = ({children}) => {
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

  const activeClass = "bg-[#01ff85] text-[#002333]";

  return (
    <>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className="bg-[#002333] flex justify-between items-center w-full h-20 p-2">
          <div className="flex items-center">
            <img src={DevMatrix_Logo} className="h-12" alt="Logo" />
          </div>
          <div className="flex items-center flex-grow justify-center md:justify-end">
            <input
              type="search"
              className="hidden md:block w-48 md:w-96 h-10 px-2 rounded-md text-[#002333]"
              placeholder="Search details..."
            />
            <button
              className="p-2 m-2 md:m-4"
              onClick={() => navigate("/")}
            >
              <IoHome className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </button>
            <button onClick={toggleSidebar} className="md:hidden text-white ml-4">
              {isSidebarOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>
          </div>
        </header>

        {/* Main Layout */}
        <div className="flex flex-grow">
          {/* Sidebar */}
          <aside className={`bg-[#002333]  w-48 h-screen md:flex flex-col ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
            <NavLink
              to="/user/dashboard"
              className={({ isActive }) => `my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] ${isActive ? activeClass : ''}`}
            >
              <RiDashboard3Fill className="h-6 w-6" /> <span className="p-1">Dashboard</span>
            </NavLink>
            <NavLink
              to="/user/profile"
              className={({ isActive }) => `my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] ${isActive ? activeClass : ''}`}
            >
              <RiProfileFill className="h-6 w-6" /> <span className="p-1">Profile</span>
            </NavLink>
            <NavLink
              to="/user/mycourses"
              className={({ isActive }) => `my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] ${isActive ? activeClass : ''}`}
            >
              <MdCloudDownload className="h-6 w-6" /> <span className="p-1">My Courses</span>
            </NavLink>
            <NavLink
              to="/user/addtocart"
              className={({ isActive }) => `my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] ${isActive ? activeClass : ''}`}
            >
              <FaCartShopping className="h-6 w-6" /> <span className="p-1">Carted Items</span>
            </NavLink>
            <NavLink
              to="/user/notifications"
              className={({ isActive }) => `my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] ${isActive ? activeClass : ''}`}
            >
              <IoNotifications className="h-6 w-6" /> <span className="p-1">Notifications</span>
            </NavLink>
            <NavLink
              to="/user/myhistory"
              className={({ isActive }) => `my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] ${isActive ? activeClass : ''}`}
            >
              <FaHistory className="h-6 w-6" /> <span className="p-1">History</span>
            </NavLink>
            <NavLink
              to="/user/mytasks"
              className={({ isActive }) => `my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] ${isActive ? activeClass : ''}`}
            >
              <FaTasks className="h-6 w-6" /> <span className="p-1">Tasks</span>
            </NavLink>
            <button
              onClick={handleLogOut}
              className="text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333]"
            >
              <IoLogOut className="h-6 w-6" /> <span className="p-1">Log Out</span>
            </button>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-4 bg-white">
            {children}
          </main>
        </div>
      </div>
    </>
        );
}

        export default DashboardHeader;
