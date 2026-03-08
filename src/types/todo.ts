export interface Todo {
  id: string;           // Firestore document ID
  userId: string;       // owner (auth.uid)
  title: string;
  description: string;
  icon: string;         // emoji string e.g. "🐶"
  deadline: string;     // ISO 8601 datetime string
  isCompleted: boolean;
  createdAt: string;    // ISO 8601 datetime string
}

export interface FocusSession {
  id: string;
  userId: string;
  durationSeconds: number;
  completedAt: string;  // ISO 8601
}

export interface UserProfile {
  uid: string;
  username: string;
  email: string;
  phone: string;
  birthday?: string;    // DD/MM/YYYY
  gender?: string;
  createdAt: string;
}

/**
 * Compute display status from a Todo item.
 */
export function getTodoStatus(todo: Todo): "Completed" | "Missed" | "Coming soon" {
  if (todo.isCompleted) return "Completed";
  if (new Date(todo.deadline) < new Date()) return "Missed";
  return "Coming soon";
}

export function getStatusColorClass(status: string): string {
  if (status === "Coming soon") return "status-green";
  if (status === "Missed") return "status-red";
  if (status === "Completed") return "status-yellow";
  return "";
}
