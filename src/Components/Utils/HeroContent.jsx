import React from 'react';
import heroImage from '../../Images/Designer.png';

const HeroContent = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center text-center md:text-left p-4 sm:p-6 lg:p-12 py-8">
      {/* Left Section: Text Content */}
      <div className="flex p-4 flex-col justify-center items-center md:items-start md:w-1/2 space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#28ec8d]">
          Unlock Your Potential with Expert Online Teaching
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-xs sm:max-w-md md:max-w-lg">
          Discover personalized learning experiences designed to help you succeed. Join our community of learners and start your journey today.
        </p>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <a 
            href="/courses" 
            className="bg-[#002333] font-semibold text-white py-3 px-6 w-full sm:w-48 rounded-lg hover:bg-[#163442] transition duration-300 text-center"
          >
            Get Started Now
          </a>
          <a 
            href="/learn-more" 
            className="border-2 border-[#01C567] text-[#01C567] w-full sm:w-48 font-semibold py-3 px-6 rounded-lg hover:bg-[#eafff5] transition duration-300 text-center"
          >
            Learn More
          </a>
        </div>
      </div>
      
      {/* Right Section: Image Content */}
      <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
        <div className="relative w-4/5 sm:w-3/5 md:w-full mx-auto transition-transform duration-500 hover:scale-105">
          <img src={heroImage} alt="Online Teaching" className="w-full rounded-lg shadow-lg border-4 border-yellow-200" />
          <div className="absolute inset-0 border-4 border-white rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export default HeroContent;
