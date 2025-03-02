import React from 'react';
import { Post } from '../../../types/post';
import { Tag } from '../../../types/tag';

interface LoadingSpinnerProps {
  className?: string;
  posts: Post[];
  tags: Tag[];
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className, posts, tags }) => {
  return (
    <div className={`spinner ${className}`}>
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
      <div>
        <h4>Posts:</h4>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Tags:</h4>
        <ul>
          {tags.map((tag) => (
            <li key={tag.id}>{tag.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LoadingSpinner;
