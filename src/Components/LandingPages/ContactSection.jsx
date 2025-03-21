import React, { useEffect, useState } from "react";
import axios from "axios";
import Headers from "../Utility/utils1/Headers";
import Footer from "../Utility/utils1/Footers";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const ContactSection = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");


      const [loginData, setLoginData] = useState({});
    useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");
      const loginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
  
      if (!accessToken || !loginInfo) {
      } else {
        setLoginData(loginInfo);
        console.log(loginData)
      }
    }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      toast.error("Please fill out all fields before submitting", { position: "bottom-right" });
      return;
    }
   const from = loginData.userId;
   const to = 'admin';
    const formData = {from,to,name, email, subject, message };

    try {
      await axios.post(`${BACKEND_URI}/api/v1/users/save-notification`, formData);
      toast.success("We got your message!", { position: "bottom-right" });
      handleReset();
    } catch (error) {
      toast.error("Problem in message, please try again later.", { position: "bottom-right" });
      console.error(error);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <>
      <div className="bg-white min-h-screen">
        <Headers />

        <div className="min-h-screen px-6 sm:px-12 py-12 flex flex-col md:flex-row items-center justify-center">
          {/* Left Section: Contact Details */}
          <div className="md:w-1/2 flex flex-col items-center text-center md:text-left mb-12 md:mb-0 md:pr-12">
            <h1 className="text-4xl sm:text-6xl font-bold text-blue-500 mb-6">Contact Us</h1>
            <p className="text-lg sm:text-2xl text-gray-700">
              Have questions or need assistance? Reach out to us directly at{" "}
              <span className="text-blue-600 font-semibold">teamdevmatrix@gmail.com</span>.
            </p>
          </div>

          {/* Right Section: Contact Form */}
          <div className="md:w-1/2 w-full max-w-lg bg-gradient-to-tr from-blue-50 to-blue-200 p-8 rounded-lg shadow-md border border-blue-300">
            <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              {/* Name Input */}
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full h-12 px-4 py-2 my-2 bg-white text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              {/* Email Input */}
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full h-12 px-4 py-2 my-2 bg-white text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              {/* Subject Input */}
              <input
                type="text"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="w-full h-12 px-4 py-2 my-2 bg-white text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              {/* Message Input */}
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Write your message here..."
                className="w-full px-4 py-2 my-3 bg-white text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-center mt-6 gap-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-48 py-2 border-2 border-blue-500 text-blue-500 bg-white rounded-md font-semibold hover:bg-blue-50 transition duration-300"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-48 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition duration-300"
                >
                  Submit
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

export default ContactSection;
