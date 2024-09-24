import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import slugify from 'slugify';
import Discussions from './DetailsPage/Discussions';
import Description from './DetailsPage/Description';
import CourseContent from './DetailsPage/CourseContent';
import AboutTutor from './DetailsPage/AboutTutor';

const DetailsPage = () => {
  const location = useLocation();
  const { course } = location.state;
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({});
  const [userId, setUserId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courseDetails, setCourseDetails] = useState(null);
  const [CourseThumbnail, setCourseThumbnail] = useState('https://res.cloudinary.com/dwq5shjnh/image/upload/v1719284403/mjkyh1an04o4hl7d4ove.png');
  const [activeTab, setActiveTab] = useState('description');
  const [myPurchasedCourses, setMyPurchasedCourses] = useState([]);
  const [isPurchased, setIsPurchased] = useState(0);
  const [checkPuchaseCalled, setIsCheckPuchaseCalled] = useState(false);

  useEffect(() => {
    const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
    if (getLoginInfo) {
      setLoginData(getLoginInfo);
      setUserId(getLoginInfo.userId);
    }
    setCourseId(course._id);

    const fetchCourseDetails = async () => {
      const accessToken = getLoginInfo?.token;
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/get-course-details`,
          { courseId: course._id },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        setCourseDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [course]);

  useEffect(() => {
    const isCourseAlreadyPurchased = async () => {
      try {
        const accessToken = loginData?.token;
        const info = JSON.parse(localStorage.getItem("setLoginInfo"));
        const user_id = info.userId;

        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/get-purchased-course`,
          { userId: user_id },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        setMyPurchasedCourses(response.data.data[0].mycourses);

        if (myPurchasedCourses.includes(courseId)) {
          setIsPurchased(1);
        }

      } catch (error) {
        console.error("An error occurred while fetching purchased courses:", error);
      }
    };
    isCourseAlreadyPurchased();
  });

  const handlePurchaseClick = (course) => {
    navigate('/courses/detailspage/payments', { state: { course } });
  };

  const handleAddToCart = async () => {
    try {
      const accessToken = loginData.token;
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/save-addtocart`,
        { courseId, userId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      toast.success(response.data.data, { position: "top-right", });
    } catch (error) {
      toast.error("Failed to add to cart", { position: "bottom-right", });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return <Description course={course} />;
      case 'discussion':
        return <Discussions course={course} />;
      case 'aboutTutor':
        return <AboutTutor course={course} />;
      case 'courseContent':
        return <CourseContent course={course} />;
      default:
        return null;
    }
  };

  const handleStartCourse = () => {
    if (isPurchased === 0) {
      navigate('/courses/detailspage/payments', { state: { course } })
    } else {
      let slugOfTitle = slugify(course.title, {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: false,
        locale: 'vi',
        trim: true
      });

      navigate(`/mylearning/${slugOfTitle}/${courseId}`);
    }
  };

  return (
    <>
      <div className='bg-gray-100 p-4 md:p-8'>

        <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-8">
          <div className="flex flex-col md:flex-row">
            {/* Course Thumbnail */}
            <div className="md:w-1/3">
              <img
                src={course.thumbnail || 'https://res.cloudinary.com/dwq5shjnh/image/upload/v1719284403/mjkyh1an04o4hl7d4ove.png'}
                alt="Course Thumbnail"
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Course Details */}
            <div className="md:w-2/3 p-6 flex flex-col justify-between">
              <div>
                <p className="text-sm text-purple-600 uppercase">Getting Started with {course.title}</p>
                <h2 className="text-3xl font-bold text-gray-800 mt-2">{course.title}</h2>
                <p className="text-gray-600 mt-4">
                  {course.abstract}
                </p>
                <p className="text-gray-600 mt-4">
                  {course.price}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12h6v2H9v-2zm0-4h6v2H9V8zm0-4h6v2H9V4zM5 4h2v12H5V4z" />
                    </svg>
                    <span className="ml-2">{course.duration || '13H'}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.24 3.813a1 1 0 00.95.69h4.022c.969 0 1.371 1.24.588 1.81l-3.267 2.375a1 1 0 00-.364 1.118l1.24 3.813c.3.921-.755 1.688-1.54 1.118L10 13.348l-3.267 2.375c-.785.57-1.84-.197-1.54-1.118l1.24-3.813a1 1 0 00-.364-1.118L2.803 9.24c-.784-.57-.38-1.81.588-1.81h4.022a1 1 0 00.95-.69l1.24-3.813z" />
                    </svg>
                    <span className="ml-2 sm:block">{course.rating || '4.5'}</span>
                    
                  </div>
                </div>
                <div className="flex space-x-2 lg:block">
                  <button
                    onClick={handleAddToCart}
                    className="bg-white w-40 h-10 hover:text-gray-500 hover:border-gray-500 text-purple-700 border-2 border-purple-700 font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleStartCourse}
                    className="bg-purple-600 hover:bg-purple-700 w-40 h-10 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                  >
                    {isPurchased ? 'Start Learning' : 'Buy Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>



        <ul className="flex bg-[#002333] justify-around text-white">
          <li className={`cursor-pointer py-2 px-4 ${activeTab === 'description' ? 'border-b-2 border-purple-600 font-bold' : ''}`} onClick={() => setActiveTab('description')}>
            Description
          </li>
          <li className={`cursor-pointer py-2 px-4 ${activeTab === 'courseContent' ? 'border-b-2 border-purple-600 font-bold' : ''}`} onClick={() => setActiveTab('courseContent')}>
            Course Content
          </li>
          <li className={`cursor-pointer py-2 px-4 ${activeTab === 'discussion' ? 'border-b-2 border-purple-600 font-bold' : ''}`} onClick={() => setActiveTab('discussion')}>
            Discussions
          </li>
          <li className={`cursor-pointer py-2 px-4 ${activeTab === 'aboutTutor' ? 'border-b-2 border-purple-600 font-bold' : ''}`} onClick={() => setActiveTab('aboutTutor')}>
            About Tutor
          </li>
        </ul>
        <div className="p-4 bg-white rounded-b-lg shadow-md">
          {renderContent()}
        </div>
      </div>
    
<ToastContainer />
    </>
  );
};



export default DetailsPage;
