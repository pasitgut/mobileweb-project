import React, { useState, useEffect } from "react";
import { IonContent, IonPage, useIonViewWillLeave } from "@ionic/react";
import "./Focus.css";

const Focus: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(1500); // เริ่มต้น 25 นาที (Pomodoro)
  const [isActive, setIsActive] = useState(false);

  // หยุดเวลาเมื่อออกจากหน้านี้ (Cleanup)
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
      // Play sound or vibrate here if needed
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    // กรณีเกิน 1 ชม. ให้โชว์แค่ MM:SS ตามสไตล์ Gameboy หรือปรับตามต้องการ
    return `${minutes}:${getSeconds}`;
  };

  const handleStartToggle = () => {
    if (timeLeft > 0) setIsActive(!isActive);
  };

  const handleStop = () => {
    setIsActive(false);
    setTimeLeft(1500); // Reset กลับไปที่ 25 นาที
  };

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
      <IonContent fullscreen className="gb-content">
        <div className="gameboy-body">
          {/* Header / Logo */}
          <div className="gb-header">
            <div className="header-line"></div>
            <div className="header-line"></div>
          </div>

          {/* Screen Section */}
          <div className="gb-screen-bezel">
            <div className="battery-light"></div>
            <div className="gb-screen-lens">
              <div className="gb-lcd">
                <div className="pixel-text status-text">
                  {isActive ? "► RUNNING" : "II PAUSED"}
                </div>
                <div className="pixel-text timer-text">
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>
            <div className="logo-area">
              <span className="nintendo-font">Noted.</span>
            </div>
          </div>

          {/* Controls Section */}
          <div className="controls-area">
            {/* Logo Name (Focus) */}
            <div className="model-name">
              <span className="italic-font">Focus</span>
              <span className="model-tm">TM</span>
            </div>

            <div className="input-group">
              {/* D-Pad */}
              <div className="d-pad">
                <div className="dp-up" onClick={() => adjustTime(5)}></div>
                <div className="dp-right"></div>
                <div className="dp-down" onClick={() => adjustTime(-5)}></div>
                <div className="dp-left"></div>
                <div className="dp-center"></div>
              </div>

              {/* A/B Buttons */}
              <div className="action-buttons">
                <div className="btn-wrapper">
                  <button className="btn-round" onClick={handleStop}></button>
                  <span className="btn-label">RESET</span>
                </div>
                <div className="btn-wrapper">
                  <button
                    className="btn-round"
                    onClick={handleStartToggle}
                  ></button>
                  <span className="btn-label">
                    {isActive ? "PAUSE" : "START"}
                  </span>
                </div>
              </div>
            </div>

            {/* Select / Start Pills */}
            <div className="pill-group">
              <div className="pill-wrapper">
                <div className="pill-btn"></div>
                <span className="pill-label">SELECT</span>
              </div>
              <div className="pill-wrapper">
                <div className="pill-btn"></div>
                <span className="pill-label">START</span>
              </div>
            </div>

            {/* Speaker Grills */}
            <div className="speaker-grill">
              <div className="grill-line"></div>
              <div className="grill-line"></div>
              <div className="grill-line"></div>
              <div className="grill-line"></div>
              <div className="grill-line"></div>
              <div className="grill-line"></div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Focus;
