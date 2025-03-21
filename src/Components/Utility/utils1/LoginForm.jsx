import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom"; // Assuming you're using React Router
import { IoHome } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoPersonCircle } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import LoginLogo from "../../../Images/LoginLogo.jpg"
import Headers from "../utils1/Headers";
import Footer from "../utils1/Footers";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;
    

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      const response = await axios.post(
        `${BACKEND_URI}/api/v1/users/login`,
        { userdata: username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data) {
        toast.success("Login Successfully", { position: "bottom-right" });
        const loginInfo = response.data.user;
        localStorage.setItem("setLoginInfo", JSON.stringify(loginInfo));
        const setAccessToken = response.data.user.token;
        localStorage.setItem("accessToken", JSON.stringify(setAccessToken));

        if (loginInfo.logintype === 0) {
          navigate("/");
        } else if (loginInfo.logintype === 1) {
          navigate("/teacher/dashboard");
        } else if (loginInfo.logintype === 2) {
          navigate("/admin/home");
        }
      }
    } catch (error) {
      toast.error("Problem with login, please try again later", {
        position: "bottom-right",
      });
      console.error(error);
    }
  };

  const handleReset = () => {
    setUserName("");
    setPassword("");
    
  };

  return (
    <>

    <Headers/>
    <div className="bg-white min-h-screen flex  flex-col sm:flex-row   items-center justify-center mx-4">
      <img src={LoginLogo} className="lg:w-1/2 "/>
     
      <div className="w-full max-w-md  py-4 rounded-lg border-1 border-blue-400  bg-white p-8 ">
        <h2 className="text-3xl font-bold text-left text-blue-600 mb-6 border-b-2 border-blue-400">LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <IoPersonCircle className="absolute top-1/2 transform -translate-y-1/2 left-0 w-10 h-10 p-2 text-blue-500" />
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Email, Phone or Username"
              required
            className="w-full h-12 pl-12 pr-4 py-2 bg-blue-50 text-[#304261] rounded-md focus:outline-none focus:border-[#ffa146]"
            />
          </div>

          <div className="relative mb-4">
            <RiLockPasswordFill className="absolute top-1/2 transform -translate-y-1/2 left-0 w-10 h-10 p-2 text-blue-500" />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            className="w-full h-12 pl-12 pr-4 py-2 bg-blue-50 text-[#304261] rounded-md focus:outline-none focus:border-[#ffa146]"
            />
          </div>

          <div className="flex justify-end mb-4">
            <NavLink to="/register" className="text-blue-500 hover:text-[#ff5b2b]">
              Don't have an account?
            </NavLink>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleReset}
              className="border-2 mx-2 border-blue-500 text-blue-500 w-full sm:w-48 font-semibold py-2 px-4 rounded-lg hover:bg-[#eafff5] transition duration-300 text-center"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-blue-500 font-semibold text-white py-2 px-4 mx-2 w-full sm:w-48 rounded-lg hover:bg-blue-400 transition duration-300 text-center"
            >
              Login
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

export default LoginForm;
