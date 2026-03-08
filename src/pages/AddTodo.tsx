import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonInput,
  IonButton,
  IonRow,
  IonCol,
  IonGrid,
  useIonToast,
  IonModal,
  IonIcon,
  IonDatetime,
} from "@ionic/react";
import { happyOutline, chevronBackOutline, timeOutline, calendarOutline } from "ionicons/icons";
import { useHistory, useParams } from "react-router-dom";
import { useTodos } from "../hooks/useTodos";
import "./AddTodo.css";

const EMOJI_LIST = ["✨", "🔥", "📚", "💻", "💪", "🎮", "🍔", "🛒", "📝", "🏃", "✈️", "🎵", "💰", "🎉", "❤️", "⭐"];

const AddTodo: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>(); // If id exists, it's edit mode
  const { add, update, getTodo } = useTodos();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [datetime, setDatetime] = useState<string>(new Date().toISOString());
  const [icon, setIcon] = useState(EMOJI_LIST[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [showIconModal, setShowIconModal] = useState(false);
  const [showDatetimeModal, setShowDatetimeModal] = useState(false);
  const [presentToast] = useIonToast();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getTodo(id).then((todo) => {
        if (todo) {
          setTitle(todo.title);
          setDescription(todo.description || "");
          if (todo.icon) setIcon(todo.icon);
          setDatetime(todo.deadline);
        }
      }).catch(err => {
        presentToast({ message: "Failed to load todo", duration: 2000, color: "danger" });
      }).finally(() => {
        setIsLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCreateOrUpdate = async () => {
    if (!title || !datetime) {
      presentToast({
        message: "Please fill in all required fields (Title, Datetime)",
        duration: 2000,
        color: "danger",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (id) {
        await update(id, {
          title,
          description,
          icon,
          deadline: new Date(datetime).toISOString(),
        });
        presentToast({ message: "Todo updated successfully!", duration: 2000, color: "success" });
      } else {
        await add({
          title,
          description,
          icon,
          deadline: new Date(datetime).toISOString(),
        });
        presentToast({ message: "Todo added successfully!", duration: 2000, color: "success" });
      }
      history.goBack();
    } catch (error: any) {
      presentToast({
        message: error.message || "Failed to save todo",
        duration: 3000,
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          <div className="icon-box" onClick={() => setShowIconModal(true)}>
            <span style={{ fontSize: "50px" }}>{icon}</span>
          </div>
          <div className="pixel-font label-text center-text">Icon</div>
        </div>

        {/* Form Fields */}
        <div className="form-container">
          {/* To-do Input */}
          <div className="input-group">
            <label className="pixel-font">To-do</label>
            <div className="custom-input-box">
              <IonInput
                className="custom-ion-input"
                value={title}
                onIonChange={(e) => setTitle(e.detail.value!)}
                placeholder="Task Title"
              />
            </div>
          </div>

          {/* Description Input */}
          <div className="input-group">
            <label className="pixel-font">Description</label>
            <div className="custom-input-box">
              <IonInput
                className="custom-ion-input"
                value={description}
                onIonChange={(e) => setDescription(e.detail.value!)}
                placeholder="Optional Description"
              />
            </div>
          </div>

          {/* Deadline Section */}
          <div className="input-group">
            <label className="pixel-font">Deadline</label>
            <div className="custom-input-box" onClick={() => setShowDatetimeModal(true)} style={{ cursor: 'pointer' }}>
              <IonInput
                className="custom-ion-input"
                readonly={true}
                style={{ cursor: 'pointer' }}
                value={new Date(datetime).toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              />
            </div>
          </div>
        </div>

        {/* Create Button */}
        <div className="footer-section">
          <IonButton
            expand="block"
            className="pixel-btn create-btn"
            onClick={handleCreateOrUpdate}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : (id ? "Save" : "Create")}
          </IonButton>
        </div>

        {/* Icon Picker Modal */}
        <IonModal
          isOpen={showIconModal}
          onDidDismiss={() => setShowIconModal(false)}
          initialBreakpoint={0.5}
          breakpoints={[0, 0.5, 0.75]}
          className="icon-picker-modal"
        >
          <div className="icon-picker-content">
            <h2 className="pixel-font center-text" style={{ fontSize: "28px", margin: "20px 0", color: "#000" }}>Choose an Icon</h2>
            <div className="emoji-grid">
              {EMOJI_LIST.map((emoji) => (
                <div
                  key={emoji}
                  className={`emoji-option ${icon === emoji ? "selected" : ""}`}
                  onClick={() => {
                    setIcon(emoji);
                    setShowIconModal(false);
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
            <IonButton
              expand="block"
              fill="clear"
              className="pixel-font"
              style={{ marginTop: "20px", color: "#000", fontSize: "20px" }}
              onClick={() => setShowIconModal(false)}
            >
              Cancel
            </IonButton>
          </div>
        </IonModal>

        {/* Datetime Picker Dialog */}
        <IonModal
          isOpen={showDatetimeModal}
          onDidDismiss={() => setShowDatetimeModal(false)}
          className="datetime-dialog-modal"
        >
          <div className="datetime-picker-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', background: '#fff', colorScheme: 'light' }}>
            <h2 className="pixel-font center-text" style={{ fontSize: "24px", marginBottom: "20px", color: "#000" }}>Select Deadline</h2>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', borderRadius: '12px', background: 'white', padding: '10px 0', overflow: 'hidden', colorScheme: 'light' }}>
              <IonDatetime
                presentation="date-time"
                value={datetime}
                color="light"
                onIonChange={(e) => e.detail.value && setDatetime(e.detail.value as string)}
                className="light-datetime"
                style={{ '--background': '#ffffff', colorScheme: 'light' }}
              />
            </div>
            <IonButton
              expand="block"
              className="pixel-btn"
              style={{ marginTop: "20px", width: "100%", '--background': '#000000', '--color': '#ffffff' }}
              onClick={() => setShowDatetimeModal(false)}
            >
              Confirm
            </IonButton>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default AddTodo;
