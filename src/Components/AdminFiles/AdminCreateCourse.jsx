import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminDashboardSide, AdminDashboardTop } from "./AdminDashboardComponent";

const AdminCreateCourse = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');
  const [creator, setCreator] = useState('');
  const [loginData, setLoginData] = useState({});
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
    if (getLoginInfo != null) {
      setLoginData(getLoginInfo);
      setOwner(getLoginInfo.userId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendUrl = 'http://localhost:8085';
    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/teacher/create-course`,
        { title, creator, owner },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      toast.success("Course created successfully!", { position: "bottom-right" });
      // Optionally, you can navigate to another page after successful creation
      // navigate('/some-other-page');
    } catch (error) {
      toast.error("Error creating course. Please try again.", { position: "bottom-right" });
      console.error(error);
    }
  };

  const handleReset = () => {
    setTitle('');
    setCreator('');
  };

  return (
    <>
      <AdminDashboardTop />
      <div className="flex">
        <section className=" w-48 border-2 border-grey-500 h-screen">
          <AdminDashboardSide />
        </section>
        <div className="main-admin-component w-full">
          <div className="bg-gray-100 min-h-screen p-5">
            <div className="h-screen mx-auto bg-white shadow-md rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-700">Create Course</h2>
              </div>
              <div className="divide-y divide-gray-200">
                <form className="block border-3 border-gray-200 mx-64 my-4 p-4 rounded-xl" onSubmit={handleSubmit}>
                  <div className="m-4 p-1">
                    <label className="block p-2">Title</label>
                    <input 
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="border-1 block border-gray-200 p-2 rounded w-full"
                      placeholder="Title"
                      required
                    />
                    <label className="block p-2">Creator</label>
                    <input 
                      name="creator"
                      value={creator}
                      onChange={(e) => setCreator(e.target.value)}
                      className="block w-full border-1 border-gray-200 p-2 rounded"
                      placeholder="Creator"
                      required
                    />
                  </div>
                  <div className="flex justify-center">
                    <button type="submit" className="w-32 h-8 text-sm font-semibold bg-yellow-400 text-black border-2 border-slate-300 rounded mr-4">
                      Submit
                    </button>
                    <button type="button" onClick={handleReset} className="w-32 h-8 text-sm font-semibold bg-white text-black border-2 border-slate-300 rounded">
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminCreateCourse;
