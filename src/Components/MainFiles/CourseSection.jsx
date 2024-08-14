import React, { useState, useEffect } from 'react';
import Header from '../Utils/Header';
import Footer from '../Utils/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CourseSection = () => {
  const navigate = useNavigate();
  const [owner, setOwner] = useState('');
  const [loginData, setLoginData] = useState({});
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getLoginInfo = JSON.parse(localStorage.getItem('setLoginInfo'));
    if (getLoginInfo != null) {
      setLoginData(getLoginInfo);
      setOwner(getLoginInfo.userId);
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      try {
        const response = await axios.post(`${backendUrl}/api/v1/users/get-allcourse`);
        
        setCourses(response.data.data); // Assuming the response structure has data inside data
        alert(response.data.data)
      } catch (error) {
        alert("course is not coming")
        console.error(error);
      }
    };

    fetchCourses();
  }, [owner]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePurchaseClick = (course) => {
    navigate('/courses/detailspage', { state: { course } });
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col lg:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold mb-4 lg:mb-0 lg:text-left">Our Courses</h1>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full lg:w-1/2 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Search for a course..."
          />
        </div>
        <div className="grid px-32 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="font-bold text-truncate w-72 my-1">{course.title}</h2>
                <div className="flex justify-between items-center ">
                  <p className="text-gray-700 text-sm truncate w-1/2">&#x20B9; {course.price}</p>
                  <button
                    onClick={() => handlePurchaseClick(course)}
                    className="bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                  >
                    Purchase
                  </button>
                </div>
                <p className="text-gray-700 text- w-48 truncate">Instructor: {course.creator}</p>
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
