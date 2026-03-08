import React from 'react';
import { IonButton } from '@ionic/react';

interface RetroButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    expand?: 'block' | 'full';
    fill?: 'clear' | 'default' | 'outline' | 'solid';
}

const RetroButton: React.FC<RetroButtonProps> = ({
    children, onClick, className = '', type, expand, fill
}) => {
    return (
        <div className="flex justify-center w-full">
            <IonButton
                expand={expand}
                fill={fill}
                type={type}
                onClick={onClick}
                className={`border-[2px] border-black font-vt323 font-bold text-[18px] capitalize shadow-[4px_4px_0px_rgba(0,0,0,0.5)] active:shadow-none active:translate-y-[4px] active:translate-x-[4px] transition-all w-[140px] ${className}`}
                style={{
                    "--background": "#808080",
                    "--color": "#ffffff",
                    "--border-radius": "0px",
                    "--box-shadow": "none"
                }}
            >
                <span style={{ textShadow: "1px 1px 0px #000" }}>{children}</span>
            </IonButton>
        </div>
    );
};

export default RetroButton;
