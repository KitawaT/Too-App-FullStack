import React from "react";
import Taskform from "./Taskform";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = (text) => {
    const newTask = { id: Date.now(), text };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const updateTask = (id, newText) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updated);
    setEditId(null);
    setEditText("");
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
              key={task.id}
            >
              {editId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                  <button
                    onClick={() => updateTask(task.id, editText)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                  >
                    Update
                  </button>
                </>
              ) : (
                <>
                  <span className="text-gray-700">{task.text}</span>
                  <div>
                    <button
                      onClick={() =>{
                        setEditId(task.id);
                        setEditText(task.text);
                      }}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer mr-2"
                     >Edit</button> 
                    <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
