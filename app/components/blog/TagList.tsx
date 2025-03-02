import React from 'react';
import { Post } from '../../../types/post';
import { Tag } from '../../../types/tag';

interface TagListProps {
  tags: Tag[];
  posts: Post[];
}

const TagList: React.FC<TagListProps> = ({ tags, posts }) => {
  return (
    <div>
      {tags.map((tag) => (
        <span key={tag.id} className="tag">
          {tag.name}
        </span>
      ))}
      <div>
        <h4>Posts:</h4>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TagList;
