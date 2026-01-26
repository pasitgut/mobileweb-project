import React, { useState, useEffect } from "react";
import { IonContent, IonPage, useIonViewWillLeave } from "@ionic/react";
import "./Focus.css";

const Focus: React.FC = () => {
  const defaultTime = 3600; // 1 ชั่วโมง
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [isActive, setIsActive] = useState(false);

  useIonViewWillLeave(() => {
    setIsActive(false);
  });

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  // ฟังก์ชันปุ่ม Start/Pause
  const handleToggleTimer = () => {
    if (timeLeft > 0) {
      setIsActive(!isActive);
    }
  };

  // ฟังก์ชันปุ่ม Reset
  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(defaultTime);
  };

  const adjustTime = (seconds: number) => {
    if (!isActive) {
      setTimeLeft((prev) => {
        const newTime = prev + seconds;
        return newTime > 0 ? newTime : 0;
      });
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="focus-bg">
        <div className="focus-container">
          {/* Header Logo */}
          <div className="header-logo">Noted.</div>

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
                <button className="circle-btn" onClick={handleReset}></button>
                <span className="btn-text">Reset</span>
              </div>

              {/* ปุ่มล่างซ้าย: Start/Pause */}
              <div className="btn-item start-pos">
                <button
                  className="circle-btn"
                  onClick={handleToggleTimer}
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
