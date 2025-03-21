import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URL;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoditEditor from "jodit-react";
import { AiOutlineFullscreen } from "react-icons/ai";
import TeacherCourseManagement from "../TeacherFiles/TeacherCourseManagement";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [resourceTitle, setResourceTitle] = useState('');
  const [owner, setOwner] = useState('');
  const [creator, setCreator] = useState('');
  const [loginData, setLoginData] = useState({});
  const accessToken = localStorage.getItem('accessToken');
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
    if (getLoginInfo != null) {
      setLoginData(getLoginInfo);
      setOwner(getLoginInfo.userId);
    }
  }, []);

  const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
  const handleThumbnailUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8085';
    const formData = new FormData();

    formData.append('title', resourceTitle);
    formData.append('userId', getLoginInfo.userId);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('resource', thumbnail); // Ensure 'thumbnail' is the file input element

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }


    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/teacher/upload-resource`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      toast.success("Resource uploaded successfully!", { position: "bottom-right" });
      handleReset();
    } catch (error) {
      toast.error("Error uploading resource. Please try again.", { position: "bottom-right" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (value) => {
    setDescription(value);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('creator', creator);
    formData.append('owner', owner);
    formData.append('resource', thumbnail);
    formData.append('description', description);
    formData.append('price', price);
    try {
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/teacher/create-course`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      toast.success("Course created successfully!", { position: "bottom-right" });
      setLoading(false);
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
      <TeacherCourseManagement>
        <section className='p-4 bg-blue-50  rounded-xl min-h-screen  border-1 border-blue-400'>
          <div className="flex justify-center">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span className="ml-2">Creating your video Course <b>{title}</b>, please wait...</span>
              </div>
            ) : (
              <form className="w-full bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                {/* Title */}
                <h2 className="text-2xl  border-b border-blue-500 font-semibold text-center text-gray-800 mb-6 pb-4">Create a New Course</h2>


                {/* Course Title */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">Course Title</label>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter course title"
                    required
                  />
                </div>
<div className="lg:flex justify-between sm:block md:block  lg:space-x-4">

                {/* Creator */}
                <div className="mb-4 lg:w-1/2 ">
                  <label className="block text-gray-700 font-medium mb-1">Creator</label>
                  <input
                    type="text"
                    name="creator"
                    value={creator}
                    onChange={(e) => setCreator(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter creator name"
                    required
                  />
                </div>

                {/* Price */}
                <div className="mb-4  lg:w-1/2">
                  <label className="block text-gray-700 font-medium mb-1">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter price in USD"
                    required
                  />
                </div>

</div>
                {/* Thumbnail Upload */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">Thumbnail</label>
                  <input
                    type="file"
                    name="thumbnail"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-pointer file:cursor-pointer file:bg-blue-500 file:border-none file:text-white file:px-3 file:py-2 file:rounded-md"
                    required
                  />
                </div>

                {/* Description Editor */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
                    Description
                    <span className="text-sm text-gray-500">(Click the fullscreen icon <AiOutlineFullscreen className="inline text-orange-500" /> for better editing)</span>
                  </label>
                  <JoditEditor
                    value={description}
                    onChange={(newContent) => setDescription(newContent)}
                    className="w-full border border-gray-300 rounded-lg p-3"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-1/2 py-3 text-lg font-medium bg-gray-700 text-white rounded-lg hover:bg-gray-900 transition duration-300"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-3 text-lg font-medium bg-blue-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
                  >
                    Create
                  </button>
                </div>
              </form>

            )}
          </div>
          <ToastContainer />
        </section>
      </TeacherCourseManagement>
    </>
  );
};

export default CreateCourse;
