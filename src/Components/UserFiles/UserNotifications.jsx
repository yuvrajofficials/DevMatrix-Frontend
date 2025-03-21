import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../CSS/utils.css";
import DashboardHeader from "./UserDashboardHeader";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { IoCloseCircleOutline, IoMailOpenOutline, IoMailUnreadOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline, IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const UserNotification = () => {
    const [owner, setOwner] = useState('');
    const [loginData, setLoginData] = useState({});
    const [notifications, setNotifications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedNotification, setSelectedNotification] = useState(null);

    useEffect(() => {
        const getLoginInfo = JSON.parse(localStorage.getItem('setLoginInfo'));
        if (getLoginInfo) {
            setLoginData(getLoginInfo);
            setOwner(getLoginInfo.userId);
        }
    }, []);

    useEffect(() => {
        if (!owner) return;

        const fetchNotifications = async () => {
            try {
                const cachedData = localStorage.getItem(`notifications_page_${currentPage}`);
                if (cachedData) {
                    const parsedData = JSON.parse(cachedData);
                    setNotifications(parsedData.notifications);
                    setTotalPages(parsedData.totalPages);
                    return;
                }

                const response = await axios.get(`${BACKEND_URI}/api/v1/users/get-my-notifications/${owner}?page=${currentPage}`);
                const { data, totalPages } = response.data;

                setNotifications(data);
                setTotalPages(totalPages);

                localStorage.setItem(`notifications_page_${currentPage}`, JSON.stringify({ notifications: data, totalPages }));
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, [owner, currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const openNotification = (notification) => {
        setSelectedNotification(notification);
    };

    const closeNotification = () => {
        setSelectedNotification(null);
    };

    const memoizedNotifications = useMemo(() => notifications, [notifications]);

    return (
        <DashboardHeader>
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">My Notifications</h1>

                <div className="bg-white rounded-lg border border-gray-200">
                    {memoizedNotifications.length > 0 ? (
                        memoizedNotifications.map((notification) => (
                            <div
                                key={notification._id}
                                onClick={() => openNotification(notification)}
                                className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-100 transition cursor-pointer"
                            >
                                {notification.read ? (
                                    <IoMailOpenOutline className="text-gray-500 w-6 h-6 mr-4" />
                                ) : (
                                    <IoMailUnreadOutline className="text-blue-500 w-6 h-6 mr-4" />
                                )}

                                <div className="flex-grow">
                                    <h2 className="text-lg font-semibold text-gray-900">{notification.title}</h2>
                                    <p className="text-gray-600 text-sm truncate">{notification.message}</p>
                                    <p className="text-gray-500 text-xs mt-1">
                                        {new Date(notification.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                {/* <MdOutlineNotificationsActive className="text-blue-600 w-8 h-8 ml-4" /> */}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 p-6 text-center">No notifications found.</p>
                    )}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-4">
                    <IoMdArrowRoundBack
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="text-blue-600 hover:text-blue-700  font-semibold w-16 h-8 rounded disabled:opacity-50"
                    />
                        
                    <span className="text-gray-600 font-medium">Page {currentPage} of {totalPages}</span>
                    <IoMdArrowRoundForward
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="text-blue-600 hover:text-blue-700   font-semibold  w-16 h-8  rounded disabled:text-gray-300 disabled:opacity-50"
                    />
                       
                </div>

                {/* Notification Modal */}
                {selectedNotification && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
    <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
        {/* Header Section */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
            <p className="text-gray-500 text-xs">
                {new Date(selectedNotification.createdAt).toLocaleString()}
            </p>
            <IoIosCloseCircleOutline 
                onClick={closeNotification}
                className="text-gray-400 hover:text-gray-600 transition-all duration-300 cursor-pointer w-7 h-7"
            />
        </div>

        {/* Notification Content */}
        <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">Name: <span className="font-normal text-gray-700">{selectedNotification.name}</span></h2>
            <h2 className="text-lg font-semibold text-gray-800">Email: <span className="font-normal text-gray-700">{selectedNotification.email}</span></h2>
            <h2 className="text-lg font-semibold text-gray-900">Subject: <span className="font-normal text-gray-700">{selectedNotification.title}</span></h2>
            <p className="text-gray-600 leading-relaxed border-t pt-3 mt-2">Message: {selectedNotification.message}</p>
        </div>
    </div>
</div>

                )}
            </div>
        </DashboardHeader>
    );
};

export default UserNotification;
