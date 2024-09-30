import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TeacherDashboardHeader from './TeacherDashboardHeader';

const TeacherTasks = () => {
  const [boards, setBoards] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('default');
  const [taskData, setTaskData] = useState({
    default: {
      todo: [],
      inProgress: [],
      done: [],
    },
  });

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8085';

  // Fetch all boards on mount
  useEffect(() => {
    fetchBoards();
  }, []);

  // Fetch tasks whenever selectedBoard changes
  useEffect(() => {
    if (selectedBoard) {
      fetchTasksByBoard(selectedBoard);
    }
  }, [selectedBoard]);

  const fetchBoards = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/v1/teacher/taskmanagement/board`);
      const data = await response.json();
      setBoards(data);
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  const fetchTasksByBoard = async (board) => {
    try {
      const response = await fetch(`${backendUrl}/api/v1/teacher/taskmanagement/tasks/${board}`);
      const tasks = await response.json();
      const boardTasks = {
        todo: tasks.filter((task) => task.status === 'todo'),
        inProgress: tasks.filter((task) => task.status === 'inProgress'),
        done: tasks.filter((task) => task.status === 'done'),
      };
      setTaskData({ [board]: boardTasks });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const createNewTask = async () => {
    if (!newTask.trim()) return;

    try {
      const response = await fetch(`${backendUrl}/api/v1/teacher/taskmanagement/tasks/createTask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: newTask,
          priority: 'low',
          board: selectedBoard,
        }),
      });
      await response.json();
      fetchTasksByBoard(selectedBoard); // Refresh the tasks
      setNewTask('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const deleteTask = async (taskId, board) => {
    try {
      await fetch(`${backendUrl}/api/v1/teacher/taskmanagement/tasks/${taskId}`, {
        method: 'DELETE',
      });
      fetchTasksByBoard(board); // Refresh the tasks
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const moveTask = async (item, toStatus) => {
    try {
      const { id, board } = item;
      await fetch(`${backendUrl}/api/v1/teacher/taskmanagement/tasks/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: toStatus }),
      });
      fetchTasksByBoard(board);
    } catch (error) {
      console.error('Error moving task:', error);
    }
  };

  const addNewBoard = async (boardName) => {
    if (!boardName.trim()) return;

    try {
      const response = await fetch(`${backendUrl}/api/v1/teacher/taskmanagement/board`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: boardName }),
      });

      if (!response.ok) {
        console.error('Failed to add board. Status:', response.status);
        return;
      }

      const newBoard = await response.json();
      setBoards([...boards, newBoard]);
    } catch (error) {
      console.error('Error adding board:', error);
    }
  };

  return (
    <TeacherDashboardHeader>
      <DndProvider backend={HTML5Backend}>
        <div className="container mx-auto py-10">
          <h1 className="text-4xl font-bold text-center mb-10">Kanban Task Manager</h1>

          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Add a new board..."
              className="border p-2 rounded-lg w-64 focus:ring focus:ring-indigo-300"
              onKeyPress={(e) => {
                if (e.key === 'Enter') addNewBoard(e.target.value);
              }}
            />

            <input
              type="text"
              placeholder="Search tasks..."
              className="border p-2 rounded-lg w-64 focus:ring focus:ring-indigo-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex justify-center mb-6">
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="border p-2 rounded-lg focus:ring focus:ring-indigo-300"
            >
              <option value="default">Default</option>
              {boards.map((board, idx) => (
                <option key={idx} value={board.name}>
                  {board.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <Column title="To Do" tasks={taskData[selectedBoard]?.todo || []} status="todo" moveTask={moveTask} deleteTask={deleteTask} />
            <Column title="In Progress" tasks={taskData[selectedBoard]?.inProgress || []} status="inProgress" moveTask={moveTask} deleteTask={deleteTask} />
            <Column title="Done" tasks={taskData[selectedBoard]?.done || []} status="done" moveTask={moveTask} deleteTask={deleteTask} />
          </div>

          <div className="mt-6">
            <input
              type="text"
              placeholder="Add a new task..."
              className="border p-2 rounded-lg w-full focus:ring focus:ring-indigo-300"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') createNewTask();
              }}
            />
          </div>
        </div>
      </DndProvider>
    </TeacherDashboardHeader>
  );
};

const Column = ({ title, tasks, status, moveTask, deleteTask }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => moveTask(item, status),
  });

  return (
    <div ref={drop} className="p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks in this section</p>
      ) : (
        tasks.map((task, index) => (
          <TaskCard key={index} task={task} index={index} status={status} deleteTask={deleteTask} />
        ))
      )}
    </div>
  );
};

const TaskCard = ({ task, index, status, deleteTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task._id, status, index, board: task.board },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-4 bg-white rounded-lg shadow-lg mb-4 flex justify-between items-center ${isDragging ? 'opacity-50' : ''}`}
    >
      <div>
        <h3 className="text-lg font-semibold">{task.text}</h3>
        <p className="text-sm text-gray-500">Priority: {task.priority}</p>
      </div>
      <button
        onClick={() => deleteTask(task._id, task.board)}
        className="text-red-500 hover:text-red-700 transition duration-300"
      >
        Delete
      </button>
    </div>
  );
};

export default TeacherTasks;
