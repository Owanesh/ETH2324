import Link from 'next/link';
import React from 'react';

 
const Header = () => {
  return (
    <header className="bg-white dark:bg-stone-900  border-b-2 border-black">
    <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center flex-col md:flex-row">
            <div className="mr-4">
                <Link href="/" className="text-2xl font-bold text-black dark:text-stone-200">SB</Link>
            </div>
            <nav>
                <ul className="flex  space-x-4">
                    <li><Link href="/products" className="text-black dark:text-stone-200 hover:text-blue-500 hover:uppercase">Pr0ducts</Link></li>
                    <li><Link href="/manifesto" className="text-black dark:text-stone-200 hover:text-green-500  hover:uppercase">Manif3st0</Link></li>
                    <li><Link href="/resellers" className="text-black dark:text-stone-200 hover:text-rose-500  hover:uppercase">F1nd a r3seller</Link></li>
                </ul>
            </nav>
        </div>
        <div className="flex items-center">
        </div>
    </div>
</header>
  );
};

export default Header;
