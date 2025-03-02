import React from 'react';
import { Post } from '../../../types/post';
import { Tag } from '../../../types/tag';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  posts: Post[];
  tags: Tag[];
}

const Card: React.FC<CardProps> = ({ children, className, posts, tags }) => {
  return (
    <div className={className}>
      {children}
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

export default Card;
