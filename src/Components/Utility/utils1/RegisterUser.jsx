import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoPersonCircle } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaPhone, FaKey } from "react-icons/fa";
import registerLogo from "../../../Images/registerLogo.jpg"
// import Headers from "../../Utils/Header";
import Headers from "../utils1/Headers";
import Footer from "../utils1/Footers";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;
    

const RegisterUser = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [crpassword, setcrPassword] = useState('');
  const [cfpassword, setcfPassword] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cfpassword !== crpassword) {
      setcfPassword('');
      setcrPassword('');
      toast.error("Passwords do not match", { position: "bottom-right" });
      return;
    }
    else{

      setPassword(cfpassword);
    }

    try {
      console.log({username, fullname, email, password, phone})
      const response = await axios.post(`${BACKEND_URI}/api/v1/users/register`, { username, fullname, email, password , phone });
      if (response) {
        toast.success("User Created Successfully", { position: "bottom-right" });
        handleReset();
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      toast.error("Problem in registration, please try again later", { position: "bottom-right" });
      console.error(error);
    }
  };

  const handleReset = () => {
    setFullname('');
    setUserName('');
    setEmail('');
    setPhone('');
    setcfPassword('');
    setcrPassword('');
  };

  return (
    <>

    <Headers/>
    <div className="bg-white min-h-screen flex   flex-col sm:flex-row items-center justify-center mx-4 mb-4">
     <img src={registerLogo} className="sm:w-screen lg:w-1/2 "/>

      <div className="w-full px-8 max-w-md py-4 rounded-lg border-1 border-blue-400 max-h-screen">
      <h2 className="text-3xl font-bold text-left sm:px-2 md:px-2 text-blue-600 mb-6 border-b-2 border-blue-400">REGISTER</h2>
      <form onSubmit={handleSubmit} >
          <div className="relative mb-4 ">
            <IoPersonCircle className="absolute top-1/2 transform -translate-y-1/2 left-0 w-10 h-10 p-2 text-blue-400" />
            <input
              type="text"
              name="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Full Name"
              required
              className="w-full h-12 pl-12 pr-4 py-2 bg-blue-50 text-[#304261] rounded-md focus:outline-none focus:border-[#ffa146]"
            />
          </div>

          <div className="relative mb-4">
            <FaKey className="absolute top-1/2 transform -translate-y-1/2 left-0 w-10 h-10 p-2 text-blue-400" />
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
              required
            className="w-full h-12 pl-12 pr-4 py-2 bg-blue-50 text-[#304261] rounded-md focus:outline-none focus:border-[#ffa146]"
            />
          </div>

          <div className="relative mb-4">
            <MdEmail className="absolute top-1/2 transform -translate-y-1/2 left-0 w-10 h-10 p-2 text-blue-400" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            className="w-full h-12 pl-12 pr-4 py-2 bg-blue-50 text-[#304261] rounded-md focus:outline-none focus:border-[#ffa146]"
            />
          </div>

          <div className="relative mb-4">
            <FaPhone className="absolute top-1/2 transform -translate-y-1/2 left-0 w-10 h-10 p-2 text-blue-400" />
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              required
            className="w-full h-12 pl-12 pr-4 py-2 bg-blue-50 text-[#304261] rounded-md focus:outline-none focus:border-[#ffa146]"
            />
          </div>

          <div className="relative mb-4">
            <RiLockPasswordFill className="absolute top-1/2 transform -translate-y-1/2 left-0 w-10 h-10  p-2 text-blue-400" />
            <input
              type="password"
              name="password"
              value={crpassword}
              onChange={(e) => setcrPassword(e.target.value)}
              placeholder="Create Password"
              required
            className="w-full h-12 pl-12 pr-4 py-2 bg-blue-50 text-[#304261] rounded-md focus:outline-none focus:border-[#ffa146]"
            />
          </div>

          <div className="relative mb-4">
            <RiLockPasswordFill className="absolute top-1/2 transform -translate-y-1/2 left-0 w-10 h-10 p-2 text-blue-400" />
            <input
              type="password"
              name="confirm-password"
              value={cfpassword}
              onChange={(e) => setcfPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            className="w-full h-12 pl-12 pr-4 py-2 bg-blue-50 text-[#304261] rounded-md focus:outline-none focus:border-[#ffa146]"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleReset}
              className="border-2 mx-2 border-blue-600 text-blue-600 w-full sm:w-48 font-semibold py-2 px-4 rounded-lg hover:bg-[#eafff5] transition duration-300 text-center"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-blue-600 font-semibold text-white py-2 px-4 mx-2 w-full sm:w-48 rounded-lg hover:bg-blue-500 transition duration-300 text-center"
            >
              Register
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
      <Footer/>
    </>
  );
};

export default RegisterUser;
