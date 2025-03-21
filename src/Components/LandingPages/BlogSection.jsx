import React, { useState, useEffect } from "react";
import Header from "../Utility/utils1/Headers";
import Footer from "../Utility/utils1/Footers";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "../../CSS/utils.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const StarRating = ({ rating = 0 }) => (
  <div className="flex items-center mb-2">
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star}>
        {rating >= star ? (
          <FaStar className="text-yellow-400" />
        ) : rating >= star - 0.5 ? (
          <FaStarHalfAlt className="text-yellow-400" />
        ) : (
          <FaRegStar className="text-yellow-400" />
        )}
      </span>
    ))}
    <span className="text-sm text-gray-600 ml-2">({rating?.toFixed(1) || "0.0"})</span>
  </div>
);

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BACKEND_URI}/api/v1/users/get-allblogs`);
        const blogData = response.data.data || [];
        setBlogs(blogData);
        extractCategories(blogData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const extractCategories = (blogs) => {
    const uniqueCategories = [...new Set(blogs.map((blog) => blog.category))];
    setCategories(uniqueCategories);
  };

  const navigate = useNavigate();

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? blog.category === selectedCategory : true)
  );


  const handleReadMore = (blog) => {
    navigate(`/blogs/detailspage/content/${blog.title}/${blog._id}`, { state: { blog } });
  }
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Section Header */}
        <div className="mb-8 flex flex-col lg:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold mb-4 lg:mb-0">Our Blogs</h1>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full lg:w-1/2 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500"
            placeholder="Search for blogs..."
          />
        </div>

        {/* Categories Filter */}
        <div className="flex overflow-x-auto whitespace-nowrap mb-8 scrollbar-hide">
          <div
            onClick={() => setSelectedCategory("")}
            className={`cursor-pointer px-4 py-2 border rounded-full ${
              !selectedCategory ? "font-bold text-blue-500 border-blue-500" : "text-gray-700"
            }`}
          >
            All Categories
          </div>
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`cursor-pointer px-4 py-2 border rounded-full mx-2 ${
                selectedCategory === category ? "font-bold text-blue-500 border-blue-500" : "text-gray-700"
              }`}
            >
              {category}
            </div>
          ))}
        </div>

        {/* Loading and Error Handling */}
        {loading && <p className="text-center text-gray-600">Loading blogs...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {!loading && !error && filteredBlogs.length === 0 && (
          <p className="text-center text-gray-500">No blogs found.</p>
        )}

        {/* Blogs List */}
        <div className="grid xl:px-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="max-w-sm bg-gradient-to-b from-white via-gray-100 to-gray-50 border border-gray-200 rounded-xl shadow-md hover:shadow-2xl overflow-hidden transition duration-300 transform hover:-translate-y-2"
            >
              {/* Blog Thumbnail */}
              <img src={blog.thumbnail} alt={blog.title} className="w-full h-40 object-cover rounded-t-xl" />

              {/* Blog Details */}
              <div className="p-3">
                <h2 className="font-bold text-xl mb-1 text-[#304261]">{blog.title}</h2>

                {/* Star Rating & Views */}
                <div className="flex justify-between">
                  <StarRating rating={blog.rating} />
                  <p className="text-[#304261] text-sm font-semibold">{blog.views} views</p>
                </div>

                {/* Blog Author & Read More */}
                <div className="flex justify-between items-center">
                  <p className="text-[#304261] text-sm mb-2 font-semibold">By {blog.author}</p>
                  <button onClick={()=>handleReadMore(blog)} className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
                    Read More
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

export default BlogSection;
