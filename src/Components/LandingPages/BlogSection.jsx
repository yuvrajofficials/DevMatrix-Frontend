import React, { useState, useEffect } from 'react';
import Header from '../Utility/utils1/Headers';
import Footer from '../Utility/utils1/Footers';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../CSS/utils.css"

const BlogSection = () => {
    const navigate = useNavigate();
    const [owner, setOwner] = useState('');
    const [loginData, setLoginData] = useState({});
    const [coursess, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoriess, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    
  const [blogs, setBlogs] = useState([]);


    useEffect(() => {
        const getLoginInfo = JSON.parse(localStorage.getItem('setLoginInfo'));
        if (getLoginInfo != null) {
            setLoginData(getLoginInfo);
            setOwner(getLoginInfo.userId);
        }
    }, []);

//    const blogs = [
//     {
//       "id": "1",
//       "title": "Understanding React Hooks",
//       "author": "Alice Johnson",
//       "thumbnail": "https://via.placeholder.com/300x200?text=Understanding+React+Hooks",
//       "abstract": "A comprehensive guide to understanding and using React Hooks effectively.",
//       "category": "Web Development"
//     },
//     {
//       "id": "2",
//       "title": "Getting Started with Node.js",
//       "author": "Bob Smith",
//       "thumbnail": "https://via.placeholder.com/300x200?text=Getting+Started+with+Node.js",
//       "abstract": "Learn the fundamentals of Node.js and how to build scalable server-side applications.",
//       "category": "Web Development"
//     },
//     {
//       "id": "3",
//       "title": "Introduction to Machine Learning",
//       "author": "Catherine Lee",
//       "thumbnail": "https://via.placeholder.com/300x200?text=Introduction+to+Machine+Learning",
//       "abstract": "An introductory guide to the concepts and applications of machine learning.",
//       "category": "Data Science"
//     },
//     {
//       "id": "4",
//       "title": "Deep Dive into Python for Data Science",
//       "author": "David Brown",
//       "thumbnail": "https://via.placeholder.com/300x200?text=Deep+Dive+into+Python+for+Data+Science",
//       "abstract": "Explore advanced Python techniques and libraries for data science.",
//       "category": "Data Science"
//     },
//     {
//       "id": "5",
//       "title": "Building Scalable Systems on AWS",
//       "author": "Emily Davis",
//       "thumbnail": "https://via.placeholder.com/300x200?text=Building+Scalable+Systems+on+AWS",
//       "abstract": "Strategies and best practices for building scalable and reliable systems on AWS.",
//       "category": "Cloud Computing"
//     },
//     {
//       "id": "6",
//       "title": "Cyber Security Best Practices",
//       "author": "Frank Adams",
//       "thumbnail": "https://via.placeholder.com/300x200?text=Cyber+Security+Best+Practices",
//       "abstract": "Essential tips and best practices to secure your digital assets and data.",
//       "category": "Cyber Security"
//     }
//   ]

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
        const fetchBlogs = async () => {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            try {
                const response = await axios.get(`${backendUrl}/api/v1/users/get-allblogs`);
                setBlogs(response.data.data); // Assuming the response structure has data inside data
            } catch (error) {
                console.error(error);
            }
        };

        const fetchCategories = async () => {
            const backendUrl = 'http://localhost:8085';
            try {
                const response = await axios.get(`${backendUrl}/api/v1/categoriesofcourses`);
                setCategories(response.data.data); // Assuming the response structure has data inside data
            } catch (error) {
                console.error(error);
            }
        };

        fetchBlogs();
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

    const filteredBlogs = blogs.filter((blog) =>
        (blog.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedCategory ? blog.category === selectedCategory : true)
    );

    const handleReadMore = (blog) => {
        navigate('/blogs/detailspage', { state: { blog } });
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
                        placeholder="Search for a blogs..."
                    />
                </div>

                <div className="flex flex-col lg:flex-row">
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
                            {filteredBlogs.map((blog) => (
                                <div
                                    key={blog._id}
                                    className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl"
                                >
                                    <img src={blog.thumbnail} alt={blog.title} className="w-full h-32 object-cover" />
                                    <div className="p-2">
                                        <h2 className="font-bold text-wrap w-72 my-1">{blog.title}</h2>
                                            <p className="text-gray-700  text-sm font-semibold h-16  "><i> {blog.author}</i></p>
                                        <p className="text-gray-700 font-medium text-sm w-full">{blog.views||<><p>10 views</p></>}</p>
                                      
                                            <button
                                                onClick={() => handleReadMore(blog)}
                                                className="bg-gradient-to-r from-[#01ff85] to-[#01C567] hover:to-[#01ff85] hover:from-[#01C567] text-white font-bold py-2 px-2 w-32 text-sm rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                                            >
                                                Read More
                                            </button>
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

export default BlogSection;
