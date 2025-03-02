import React from 'react';

interface BlogPostProps {
  title: string;
  content: string;
  author: string;
  date: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, content, author, date }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      <p>By {author}</p>
      <p>{date}</p>
    </div>
  );
};

export default BlogPost;
