import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApplyAsTeacherImage from "../../Images/ApplyAsTeacher.png"; // Make sure the path is correct

const ApplyAsTeacher = () => {
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
    <div className="bg-white mt-12 flex flex-col items-center justify-center">
      {/* <div className="text-center mb-6">
        <h1 className="text-6xl text-[#304261] font-bold mb-4">Apply as a Teacher</h1>
        <p className="text-3xl">Interested in joining our teaching staff? You can also email us directly at <span className="text-[#ff5b2b]">devmatrix@email.com</span></p>
      </div> */}
      <h2 className="text-4xl mt-12 font-bold text-gray-800">Interested to teach? Let's apply</h2>
            <p className="text-lg text-gray-500 mt-2">
                Hear from our users who love our platform.
            </p>

      <div className="flex flex-col lg:flex-row items-center justify-center space-x-0 lg:space-x-8 w-full max-w-5xl mx-auto">
        
        {/* Placeholder for Image */}
        <div className="">
          <img src={ApplyAsTeacherImage} alt="Apply as Teacher" className="h-1/2 bg-transparent rounded-lg " />
        </div>

        {/* Right Section: Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md mt-12 z-10 shadow-md bg-white rounded-xl p-6">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            className="w-full h-16 pl-4 pr-12 py-2 my-2 bg-blue-50 text-[#304261] rounded-md focus:outline-none focus:border-[#ffa146]"
            required
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@mail.com"
            className="w-full h-16 pl-4 pr-12 py-2 my-2 bg-blue-50 text-[#304261] rounded-md focus:outline-none focus:border-[#ffa146]"
            required
          />
          <input
            type="text"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Highest Qualification you have..."
            className="w-full h-16 pl-4 pr-12 py-2 my-2 bg-blue-50 text-[#304261] rounded-md focus:outline-none focus:border-[#ffa146]"
            required
          />
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="Tell us about your experience and why you would be a great addition to our teaching team."
            className="w-full h-auto pl-4 pr-12 py-2 my-3 bg-blue-50 text-[#304261] rounded-md focus:outline-none focus:border-[#ffa146]"
            required
          />
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={handleReset}
              className="border-2 mx-2 border-blue-600 text-blue-600 w-full sm:w-48 font-semibold py-2 px-4 rounded-lg hover:bg-[#eafff5] transition duration-300 text-center"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-700 font-semibold text-white py-2 px-4 mx-2 w-full sm:w-48 rounded-lg hover:bg-[#163442] transition duration-300 text-center"
            >
              Apply Now!
            </button>
          </div>
        </form>
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default ApplyAsTeacher;
