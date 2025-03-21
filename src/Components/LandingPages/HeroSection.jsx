import React, { useEffect, useState } from "react";
import "../../CSS/main.css";
import HeroContent from "../Utils/HeroContent";
import axios from "axios";
import Footers from "../Utility/utils1/Footers";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;
import { FaUsers, FaBook, FaVideo, FaBlog } from "react-icons/fa"; // Importing icons

const HeroSection = ({ children }) => {
  return (
    <>
      <HeroContent />
      <CounterBar />
      <div>{children}</div>
      <Footers />
    </>
  );
};

export const CounterBar = () => {
  const [countData, setCountData] = useState({
    users: 0,
    courses: 0,
    videos: 0,
    blogs: 0,
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URI}/api/v1/users/countdata`);
      setCountData(response.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (!countData.users) {
      fetchData();
    }
  }, [countData]);

  return (
    <div className="w-full py-8 bg-blue-600">
      <div className="max-w-screen-lg mx-auto flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 space-y-6 sm:space-y-0">
        {/* Counter Items */}
        <CounterItem
          icon={<FaUsers className="text-white w-8 h-8 sm:w-10 sm:h-10 mb-2" />}
          label="Users"
          value={countData.users + "+"}
          description="Active users enrolled"
        />

        {/* Divider */}
        <div className="hidden sm:block w-[2px] h-12 bg-white"></div>

        <CounterItem
          icon={<FaBook className="text-white w-8 h-8 sm:w-10 sm:h-10 mb-2" />}
          label="Courses"
          value={countData.courses + "+"}
          description="Available courses"
        />

        <div className="hidden sm:block w-[2px] h-12 bg-white"></div>

        <CounterItem
          icon={<FaVideo className="text-white w-8 h-8 sm:w-10 sm:h-10 mb-2" />}
          label="Videos"
          value={countData.videos + "+"}
          description="Educational videos"
        />

        <div className="hidden sm:block w-[2px] h-12 bg-white"></div>

        <CounterItem
          icon={<FaBlog className="text-white w-8 h-8 sm:w-10 sm:h-10 mb-2" />}
          label="Blogs"
          value={countData.blogs + "+"}
          description="Informative blogs"
        />
      </div>
    </div>
  );
};

const CounterItem = ({ icon, label, value, description }) => (
  <div className="flex flex-col items-center justify-center text-center space-y-2 p-2 transition-shadow duration-300">
    {icon}
    <div className="flex items-center">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-50 mr-1">{value}</h1>
      <span className="text-sm sm:text-lg font-semibold text-gray-50">{label}</span>
    </div>
    <p className="text-xs sm:text-sm text-gray-50">{description}</p>
  </div>
);

export default HeroSection;
