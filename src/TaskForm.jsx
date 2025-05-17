import React from 'react'
import { useState } from 'react'

function Taskform({onAdd}) {
  const [task, setTask] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === '') return;
      onAdd(task);
      setTask('');
    }

  return (

    <form onSubmit={handleSubmit}  className="flex gap-2 mb-4">
        <input 
        type="text" 
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder=' Enter your task'
        
        />
        <button 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer "
        type='submit'>Add Task</button>
    </form>
  )
}

export default Taskform