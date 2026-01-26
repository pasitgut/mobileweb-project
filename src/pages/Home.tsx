import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonIcon,
  useIonViewWillEnter,
} from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { useHistory } from "react-router-dom"; // สำหรับเปลี่ยนหน้า
import { auth } from "../firebaseConfig";
import "./Home.css";

interface TodoItem {
  id: number;
  title: string;
  statusText: string;
  originalStatus: "coming soon" | "Missed" | "Completed";
  date: string;
  isCompleted: boolean;
  icon: string; // รองรับทั้ง Emoji หรือ URL รูปภาพ
}

const Home: React.FC = () => {
  const history = useHistory();
  const [userName, setUserName] = useState<string>("User");
  const [currentDate, setCurrentDate] = useState<string>("");

  // Mock Data
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
      icon: "💻",
    },
  ]);

  // ใช้ useIonViewWillEnter เพื่อโหลดข้อมูลใหม่ทุกครั้งที่กลับมาหน้านี้ (เผื่ออนาคตต่อ Database)
  useIonViewWillEnter(() => {
    // โค้ดเช็ค Auth
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName || user.email?.split("@")[0] || "User");
      }
    });

    // ตั้งค่าวันที่ปัจจุบัน
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    setCurrentDate(date.toLocaleDateString("en-GB", options));

    return () => unsubscribe();
  });

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

  const goToAddTodo = () => {
    history.push("/add-todo"); // เปลี่ยน path ตาม Router ของคุณ
  };

  return (
    <IonPage>
      <IonContent fullscreen className="master-content">
        <div className="home-container">
          {/* Header */}
          <div className="home-header">
            <h1 className="logo-text">Noted.</h1>
            <div className="welcome-text">Welcome Back, {userName}</div>
            <div className="date-text">{currentDate}</div>
          </div>

          {/* Gray Box Banner (Placeholder for Chart/Focus) */}
          <div className="gray-banner">{/* ใส่ Content ในอนาคตตรงนี้ */}</div>

          {/* To-do Section */}
          <div className="todo-header-row">
            <h2 className="section-title">To-do</h2>
            <div className="add-btn" onClick={goToAddTodo}>
              Add-To-do
            </div>
          </div>

          {/* Todo List */}
          <div className="todo-list">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`todo-card ${todo.isCompleted ? "card-completed" : ""}`}
                onClick={() => toggleTodo(todo.id)} // กดที่การ์ดเพื่อ Toggle ได้เลย (UX ดีกว่า)
              >
                {/* Icon Section */}
                <div className="todo-icon-wrapper">
                  {/* ถ้า icon เป็น emoji */}
                  <span className="emoji-icon">{todo.icon}</span>

                  {/* ถ้าอนาคตใช้รูปภาพ ให้ใช้ tag นื้แทน: 
                     <img src={todo.icon} alt="icon" /> 
                  */}
                </div>

                {/* Text Info */}
                <div className="todo-info">
                  <div
                    className={`todo-title ${todo.isCompleted ? "text-crossed" : ""}`}
                  >
                    {todo.title}
                  </div>
                  <div className="todo-meta">
                    <span
                      className={`status-label ${getStatusColorClass(todo.statusText)}`}
                    >
                      {todo.statusText}
                    </span>
                    <span className="separator">|</span>
                    <span className="date-label">{todo.date}</span>
                  </div>
                </div>

                {/* Checkbox */}
                <div className="checkbox-wrapper">
                  <div
                    className={`custom-checkbox ${todo.isCompleted ? "checked" : ""}`}
                  >
                    {todo.isCompleted && (
                      <IonIcon icon={checkmark} className="check-mark-icon" />
                    )}
                  </div>
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
