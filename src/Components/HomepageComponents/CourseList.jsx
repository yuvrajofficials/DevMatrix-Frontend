import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure axios is installed
import { BiPurchaseTag } from "react-icons/bi";
import { GrLike } from "react-icons/gr";
import "../../CSS/fetchCourseCard.css"; // Assuming this file contains styles for scrolling animations
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI; // Make sure to replace it with the correct URL

const CourseList = () => {
  const [owner, setOwner] = useState('');
  const [loginData, setLoginData] = useState({});
  const [categories, setCourses] = useState([]);

  useEffect(() => {
    const getLoginInfo = JSON.parse(localStorage.getItem('setLoginInfo'));
    if (getLoginInfo !== null) {
      setLoginData(getLoginInfo);
      setOwner(getLoginInfo.userId); // Set owner when login data is available
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URI}/api/v1/users/get-allcourse`);
        setCourses(response.data.data); // Assuming response.data.data contains courses
        console.log(response.data); // Check the response
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    if (owner) {
      fetchCourses(); // Fetch courses only if owner is set
    }
  }, [owner]);

  return (
    <div className="overflow-hidden w-full py-8">
      {/* Header */}
      <div className="m-4 text-center p-3">
        <p className="text-4xl font-bold text-gray-800">
          Our Trending Courses
        </p>
        <p className="text-lg py-2 text-gray-500">
          We will help you in ways for your personal growth, skill development,
          soft skills, and many more.
        </p>
      </div>

      {/* Scrolling Container */}
      <div className="animate-scroll flex space-x-6 px-4">
        {categories.length > 0 ? (
          categories.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border-[1px] w-72 flex flex-col flex-shrink-0 hover:scale-105 transition-transform duration-300"
            >
              {/* Image */}
              <img
                src={course.thumbnail || "https://via.placeholder.com/300"} // Fallback image if course.img is not available
                alt={course.title}
                className="w-full rounded-t-lg h-48 object-cover"
              />

              {/* Course Details */}
              <div className="p-2">
                <h2 className="text-xl font-semibold text-left text-gray-800">
                  {course.title || "No Title"}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  By: <span className="font-medium">{course.creator || "Unknown"}</span>
                </p>

                {/* Footer: Price, Purchases, and Likes */}
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-lg font-bold text-blue-700">
                    &#x20B9; {course.price || "N/A"}
                  </p>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-1">
                      <BiPurchaseTag className="text-blue-600 w-5 h-5" />
                      <span className="text-sm text-gray-700">
                        {course.purchases || "0"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GrLike className="text-green-600 w-5 h-5" />
                      <span className="text-sm text-gray-700">{course.likes || "0"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No courses available</p>
        )}
      </div>
    </div>
  );
};

export default CourseList;
