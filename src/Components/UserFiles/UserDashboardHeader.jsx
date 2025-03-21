import React, { useEffect, useState } from 'react';
import { IoHome, IoNotifications, IoLogOut, IoMenu, IoClose } from "react-icons/io5";
import { NavLink, useNavigate } from 'react-router-dom';
import { RiProfileFill } from 'react-icons/ri';
import { FaHistory } from 'react-icons/fa';
import { MdCloudDownload, MdPerson } from 'react-icons/md';

const UserDashboardHeader = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const loginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));

    if (!accessToken || !loginInfo) {
      setLoginData({});
    } else {
      setLoginData(loginInfo);
    }
  }, []);

  const handleLogOut = () => {
    if (window.confirm("Do you want to logout?")) {
      navigate('/logout');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 bg-white w-64 p-4 shadow-lg transform transition-transform duration-300 ease-in-out 
                        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-48`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between">
          <p className="text-gray-800 font-bold text-2xl">
            Dev<span className="text-blue-600">Matrix</span>
          </p>
          <button className="md:hidden p-2" onClick={toggleSidebar}>
            <IoClose className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center p-2 mt-4 space-x-2 border border-blue-400 rounded-lg text-gray-700 hover:text-blue-600">
          <MdPerson className="w-6 h-6" />
          <p>{loginData.username || "Guest"}</p>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 space-y-2">
        <NavLink className="flex items-center p-2 space-x-2 rounded-lg hover:bg-blue-50 hover:text-blue-600" to="/">
            <IoHome className="w-5 h-5" /> <span>Home</span>
          </NavLink>
          <NavLink className="flex items-center p-2 space-x-2 rounded-lg hover:bg-blue-50 hover:text-blue-600" to="/user/profile">
            <RiProfileFill className="w-5 h-5" /> <span>Profile</span>
          </NavLink>
          <NavLink className="flex items-center p-2 space-x-2 rounded-lg hover:bg-blue-50 hover:text-blue-600" to="/user/mycourses">
            <MdCloudDownload className="w-5 h-5" /> <span>My Purchases</span>
          </NavLink>
          <NavLink className="flex items-center p-2 space-x-2 rounded-lg hover:bg-blue-50 hover:text-blue-600" to="/user/mycart">
            <FaHistory className="w-5 h-5" /> <span>My Cart</span>
          </NavLink>
          <NavLink className="flex items-center p-2 space-x-2 rounded-lg hover:bg-blue-50 hover:text-blue-600" to="/user/notifications">
            <IoNotifications className="w-5 h-5" /> <span>Notifications</span>
          </NavLink>
          <button className="flex items-center p-2 space-x-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 w-full" onClick={handleLogOut}>
            <IoLogOut className="w-5 h-5" /> <span>Log Out</span>
          </button>
        </nav>
      </aside>

      {/* Mobile Overlay (Closes Sidebar on Click) */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-30 md:hidden" onClick={toggleSidebar}></div>}

      {/* Main Content */}
      <main className="flex-1 p-4 bg-white shadow-sm rounded-lg ">
        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 bg-blue-600 text-white rounded-lg" onClick={toggleSidebar}>
          <IoMenu className="w-6 h-6" />
        </button>
        {children}
      </main>
    </div>
  );
};

export default UserDashboardHeader;
