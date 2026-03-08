import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    orderBy,
    getDoc,
} from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import type { Todo } from "../types/todo";

const COLLECTION = "todos";

/**
 * Add a new todo for the given user.
 */
export async function addTodo(
    userId: string,
    data: Omit<Todo, "id" | "userId" | "createdAt" | "isCompleted">,
): Promise<string> {
    const docRef = await addDoc(collection(firestore, COLLECTION), {
        userId,
        title: data.title,
        description: data.description,
        icon: data.icon,
        deadline: data.deadline,
        isCompleted: false,
        createdAt: new Date().toISOString(),
    });
    return docRef.id;
}

/**
 * Get all todos for the given user, ordered by deadline.
 */
export async function getTodos(userId: string): Promise<Todo[]> {
    const q = query(
        collection(firestore, COLLECTION),
        where("userId", "==", userId),
        orderBy("deadline", "asc"),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
    })) as Todo[];
}

/**
 * Get a single todo by ID.
 */
export async function getTodoById(todoId: string): Promise<Todo | null> {
    const ref = doc(firestore, COLLECTION, todoId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
        return { id: snap.id, ...snap.data() } as Todo;
    }
    return null;
}

/**
 * Update general fields of a todo.
 */
export async function updateTodo(
    todoId: string,
    data: Partial<Omit<Todo, "id" | "userId" | "createdAt">>,
): Promise<void> {
    const ref = doc(firestore, COLLECTION, todoId);
    await updateDoc(ref, data);
}

/**
 * Toggle the isCompleted field of a todo.
 */
export async function toggleTodoCompleted(
    todoId: string,
    currentValue: boolean,
): Promise<void> {
    const ref = doc(firestore, COLLECTION, todoId);
    await updateDoc(ref, { isCompleted: !currentValue });
}

/**
 * Delete a todo by ID.
 */
export async function deleteTodo(todoId: string): Promise<void> {
    const ref = doc(firestore, COLLECTION, todoId);
    await deleteDoc(ref);
}
