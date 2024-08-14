import React from "react";
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
    <footer className="footer-container bg-slate-900 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        <div className="flex flex-col items-center text-center">
          <img className="w-2/3 mb-4" src={DevMatrix_logo} alt="DevMatrix Logo" />
          <p className="text-base font-normal">
            DevMatrix is democratising education, making it accessible to all. Join the revolution, learn on India's largest learning platform.
          </p>
        </div>

        <div className="text-center md:text-left">
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li onClick={() => navigateTo(1)} className="cursor-pointer">&#10147; Home</li>
            <li onClick={() => navigateTo(2)} className="cursor-pointer">&#10147; Courses</li>
            <li onClick={() => navigateTo(3)} className="cursor-pointer">&#10147; Blogs</li>
            <li onClick={() => navigateTo(4)} className="cursor-pointer">&#10147; About</li>
            <li onClick={() => navigateTo(5)} className="cursor-pointer">&#10147; Contact</li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h4 className="text-xl font-semibold mb-4">Reach Out to Us</h4>
          <p className="mb-2">+91 1234 5678 90</p>
          <p className="mb-4">devmatrix@email.com</p>
          <div className="flex justify-center md:justify-start">
            <button
              onClick={() => navigateTo(5)}
              className="bg-white text-black border-2 border-slate-500 font-semibold w-32 h-12 rounded-3xl"
            >
              Connect
            </button>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h4 className="text-xl font-semibold mb-4">Review</h4>
          <p className="mb-4">Loved our platform? Write some beautiful words for us.</p>
          <div className="flex justify-center md:justify-start">
            <input
              type="text"
              className="bg-white text-black border-2 border-slate-500 font-semibold w-64 h-12 rounded-xl p-2"
              placeholder="I Loved..."
              onChange={() => navigate("/share-reviews")}
            />
          </div>
        </div>
      </div>

      <hr className="my-8 border-slate-700" />

      <div className="text-center">
        <ul className="flex justify-center space-x-8 mb-4">
          <li className="cursor-pointer">LinkedIn</li>
          <li className="cursor-pointer">Github</li>
          <li className="cursor-pointer">Instagram</li>
          <li className="cursor-pointer">Twitter</li>
        </ul>
        <p className="text-sx">
          All rights are reserved &#169; DevMatrix
        </p>
      </div>
    </footer>
  );
};

export default Footer;
