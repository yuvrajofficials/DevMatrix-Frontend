import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../CSS/utils.css";
import DashboardHeader from './UserDashboardHeader';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import { FaCreditCard } from 'react-icons/fa6';

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const AddToCart = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({});
    const [cartCourses, setCartCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const getLoginInfo = JSON.parse(localStorage.getItem('setLoginInfo'));
        if (getLoginInfo) {
            setLoginData(getLoginInfo);
            fetchCartCourses(getLoginInfo.mycart);
        }
    }, []);

    const fetchCartCourses = async (cart) => {
        if (!cart || cart.length === 0) return;

        try {
            const response = await axios.get(`${BACKEND_URI}/api/v1/users/get-allcourse`);
            const allCourses = response.data.data;

            // Filter courses that are in the user's cart
            const filteredCourses = allCourses.filter(course => 
                cart.some(cartItem => cartItem.$oid === course._id)
            );
            console.log(filteredCourses);

            setCartCourses(filteredCourses);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const handleRemoveFromCart = async (courseId) => {
        try {
            await axios.delete(`${BACKEND_URI}/api/v1/users/remove-from-cart`, {
                data: { userId: loginData.userId, courseId }
            });

            // Update state to remove the course from the cart
            setCartCourses((prevCourses) => prevCourses.filter(course => course._id !== courseId));
        } catch (error) {
            console.error("Error removing course:", error);
        }
    };

    const handlePurchaseClick = (course) => {
        navigate('/courses/detailspage/payments', { state: { course } });
    };

    return (
        <DashboardHeader>
            <div className="container mx-auto px-4 py-8">
                {/* Header & Search Bar */}
                <div className="mb-6 flex flex-col lg:flex-row justify-between items-center">
                    <h1 className="text-3xl font-semibold text-gray-800">My Cart</h1>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full lg:w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search for a course..."
                    />
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:mx-8 mt-6">
                    {cartCourses.length === 0 ? (
                        <p className="text-gray-500 text-lg">Your cart is empty.</p>
                    ) : (
                        cartCourses.filter(course => 
                            course.title.toLowerCase().includes(searchQuery.toLowerCase())
                        ).map((course) => (
                            <div
                                key={course._id}
                                className="bg-blue-50 border border-gray-200 rounded-2xl shadow-sm hover:shadow-2xl transition duration-300"
                            >
                                <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover rounded-t-lg" />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-900">{course.title}</h2>
                                    <p className="text-gray-600 text-sm">By {course.creator}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <button
                                            onClick={() => handleRemoveFromCart(course._id)}
                                            className="bg-red-500 flex items-center w-1/2 hover:bg-red-600 text-white font-semibold p-2 m-2 rounded-lg transition"
                                        >
                                            <MdOutlineRemoveShoppingCart className="w-6 h-6 text-white mr-2" /> Remove
                                        </button>
                                        <button
                                            onClick={() => handlePurchaseClick(course)}
                                            className="bg-blue-500 flex items-center w-1/2 hover:bg-blue-600 text-white font-semibold p-2 m-2 rounded-lg transition"
                                        >
                                            <FaCreditCard className="w-6 h-6 text-white mr-2" />
                                            Purchase
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </DashboardHeader>
    );
};

export default AddToCart;
