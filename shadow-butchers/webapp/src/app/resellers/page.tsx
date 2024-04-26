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
    const [selectedReseller, setSelectedReseller] = useState<Reseller | null>(null);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [filteredResellers, setFilteredResellers] = useState<Reseller[]>([]);

    useEffect(() => {
        const fetchInitialResellers = async () => {
            setLoading(true);
            try {
                const data = await fetchFilteredResellers();
                setFilteredResellers(data.filteredResellers);
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
            const data = await fetchFilteredResellers(newFilter);
            setFilteredResellers(data.filteredResellers);
        } catch (error) {
            console.error('Error fetching resellers:', error);
        }
    }, []);

    const handleResellerClick = useCallback((reseller: Reseller) => {
        setSelectedReseller(reseller);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main className='bg-stone-200 dark:bg-stone-800'>
            <section className="bg-stone-300 dark:bg-stone-700 dark:text-stone-200 py-24">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-4">Find a Reseller</h1>
                    <p className="text-lg mb-8">The vc0rp chain of retailers is vast worldwide, and we believe that killing animals for our primary pleasure is useful and necessary.</p>
                    <input
                        type="text"
                        placeholder="Filtra resellers"
                        value={filter}
                        onChange={handleFilterChange}
                    />
                </div>
            </section>
            <div className="flex flex-row">
                <div className="w-1/2 p-6">
                    <ul className="">
                        {filteredResellers.map((reseller) => (
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
                    <Map resellers={filteredResellers} onResellerClick={handleResellerClick} />
                    {selectedReseller && <p>Selected reseller: {selectedReseller.name}</p>}
                </div>
            </div>
        </main>
    );
};

export default FindMeatResellers;
