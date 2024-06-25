import React, { useState, useEffect } from 'react';
import Headers from '../Utils/Header';
import Footer from '../Utils/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CourseSection = () => {
  const navigate = useNavigate();
  const [owner, setOwner] = useState('');
  const [loginData, setLoginData] = useState({});
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const getLoginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
    if (getLoginInfo != null) {
      setLoginData(getLoginInfo);
      setOwner(getLoginInfo.userId);
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      const backendUrl = 'http://localhost:8085';
      try {
        const response = await axios.get(`${backendUrl}/api/v1/users/get-allcourse`);
        setCourses(response.data.data); // Assuming the response structure has data inside data
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, [owner]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePurchaseClick = (course) => {
    navigate('/courses/detailspage', { state: { course } });
  };

  return (
    <>
      <Headers />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Search for a course..."
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-lg bg-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <img src={course.thumbnail} alt={course.title} className="w-full h-32 object-cover" />
              <div className="px-4 py-4">
                <div className="font-bold text-lg mb-2 text-gray-800">{course.title}</div>
                <p className="text-gray-700 text-md mb-2">${course.price}</p>
                <p className="text-gray-600 text-sm mb-4">Instructor: {course.creator}</p>

                <button
                  onClick={() => handlePurchaseClick(course)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                >
                  Purchase
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseSection;
