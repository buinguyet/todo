import { useState } from "react";
import { BASE_URL } from "../utils/constants";

export const useDeleteTodo = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteTodo = async (id: string) => {
        setLoading(true);
        setError(null); // Reset error state before new request
        try {
            const response = await fetch(`${BASE_URL}/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            
            // 204 No Content is a successful response, but has no body
            if (response.status === 204) {
                return true;
            }
            
            if (!response.ok) {
                try {
                    const errorData = await response.json().catch(() => null);
                    const errorMessage = errorData?.message || `Failed to delete todo (Status: ${response.status})`;
                    throw new Error(errorMessage);
                } catch (jsonError) {
                    throw new Error(`Failed to delete todo (Status: ${response.status})`);
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

    return { deleteTodo, loading, error };
}