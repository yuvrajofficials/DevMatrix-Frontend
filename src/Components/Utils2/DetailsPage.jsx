import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import slugify from 'slugify';

import Discussions from './DetailsPage/Discussions';
import Description from './DetailsPage/Description';
import CourseContent from './DetailsPage/CourseContent';
import AboutInstructor from './DetailsPage/AboutInstructor';
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;


const DetailsPage = () => {
  const location = useLocation();
  const { course } = location.state;
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({});
  const [userId, setUserId] = useState('');
  const [courseId, setCourseId] = useState(course?._id || '');
  const [courseDetails, setCourseDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [isPurchased, setIsPurchased] = useState(0);

  useEffect(() => {
    const storedLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
    if (storedLoginInfo) {
      setLoginData(storedLoginInfo);
      setIsPurchased(storedLoginInfo.mycourses.includes(courseId));

      setUserId(storedLoginInfo.userId);
    }

    if (course?._id) {
      fetchCourseDetails(storedLoginInfo?.token);
    }
  }, [course]);

  const fetchCourseDetails = async (token) => {
    try {
      const response = await axios.post(
        `${BACKEND_URI}/api/v1/users/get-course-details`,
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCourseDetails(response.data.data);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URI}/api/v1/users/save-addtocart`,
        { courseId, userId },
        { headers: { Authorization: `Bearer ${loginData.token}` } }
      );
      console.log(response.data);
      const updatedLoginInfo = { ...loginInfo, mycourses: [...loginInfo.mycourses, response.data._id] };
      localStorage.setItem("setLoginInfo", JSON.stringify(updatedLoginInfo));

      toast.success("Course added to cart!", { position: "top-right" });
    } catch (error) {
      toast.error("Failed to add to cart", { position: "bottom-right" });
    }
  };

  const handleStartCourse = () => {
    if (!isPurchased) {
      navigate('/courses/detailspage/payments', { state: { course } });
    } else {
      const courseSlug = slugify(course.title, { lower: true, trim: true });
      navigate(`/user/mycourses/mylearning/${courseSlug}/${courseId}`);
    }
  };

  const dummyCourse = { tutor: "12345" }; // Simulated tutor data

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return <Description course={course} />;
      case 'discussion':
        return <Discussions course={course} />;
      case 'aboutTutor':
        return <AboutInstructor course={dummyCourse} />;
      case 'courseContent':
        return <CourseContent course={course} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex bg-blue-50 justify-center py-8">
        <div className="bg-white min-h-screen max-w-5xl rounded-xl p-6">
        <div className="bg-white p-2">
          {/* Course Card */}
          <div className="border-b mb-4 pb-4 ">
            <div className="flex flex-col md:flex-row">
              {/* Thumbnail */}
              <div className="md:w-1/3">
                <img
                  src={course.thumbnail || 'https://via.placeholder.com/400'}
                  alt="Course Thumbnail"
                  className="w-full rounded-lg h-56 object-cover"
                />
              </div>

              {/* Course Details */}
              <div className="md:w-2/3 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{course.title}</h2>
                  <p className="text-gray-600 mt-2">{course.abstract}</p>
                  <p className="text-xl font-semibold text-blue-500 mt-4">${course.price}</p>
                </div>

                {/* Course Actions */}
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-4 text-gray-600">
                    <span className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12h6v2H9v-2zm0-4h6v2H9V8zm0-4h6v2H9V4zM5 4h2v12H5V4z" />
                      </svg>
                      <span className="ml-2">{course.duration || '13H'}</span>
                    </span>
                    <span className="flex items-center">
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.24 3.813a1 1 0 00.95.69h4.022c.969 0 1.371 1.24.588 1.81l-3.267 2.375a1 1 0 00-.364 1.118l1.24 3.813c.3.921-.755 1.688-1.54 1.118L10 13.348l-3.267 2.375c-.785.57-1.84-.197-1.54-1.118l1.24-3.813a1 1 0 00-.364-1.118L2.803 9.24c-.784-.57-.38-1.81.588-1.81h4.022a1 1 0 00.95-.69l1.24-3.813z" />
                      </svg>
                      <span className="ml-2">{course.rating || '4.5'}</span>
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={handleAddToCart}
                      className="bg-blue-100 text-blue-700 border border-blue-500 font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white transition"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={handleStartCourse}
                      className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                    >
                      {isPurchased ? 'Start Learning' : 'Buy Now'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Content Section */}
          <div>
          <div className='border-b mb-4 '>
            <Description course={course} />
            </div>
      
          <div className='border-b mb-4 pb-4'>
            <CourseContent course={course} />
            </div>
      
          
      
          <div className=''>
            <AboutInstructor course={dummyCourse} />

          </div>
          </div>
        </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default DetailsPage;
