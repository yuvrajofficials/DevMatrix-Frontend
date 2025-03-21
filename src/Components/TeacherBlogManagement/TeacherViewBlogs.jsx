import React, { useState, useEffect } from 'react';
import Header from '../Utility/utils1/Headers';
import Footer from '../Utility/utils1/Footers';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../CSS/utils.css";
import TeacherCourseManagement from '../TeacherFiles/TeacherCourseManagement';
import TeacherBlogManagement from '../TeacherFiles/TeacherBlogManagement';
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;
const ViewAllBlogs = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [loginData, setLoginData] = useState({});
    const [blogs, setBlogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState('');

    useEffect(() => {
        const getLoginInfo = JSON.parse(localStorage.getItem('setLoginInfo'));
        if (getLoginInfo) {
            setLoginData(getLoginInfo);
            setUserId(getLoginInfo.userId);
        }
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URI}/api/v1/teacher/get-allblogs/${userId}`);
                setBlogs(response.data.data); // Assuming the response structure has data inside data
            } catch (error) {
                console.error(error);
                setError('Failed to fetch blogs. Please try again later.');
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };

        // Check if userId is a non-empty string before making the request
        if (userId) {
            fetchBlogs();
        } else {
            setLoading(false); // Set loading to false if userId is not available
        }
    }, [userId]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handlePurchaseClick = (blog) => {
        navigate('/courses/detailspage', { state: { blog } });
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    const handleViewBlog = (blog) => {
        navigate('/blogs/detailspage', { state: { blog } });
    };
    return (
        <>
            <TeacherBlogManagement>
                <div className="container bg-[#C5C5C6] h-screen mx-auto px-4 py-8">
                    <div className="mb-8 flex flex-col lg:flex-row justify-between items-center">
                        <h1 className="text-3xl font-bold mb-4 lg:mb-0 lg:text-left">Your Blogs</h1>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full lg:w-1/2 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Search for a blog..."
                        />
                    </div>

                    <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-full">
                            <div className="grid xl:px-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredBlogs.map((blog) => (
                                    <div
                                        key={blog._id}
                                        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl"
                                    >
                                        <img src={blog.thumbnail} alt={blog.title} className="w-full h-32 object-cover" />
                                        <div className="p-2">
                                            <h2 className="font-bold break-words w-full my-1">{blog.title}</h2>
                                            <p className="text-gray-700 text-sm w-48 truncate">{blog.creator}</p>
                                            <div className="flex justify-between items-center">
                                                <p className="text-gray-700 font-bold text-sm truncate w-1/2">&#x20B9; {blog.price}</p>
                                                <button
                                                    onClick={() => handleViewBlog(blog)}
                                                    className="bg-gradient-to-r from-[#01ff85] to-[#01C567] hover:to-[#01ff85] hover:from-[#01C567] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                                                >
                                                    View Blog
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </TeacherBlogManagement>
        </>
    );
};

export default ViewAllBlogs;
