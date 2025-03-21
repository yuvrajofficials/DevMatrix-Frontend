import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TeacherCourseManagement from '../TeacherFiles/TeacherCourseManagement';
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const UploadVideo = () => {

  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [creator, setCreator] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedModule, setSelectedModule] = useState('');
  const [owner, setOwner] = useState('');
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch login data from localStorage
  useEffect(() => {
    const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
    if (getLoginInfo) {
      setOwner(getLoginInfo.userId); // Set owner based on logged-in user
    }
  }, []);

  // Fetch courses created by the owner (teacher)
  useEffect(() => {
    const fetchCourses = async () => {
      if (!owner) return;

      const accessToken = localStorage.getItem('accessToken');

      try {
        const response = await axios.post(
          `${BACKEND_URI}/api/v1/teacher/get-mycourse`,
          { owner }, // Pass owner ID
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setCourses(response.data.data); // Set courses fetched from API
      } catch (error) {
        toast.error("Error fetching courses. Please try again.", { position: "bottom-right" });
        console.error(error);
      }
    };

    fetchCourses();
  }, [owner]);

  // Fetch modules when a course is selected
  const handleCourseChange = async (e) => {
    const selectedCourseId = e.target.value;
    setSelectedCourse(selectedCourseId);
    console.log(selectedCourse)
    setSelectedModule(''); // Reset the module selection when the course changes

    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await axios.post(
        `${BACKEND_URI}/api/v1/teacher/get-course-modules`,
        { courseId: selectedCourseId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setModules(response.data.modules); // Set modules after fetching
      console.log(response.data)
    } catch (error) {
      toast.error("Error fetching modules. Please try again.", { position: "bottom-right" });
      console.error(error);
    }
  };

  // Submit video upload form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const accessToken = localStorage.getItem('accessToken');
    const formData = new FormData();

    formData.append('videoFile', videoFile);
    formData.append('thumbnail', thumbnail);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('isPublished', isPublished);
    formData.append('owner', owner);
    formData.append('course', selectedCourse);
    formData.append('moduleId', selectedModule);

    try {
      await axios.post(
        `${BACKEND_URI}/api/v1/teacher/upload-video`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.success("Video uploaded successfully!", { position: "bottom-right" });
      handleReset();
    } catch (error) {
      toast.error("Error uploading video. Please try again.", { position: "bottom-right" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Reset the form fields
  const handleReset = () => {
    setTitle('');
    setDescription('');
    setIsPublished(false);
    setCreator('');
    setVideoFile(null);
    setThumbnail(null);
    setSelectedCourse('');
    setSelectedModule('');
  };

  return (
    <>
      <TeacherCourseManagement>
        <section className="p-4 bg-blue-50  rounded-xl min-h-screen  border-1 border-blue-400">
          <div className="flex justify-center ">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span className="ml-2">Uploading your video, please wait...</span>
              </div>
            ) : (

              <form onSubmit={handleSubmit} className="w-full w-full bg-white shadow-lg rounded-lg p-8">
                {/* Title */}
                <h2 className="text-2xl border-b border-blue-400 pb-4 font-bold text-center text-gray-700 mb-6">Upload Video</h2>

                {/* Course Title */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Title</label>
                  <input
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter video title"
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Description</label>
                  <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter a brief description"
                    required
                  />
                </div>

                <div className="lg:flex justify-between sm:block md:block  lg:space-x-4">


                  {/* Creator */}
                  <div className="mb-4 lg:w-1/2 ">
                    <label className="block text-gray-700 font-semibold mb-2">Creator</label>
                    <input
                      name="creator"
                      value={creator}
                      onChange={(e) => setCreator(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Enter creator name"
                      required
                    />
                  </div>

                  {/* Publish Checkbox */}
                  <div className="mb-4 lg:w-1/2  flex items-center">
                    <input
                      type="checkbox"
                      name="isPublished"
                      checked={isPublished}
                      onChange={(e) => setIsPublished(e.target.checked)}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-3 text-gray-700 font-semibold">Publish</label>
                  </div>

                  </div>
                  <div className="lg:flex justify-between sm:block md:block  lg:space-x-4">


                  {/* Video File Upload */}
                  <div className="mb-4 lg:w-1/2">
                    <label className="block text-gray-700 font-semibold mb-2">Video File</label>
                    <input
                      type="file"
                      name="videoFile"
                      onChange={(e) => setVideoFile(e.target.files[0])}
                      className="block w-full p-2 border border-gray-100 rounded-lg bg-gray-100 cursor-pointer file:bg-blue-500 file:text-white file:px-3 file:py-2 file:rounded-md"
                      required
                    />
                  </div>

                  {/* Thumbnail Upload */}
                  <div className="mb-4 lg:w-1/2">
                    <label className="block text-gray-700 font-semibold mb-2">Thumbnail</label>
                    <input
                      type="file"
                      name="thumbnail"
                      onChange={(e) => setThumbnail(e.target.files[0])}
                      className="block w-full p-2 border border-gray-100 rounded-lg bg-gray-100 cursor-pointer file:bg-blue-500 file:text-white file:px-3 file:py-2 file:rounded-md"
                      required
                    />
                  </div>


                </div>

                {/* Course Selection */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Course</label>
                  <select
                    value={selectedCourse}
                    onChange={handleCourseChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  >
                    <option value="" disabled>Select a course</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.mycourses.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Module Selection */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Module</label>
                  <select
                    value={selectedModule}
                    onChange={(e) => setSelectedModule(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  >
                    <option value="" disabled>Select a module</option>
                    {modules.map((module) => (
                      <option key={module._id} value={module._id}>
                        {module.title}
                      </option>
                    ))}
                  </select>
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
                    className="w-1/2 py-3 text-lg font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Upload Video
                  </button>
                </div>
              </form>

            )}
          </div>
        </section>
      </TeacherCourseManagement>

      <ToastContainer />
    </>
  );
};

export default UploadVideo;
