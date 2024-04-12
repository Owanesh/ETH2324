import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <header className="bg-stone-800 dark:bg-stone-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-xl font-bold"> <Link href="/">TGC</Link></div>

                <nav >
                    <ul className="flex flex-col md:flex-row space-x-4">
                        <li>
                            <Link href="/blog" className="hover:text-gray-300">Blog</Link>
                        </li>
                        <li>
                            <Link href="/manifesto" className="hover:text-gray-300">Manifesto</Link>
                        </li>
                       
                    </ul>
                </nav>
                <div className="">  
                            <Link href="/login" className="hover:text-gray-300">Login</Link>
                        </div>

            </div>
        </header>
    );
};

export default Navbar;
