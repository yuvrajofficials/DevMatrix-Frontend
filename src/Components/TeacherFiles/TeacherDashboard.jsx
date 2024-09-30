import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, AreaChart, Area, ResponsiveContainer,
} from 'recharts';
import TeacherDashboardHeader from './TeacherDashboardHeader';

// Sample data for the charts
const lineData = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
];

const barData = [
  { name: 'Course 1', purchases: 300 },
  { name: 'Course 2', purchases: 200 },
  { name: 'Course 3', purchases: 450 },
  { name: 'Course 4', purchases: 150 },
];

const pieData = [
  { name: 'Free', value: 400 },
  { name: 'Paid', value: 300 },
  { name: 'Scholarships', value: 200 },
];

const areaData = [
  { name: 'Jan', views: 4000, engagement: 2400 },
  { name: 'Feb', views: 3000, engagement: 1398 },
  { name: 'Mar', views: 2000, engagement: 9800 },
  { name: 'Apr', views: 2780, engagement: 3908 },
];

const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <TeacherDashboardHeader>
        <div className="charts-container">
          {/* Line Chart for Earnings */}
          <div className="chart-box">
            <h2 className="text-center text-xl font-semibold mb-4">Earnings Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart for Course Purchases */}
          <div className="chart-box">
            <h2 className="text-center text-xl font-semibold mb-4">Course Purchases</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="purchases" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart for Course Distribution (Free, Paid, Scholarships) */}
          <div className="chart-box">
            <h2 className="text-center text-xl font-semibold mb-4">Course Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Area Chart for Views and Engagement */}
          <div className="chart-box">
            <h2 className="text-center text-xl font-semibold mb-4">Views and Engagement</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="views" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="engagement" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </TeacherDashboardHeader>
    </>
  );
};

export default TeacherDashboard;
