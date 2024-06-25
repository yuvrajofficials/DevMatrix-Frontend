import React, { useState } from "react";
import axios from "axios";
import { Functionality } from "./Functionality";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate,NavLink } from "react-router-dom"; // Assuming you're using React Router
import LoginImage from '../../Images/LoginImage.jpg';
const CreateAccount = () => {
    
  const numbers = Array.from({ length: 100 }, (_, index) => index + 1);

  const navigate = useNavigate();
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



  // Event handler for form submission
  const handleSubmit = async (e) => {
    clearTimeout();
    e.preventDefault();
    if (cfpassword == null && crpassword == null) {
      return;
    }

    if (cfpassword !== crpassword) {
      setcfPassword('');
      setcrPassword('');
      toast.error("Passwords do not match", {
        position: "bottom-right"
      });
      return;
    }

    try {
      setPassword(cfpassword);
      const backendURL = "http://localhost:8085";
      const response = await axios.post(`${backendURL}/api/v1/users/register`, { username, fullname, email, password, phone, education, gender, age });
      if (response) {
        toast.success("User Created Successfully", {
          position: "bottom-right"
        });
        handleReset();
      
          setTimeout(() => {
            navigate('/login');
          }, 3000); 
        }
       
      
    } catch (error) {
      toast.error("Problem in registration, please try again later", { position: "bottom-right" });
      console.error(error);
    }
  };


 

  const handleReset = (e) => {
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
    <div className="loginContainer bg-gradient-to-r from-yellow-50 to-yellow-200 ">
    
    <button className="p-2 bg-white m-4 border-2 rounded-lg" onClick={()=>{navigate('/')}}>Back To Home</button>
    <h2 className="text-center py-4 text-3xl font-bold mb-8 text-gray-800 ">Register Now</h2>
      <div className="min-h-screen py-2 flex items-center justify-center">
        <div className="w-full max-w-md">
          <form
            className="border-2 border-slate-400 bg-white rounded-lg p-4"
            onSubmit={handleSubmit}
          >
        
      <label className="block font-semibold text-sm mb-2" htmlFor='fullname'>Full Name</label> 
      <input 
        type="text" 
        name="fullname" 
        value={fullname} 
        onChange={(e) => setFullname(e.target.value)} 
        placeholder="Full Name" 
        required 
        className="w-full p-2 mb-4 text-sm border-2 border-slate-300 rounded" 
      />
      
      <label className="block font-semibold text-sm mb-2" htmlFor='username'>Username</label> 
      <input 
        type="text" 
        name="username" 
        value={username} 
        onChange={(e) => setUserName(e.target.value)} 
        placeholder="Email, Phone, or Username" 
        required 
        className="w-full p-2 mb-4 text-sm border-2 border-slate-300 rounded" 
      />

      <label className="block font-semibold text-sm mb-2" htmlFor='email'>Email</label> 
      <input 
        type="email" 
        name="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        required 
        className="w-full p-2 mb-4 text-sm border-2 border-slate-300 rounded" 
      />

      <label className="block font-semibold text-sm mb-2" htmlFor='phone'>Phone</label> 
      <input 
        type="number" 
        name="phone" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
        placeholder="Phone" 
        required 
        className="w-full p-2 mb-4 text-sm border-2 border-slate-300 rounded" 
      />

<label className="block font-semibold text-sm mb-2" htmlFor='age'>Age</label> 

<select
  id="ageSelect"
  name="age"
  type="number"
  value={age} 
  onChange={(e) => setAge(e.target.value)}
  required
  className="w-full p-2 mb-4 text-sm border-2 border-slate-300 rounded"
>

        <option value="">Select Age</option>
        {numbers.map((number) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </select>

      <label className="block font-semibold text-sm mb-2" htmlFor='gender'>Gender</label> 
      <select
  id="genderSelect"
  type="string"
  name="gender"
  value={gender} 
  onChange={(e) => setGender(e.target.value)}
  required
  className="w-full p-2 mb-4 text-sm border-2 border-slate-300 rounded"
>

        <option value="">Select Gender</option>
        <option value="m">Male</option>
        <option value="f">Female</option>
        <option value="o">Other</option>
        
      </select>

      <label className="block font-semibold text-sm mb-2" htmlFor='education'>Education</label> 
      <input 
        type="text" 
        name="education" 
        value={education} 
        onChange={(e) => setEducation(e.target.value)} 
        placeholder="Education" 
        required 
        className="w-full p-2 mb-4 text-sm border-2 border-slate-300 rounded" 
      />

      <label className="block font-semibold text-sm mb-2" htmlFor='crpassword'>Create Password</label> 
      <input 
        type="password" 
        name="crpassword" 
        value={crpassword} 
        onChange={(e) => setcrPassword(e.target.value)} 
        placeholder="Create Password" 
        required 
        className="w-full p-2 mb-4 text-sm border-2 border-slate-300 rounded" 
      />

<label className="block font-semibold text-sm mb-2" htmlFor='password'>Confirm Password</label> 
      <input 
        type="password" 
        name="cfpassword" 
        value={cfpassword} 
        onChange={(e) => setcfPassword(e.target.value)} 
        placeholder="Confirm Password" 
        required 
        className="w-full p-2 mb-4 text-sm border-2 border-slate-300 rounded" 
      />

  <div className=' flex justify-end p-4'>
    
            <NavLink to="/login" className='text-blue-600 hover:text-green-600' >Already have account </NavLink>

  </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-32 h-8 text-sm font-semibold bg-yellow-400 text-black border-2 border-slate-300 rounded mr-4"
              >
                Create 
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="w-32 h-8 text-sm font-semibold bg-white text-black border-2 border-slate-300 rounded"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default CreateAccount
