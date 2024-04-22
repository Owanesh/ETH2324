'use client';
import React, { useEffect } from 'react';

const BlogTrafficGraph = () => {
    // Sample data
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const pageViews = [500, 1000, 750, 1200, 800, 1500, 1000];
    const uniqueVisitors = [300, 700, 500, 800, 600, 900, 700];
  
    // Canvas reference
    let canvasRef = null;
  
    // Function to draw the graph
    const drawGraph = () => {
      const canvas = canvasRef;
      const ctx = canvas.getContext('2d');
  
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Graph parameters
      const barWidth = 40;
      const barSpacing = 20;
      const startX = 50;
      const startY = 250;
      const maxValue = Math.max(...pageViews, ...uniqueVisitors);
      const scaleFactor = 200 / maxValue;
  
      // Draw bars for page views
      ctx.fillStyle = 'rgba(75, 192, 192, 0.8)';
      for (let i = 0; i < months.length; i++) {
        const x = startX + i * (barWidth + barSpacing);
        const height = pageViews[i] * scaleFactor;
        ctx.fillRect(x, startY - height, barWidth, height);
      }
  
      // Draw bars for unique visitors
      ctx.fillStyle = 'rgba(255, 99, 132, 0.8)';
      for (let i = 0; i < months.length; i++) {
        const x = startX + i * (barWidth + barSpacing);
        const height = uniqueVisitors[i] * scaleFactor;
        ctx.fillRect(x, startY - height, barWidth, height);
      }
  
      // Draw labels
      ctx.fillStyle = '#000';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      for (let i = 0; i < months.length; i++) {
        const x = startX + i * (barWidth + barSpacing) + barWidth / 2;
        ctx.fillText(months[i], x, startY + 20);
      }
    };
  
    // Call drawGraph function on component mount
    useEffect(() => {
      drawGraph();
    }, []);
  
    return (
      <div className="bg-white dark:bg-stone-900 dark:text-stone-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Blog Traffic</h2>
        <canvas ref={(ref) => (canvasRef = ref)} width={500} height={300}></canvas>
      </div>
    );
  };
  
  export default BlogTrafficGraph;
  