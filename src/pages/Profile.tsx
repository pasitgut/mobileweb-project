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
  IonSelect,
  IonSelectOption,
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
import { auth } from "../firebaseConfig";
import { getUserProfile, updateUserProfile } from "../services/userService";
import { useAuth } from "../auth/AuthContext";
import { useIonViewWillEnter, useIonToast, useIonActionSheet } from "@ionic/react";
import "./Profile.css";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [presentToast] = useIonToast();
  const [presentActionSheet] = useIonActionSheet();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("User");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useIonViewWillEnter(() => {
    const fetchProfile = async () => {
      if (user) {
        setEmail(user.email || "");
        try {
          const profile = await getUserProfile(user.uid);
          if (profile) {
            setUsername(profile.username || "User");
            setPhone(profile.phone || "");
            setBirthday(profile.birthday || "");
            setGender(profile.gender || "");
          }
        } catch (error) {
          console.error("Failed to load profile", error);
        }
      }
    };
    fetchProfile();
  });

  const handleSave = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      await updateUserProfile(user.uid, {
        phone,
        birthday,
        gender
      });
      presentToast({
        message: "Profile updated successfully!",
        duration: 2000,
        color: "success"
      });
    } catch (error: any) {
      presentToast({
        message: error.message || "Failed to update profile",
        duration: 3000,
        color: "danger"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Sign out error", error);
    }
  };

  const handleAvatarClick = () => {
    presentActionSheet({
      header: 'Change Profile Picture',
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            presentToast({ message: "Camera feature requires Capacitor Camera plugin", duration: 2000, color: "warning" });
          }
        },
        {
          text: 'Choose from Library',
          handler: () => {
            presentToast({ message: "Photo Library feature requires Capacitor Camera plugin", duration: 2000, color: "warning" });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
  };

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
          <div className="avatar-placeholder">
            <IonIcon icon={person} className="main-avatar-icon" />
          </div>
          <h2 className="pixel-font user-name-text">{username}</h2>
        </div>

        {/* Form Section */}
        <div className="form-container-profile">

          {/* Birthday & Gender Side-by-Side */}
          <div className="form-row">
            <div className="input-group half-width">
              <label>Birthday</label>
              <div className="custom-input-box">
                <IonIcon icon={calendarClearOutline} className="input-icon" />
                <IonInput
                  type="date"
                  value={birthday}
                  onIonChange={(e) => setBirthday(e.detail.value!)}
                  className="custom-ion-input"
                  style={{ '--padding-start': '0px' }}
                />
              </div>
            </div>

            <div className="input-group half-width">
              <label>Gender</label>
              <div className="custom-input-box">
                <IonIcon icon={personOutline} className="input-icon" />
                <div className="flex-grow">
                  <IonSelect
                    value={gender}
                    placeholder="Gender"
                    onIonChange={e => setGender(e.detail.value)}
                    interface="popover"
                    style={{ minHeight: 'unset', width: '100%' }}
                  >
                    <IonSelectOption value="male">Male</IonSelectOption>
                    <IonSelectOption value="female">Female</IonSelectOption>
                    <IonSelectOption value="other">Other</IonSelectOption>
                  </IonSelect>
                </div>
                <IonIcon
                  icon={chevronDownOutline}
                  style={{ fontSize: "16px", color: "#333" }}
                />
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="input-group">
            <label>Phone Number</label>
            <div className="custom-input-box">
              <IonIcon icon={callOutline} className="input-icon" />
              <IonInput
                placeholder="+66..."
                type="tel"
                value={phone}
                onIonChange={e => setPhone(e.detail.value!)}
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
                value={email}
                className="custom-ion-input"
              />
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            {/* Only for UI decoration or if you want UI parity to design, usually not editable freely */}
            <label>Password</label>
            <div className="custom-input-box">
              <IonIcon icon={lockClosedOutline} className="input-icon" />
              <IonInput
                placeholder="********"
                type={showPassword ? "text" : "password"}
                readonly
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
          <IonButton
            expand="block"
            className="pixel-btn custom-black-btn"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </IonButton>
          <IonButton
            expand="block"
            className="pixel-btn custom-black-btn"
            onClick={handleSignOut}
          >
            Log Out
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
