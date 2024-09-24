import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TeacherCourseManagement from '../TeacherFiles/TeacherCourseManagement';

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

      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const accessToken = localStorage.getItem('accessToken');

      try {
        const response = await axios.post(
          `${backendUrl}/api/v1/teacher/get-mycourse`,
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

    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/teacher/get-course-modules`,
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
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
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
        `${backendUrl}/api/v1/teacher/upload-video`,
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
        <section className="flex justify-center bg-[#C5C5C6] h-auto m-0 items-center py-8">
          <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span className="ml-2">Uploading your video, please wait...</span>
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
                    placeholder="Title"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Description</label>
                  <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full"
                    placeholder="Description"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Publish</label>
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="h-5 w-5 text-blue-600"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Creator</label>
                  <input
                    name="creator"
                    value={creator}
                    onChange={(e) => setCreator(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full"
                    placeholder="Creator"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Video File</label>
                  <input
                    type="file"
                    name="videoFile"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                    className="block w-full text-gray-700 p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Thumbnail</label>
                  <input
                    type="file"
                    name="thumbnail"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                    className="block w-full text-gray-700 p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Course</label>
                  <select
                    value={selectedCourse}
                    onChange={handleCourseChange}
                    className="border border-gray-300 p-3 rounded-lg w-full"
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

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Module</label>
                  <select
                    value={selectedModule}
                    onChange={(e) => setSelectedModule(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full"
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

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Upload Video
                </button>
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
