import React from 'react';
import TeacherDashboardHeader from './TeacherDashboardHeader';
import { NavLink } from 'react-router-dom';
import { IoSettings } from 'react-icons/io5';
import { MdCloudUpload } from 'react-icons/md';
import { BsGraphUp } from 'react-icons/bs';
import { HiDocument, HiDocumentPlus } from 'react-icons/hi2';

const TeacherBlogManagement = ({ children }) => {
  return (
    <>
      <TeacherDashboardHeader>
          <BlogManagementComponent />
        <div className=" bg-white">
          <div className="">{children}</div>
        </div>
      </TeacherDashboardHeader>
    </>
  );
};

export default TeacherBlogManagement;

const BlogManagementComponent = () => {
  const activeClasses =
    "flex items-center rounded-full space-x-2 p-2 m-2 text-blue-600 font-semibold ";
  const defaultClasses =
    "flex items-center rounded-full space-x-2 p-2 m-2 text-gray-700 hover:text-blue-600 transition-all duration-300";

  return (
    <div className="bg-white">
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        <NavLink
          className={({ isActive }) => (isActive ? activeClasses : defaultClasses)}
          to="/teacher/blog-management/blog-settings"
        >
          <IoSettings className="text-lg" />
          <span>Settings</span>
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? activeClasses : defaultClasses)}
          to="/teacher/blog-management/create-blog"
        >
          <HiDocumentPlus className="text-lg" />
          <span>Create Blog</span>
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? activeClasses : defaultClasses)}
          to="/teacher/blog-management/view-all-blogs"
        >
          <HiDocument className="text-lg" />
          <span>View All Blogs</span>
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? activeClasses : defaultClasses)}
          to="/teacher/blog-management/blog-statistics"
        >
          <BsGraphUp className="text-lg" />
          <span>Blog Statistics</span>
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? activeClasses : defaultClasses)}
          to="/teacher/blog-management/upload-resources"
        >
          <MdCloudUpload className="text-lg" />
          <span>Upload Resources</span>
        </NavLink>
      </div>
    </div>
  );
};
