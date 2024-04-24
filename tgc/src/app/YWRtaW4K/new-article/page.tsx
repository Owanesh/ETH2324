'use client';
import { Metadata } from 'next';
import { useState, useEffect } from 'react';


export default function PostArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [submittedData, setSubmittedData] = useState<{ title: string, content: string, tags: string }>({ title: '', content: '', tags: '' });
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true when submitting
    fetch('/api/26504013560767258174079178229644', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content, tags })
    })
    .then(response => response.json())
    .then(data => {
      setSubmittedData(data);
      setIsLoading(false); // Set loading state to false when submission is complete
    })
    .catch(error => {
      console.error('Error submitting data:', error);
      setIsLoading(false); // Set loading state to false if there's an error
    });
  };

  if(isLoading){
    return (
      <div className="flex justify-center">

        <div className="max-w-3xl mt-8 bg-white text-black dark:bg-stone-900 dark:text-stone-100 shadow-md rounded-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Submitting Article...</h2>
          <p className="text-gray-700 dark:text-stone-100">Please wait while your article is being submitted.</p>
        </div>
      </div>
    )
  }
 
  if (submittedData){
    return (
<div className="flex justify-center">
  <div className="max-w-3xl m-8 bg-white text-black dark:bg-stone-900 dark:text-stone-100 shadow-md rounded-md p-6">
    <h2 className="text-2xl text-green-700 dark:text-green-200 font-bold mb-4">Thank you for your submission!</h2>
    <p className="mb-4 text-gray-700 dark:text-stone-100">Your content will be reviewed by an admin for approval.</p>
    <div className="mb-4">
      <strong className="text-gray-800 dark:text-stone-100">Title:</strong>
      <p className="mt-1 text-lg text-gray-600 dark:text-stone-100">{submittedData.title}</p>
    </div>
    <div className="mb-4">
      <strong className="text-gray-800 dark:text-stone-100 ">Content:</strong>
      <p className="mt-1 text-lg text-gray-600 dark:text-stone-100 break-words" dangerouslySetInnerHTML={{ __html: submittedData.content }} />
    </div>
    <div>
      <strong className="text-gray-800 dark:text-stone-100">Tags:</strong>
      <p className="mt-1 text-lg text-gray-600 dark:text-stone-100">{submittedData.tags}</p>
    </div>
  </div>
</div>

    )
  }
  else return (
    <div className="max-w-3xl text-black dark:text-stone-100 mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Post Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-semibold">Title</label>
          <input
            type="text"
            id="ftitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-black border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block font-semibold">Content</label>
          <textarea
            id="fcontent"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full text-black border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
            rows={6}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="tags" className="block font-semibold">Tags</label>
          <input
            type="text"
            id="ftags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full text-black border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Separate tags with commas"
          />
        </div>
        <button type="submit" id="fsubmit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Post Article</button>
      </form>
    
    </div>
  );
}
