import React from 'react';
import { IonIcon } from '@ionic/react';
import { checkmarkOutline, trashOutline } from 'ionicons/icons';
import { Todo, getTodoStatus, getStatusColorClass } from '../../types/todo';

interface TodoItemProps {
    todo: Todo;
    onToggle: (todo: Todo) => void;
    onDelete?: (id: string) => void;
}

const getTailwindStatusColor = (colorClass: string) => {
    switch (colorClass) {
        case 'status-green': return 'text-[#2ecc71] font-bold';
        case 'status-red': return 'text-[#e74c3c] font-bold';
        case 'status-yellow': return 'text-[#f1c40f] font-bold';
        default: return '';
    }
}

const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
    const status = getTodoStatus(todo);
    const statusColorClass = getStatusColorClass(status);
    const statusTailwindColor = getTailwindStatusColor(statusColorClass);

    return (
        <div
            className={`flex items-center border-[2px] border-black rounded-2xl p-[15px] relative transition-transform duration-100 cursor-pointer active:scale-98 ${todo.isCompleted ? 'bg-[#f9f9f9] border-[#888]' : 'bg-white'
                }`}
        >
            {/* Icon Section */}
            <div
                className="w-[50px] h-[50px] flex justify-center items-center mr-3 shrink-0"
                onClick={() => onToggle(todo)}
            >
                <span className="text-[40px]">{todo.icon}</span>
            </div>

            {/* Text Section */}
            <div
                className="grow flex flex-col justify-center overflow-hidden"
                onClick={() => onToggle(todo)}
            >
                <h3
                    className={`m-0 mb-1.5 font-vt323 font-medium text-[1.1rem] leading-tight whitespace-nowrap overflow-hidden text-ellipsis ${todo.isCompleted ? 'line-through decoration-2 text-[#888]' : 'text-black'
                        }`}
                >
                    {todo.title}
                </h3>
                <p className="m-0 font-vt323 text-[1.2rem] flex items-center whitespace-nowrap text-black">
                    <span className={statusTailwindColor}>
                        {status}
                    </span>
                    <span className="text-[#999] mx-2">|</span>
                    <span className="font-normal">{formatDate(todo.deadline)}</span>
                </p>
            </div>

            {/* Delete Button (Optional) */}
            {onDelete && (
                <div
                    className="ml-2 text-[#e74c3c] text-[20px] cursor-pointer flex items-center p-1 opacity-60 transition-opacity duration-150 active:opacity-100 shrink-0"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(todo.id);
                    }}
                >
                    <IonIcon icon={trashOutline} />
                </div>
            )}

            {/* Checkbox Section */}
            <div
                className="ml-2.5 shrink-0"
                onClick={() => onToggle(todo)}
            >
                <div
                    className={`w-[36px] h-[36px] border-2 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-200 ${todo.isCompleted ? 'bg-[#2ecc71] border-black' : 'bg-white border-black'
                        }`}
                >
                    {todo.isCompleted && <IonIcon icon={checkmarkOutline} className="text-[24px] text-white [--ionicon-stroke-width:50px]" />}
                </div>
            </div>
        </div>
    );
};

export default TodoItem;
