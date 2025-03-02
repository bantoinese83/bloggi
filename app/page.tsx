import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PostCard from './components/blog/PostCard';
import Sidebar from './components/layout/Sidebar';
import { Post } from '@/types/post';



// Asynchronous function to fetch posts (replace with your actual API endpoint)
async function getPosts(): Promise<Post[]> {
  // Simulate an API call
  await new Promise(resolve => setTimeout(resolve, 500));
  // Replace with your actual data fetching logic here
  return [
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
      files: [],
      tipp: { id: '1', sender_id: '1', receiver_id: '1', post_id: '1', amount: 10, created_at: '2023-09-01', is_anonymous: false, tenant_id: '1' }
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
      files: [],
      tipp: { id: '2', sender_id: '2', receiver_id: '2', post_id: '2', amount: 20, created_at: '2023-09-02', is_anonymous: false, tenant_id: '2' }
    },
  ];
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (e: any) {
        setError(e.message || 'Failed to load posts.');
      } finally {
        setIsLoading(false);
      }
    }

    loadPosts();
  }, []); // Empty dependency array means this effect runs only once on mount

  if (isLoading) {
    return <div className="text-center py-8">Loading posts...</div>; // Basic loading indicator
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>; // Basic error message
  }

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
      <Sidebar className="mt-8" posts={posts} tags={[
        {
          id: 1, name: 'technology',
          created_at: '',
          tenant_id: '',
          image_url: "",
          description: ""
        },
        {
          id: 2, name: 'programming',
          created_at: '',
          tenant_id: '',
          image_url: "",
          description: ""
        },
        {
          id: 3, name: 'travel',
          created_at: '',
          tenant_id: '',
          image_url: "",
          description: ""
        },
      ]}>
        {/* Add children content here */}
      </Sidebar>

      {/* Footer */}
      <Footer className="text-center mt-8" posts={posts} tags={[
        {
          id: 1, name: 'technology',
          created_at: '',
          tenant_id: '',
          image_url: "",
          description: ""
        },
        {
          id: 2, name: 'programming',
          created_at: '',
          tenant_id: '',
          image_url: "",
          description: ""
        },
        {
          id: 3, name: 'travel',
          created_at: '',
          tenant_id: '',
          image_url: "",
          description: ""
        },
      ]} />
    </div>
  );
}
