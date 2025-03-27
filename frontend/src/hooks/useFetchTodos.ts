import { useCallback, useEffect, useState } from "react";
import { ITodoResponse } from "../types/todo";
import { BASE_URL, LIMIT } from "../utils/constants";

interface IFetchTodoProps {
    limit?: number
    page?: number
}

export const useFetchTodos = ({limit= LIMIT, page}: IFetchTodoProps) => {
    const [todos, setTodos] = useState<ITodoResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTodos = useCallback(async () => {
        setLoading(true);
        setError(null); // Reset error state before new request
        try {
            const skip = page ? (page - 1) * limit : 0;
            const response = await fetch(`${BASE_URL}/todos?limit=${limit}&skip=${skip}`);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                const errorMessage = errorData?.message || `Failed to fetch todos (Status: ${response.status})`;
                throw new Error(errorMessage);
            }
            
            const data = await response.json() as ITodoResponse;
            setTodos(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [limit, page]);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return {
        todos,
        loading,
        error,
        refetch: fetchTodos // Add refetch function to allow manual refreshing
    };
}