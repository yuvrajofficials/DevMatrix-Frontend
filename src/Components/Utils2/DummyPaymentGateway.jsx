import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaCircleXmark } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";

const DummyPaymentGateway = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [responseData, setResponseData] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [userId, setUserId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [loginInfo, setLoginInfo] = useState({});
  const location = useLocation();
  const { course } = location.state || {};
  const [amount, setAmount] = useState(course.price);
  const navigate = useNavigate();
  const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

  useEffect(() => {
    const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
    if (getLoginInfo) {
      setUserId(getLoginInfo.userId);
      setLoginInfo(getLoginInfo);
      console.log(getLoginInfo);
    }
    if (course) {
      setCourseId(course._id);
    }
  }, [course]);



  const isCoursePresent = (courseId) => {
    return loginInfo.mycourses?.some(acourse => acourse === courseId);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const paymentDetails = { userId, courseId, cardNumber, expiryDate, cvv, amount };

    try {
        const response = await fetch(`${BACKEND_URI}/api/v1/users/dummy/payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentDetails),
        });

        const data = await response.json();
        setResponseData(data);
        setResponseMessage(data.message);

        if (data.success) {
            // Show success toast notification
            toast.success("Payment successful! Course added to your learning.");

            // Update local storage
            const updatedLoginInfo = { ...loginInfo, mycourses: [...loginInfo.mycourses, data._id] };
            localStorage.setItem("setLoginInfo", JSON.stringify(updatedLoginInfo));

            // Navigate to My Learning page
            setTimeout(() => {
                navigate("/user/mylearning");
            }, 2000);
        }
    } catch (error) {
        console.error("Error processing payment:", error);
        setResponseMessage("Error processing payment.");
        toast.error("Payment failed. Please try again.");
    }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-lg p-8 border-t-4 border-blue-600">
        {isCoursePresent(courseId) ? (
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            You have already purchased this course
          </h2>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Secure Payment</h2>
            <div className="mb-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-lg font-semibold text-gray-700">Course Title:</p>
              <p className="text-blue-600 font-bold text-xl">{course.title}</p>
              <p className="text-lg font-semibold text-gray-700 mt-2">Course Price:</p>
              <p className="text-blue-600 font-bold text-2xl flex items-center">{course.price} <FaRupeeSign className="ml-1 text-xl" /></p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                  placeholder="1234 5678 9012 3456"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
              </div>

              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md text-lg font-bold transition duration-300"
              >
                Pay Now
              </button>
            </form>
            {responseMessage && (
              <div className="flex items-center justify-center mt-4 text-lg text-gray-600">
                {responseData.success ? <IoIosCheckmarkCircle className="text-green-500 w-6 h-6 mr-2" /> : <FaCircleXmark className="text-red-500 w-6 h-6 mr-2" />} 
                <p>{responseMessage}</p>
              </div>
            )}
          </>
        )}
      </div>

              <ToastContainer />
    </div>
  );
};

export default DummyPaymentGateway;
