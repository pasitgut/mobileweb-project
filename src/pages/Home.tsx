import React, { useState, useEffect } from "react";
import { IonContent, IonPage, IonIcon } from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { auth } from "../firebaseConfig";
import "./Home.css";

interface TodoItem {
  id: number;
  title: string;
  statusText: string;
  originalStatus: "coming soon" | "Missed";
  date: string;
  isCompleted: boolean;
  icon: string;
}

const Home: React.FC = () => {
  const [userName, setUserName] = useState<string>("User");
  const [currentDate, setCurrentDate] = useState<string>("");

  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: 1,
      title: "พาหมาไปเดินเล่น",
      statusText: "coming soon",
      originalStatus: "coming soon",
      date: "13 December 2023",
      isCompleted: false,
      icon: "🐶",
    },
    {
      id: 2,
      title: "ส่งงาน Software Engineering",
      statusText: "Missed",
      originalStatus: "Missed",
      date: "13 December 2023",
      isCompleted: false,
      icon: "📓",
    },
    {
      id: 3,
      title: "ส่งงาน Web Mobile App",
      statusText: "Completed",
      originalStatus: "coming soon",
      date: "13 December 2023",
      isCompleted: true,
      icon: "📓",
    },
    // {
    //   id: 4,
    //   title: "Mobile Web Project",
    //   statusText: "Missed",
    //   originalStatus: "coming soon",
    //   date: "13 December 2023",
    //   isCompleted: true,
    //   icon: "",
    // },
    // {
    //   id: 5,
    //   title: "Mobile Web Project",
    //   statusText: "Missed",
    //   originalStatus: "coming soon",
    //   date: "13 December 2023",
    //   isCompleted: true,
    //   icon: "",
    // },
    // {
    //   id: 6,
    //   title: "Mobile Web Project",
    //   statusText: "Missed",
    //   originalStatus: "coming soon",
    //   date: "13 December 2023",
    //   isCompleted: true,
    //   icon: "",
    // },
    // {
    //   id: 7,
    //   title: "Mobile Web Project",
    //   statusText: "Missed",
    //   originalStatus: "coming soon",
    //   date: "13 December 2023",
    //   isCompleted: true,
    //   icon: "",
    // },
  ]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName || user.email?.split("@")[0] || "User");
      }
    });

    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    setCurrentDate(date.toLocaleDateString("en-GB", options));

    return () => unsubscribe();
  }, []);

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          const newCompleted = !todo.isCompleted;
          return {
            ...todo,
            isCompleted: newCompleted,
            statusText: newCompleted ? "Completed" : todo.originalStatus,
          };
        }
        return todo;
      }),
    );
  };

  const getStatusColorClass = (status: string) => {
    if (status === "coming soon") return "status-green";
    if (status === "Missed") return "status-red";
    if (status === "Completed") return "status-yellow";
    return "";
  };

  return (
    <IonPage>
      <IonContent fullscreen className="master">
        <div className="home-container">
          {/* Header */}
          <div className="home-header">
            <h1 className="logo-text">Noted.</h1>
            <div className="welcome-text">Welcome Back ({userName})</div>
            <div className="date-text">{currentDate}</div>
          </div>

          {/* Gray Box Banner */}
          <div className="gray-banner"></div>

          {/* To-do Section */}
          <div className="todo-header-row">
            <h2 className="section-title">To-do</h2>
            <a className="add-btn">Add-To-do</a>
          </div>

          {/* Todo List */}
          <div className="todo-list">
            {todos.map((todo) => (
              <div key={todo.id} className="todo-card">
                {/* Icon */}
                <div className="todo-icon">{todo.icon}</div>

                {/* Text Info */}
                <div className="todo-info">
                  <div
                    className={`todo-title ${todo.isCompleted ? "completed" : ""}`}
                  >
                    {todo.title}
                  </div>
                  <div className="todo-meta">
                    <span className={getStatusColorClass(todo.statusText)}>
                      {todo.statusText}
                    </span>
                    <span style={{ color: "#999", margin: "0 5px" }}>|</span>
                    <span>{todo.date}</span>
                  </div>
                </div>

                {/* Checkbox */}
                <div
                  className={`custom-checkbox ${todo.isCompleted ? "checked" : ""}`}
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.isCompleted && (
                    <IonIcon icon={checkmark} className="check-mark" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
