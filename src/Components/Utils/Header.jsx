import React, { useState, useEffect } from "react";
import { useNavigate,NavLink } from "react-router-dom"; // Assuming you're using React Router

import DevMatrix_Logo from "../../Images/DevMatrix_Logo.png";
import Header from "../Utils/Header";
import Footer from "../Utils/Footer";
import "../../CSS/utils.css";
import LoginAuth from "./LoginAuth";

const Headers = () => {

  const [isLoggedIn, setLoginStatus] = useState(false); // Initialize isLoggedIn with false
  const [loginData, setLoginData] = useState({}); // Initialize isLoggedIn with false



  useEffect(() => {    // Check if access token exists in localStorage on component mount
    const getAccessToken = localStorage.getItem('accessToken');
    const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));

    
    if (getAccessToken == null || getLoginInfo == null) {
      
      setLoginStatus(false);
    
    } else {
      setLoginData(getLoginInfo);
      setLoginStatus(true);
    }
  }, []); 


  const navigate = useNavigate();

  const navigateTo = (routeNo) => {
    switch (routeNo) {
      case 1:
        navigate('/');
        break;
      case 2:
        navigate('/courses');
        break;
      case 3:
        navigate('/blogs');
        break;
      case 4:
        navigate('/about');
        break;
      case 5:
        navigate('/contact');
        break;
     
      default:
        navigate('*');
        break;
    }
  };

  return (
    <>
      <header>
        <div className="flex w-full bg-gray-50 ">
          <div className="flex-none w-1/5 flex justify-center items-center">
            <img className="w-2/3 p-2" src={DevMatrix_Logo} alt="DevMatrix" />
          </div>
          <div className="flex-auto w-3/5  ">
            <ul className="flex justify-center items-center p-4">
              <li
                onClick={() => navigateTo(1)}
                className="ulListItems hover:cursor-pointer flex-none w-24 p-4 m-2 font-medium text-sm"
              >
                Home
              </li>
              <li
                onClick={() => navigateTo(2)}
                className="ulListItems hover:cursor-pointer flex-none w-24 p-4 m-2 font-medium text-sm"
              >
                Courses
              </li>
              <li
                onClick={() => navigateTo(3)}
                className="ulListItems hover:cursor-pointer flex-none w-24 p-4 m-2 font-medium text-sm"
              >
                Blogs
              </li>
              <li
                onClick={() => navigateTo(4)}
                className="ulListItems hover:cursor-pointer flex-none w-24 p-4 m-2 font-medium text-sm"
              >
                About
              </li>
              <li
                onClick={() => navigateTo(5)}
                className="ulListItems hover:cursor-pointer flex-none w-24 p-4 m-2 font-medium text-sm"
              >
                Contact
              </li>
            </ul>
          </div>

         <LoginAuth/>
        
        </div>
      </header>
    </>
  );
};

export default Headers;
