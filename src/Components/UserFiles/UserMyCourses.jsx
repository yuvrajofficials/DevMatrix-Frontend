import React, { useState, useEffect } from "react";
import slugify from "slugify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../CSS/utils.css";
import DashboardHeader from "./UserDashboardHeader";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const UserMyCourses = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({});
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
    if (getLoginInfo) {
      setLoginData(getLoginInfo);
      fetchCourses(getLoginInfo.userId);
    }
  }, []);

  const fetchCourses = async (userId) => {
    try {
      const response = await axios.post(`${BACKEND_URI}/api/v1/users/get-purchased-courses`, {
        userId: userId,
      });
      setCourses(response.data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleResetCategoryClick = () => {
    setSelectedCategory("");
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? course.category === selectedCategory : true)
  );

  const handleLearningClick = (course) => {
    const courseSlug = slugify(course.title, { lower: true, trim: true });
    navigate(`/user/mycourses/${courseSlug}/${course._id}`, { state: { course } });
  };

  return (
    <>
      <DashboardHeader>
        <div className="container mx-auto px-4 py-8">
          {/* Header & Search Bar */}
          <div className="mb-6 flex flex-col lg:flex-row justify-between items-center">
            <h1 className="text-3xl font-semibold text-gray-800">My Purchases</h1>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full lg:w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search for a course..."
            />
          </div>

          {/* Categories */}
          <div className="flex overflow-x-auto scrollbar-hide space-x-4 py-2">
            <button
              onClick={handleResetCategoryClick}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                selectedCategory === "" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              All Categories
            </button>
            {["Web Development", "Data Science", "Cloud Computing", "Cyber Security", "Marketing"].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:mx-8 mt-6">
            {filteredCourses.map((course) => (
              <div key={course._id} className="bg-blue-50 border border-gray-200 rounded-2xl shadow-sm hover:shadow-2xl transition duration-300">
                <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900">{course.title}</h2>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-600 text-sm">By {course.creator}</p>
                    <button
                      onClick={() => handleLearningClick(course)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                    >
                      Start Learning
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardHeader>
    </>
  );
};

export default UserMyCourses;
