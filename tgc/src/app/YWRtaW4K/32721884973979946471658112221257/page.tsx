'use client';
import { useState } from 'react';

export default function PostArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [submittedData, setSubmittedData] = useState<{ title: string, content: string, tags: string }>({ title: '', content: '', tags: '' });

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Store the submitted data
    setSubmittedData({ title, content, tags });
  };

  return (
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
          />
        </div>
        <div>
          <label htmlFor="content" className="block font-semibold">Content</label>
          <textarea
            id="fcontent"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="tags" className="block font-semibold">Tags</label>
          <input
            type="text"
            id="ftags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button type="submit">Post Article</button>
      </form>
      
      {submittedData && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Submitted Data</h2>
          <div>
            <strong>Title:</strong> 
            <div dangerouslySetInnerHTML={{ __html: submittedData.title }} />
          </div>
          <div>
            <strong>Content:</strong>
            <div dangerouslySetInnerHTML={{ __html: submittedData.content }} />
          </div>
          <div>
            <strong>Tags:</strong> {submittedData.tags}
          </div>
        </div>
      )}
    </div>
  );
}
