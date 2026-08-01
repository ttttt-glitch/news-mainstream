'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: any;
  category: string;
  publishedAt: string;
  author?: { name: string; image?: any };
}

interface LiveSearchProps {
  allPosts: Post[];
}

export default function LiveSearch({ allPosts }: LiveSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const filtered = allPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.category?.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered.slice(0, 5));
    setIsOpen(true);
  }, [query, allPosts]);

  return (
    <div className="relative">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="w-48 sm:w-64 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button className="ml-2 text-gray-500 hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-72 overflow-y-auto z-50">
          {results.map((post) => (
            <Link
              key={post._id}
              href={`/article/${post.slug.current}`}
              className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
            >
              <p className="font-medium text-sm text-gray-900">{post.title}</p>
              <p className="text-xs text-gray-500 mt-1">
                {post.category} • {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            className="block px-4 py-2 text-center text-sm text-blue-600 hover:bg-gray-50 font-medium"
          >
            View all results →
          </Link>
        </div>
      )}

      {isOpen && query.trim() !== '' && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4 text-center text-gray-500 text-sm">
          No results found for &quot;{query}&quot;
        </div>
      )}
    </div>
  );
}