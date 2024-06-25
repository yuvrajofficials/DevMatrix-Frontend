import React from 'react';

const LogoutButton = () => {
    const handleLogout = () => {
        // Perform logout actions here, such as removing authentication token from localStorage
        localStorage.removeItem('setLoginInfo');
        
        
    };
    handleLogout()

};

export default LogoutButton;
