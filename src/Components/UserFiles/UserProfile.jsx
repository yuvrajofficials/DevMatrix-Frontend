import React, { useEffect, useState } from 'react';
import UserDashboardHeader from "./UserDashboardHeader";
import { FaUserEdit, FaAward, FaBook, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

// Sample data for the performance chart
const performanceData = [
  { name: 'Jan', completed: 80, goal: 100 },
  { name: 'Feb', completed: 70, goal: 100 },
  { name: 'Mar', completed: 85, goal: 100 },
  { name: 'Apr', completed: 90, goal: 100 },
];

const UserProfile = () => {
  const [teacher, setTeacher] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const loginInfo = JSON.parse(localStorage.getItem("setLoginInfo"));

    if (accessToken && loginInfo) {
      fetchUser(loginInfo.userId);
    } else {
      // Handle missing access token or login info
      console.log("No login data available");
      setLoading(false);
    }
  }, []);

  const fetchUser = async (userId) => {
    try {
      const response = await fetch(`${BACKEND_URI}/api/v1/users/get-profile/${userId}`);
      const data = await response.json();

      if (data && data.success) {
        setTeacher(data.user); // Assuming the response has a `user` field
        console.log(data)
      } else {
        console.error('User data not found');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Simple loading indicator
  }

  return (
    <>
      <UserDashboardHeader>
        <div className="container mx-auto py-10 px-4 md:px-8">
          {/* Profile Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <img
                src={teacher.avatar || "https://via.placeholder.com/150"} // Using teacher avatar or fallback image
                alt="Teacher Avatar"
                className="w-32 h-32 rounded-full shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-semibold">{teacher.fullname || "No Name"}</h1>
                <p className="text-gray-500">{teacher.email || "No Email"}</p>
                <p className="mt-2 text-gray-700">{teacher.bio || "No Bio"}</p>
                <div className="flex items-center space-x-4 mt-4">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center space-x-2">
                    <FaUserEdit />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg text-gray-600">Joined on: {teacher.createdAt ? new Date(teacher.createdAt).toLocaleDateString() : "Unknown"}</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Course Stats */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <FaBook className="text-4xl text-blue-500" />
                <div>
                  <h2 className="text-xl font-semibold">Total Courses</h2>
                  <p className="text-gray-500">{teacher.createdCourses.length} Courses Created</p>
                </div>
              </div>
              <div className="text-sm text-gray-700">
                Subjects: {teacher.subjects ? teacher.subjects.join(', ') : "No Subjects"}
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Monthly Performance</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="completed" stroke="#8884d8" />
                  <Line type="monotone" dataKey="goal" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Achievements and Engagement Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Achievements */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <FaAward className="text-4xl text-yellow-500" />
                <h2 className="text-xl font-semibold">Achievements</h2>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {teacher.achievements && teacher.achievements.length > 0 ? (
                  teacher.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))
                ) : (
                  <li>No Achievements</li>
                )}
              </ul>
            </div>

            {/* Student Engagement */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <FaChartLine className="text-4xl text-green-500" />
                <h2 className="text-xl font-semibold">Student Engagement</h2>
              </div>
              <p className="text-gray-500">{teacher.createdCourses.length || "No"} Data </p>
              {/* <p className="text-gray-500">Engagement rate is consistently high across courses.</p> */}
            </div>

            {/* Active Courses */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <FaCalendarAlt className="text-4xl text-purple-500" />
                <h2 className="text-xl font-semibold">Active Courses</h2>
              </div>
              <p className="text-gray-500">{teacher.createdCourses.length || "No"} courses are currently live.</p>
              <p className="text-gray-500">Check and update courses in the dashboard.</p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Contact Info</h2>
            <p className="text-gray-500">Phone: {teacher.phone || "Not Available"}</p>
            <p className="text-gray-500">Age: {teacher.age || "Not Available"}</p>
            <p className="text-gray-500">Gender: {teacher.gender === 'm' ? "Male" : "Female"}</p>
            <p className="text-gray-500">Education: {teacher.education || "Not Available"}</p>
          </div>

        </div>
      </UserDashboardHeader>
    </>
  );
};

export default UserProfile;
