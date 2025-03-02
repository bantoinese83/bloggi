import React from 'react';
import { Files } from '../../../types/files';
import { Tipp } from '../../../types/tipp';

interface PostCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  files: Files[];
  tipp: Tipp;
}

const PostCard: React.FC<PostCardProps> = ({ title, excerpt, author, date, files, tipp }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{excerpt}</p>
      <p>By {author}</p>
      <p>{date}</p>
      <div>
        {files.map((file) => (
          <div key={file.id}>
            <p>{file.file_path}</p>
          </div>
        ))}
      </div>
      <div>
        <p>Tip Amount: {tipp.amount}</p>
      </div>
    </div>
  );
};

export default PostCard;
