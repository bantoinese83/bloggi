import React, { useState } from 'react';
import { Subscription } from '../../../types/subscription';

interface CommentFormProps {
  onSubmit: (comment: string) => void;
  className?: string;
  subscription?: Subscription;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, className, subscription }) => {
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
    </form>
  );
};

export default CommentForm;
