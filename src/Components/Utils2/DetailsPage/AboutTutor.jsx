import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import slugify from 'slugify';



const AboutTutor = ({ course }) => {
    console.log(course)
    if (course.tutor) {
      try {
        let tutorId = course.tutor
        const response = axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/get-tutor/${tutorId}`);
        console.log(response.data.data);
  
  
      } catch (error) {
        alert(error);
      }
    } else {
      console.log("No Tutor Data Available")
    }
    const tutor = course.owner;
    return (
      <>
        {
          <>
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-400 h-24">
              <div className="bg-white rounded-lg z-10 shadow-lg p-6 w-80">
                <div className="flex justify-center">
                  <img
                    className="rounded-full w-24 h-24"
                    src={tutor.avatar}
                    alt="Profile"
                  />
                </div>
                <div className="text-center mt-4">
                  <h2 className="text-xl font-bold text-gray-800">{tutor.owner}</h2>
                  <p className="text-gray-600">{tutor.skills || <p> No skills specified</p>}</p>
                  <p className="text-gray-600">{tutor.education || <p>No Education Specified</p>}</p>
                </div>
                <div className="mt-4 flex justify-around text-center text-gray-600">
                  <div>
                    <p className="font-bold text-lg">65</p>
                    <p className="text-sm">Friends</p>
                  </div>
                  <div>
                    <p className="font-bold text-lg">43</p>
                    <p className="text-sm">Photos</p>
                  </div>
                  <div>
                    <p className="font-bold text-lg">21</p>
                    <p className="text-sm">Comments</p>
                  </div>
                </div>
                <div className="flex justify-center mt-6">
                  <button className="bg-pink-500 text-white font-bold py-2 px-4 rounded-full">
                    More Info
                  </button>
                </div>
              </div>
            </div>
          </>
  
          || <p>"No Data Available"</p>}
      </>
    );
  };

  export default AboutTutor;
  
  