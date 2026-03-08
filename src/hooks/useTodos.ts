import { useState, useCallback } from 'react';
import { getTodos, toggleTodoCompleted, deleteTodo, addTodo, updateTodo, getTodoById } from '../services/todoService';
import { Todo } from '../types/todo';
import { useAuth } from '../auth/AuthContext';

export function useTodos() {
    const { user } = useAuth();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadTodos = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const data = await getTodos(user.uid);
            setTodos(data);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [user]);

    const toggle = async (todo: Todo) => {
        try {
            await toggleTodoCompleted(todo.id, todo.isCompleted);
            setTodos((prev) =>
                prev.map((t) =>
                    t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
                )
            );
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    const remove = async (id: string) => {
        try {
            await deleteTodo(id);
            setTodos((prev) => prev.filter((t) => t.id !== id));
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    const add = async (todoData: Omit<Todo, 'id' | 'userId' | 'isCompleted' | 'createdAt'>) => {
        if (!user) throw new Error('User not logged in');
        try {
            await addTodo(user.uid, todoData);
            await loadTodos(); // re-fetch to ensure sync
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    const update = async (id: string, todoData: Partial<Omit<Todo, 'id' | 'userId' | 'createdAt'>>) => {
        try {
            await updateTodo(id, todoData);
            // Optionally update local state without a full reload for performance but simplest is to reload:
            await loadTodos();
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    const getTodo = async (id: string) => {
        try {
            return await getTodoById(id);
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    return { todos, loading, error, toggle, remove, add, update, getTodo, reload: loadTodos, setError };
}
