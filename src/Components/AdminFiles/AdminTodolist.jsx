import React from "react";
import { useState } from "react";
import { AdminDashboardSide, AdminDashboardTop } from "./AdminDashboardComponent";

const AdminTodolist = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { id: tasks.length, text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };


  return (
    <>
      <AdminDashboardTop />
      <div className="flex">
        <section className=".bg-black-800 w-48 border-2 border-grey-500 h-screen">
          <AdminDashboardSide />
        </section>
        <div className="main-admin-component w-screen">

     
  
    <div className="bg-gray-100 min-h-screen flex items-start justify-center p-5">
      <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">To-Do List</h2>
        <div className="flex mb-4">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-l-lg focus:outline-none"
            placeholder="Add a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            className="bg-yellow-400 text-white px-4 py-2 rounded-r-lg hover:bg-yellow-600 focus:outline-none"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <ul className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="mr-2"
                />
                <span
                  className={`text-gray-700 ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <button
                className="text-red-500 hover:text-red-600 focus:outline-none"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>

        </div>


      </div>
    </>
  );
};

export default AdminTodolist;
