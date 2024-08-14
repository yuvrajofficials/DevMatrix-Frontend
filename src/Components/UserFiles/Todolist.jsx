import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardHeader from './DashboardHeader';
const Todolist = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
  
    // Load tasks from local storage on component mount
    useEffect(() => {
      const storedTasks = JSON.parse(localStorage.getItem('tasks'));
      if (storedTasks) {
        setTasks(storedTasks);
      }
    }, []);
  
    // Save tasks to local storage whenever the tasks array changes
    useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
  
    const addTask = () => {
      if (inputValue.trim()) {
        setTasks([...tasks, inputValue]);
        setInputValue('');
      }
    };
  
    const removeTask = (index) => {
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    };
  return (
    <>
   <DashboardHeader>
   <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="border p-2 rounded w-full"
        />
        <button
          onClick={addTask}
          className="mt-2 p-2 bg-green-500 text-white rounded w-full"
        >
          Add Task
        </button>
      </div>
      <ul className="list-disc pl-5">
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            {task}
            <button
              onClick={() => removeTask(index)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
   </DashboardHeader>
    
    </>
  )
}

export default Todolist
