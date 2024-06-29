import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Perform logout actions here, such as removing authentication token from localStorage
        localStorage.removeItem('setLoginInfo');
        navigate("/login");
        
        
    };
    handleLogout();

};

export default LogoutButton;
