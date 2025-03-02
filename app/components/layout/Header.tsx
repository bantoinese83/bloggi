import React from 'react';

interface HeaderProps {
  title: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, className }) => {
  return (
    <header className={className}>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
