import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import slugify from 'slugify';


const CourseContent = ({ course }) => {
    const [completeCourseDetails, setCompleteCourseDetails] = useState([]);
    const [expandedModule, setExpandedModule] = useState(null);
    const courseId = course._id;
  
    const toggleModule = (moduleIndex) => {
      setExpandedModule(expandedModule === moduleIndex ? null : moduleIndex);
    };
  
    useEffect(() => {
      const getCourseDetails = async () => {
        try {
          const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
          const accessToken = getLoginInfo?.token;
  
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/mylearning/get-course-details`,
            { courseId },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
  
          setCompleteCourseDetails(response.data.data[0].modules);
          console.log(response.data.data[0].modules);
        } catch (error) {
          alert('Failed to fetch course details.');
        }
      };
  
      getCourseDetails();
    }, [courseId]);
  
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6 text-gray-700">{course.title}</h1>
        {completeCourseDetails && completeCourseDetails.length > 0 ? (
          completeCourseDetails.map((module, index) => (
            <div key={index} className="mb-3">
              <div
                className="flex justify-between items-center p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-300"
                onClick={() => toggleModule(index)}
              >
                <h2 className="font-semibold text-md text-gray-800">{module.module.title}</h2>
                <span className="text-2xl text-gray-500">{expandedModule === index ? '-' : '+'}</span>
              </div>
              {expandedModule === index && (
                <div className="mt-2 bg-gray-50 p-2 mx-2 rounded-lg shadow-lg">
                  {module.videos && module.videos.length > 0 ? (
                    module.videos.map((video) => (
                      <div
                        key={video._id}
                        className="flex items-center border-b-2 p-1 hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-lg"
                      >
                        <img src={video.thumbnail} alt="thumbnail" className="w-20 h-10 rounded-lg shadow-md" />
                        <div className="ml-4 ">
                          <p className="font-semibold text-sm text-gray-700">{video.title}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No videos available in this module.</p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No modules available.</p>
        )}
      </div>
    );
  };


  export default CourseContent;
  