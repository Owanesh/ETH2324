import Link from 'next/link';
import React from 'react';

 
const Header = () => {
  return (
    <header className="bg-white dark:bg-stone-900  border-b-2 border-black">
    <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center">
            <div className="mr-4">
                <Link href="#" className="text-2xl font-bold text-black dark:text-stone-200">SB</Link>
            </div>
            <nav>
                <ul className="flex space-x-4">
                    <li><Link href="/products" className="text-black dark:text-stone-200 hover:text-blue-500">Products</Link></li>
                    <li><Link href="/manifesto" className="text-black dark:text-stone-200 hover:text-blue-500">Manifesto</Link></li>
                    <li><Link href="/resellers" className="text-black dark:text-stone-200 hover:text-blue-500">Find a reseller</Link></li>
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
