import React, { useState, useEffect } from 'react';
import Header from '../Utils/Header';
import Footer from '../Utils/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogsSection = () => {
  const navigate = useNavigate();
  const [owner, setOwner] = useState('');
  const [loginData, setLoginData] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getLoginInfo = JSON.parse(localStorage.getItem('setLoginInfo'));
    if (getLoginInfo != null) {
      setLoginData(getLoginInfo);
      setOwner(getLoginInfo.userId);
    }
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8085';
      try {
        const response = await axios.post(`${backendUrl}/api/v1/users/get-allblogs`);
        setBlogs(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogs();
  }, [owner]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    blog.abstract.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReadmoreClick = (blog) => {
    navigate('/blog/blog-details', { state: { blog } });
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col lg:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold mb-4 lg:mb-0 lg:text-left">Our Blogs</h1>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full lg:w-1/2 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Search for a blog..."
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 px-32 lg:grid-cols-3 gap-6">
          {filterBlogs.map((blog, index) => (
            <div
              key={index}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-bold text-lg mb-2 truncate">{blog.title}</h2>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700 text-sm truncate w-1/2">{blog.author}</p>
                  <button
                    className="bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                    onClick={() => handleReadmoreClick(blog)}
                  >
                    Read More
                  </button>
                </div>
                <p className="text-gray-700 text-sm truncate">{blog.abstract}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogsSection;
