import React, { useEffect, useState } from "react";
import DevMatrix_Logo from "../../Images/DevMatrix_Logo.png";
import Headers from '../Utility/utils1/Headers';
import Footer from '../Utils/Footer';
import heroImage from '../../Images/heroImage.jpg';
import '../../CSS/main.css';
import ContactForm from "./ContactForm";
import HeroContent from "../Utils/HeroContent";
import axios from "axios";
import ReviewsSection from "../Utils2/ReviewsSection";

const HeroSection = () => {
  const [isLoggedIn, loginStatus] = useState(false);

  return (
    <>
      
        <HeroContent />
      <CounterBar />
      <ReviewsSection/>
     
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
    
    if(!countData.users){
      fetchData();
  
    }


  return (
    <div className="w-full h-48 bg-white text-black py-4">
      <div className="container mx-auto grid grid-cols-4 gap-4">
        <CounterItem label="Users" value={countData.users + "+"} />
        <CounterItem label="Courses" value={countData.courses + "+"} />
        <CounterItem label="Videos" value={countData.videos + "+"} />
        <CounterItem label="Blogs" value={countData.blogs + "+"} />
      </div>
    </div>
  );
};

const CounterItem = ({ label, value }) => (
  <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded shadow">
    <h1 className="text-3xl font-bold">{value}</h1>
    <p className="text-lg">{label}</p>
  </div>
);

export default HeroSection;