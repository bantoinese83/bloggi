import React from 'react';
import { Post } from '@/types/post';

interface PostCardProps {
  title: string;
  excerpt?: string;
  author: string;
  date: string;
  files?: Post['files'];
  tipp?: Post['tipp'];
}

const PostCard: React.FC<PostCardProps> = ({ title, excerpt, author, date, files, tipp }) => {
  return (
    <div>
      <h2>{title}</h2>
      {excerpt && <p>{excerpt}</p>}
      <p>By {author}</p>
      <p>{date}</p>
      <div>
        {files && files.map((file) => (
          <div key={file.id}>
            <p>{file.file_path}</p>
          </div>
        ))}
      </div>
      <div>
        {tipp && <p>Tip Amount: {tipp.amount}</p>}
      </div>
    </div>
  );
};

export default PostCard;
