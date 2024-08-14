import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import AuthCheck from "./AuthCheck";
import DevMatrix_Logo from "../../../Images/DevMatrix_Logo.png";
import { IoMenu, IoClose } from 'react-icons/io5';
import { FaFolderOpen, FaCartShopping, FaNewspaper } from "react-icons/fa6";
import { GrResources } from "react-icons/gr";
import { RiFolderVideoFill } from "react-icons/ri";
import { CgWebsite } from "react-icons/cg";
import { MdContactMail } from "react-icons/md";
const Headers = () => {
    const [isLoggedIn, setLoginStatus] = useState(false);
    const [loginData, setLoginData] = useState({});
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    useEffect(() => {
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
                <div className="flex justify-between w-full bg-[#002333] h-20 text-white">
                    <div className="flex-none w-1/5 flex justify-center items-center">
                        <img src={DevMatrix_Logo} className="h-12" alt="Logo" />
                    </div>
                    <div className="flex-auto w-3/5 flex justify-center items-center">

                        {isLoggedIn ? (<>
                        <div className="flex justify-between">
                            <div className="hidden xl:flex justify-center flex-row">
                                <div className="flex flex-row items-center">
                                    <div className="ulListItems hover:cursor-pointer flex-none px-4 m-2 font-medium text-sm">
                                        <input
                                            type="search"
                                            className="w-96 h-10 px-2 rounded-md text-[#002333]"
                                            placeholder="Search anything..."
                                        />
                                    </div>
                                    <div className="flex w-72 justify-between items-center">
                                        <div className="relative">
                                            <button
                                                onClick={toggleDropdown}
                                                className="ulListItems hover:cursor-pointer flex-none py-4 my-2 font-medium text-sm"
                                            >
                                                <div className="flex">

                                                    <GrResources className="text-white w-4 h-4 mx-1" />Resources
                                                </div>
                                            </button>
                                            {dropdownOpen && (
                                                <div className="absolute right-0 mt-2 w-48 z-10 bg-[#002333] font-bold border border-gray-200 rounded-md shadow-lg">
                                                    <p
                                                        onClick={() => navigateTo(2)}
                                                        className="ulListItems hover:cursor-pointer flex items-center   px-4 py-2 text-sm hover:bg-[#01ff85] hover:text-[#002333] "
                                                    >
                                                        <RiFolderVideoFill className="mx-2" /> Courses
                                                    </p>
                                                    <p
                                                        onClick={() => navigateTo(3)}
                                                        className="ulListItems hover:cursor-pointer  flex items-center  px-4 py-2 text-sm hover:bg-[#01ff85] hover:text-[#002333] "
                                                    >
                                                        <FaNewspaper className="mx-2" />
                                                        Blogs
                                                    </p>
                                                    <p
                                                        onClick={() => navigateTo(4)}
                                                        className="ulListItems hover:cursor-pointer flex items-center  px-4 py-2 text-sm hover:bg-[#01ff85]  hover:text-[#002333]"
                                                    >
                                                        <CgWebsite className="mx-2" />
                                                        About
                                                    </p>
                                                    <p
                                                        onClick={() => navigateTo(5)}
                                                        className="ulListItems hover:cursor-pointer  flex items-center  px-4 py-2 text-sm hover:bg-[#01ff85] hover:text-[#002333]"
                                                    >
                                                        <MdContactMail className="mx-2" />
                                                        Contact
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <NavLink
                                            onClick=""
                                            className="text-sm flex"
                                        >
                                            <FaFolderOpen className="text-white mx-1 w-4 h-4" /> Purchase
                                        </NavLink>
                                        <NavLink
                                            onClick=""
                                            className="text-sm flex"
                                        >
                                            <FaCartShopping className="text-white mx-1 w-4 h-4" /> Cart
                                        </NavLink>
                                    </div>

                                </div>
                            </div>

                            <div className="hidden xl:flex items-center px-2">
                            <div>

                                <AuthCheck />
                            </div>
                            </div>
                            </div>
                        </>) : (<>
                            <div className="hidden xl:flex">
                                <ul className="flex justify-center ">
                                    <li onClick={() => navigateTo(1)} className="ulListItems hover:cursor-pointer flex-none w-24 p-4 m-2 font-medium text-sm">
                                        Home
                                    </li>
                                    <li onClick={() => navigateTo(2)} className="ulListItems hover:cursor-pointer flex-none w-24 p-4 m-2 font-medium text-sm">
                                        Courses
                                    </li>
                                    <li onClick={() => navigateTo(3)} className="ulListItems hover:cursor-pointer flex-none w-24 p-4 m-2 font-medium text-sm">
                                        Blogs
                                    </li>
                                    <li onClick={() => navigateTo(4)} className="ulListItems hover:cursor-pointer flex-none w-24 p-4 m-2 font-medium text-sm">
                                        About
                                    </li>
                                    <li onClick={() => navigateTo(5)} className="ulListItems hover:cursor-pointer flex-none w-24 p-4 m-2 font-medium text-sm">
                                        Contact
                                    </li>
                                </ul>
                            </div>
                            <div className="hidden xl:flex justify-end items-center ">
                                <AuthCheck />
                            </div>
                        </>

                        )}
                    </div>
                    <div className="flex-none w-1/5 flex justify-end items-center pr-4 xl:hidden">
                        <button onClick={toggleMenu} className="text-white">
                            {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
                        </button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="w-full bg-[#002333] text-white xl:hidden ">
                        <div className="flex flex-col items-center">
                            <ul className="">
                                <li onClick={() => navigateTo(1)} className="ulListItems hover:cursor-pointer w-full text-center  font-medium text-sm">
                                    Home
                                </li>

                                <li onClick={() => navigateTo(2)} className="ulListItems hover:cursor-pointer w-full text-center font-medium text-sm">
                                    Courses
                                </li>

                                <li onClick={() => navigateTo(3)} className="ulListItems hover:cursor-pointer w-full text-center font-medium text-sm">
                                    Blogs
                                </li>

                                <li onClick={() => navigateTo(4)} className="ulListItems hover:cursor-pointer w-full text-center font-medium text-sm">
                                    About
                                </li>

                                <li onClick={() => navigateTo(5)} className="ulListItems hover:cursor-pointer w-full text-center font-medium text-sm">
                                    Contact
                                </li>
                            </ul>
                            <div className="flex justify-end">
                                <AuthCheck />
                            </div>
                        </div>
                    </div>
                )}

            </header>
        </>
    );
};

export default Headers;
