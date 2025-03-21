import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import AuthCheck from "./AuthCheck";
import DevMatrix_Logo from "../../../Images/DevMatrix_Logo.png";
import { IoMenu, IoClose } from "react-icons/io5";
import { FaFolderOpen, FaCartShopping, FaNewspaper } from "react-icons/fa6";
import { GrResources } from "react-icons/gr";
import { RiFolderVideoFill } from "react-icons/ri";
import { CgWebsite } from "react-icons/cg";
import { MdContactMail } from "react-icons/md";

const Headers = () => {
  const [isLoggedIn, setLoginStatus] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null); // Ref for the dropdown
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const loginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));

    if (!accessToken || !loginInfo) {
      setLoginStatus(false);
    } else {
      setLoginData(loginInfo);
      setLoginStatus(true);
    }

    // Add event listener to close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const navigateTo = (routeNo) => {
    switch (routeNo) {
      case 1:
        navigate("/");
        break;
      case 2:
        navigate("/courses");
        break;
      case 3:
        navigate("/blogs");
        break;
     
      case 5:
        navigate("/contact");
        break;
      default:
        navigate("*");
        break;
    }
  };

  return (
    <header className="bg-blue-50 border-blue-200 border-b-[1px] text-[#304261]">
      <div className="container mx-auto flex justify-between items-center h-20 px-4 md:px-8">
        {/* Logo Section */}
        <div className="flex items-center">
          <p className="text-gray-800 font-bold text-2xl">
            Dev<span className="text-blue-600 font-bold text-2xl">Matrix</span>
          </p>
        </div>
        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center space-x-8">
        {!isLoggedIn && (
          <ul className="flex items-center space-x-6">
            <li
              onClick={() => navigateTo(1)}
              className="cursor-pointer hover:text-blue-600 text-sm font-medium"
            >
              Home
            </li>
            <li
              onClick={() => navigateTo(2)}
              className="cursor-pointer hover:text-blue-600 text-sm font-medium"
            >
              Courses
            </li>
            <li
              onClick={() => navigateTo(3)}
              className="cursor-pointer hover:text-blue-600 text-sm font-medium"
            >
              Blogs
            </li>
            {/* <li
              onClick={() => navigateTo(4)}
              className="cursor-pointer hover:text-blue-600 text-sm font-medium"
            >
              About
            </li> */}
            <li
              onClick={() => navigateTo(5)}
              className="cursor-pointer hover:text-blue-600 text-sm font-medium"
            >
              Contact
            </li>
          </ul>
        )
        }
          {/* Search Input */}
          {isLoggedIn && (
            <div className="relative">
              <input
                type="search"
                className="w-96 h-10 px-3 rounded-md text-[#304261] border border-[#304261] placeholder:text-sm"
                placeholder="Search anything..."
              />
            </div>
          )}
        </div>

        {/* User & Auth Section */}
        <div className="hidden xl:flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              {/* Dropdown Menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-sm font-medium"
                >
                  <GrResources className="text-blue-600 w-5 h-5 mr-1" />
                  <span className="text-[#304261]">Resources</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 text-blue-600 bg-white font-bold rounded-md shadow-lg">
                    <p
                      onClick={() => navigateTo(2)}
                      className="flex items-center px-4 py-2 hover:text-blue-500  cursor-pointer"
                    >
                      <RiFolderVideoFill className="mx-2" /> Courses
                    </p>
                    <p
                      onClick={() => navigateTo(3)}
                      className="flex items-center px-4 py-2 hover:text-blue-500  cursor-pointer"
                    >
                      <FaNewspaper className="mx-2" /> Blogs
                    </p>
                    {/* <p
                      onClick={() => navigateTo(4)}
                      className="flex items-center px-4 py-2 hover:text-blue-500  cursor-pointer"
                    >
                      <CgWebsite className="mx-2" /> About
                    </p> */}
                    <p
                      onClick={() => navigateTo(5)}
                      className="flex items-center px-4 py-2 hover:text-blue-500  cursor-pointer"
                    >
                      <MdContactMail className="mx-2" /> Contact
                    </p>
                  </div>
                )}
              </div>

              {/* My Learning */}
              <NavLink to="/user/mylearning" className="flex items-center">
                <FaFolderOpen className="text-blue-600 w-4 h-4 mx-1" /> My Learning
              </NavLink>

              {/* Cart */}
              <NavLink to="/user/mycart" className="flex items-center">
                <FaCartShopping className="text-blue-600 w-4 h-4 mx-1" /> Cart
              </NavLink>

              <AuthCheck />
            </>
          ) : (
            <AuthCheck />
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="xl:hidden flex items-center">
          <button onClick={toggleMenu} className="text-[#304261]">
            {isMenuOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="xl:hidden bg-white text-[#304261]">
          <ul className="flex flex-col items-center space-y-2 py-4">
            <li
              onClick={() => navigateTo(1)}
              className="cursor-pointer p-2 w-full text-center hover:bg-blue-600 hover:text-white"
            >
              Home
            </li>
            <li
              onClick={() => navigateTo(2)}
              className="cursor-pointer p-2 w-full text-center hover:bg-blue-600 hover:text-white"
            >
              Courses
            </li>
            <li
              onClick={() => navigateTo(3)}
              className="cursor-pointer p-2 w-full text-center hover:bg-blue-600 hover:text-white"
            >
              Blogs
            </li>
            {/* <li
              onClick={() => navigateTo(4)}
              className="cursor-pointer p-2 w-full text-center hover:bg-blue-600 hover:text-white"
            >
              About
            </li> */}
            <li
              onClick={() => navigateTo(5)}
              className="cursor-pointer p-2 w-full text-center hover:bg-blue-600 hover:text-white"
            >
              Contact
            </li>
            <div className="py-2">
              <AuthCheck />
            </div>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Headers;
