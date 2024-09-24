import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom"; // Assuming you're using React Router
import { IoLogOut, IoPerson } from "react-icons/io5";
import { RiDashboard3Fill } from "react-icons/ri";

const AuthCheck = () => {
  const [isLoggedIn, setLoginStatus] = useState(false); // Initialize isLoggedIn with false
  const [loginData, setLoginData] = useState({}); // Initialize isLoggedIn with false
  const [userLoginType, setLoginType] = useState();

  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  useEffect(() => {
    // Check if access token exists in localStorage on component mount
    const getAccessToken = localStorage.getItem('accessToken');
    const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));


    if (getAccessToken == null || getLoginInfo == null) {

      setLoginStatus(false);

    } else {
      setLoginStatus(true);
      setLoginData(getLoginInfo);
      if (getLoginInfo.logintype === 2) {
        setLoginType("admin")
      }
      else if (getLoginInfo.logintype === 1) {
        setLoginType("teacher")
      }
      else {
        setLoginType("user")
      }
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const navigateTo = (routeNo) => {
    switch (routeNo) {

      case 11:
        navigate('/login');
        break;
      case 12:
        navigate('/register');
        break;
      case 13:
        navigate('/userdashboard');
        break;
      case 14:
        handleLogout(); // Logout case
        break;
      default:
        navigate('*');
        break;
    }
  };

  const handleLogout = () => {
    try {
      clearTimeout();
      localStorage.removeItem('setLoginInfo');
      // Remove login info from localStorage
      alert('Logout successful');

      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Logout failed');
    }
  };
  return (
    <>

      <div className="flex-none  flex justify-end items-center">
        {isLoggedIn ? (
          <>
            <div className="relative">
              <div onClick={toggleDropdown} className="flex items-center cursor-pointer w-32">
                <p className="font-bold text-[#01ff85] text-sm truncate">
                  {loginData.username}
                </p>
                <img src={loginData.thumbnail} className="w-8 h-8 rounded-full ml-auto" />
              </div>



              {dropdownOpen && (
                <div className="absolute z-10 cursor-pointer right-0 mt-2 w-48  bg-[#002333] border border-gray-200 rounded-md shadow-lg">
                  <NavLink to={`/${userLoginType}/dashboard`}
                    className="text-white  font-semibold w-auto  flex items-center h-10 p-2 text-sm rounded-md hover:bg-[#01ff85] hover:mx-0 hover:text-[#002333]">

                    <RiDashboard3Fill className="h-4 w-4" /><span className="p-1 ">Dashboard</span>
                  </NavLink>
                  <NavLink to="/user/profile"
                    className="text-white  font-semibold w-auto  flex items-center h-10 p-2 text-sm rounded-md hover:bg-[#01ff85]  hover:mx-0   hover:text-[#002333]">

                    <IoPerson className="h-4 w-4" /><span className="p-1 "> Profile</span>
                  </NavLink>
                  <button
                    onClick={() => navigateTo(14)}
                    className="text-white  font-semibold w-full  flex items-center h-10 p-2 text-sm rounded-md hover:bg-[#01ff85]   hover:text-[#002333]">
                    <IoLogOut className="h-6 w-6  " /> <span className="p-1">Log Out</span>
                  </button>
                </div>
              )}
            </div>




          </>
        ) : (
          <>
            <div className="flex ">
              <button
                onClick={() => navigateTo(11)}
                className=" text-white border-2 border-slate-500 font-semibold w-24 h-10 m-2 text-sm rounded-md"
              >
                Log In
              </button>
              <button
                onClick={() => navigateTo(12)}
                className="bg-[#01ff85] text-[#002333] border-2 border-slate-500 font-semibold w-24 h-10 m-2 text-sm rounded-md"
              >
                Sign Up
              </button>
            </div>
          </>
        )}
      </div>

    </>
  );
};

export default AuthCheck;
