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
  <div className="post">
    <h2>{title}</h2>
    <p>{excerpt}</p>
    <div className="post-meta">
      <span>By {author}</span> | <span>{date}</span>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="container">
      <header>
        <h1>Lomi Blog</h1>
        <p>Welcome to Lomi Blog, your go-to source for the latest updates and articles.</p>
      </header>
      <main>
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </main>
      <footer>
        <p>&copy; 2023 Lomi Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}
