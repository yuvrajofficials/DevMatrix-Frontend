import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews from the database
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/get-reviews`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the reviews!", error);
      });
  }, []);

  return (
    <div className='flex-1 justify-center items-center w-auto my-2 mx-64 bg-yellow-50 h-64'>
      {reviews.map((review) => (
        <div key={review._id} className="p-4 bg-white shadow-lg rounded-lg mb-4">
          <p className="text-xl font-bold">{review.name}</p>
          <div className="flex mb-2">
            {[...Array(5)].map((star, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill={i < review.rating ? 'yellow' : 'gray'}
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.37 7.292a1 1 0 00.95.69h7.678c.969 0 1.371 1.24.588 1.81l-6.21 4.505a1 1 0 00-.364 1.118l2.371 7.292c.3.921-.755 1.688-1.54 1.118l-6.21-4.505a1 1 0 00-1.175 0l-6.21 4.505c-.784.57-1.838-.197-1.539-1.118l2.37-7.292a1 1 0 00-.364-1.118l-6.21-4.505c-.784-.57-.381-1.81.588-1.81h7.678a1 1 0 00.95-.69l2.37-7.292z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-700">{review.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsSection;
