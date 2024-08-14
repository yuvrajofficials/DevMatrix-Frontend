import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        // console.log(response.data.data);
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
      toast.success(response.data.data, { position: "top-right", });
    } catch (error) {
      toast.success("Failed to add to cart", { position: "bottom-right", });

      alert('Failed to add to cart.');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return <Description course={course} />;
      case 'discussion':
        return <Discussion course={course} />;
      case 'aboutTutor':
        return <AboutTutor course={course} />;
      case 'courseContent':
        return <CourseContent course={course} />;
      default:
        return null;
    }
  };

  const handleStartCourse = () => {
    navigate(`/courses/${course._id}`);
  };


  return (
    <>
      <div className='bg-gray-100'>

        <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
          <div className="bg-white rounded-t-lg overflow-hidden shadow-md">
            <div className="flex flex-col md:flex-row">
              {/* Course Thumbnail */}
              <div className="md:w-1/3">
                <img
                  src={course.thumbnail || 'https://res.cloudinary.com/dwq5shjnh/image/upload/v1719284403/mjkyh1an04o4hl7d4ove.png'}
                  alt="Course Thumbnail"
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>

              {/* Course Details */}
              <div className="md:w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-purple-600 uppercase">Getting Started with {course.title}</p>
                  <h2 className="text-2xl font-bold text-gray-800 mt-2">{course.title}</h2>
                  <p className="text-gray-600 mt-4">
                    {course.abstract}
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
                      <span className="ml-2">{course.rating || '4.5'}</span>
                    </div>
                  </div>
                  <div>

                    <button
                      onClick={handleStartCourse}
                      className="bg-white mx-2 w-48 h-12 hover:text-gray-500 hover:border-gray-500 text-purple-700 border-2 border-purple-700 font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={handleStartCourse}
                      className="bg-purple-600 hover:bg-purple-700  w-48 h-12 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ul className="flex bg-[#002333] justify-around text-white">
            <li className={`cursor-pointer py-2 px-4 ${activeTab === 'description' ? 'border-b-2 border-[#01C567] font-bold' : ''}`} onClick={() => setActiveTab('description')}>
              Description
            </li>
            <li className={`cursor-pointer py-2 px-4 ${activeTab === 'courseContent' ? 'border-b-2 border-[#01C567] font-bold' : ''}`} onClick={() => setActiveTab('courseContent')}>
              Course Content
            </li>
            <li className={`cursor-pointer py-2 px-4 ${activeTab === 'discussion' ? 'border-b-2 border-[#01C567] font-bold' : ''}`} onClick={() => setActiveTab('discussion')}>
              Discussions
            </li>
            <li className={`cursor-pointer py-2 px-4 ${activeTab === 'aboutTutor' ? 'border-b-2 border-[#01C567] font-bold' : ''}`} onClick={() => setActiveTab('aboutTutor')}>
              About Tutor
            </li>
          </ul>
          <div className="p-4 bg-white rounded-b-lg shadow-md">
            {renderContent()}
          </div>
        </div>
      </div>
      =
      <ToastContainer />
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
  const [discussion, setDiscussion] = useState('');
  const [discussions, setDiscussions] = useState([]);
  const [loginData, setLoginData] = useState({});
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const getLoginInfo = JSON.parse(localStorage.getItem('setLoginInfo'));
    if (getLoginInfo != null) {
      setLoginData(getLoginInfo);
      setUserId(getLoginInfo.userId);
    }
  }, []);

  useEffect(() => {
    if (course) {
      fetchCourseDetails();
    }
  }, [course]);

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${course._id}`);
      setDiscussions(response.data[0].discussions || []);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const handleReset = () => {
    setDiscussion('');
  };

  const handleDiscussion = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${course._id}/save-discussion`,
        { userId, discussion },
        {
          headers: {
            Authorization: `Bearer ${loginData.token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setDiscussion('');
      fetchCourseDetails(); // Refresh the comments after adding a new comment
    } catch (error) {
      console.error('Error saving Discussion:', error);
    }
  };

  if (!course) {
    return <p>Course data not found</p>;
  }

  return (
    <>
      <div className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Discussions</h2>

        <form className="my-4">
          <textarea
            className="w-full border-2 rounded p-2"
            value={discussion}
            onChange={(e) => setDiscussion(e.target.value)}
            rows={5}
            placeholder="Share your experience..."
          />
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleDiscussion}
              className="w-32 h-8 text-sm font-semibold bg-gradient-to-r from-yellow-100 to-yellow-300 text-black border-2 border-slate-300 rounded mr-4"
            >
              Share
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-32 h-8 text-sm font-semibold bg-white text-black border-2 border-slate-300 rounded"
            >
              Reset
            </button>
          </div>
        </form>
        {discussions.length === 0 && <p className="text-gray-500">No discussions yet. Be the first to share!</p>}
        {discussions.map((discussionData, index) => (
          <div key={index} className="mb-4 px-4 py-2 border rounded-lg">
            <div className="flex items-center mb-2">
              <img
                src={'default-avatar-url'}
                alt="user-avatar"
                className="w-10 h-10 border-1 rounded-full mr-2"
              />
              <p className="font-semibold">Username</p> {/* Replace with actual username if available */}
              <div className='flex justify-content-end'>
                <p className="text-gray-500 text-sm">Posted on: {new Date(discussionData.date).toLocaleString().split(',')[0]}</p>
              </div>
            </div>
            <p>{discussionData.discussion}</p>
          </div>
        ))}
      </div>
    </>
  );
};


const AboutTutor = ({ course }) => {
  console.log(course)
  if (course.tutor) {
    try {
      let tutorId = course.tutor
      const response = axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/get-tutor/${tutorId}`);
      console.log(response.data.data);


    } catch (error) {
      alert(error);
    }
  } else {
    console.log("No Tutor Data Available")
  }
  const tutor = course.owner;
  return (
    <>
      {
        <>
          <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-400 to-orange-400 h-24">
            <div className="bg-white rounded-lg z-10 shadow-lg p-6 w-80">
              <div className="flex justify-center">
                <img
                  className="rounded-full w-24 h-24"
                  src={tutor.avatar}
                  alt="Profile"
                />
              </div>
              <div className="text-center mt-4">
                <h2 className="text-xl font-bold text-gray-800">{tutor.owner}</h2>
                <p className="text-gray-600">{tutor.skills || <p> No skills specified</p> }</p>
                <p className="text-gray-600">{tutor.education || <p>No Education Specified</p>}</p>
              </div>
              <div className="mt-4 flex justify-around text-center text-gray-600">
                <div>
                  <p className="font-bold text-lg">65</p>
                  <p className="text-sm">Friends</p>
                </div>
                <div>
                  <p className="font-bold text-lg">43</p>
                  <p className="text-sm">Photos</p>
                </div>
                <div>
                  <p className="font-bold text-lg">21</p>
                  <p className="text-sm">Comments</p>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button className="bg-pink-500 text-white font-bold py-2 px-4 rounded-full">
                  More Info
                </button>
              </div>
            </div>
          </div>
        </>

        || <p>"No Data Available"</p>}
    </>
  );
};

const CourseContent = ({ course }) => {
  if (!course || !course.modules || course.modules.length === 0) {
    return <p>No modules available for this course.</p>;
  }

  return (
    <>
      {course.modules.map((module) => (
        <div key={module._id} className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{module.title}</h2>
          {module.videos && module.videos.length > 0 ? (
            module.videos.map((video) => (
              <div key={video._id} className="mb-4 pl-4">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">{video.title}</h3>
                <video controls width="100%">
                  <source src={video.videoFile} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="text-gray-700 mt-2">{video.description}</p>
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
