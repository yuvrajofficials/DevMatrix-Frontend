import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 


const CheckStatus = () => {
    
  const [isLoggedIn, setLoginStatus] = useState(true); // Initialize isLoggedIn with false
  const [loginData, setLoginData] = useState({}); // Initialize isLoggedIn with false

  const navigate = useNavigate();

  useEffect(() => {
    // Check if access token exists in localStorage on component mount
    const getAccessToken = localStorage.getItem('accessToken');
    const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
    

    if (getAccessToken == null || getLoginInfo == null) {
      
      setLoginStatus(false);
      navigate('/login');
    } else {
      setLoginData(getLoginInfo);
      setLoginStatus(true);
    }
  }, []); 
  return (
    <>

    </>
  )
}

export default CheckStatus
