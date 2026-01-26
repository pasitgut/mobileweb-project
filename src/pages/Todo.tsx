import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { chevronDownOutline, checkmarkOutline } from "ionicons/icons";
import "./Todo.css";

// Mock Data structure based on the image
const initialTodos = [
  {
    id: 1,
    title: "พาหมาไปเดินเล่น",
    statusText: "coming soon",
    statusColor: "status-green",
    date: "13 December 2028",
    icon: "🐶", // Using emoji as placeholder for the dog image
    isCompleted: false,
  },
  {
    id: 2,
    title: "ส่งงาน Software Engineering",
    statusText: "Missed",
    statusColor: "status-red",
    date: "13 December 2028",
    icon: "📓", // Using emoji for notebook
    isCompleted: false,
  },
  {
    id: 3,
    title: "ส่งงาน Web Mobile App",
    statusText: "Completed",
    statusColor: "status-yellow",
    date: "13 December 2028",
    icon: "📓",
    isCompleted: true,
  },
];

const Todo: React.FC = () => {
  const [todos, setTodos] = useState(initialTodos);

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };

  return (
    <IonPage className="todo-page">
      {/* Header */}
      <IonHeader className="ion-no-border">
        <div className="todo-header">
          <div className="header-left">
            <h1 className="pixel-font title-text">To-do</h1>
            <div className="filter-chip">
              All <IonIcon icon={chevronDownOutline} />
            </div>
          </div>
          <div className="header-right">
            <span className="pixel-font add-btn-text">Add-To-do</span>
          </div>
        </div>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="todo-list">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-card ${todo.isCompleted ? "completed-card" : ""}`}
              onClick={() => toggleTodo(todo.id)}
            >
              {/* Icon Section */}
              <div className="todo-icon-wrapper">
                <span className="emoji-icon">{todo.icon}</span>
              </div>

              {/* Text Section */}
              <div className="todo-details">
                <h3
                  className={`todo-title ${todo.isCompleted ? "strikethrough" : ""}`}
                >
                  {todo.title}
                </h3>
                <p className="todo-meta">
                  <span className={`status-text ${todo.statusColor}`}>
                    {todo.statusText}
                  </span>
                  <span className="date-sep"> | </span>
                  <span className="date-text">{todo.date}</span>
                </p>
              </div>

              {/* Checkbox Section */}
              <div className="todo-checkbox-wrapper">
                <div
                  className={`custom-checkbox ${todo.isCompleted ? "checked" : ""}`}
                >
                  {todo.isCompleted && <IonIcon icon={checkmarkOutline} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Todo;
