import React, { useState, useEffect } from "react";
import { IonContent, IonPage } from "@ionic/react";
import "./Focus.css";

const Focus: React.FC = () => {
  // State สำหรับเวลา (วินาที) Default 1 ชั่วโมง = 3600
  const [timeLeft, setTimeLeft] = useState(3600);
  const [isActive, setIsActive] = useState(false);

  // Logic การนับถอยหลัง
  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // อาจจะใส่เสียงเตือนตรงนี้
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // แปลงวินาทีเป็น HH:MM:SS
  const formatTime = (seconds: number) => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  // ปุ่ม Start
  const handleStart = () => {
    if (timeLeft > 0) setIsActive(true);
  };

  // ปุ่ม Stop
  const handleStop = () => {
    setIsActive(false);
  };

  // D-Pad Controls (เพิ่มลดเวลา)
  const adjustTime = (minutes: number) => {
    if (!isActive) {
      setTimeLeft((prev) => {
        const newTime = prev + minutes * 60;
        return newTime > 0 ? newTime : 0;
      });
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="gameboy-container">
          {/* Logo Section */}
          <div className="focus-logo">
            <h1>Noted.</h1>
          </div>

          {/* Screen Section */}
          <div className="gb-screen-bezel">
            <div className="gb-screen">
              <div className="pixel-text status-text">
                {isActive ? "RUNNING" : "PAUSED"}
              </div>
              <div className="pixel-text timer-text">
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>

          {/* Label Section */}
          <div className="focus-label">Focus</div>

          {/* Controls Section */}
          <div className="controls-area">
            {/* D-Pad */}
            <div className="d-pad">
              <div className="dp-up" onClick={() => adjustTime(5)}></div>
              <div className="dp-left"></div>
              <div className="dp-center"></div>
              <div className="dp-right"></div>
              <div className="dp-down" onClick={() => adjustTime(-5)}></div>
            </div>

            {/* A/B Buttons */}
            <div className="action-buttons">
              {/* Stop Button (บน) */}
              <div className="btn-circle-wrapper stop-btn">
                <button className="btn-circle" onClick={handleStop}></button>
                <span className="btn-label">Stop</span>
              </div>

              {/* Start Button (ล่าง) */}
              <div className="btn-circle-wrapper start-btn">
                <button className="btn-circle" onClick={handleStart}></button>
                <span className="btn-label">Start</span>
              </div>
            </div>
          </div>

          {/* Bottom Pills (Decoration) */}
          <div className="bottom-pills">
            <div className="pill-btn"></div>
            <div className="pill-btn"></div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Focus;
