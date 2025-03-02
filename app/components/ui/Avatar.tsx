import React from 'react';
import { Post } from '../../../types/post';
import { Tag } from '../../../types/tag';

interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
  posts: Post[];
  tags: Tag[];
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, className, posts, tags }) => {
  return (
    <div>
      <img src={src} alt={alt} className={className} />
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

export default Avatar;
