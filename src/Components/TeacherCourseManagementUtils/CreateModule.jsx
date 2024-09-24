import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TeacherCourseManagement from '../TeacherFiles/TeacherCourseManagement';

const CreateModule = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loginData, setLoginData] = useState({});
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
    if (getLoginInfo != null) {
      setLoginData(getLoginInfo);
      setOwner(getLoginInfo.userId);
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      try {
        const response = await axios.post(
          `${backendUrl}/api/v1/teacher/get-mycourse`,
          { owner },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        setCourses(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        toast.error("Error fetching courses. Please try again.", { position: "bottom-right" });
        console.error(error);
      }
    };

    if (owner) {
      fetchCourses();
    }
  }, [owner, accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ title, owner, selectedCourse });
    setLoading(true);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const formData = {
      title,
      owner,
      courseId: selectedCourse
    };

    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/teacher/create-module`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success("Module created successfully!", { position: "bottom-right" });
      setLoading(false);
    } catch (error) {
      toast.error("Error creating module. Please try again.", { position: "bottom-right" });
      setLoading(false);
      console.error(error);
    }
  };

  const handleReset = () => {
    setTitle('');
    setSelectedCourse('');
  };

  return (
    <>
      <TeacherCourseManagement>
        <section className="flex justify-center bg-[#C5C5C6] h-screen m-0  items-center py-8">
          <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span className="ml-2">Creating your module, please wait...</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Title</label>
                  <input
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full"
                    placeholder="Module Title"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Course</label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full"
                    required
                  >
                    <option value="" disabled>Select a course</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course.mycourses._id}>
                        {course.mycourses.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-between">
                  <button type="button" onClick={handleReset}className="w-1/2 h-10 bg-[#002333] text-white font-bold rounded-lg mr-2 hover:bg-[#011823]">
                    Reset
                  </button>
                  <button type="submit"  className="w-1/2 h-10 bg-[#01ff85] text-gray-700 font-bold rounded-lg ml-2 hover:bg-[#01C567]" >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
        <ToastContainer />
      </TeacherCourseManagement>
    </>
  );
};

export default CreateModule;
