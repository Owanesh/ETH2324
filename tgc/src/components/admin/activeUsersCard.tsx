'use client';
import { useEffect, useState } from 'react';

const ActiveUsersCard = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        let options: RequestInit = {
          method: 'GET', // Default method is GET
        };
        if (searchTerm) {
          options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Specify content type for POST request
            },
            body: JSON.stringify({ user: searchTerm }), // Include search term in request body
          };
        }
        const response = await fetch(`/api/search_ausers`, options);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.users ?? []); // Initialize users as an empty array if undefined
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, [searchTerm]);
  

  useEffect(() => {
    renderUsers();
  }, [users]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const renderUsers = () => {
    if (loading) {
      return <p className="text-center">Loading...</p>;
    }

    if (error) {
      return <p className="text-center text-red-500">Error: {error}</p>;
    }

    if (users.length === 0) {
      return <p className="text-center">No users found.</p>;
    }

    return (
      <ul className="overflow-y-auto max-h-80">
        {users.map((user, index) => (
          <li key={index} className="border-b border-gray-200 py-2">
            {user}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-8">Active Users List</h1>
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search user..."
            className="w-full py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring focus:border-blue-300 pr-10"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17l-5-5"
            />
          </svg>
        </div>
        {renderUsers()}
      </div>
    </div>
  );
};

export default ActiveUsersCard;
