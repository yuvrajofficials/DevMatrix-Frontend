import React, { useState } from "react";
import axios from "axios";
import Functionality from "../../Utils/Functionality";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoHome } from "react-icons/io5";
import { IoPersonCircle } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaPenAlt ,FaPhone ,FaKey } from "react-icons/fa";
import { } from "react-icons/fa";
import { RiGenderlessFill } from "react-icons/ri";
import { FaMale,FaFemale,FaTransgender } from "react-icons/fa";
import { MdLibraryBooks,MdEmail } from "react-icons/md";


import { useNavigate, NavLink } from "react-router-dom"; // Assuming you're using React Router
const RegisterUser = () => {

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
            const backendURL = process.env.REACT_APP_BACKEND_URL;
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
            <div className="bg-[#002333] min-h-screen ">
                <button
                    className="p-2 m-4"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <IoHome className="w-8 h-8 text-white" />
                </button>
                <div className="loginContainer flex flex-col items-center justify-center">
                    <h2 className="text-center text-3xl font-bold  text-white py-4">
                        USER REGISTER
                    </h2>
                    <div className="w-full max-w-md">
                        <div className="w-full max-w-md">
                            <form
                                className="rounded-lg p-4"
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <div className="relative mb-4">
                                        <IoPersonCircle className="absolute top-1/2 transform -translate-y-1/2 left-0 w-16 h-16 bg-white p-3 rounded-full text-[#002333]" />
                                        <input
                                            type="text"
                                            name="fullname"
                                            value={fullname}
                                            onChange={(e) => setFullname(e.target.value)}
                                            placeholder="Full Name"
                                            required
                                            className="w-full text-md h-16 pl-20 pr-4 py-2 bg-[#465e68] text-white rounded-full focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="relative mb-4">
                                    <FaKey className="absolute top-1/2 transform -translate-y-1/2 right-0 w-16 h-16 bg-white text-[#002333] p-3 rounded-full" />
                                        <input
                                            type="text"
                                            name="username"
                                            value={username}
                                            onChange={(e) => setUserName(e.target.value)}
                                            placeholder="Username"
                                            required
                                            className="w-full h-16 pl-20 pr-4 py-2 bg-[#465e68] text-white rounded-full focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="relative mb-4">
                                    <MdEmail  className="absolute top-1/2 transform -translate-y-1/2 left-0 w-16 h-16 bg-white p-3 rounded-full text-[#002333]"  />
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                            required
                                            className="w-full h-16 pl-20 pr-4 py-2 bg-[#465e68] text-white rounded-full focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="relative mb-4">
                                    <FaPhone className="absolute top-1/2 transform -translate-y-1/2 right-0 w-16 h-16 bg-white text-[#002333] p-3 rounded-full" />
                                        <input
                                            type="number"
                                            name="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Phone"
                                            required
                                            className="w-full h-16 pl-20 pr-4 py-2 bg-[#465e68] text-white rounded-full focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="relative mb-4">
                                    <FaPenAlt  className="absolute top-1/2 transform -translate-y-1/2 left-0 w-16 h-16 bg-white p-3 rounded-full text-[#002333]" />
                                        <select
                                            id="ageSelect"
                                            name="age"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            required
                                            className="w-full h-16 pl-20 pr-4 py-2 bg-[#465e68] text-white rounded-full focus:outline-none focus:border-blue-500"
                                        >
                                            <option value="">Select Age</option>
                                            {[...Array(100).keys()].map((number) => (
                                                <option key={number} value={number}>
                                                    {number}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="relative mb-4">
                                    <RiGenderlessFill className="absolute top-1/2 transform -translate-y-1/2 right-0 w-16 h-16 bg-white text-[#002333] p-3 rounded-full"  />
                                        <select
                                            id="genderSelect"
                                            name="gender"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            required
                                            className="w-full h-16 pl-20 pr-4 py-2 bg-[#465e68] text-white rounded-full focus:outline-none "
                                        >
                                            <option value="" className="hover:bg-[#01ff85]">Select Gender</option>
                                            <option value="m" className="hover:bg-[#01ff85]"><FaMale />Male</option>
                                            <option value="f" className="hover:bg-[#01ff85]"><FaFemale  className="w-10 text-white h-10 " />Female</option>
                                            <option value="o" className="hover:bg-[#01ff85]"><FaTransgender/>Other</option>
                                        </select>
                                    </div>
                                    <div className="relative mb-4">
                                    <MdLibraryBooks  className="absolute p-3 top-1/2 transform -translate-y-1/2 left-0 w-16 h-16 bg-white rounded-full text-[#002333]"  />
                                        <input
                                            type="text"
                                            name="education"
                                            value={education}
                                            onChange={(e) => setEducation(e.target.value)}
                                            placeholder="Education"
                                            required
                                            className="w-full h-16 pl-20 pr-4 py-2 bg-[#465e68] text-white rounded-full focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="relative mb-4">
                                    <RiLockPasswordFill className="absolute top-1/2 transform -translate-y-1/2 right-0 w-16 h-16 bg-white text-[#002333] p-3 rounded-full" />
                                        <input
                                            type="password"
                                            name="crpassword"
                                            value={crpassword}
                                            onChange={(e) => setcrPassword(e.target.value)}
                                            placeholder="Create Password"
                                            required
                                            className="w-full h-16 pl-20 pr-4 py-2 bg-[#465e68] text-white rounded-full focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="relative mb-4">
                                    <RiLockPasswordFill  className="absolute top-1/2 transform -translate-y-1/2 left-0 w-16 h-16 p-3 bg-white rounded-full text-[#002333]" />
                                        <input
                                            type="password"
                                            name="cfpassword"
                                            value={cfpassword}
                                            onChange={(e) => setcfPassword(e.target.value)}
                                            placeholder="Confirm Password"
                                            required
                                            className="w-full h-16 pl-20 pr-4 py-2 bg-[#465e68] text-white rounded-full focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className=' flex justify-end p-4'>

                                    <NavLink to="/login" className='text-[#01ff85] hover:text-green-600' >Already have account? </NavLink>

                                </div>
                                <div className="flex justify-center">
              <button
                type="button"
                onClick={handleReset}
                className="w-full h-10 text-md font-semibold bg-white text-[#002333] rounded-full mr-4"
              >
                Reset
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full h-10 text-md font-semibold bg-[#01ff85] text-[#002333] border border-gray-300 rounded-full"
              >
                Login
              </button>
            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default RegisterUser
