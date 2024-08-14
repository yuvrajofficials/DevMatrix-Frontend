import React, { useState } from "react";
import axios from "axios";
import Headers from "../Utils/Header";
import Footer from "../Utils/Footer";
import ReviewImage from '../../Images/LoginImage.jpg';
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReviewsForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [ratings, setRatings] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, email, ratings, message };
    const backendUrl = 'http://localhost:8085';
    try {
        console.log(formData)
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/save-reviews`, formData);
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
    setRatings('');
    setMessage('');
  };

  return (
    <>
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-200">
        <Headers />
        <div className="min-h-screen p-2 flex">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl text-gray-700 font-bold mb-4 lg:mb-0 lg:text-left">Share Reviews</h1>
              <img src={ReviewImage} alt="Review Section" className="rounded-lg shadow-lg border-4 border-yellow-200"/>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <form className="w-full max-w-md border-2 border-slate-400 bg-white rounded-lg p-4" onSubmit={handleSubmit}>
              <label className="block font-semibold text-sm mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
                className="w-full p-2 mb-4 text-sm border-2 border-slate-300 rounded"
                required
              />
              <label className="block font-semibold text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@mail.com"
                className="w-full p-2 mb-4 text-sm border-2 border-slate-300 rounded"
                required
              />
              <label className="block font-semibold text-sm mb-2">Rating</label>
              <input
                type="number"
                name="rating"
                value={ratings}
                onChange={(e) => setRatings(e.target.value)}
                placeholder="Enter Rating (1-5)"
                className="w-full p-2 mb-4 text-sm border-2 border-slate-300 rounded"
                required
                min="1"
                max="5"
              />
              <label className="block font-semibold text-sm mb-2">Review</label>
              <textarea
                name="review"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Write your review here..."
                className="w-full p-2 mb-4 text-sm border-2 border-slate-300 rounded"
                required
              />
              <div className="flex justify-center">
                <button type="submit" className="w-32 h-8 text-sm font-semibold bg-yellow-400 text-black border-2 border-slate-300 rounded mr-4">
                  Submit
                </button>
                <button type="button" onClick={handleReset} className="w-32 h-8 text-sm font-semibold bg-white text-black border-2 border-slate-300 rounded">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
        <Footer />
      </div>
    </>
  );
};

export default ReviewsForm;
