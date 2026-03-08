import React from 'react';

interface AuthCardProps {
    title: string;
    children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ title, children }) => {
    return (
        <div className="w-[90%] max-w-[380px] mx-auto border-[2px] border-black mb-[20px] bg-[#a3a3a3] bg-[conic-gradient(#888_90deg,transparent_90deg_180deg,#888_180deg_270deg,transparent_270deg)] bg-[length:30px_30px] relative shadow-[6px_6px_0px_rgba(0,0,0,0.5)] z-[5]">
            <div className="bg-[#777] border-b-[2px] border-black py-[8px] text-center shadow-[inset_0px_-2px_0px_rgba(0,0,0,0.3)] min-h-[45px] flex items-center justify-center">
                <h2 className="m-0 text-white font-vt323 font-normal text-[2rem] leading-none tracking-[1px]" style={{ color: "#ffffff", textShadow: "2px 2px 0px #000" }}>
                    {title}
                </h2>
            </div>
            <div className="py-[30px] px-[20px] flex flex-col gap-[15px]">
                {children}
            </div>
        </div>
    );
};

export default AuthCard;
