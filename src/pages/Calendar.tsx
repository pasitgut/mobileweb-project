import React, { useState } from "react";
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
} from "date-fns";
import "./Calendar.css";

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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

    if (isLeftSwipe) {
      nextMonth();
    }
    if (isRightSwipe) {
      prevMonth();
    }

    setTouchStart(0);
    setTouchEnd(0);
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
                <IonIcon icon={chevronBack} />
              </IonButton>
              <IonButton onClick={nextMonth} color="light">
                <IonIcon icon={chevronForward} />
              </IonButton>
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent color="dark" fullscreen>
        <div
          style={{ padding: "0 10px", background: "white", minHeight: "100%" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
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
                if (day) {
                  const thisDate = new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth(),
                    day,
                  );
                  isSelected = isSameDay(thisDate, selectedDate);
                }

                return (
                  <IonCol key={index} size="1.7" className="ion-no-padding">
                    <div
                      onClick={() => day && onDateClick(day)}
                      className={`calendar-day ${isSelected ? "selected-day" : ""} ${!day ? "empty-day" : ""}`}
                    >
                      {day || ""}
                    </div>
                  </IonCol>
                );
              })}
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Calendar;
