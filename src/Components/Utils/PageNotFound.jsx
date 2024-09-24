import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../CSS/pagenotofound.css'; // Import the CSS file for custom styles

const PageNotFound = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
      navigate('/');
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="page-not-found-container">
      <h1 className="error-code">404</h1>
      <h2 className="error-message">Oops! Page Not Found</h2>
      <p className="redirect-message">
        You will be redirected to the homepage in <span className="countdown">{countdown}</span> seconds.
      </p>
      <div className="spinner-container">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className={`spinner-grow text-${getSpinnerColor(index)} animation-delay-${index}`} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Function to get spinner colors
const getSpinnerColor = (index) => {
  const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
  return colors[index % colors.length];
};

export default PageNotFound;
