// app/page.tsx
import React from 'react';

// Mock Data (Replace with API calls later)
const posts = [
  {
    id: 1,
    title: 'Welcome to Lomi Blog',
    excerpt: 'This is the first post on Lomi Blog. Stay tuned for more updates!',
    content: 'Lorem ipsum dolor sit amet...',
    author: 'John Doe',
    date: '2023-09-01',
    tags: ['introduction', 'updates'],
    likes: 15,
    comments: 5,
    views: 100,
  },
  {
    id: 2,
    title: 'Getting Started with Lomi',
    excerpt: 'Learn how to get started with Lomi and create your first blog post.',
    content: 'Ut enim ad minim veniam...',
    author: 'Jane Smith',
    date: '2023-09-02',
    tags: ['tutorial', 'lomi'],
    likes: 22,
    comments: 8,
    views: 150,
  },
];

interface PostProps {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
}

const Post = ({ id, title, excerpt, author, date, tags, likes, comments, views }: PostProps) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-50">{title}</h2>
      <p className="text-gray-700 dark:text-gray-300">{excerpt}</p>

      <div className="flex items-center mt-4">
        {/* Likes and Comments */}
        <div className="flex items-center mr-4">
          <svg className="h-5 w-5 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="text-sm text-gray-600">{likes}</span>
        </div>

        <div className="flex items-center mr-4">
          <svg className="h-5 w-5 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="text-sm text-gray-600">{comments}</span>
        </div>

        {/* Views */}
        <div className="flex items-center">
          <svg className="h-5 w-5 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7 275.834 4.057-3.732 7.057-7.522 9-12 9-4.478 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="text-sm text-gray-600">{views}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-700 dark:text-gray-300">By {author}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">{date}</span>
      </div>

      {/* Tags */}
      <div className="mt-2">
        {tags.map(tag => (
          <span key={tag} className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-2">#{tag}</span>
        ))}
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Lomi Blog</h1>
        <p className="text-gray-700 dark:text-gray-300">Welcome to Lomi Blog, your go-to source for the latest updates and articles.</p>

        {/* Example Search (Replace with real implementation) */}
        <div className="mt-4">
          <input type="text" placeholder="Search..." className="border rounded-md p-2 w-64 dark:bg-gray-700 dark:text-gray-200" />
        </div>
      </header>

      {/* Main Content */}
      <main className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </main>

      {/* Sidebar (Example - Replace with real content) */}
      <aside className="mt-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Trending Tags</h3>
        <ul>
          <li><a href="#" className="text-blue-600 hover:text-blue-800">#technology</a></li>
          <li><a href="#" className="text-blue-600 hover:text-blue-800">#programming</a></li>
          <li><a href="#" className="text-blue-600 hover:text-blue-800">#travel</a></li>
        </ul>
      </aside>

      {/* Footer */}
      <footer className="text-center mt-8">
        <p className="text-gray-700 dark:text-gray-300">© 2023 Lomi Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}