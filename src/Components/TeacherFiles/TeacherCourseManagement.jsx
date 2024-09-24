import React,{Children, useState} from 'react'
import TeacherDashboardHeader from './TeacherDashboardHeader'
import CreateCourse from '../ComponentManagement/CreateCourse'
import { NavLink } from 'react-router-dom';
import { IoSettings,IoCloseCircleSharp  } from 'react-icons/io5';
import { FaCirclePlus,FaCircl } from "react-icons/fa6";
import { FaEdit, FaUpload  } from "react-icons/fa";
import { RiGalleryView2 } from 'react-icons/ri';
import { MdCreateNewFolder } from 'react-icons/md';
import { VscFileSubmodule } from 'react-icons/vsc';

const TeacherCourseManagement = ({children}) => {

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

export default TeacherCourseManagement

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
              to="/teacher/coursemanagement/course-settings"
              className={`my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] `}
            >
              <IoSettings className="h-6 w-6" /> <span className="p-1">Settings</span>
            </NavLink>
            <NavLink
              to="/teacher/coursemanagement/create-course"
              className={`my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] `}
            >
              <MdCreateNewFolder  className="h-6 w-6" /> <span className="p-1">Create Course</span>
            </NavLink>
            <NavLink
              to="/teacher/coursemanagement/view-all-course"
              className={`my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] `}
            >
              <RiGalleryView2 className="h-6 w-6" /> <span className="p-1">View All Course</span>
            </NavLink>
            <NavLink
              to="/teacher/coursemanagement/edit-course"
              className={`my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] `}
            >
              <FaEdit className="h-6 w-6" /> <span className="p-1">Edit Course</span>
            </NavLink>
            <NavLink
              to="/teacher/coursemanagement/upload-video"
              className={`my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] `}
            >
              <FaUpload className="h-6 w-6" /> <span className="p-1">Upload Video</span>
            </NavLink>
            <NavLink
              to="/teacher/coursemanagement/create-modules"
              className={`my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] `}
            >
              <VscFileSubmodule className="h-6 w-6" /> <span className="p-1">Create Module</span>
            </NavLink>
           
            {/* You can add more items here as needed */}
          </aside>
    </div>
  )
}


