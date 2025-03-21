import React from 'react';
import TeacherDashboardHeader from './TeacherDashboardHeader';
import { NavLink } from 'react-router-dom';
import { IoSettings } from 'react-icons/io5';
import {  FaEdit, FaUpload } from "react-icons/fa";
import { RiGalleryView2 } from 'react-icons/ri';
import { MdCreateNewFolder, MdCloudUpload } from 'react-icons/md';
import { VscFileSubmodule } from 'react-icons/vsc';

const TeacherCourseManagement = ({ children }) => {
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

export default TeacherCourseManagement;

const CourseView = () => {
  return (
    <div>
      <FaEdit />
      <h3>Welcome to Course Management!</h3>
    </div>
  );
};

const ManagementComponent = () => {
  const activeClasses = "flex items-center rounded-full space-x-2 p-2 m-2 text-blue-600"
  return (
    <div>
      <div className='flex bg-white justify-between bg-white'>
        <NavLink className={({ isActive }) => isActive ? `${activeClasses}` : "flex items-center rounded-full space-x-2 p-2 m-2"} to="/teacher/course-management/course-settings">
          <IoSettings /> <span>Settings</span>
        </NavLink>

        <NavLink className={({ isActive }) => isActive ? `${activeClasses}` : "flex items-center rounded-full space-x-2 p-2 m-2"} to="/teacher/course-management/create-course">
          <MdCreateNewFolder /> <span>Create Course</span>
          </NavLink>


        <NavLink className={({ isActive }) => isActive ? `${activeClasses}` : "flex items-center rounded-full space-x-2 p-2 m-2"} to="/teacher/course-management/view-all-course">
          <RiGalleryView2 /> <span>View All Course</span>
        </NavLink>

        {/* <NavLink className={({ isActive }) => isActive ? `${activeClasses}` : "flex items-center rounded-full space-x-2 p-2 m-2"} to="/teacher/course-management/edit-course">
          <FaEdit /> <span>Edit Course</span>
        </NavLink> */}

        <NavLink className={({ isActive }) => isActive ? `${activeClasses}` : "flex items-center rounded-full space-x-2 p-2 m-2"} to="/teacher/course-management/upload-video">
          <FaUpload /> <span>Upload Video</span>
        </NavLink>

        <NavLink className={({ isActive }) => isActive ? `${activeClasses}` : "flex items-center rounded-full space-x-2 p-2 m-2"} to="/teacher/course-management/create-modules">
          <VscFileSubmodule /> <span>Create Module</span>
        </NavLink>
      </div>
    </div>
  );
};