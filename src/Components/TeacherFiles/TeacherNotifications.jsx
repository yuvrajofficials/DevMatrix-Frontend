import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../CSS/list.css";
import TeacherDashboardHeader from "./TeacherDashboardHeader"
 
const TeacherNotifications = () => {
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

  return (
    <>
      <TeacherDashboardHeader>
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
      </TeacherDashboardHeader>
    </>
  );
};


export default TeacherNotifications
