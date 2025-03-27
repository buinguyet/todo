import React, { useState, FormEvent } from 'react';
import './style.css';

interface EditFormProps {
  id: string;
  initialTitle: string;
  initialDescription?: string;
  initialCompleted: boolean;
  onSave: (id: string, title: string, description?: string, completed?: boolean) => void;
  onCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ 
  id, 
  initialTitle, 
  initialDescription = '', 
  initialCompleted,
  onSave, 
  onCancel 
}) => {
  const [title, setTitle] = useState<string>(initialTitle);
  const [description, setDescription] = useState<string>(initialDescription || '');
  const [completed, setCompleted] = useState<boolean>(initialCompleted);
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(id, title.trim(), description.trim(), completed);
    }
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <h3>Edit Task</h3>
      <div className="form-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task name..."
          className="edit-input"
          required
        />
      </div>
      <div className="form-row">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description..."
          className="edit-input"
        />
      </div>
      <div className="form-row">
        <label htmlFor="status" className="status-label">Status:</label>
        <select 
          id="status" 
          className="status-select"
          value={completed ? "completed" : "pending"}
          onChange={(e) => setCompleted(e.target.value === "completed")}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="edit-actions">
        <button type="button" onClick={onCancel} className="cancel-button">
          Cancel
        </button>
        <button type="submit" className="save-button">
          Save
        </button>
      </div>
    </form>
  );
};

export default EditForm; 