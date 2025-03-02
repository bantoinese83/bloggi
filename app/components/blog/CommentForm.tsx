import React, { useState } from 'react';
import { Subscription } from '../../../types/subscription';
import { Post } from '../../../types/post';
import { Tag } from '../../../types/tag';

interface CommentFormProps {
  onSubmit: (comment: string) => void;
  className?: string;
  subscription?: Subscription;
  posts: Post[];
  tags: Tag[];
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, className, subscription, posts, tags }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(comment);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Write a comment..."
      />
      <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">
        Submit
      </button>
      {subscription && (
        <div className="mt-2 p-2 bg-green-500 text-white rounded">
          Subscribed to: {subscription.plan}
        </div>
      )}
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
    </form>
  );
};

export default CommentForm;
