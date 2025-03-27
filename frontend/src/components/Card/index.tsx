import { useState } from "react";
import { ITodo } from "../../types/todo";
import EditForm from "../EditForm";
import "./style.css";

export default function Card({
  todo,
  onEdit,
  onDelete,
}: {
  todo: ITodo;
  onEdit: (id: string, title: string, description?: string, completed?: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (id: string, title: string, description?: string, completed?: boolean) => {
    onEdit(id, title, description, completed);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="card">
        <EditForm
          id={todo.id}
          initialTitle={todo.title}
          initialDescription={todo.description}
          initialCompleted={todo.completed}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  return (
    <div className="card">
      <h3>{todo.title}</h3>
      {todo.description && <p>{todo.description}</p>}
      <div className="card-status">
        <span className={`status ${todo.completed ? "completed" : "pending"}`}>
          {todo.completed ? "Completed" : "Pending"}
        </span>
      </div>
      <div className="card-actions">
        <button
          className="card-button edit-button"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button className="card-button delete-button" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
