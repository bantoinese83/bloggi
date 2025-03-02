import React from 'react';

interface PostCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, excerpt, author, date }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{excerpt}</p>
      <p>By {author}</p>
      <p>{date}</p>
    </div>
  );
};

export default PostCard;
