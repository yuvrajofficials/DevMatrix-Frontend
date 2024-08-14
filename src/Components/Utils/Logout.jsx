import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Perform logout actions here, such as removing authentication token from localStorage
        localStorage.removeItem('setLoginInfo');
        navigate("/login");
    }, [navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <p>Logging out...</p>
        </div>
    );
};

export default LogoutButton;
