import React from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonInput,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { happyOutline, chevronBackOutline } from "ionicons/icons";
import "./AddTodo.css";

const AddTodo: React.FC = () => {
  return (
    <IonPage className="add-todo-page">
      {/* Header with Back Button */}
      <IonHeader className="ion-no-border">
        <IonToolbar className="custom-toolbar">
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/todo"
              icon={chevronBackOutline}
              text=""
              className="custom-back-btn"
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Icon Selection Section */}
        <div className="icon-selection-container">
          <div className="icon-box">
            <IonIcon icon={happyOutline} />
          </div>
          <div className="pixel-font label-text center-text">Icon</div>
        </div>

        {/* Form Fields */}
        <div className="form-container">
          {/* To-do Input */}
          <div className="input-group">
            <label className="pixel-font">To-do</label>
            <div className="custom-input-box">
              <IonInput className="custom-ion-input" />
            </div>
          </div>

          {/* Description Input */}
          <div className="input-group">
            <label className="pixel-font">Description</label>
            <div className="custom-input-box">
              <IonInput className="custom-ion-input" />
            </div>
          </div>

          {/* Deadline Section */}
          <div className="input-group">
            <label className="pixel-font">Deadline</label>
            <IonGrid className="ion-no-padding">
              <IonRow>
                <IonCol size="6" className="ion-padding-end">
                  <div className="custom-input-box center-content clickable">
                    <span className="pixel-font placeholder-text">Date</span>
                  </div>
                </IonCol>
                <IonCol size="6" className="ion-padding-start">
                  <div className="custom-input-box center-content clickable">
                    <span className="pixel-font placeholder-text">Time</span>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </div>

        {/* Create Button */}
        <div className="footer-section">
          <IonButton expand="block" className="pixel-btn create-btn">
            Create
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AddTodo;
