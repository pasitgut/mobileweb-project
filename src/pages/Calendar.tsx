import React, { useState, useMemo } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
  IonButtons,
} from "@ionic/react";
import { chevronBack, chevronForward } from "ionicons/icons";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  getDay,
  isSameDay,
  getDaysInMonth,
  parseISO,
} from "date-fns";
import { useTodos } from "../hooks/useTodos";
import { useIonViewWillEnter } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { TodoItem } from "../components/common/TodoItem";
import "./Calendar.css";

const Calendar: React.FC = () => {
  const history = useHistory();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const { todos, toggle, reload } = useTodos();

  useIonViewWillEnter(() => {
    reload();
  });

  const numDays = getDaysInMonth(currentMonth);
  const startDay = getDay(startOfMonth(currentMonth));
  const prefixDays = startDay === 0 ? 6 : startDay - 1;

  const daysArray = [
    ...Array(prefixDays).fill(null),
    ...Array.from({ length: numDays }, (_, i) => i + 1),
  ];

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const onDateClick = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    setSelectedDate(newDate);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextMonth();
    if (isRightSwipe) prevMonth();

    setTouchStart(0);
    setTouchEnd(0);
  };

  // --- Filter Todos ตามวันที่เลือก ---
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const todoDate = new Date(todo.deadline);
      return isSameDay(todoDate, selectedDate);
    });
  }, [todos, selectedDate]);

  const toggleTodo = async (todo: any) => {
    await toggle(todo);
  };

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar color="dark">
          <div
            style={{
              paddingTop: "20px",
              background: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div className="header-year">{format(currentMonth, "yyyy")}</div>
              <div className="header-month">{format(currentMonth, "MMMM")}</div>
            </div>

            <IonButtons slot="end" className="nav-buttons">
              <IonButton onClick={prevMonth} color="light">
                <IonIcon icon={chevronBack} style={{ color: "black" }} />
              </IonButton>
              <IonButton onClick={nextMonth} color="light">
                <IonIcon icon={chevronForward} style={{ color: "black" }} />
              </IonButton>
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light" fullscreen>
        <div
          style={{ padding: "0 10px", background: "white", minHeight: "100%" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Calendar Grid */}
          <IonGrid className="calendar-grid">
            <IonRow>
              {weekDays.map((day, index) => (
                <IonCol key={index} className="day-header">
                  {day}
                </IonCol>
              ))}
            </IonRow>

            <IonRow>
              {daysArray.map((day, index) => {
                let isSelected = false;
                let hasTodo = false;
                if (day) {
                  const thisDate = new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth(),
                    day,
                  );
                  isSelected = isSameDay(thisDate, selectedDate);

                  // หาว่าในวันนี้มี task ใดๆ หรือไม่
                  hasTodo = todos.some((t) => isSameDay(new Date(t.deadline), thisDate));
                }

                return (
                  <IonCol key={index} size="1.7" className="ion-no-padding">
                    <div
                      onClick={() => day && onDateClick(day)}
                      className={`calendar-day ${isSelected ? "selected-day" : ""
                        } ${!day ? "empty-day" : ""}`}
                    >
                      {day || ""}
                      {hasTodo && <div className="calendar-dot" />}
                    </div>
                  </IonCol>
                );
              })}
            </IonRow>
          </IonGrid>

          {/* --- Todo List Section --- */}
          <div className="todo-container">
            <h3 className="todo-header-date">
              Tasks for {format(selectedDate, "dd MMMM")}
            </h3>

            {filteredTodos.length === 0 ? (
              <div className="no-tasks">No tasks for this day</div>
            ) : (
              filteredTodos.map((todo) => (
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
              ))
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Calendar;
