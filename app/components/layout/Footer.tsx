import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={className}>
      <p>© 2023 Lomi Blog. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
