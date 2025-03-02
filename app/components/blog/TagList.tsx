import React from 'react';
import { Tag } from '../../../types/tag';

interface TagListProps {
  tags: Tag[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <div>
      {tags.map((tag) => (
        <span key={tag.id} className="tag">
          {tag.name}
        </span>
      ))}
    </div>
  );
};

export default TagList;
