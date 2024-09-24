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

      // Fetch boards from the backend
      const fetchBoards = async () => {
        try {
          const response = await fetch(`${backendUrl}/api/v1/teacher/taskmanagement/board`);
          const data = await response.json();
          setBoards(data);
        } catch (error) {
          console.error('Error fetching boards:', error);
        }
      };

      // Fetch tasks by selected board
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

      // Create a new task
      const createNewTask = async () => {
        if (!newTask.trim()) return;

        try {
          console.log(newTask)
          const response = await fetch(`${backendUrl}/api/v1/teacher/taskmanagement/tasks/createTask`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: newTask,
              priority: 'low',
              board: selectedBoard,
            }),
          });
          const newTaskData = await response.json();
          fetchTasksByBoard(selectedBoard); // Refresh the tasks
          setNewTask('');
        } catch (error) {
          console.error('Error creating task:', error);
        }
      };

      // Move task between columns
      const moveTask = async (item, toStatus) => {
        try {
          const { id, board } = item;
          await fetch(`${backendUrl}/api/v1/teacher/taskmanagement/tasks/${id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: toStatus }),
          });
          fetchTasksByBoard(board); // Refresh the tasks
        } catch (error) {
          console.error('Error moving task:', error);
        }
      };

      // Add new board
      const addNewBoard = async (boardName) => {
        if (!boardName.trim()) return;
      
        try {
          const response = await fetch(`${backendUrl}/api/v1/teacher/taskmanagement/board`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: boardName }),
          });
          
      
          if (!response.ok) {
            // Log status and response text for debugging
            console.error('Failed to add board. Status:', response.status);
            const errorText = await response.text();
            console.error('Error Response Text:', errorText);
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
              <h1 className="text-3xl font-bold text-center mb-10">Kanban Task Manager</h1>

              <div className="flex justify-between items-center mb-6">
                <input
                  type="text"
                  placeholder="Add a new board..."
                  className="border p-2 rounded-lg w-64"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') addNewBoard(e.target.value);
                  }}
                />

                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="border p-2 rounded-lg w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex justify-center mb-6">
                <select
                  value={selectedBoard}
                  onChange={(e) => setSelectedBoard(e.target.value)}
                  className="border p-2 rounded-lg"
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
                <Column title="To Do" tasks={taskData[selectedBoard]?.todo || []} status="todo" moveTask={moveTask} />
                <Column title="In Progress" tasks={taskData[selectedBoard]?.inProgress || []} status="inProgress" moveTask={moveTask} />
                <Column title="Done" tasks={taskData[selectedBoard]?.done || []} status="done" moveTask={moveTask} />
              </div>

              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Add a new task..."
                  className="border p-2 rounded-lg w-full"
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

    const Column = ({ title, tasks, status, moveTask }) => {
      const [, drop] = useDrop({
        accept: 'TASK',
        drop: (item) => moveTask(item, status),
      });

      return (
        <div ref={drop} className="p-4 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks in this section</p>
          ) : (
            tasks.map((task, index) => <TaskCard key={index} task={task} index={index} status={status} />)
          )}
        </div>
      );
    };

    const TaskCard = ({ task, index, status }) => {
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
          className={`p-4 bg-white rounded-lg shadow-lg mb-4 ${isDragging ? 'opacity-50' : ''}`}
        >
          <h3 className="text-lg font-semibold">{task.text}</h3>
          <p className="text-sm text-gray-500">Priority: {task.priority}</p>
        </div>
      );
    };

    export default TeacherTasks;
