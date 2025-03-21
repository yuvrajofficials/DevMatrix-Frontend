import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaStar } from 'react-icons/fa';
import Headers from "../Utility/utils1/Headers";
import Footer from "../Utility/utils1/Footers";
import ReviewImage from '../../Images/ShareReview.jpg'; // Update this to the correct path

const ReviewsForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [experience, setExperience] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !rating || !occupation || !experience || !message) {
      toast.error("Please fill all fields before submitting", { position: "bottom-right" });
      return;
    }

    const formData = { name, email, occupation, experience, rating, message };

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/save-reviews`, formData);
      toast.success("Review submitted successfully", { position: "bottom-right" });
      handleReset();
    } catch (error) {
      toast.error("There was a problem submitting your review. Please try again later.", { position: "bottom-right" });
      console.error(error);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setOccupation('');
    setExperience('');
    setMessage('');
    setRating(0);
    setHoverRating(0);
  };

  const renderStars = () => {
    return [...Array(5)].map((star, index) => {
      const ratingValue = index + 1;
      return (
        <label key={index} className="cursor-pointer">
          <input
            type="radio"
            name="rating"
            value={ratingValue}
            onClick={() => setRating(ratingValue)}
            className="hidden"
          />
          <FaStar
            className="star"
            color={ratingValue <= (hoverRating || rating) ? "#ffc107" : "#e4e5e9"}
            size={40}
            onMouseEnter={() => setHoverRating(ratingValue)}
            onMouseLeave={() => setHoverRating(0)}
          />
        </label>
      );
    });
  };

  return (
    <>
      <Headers />

      <div className="bg-white min-h-screen flex flex-col md:flex-row items-center justify-center px-4 py-8">
        {/* Review Image Section */}
        <div className="hidden md:block w-1/2">
          <img src={ReviewImage} alt="Share Your Review" className="w-2/3 h-auto" />
        </div>

        {/* Form Section */}
        <div className="w-full max-w-lg p-6 bg-white shadow-md rounded-lg border border-blue-300">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Share Your Review</h2>

          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              className="w-full h-12 px-4 my-2 bg-blue-50 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            {/* Email Field */}
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@mail.com"
              className="w-full h-12 px-4 my-2 bg-blue-50 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

           
            {/* Star Rating */}
            <div className="flex justify-center my-4">
              {renderStars()}
            </div>

            {/* Message Field */}
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Write your review here..."
              className="w-full px-4 py-2 my-2 bg-blue-50 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={handleReset}
                className="w-1/2 mx-1 py-2 bg-white text-blue-500 font-semibold border-2 border-blue-500 rounded-md hover:bg-blue-50 transition duration-300"
              >
                Reset
              </button>
              <button
                type="submit"
                className="w-1/2 mx-1 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold rounded-md hover:opacity-90 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
      <Footer />
    </>
  );
};

export default ReviewsForm;
