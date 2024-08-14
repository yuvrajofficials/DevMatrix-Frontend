import React from "react";
import { useNavigate } from "react-router-dom";
import DevMatrix_logo from "../../../Images/DevMatrix_Logo.png";
import { FaLinkedin,FaGithubSquare, FaTwitterSquare,FaInstagramSquare} from "react-icons/fa";

const Footers = () => {
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
    <footer className="w-auto bg-slate-900 text-white py-8">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col items-center  lg:items-start lg:text-left">
            <img className="w-48 mb-4" src={DevMatrix_logo} alt="DevMatrix Logo" />
            <p className="text-base font-normal px-2 lg:px-0">
                DevMatrix is democratising education, making it accessible to all. Join the revolution, learn on India's largest learning platform.
            </p>
        </div>

        <div className=" lg:text-left">
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
                <li onClick={() => navigateTo(1)} className="cursor-pointer hover:underline">&#10147; Home</li>
                <li onClick={() => navigateTo(2)} className="cursor-pointer hover:underline">&#10147; Courses</li>
                <li onClick={() => navigateTo(3)} className="cursor-pointer hover:underline">&#10147; Blogs</li>
                <li onClick={() => navigateTo(4)} className="cursor-pointer hover:underline">&#10147; About</li>
                <li onClick={() => navigateTo(5)} className="cursor-pointer hover:underline">&#10147; Contact</li>
            </ul>
        </div>

        <div className=" lg:text-left">
            <h4 className="text-xl font-semibold mb-4">Reach Out to Us</h4>
            <p className="mb-2">+91 1234 5678 90</p>
            <p className="mb-4">devmatrix@email.com</p>
            <div className=" lg:justify-start">
                <button
                    onClick={() => navigateTo(5)}
                    className="bg-white text-black border-2 border-slate-500 font-semibold w-32 h-12 rounded-3xl"
                >
                    Connect
                </button>
            </div>
        </div>

        <div className="lg:text-left">
            <h4 className="text-xl font-semibold mb-4">Review</h4>
            <p className="mb-4">Loved our platform? Write some beautiful words for us.</p>
            <div className="lg:justify-start">
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
            <li className="cursor-pointer text-2xl hover:underline"><FaLinkedin /></li>
            <li className="cursor-pointer text-2xl hover:underline"><FaGithubSquare /></li>
            <li className="cursor-pointer text-2xl hover:underline"><FaInstagramSquare /></li>
            <li className="cursor-pointer text-2xl hover:underline"><FaTwitterSquare /></li>
        </ul>
        <p className="text-md text-[#01ff85]">
            All rights are reserved &#169; DevMatrix
        </p>
    </div>
</footer>
  );
};

export default Footers;
