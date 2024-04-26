'use client'
// pages/findMeatResellers.js
import React, { useState } from 'react';
import Map from '../components/map';
import resellers from '../data/resellers.json'; // Importa i dati dei prodotti

const FindMeatResellers = () => {
    const [selectedReseller, setSelectedReseller] = useState(null);

    const handleResellerClick = (reseller) => {
        setSelectedReseller(reseller);
    };

    return (
        <main className='bg-stone-200 dark:bg-stone-800'>
            <section className="bg-stone-300 dark:bg-stone-700 dark:text-stone-200 py-24">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-4">Find a Reseller</h1>
                    <p className="text-lg mb-8">The vc0rp chain of retailers is vast worldwide, and we believe that killing animals for our primary pleasure is useful and necessary.</p>
                </div>
            </section>
            <div className="flex flex-row">
                <div className="w-1/2 p-6">
                    <ul className="">
                        {resellers.map((reseller) => (
                            <li
                                key={reseller.id}
                                className={`py-4 border border-2 mt-2 border-black cursor-pointer  dark:bg-stone-400 hover:bg-stone-100 dark:hover:bg-stone-300 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]  ${selectedReseller?.id === reseller.id ? 'text-red-500 font-bold' : 'text-black'
                                    }`}
                                onClick={() => handleResellerClick(reseller)}
                            >
                                <div className='p-2 dark:text-stone-600'>
                                    <h3 className="text-lg font-extrabold   ">{reseller.name}</h3>
                                    <p className="  ">{reseller.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>
                <div className="w-1/2 p-6">
                    <Map resellers={resellers} onMapClick={setSelectedReseller} />
                </div>
            </div>
        </main>
    );
};

export default FindMeatResellers;
