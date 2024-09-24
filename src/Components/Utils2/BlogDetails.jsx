import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BlogDetails = () => {
  const location = useLocation();
  const { blog } = location.state || {};
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [blogData, setBlogData] = useState(blog);
  const accessToken = localStorage.getItem('accessToken');
  const [userId, setUserId] = useState('');
  const [loginData, setLoginData] = useState({});

  useEffect(() => {
    const getLoginInfo = JSON.parse(localStorage.getItem('setLoginInfo'));
    if (getLoginInfo != null) {
      setLoginData(getLoginInfo);
      setUserId(getLoginInfo.userId);
    }
  }, []);

  useEffect(() => {
    if (blog) {
      fetchBlogDetails();
    }
  }, [blog]);

  const fetchBlogDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/v1/users/${blog._id}`);
      setComments(response.data[0].comments || []);
      setBlogData(response.data[0]);
    } catch (error) {
      console.error('Error fetching blog details:', error);
    }
  };

  const handleReset = () => {
    setComment('');
  };

  const handleComment = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${blog._id}/save-comment`,
        { userId, comment },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setComment('');
      fetchBlogDetails();
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  if (!blogData) {
    return <p className="text-center text-gray-500">Blog data not found</p>;
  }

  return (
    // <div className="container mx-auto px-4 py-10 bg-gray-100">
      <div className="w-full m-2  bg-gray-200 rounded-lg shadow-lg grid lg:grid-cols-3 gap-8">
        
        {/* Blog Content */}
        <div className="lg:col-span-2 bg-[#f9fafb] p-6 rounded-lg shadow-md">
          <h1 className="text-5xl font-bold mb-6 text-gray-800">{blogData.title}</h1>

          <div className="flex justify-between items-center text-gray-500 mb-6">
            <p className="text-sm">By {blogData.author}</p>
            <p className="text-sm">{new Date(blogData.publishedDate).toLocaleDateString()}</p>
          </div>

          <div className="mb-6">
            <img
              src={blogData.thumbnail}
              alt={blogData.title}
              className="rounded-lg border-2 w-full h-96 object-cover"
            />
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Abstract</h2>
            <p className="mt-4 text-gray-600">{blogData.abstract}</p>
          </div>

          <div className="prose lg:prose-xl max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: blogData.description }} />
        </div>

        {/* Comments Section */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Comments</h2>

          {/* Add Comment Form */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              placeholder="Share your thoughts..."
            />
            <div className="flex justify-end mt-4 space-x-4">
              <button
                type="button"
                onClick={handleComment}
                className="px-6 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg"
              >
                Comment
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 rounded-lg"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {comments.length === 0 ? (
              <p className="text-gray-500">No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((commentData, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <div className="flex items-center mb-2">
                    <img
                      src={commentData.userDetails.avatar || 'default-avatar-url'}
                      alt={commentData.userDetails.username}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <div>
                      <p className="font-semibold">{commentData.userDetails.username}</p>
                      <p className="text-gray-500 text-sm">Posted on: {new Date(commentData.comment.date).toLocaleString().split(',')[0]}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{commentData.comment.text || commentData.comment.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    // </div>
  );
};

export default BlogDetails;
