import React from 'react';
import { Comment } from '@/types/comment';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
          <p>By {comment.author}</p>
          <p>{comment.date}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
