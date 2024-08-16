import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IoIosCheckmarkCircle } from "react-icons/io";

const DummyPaymentGateway = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [userId, setUserId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [loginInfo, setLoginInfo] = useState({});
  const location = useLocation();
  const { course } = location.state || {};

  useEffect(() => {
    const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
    if (getLoginInfo) {
      setUserId(getLoginInfo.userId);
      setLoginInfo(getLoginInfo);
    }
    if (course) {
      setCourseId(course._id);
    }
   
    console.log(loginInfo)
  }, [course]);

  const isCoursePresent = (courseId) => {
    return loginInfo.mycourses?.some(acourse => acourse === courseId);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const paymentDetails = { userId, courseId, cardNumber, expiryDate, cvv, amount };
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    
    try {
      const response = await fetch(`${backendUrl}/api/v1/users/dummy/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentDetails),
      });

      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      console.error("Error processing payment:", error);
      setResponseMessage("Error processing payment.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {isCoursePresent(courseId) ? (
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          You have already purchased this course
        </h2>
      ) : (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Secure Payment
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                placeholder="1234 5678 9012 3456"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              />
            </div>

            <div className="form-row flex space-x-4">
              <div className="form-group w-1/2">
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                />
              </div>
              <div className="form-group w-1/2">
                <label className="block text-sm font-medium text-gray-700">CVV</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                placeholder="1000"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition duration-300"
            >
              Pay Now
            </button>
          </form>
          {responseMessage && (
            <div className="flex items-center justify-center mt-4 text-sm text-gray-600">
              <IoIosCheckmarkCircle className="text-green-500 w-4 h-4 mr-1" />
              <p>{responseMessage}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DummyPaymentGateway;