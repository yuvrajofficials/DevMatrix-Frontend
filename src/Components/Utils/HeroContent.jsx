import React from 'react'
import heroImage from '../../Images/heroImage.jpg'

const HeroContent = () => {
  return (
   <>
     <div className="bg-gradient-to-r from-yellow-50 to-yellow-200 h-screen flex flex-col md:flex-row justify-center items-center text-center md:text-left p-6">
      <div className="flex flex-col justify-center items-center md:items-start md:w-1/2">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Unlock Your Potential with Expert Online Teaching
        </h1>
        <p className="text-lg text-gray-700 mb-6 max-w-lg">
          Discover personalized learning experiences designed to help you succeed. Join our community of learners and start your journey today.
        </p>
        <div className="flex space-x-4 mb-4">
          <a href="/get-started" className="bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-yellow-600 transition duration-300">
            Get Started Now
          </a>
          <a href="/learn-more" className="text-yellow-500 bg-white border border-yellow-500 px-6 py-3 rounded-full hover:bg-yellow-50 transition duration-300">
            Learn More
          </a>
        </div>
      </div>
      <div className="mt-8 md:mt-0 md:w-1/2">
        <div className="relative w-3/4 h-auto mx-auto transform transition-transform duration-500 hover:scale-105">
          <img src={heroImage} alt="Online Teaching" className="w-full h-auto rounded-lg shadow-lg border-4 border-yellow-200"/>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-white rounded-lg"></div>
        </div>
      </div>
    </div>
   </>
  )
}

export default HeroContent
