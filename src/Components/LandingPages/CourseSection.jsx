import React, { useState, useEffect } from 'react';
import Header from '../Utility/utils1/Headers';
import Footer from '../Utility/utils1/Footers';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../CSS/utils.css"

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const CourseSection = () => {
    const navigate = useNavigate();
    const [owner, setOwner] = useState('');
    const [loginData, setLoginData] = useState({});
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const getLoginInfo = JSON.parse(localStorage.getItem('setLoginInfo'));
        if (getLoginInfo != null) {
            setLoginData(getLoginInfo);
            setOwner(getLoginInfo.userId);
        }
    }, []);

    const categories = [
        { "id": "1", "name": "Web Development" },
        { "id": "2", "name": "Data Science" },
        { "id": "3", "name": "Cloud Computing" },
        { "id": "4", "name": "Cyber Security" },
        { "id": "5", "name": "Marketing" }
    ];

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${BACKEND_URI}/api/v1/users/get-allcourse`);
                setCourses(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCourses();
    }, [owner]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleResetCategoryClick = () => {
        setSelectedCategory("");
    };

    const filteredCourses = courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory ? course.category === selectedCategory : true)
    );

    const handlePurchaseClick = (course) => {
        navigate('/courses/detailspage', { state: { course } });
    }; 

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8">
                {/* Header & Search Bar */}
                <div className="mb-6 flex flex-col lg:flex-row justify-between items-center">
                    <h1 className="text-3xl font-semibold text-gray-800">Explore Courses</h1>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full lg:w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search for a course..."
                    />
                </div>

                {/* Categories */}
                <div className="flex overflow-x-auto scrollbar-hide space-x-4 py-2">
                    <button
                        onClick={handleResetCategoryClick}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                            selectedCategory === "" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                    >
                        All Categories
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.name)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                                selectedCategory === category.name ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:mx-8 mt-6">
                    {filteredCourses.map((course) => (
                        <div
                            key={course._id}
                            className="bg-blue-50 border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
                        >
                            <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover rounded-t-lg" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-900">{course.title}</h2>
                                <p className="text-gray-600 text-sm">By {course.creator}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-lg font-bold text-blue-600">₹{course.price}</p>
                                    <button
                                        onClick={() => handlePurchaseClick(course)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                                    >
                                        Buy Now
                                    </button>
                                </div>
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
