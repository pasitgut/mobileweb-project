import React, { useState } from 'react';

interface FocusTimerProps {
    timeLeft: number;
    isActive: boolean;
    onToggleTimer: () => void;
    onReset: () => void;
    onAdjustTime: (seconds: number) => void;
}

const FocusTimer: React.FC<FocusTimerProps> = ({
    timeLeft,
    isActive,
    onToggleTimer,
    onReset,
    onAdjustTime
}) => {
    const [focusText, setFocusText] = useState('');

    const formatTime = (seconds: number) => {
        const getSeconds = `0${seconds % 60}`.slice(-2);
        const minutes = Math.floor(seconds / 60);
        const getMinutes = `0${minutes % 60}`.slice(-2);
        return `${getMinutes}:${getSeconds}`;
    };

    const formatTimeDisplay = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        return mins.toString().padStart(2, '0');
    };

    return (
        <div className="flex flex-col w-full max-w-[400px] mx-auto p-[20px] font-vt323">
            {/* Sony Circle Display */}
            <div className="relative w-[280px] h-[280px] mx-auto mb-[30px]">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-[8px] border-black bg-black"></div>
                {/* Inner screen */}
                <div className="absolute inset-[20px] rounded-full bg-[#1a1a1a] flex flex-col justify-center items-center">
                    {/* Screen content */}
                    <div className="text-white text-[72px] font-vt323 tracking-wider">
                        {formatTime(timeLeft)}
                    </div>
                    <div className="text-[#4ade80] text-[16px] mt-[-5px]">
                        {isActive ? '● FOCUSING' : '○ READY'}
                    </div>
                </div>
            </div>

            {/* Play/Pause Button */}
            <div className="flex justify-center mb-[25px]">
                <button
                    className="w-[70px] h-[70px] rounded-full bg-[#4ade80] border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-y-1 active:shadow-none transition-all flex items-center justify-center"
                    onClick={onToggleTimer}
                >
                    {isActive ? (
                        <div className="flex gap-[6px]">
                            <div className="w-[6px] h-[20px] bg-black"></div>
                            <div className="w-[6px] h-[20px] bg-black"></div>
                        </div>
                    ) : (
                        <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-black border-b-[12px] border-b-transparent ml-[4px]"></div>
                    )}
                </button>
            </div>

            {/* -25 / +25 Buttons */}
            <div className="flex justify-center gap-[40px] mb-[35px]">
                <button
                    className="px-[25px] py-[12px] bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-y-1 active:shadow-none transition-all font-vt323 text-[20px]"
                    onClick={() => onAdjustTime(-1500)}
                >
                    -25
                </button>
                <button
                    className="px-[25px] py-[12px] bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-y-1 active:shadow-none transition-all font-vt323 text-[20px]"
                    onClick={() => onAdjustTime(1500)}
                >
                    +25
                </button>
            </div>

            {/* Focus Text Input */}
            <div className="mb-[25px]">
                <input
                    type="text"
                    placeholder="What are you focusing on?"
                    value={focusText}
                    onChange={(e) => setFocusText(e.target.value)}
                    className="w-full px-[15px] py-[15px] bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-vt323 text-[18px] outline-none placeholder:text-gray-500"
                />
            </div>

            {/* START FOCUS Button */}
            <button
                className="w-full py-[18px] bg-[#4ade80] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-y-1 active:shadow-none transition-all font-vt323 text-[24px] text-black"
                onClick={onToggleTimer}
            >
                START FOCUS
            </button>
        </div>
    );
};

export default FocusTimer;