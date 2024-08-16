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
  const [owner, setOwner] = useState('');
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
    console.log({ selectedCourse, owner });
    setLoading(true);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const formData = new FormData();
    formData.append('videoFile', videoFile);
    formData.append('thumbnail', thumbnail);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('isPublished', isPublished);
    formData.append('owner', owner);
    formData.append('course', selectedCourse);

    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/teacher/upload-video`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      toast.success("Video uploaded successfully!", { position: "bottom-right" });
      setLoading(false);
    } catch (error) {
      toast.error("Error uploading video. Please try again.", { position: "bottom-right" });
      setLoading(false);
      console.error(error);
    }
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setIsPublished(false);
    setCreator('');
    setVideoFile(null);
    setThumbnail(null);
    setSelectedCourse('');
  };

  return (
    <>
      <TeacherCourseManagement>
        <section className="flex justify-center bg-[#C5C5C6] h-auto m-0  items-center py-8">
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

export default UploadVideo;
