import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom"; // Assuming you're using React Router

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginImage from "../../Images/LoginImage.jpg";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract form data

    try {
      const backendUrl = "http://localhost:8085";
      const response = await axios.post(
        `${backendUrl}/api/v1/users/login`,
        { userdata:username, password },
        { headers: { "Content-Type": "application/json" } } // Ensure headers are set
      );
      // Handle successful login
      if (response.data) {
        toast.success("Login Successfully", { position: "bottom-right" });
        // console.log(response.data)
        const loginInfo = response.data.user;
        localStorage.setItem("setLoginInfo", JSON.stringify(loginInfo));
        const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
        
        const setAccessToken = response.data.user.token;
        localStorage.setItem("accessToken", JSON.stringify(setAccessToken));
        const getAccessToken = JSON.parse(localStorage.getItem("accessToken"));

        
        
        if(getLoginInfo.logintype==0){
          navigate("/")
          
        }
        else if(getLoginInfo.logintype==1){
          navigate("/user/dashboard")
          
        }
        
        else if(getLoginInfo.logintype==2){
          navigate("/admin/home")
          
        }
        
      
      
      }
    } catch (error) {
      // Handle login error
      toast.error("Problem in message, please reattempt after a few moments", {
        position: "bottom-right",
      });
      console.error(error);
    }
  };
  const handleReset = (e) => {
    setUserName("");
    setPassword("");

    // You can perform further actions like sending data to a server here
  };

  return (
    <>
      <div className="loginContainer bg-gradient-to-r from-yellow-50 to-yellow-200 ">
      <button className="p-2 bg-white m-4 border-2 rounded-lg" onClick={()=>{navigate('/')}}>Back To Home</button>
        <h2 className="text-center text-3xl font-bold mb-8 text-gray-800 py-8">
          Login Now
        </h2>
        <div className="min-h-screen  flex items-start justify-center py-4">
          <div className="w-full max-w-md">
            <form
              className="border-2 border-slate-400 bg-white rounded-lg p-4"
              onSubmit={handleSubmit}
            >
              <label
                className="block font-semibold text-sm mb-2"
                for="username"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                placeholder="Email,Phone or Username"
                required
                className="w-full p-2 mb-4 text-sm border-2 border-slate-300 rounded"
              />

              <label
                className="block font-semibold text-sm mb-2"
                for="password"
              >
                Password
              </label>
              <input
                type="text"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                required
                className="w-full p-2 mb-4 text-sm border-2 border-slate-300 rounded"
              />

              <div className=" flex justify-end p-4">
                <NavLink
                  to="/register"
                  className="text-blue-600 hover:text-green-600"
                >
                  Don't have account{" "}
                </NavLink>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-32 h-8 text-sm font-semibold bg-yellow-400 text-black border-2 border-slate-300 rounded mr-4"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-32 h-8 text-sm font-semibold bg-white text-black border-2 border-slate-300 rounded"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
