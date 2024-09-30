import React, { useEffect, useState } from "react";
import '../../CSS/main.css';
import HeroContent from "../Utils/HeroContent";
import axios from "axios";
import ReviewsSection from "../Utils2/ReviewsSection";
import Headers from "../Utility/utils1/Headers";
import Footers from "../Utility/utils1/Footers";

const HeroSection = ({ children }) => {
  const [isLoggedIn, loginStatus] = useState(false);

  return (
    <>
      <Headers />
      <HeroContent />
      <CounterBar />
      {/* <ReviewsSection /> */}
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
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/countdata`);
      setCountData(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Only fetch data if not already fetched
  useEffect(() => {
    if (!countData.users) {
      fetchData();
    }
  }, [countData]);

  return (
    <div className="w-full py-4 bg-[#002333] text-white">
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <CounterItem label="Users" value={countData.users + "+"} />
        <CounterItem label="Courses" value={countData.courses + "+"} />
        <CounterItem label="Videos" value={countData.videos + "+"} />
        <CounterItem label="Blogs" value={countData.blogs + "+"} />
      </div>
    </div>
  );
};

const CounterItem = ({ label, value }) => (
  <div className="flex flex-col items-center justify-center bg-[#00414d] p-4 rounded shadow hover:bg-[#005965] transition duration-300">
    <h1 className="text-lg sm:text-xl font-bold">{value}</h1>
    <p className="text-sm sm:text-lg">{label}</p>
  </div>
);

export default HeroSection;
