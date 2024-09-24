import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../CSS/fetchBlogCard.css";

const FetchBlogCard = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            try {
                const response = await axios.get(`${backendUrl}/api/v1/users/get-allblogs`);
                setBlogs(response.data.data); // Assuming blogs are in response.data.data
            } catch (error) {
                console.error(error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="overflow-hidden w-full bg-white py-8">
            <div className="animate-scroll space-x-6">
                {blogs.map((blog) => (
                    <div key={blog._id} className="w-80 flex-shrink-0 bg-gray-100 border border-gray-200 rounded-lg overflow-hidden">
                        <img src={blog.thumbnail} alt={blog.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-bold">{blog.title}</h2>
                            <p className="text-gray-600">{blog.abstract}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FetchBlogCard;
