import { useState } from "react";
import { BASE_URL } from "../utils/constants";

export const useEditTodo = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const editTodo = async (id: string, title: string, description?: string, completed?: boolean) => {
        setLoading(true);
        setError(null); // Reset error state before new request
        try {
            const response = await fetch(`${BASE_URL}/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    title, 
                    description,
                    completed: completed !== undefined ? completed : undefined
                }),
            });
            
            // 204 No Content is a successful response, but has no body
            if (response.status === 204) {
                return true;
            }
            
            if (!response.ok) {
                try {
                    const errorData = await response.json().catch(() => null);
                    const errorMessage = errorData?.message || `Failed to edit todo (Status: ${response.status})`;
                    throw new Error(errorMessage);
                } catch (jsonError) {
                    throw new Error(`Failed to edit todo (Status: ${response.status})`);
                }
            }
            
            // For other successful responses, try to parse JSON if present
            try {
                const data = await response.json();
                return data;
            } catch (e) {
                // If no JSON but response was ok, still return success
                return true;
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { editTodo, loading, error };
}