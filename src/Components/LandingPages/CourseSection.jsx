import React, { useState, useEffect } from 'react';
import Header from '../Utility/utils1/Headers';
import Footer from '../Utility/utils1/Footers';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../CSS/utils.css"

const CourseSection = () => {
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

    // const courses = [
    //     {
    //         "_id": "1",
    //         "title": "React for Beginners",
    //         "price": 999,
    //         "thumbnail": "https://via.placeholder.com/300x200?text=React+for+Beginners",
    //         "creator": "John Doe",
    //         "category": "Web Development"
    //     },
    //     {
    //         "_id": "2",
    //         "title": "Advanced JavaScript",
    //         "price": 1299,
    //         "thumbnail": "https://via.placeholder.com/300x200?text=Advanced+JavaScript",
    //         "creator": "Jane Smith",
    //         "category": "Web Development"
    //     },
    //     {
    //         "_id": "3",
    //         "title": "Full Stack Development",
    //         "price": 1999,
    //         "thumbnail": "https://via.placeholder.com/300x200?text=Full+Stack+Development",
    //         "creator": "Mike Johnson",
    //         "category": "Web Development"
    //     },
    //     {
    //         "_id": "4",
    //         "title": "Python for Data Science",
    //         "price": 1499,
    //         "thumbnail": "https://via.placeholder.com/300x200?text=Python+for+Data+Science",
    //         "creator": "Emily Davis",
    //         "category": "Data Science"
    //     },
    //     {
    //         "_id": "5",
    //         "title": "Machine Learning Essentials",
    //         "price": 1799,
    //         "thumbnail": "https://via.placeholder.com/300x200?text=Machine+Learning+Essentials",
    //         "creator": "David Lee",
    //         "category": "Data Science"
    //     },
    //     {
    //         "_id": "6",
    //         "title": "Introduction to Cloud Computing",
    //         "price": 1599,
    //         "thumbnail": "https://via.placeholder.com/300x200?text=Introduction+to+Cloud+Computing",
    //         "creator": "Sara Connor",
    //         "category": "Cloud Computing"
    //     },
    //     {
    //         "_id": "7",
    //         "title": "AWS Certification Preparation",
    //         "price": 1899,
    //         "thumbnail": "https://via.placeholder.com/300x200?text=AWS+Certification+Preparation",
    //         "creator": "Tom Hanks",
    //         "category": "Cloud Computing"
    //     },
    //     {
    //         "_id": "8",
    //         "title": "Introduction to Cyber Security",
    //         "price": 1399,
    //         "thumbnail": "https://via.placeholder.com/300x200?text=Introduction+to+Cyber+Security",
    //         "creator": "Bruce Wayne",
    //         "category": "Cyber Security"
    //     },
    //     {
    //         "_id": "9",
    //         "title": "Penetration Testing Basics",
    //         "price": 1499,
    //         "thumbnail": "https://via.placeholder.com/300x200?text=Penetration+Testing+Basics",
    //         "creator": "Clark Kent",
    //         "category": "Cyber Security"
    //     },
    //     {
    //         "_id": "10",
    //         "title": "Digital Marketing 101",
    //         "price": 1199,
    //         "thumbnail": "https://via.placeholder.com/300x200?text=Digital+Marketing+101",
    //         "creator": "Peter Parker",
    //         "category": "Marketing"
    //     }
    // ]

    const categories = [
        {
            "id": "1",
            "name": "Web Development"
        },
        {
            "id": "2",
            "name": "Data Science"
        },
        {
            "id": "3",
            "name": "Cloud Computing"
        },
        {
            "id": "4",
            "name": "Cyber Security"
        },
        {
            "id": "5",
            "name": "Marketing"
        }
    ]



    useEffect(() => {
        const fetchCourses = async () => {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            try {
                const response = await axios.get(`${backendUrl}/api/v1/users/get-allcourse`);
                setCourses(response.data.data); // Assuming the response structure has data inside data
            } catch (error) {
                console.error(error);
            }
        };

        const fetchCategories = async () => {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            try {
                const response = await axios.get(`${backendUrl}/api/v1/categoriesofcourses`);
                setCategories(response.data.data); // Assuming the response structure has data inside data
            } catch (error) {
                console.error(error);
            }
        };

        fetchCourses();
        // fetchCategories();
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
        (course.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedCategory ? course.category === selectedCategory : true)
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

                <div className="flex  flex-col lg:flex-row">
                    <div className="hidden xl:flex w-64">
                        <div className="">
                            <h2 className="text-xl font-bold mb-4">Categories</h2>
                            <ul className="space-y-2">
                                <li
                                    onClick={() => handleResetCategoryClick()}
                                    className={`cursor-pointer  ${selectedCategory === "" ? 'font-bold' : ''} ${selectedCategory === "" ? 'text-[#01C567]' : ''}`}

                                >
                                    All Categories
                                </li>

                                {categories.map((category) => (
                                    <li
                                        key={category.id}
                                        onClick={() => handleCategoryClick(category.name)}
                                        className={`cursor-pointer  ${selectedCategory === category.name ? 'font-bold' : ''} ${selectedCategory === category.name ? 'text-[#01C567]' : ''}`}
                                    >
                                        {category.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* mobile view */}
                    <div className=" xl:hidden w-full h-12 ">
                        <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
                            <ul className="flex space-x-4 ">
                                <li
                                    onClick={() => handleResetCategoryClick()}
                                    className={`cursor-pointer ${selectedCategory === "" ? 'font-bold text-[#01C567]' : ''}`}
                                >
                                    All Categories
                                </li>

                                {categories.map((category) => (
                                    <li
                                        key={category.id}
                                        onClick={() => handleCategoryClick(category.name)}
                                        className={` cursor-pointer ${selectedCategory === category.name ? 'font-bold text-[#01C567]' : ''}`}
                                    >
                                        {category.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

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
                                                className="bg-gradient-to-r from-[#01ff85] to-[#01C567] hover:to-[#01ff85] hover:from-[#01C567] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
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
            <Footer />
        </>
    );
};

export default CourseSection;
