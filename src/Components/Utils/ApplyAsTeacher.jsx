import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import '../../CSS/applyAsTeacher.css'; // Add custom styling if 
import ApplyAsTeacherImage from "../../Images/ApplyAsTeacher.png"

const ApplyAsTeacher = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    try {
      await axios.post(`${backendUrl}/api/v1/users/save-notification`, { name, email, subject, message });
      toast.success("We received your message!", { position: "bottom-right" });
      handleReset();
    } catch (error) {
      toast.error("An error occurred, please try again later.", { position: "bottom-right" });
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center space-y-10 lg:space-y-0 lg:space-x-10">
        
        {/* Left Section: Heading */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Apply as a Teacher</h1>
          <p className="text-lg text-gray-600 mb-6">
            Interested in joining our teaching staff? Feel free to send us your details. You can also email us directly at 
            <span className="text-[#01C567]"> devmatrix@email.com </span>.
          </p>
          {/* Placeholder for Image */}
          <div className="hidden lg:block">
            <img src={ApplyAsTeacherImage} alt="Apply as Teacher" className="mx-auto lg:mx-0 max-w-sm rounded-lg shadow-lg" />
          </div>
        </div>

        {/* Right Section: Form */}
        <div className="lg:w-1/2 bg-white rounded-lg shadow-xl p-8 border border-gray-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              className="w-full h-12 pl-4 pr-12 py-2 border-2 border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#01C567] focus:ring focus:ring-[#01C567] focus:ring-opacity-50 transition"
              required
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@mail.com"
              className="w-full h-12 pl-4 pr-12 py-2 border-2 border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#01C567] focus:ring focus:ring-[#01C567] focus:ring-opacity-50 transition"
              required
            />
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Highest Qualification you have..."
              className="w-full h-12 pl-4 pr-12 py-2 border-2 border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#01C567] focus:ring focus:ring-[#01C567] focus:ring-opacity-50 transition"
              required
            />
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Tell us about your experience and explain why you would be a great addition to our teaching team."
              className="w-full pl-4 pr-12 py-2 border-2 border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#01C567] focus:ring focus:ring-[#01C567] focus:ring-opacity-50 transition"
              required
            />
            <div className="flex justify-between items-center space-x-4">
              <button
                type="button"
                onClick={handleReset}
                className="w-full lg:w-1/2 h-10 text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-300"
              >
                Reset Form
              </button>
              <button
                type="submit"
                className="w-full lg:w-1/2 h-10 text-sm font-semibold bg-[#01C567] hover:bg-[#00b65e] text-white rounded-md transition-all duration-300"
              >
                Apply Now!
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ApplyAsTeacher;
