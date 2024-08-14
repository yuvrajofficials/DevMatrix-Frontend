import React, { useState } from "react";
import AdminCreateCourse from "./AdminCreateCourse";
import AdminUploadVideo from "./AdminUploadVIdeo";
import { AdminDashboardSide,AdminDashboardTop } from "./AdminDashboardComponent";
const AdminCourseManager = () => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <>
      <AdminDashboardTop />
      <div className="flex">
        <section className="w-48 border-2 border-grey-500 h-screen">
          <AdminDashboardSide />
        </section>
        <div className="main-admin-component w-full">
          <div className="bg-gray-100 min-h-full p-5">
            <div className="h-full py-2 mx-auto bg-white shadow-md rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-700">Course Management</h2>
              </div>
              <div className="tabs flex justify-center mt-4">
                <button
                  className={`px-4 py-2 mx-2 rounded ${activeTab === "create" ? "bg-yellow-400" : "bg-gray-200"}`}
                  onClick={() => setActiveTab("create")}
                >
                  Create Course
                </button>
                <button
                  className={`px-4 py-2 mx-2 rounded ${activeTab === "upload" ? "bg-yellow-400" : "bg-gray-200"}`}
                  onClick={() => setActiveTab("upload")}
                >
                  Upload Video
                </button>
              </div>
              <div className="tab-content mt-4">
                {activeTab === "create" && <AdminCreateCourse />}
                {activeTab === "upload" && <AdminUploadVideo />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCourseManager;
