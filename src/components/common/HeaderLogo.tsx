import React from 'react';

interface HeaderLogoProps {
    className?: string;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({ className = 'h-[64px]' }) => {
    return (
        <img src="/logo.png" alt="Noted. Logo" className={`${className} object-contain`} />
    );
};

export default HeaderLogo;
