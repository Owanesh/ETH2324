'use client';
import React, { useState, useEffect } from "react";

const BlogStatsCard = () => {
  // State variables for dynamic data
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [monthlyVisitors, setMonthlyVisitors] = useState(0);
  const [diskCapacity, setDiskCapacity] = useState(0);
  const [bandwidth, setBandwidth] = useState(0);
  const [bannedWords, setBannedWords] = useState<string[]>([]); // Specify the type as string[]
  const [sharedPosts, setSharedPosts] = useState(0);

  // Simulate fetching data (Replace this with actual data fetching logic)
  useEffect(() => {
    // Simulate fetching blog stats
    setTimeout(() => {
      setTotalPosts(150);
      setTotalUsers(75);
      setMonthlyVisitors(7000);
    }, 1000); // Simulate 1 second delay

    // Simulate fetching server stats
    setTimeout(() => {
      setDiskCapacity(500); // 500 GB
      setBandwidth(1000); // 1000 GB/month
      setBannedWords(["spam", "phishing", "malware", "sex", "drugs", "violence", "hate", "racism", "fake news"]);
      setSharedPosts(50);
    }, 2000); // Simulate 2 second delay
  }, []);

  return (
    <div className="bg-white dark:bg-stone-900 dark:text-stone-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Blog Stats</h2>
      <p>Total Posts: {totalPosts}</p>
      <p>Total Users: {totalUsers}</p>
      <p>Monthly Visitors: {monthlyVisitors}</p>

      <h2 className="text-xl font-semibold mt-6 mb-4">Server Stats</h2>
      <p>Disk Capacity: {diskCapacity} GB</p>
      <p>Bandwidth: {bandwidth} GB/month</p>
      <p>Banned Words: {bannedWords.join(", ")}</p>
      <p>Shared Posts: {sharedPosts}</p>
    </div>
  );
};

export default BlogStatsCard;
