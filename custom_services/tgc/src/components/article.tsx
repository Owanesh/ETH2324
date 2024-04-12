'use client';
import React from 'react';
import ArticleType from "@/app/blog/data/types"; // Importing Article type
import Button from '@/components/button';
import Link from 'next/link';

export default function ArticleComponent({ article }: { article: ArticleType }) {
    const handleClick = () => {
        console.log("Button clicked!");
    };

    return (
        <article className="bg-gray-100  rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <img
                src={article.image || "https://via.placeholder.com/800x400"} // Use article image if available, otherwise fallback to a placeholder
                alt="Article Cover"
                className="w-full h-64 object-cover" // Adjust the height for better responsiveness
            />
            <div className="p-6">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">{article.title}</h2> {/* Increase font size for better impact */}
                <p className="text-gray-600 mb-2">{article.date}</p>
                <p className="text-gray-700 mb-4">By {article.author}</p>
                <p className="text-lg text-gray-800 leading-relaxed">{article.description}</p> {/* Use description for a more concise content preview */}
                <Link href="/blog/f"><Button onClick={handleClick} variant="secondary">
                    Read More
                </Button>
                </Link>
            </div>
        </article>
    );
};


