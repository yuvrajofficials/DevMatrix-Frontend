import axios from "axios";
import "../../CSS/list.css";
import TeacherDashboardHeader from "./TeacherDashboardHeader"
import React,{Children, useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom';
import { IoSettings,IoCloseCircleSharp  } from 'react-icons/io5';
import { FaCirclePlus } from "react-icons/fa6";
import { FaEdit, FaUpload  } from "react-icons/fa";
import { RiGalleryView2, RiSpam2Fill } from 'react-icons/ri';
import { MdCreateNewFolder, MdDrafts, MdMessage } from 'react-icons/md';
import { VscFileSubmodule } from 'react-icons/vsc';
import { BsFillSendFill } from "react-icons/bs";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URL;

const TeacherNotManagement = ({ children }) => {
  return (
    <>
      <TeacherDashboardHeader>
        <div className=''>
          <>
            <ManagementComponent />
            <div>
              {children}
            </div>
          </>
        </div>
      </TeacherDashboardHeader>

    </>
  );
};

export default TeacherNotManagement;


const ManagementComponent = () => {
  const activeClasses = "flex items-center rounded-full space-x-2 p-2 m-2 text-blue-600"
  return (
    <div>
      <div className='flex bg-white justify-between bg-white'>
        <NavLink className={({ isActive }) => isActive ? `${activeClasses}` : "flex items-center rounded-full space-x-2 p-2 m-2"}   to="/teacher/notification-management/settings">
          <IoSettings /> <span>Settings</span>
        </NavLink>

        <NavLink className={({ isActive }) => isActive ? `${activeClasses}` : "flex items-center rounded-full space-x-2 p-2 m-2"} to="/teacher/notification-management/inbox">
           <MdMessage className="h-6 w-6" /> <span className="p-1">Inbox</span>
          </NavLink>



        <NavLink className={({ isActive }) => isActive ? `${activeClasses}` : "flex items-center rounded-full space-x-2 p-2 m-2"} to="/teacher/notification-management/compose">
           <BsFillSendFill  className="h-6 w-6" /> <span className="p-1">Compose</span>
        </NavLink>

        <NavLink className={({ isActive }) => isActive ? `${activeClasses}` : "flex items-center rounded-full space-x-2 p-2 m-2"}  to="/teacher/notification-management/draft">
          <MdDrafts className="h-6 w-6" /> <span className="p-1">Draft</span>
        </NavLink>

        <NavLink className={({ isActive }) => isActive ? `${activeClasses}` : "flex items-center rounded-full space-x-2 p-2 m-2"}   to="/teacher/notification-management/spam">
             <RiSpam2Fill className="h-6 w-6" /> <span className="p-1">Spam Messages</span>
        </NavLink>
      </div>
    </div>
  );
};