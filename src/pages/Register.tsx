import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonToast,
  IonLoading,
} from "@ionic/react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firestore } from "../firebaseConfig";
import { useHistory } from "react-router-dom";
import "./Auth.css";
import { doc, setDoc } from "firebase/firestore";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const history = useHistory();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setToastMessage("Passwords do not match!");
      return;
    }
    if (!username || !phone) {
      setToastMessage("Please fill in all fields!");
      return;
    }
    setShowLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
      });
      await setDoc(doc(firestore, "users", user.uid), {
        uid: user.uid,
        username: username,
        email: email,
        phone: phone,
        createdAt: new Date().toISOString(),
      });
      setToastMessage("Registration Successful!");
      setTimeout(() => history.push("/login"), 1500);
    } catch (error: any) {
      setToastMessage(error.message);
    } finally {
      setShowLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="retro-bg">
        {/* --- Decorations (ของตกแต่ง) --- */}
        {/* เส้นแรเงาซ้าย */}
        <div className="deco-stripes-left"></div>

        {/* เส้นแรเงาขวา (มุมล่าง) */}
        <div className="deco-stripes-right"></div>

        {/* วงกลมซ้อนมุมซ้ายล่าง */}
        <div className="deco-circles-bottom-left">
          <div className="circle c1"></div>
          <div className="circle c2"></div>
        </div>

        {/* ดาว Sparkle */}
        <div className="deco-sparkle">✦</div>

        {/* --- Main Content --- */}
        <div className="logo-container">
          <img src="/logo.png" alt="Noted Logo" className="logo-img" />
        </div>

        {/* Arrow Decoration เหนือกล่อง */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "24px",
            letterSpacing: "5px",
          }}
        >
          &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;
        </div>

        <div className="auth-card">
          <div className="card-header">
            <h2>Register</h2>
          </div>

          <div className="card-body">
            {/* Username */}
            <div className="input-group">
              <IonInput
                placeholder="Username"
                className="retro-input"
                value={username}
                onIonChange={(e) => setUsername(e.detail.value!)}
              />
            </div>

            {/* Password */}
            <div className="input-group">
              <IonInput
                type="password"
                placeholder="Password"
                className="retro-input"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
            </div>

            {/* Confirm Password */}
            <div className="input-group">
              <IonInput
                type="password"
                placeholder="Confirm Password"
                className="retro-input"
                value={confirmPassword}
                onIonChange={(e) => setConfirmPassword(e.detail.value!)}
              />
            </div>

            {/* Email */}
            <div className="input-group">
              <IonInput
                type="email"
                placeholder="Email"
                className="retro-input"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
            </div>

            {/* Phone */}
            <div className="input-group">
              <IonInput
                placeholder="Phone"
                className="retro-input"
                value={phone}
                onIonChange={(e) => setPhone(e.detail.value!)}
              />
            </div>

            <div className="button-container">
              <IonButton
                fill="clear" // ใช้ fill clear เพื่อจัดการ style เองทั้งหมด
                onClick={handleRegister}
                className="retro-button"
              >
                Register
              </IonButton>
            </div>

            {/* Login Link (ทำให้ดูเหมือนปุ่มเล็กๆ หรือ text ธรรมดา) */}
            <div
              style={{
                textAlign: "center",
                marginTop: "15px",
                background: "#fff",
                border: "1px solid #000",
                display: "inline-block",
                padding: "2px 5px",
                marginLeft: "25%",
              }}
            >
              <a
                href="/login"
                style={{
                  textDecoration: "none",
                  color: "#000",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                Login instead
              </a>
            </div>
          </div>
        </div>

        <IonLoading isOpen={showLoading} message={"Creating account..."} />
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

export default Register;
