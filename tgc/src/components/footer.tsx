import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-zinc-900 dark:bg-zinc-800 text-zinc-100 dark:text-zinc-500 py-6">
            <div className="mt-4 text-center">
            <span className="text-xl font-bold">The green crusaders</span>
                <p>&copy; {new Date().getFullYear()} vc0rp. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
