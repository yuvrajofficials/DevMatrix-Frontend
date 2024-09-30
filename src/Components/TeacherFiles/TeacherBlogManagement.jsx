import React,{Children, useState} from 'react'
import TeacherDashboardHeader from './TeacherDashboardHeader'
import { NavLink } from 'react-router-dom';
import { IoSettings,IoCloseCircleSharp, IoDocumentText  } from 'react-icons/io5';
import { FaCirclePlus,FaCircl } from "react-icons/fa6";
import { FaEdit, FaUpload  } from "react-icons/fa";
import { RiGalleryView2 } from 'react-icons/ri';
import { MdCloudUpload, MdCreateNewFolder } from 'react-icons/md';
import { VscFileSubmodule } from 'react-icons/vsc';
import { BsGraphUp } from 'react-icons/bs';
import { HiDocument, HiDocumentPlus } from 'react-icons/hi2';

const TeacherBlogManagement = ({children}) => {
  
  let isOpen = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  let isToggleOpen = () =>{

    setIsSidebarOpen(!isSidebarOpen);
  }

return (
<>

<TeacherDashboardHeader>
    <div>
      {children || <>
  <h2 className="text-[#01C567] text-3xl break-words w-1/2">
    Creating a Legacy Together
  </h2>
  <p className="text-xl break-words w-2/3 mt-4">
    "Every course you create is a step towards building a lasting legacy in education. 
    We're excited to provide you with the tools and support you need to develop and share 
    your expertise. Together, we're shaping the future of learning."
    <i ><p className='text-right text-[#01C567'>-Yuvraj</p></i>
  </p>

</>

      } 

    </div>
  <button className='fixed top-24 right-0 w-auto' onClick={isToggleOpen}>
    {isSidebarOpen? <CourseView/>:<ManagementComponent/>}
  </button>

 
</TeacherDashboardHeader>
  </>
  )
}

export default TeacherBlogManagement


const CourseView = () => {
  return (
    <div className='flex justify-content-center '>
    <FaCirclePlus className='w-12 h-12 block text-[#002333] '/>
    
      
    </div>
  )
}


const ManagementComponent = () => {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  
  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  return (
    <div>
       <aside className={`bg-[#002333] fixed top-20 right-0 w-48 h-[calc(100vh-5rem)] md:flex flex-col ${isRightSidebarOpen ? 'block' : 'hidden'} md:block z-0`}>
            {/* Add content for the right sidebar here */}
            <IoCloseCircleSharp className='w-8 h-8 flex text-white 'onClick={toggleRightSidebar}/>
            <NavLink
              to="/teacher/blog-management/blog-settings"
              className={`my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] `}
            >
              <IoSettings className="h-6 w-6" /> <span className="p-1">Settings</span>
            </NavLink>
            <NavLink
              to="/teacher/blog-management/create-blog"
              className={`my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] `}
            >
              <HiDocumentPlus  className="h-6 w-6" /> <span className="p-1">New Blog</span>
            </NavLink>
            <NavLink
              to="/teacher/blog-management/view-all-blogs"
              className={`my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] `}
            >
              <HiDocument className="h-6 w-6" /> <span className="p-1">My Blogs</span>
            </NavLink>
            <NavLink
              to="/teacher/blog-management/blog-statastics"
              className={`my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] `}
            >
              <BsGraphUp className="h-6 w-6" /> <span className="p-1">Blog Statastics</span>
            </NavLink>
            <NavLink
              to="/teacher/blog-management/upload-resources"
              className={`my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] `}
            >
              <MdCloudUpload className="h-6 w-6" /> <span className="p-1">Upload Resources</span>
            </NavLink>
            {/* You can add more items here as needed */}
          </aside>
    </div>
  )
}