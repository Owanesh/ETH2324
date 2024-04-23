'use client'
import { decryptData } from '@/app/crypto';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface AuthorProfileProps {
    data: {
        email: string;
        password: string;
        username: string;
        role: string;
    };
  }
  const AuthorProfile: React.FC<AuthorProfileProps> = ({ data }) => {
  const [views, setViews] = useState(0);
  const [posts, setPosts] = useState(0);
  const [shares, setShares] = useState(0);

  // Function to generate random numbers for views, posts, and shares
  const generateRandomNumbers = () => {
    setViews(Math.floor(Math.random() * 10000));
    setPosts(Math.floor(Math.random() * 100));
    setShares(Math.floor(Math.random() * 1000));
  };

  useEffect(() => {
    generateRandomNumbers();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center  ">
    <div className="max-w-lg p-8 rounded-lg shadow-md text-gray-900 dark:text-gray-100">
      {/* Author Profile Header */}
      <div className="flex items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">{data.username}</h1>
          <h3 className="text-lg font-semibold">{data.email}</h3>
          <h5 className="text-sm font-semibold">{data.role}</h5>
          <p className="text-gray-500 dark:text-gray-100">Blogger & Writer</p>
        </div>
      </div>
      {/* Author Profile Stats */}
      <div className="grid grid-cols-3 gap-4 text-center text-gray-900">
        {/* Random Views */}
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Views</h2>
          <p className="text-2xl font-bold">{views}</p>
        </div>
        {/* Random Posts */}
        <div className="bg-green-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Posts</h2>
          <p className="text-2xl font-bold">{posts}</p>
        </div>
        {/* Random Shares */}
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Shares</h2>
          <p className="text-2xl font-bold">{shares}</p>
        </div>
      </div>
      {/* Author Bio */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-600 dark:text-gray-100">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae neque
          vitae lorem feugiat pretium. Donec nec tortor ac lacus euismod fermentum sit amet vitae magna.
          Mauris sodales, velit eu sodales consequat, ex magna elementum ligula, eget vestibulum ex justo
          vitae urna.</p>
      </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Author of a Community</h2>
          <p className="text-gray-600 dark:text-gray-100">As the author of this community project, you can monitor the <Link  className="hover:text-pink-500" href="/YWRtaW4K/dashboard">site's progress</Link>. May the power of veganism be with you.</p>
        </div>
    </div>
  </div>
  );
};

export default AuthorProfile;
