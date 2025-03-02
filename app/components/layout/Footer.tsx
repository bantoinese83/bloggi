import React from 'react';
import { Post } from '../../../types/post';
import { Tag } from '../../../types/tag';

interface FooterProps {
  className?: string;
  posts: Post[];
  tags: Tag[];
}

const Footer: React.FC<FooterProps> = ({ className, posts, tags }) => {
  return (
    <footer className={className}>
      <p>© 2023 Lomi Blog. All rights reserved.</p>
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
    </footer>
  );
};

export default Footer;
