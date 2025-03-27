import React from 'react';
import './App.css';
import Todo from './pages/Todo';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">Task Management App</h1>
        <p className="app-subtitle">Easily manage all your tasks</p>
      </header>
      <Todo />
    </div>
  );
}

export default App;
