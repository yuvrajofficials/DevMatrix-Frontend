import React, { useState, useEffect } from 'react';
import Header from '../Utility/utils1/Headers';
import Footer from '../Utility/utils1/Footers';
import axios from "axios";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;
import { useNavigate } from 'react-router-dom';
import "../../CSS/utils.css"
import TeacherCourseManagement from '../TeacherFiles/TeacherCourseManagement';

const ViewAllCourse = () => {
    const navigate = useNavigate();
    const [owner, setOwner] = useState('');
    const [loginData, setLoginData] = useState({});
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoriess, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const getLoginInfo = JSON.parse(localStorage.getItem('setLoginInfo'));
        if (getLoginInfo != null) {
            setLoginData(getLoginInfo);
            setOwner(getLoginInfo.userId);
        }
    }, []);

    useEffect(() => {
        if (!owner) return;  // Prevent API call if owner is empty
    
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${BACKEND_URI}/api/v1/teacher/get-allcourse/${owner}`);
                console.log(response.data)
                if (response.data && response.data.data) {
                    setCourses(response.data.data);
                } else {
                    setCourses([]); // Fallback in case of unexpected API response
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
                setCourses([]); // Ensure courses is always an array
            }
        };
    
        fetchCourses();
    }, [owner]);
    

  
     
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredCourses = (courses || []).filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory ? course.category === selectedCategory : true)
    );
    

    const handlePurchaseClick = (course) => {
        navigate('/courses/detailspage', { state: { course } });
    };

    return (
        <>
            <TeacherCourseManagement>
            <div className='p-4 bg-blue-50  rounded-xl min-h-screen  border-1 border-blue-400'>
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

                <div className="flex  flex-col lg:flex-row">
                    

                    <div className="lg:w-full">
                        <div className="grid xl:px-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCourses.map((course) => (
                                <div
                                    key={course._id}
                                    className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl"
                                >
                                    <img src={course.thumbnail} alt={course.title} className="w-full h-32 object-cover" />
                                    <div className="p-2">
                                        <h2 className="font-bold  break-words w-full my-1">{course.title}</h2>
                                        <p className="text-gray-700 text-sm w-48 truncate">{course.creator}</p>
                                        <div className="flex justify-between items-center ">
                                            <p className="text-gray-700 font-bold text-sm truncate w-1/2">&#x20B9; {course.price}</p>
                                            <button
                                                onClick={() => handlePurchaseClick(course)}
                                                className="bg-gradient-to-r bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                                            >
                                                Purchase
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            </TeacherCourseManagement>
        </>
    );
};

export default ViewAllCourse;
