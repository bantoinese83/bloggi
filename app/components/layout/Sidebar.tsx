import React from 'react';
import { Post } from '../../../types/post';
import { Tag } from '../../../types/tag';

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
  posts: Post[];
  tags: Tag[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, className, posts, tags }) => {
  return (
    <aside className={className}>
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
    </aside>
  );
};

export default Sidebar;
