import React, { useEffect, useState } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import slugify from 'slugify'; // Ensure this package is installed
import TeacherBlogManagement from '../TeacherFiles/TeacherBlogManagement';

const TeacherCreateBlog = () => {
  const [blogData, setBlogData] = useState({
    title: '',
    abstract: '',
    content: '',
    userId: '', // This will be set from state
    author: '',
    isPublished: false,
    comments: '',
    slug: '',
    thumbnail: null,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const loginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));
    
    if (accessToken && loginInfo) {
      setBlogData(prevData => ({
        ...prevData,
        userId: loginInfo.userId, // Set userId directly in blogData
      }));
    }
  }, []);
  
  const handleReset = () => {
    setBlogData({
      title: '',
      abstract: '',
      content: '',
      userId: blogData.userId, // Keep userId the same
      author: '',
      isPublished: false,
      comments: '',
      slug: '',
      thumbnail: null,
    });
    setError('');
    setSuccess('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setError('Please upload a valid image file (JPEG, PNG, GIF).');
        return;
      }
      setBlogData((prevData) => ({ ...prevData, thumbnail: file }));
    }
  };

  const handleSubmit = async () => {
    if (!blogData.title || !blogData.content || !blogData.abstract || !blogData.userId || !blogData.author) {
      setError('Please fill out all required fields.');
      return;
    }

    const slug = slugify(blogData.title).toLowerCase();

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8085';

      const formData = new FormData();
      formData.append('title', blogData.title);
      formData.append('abstract', blogData.abstract);
      formData.append('content', blogData.content);
      formData.append('userId', blogData.userId); // Use userId from blogData
      formData.append('author', blogData.author);
      formData.append('isPublished', blogData.isPublished);
      formData.append('comments', blogData.comments);
      formData.append('slug', slug);
      if (blogData.thumbnail) {
        formData.append('thumbnail', blogData.thumbnail);
      }

      const response = await axios.post(`${backendUrl}/api/v1/teacher/create-blog`, formData);
      setSuccess('Blog created successfully!');
      alert('Blog created successfully!');
      handleReset(); // Reset the form after successful submission
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to create blog. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <TeacherBlogManagement>
        <section className="p-4 bg-blue-50  rounded-xl min-h-screen  border-1 border-blue-400">
            
    <div className="container mx-auto  md:px-8">
      <form className="bg-white p-6 rounded-lg shadow-lg">
        <JoditEditor
          value={blogData.content}
          onChange={(newContent) => setBlogData((prevData) => ({ ...prevData, content: newContent }))}
          className="mb-4"
        />
        
        {/* Input Fields */}
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={blogData.title}
            onChange={(e) => setBlogData((prevData) => ({ ...prevData, title: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter blog title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Abstract</label>
          <textarea
            value={blogData.abstract}
            onChange={(e) => setBlogData((prevData) => ({ ...prevData, abstract: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter blog abstract"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Author</label>
          <input
            type="text"
            value={blogData.author}
            onChange={(e) => setBlogData((prevData) => ({ ...prevData, author: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter author name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={blogData.isPublished}
              onChange={(e) => setBlogData((prevData) => ({ ...prevData, isPublished: e.target.checked }))}
              className="mr-2"
            />
            Published
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Thumbnail</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Error and Success Messages */}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleReset}
            // className="w-full mx-2 h-10 text-md font-semibold bg-[#304261] text-white rounded-sm hover:bg-[#415f64] transition duration-300"
            className="w-1/2 py-3 text-lg mr-4 font-medium bg-gray-700 text-white rounded-lg hover:bg-gray-900 transition duration-300"
                    
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            // className={`w-full mx-2 h-10 text-md font-semibold ${loading ? 'bg-white' : 'bg-blue-500  text-white'} border border-gray-300 rounded-lg transition duration-300`}
            className="w-1/2 py-3 text-lg font-medium bg-blue-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
               
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </div>

    </section>
    </TeacherBlogManagement>
    </>
  );
};

export default TeacherCreateBlog;
