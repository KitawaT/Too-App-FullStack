import React from "react";
import Taskform from "./Taskform";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (text) => {
    const newTask = { id: Date.now(), text };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-10">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>
        <Taskform onAdd={addTask} />
        <ul className="space-y-2 m-2">
          {tasks.map((task) => (
            <li 
            className="p-3 bg-gray-100 border rounded flex justify-between items-center"
            key={task.id}>{task.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
