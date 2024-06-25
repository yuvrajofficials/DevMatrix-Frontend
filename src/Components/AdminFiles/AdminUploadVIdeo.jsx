import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminDashboardSide, AdminDashboardTop } from "./AdminDashboardComponent";

const AdminUploadVideo = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [owner, setOwner] = useState('');
  const [creator, setCreator] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
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
      const backendUrl = 'http://localhost:8085';
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
  console.log({selectedCourse,owner})
    setLoading(true);
    const backendUrl = 'http://localhost:8085';
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
      // Optionally, you can navigate to another page after successful upload
      // navigate('/some-other-page');
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
      <AdminDashboardTop />
      <div className="flex">
        <section className=".bg-black-800 w-48 border-2 border-grey-500 h-screen">
          <AdminDashboardSide />
        </section>
        <div className="main-admin-component w-full">
          <div className="bg-gray-100 h-full p-5">
            <div className="h-auto mx-auto py-2 bg-white shadow-md rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-700">Upload Video</h2>
              </div>
              <div className="divide-y  divide-gray-200">
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <span className="ml-2">Uploading your video, please wait...</span>
                  </div>
                ) : (
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
                      <label className="block p-2">Description</label>
                      <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full border-1 border-gray-200 p-2 rounded"
                        placeholder="Description"
                        required
                      />
                     
                      <label className=" p-2">Publish</label>
                      <input
                        type="checkbox"
                        name="isPublished"
                        checked={isPublished}
                        onChange={(e) => setIsPublished(e.target.checked)}
                        className=" border-1 border-gray-200 p-2 rounded"
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
                      <label className="block p-2">Video File</label>
                      <input
                        type="file"
                        name="videoFile"
                        onChange={(e) => setVideoFile(e.target.files[0])}
                        className="block w-full border-1 border-gray-200 p-2 rounded"
                        required
                      />
                      <label className="block p-2">Thumbnail</label>
                      <input
                        type="file"
                        name="thumbnail"
                        onChange={(e) => setThumbnail(e.target.files[0])}
                        className="block w-full border-1 border-gray-200 p-2 rounded"
                        required
                      />
                      <label className="block p-2">Course</label>
                      <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="border p-2 rounded w-full"
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
                    <div className="flex justify-center">
                      <button type="submit" className="w-32 h-8 text-sm font-semibold bg-yellow-400 text-black border-2 border-slate-300 rounded mr-4">
                        Submit
                      </button>
                      <button type="button" onClick={handleReset} className="w-32 h-8 text-sm font-semibold bg-white text-black border-2 border-slate-300 rounded">
                        Reset
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminUploadVideo;
