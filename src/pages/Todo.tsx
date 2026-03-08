import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  useIonViewWillEnter,
  IonSelect,
  IonSelectOption
} from "@ionic/react";
import { chevronDownOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useTodos } from "../hooks/useTodos";
import { getTodoStatus } from "../types/todo";
import { TodoItem } from "../components/common/TodoItem";
import "./Todo.css";

const Todo: React.FC = () => {
  const { todos, toggle, remove, reload } = useTodos();
  const history = useHistory();
  const [filterStatus, setFilterStatus] = useState<string>("All");

  useIonViewWillEnter(() => {
    reload();
  });

  const toggleTodo = async (todo: any) => {
    await toggle(todo);
  };

  const deleteTodo = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await remove(id);
  };

  return (
    <IonPage className="todo-page">
      {/* Header */}
      <IonHeader className="ion-no-border">
        <div className="todo-header">
          <div className="header-left">
            <h1 className="pixel-font title-text">To-do</h1>
            <div className="filter-chip">
              <IonSelect
                value={filterStatus}
                onIonChange={e => setFilterStatus(e.detail.value)}
                interface="popover"
                style={{ minHeight: 'unset', padding: 0 }}
              >
                <IonSelectOption value="All">All</IonSelectOption>
                <IonSelectOption value="Coming soon">Coming soon</IonSelectOption>
                <IonSelectOption value="Missed">Missed</IonSelectOption>
                <IonSelectOption value="Completed">Completed</IonSelectOption>
              </IonSelect>
            </div>
          </div>
          <div className="header-right">
            <span
              className="pixel-font add-btn-text"
              onClick={() => history.push('/add-todo')}
              style={{ cursor: "pointer" }}
            >
              Add-To-do
            </span>
          </div>
        </div>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="todo-list">
          {todos
            .filter((todo) => filterStatus === "All" || getTodoStatus(todo) === filterStatus)
            .map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={(e, id) => {
                  e.stopPropagation();
                  history.push(`/edit-todo/${id}`);
                }}
                showDelete={true}
              />
            ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Todo;
