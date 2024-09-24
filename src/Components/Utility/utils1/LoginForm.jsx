import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom"; // Assuming you're using React Router
import { IoHome } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoPersonCircle } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.post(
        `${backendUrl}/api/v1/users/login`,
        { userdata: username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data) {
        toast.success("Login Successfully", { position: "bottom-right" });
        const loginInfo = response.data.user;
        localStorage.setItem("setLoginInfo", JSON.stringify(loginInfo));
        const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));

        const setAccessToken = response.data.user.token;
        localStorage.setItem("accessToken", JSON.stringify(setAccessToken));
        const getAccessToken = JSON.parse(localStorage.getItem("accessToken"));

        if (getLoginInfo.logintype === 0) {
          navigate("/");
        } else if (getLoginInfo.logintype === 1) {
          navigate("/teacher/dashboard");
        } else if (getLoginInfo.logintype === 2) {
          navigate("/admin/home");
        }
      }
    } catch (error) {
      toast.error("Problem in message, please reattempt after a few moments", {
        position: "bottom-right",
      });
      console.error(error);
    }
  };

  const handleReset = (e) => {
    setUserName("");
    setPassword("");
  };

  return (
    <>
    <div className="bg-[#002333] min-h-screen ">
        <button
          className="p-2 m-4"
          onClick={() => {
            navigate("/");
          }}
        >
          <IoHome className="w-8 h-8 text-white" />
        </button>
      <div className="loginContainer flex flex-col items-center justify-center">
        <h2 className="text-center text-3xl font-bold  text-white py-4">
          USER LOGIN
        </h2>
        <div className="w-full max-w-md">
          <form
            className="rounded-lg p-4"
            onSubmit={handleSubmit}
          >
            <div className="relative mb-4">
              <IoPersonCircle className="absolute top-1/2 transform -translate-y-1/2 left-0 w-16 h-16 bg-white rounded-full text-[#002333" />
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                placeholder="Email, Phone or Username"
                required
                className="w-full h-16 pl-20 pr-4 py-2 bg-[#465e68] text-white rounded-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="relative mb-4">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                required
                className="w-full h-16 pl-4 pr-12 py-2 bg-[#465e68] text-white rounded-full focus:outline-none focus:border-blue-500"
              />
              <RiLockPasswordFill className="absolute top-1/2 transform -translate-y-1/2 right-0 w-16 h-16 bg-white text-[#002333] p-2 rounded-full" />
            </div>

            <div className="flex justify-end mb-4">
              <NavLink
                to="/register"
                className="text-[#01ff85] hover:text-green-600"
              >
                Don't have an account?
              </NavLink>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleReset}
                className="w-full h-10 text-md font-semibold bg-white text-[#002333] rounded-full mr-4"
              >
                Reset
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full h-10 text-md font-semibold bg-[#01ff85] text-[#002333] border border-gray-300 rounded-full"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div></div>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
