import { useState } from "react";
import { BASE_URL } from "../utils/constants";

export const useAddTodo = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addTodo = async (title: string, description?: string) => {
        setLoading(true);
        setError(null); // Reset error state before new request
        try {
            const response = await fetch(`${BASE_URL}/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description }),
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                const errorMessage = errorData?.message || `Failed to add todo (Status: ${response.status})`;
                throw new Error(errorMessage);
            }
            
            const data = await response.json();
            return data;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { addTodo, loading, error };
}