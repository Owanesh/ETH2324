'use client'
import React, { useEffect, useState, useCallback } from 'react';
import Map from '../components/map';

type Reseller = {
    id: number;
    name: string;
    lat: number;
    lng: number;
    description: string;
};

const fetchFilteredResellers = async (filter?: string) => {
    const API_URL = filter ? `/api/findReseller?filter=${encodeURIComponent(filter)}` : '/api/findReseller?';
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const FindMeatResellers = () => {
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [filteredResellers, setFilteredResellers] = useState<Reseller[]>([]);

    useEffect(() => {
        const fetchInitialResellers = async () => {
            setLoading(true);
            try {
                let data = await fetchFilteredResellers();
                data = data.filteredResellers.filter((reseller: Reseller) => reseller !== null && typeof reseller !== 'undefined');
                setFilteredResellers(data || []);
                console.log(data)
            } catch (error) {
                console.error('Error fetching resellers:', error);
                setFilteredResellers([]); // or setFilteredResellers([]);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialResellers();
    }, []);

    const handleFilterChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFilter = event.target.value;
        setFilter(newFilter);
        try {
            let data = await fetchFilteredResellers(newFilter);
            data = data.filteredResellers.filter((reseller: Reseller) => reseller !== null && typeof reseller !== 'undefined');
            setFilteredResellers(data);
        } catch (error) {
            console.error('Error fetching resellers:', error);
        }
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main className='bg-stone-200 dark:bg-stone-800 pb-8'>


            <section className="bg-cover bg-center py-24 relative" style={{ backgroundImage: "url('/imgs/hero_resell.jpg')" }}>
                <div className="absolute inset-0 bg-black opacity-15 dark:opacity-75"></div>
                <div className="container mx-auto text-center relative z-10">
                    <h1 className="text-5xl font-bold mb-4">Find a Reseller</h1>

                    <p className="text-lg mb-8">The vc0rp chain of retailers is vast worldwide, and we believe that killing animals for our primary pleasure is useful and necessary.</p>
                    <input
                        type="text"
                        className='text-black dark:text-stone-600 bg-white dark:bg-stone-400 p-2 rounded-md w-1/2 mx-auto focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent'
                        placeholder="Search resellers..."
                        value={filter}
                        onChange={handleFilterChange}
                    />
                </div>
            </section>
            <div className="flex flex-row min-h-full h-full">
                <div className="w-1/2 p-6">
                    <ul className="">
                        {filteredResellers.map((reseller) => (
                            <li
                                key={reseller.id}
                                className={`py-4 border border-2 mt-2 border-black cursor-pointer  dark:bg-stone-400 hover:bg-stone-100 dark:hover:bg-stone-300 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]}`}
                            >
                                <div className='p-2 dark:text-stone-600'>
                                    <h3 className="text-lg font-extrabold   ">{reseller.name}</h3>
                                    <p className="  ">{reseller.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>
                <div className="w-1/2 p-6 ">
                    <Map resellers={filteredResellers} /><br></br>
                </div>
            </div>
        </main>
    );
};

export default FindMeatResellers;
