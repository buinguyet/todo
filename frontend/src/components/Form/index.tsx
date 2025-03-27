import React, { useState, FormEvent } from 'react';
import './style.css';

interface TodoFormProps {
  onAddTodo: (title: string, description?: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title.trim(), description.trim());
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      <div className="form-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task name..."
          className="todo-input"
          required
        />
      </div>
      <div className="form-row">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description..."
          className="todo-input"
        />
      </div>
      <button type="submit" className="todo-button">
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;