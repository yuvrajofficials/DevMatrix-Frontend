import axios from "axios";
import "../../CSS/list.css";
import TeacherDashboardHeader from "./TeacherDashboardHeader"
import React,{Children, useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom';
import { IoSettings,IoCloseCircleSharp  } from 'react-icons/io5';
import { FaCirclePlus,FaCircl } from "react-icons/fa6";
import { FaEdit, FaUpload  } from "react-icons/fa";
import { RiGalleryView2, RiSpam2Fill } from 'react-icons/ri';
import { MdCreateNewFolder, MdDrafts, MdMessage } from 'react-icons/md';
import { VscFileSubmodule } from 'react-icons/vsc';
import { BsFillSendFill } from "react-icons/bs";
 
const TeacherNotifications = ({children}) => {
  const [notifications, setNotifications] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const notificationThumbnail = "https://plus.unsplash.com/premium_vector-1718791232666-f22f58c74bc6?dpr=1&h=294&w=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8dk9HZjNxSXF0Z1F8fGVufDB8fHx8fA%3D%3D";

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/users/get-notification`);
        const sortedNotifications = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNotifications(sortedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [backendUrl]);  // Adding backendUrl as dependency to prevent unnecessary re-fetches

const handleClickedNotification = (notification) =>{
}

let isOpen = useState(false);
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
let isToggleOpen = () =>{

  setIsSidebarOpen(!isSidebarOpen);
}



  return (
    <>
      <TeacherDashboardHeader>
      {children||<>
      <div className="flex">
       
        <div className="main-admin-component w-screen">
          <div className="bg-gray-100 min-h-screen p-5">
            <div className="w-auto mx-auto bg-white shadow-md rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-700">Notifications</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-center p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="w-16 text-gray-500">
                      <img
                        src={notificationThumbnail}
                        width={42}
                        height={42}
                        className="rounded-3xl object-cover"
                        alt="userlogo"
                      />
                    </div>
                    <div className="w-48 text-truncate mx-4 text-gray-500">{notification.email}</div>
                    <div className="w-6/12"  >
                      <div className="text-gray-900 font-semibold">{notification.subject}</div>
                      <div onClick={handleClickedNotification(notification)} className="text-gray-500 text-sm w-48 h-4 text-truncate" dangerouslySetInnerHTML={{ __html: notification.message }} />
                    </div>
                    <div className="w-2/12 text-gray-500 text-right">{new Date(notification.createdAt).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </>}
      <button className='fixed top-24 right-0 w-auto' onClick={isToggleOpen}>
    {isSidebarOpen? <NotificationView/>:<ManagementComponent/>}
  </button>

      </TeacherDashboardHeader>
    </>
  );
};


export default TeacherNotifications


const NotificationView = () => {
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
              to="/teacher/notification-management/settings"
              className={`my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] `}
            >
              <IoSettings className="h-6 w-6" /> <span className="p-1">Settings</span>
            </NavLink>
            <NavLink
              to="/teacher/notification-management/inbox"
              className={`my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] `}
            >
              <MdMessage className="h-6 w-6" /> <span className="p-1">Inbox</span>
            </NavLink>
            <NavLink
              to="/teacher/notification-management/compose"
              className={`my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] `}
            >
              <BsFillSendFill  className="h-6 w-6" /> <span className="p-1">Compose</span>
            </NavLink>
            <NavLink
              to="/teacher/notification-management/draft"
              className={`my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] `}
            >
              <MdDrafts className="h-6 w-6" /> <span className="p-1">Draft</span>
            </NavLink>
            <NavLink
              to="/teacher/notification-management/spam"
              className={`my-1 text-white font-semibold w-full flex items-center h-10 py-4 px-2 text-sm rounded-md hover:bg-[#01ff85] hover:text-[#002333] `}
            >
              <RiSpam2Fill className="h-6 w-6" /> <span className="p-1">Spam Messages</span>
            </NavLink>

           
            {/* You can add more items here as needed */}
          </aside>
    </div>
  )
}