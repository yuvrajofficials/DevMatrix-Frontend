import React, { useState, useEffect } from "react";
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
      case 4:
        navigate("/about");
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
    <header>
      <div className="flex justify-between w-full bg-[#002333] h-20 text-white">
        {/* Logo Section */}
        <div className="flex-none w-1/5 flex justify-center items-center">
          <img src={DevMatrix_Logo} className="h-12" alt="Logo" />
        </div>

        {/* Navigation Links */}
        <div className="flex-auto w-3/5 flex justify-center items-center">
          {isLoggedIn ? (
            <>
              <div className="flex justify-between w-full">
                {/* Search and Links */}
                <div className="hidden xl:flex justify-center items-center">
                  <div className="flex flex-row items-center">
                    {/* Search Bar */}
                    <div className="flex-none px-4 m-2">
                      <input
                        type="search"
                        className="w-96 h-10 px-2 rounded-md text-[#002333] placeholder:text-sm"
                        placeholder="Search anything..."
                      />
                    </div>

                    {/* Dropdown Menu */}
                    <div className="relative">
                      <button
                        onClick={toggleDropdown}
                        className="flex items-center py-4 my-2 text-sm font-medium"
                      >
                        <GrResources className="text-white w-4 h-4 mx-1" />
                        Resources
                      </button>

                      {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 z-10 bg-[#002333] font-bold border border-gray-200 rounded-md shadow-lg">
                          <p
                            onClick={() => navigateTo(2)}
                            className="ulListItems flex items-center px-4 py-2 text-sm hover:bg-[#01ff85] hover:text-[#002333] cursor-pointer"
                          >
                            <RiFolderVideoFill className="mx-2" /> Courses
                          </p>
                          <p
                            onClick={() => navigateTo(3)}
                            className="ulListItems flex items-center px-4 py-2 text-sm hover:bg-[#01ff85] hover:text-[#002333] cursor-pointer"
                          >
                            <FaNewspaper className="mx-2" /> Blogs
                          </p>
                          <p
                            onClick={() => navigateTo(4)}
                            className="ulListItems flex items-center px-4 py-2 text-sm hover:bg-[#01ff85] hover:text-[#002333] cursor-pointer"
                          >
                            <CgWebsite className="mx-2" /> About
                          </p>
                          <p
                            onClick={() => navigateTo(5)}
                            className="ulListItems flex items-center px-4 py-2 text-sm hover:bg-[#01ff85] hover:text-[#002333] cursor-pointer"
                          >
                            <MdContactMail className="mx-2" /> Contact
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Purchase and Cart Links */}
                    <NavLink to="/user/mylearning" className="text-sm flex mx-2">
                      <FaFolderOpen className="text-white mx-1 w-4 h-4" /> My Learning
                    </NavLink>
                    <NavLink to="/user/addtocart" className="text-sm flex mx-2">
                      <FaCartShopping className="text-white mx-1 w-4 h-4" /> Cart
                    </NavLink>
                  </div>
                </div>

                {/* Auth Check */}
                <div className="hidden xl:flex items-center px-2">
                  <AuthCheck />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="hidden xl:flex">
                <ul className="flex justify-center">
                  <li
                    onClick={() => navigateTo(1)}
                    className="ulListItems w-24 p-4 m-2 text-sm font-medium hover:cursor-pointer"
                  >
                    Home
                  </li>
                  <li
                    onClick={() => navigateTo(2)}
                    className="ulListItems w-24 p-4 m-2 text-sm font-medium hover:cursor-pointer"
                  >
                    Courses
                  </li>
                  <li
                    onClick={() => navigateTo(3)}
                    className="ulListItems w-24 p-4 m-2 text-sm font-medium hover:cursor-pointer"
                  >
                    Blogs
                  </li>
                  <li
                    onClick={() => navigateTo(4)}
                    className="ulListItems w-24 p-4 m-2 text-sm font-medium hover:cursor-pointer"
                  >
                    About
                  </li>
                  <li
                    onClick={() => navigateTo(5)}
                    className="ulListItems w-24 p-4 m-2 text-sm font-medium hover:cursor-pointer"
                  >
                    Contact
                  </li>
                </ul>
              </div>
              <div className="hidden xl:flex justify-end items-center">
                <AuthCheck />
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="flex-none w-1/5 flex justify-end items-center pr-4 xl:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="w-full bg-[#002333] text-white xl:hidden">
          <div className="flex flex-col items-center">
            <ul className="w-full text-center">
              <li
                onClick={() => navigateTo(1)}
                className="ulListItems w-full p-2 text-sm font-medium hover:cursor-pointer"
              >
                Home
              </li>
              <li
                onClick={() => navigateTo(2)}
                className="ulListItems w-full p-2 text-sm font-medium hover:cursor-pointer"
              >
                Courses
              </li>
              <li
                onClick={() => navigateTo(3)}
                className="ulListItems w-full p-2 text-sm font-medium hover:cursor-pointer"
              >
                Blogs
              </li>
              <li
                onClick={() => navigateTo(4)}
                className="ulListItems w-full p-2 text-sm font-medium hover:cursor-pointer"
              >
                About
              </li>
              <li
                onClick={() => navigateTo(5)}
                className="ulListItems w-full p-2 text-sm font-medium hover:cursor-pointer"
              >
                Contact
              </li>
            </ul>
            <div className="flex justify-center py-2">
              <AuthCheck />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Headers;
