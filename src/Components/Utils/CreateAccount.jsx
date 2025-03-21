import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, NavLink } from "react-router-dom"; 
import LoginImage from '../../Images/LoginImage.jpg';

const CreateAccount = () => {
  const navigate = useNavigate();
  
  // Form states
  const [fullname, setFullname] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [education, setEducation] = useState('');
  const [crpassword, setcrPassword] = useState('');
  const [cfpassword, setcfPassword] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const numbers = Array.from({ length: 100 }, (_, index) => index + 1); // Generate ages 1-100

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cfpassword !== crpassword) {
      setcfPassword('');
      setcrPassword('');
      toast.error("Passwords do not match", {
        position: "bottom-right"
      });
      return;
    }

    try {
      setIsLoading(true);
      setPassword(cfpassword);
      const backendURL = "http://localhost:8085";
      const response = await axios.post(`${backendURL}/api/v1/users/register`, { 
        username, fullname, email, password, phone, education, gender, age 
      });
      
      if (response) {
        toast.success("User Created Successfully", {
          position: "bottom-right"
        });
        handleReset(); // Clear form
        
        setTimeout(() => {
          navigate('/login');
        }, 3000); 
      }
    } catch (error) {
      toast.error("Problem in registration, please try again later", {
        position: "bottom-right"
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form fields
  const handleReset = () => {
    setFullname('');
    setUserName('');
    setEmail('');
    setPhone('');
    setAge('');
    setGender('');
    setEducation('');
    setcfPassword('');
    setcrPassword('');
  };

  return (
    <>
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-200 min-h-screen flex flex-col items-center justify-center py-8">
        
        {/* Back to Home button */}
        <button className="p-2 bg-white m-4 border-2 rounded-lg text-sm" onClick={() => navigate('/')}>
          Back To Home
        </button>

        <div className="flex flex-col lg:flex-row items-center justify-center space-x-0 lg:space-x-8 w-full max-w-5xl mx-auto">
          
          {/* Image Section */}
          <div className="hidden lg:block">
            <img src={LoginImage} alt="Login" className="h-96 rounded-pmmkmlg shadow-lg" />
          </div>

          {/* Form Section */}
          <form
            className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 border-2 border-gray-200"
            onSubmit={handleSubmit}
          >
            <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">Register Now</h2>

            {/* Full Name */}
            <div className="mb-4">
              <label className="block font-semibold text-sm mb-2">Full Name</label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Full Name"
                required
                className="w-full p-3 border-2 border-gray-300 rounded-lg"
              />
            </div>

            {/* Username */}
            <div className="mb-4">
              <label className="block font-semibold text-sm mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Email, Phone, or Username"
                required
                className="w-full p-3 border-2 border-gray-300 rounded-lg"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block font-semibold text-sm mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full p-3 border-2 border-gray-300 rounded-lg"
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block font-semibold text-sm mb-2">Phone</label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                required
                className="w-full p-3 border-2 border-gray-300 rounded-lg"
              />
            </div>

            {/* Age */}
            <div className="mb-4">
              <label className="block font-semibold text-sm mb-2">Age</label>
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className="w-full p-3 border-2 border-gray-300 rounded-lg"
              >
                <option value="">Select Age</option>
                {numbers.map((number) => (
                  <option key={number} value={number}>{number}</option>
                ))}
              </select>
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block font-semibold text-sm mb-2">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="w-full p-3 border-2 border-gray-300 rounded-lg"
              >
                <option value="">Select Gender</option>
                <option value="m">Male</option>
                <option value="f">Female</option>
                <option value="o">Other</option>
              </select>
            </div>

            {/* Education */}
            <div className="mb-4">
              <label className="block font-semibold text-sm mb-2">Education</label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="Education"
                required
                className="w-full p-3 border-2 border-gray-300 rounded-lg"
              />
            </div>

            {/* Create Password */}
            <div className="mb-4">
              <label className="block font-semibold text-sm mb-2">Create Password</label>
              <input
                type="password"
                value={crpassword}
                onChange={(e) => setcrPassword(e.target.value)}
                placeholder="Create Password"
                required
                className="w-full p-3 border-2 border-gray-300 rounded-lg"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block font-semibold text-sm mb-2">Confirm Password</label>
              <input
                type="password"
                value={cfpassword}
                onChange={(e) => setcfPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                className="w-full p-3 border-2 border-gray-300 rounded-lg"
              />
            </div>

            {/* Login link */}
            <div className="flex justify-end mb-6">
              <NavLink to="/login" className="text-blue-600 hover:underline text-sm">
                Already have an account?
              </NavLink>
            </div>

            {/* Submit and Reset buttons */}
            <div className="flex justify-between">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full sm:w-48 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 ${
                  isLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {isLoading ? "Creating..." : "Create"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-48 py-3 font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg ml-4"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <ToastContainer />
    </>
  );
};

export default CreateAccount;
