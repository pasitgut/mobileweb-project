import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonIcon,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/react";
import {
  person,
  pencil,
  calendarClearOutline,
  personOutline,
  callOutline,
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  chevronDownOutline,
} from "ionicons/icons";
import "./Profile.css";

const Profile: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <IonPage className="profile-page">
      {/* Header Section */}
      <IonHeader className="ion-no-border">
        <div className="custom-header">
          <h1 className="pixel-font">Profile</h1>
          <div className="header-icon-bg">
            <IonIcon icon={person} />
          </div>
        </div>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Avatar Section */}
        <div className="avatar-section">
          <div className="avatar-circle">
            <div className="edit-badge">
              <IonIcon icon={pencil} />
            </div>
          </div>
          <h2 className="pixel-font user-name-text">ชื่อ User</h2>
        </div>

        {/* Form Section */}
        <div className="form-container-profile">
          {/* Date & Gender Row */}
          <IonGrid className="ion-no-padding">
            <IonRow>
              <IonCol size="6" className="ion-padding-end">
                <div className="custom-input-box small-box">
                  <IonIcon icon={calendarClearOutline} className="input-icon" />
                  <span className="placeholder-text">DD/MM/YYYY</span>
                </div>
              </IonCol>
              <IonCol size="6" className="ion-padding-start">
                <div className="custom-input-box small-box">
                  <IonIcon icon={personOutline} className="input-icon" />
                  <div className="flex-grow">
                    <span className="placeholder-text">Gender</span>
                  </div>
                  <IonIcon
                    icon={chevronDownOutline}
                    style={{ fontSize: "16px", color: "#333" }}
                  />
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* Phone Number */}
          <div className="input-group">
            <label>Phone Number</label>
            <div className="custom-input-box">
              <IonIcon icon={callOutline} className="input-icon" />
              <IonInput
                placeholder="+93123135"
                type="tel"
                className="custom-ion-input"
              />
            </div>
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email</label>
            <div className="custom-input-box">
              <IonIcon icon={mailOutline} className="input-icon" />
              <IonInput
                placeholder="xxx@gmail.com"
                type="email"
                className="custom-ion-input"
              />
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>
            <div className="custom-input-box">
              <IonIcon icon={lockClosedOutline} className="input-icon" />
              <IonInput
                placeholder="xxx@gmail.com"
                type={showPassword ? "text" : "password"}
                className="custom-ion-input"
              />
              <IonIcon
                icon={showPassword ? eyeOffOutline : eyeOutline}
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="button-group">
          <IonButton expand="block" className="pixel-btn custom-black-btn">
            Save
          </IonButton>
          <IonButton expand="block" className="pixel-btn custom-black-btn">
            Log Out
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
