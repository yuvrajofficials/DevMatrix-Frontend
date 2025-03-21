import React, { useState } from 'react';
import TeacherBlogManagement from '../TeacherFiles/TeacherBlogManagement';

const BlogSettings = () => {
  const [isPublished, setIsPublished] = useState(true);
  const [allowComments, setAllowComments] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <TeacherBlogManagement>
      <div className="p-6 bg-blue-50 rounded-xl min-h-screen border border-blue-200">
        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Blog Settings</h1>

        {/* Settings Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* General Settings */}
          <div className="bg-white shadow-md rounded-lg p-6 border border-blue-200">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">General Settings</h2>

            {/* Blog Published */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700 font-medium">Blog Published</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={() => setIsPublished(!isPublished)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 after:content-[''] after:absolute after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all after:top-0.5 after:left-0.5 peer-checked:after:translate-x-5"></div>
              </label>
            </div>

            {/* Allow Comments */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700 font-medium">Allow Comments</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowComments}
                  onChange={() => setAllowComments(!allowComments)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 after:content-[''] after:absolute after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all after:top-0.5 after:left-0.5 peer-checked:after:translate-x-5"></div>
              </label>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Enable Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 after:content-[''] after:absolute after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all after:top-0.5 after:left-0.5 peer-checked:after:translate-x-5"></div>
              </label>
            </div>
          </div>

          {/* Design Settings */}
          <div className="bg-white shadow-md rounded-lg p-6 border border-blue-200">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Design Settings</h2>

            {/* Theme Selection */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Select Theme</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>Light</option>
                <option>Dark</option>
                <option>Blue Accent</option>
              </select>
            </div>

            {/* Font Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Font Style</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>Sans Serif</option>
                <option>Serif</option>
                <option>Monospace</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
            Save Changes
          </button>
        </div>
      </div>
    </TeacherBlogManagement>
  );
};

export default BlogSettings;
