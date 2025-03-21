import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

const CourseContent = ({ course }) => {
  const [modules, setModules] = useState([]);
  const [expandedModule, setExpandedModule] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const toggleModule = (index) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const storedLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
        const accessToken = storedLoginInfo?.token;

        const response = await axios.post(
          `${BACKEND_URI}/api/v1/users/mylearning/get-course-details`,
          { courseId: course._id },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        setModules(response.data.data[0].modules || []);
      } catch (error) {
        console.error('Failed to fetch course details', error);
      }
    };

    fetchCourseDetails();
  }, [course._id]);

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center">

        <h1 className="text-xl font-bold text-gray-800">Course Content</h1>
        <div
          onClick={toggleVisibility}
          className="text-blue-500 hover:text-blue-700 transition-all"
        >
          {isVisible ? <> <RiArrowDropUpLine className='w-8 h-8' /> </> : <RiArrowDropDownLine className='w-8 h-8' />}
        </div>

      </div>

      {/* Modules List */}
      <div className={`${isVisible ? "block" : "hidden"} px-8 mt-4`}>
        {modules.length > 0 ? (
          modules.map((module, index) => (
            <div key={index} className="mb-4 ">
              {/* Module Header */}
              <div
                className="flex justify-between items-center bg-blue-100 text-blue-700 p-3 rounded-lg cursor-pointer hover:bg-blue-200 transition-all"
                onClick={() => toggleModule(index)}
              >
                <h2 className="font-semibold">{module.module.title}</h2>
                <span className="text-xl">{expandedModule === index ? '−' : '+'}</span>
              </div>

              {/* Videos List */}
              {expandedModule === index && (
                <div className="bg-gray-100 m-8  mt-2">
                  {module.videos.length > 0 ? (
                    module.videos.map((video) => (
                      <div
                        key={video._id}
                        className="flex items-center gap-3 p-2 border-b hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
                      >
                        <img src={video.thumbnail} alt="Thumbnail" className="w-16 h-10 rounded-md shadow" />
                        <p className="font-medium text-gray-700">{video.title}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No videos available.</p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No modules available.</p>
        )}
      </div>
    </div>
  );
};

export default CourseContent;
