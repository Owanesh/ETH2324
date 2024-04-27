'use client'
import React from 'react';

const ScrollingText = ({ text }) => {
    return (
        <div className="scrolling-text-container w-full  bg-red-100 dark:bg-red-200 text-red-500 border-b-2 border-black  overflow-hidden">
            <p className="scrolling-text text-lg uppercase font-bold py-2 pl-4 animate-marquee">
                {text}
            </p>
            <style jsx>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(100%);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }

                .scrolling-text {
                    animation: marquee 60s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default ScrollingText;
