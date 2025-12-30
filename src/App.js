import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const clearAll = () => {
    setTasks([]);
  };

  return (
    <div className="app-container">
      <h1>📝 My Todo List</h1>
      
      <div className="card">
        <div className="input-section">
          <input 
            type="text" 
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask} className="add-btn">Add</button>
        </div>

        <div className="stats">
          <p>Total: {tasks.length} | Completed: {tasks.filter(t => t.completed).length}</p>
        </div>

        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <div className="task-content">
                <input 
                  type="checkbox" 
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span>{task.text}</span>
              </div>
              <button onClick={() => deleteTask(task.id)} className="delete-btn">
                ✕
              </button>
            </li>
          ))}
        </ul>

        {tasks.length > 0 && (
          <button onClick={clearAll} className="clear-btn">
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
