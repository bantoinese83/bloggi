import React from 'react';
import { Notification } from '../../../types/notification';
import { User } from '../../../types/user';

interface AuthorBioProps {
  author: User;
  bio: string;
  notifications: Notification[];
}

const AuthorBio: React.FC<AuthorBioProps> = ({ author, bio, notifications }) => {
  return (
    <div>
      <h3>{author.username}</h3>
      <p>{bio}</p>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.type}</li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorBio;
