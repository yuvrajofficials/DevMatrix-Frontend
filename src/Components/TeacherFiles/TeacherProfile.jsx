import React from 'react';
import TeacherDashboardHeader from "./TeacherDashboardHeader";
import { FaUserEdit, FaAward, FaBook, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for the performance chart
const performanceData = [
  { name: 'Jan', completed: 80, goal: 100 },
  { name: 'Feb', completed: 70, goal: 100 },
  { name: 'Mar', completed: 85, goal: 100 },
  { name: 'Apr', completed: 90, goal: 100 },
];

const TeacherProfile = () => {
  const teacher = {
    name: "Yuvraj Sankilwar",
    email: "yuvraj.sankilwar@edtech.com",
    bio: "Passionate about AI and web development. Dedicated to building a tech-driven future for students.",
    subjects: ["Artificial Intelligence", "Machine Learning", "Web Development"],
    achievements: ["1000+ Students Taught", "AI/ML Workshop Speaker", "Top Educator Award"],
    totalCourses: 15,
    joinDate: "August 2020",
  };

  return (
    <>
      <TeacherDashboardHeader>
        <div className="container mx-auto py-10 px-4 md:px-8">
          {/* Profile Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <img
                src="https://via.placeholder.com/150"
                alt="Teacher Avatar"
                className="w-32 h-32 rounded-full shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-semibold">{teacher.name}</h1>
                <p className="text-gray-500">{teacher.email}</p>
                <p className="mt-2 text-gray-700">{teacher.bio}</p>
                <div className="flex items-center space-x-4 mt-4">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center space-x-2">
                    <FaUserEdit />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg text-gray-600">Joined on: {teacher.joinDate}</p>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Course Stats */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <FaBook className="text-4xl text-blue-500" />
                <div>
                  <h2 className="text-xl font-semibold">Total Courses</h2>
                  <p className="text-gray-500">{teacher.totalCourses} Courses Created</p>
                </div>
              </div>
              <div className="text-sm text-gray-700">
                Subjects: {teacher.subjects.join(', ')}
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
                {teacher.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
            </div>

            {/* Student Engagement */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <FaChartLine className="text-4xl text-green-500" />
                <h2 className="text-xl font-semibold">Student Engagement</h2>
              </div>
              <p className="text-gray-500">Taught over 1000+ students in various domains.</p>
              <p className="text-gray-500">Engagement rate is consistently high across courses.</p>
            </div>

            {/* Active Courses */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <FaCalendarAlt className="text-4xl text-purple-500" />
                <h2 className="text-xl font-semibold">Active Courses</h2>
              </div>
              <p className="text-gray-500">{teacher.totalCourses} courses are currently live.</p>
              <p className="text-gray-500">Check and update courses in the dashboard.</p>
            </div>
          </div>
        </div>
      </TeacherDashboardHeader>
    </>
  );
};

export default TeacherProfile;
