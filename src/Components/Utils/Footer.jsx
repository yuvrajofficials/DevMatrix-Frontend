import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DevMatrix_logo from "../../Images/DevMatrix_Logo.png";
import "../../CSS/utils.css";

const Footer = () => {
  const navigate = useNavigate();
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
    <>
      <footer>
        <div className="footer-container bg-slate-900">
          <div class="grid grid-cols-4 gap-4 md:max-sm grid-cols-1  ">
            <div>
              <div className="bg-white flex justify-center items-center flex-col p-4 m-4">
                <img className="w-2/3 item-center" src={DevMatrix_logo} />
                <p className="text-base m-2 font-normal text-center">
                  DevMatrix is democratising education, making it accessible to
                  all. Join the revolution, learn on India's largest learning
                  platform.
                </p>
              </div>
            </div>

            <div className="text-white m-4">
              <p className="hover:cursor-pointer text-2sx m-3 font-semibold text-center">
                {" "}
                Quick Links
              </p>
              <p
                onClick={() => navigateTo(1)}
                className="hover:cursor-pointer text-sx m-2 font-normal text-center"
              >
                &#10147; Home
              </p>
              <p
                onClick={() => navigateTo(2)}
                className="hover:cursor-pointer text-sx m-2 font-normal text-center"
              >
                &#10147; Courses
              </p>
              <p
                onClick={() => navigateTo(3)}
                className="hover:cursor-pointer text-sx m-2 font-normal text-center"
              >
                &#10147; Blogs
              </p>
              <p
                onClick={() => navigateTo(4)}
                className="hover:cursor-pointer text-sx m-2 font-normal text-center"
              >
                &#10147; About
              </p>
              <p
                onClick={() => navigateTo(5)}
                className=" hover:cursor-pointer text-sx m-2 font-normal text-center"
              >
                &#10147; Contact
              </p>
            </div>

            <div className="text-white m-4">
              <p className="text-2sx m-3 font-semibold text-center">
                Reach Out to Us
              </p>
              <p className="text-sx m-2 font-normal text-center">
                +91 1234 5678 90
              </p>
              <p className="text-sx m-2 font-normal text-center">
                devmatrix@email.com
              </p>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => navigateTo(5)}
                  className="text-sx m-2 font-normal bg-white text-black border-2  border-slate-500 font-semibold w-32 h-12 m-4 text-sx rounded-3xl "
                >
                  Connect
                </button>
              </div>
            </div>
            <div className="text-white m-4">
              <p className="text-2sx m-3 font-semibold text-center">Blogs</p>
              <p className="text-base m-2 font-normal text-center">
                Our blogs are inplicitely focus on the concept and topic you can
                Subscribe to our blogs just by providing email
              </p>
              <div className="flex items-center justify-center">
                <input
                  className="text-sx font-normal bg-white text-black border-2  border-slate-500 font-semibold w-164 h-12 m-4 text-sx rounded-xl p-2"
                  placeholder="Email Address"
                />
              </div>
              <div className="flex items-center justify-center">
                <button className="text-sx m-2 font-normal bg-white text-black border-2  border-slate-500 font-semibold w-32 h-12 m-4 text-sx rounded-3xl ">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <hr></hr>
          <ul className="text-white p-2 flex items-center justify-center">
            <li className="text-sx m-4 font-normal text-center">LinkedIn</li>
            <li className="text-sx m-4 font-normal text-center">Github</li>
            <li className="text-sx m-4 font-normal text-center">Instagram</li>
            <li className="text-sx m-4 font-normal text-center">Twitter</li>
          </ul>
          <p className="text-sx text-white p-4 font-normal text-center">
            All rights are reserved &#169; DevMatrix{" "}
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
