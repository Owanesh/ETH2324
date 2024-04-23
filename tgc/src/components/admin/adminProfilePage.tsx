'use client'
import { decryptData } from '@/app/crypto';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface AdminProfilePageProps {
    data: {
        email: string;
        password: string;
        username: string;
        role: string;
    };
  }
  const AdminProfilePage: React.FC<AdminProfilePageProps> = ({ data }) => {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
    <div className="max-w-4xl p-8 rounded-xl shadow-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Author Profile Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img src="/imgs/meme/macellaio.gif" alt="User Avatar" className="rounded-full w-12 h-12 mr-4" />
          <div>
            <h1 className="text-3xl font-semibold">{data.username}</h1>
            <h3 className="text-lg font-semibold">{data.email}</h3>
            <p className="text-gray-500 dark:text-gray-400">Blogger & Writer</p>
          </div>
        </div>
        <div className="flex items-center">
          <Link href="/YWRtaW4K/posters"><button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2">Check new posters</button></Link>
          <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 font-semibold py-2 px-4 rounded-md">Organize a battle with grillers</button>
        </div>
      </div>
      {/* Author Profile Stats */}
      <div className="grid grid-cols-3 gap-6 text-center text-gray-900">
        {/* Total Views */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Views</h2>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{views}</p>
        </div>
        {/* Total Posts */}
        <div className="bg-green-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Posts</h2>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{posts}</p>
        </div>
        {/* Total Followers */}
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Followers</h2>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{Math.floor(views*1.4)}</p>
        </div>
      </div>
      {/* Additional Stats */}
      <div className="grid grid-cols-3 gap-6 text-center text-gray-900 mt-6">
        {/* Total Comments */}
        <div className="bg-purple-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Comments</h2>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{Math.floor(shares*1.9)}</p>
        </div>
        {/* Total Shares */}
        <div className="bg-red-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Shares</h2>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{shares}</p>
        </div>
        {/* Total Likes */}
        <div className="bg-pink-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Likes</h2>
          <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">{Math.floor(views * 1.4)}</p>
        </div>
      </div>
      {/* Author Bio */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae neque
          vitae lorem feugiat pretium. Donec nec tortor ac lacus euismod fermentum sit amet vitae magna.
          Mauris sodales, velit eu sodales consequat, ex magna elementum ligula, eget vestibulum ex justo
          vitae urna.</p>
      </div>
      {/* Recent Posts */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
        <div className="space-y-4">
          {/* Post 1 */}
          <div className="border border-gray-200 dark:border-gray-600 p-4 rounded-md">
            <h3 className="text-lg font-semibold">Post Title 1</h3>
            <p className="text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae neque
              vitae lorem feugiat pretium.</p>
          </div>
          {/* Post 2 */}
          <div className="border border-gray-200 dark:border-gray-600 p-4 rounded-md">
            <h3 className="text-lg font-semibold">Post Title 2</h3>
            <p className="text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae neque
              vitae lorem feugiat pretium.</p>
          </div>
        </div>
      </div>
      {/* Social Links */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Connect with Me</h2>
        <div className="flex space-x-4">
          <a href="#" className="text-blue-500 hover:text-blue-600">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M11.999 2C6.47 2 2 6.478 2 12s4.47 10 9.999 10C17.52 22 22 17.522 22 12S17.52 2 11.999 2zM15 17.047V14.5c0-1.242-.197-2.43-1.513-2.43-1.28 0-1.563.99-1.563 2.405v2.572H9V9.317h2.615v1.278h.037c.344-.65 1.186-1.337 2.578-1.337C16.703 9.258 17 10.555 17 12.692v4.355H15z" clipRule="evenodd"></path>
            </svg>
          </a>
          <a href="#" className="text-green-500 hover:text-green-600">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M23 12.005C23 5.373 17.627 0 11 0S-1 5.373-1 12.005C-1 18.63 4.373 24 11 24s12-5.37 12-11.995zM9.884 18.857H7.044v-6.611H5.067v-2.207h1.977V8.232c0-1.5.38-2.529 2.549-2.529l1.722-.001v2.134H11.8c-.185 0-.451.092-.451.451v1.97h2.286l-.298 2.207H11.35v6.611z" clipRule="evenodd"></path>
            </svg>
          </a>
          <a href="#" className="text-pink-500 hover:text-pink-600">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M11.999 2C6.47 2 2 6.478 2 12s4.47 10 9.999 10C17.52 22 22 17.522 22 12S17.52 2 11.999 2zM15 17.047V14.5c0-1.242-.197-2.43-1.513-2.43-1.28 0-1.563.99-1.563 2.405v2.572H9V9.317h2.615v1.278h.037c.344-.65 1.186-1.337 2.578-1.337C16.703 9.258 17 10.555 17 12.692v4.355H15z" clipRule="evenodd"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default AdminProfilePage;
