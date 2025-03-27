import { useCallback, useEffect, useMemo, useState } from "react";
import { useFetchTodos } from "../../hooks/useFetchTodos";
import Card from "../../components/Card";
import "./style.css";
import { LIMIT } from "../../utils/constants";
import TodoForm from "../../components/Form";
import { useAddTodo } from "../../hooks/useAddTodo";
import { useDeleteTodo } from "../../hooks/useDeleteTodo";
import { useEditTodo } from "../../hooks/useEditTodo";

export default function Todo() {
  const [page, setPage] = useState(1);

  const { todos, loading, error, refetch } = useFetchTodos({ limit: LIMIT, page });

  const isDisabledNextButton = useMemo(() => {
    if (todos?.total && todos.total <= page * LIMIT) {
      return true;
    }
    return false;
  }, [page, todos?.total]);

  const handleNextPage = useCallback(() => {
    if (isDisabledNextButton) return;
    setPage(page + 1);
  }, [page, isDisabledNextButton]);

  const handlePreviousPage = useCallback(() => {
    if (todos?.total && page > 1) {
      setPage(page - 1);
    }
  }, [page, todos?.total]);

  const {
    addTodo,
    loading: loadingAddTodo,
    error: errorAddTodo,
  } = useAddTodo();
  
  const {
    editTodo,
    loading: loadingEditTodo,
    error: errorEditTodo,
  } = useEditTodo();
  
  const {
    deleteTodo,
    loading: loadingDeleteTodo,
    error: errorDeleteTodo,
  } = useDeleteTodo();

  const isLoading = loading || loadingAddTodo || loadingEditTodo || loadingDeleteTodo;
  const errorMessage = error || errorAddTodo || errorEditTodo || errorDeleteTodo;

  // Handle pagination after data changes
  useEffect(() => {
    // If we're not on page 1, and the current page has no items but total items exist,
    // this means we need to go to the previous page
    if (
      page > 1 && 
      todos?.todos?.length === 0 && 
      todos?.total && 
      todos.total > 0
    ) {
      setPage(page - 1);
    }
  }, [todos, page]);

  // Handle successful CRUD operations
  const handleAddTodo = async (title: string, description?: string) => {
    const result = await addTodo(title, description);
    if (result) {
      // After adding, refresh data and go to the first page if we were showing "no items"
      await refetch();
      if (todos?.todos?.length === 0) {
        setPage(1);
      }
    }
  };

  const handleEditTodo = async (id: string, title: string, description?: string, completed?: boolean) => {
    const result = await editTodo(id, title, description, completed);
    if (result) {
      refetch(); // Refresh the todo list after successful edit
    }
  };

  const handleDeleteTodo = async (id: string) => {
    const result = await deleteTodo(id);
    if (result) {
      // For deletion, we just refetch. The useEffect will handle page navigation if needed
      refetch();
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1 className="todo-title">Task Management</h1>
      </div>
      
      <TodoForm onAddTodo={handleAddTodo} />
      
      {isLoading && (
        <div className="loading-container">
          <p>Loading data...</p>
        </div>
      )}
      
      {errorMessage && (
        <div className="error-container">
          <p>Error: {errorMessage}</p>
          <button 
            onClick={() => refetch()} 
            className="retry-button"
          >
            Retry
          </button>
        </div>
      )}
      
      {!isLoading && !errorMessage && (!todos?.todos?.length ? (
        <div className="no-todos">
          <p>No tasks found. Please create a new task.</p>
        </div>
      ) : (
        <div className="todo-grid">
          {todos.todos.map((todo) => (
            <Card
              key={todo.id}
              todo={todo}
              onEdit={handleEditTodo}
              onDelete={handleDeleteTodo}
            />
          ))}
        </div>
      ))}

      {todos?.todos?.length && (
        <div className="pagination">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="pagination-button"
          >
            Previous
          </button>
          
          <div className="page-info">
            Page {page} {todos?.total ? `/ ${Math.ceil(todos.total / LIMIT)}` : ''}
          </div>
          
          <button
            onClick={handleNextPage}
            disabled={isDisabledNextButton}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
