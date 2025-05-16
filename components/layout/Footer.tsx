import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#148939] text-white text-center py-0.5">
            <p>
                <span className="font-bold">
                Ozakor Bilişim
            </span> &copy; {new Date().getFullYear()}</p>
        </footer>
    );
};

export default Footer;