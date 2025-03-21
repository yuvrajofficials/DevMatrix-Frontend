import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { IoLogOut, IoPerson } from "react-icons/io5";
import { RiDashboard3Fill } from "react-icons/ri";

const AuthCheck = () => {
  const [isLoggedIn, setLoginStatus] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [userLoginType, setLoginType] = useState("");
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const getAccessToken = localStorage.getItem("accessToken");
    const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));

    if (!getAccessToken || !getLoginInfo) {
      setLoginStatus(false);
    } else {
      setLoginStatus(true);
      setLoginData(getLoginInfo);

      switch (getLoginInfo.logintype) {
        case 2:
          setLoginType("admin");
          break;
        case 1:
          setLoginType("teacher");
          break;
        default:
          setLoginType("user");
      }
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigateTo = (routeNo) => {
    switch (routeNo) {
      case 11:
        navigate("/login");
        break;
      case 12:
        navigate("/register");
        break;
      case 13:
        navigate("/userdashboard");
        break;
      case 14:
        handleLogout();
        break;
      default:
        navigate("*");
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("setLoginInfo");
      localStorage.removeItem("accessToken");
      alert("Logout successful");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Logout failed");
    }
  };

  return (
    <div className="flex items-center justify-end space-x-2">
      {isLoggedIn ? (
        <div className="relative" ref={dropdownRef}>
          <div onClick={toggleDropdown} className="flex items-center cursor-pointer w-32">
            <p className="font-bold text-blue-600 text-sm truncate">
              {loginData.username}
            </p>
            {loginData.thumbnail && (
              <img
                src={loginData.thumbnail}
                alt="User Thumbnail"
                className="w-8 h-8 rounded-xl ml-auto"
              />
            )}
          </div>

          {dropdownOpen && (
            <div className="absolute z-10 cursor-pointer right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
              <NavLink
                to={`/${userLoginType}/dashboard`}
                className="text-blue-500 font-semibold w-auto flex items-center h-10 p-2 text-sm rounded-md hover:text-blue-600 hover:text-[#002333]"
              >
                <RiDashboard3Fill className="h-4 w-4" />
                <span className="p-1">Dashboard</span>
              </NavLink>
              <NavLink
                to="/user/profile"
                className="text-blue-500 font-semibold w-auto flex items-center h-10 p-2 text-sm rounded-md hover:text-blue-600 hover:text-[#002333]"
              >
                <IoPerson className="h-4 w-4" />
                <span className="p-1">Profile</span>
              </NavLink>
              <button
                onClick={() => navigateTo(14)}
                className="text-blue-500 font-semibold w-full flex items-center h-10 p-2 text-sm rounded-md hover:text-blue-600 hover:text-[#002333]"
              >
                <IoLogOut className="h-6 w-6" />
                <span className="p-1">Log Out</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-end space-x-2 ml-auto">
          <div className="flex">
            <button
              onClick={() => navigateTo(11)}
              type="button"
              className=" w-fit sm:w-fit font-semibold py-2 px-4 hover:text-blue-600 transition duration-300 text-center"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigateTo(12)}
              className="bg-[#ffcf59] font-semibold text-gray-900 py-2 px-2 mx-2 w-fit sm:w-32 rounded-full hover:bg-[#ffcf59]  transition duration-300 text-center"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthCheck;
