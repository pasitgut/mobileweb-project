import React from 'react';
import { IonIcon } from '@ionic/react';
import { checkmark, trashOutline, checkmarkOutline, pencilOutline } from 'ionicons/icons';
import { Todo, getTodoStatus, getStatusColorClass } from '../../types/todo';
import './TodoItem.css';

interface TodoItemProps {
    todo: Todo;
    onToggle: (todo: Todo) => void;
    onDelete?: (e: React.MouseEvent, id: string) => void;
    onEdit?: (e: React.MouseEvent, id: string) => void;
    showDelete?: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({
    todo,
    onToggle,
    onDelete,
    onEdit,
    showDelete = false
}) => {
    const statusText = getTodoStatus(todo);
    const formattedDate = new Date(todo.deadline).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div
            className={`todo-card ${todo.isCompleted ? "card-completed" : ""}`}
            onClick={() => onToggle(todo)}
        >
            {/* Icon Section */}
            <div className="todo-icon-wrapper">
                <span className="emoji-icon">{todo.icon}</span>
            </div>

            {/* Text Info */}
            <div className="todo-info">
                <div className={`todo-title ${todo.isCompleted ? "text-crossed" : ""}`}>
                    {todo.title}
                </div>
                <div className="todo-meta">
                    <span className={`status-label ${getStatusColorClass(statusText)}`}>
                        {statusText}
                    </span>
                    <span className="separator">|</span>
                    <span className="date-label">{formattedDate}</span>
                </div>
            </div>

            {/* Checkbox Section */}
            <div className="checkbox-wrapper" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {showDelete && onEdit && (
                    <div
                        className="delete-btn"
                        onClick={(e) => onEdit(e, todo.id)}
                        style={{ fontSize: "1.5rem", color: "#666", zIndex: 10 }}
                    >
                        <IonIcon icon={pencilOutline} />
                    </div>
                )}
                {showDelete && onDelete && (
                    <div
                        className="delete-btn"
                        onClick={(e) => onDelete(e, todo.id)}
                        style={{ fontSize: "1.5rem", color: "#ECECEC", zIndex: 10 }}
                    >
                        <IonIcon icon={trashOutline} />
                    </div>
                )}
                <div className={`custom-checkbox ${todo.isCompleted ? "checked" : ""}`}>
                    {todo.isCompleted && (
                        <IonIcon icon={checkmark} className="check-mark-icon" />
                    )}
                </div>
            </div>
        </div>
    );
};
