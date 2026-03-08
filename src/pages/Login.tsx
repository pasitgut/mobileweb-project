import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonToast,
  IonLoading,
} from "@ionic/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useHistory } from "react-router-dom";
import "./Auth.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const history = useHistory();

  const handleLogin = async () => {
    setShowLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setToastMessage("Login Successful!");
      history.push("/home"); // เข้าสู่หน้าหลัก
    } catch (error: any) {
      setToastMessage("Login failed: " + error.message);
      console.error("Login failed: ", error);
    } finally {
      setShowLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="retro-bg">
        <div className="logo-container">
          <img src="/logo.png" alt="Noted Logo" className="logo-img" />
        </div>
        <div className="auth-card">
          <div className="card-header">
            <h2>Login</h2>
          </div>
          <div className="card-body">
            <div className="input-group">
              <IonInput
                type="email"
                placeholder="Email"
                className="retro-input"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
            </div>
            <div className="input-group">
              <IonInput
                type="password"
                placeholder="Password"
                className="retro-input"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
            </div>
            <div className="button-container">
              <IonButton
                expand="block"
                onClick={handleLogin}
                className="retro-button"
              >
                Login
              </IonButton>
            </div>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #000",
                  display: "inline-block",
                  padding: "2px 8px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.8rem",
                  }}
                >
                  No account? <a href="/register" style={{ fontWeight: "bold", color: "#000" }}>Register</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <IonLoading isOpen={showLoading} message={"Logging in..."} />
        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setToastMessage("")}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
