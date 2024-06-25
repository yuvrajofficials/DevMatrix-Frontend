import React, { useState, useEffect } from "react";
import { AdminDashboardSide, AdminDashboardTop } from "./AdminDashboardComponent";
import axios from "axios";

const AdminHome = () => {
  const [notifications, setNotifications] = useState([]);
  const backendUrl = "http://localhost:8085";

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/users/get-notification`);
        setNotifications(response.data);  // Assuming response.data is an array of notifications
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [backendUrl]);  // Adding backendUrl as dependency to prevent unnecessary re-fetches

  return (
    <>
      <AdminDashboardTop />
      <div className="flex">
        <section className="bg-black-800 w-48 border-2 border-grey-500 h-screen">
          <AdminDashboardSide active={"bg-red-400"} />
        </section>
        <div className="main-admin-component w-screen">
          <div className="bg-gray-100 min-h-screen p-5">
            <div className="w-auto  mx-auto bg-white shadow-md rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-700">Notifications</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {notifications.map((email) => (

                  <div key={email.id} className="flex items-center p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="w-2/12 text-gray-500"><img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png
          
          `  " width={42} height={42} className="rounded-2xl object-cover" alt="userlogo" /></div>

                    <div className="w-2/12 text-gray-500">{email.email}</div>
                    <div className="w-6/12">
                      <div className="text-gray-900 font-semibold">{email.subject}</div>
                      <div className="text-gray-500 text-sm">{email.message}</div>
                    </div>
                    <div className="w-2/12 text-gray-500 text-right">{email.createdAt}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
