import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import slugify from 'slugify';


const Discussions = ({ course }) => {
    const [discussion, setDiscussion] = useState('');
    const [discussions, setDiscussions] = useState([]);
    const [loginData, setLoginData] = useState({});
    const [userId, setUserId] = useState('');
  
    useEffect(() => {
      const getLoginInfo = JSON.parse(localStorage.getItem('setLoginInfo'));
      if (getLoginInfo != null) {
        setLoginData(getLoginInfo);
        setUserId(getLoginInfo.userId);
      }
    }, []);
  
    useEffect(() => {
      if (course) {
        fetchCourseDetails();
      }
    }, [course]);
  
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${course._id}`);
        setDiscussions(response.data[0].discussions || []);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };
  
    const handleReset = () => {
      setDiscussion('');
    };
  
    const handleDiscussion = async () => {
      try {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${course._id}/save-discussion`,
          { userId, discussion },
          {
            headers: {
              Authorization: `Bearer ${loginData.token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        setDiscussion('');
        fetchCourseDetails(); // Refresh the comments after adding a new comment
      } catch (error) {
        console.error('Error saving Discussion:', error);
      }
    };
  
    if (!course) {
      return <p>Course data not found</p>;
    }
  
    return (
      <>
        <div className="my-8">
          <h2 className="text-2xl font-semibold mb-4">Discussions</h2>
  
          <form className="my-4">
            <textarea
              className="w-full border-2 rounded p-2"
              value={discussion}
              onChange={(e) => setDiscussion(e.target.value)}
              rows={5}
              placeholder="Share your experience..."
            />
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={handleDiscussion}
                className="bg-white mx-2 w-48 h-12 hover:text-gray-500 hover:border-gray-500 text-purple-700 border-2 border-purple-700 font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
              >
                Share
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-purple-600 hover:bg-purple-700  w-48 h-12 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
              >
                Reset
              </button>
            </div>
          </form>
          {discussions.length === 0 && <p className="text-gray-500">No discussions yet. Be the first to share!</p>}
          {discussions.map((discussionData, index) => (
            <div key={index} className="mb-4 px-4 py-2 border rounded-lg">
              <div className="flex items-center mb-2">
                <img
                  src={'default-avatar-url'}
                  alt="user-avatar"
                  className="w-10 h-10 border-1 rounded-full mr-2"
                />
                <p className="font-semibold">Username</p> {/* Replace with actual username if available */}
                <div className='flex justify-content-end'>
                  <p className="text-gray-500 text-sm">Posted on: {new Date(discussionData.date).toLocaleString().split(',')[0]}</p>
                </div>
              </div>
              <p>{discussionData.discussion}</p>
            </div>
          ))}
        </div>
      </>
    );
  };
  
  


  export default Discussions;