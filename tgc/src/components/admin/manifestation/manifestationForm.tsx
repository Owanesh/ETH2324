'use client'

import React, { useState } from 'react';
import DragAndDropArea from './dragAndDrop';

const ManifestationForm = () => {
    const [imageFileName, setImageFileName] = useState('');
    const [message, setMessage] = useState('');
    const [messageErr, setMessageErr] = useState('');

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const formData = new FormData();
        formData.append('image', file);
        const fileName = file.name;

        fetch('/api/sanitize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fileName })
        })
            .then(response => {
                if (response.status === 200) {
                  setMessage('Seems a legit image, well done');
                } else {
                  setMessageErr('Doesnt appear like a legit image, try again');
                }
              })
            .catch(error => {
                console.error('Error:', error);
            });


    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    return (
        
        <div className="container mx-auto py-6">
            <h1 className="text-3xl font-semibold mb-6">Organize a Manifestation</h1>
            {message &&

<div className="flex align-center center justify-center items-center mb-4">
  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
    {message}
  </span>
</div>
}
{messageErr &&

<div className="flex align-center center justify-center items-center mb-4">
  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
    {messageErr}
  </span>
</div>
}
            <div className="flex gap-6">

                <form className="flex flex-col w-1/2">
                    <p>
                        Since we were victim of an attack, we need to make sure you are not a robot. Please upload an image of your manifestation. We need to check the validity of the image.
                    </p>
                    <DragAndDropArea
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        imageFileName={imageFileName}
                    />

                    <div className="flex items-center">
                        <input type="checkbox" id="terms" name="terms" className="form-checkbox h-5 w-5 text-blue-500" />
                        <label htmlFor="terms" className="ml-2 text-gray-700 dark:text-gray-400">I agree to the terms and conditions</label>
                    </div>

                    <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 mt-4">Submit</button>
                </form>
                <div className="w-1/2">
                <form className="flex flex-col">
      <label htmlFor="eventName" className="text-lg font-medium mb-2">Event Name</label>
      <input type="text" id="eventName" name="eventName" className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 mb-4" />
      
      <label htmlFor="date" className="text-lg font-medium mb-2">Date</label>
      <input type="date" id="date" name="date" className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 mb-4" />
      
      <label htmlFor="location" className="text-lg font-medium mb-2">Location</label>
      <input type="text" id="location" name="location" className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 mb-4" />
      
      <label htmlFor="description" className="text-lg font-medium mb-2">Description</label>
      <textarea id="description" name="description" rows="4" className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 mb-4"></textarea>
      
      <label htmlFor="organizerName" className="text-lg font-medium mb-2">Organizer's Name</label>
      <input type="text" id="organizerName" name="organizerName" className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 mb-4" />
      
      <label htmlFor="contactEmail" className="text-lg font-medium mb-2">Contact Email</label>
      <input type="email" id="contactEmail" name="contactEmail" className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 mb-4" />
      
      <label htmlFor="contactPhone" className="text-lg font-medium mb-2">Contact Phone Number</label>
      <input type="tel" id="contactPhone" name="contactPhone" className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 mb-4" />
      
      <label htmlFor="website" className="text-lg font-medium mb-2">Event Website</label>
      <input type="url" id="website" name="website" className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 mb-4" />
      
      <div className="flex items-center">
        <input type="checkbox" id="terms" name="terms" className="form-checkbox h-5 w-5 text-blue-500" />
        <label htmlFor="terms" className="ml-2 text-gray-700 dark:text-gray-400">I agree to the terms and conditions</label>
      </div>
      
      <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 mt-4">Submit</button>
    </form>
                </div>
            </div>
         </div>
    );
}

export default ManifestationForm;
