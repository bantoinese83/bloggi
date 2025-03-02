import React from 'react';
import { Post } from '../../../types/post';

interface BlogPostProps {
  post: Post;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>By {post.user_id}</p>
      <p>{post.published_at}</p>
    </div>
  );
};

export default BlogPost;
