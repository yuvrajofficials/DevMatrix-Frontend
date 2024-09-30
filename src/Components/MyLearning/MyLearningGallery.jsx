import React, { useState } from "react";

const MyLearningGallery = () => {
  // State to manage the active section
  const [activeSection, setActiveSection] = useState("history");

  // Rendering the content based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case "history":
        return (
          <div className="p-6 bg-gray-100 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Watch History</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>React Basics - 1 hour</li>
              <li>JavaScript ES6 - 45 minutes</li>
              <li>CSS Flexbox - 30 minutes</li>
            </ul>
          </div>
        );
      case "saved":
        return (
          <div className="p-6 bg-gray-100 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Saved Courses/Blogs</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Advanced React Patterns</li>
              <li>JavaScript Design Patterns</li>
              <li>Understanding CSS Grid</li>
            </ul>
          </div>
        );
      case "add-to-cart":
        return (
          <div className="p-6 bg-gray-100 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Items in Cart</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>React Masterclass - $50</li>
              <li>JavaScript Bootcamp - $40</li>
              <li>Full-Stack Development - $80</li>
            </ul>
          </div>
        );
      case "profile":
        return (
          <div className="p-6 bg-gray-100 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <p>Name: John Doe</p>
            <p>Email: john.doe@example.com</p>
            <p>Subscription: Premium Member</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <button
          className={`py-4 px-6 text-left ${
            activeSection === "history" ? "bg-blue-500" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveSection("history")}
        >
          History
        </button>
        <button
          className={`py-4 px-6 text-left ${
            activeSection === "saved" ? "bg-blue-500" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveSection("saved")}
        >
          Saved
        </button>
        <button
          className={`py-4 px-6 text-left ${
            activeSection === "add-to-cart" ? "bg-blue-500" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveSection("add-to-cart")}
        >
          Add to Cart
        </button>
        <button
          className={`py-4 px-6 text-left ${
            activeSection === "profile" ? "bg-blue-500" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveSection("profile")}
        >
          Profile
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

export default MyLearningGallery;
