import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PostCard from './components/blog/PostCard';
import TagList from './components/blog/TagList';
import Sidebar from './components/layout/Sidebar';

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

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <Header title="Lomi Blog" className="text-center mb-8" />

      {/* Main Content */}
      <main className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </main>

      {/* Sidebar */}
      <Sidebar className="mt-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Trending Tags</h3>
        <TagList tags={[
          { id: 1, name: 'technology' },
          { id: 2, name: 'programming' },
          { id: 3, name: 'travel' },
        ]} />
      </Sidebar>

      {/* Footer */}
      <Footer className="text-center mt-8" />
    </div>
  );
}
