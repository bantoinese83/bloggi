import React from 'react';

interface AuthorBioProps {
  author: string;
  bio: string;
}

const AuthorBio: React.FC<AuthorBioProps> = ({ author, bio }) => {
  return (
    <div>
      <h3>{author}</h3>
      <p>{bio}</p>
    </div>
  );
};

export default AuthorBio;
