import React from "react";
import heroImage from "../../Images/hero-im.png";
import Headers from "../Utility/utils1/Headers";
import { FaPlayCircle } from "react-icons/fa";

const HeroContent = () => {
  return (
    <>
      <div className="min-h-screen bg-blue-50">
        <Headers />
        <div className="flex flex-col-reverse md:flex-row justify-center items-center text-center md:text-left p-6 sm:p-8 lg:p-12 py-8">
          {/* Left Section: Text Content */}
          <div className="flex flex-col justify-center items-center md:items-start md:w-1/2 space-y-6 px-4">
            <p className="text-blue-700 text-sm sm:text-base font-semibold">
              Best E-Learning Platform
            </p>
            <h1 className="text-gray-800 text-3xl text-left sm:text-4xl md:text-5xl font-bold leading-snug">
              <span>Getting</span> <br />
              <span>Best Quality</span> <br />
              <span>Education At Single Click</span>
            </h1>
            <p className="text-[#979fad] text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md md:max-w-lg">
              Discover personalized learning experiences designed to help you
              succeed. Join our community of learners and start your journey
              today.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <a
                href="/courses"
                className="bg-[#ffcf59] font-bold text-gray-900 py-3 px-6 rounded-full hover:bg-[#f3cf39] transition duration-300 text-center"
              >
                Join Courses
              </a>
              <a
                href="/learn-more"
                className="text-gray-900 flex items-center justify-center sm:w-48 font-bold"
              >
                <FaPlayCircle className="bg-white text-blue-600 w-12 h-12 mr-3 rounded-full" />
                See how it works?
              </a>
            </div>
          </div>

          {/* Right Section: Image Content */}
          <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
            <img
              src={heroImage}
              alt="Online Teaching"
              className="w-3/4 sm:w-2/3 md:w-full max-w-md rounded-lg  transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroContent;
