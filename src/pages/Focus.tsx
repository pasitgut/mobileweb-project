import React, { useEffect } from "react";
import { IonContent, IonPage, useIonViewWillLeave, useIonToast } from "@ionic/react";
import { useFocusTimer } from "../hooks/useFocus";
import "./Focus.css";

const Focus: React.FC = () => {
  const [presentToast] = useIonToast();
  const {
    timeLeft,
    isActive,
    toggleTimer,
    resetTimer,
    adjustTime,
    onLeave,
    error,
    successMsg,
    clearMessages,
  } = useFocusTimer(3600); // 1 ชั่วโมง default time

  useIonViewWillLeave(() => {
    onLeave();
  });

  useEffect(() => {
    if (successMsg) {
      presentToast({ message: successMsg, duration: 2000, color: "success" });
      clearMessages();
    }
    if (error) {
      presentToast({ message: error, duration: 2000, color: "danger" });
      clearMessages();
    }
  }, [successMsg, error, presentToast, clearMessages]);

  const formatTime = (seconds: number) => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <IonPage>
      <IonContent fullscreen className="focus-bg">
        <div className="focus-container">
          {/* Header Logo */}
          <div className="header-logo" style={{ display: "flex", justifyContent: "center" }}>
            <img
              src="/logo.png"
              alt="Noted."
              style={{ width: "160px", display: "block" }}
            />
          </div>

          {/* Green Screen Area */}
          <div className="screen-box">
            <div className="screen-status-text">
              {isActive ? "Running" : "Paused"}
            </div>
            <div className="screen-timer-text">{formatTime(timeLeft)}</div>
          </div>

          {/* Focus Label */}
          <div className="focus-label">Focus</div>

          {/* Controls Area */}
          <div className="controls-row">
            {/* D-Pad (Left Side) */}
            <div className="d-pad">
              <div className="dp-up" onClick={() => adjustTime(300)}></div>{" "}
              {/* +5 min */}
              <div className="dp-right"></div>
              <div
                className="dp-down"
                onClick={() => adjustTime(-300)}
              ></div>{" "}
              {/* -5 min */}
              <div className="dp-left"></div>
              <div className="dp-center"></div>
            </div>

            {/* A/B Buttons (Right Side) */}
            <div className="buttons-group">
              {/* ปุ่มบนขวา: Reset */}
              <div className="btn-item stop-pos">
                <button className="circle-btn" onClick={resetTimer}></button>
                <span className="btn-text">Reset</span>
              </div>

              {/* ปุ่มล่างซ้าย: Start/Pause */}
              <div className="btn-item start-pos">
                <button
                  className="circle-btn"
                  onClick={toggleTimer}
                ></button>
                <span className="btn-text">{isActive ? "Pause" : "Start"}</span>
              </div>
            </div>
          </div>

          {/* Bottom Pills */}
          <div className="bottom-pills-row">
            <div className="pill-gray"></div>
            <div className="pill-gray"></div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Focus;
