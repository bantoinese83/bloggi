import React from 'react';
import { Notification } from '../../../types/notification';
import { User } from '../../../types/user';
import { Post } from '../../../types/post';
import { Tag } from '../../../types/tag';

interface AuthorBioProps {
  author: User;
  bio: string;
  notifications: Notification[];
  posts: Post[];
  tags: Tag[];
}

const AuthorBio: React.FC<AuthorBioProps> = ({ author, bio, notifications, posts, tags }) => {
  return (
    <div>
      <h3>{author.username}</h3>
      <p>{bio}</p>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.type}</li>
        ))}
      </ul>
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

export default AuthorBio;
