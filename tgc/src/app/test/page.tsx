'use client';
import React, { useState } from "react";

function Xss() {
    const [search, setSearch] = useState("");
    const handleSearchChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearch(e.target.value);
        console.log(`Search query: ${search}`);
    };

    return (
        <>
            <input
                id="search-address"
                name="search"
                type="search"
                autoComplete="search"
                required
                value={search}
                onChange={handleSearchChange}
                className="appearance-none my-2 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="search address"
            />
            <hr>
            </hr>
            <div dangerouslySetInnerHTML={{ __html: search }}></div>
        </>
    )
}

export default Xss;
