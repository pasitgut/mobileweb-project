import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonIcon,
  useIonViewWillEnter,
} from "@ionic/react";
import { useHistory } from "react-router-dom"; // สำหรับเปลี่ยนหน้า
import { auth } from "../firebaseConfig";
import { useTodos } from "../hooks/useTodos";
import { useTodayFocusTotal } from "../hooks/useFocus";
import { TodoItem } from "../components/common/TodoItem";
import "./Home.css";

const Home: React.FC = () => {
  const history = useHistory();
  const [userName, setUserName] = useState<string>("User");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [dailyAdvice, setDailyAdvice] = useState<string>("Loading advice...");

  const { todos, toggle, reload: reloadTodos } = useTodos();
  const { focusMinutes, reloadFocus } = useTodayFocusTotal();

  // ใช้ useIonViewWillEnter เพื่อโหลดข้อมูลใหม่ทุกครั้งที่กลับมาหน้านี้ (เผื่ออนาคตต่อ Database)
  useIonViewWillEnter(() => {
    // โค้ดเช็ค Auth
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName || user.email?.split("@")[0] || "User");
        reloadTodos();
        reloadFocus();
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

    // Fetch Daily Advice from external API
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) => {
        if (data?.slip?.advice) {
          setDailyAdvice(`"${data.slip.advice}"`);
        }
      })
      .catch((error) => {
        console.error("Error fetching advice:", error);
        setDailyAdvice('"Keep pushing forward!"'); // Fallback
      });

    return () => unsubscribe();
  });

  const toggleTodo = async (todo: any) => {
    await toggle(todo);
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
            <img
              src="/logo.png"
              alt="Noted."
              className="logo-img"
              style={{ width: "160px", display: "block", marginBottom: "5px" }}
            />
            <div className="welcome-text">Welcome Back, {userName}</div>
            <div className="date-text">{currentDate}</div>
          </div>

          {/* Quote Banner (External API Integration) - Replaces Focus */}
          <div className="quote-banner">
            <h3 className="quote-title">Daily Advice</h3>
            <p className="quote-text">{dailyAdvice}</p>
          </div>

          {/* Relocated Today's Focus Card */}
          <div className="focus-mini-card">
            <div className="focus-mini-label">🎯 Today's Focus</div>
            <div className="focus-mini-value">{focusMinutes} min</div>
          </div>

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
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onEdit={(e, id) => {
                  e.stopPropagation();
                  history.push(`/edit-todo/${id}`);
                }}
                showDelete={true}
              />
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
