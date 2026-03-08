import React from 'react';
import { IonInput } from '@ionic/react';
import { TextFieldTypes } from '@ionic/core';

interface RetroInputProps {
    value: string;
    onIonChange: (value: string) => void;
    type?: TextFieldTypes;
    placeholder?: string;
    className?: string;
}

const RetroInput: React.FC<RetroInputProps> = ({
    value,
    onIonChange,
    type = 'text',
    placeholder,
    className = '',
}) => {
    return (
        <IonInput
            type={type}
            placeholder={placeholder}
            className={`border-[2px] border-black font-vt323 font-bold h-[45px] text-[#555] px-4 outline-none w-full ${className}`}
            style={{
                "--background": "#d9d9d9",
                "--padding-start": "12px",
                "--placeholder-color": "#888",
                "--placeholder-opacity": "1",
                "--color": "#555",
                "--border-radius": "0px",
            }}
            value={value}
            onIonChange={(e) => onIonChange(e.detail.value!)}
        />
    );
};

export default RetroInput;
