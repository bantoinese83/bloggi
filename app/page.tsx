import React from 'react';

const posts = [
  {
    id: 1,
    title: 'Welcome to Lomi Blog',
    excerpt: 'This is the first post on Lomi Blog. Stay tuned for more updates!',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: 'John Doe',
    date: '2023-09-01',
  },
  {
    id: 2,
    title: 'Getting Started with Lomi',
    excerpt: 'Learn how to get started with Lomi and create your first blog post.',
    content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Jane Smith',
    date: '2023-09-02',
  },
];

interface PostProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
}

const Post = ({ title, excerpt, author, date }: PostProps) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
        {title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300">{excerpt}</p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">By {author}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">{date}</span>
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Lomi Blog</h1>
        <p className="text-gray-700 dark:text-gray-300">Welcome to Lomi Blog, your go-to source for the latest updates and articles.</p>
      </header>
      <main className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </main>
      <footer className="text-center mt-8">
        <p className="text-gray-700 dark:text-gray-300">© 2023 Lomi Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}
