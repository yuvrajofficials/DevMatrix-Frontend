import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetailsPage = () => {
  const location = useLocation();
  const { course } = location.state;
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({});
  const [userId, setUserId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courseDetails, setCourseDetails] = useState(null);
  const [CourseThumbnail, setCourseThumbnail] = useState('https://res.cloudinary.com/dwq5shjnh/image/upload/v1719284403/mjkyh1an04o4hl7d4ove.png');
  const [activeTab, setActiveTab] = useState('courseContent');

  useEffect(() => {
    const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
    if (getLoginInfo) {
      setLoginData(getLoginInfo);
      setUserId(getLoginInfo.userId);
    }
    setCourseId(course._id);

    // Fetch course details once
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
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [course]);

  const handlePurchaseClick = (course) => {
    navigate('/courses/detailspage/payments', { state: { course } });
  };

  const handleAddToCart = async () => {
    try {
      const accessToken = loginData.token; // Assuming token is stored in loginData
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/save-addtocart`,
        { courseId, userId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      console.log(response.data)
      alert(response.data.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart.');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return <Description course={courseDetails} />;
      case 'discussion':
        return <Discussion course={courseDetails} />;
      case 'aboutTutor':
        return <AboutTutor course={courseDetails} />;
      case 'courseContent':
        return <CourseContent course={courseDetails} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="w-full h-full flex items-center justify-center py-12 bg-gray-100">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="md:col-span-1">
              <img src={course.thumbnail || CourseThumbnail} alt="Course Thumbnail" className="w-128 h-72 object-cover" />
            </div>
            <div className="p-6 md:col-span-1 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{course.title}</h1>
                <h2 className="text-xl text-gray-600 mb-4">By {course.tutor}</h2>
                <p className="text-lg text-gray-800 mb-2"><span className="font-semibold">Price:</span> ${course.price}</p>
              </div>
              <div className="mt-6 flex">
                <button onClick={() => handlePurchaseClick(course)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-yellow-500 font-semibold py-2 px-4 rounded-lg mr-4 transition duration-300 ease-in-out"
                >
                  Purchase
                </button>
                <button
                  onClick={handleAddToCart}
                  className="bg-gray-200 hover:bg-gray-300 text-black border-2 border-gray-300 font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-4 border-b border-gray-200">
            <ul className="flex justify-around">
              <li className={`cursor-pointer py-2 px-4 ${activeTab === 'description' ? 'border-b-2 border-yellow-300 font-bold' : ''}`} onClick={() => setActiveTab('description')}>
                Description
              </li>
              <li className={`cursor-pointer py-2 px-4 ${activeTab === 'courseContent' ? 'border-b-2 border-yellow-300 font-bold' : ''}`} onClick={() => setActiveTab('courseContent')}>
                Course Content
              </li>
              <li className={`cursor-pointer py-2 px-4 ${activeTab === 'discussion' ? 'border-b-2 border-yellow-300 font-bold' : ''}`} onClick={() => setActiveTab('discussion')}>
                Discussions
              </li>
              <li className={`cursor-pointer py-2 px-4 ${activeTab === 'aboutTutor' ? 'border-b-2 border-yellow-300 font-bold' : ''}`} onClick={() => setActiveTab('aboutTutor')}>
                About Tutor
              </li>
            </ul>
          </div>
          <div className="p-4 bg-white border rounded-lg shadow-md">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

const Description = ({ course }) => {
  return (
    <>
      {course ? (
        <>
          <h1>Description</h1>
          <p>{course.title}</p>
          <div dangerouslySetInnerHTML={{ __html: course.description }} />
        </>
      ) : (
        <p>Error in getting data</p>
      )}
    </>
  );
};

const Discussion = ({ course }) => {
  return (
    <>
      <h1>Discussions</h1>
      {/* Add discussion related data here if needed */}
    </>
  );
};

const AboutTutor = ({ course }) => {
  return (
    <>
      <h1>About the Tutor</h1>
      <p>{course.tutor}</p>
    </>
  );
};

const CourseContent = ({ course }) => {
  if (!course || course.length === 0) {
    return <p>No modules available for this course.</p>;
  }

  return (
    <>
      {course.map((module) => (
        <div key={module._id} className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{module.title}</h2>
          {module.videos && module.videos.length > 0 ? (
            module.videodetails.map((videodetails) => (
              <div key={videodetails._id} className="mb-4 pl-4">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">{videodetails.title}</h3>
                <video controls width="100%">
                  <source src={videodetails.videoFile} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="text-gray-700 mt-2">{videodetails.description}</p>
                <p>{videodetails.videoFile}</p>
              </div>
            ))
          ) : (
            <p>No videos available in this module.</p>
          )}
        </div>
      ))}
    </>
  );
};

export default DetailsPage;
