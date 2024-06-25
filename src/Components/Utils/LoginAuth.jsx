import React, { useState, useEffect } from "react";
import { useNavigate,NavLink } from "react-router-dom"; // Assuming you're using React Router
import "../../CSS/utils.css";

const LoginAuth = () => {
  const [isLoggedIn, setLoginStatus] = useState(false); // Initialize isLoggedIn with false
  const [loginData, setLoginData] = useState({}); // Initialize isLoggedIn with false

  const navigate = useNavigate();

  useEffect(() => {
    // Check if access token exists in localStorage on component mount
    const getAccessToken = localStorage.getItem('accessToken');
    const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
    
    
    if (getAccessToken == null || getLoginInfo==null) {
        
        setLoginStatus(false);
        
    } else {
        setLoginStatus(true);
        setLoginData(getLoginInfo);
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const navigateTo = (routeNo) => {
    switch (routeNo) {
    
      case 11:
        navigate('/login');
        break;
      case 12:
        navigate('/register');
        break;
      case 13:
        navigate('/userdashboard');
        break;
      case 14:
        handleLogout(); // Logout case
        break;
      default:
        navigate('*');
        break;
    }
  };

  const handleLogout = () => {
    try {
      clearTimeout();
      localStorage.removeItem('setLoginInfo'); 
      // Remove login info from localStorage
      alert('Logout successful');
      
      setTimeout(() => {
        navigate('/login');
      }, 1000); 
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Logout failed');
    }
  };
  return (
    <>
     
          <div className="flex-none w-1/5 flex justify-end items-center">
            {isLoggedIn ? (
              <>
                    <p className="flex-none w-32 m-4 font-medium text-sm truncate">
                      {loginData.username}
                    </p>
                
                    <button
                      onClick={() => navigateTo(14)}
                      className="bg-yellow-300 text-black border-2 border-slate-500 font-semibold w-24 h-10 m-2 text-sm rounded-3xl"
                    >
                      Log Out
                    </button>
                
              </>
            ) : (
              <>
                <button
                  onClick={() => navigateTo(11)}
                  className="bg-yellow-300 text-black border-2 border-slate-500 font-semibold w-24 h-10 m-2 text-sm rounded-3xl"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigateTo(12)}
                  className="bg-white text-black border-2 border-slate-500 font-semibold w-24 h-10 m-2 text-sm rounded-3xl"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
       
    </>
  );
};

export default LoginAuth;
