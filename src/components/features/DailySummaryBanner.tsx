import React from 'react';

interface DailySummaryBannerProps {
    focusMinutes: number;
}

const DailySummaryBanner: React.FC<DailySummaryBannerProps> = ({ focusMinutes }) => {
    return (
        <div className="w-full h-[180px] bg-[#d9d9d9] border-2 border-black rounded-xl mb-[30px] flex items-center justify-center">
            <div className="flex items-center gap-4">
                <div className="text-[3rem]">⏱️</div>
                <div className="flex flex-col">
                    <div className="font-vt323 text-[1.4rem] text-[#333]">Today's Focus</div>
                    <div className="font-vt323 text-[1rem] text-black mt-1">
                        {focusMinutes > 0 ? `${focusMinutes} min` : "No sessions yet"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailySummaryBanner;
