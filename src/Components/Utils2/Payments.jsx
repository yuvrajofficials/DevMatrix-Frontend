import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentsPage = () => {
  const location = useLocation();
  const { course } = location.state;

  return (
    <div className="p-6">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={course.thumbnail} alt={course.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h2>
          <p className="text-gray-600 text-base mb-4">Instructor: {course.tutor}</p>
          <p className="text-gray-700 text-lg mb-2">Price: ${course.price}</p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:translate-y-1">
            Proceed to Payment
          </button>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: course.description }} /> 
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
