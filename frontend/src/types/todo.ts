export interface ITodo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    userId: string;
}

export interface ITodoResponse {
    todos: ITodo[];
    total: number;
    skip: number;
    limit: number;
}

