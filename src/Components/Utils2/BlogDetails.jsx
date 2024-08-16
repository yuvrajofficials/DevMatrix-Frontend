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
      console.log(response.data);
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
      fetchBlogDetails(); // Refresh the comments after adding a new comment
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  if (!blogData) {
    return <p>Blog data not found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center">{blogData.title}</h1>
        <div className="flex justify-between m-2">
          <p className="text-gray-500 text-base">Author: {blogData.author}</p>
          <p className="text-gray-500 text-base">Published on: {new Date(blogData.publishedDate).toLocaleDateString()}</p>
        </div>
        <div className="flex justify-center mb-6">
          <img src={blogData.thumbnail} alt={blogData.title} className="rounded-lg shadow-lg w-full h-auto max-h-96 object-cover" />
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Abstract</h2>
          <p className="text-base mb-4">{blogData.abstract}</p>
        </div>
        <hr />
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blogData.description }} />

        {/* Comments Section */}
        <div className="my-8">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>

        {/* Add Comment Form */}
        <form className="my-4">
          <textarea
            className="w-full border-2 rounded p-2"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            placeholder="Share your experience..."
          />
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleComment}
              className="w-32 h-8 text-sm font-semibold bg-gradient-to-r from-yellow-100 to-yellow-300 text-black border-2 border-slate-300 rounded mr-4"
            >
              Comment
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-32 h-8 text-sm font-semibold bg-white text-black border-2 border-slate-300 rounded"
            >
              Reset
            </button>
          </div>
        </form>
          {comments.length === 0 && <p className="text-gray-500">No comments yet. Be the first to comment!</p>}
          {comments.map((commentData, index) => (
            <div key={index} className="mb-4 px-4 py-2 border rounded-lg">
              <div className="flex items-center mb-2">
                <img
                  src={commentData.userDetails.avatar || 'default-avatar-url'} // Provide a default avatar URL if none is present
                  alt={commentData.userDetails.username}
                  className="w-10 h- border-1 rounded-full mr-2"
                />
                  <p className="font-semibold">{commentData.userDetails.username}</p>
                <div className='flex justify-content-end'>
                  <p className="text-gray-500  text-sm ">Posted on: {new Date(commentData.comment.date).toLocaleString().split(',')[0]}</p>

                </div>
              </div>
              <p>{commentData.comment.text || commentData.comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
