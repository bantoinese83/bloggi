import React from 'react';

interface SeriesNavigationProps {
  series: {
    title: string;
    link: string;
  }[];
}

const SeriesNavigation: React.FC<SeriesNavigationProps> = ({ series }) => {
  return (
    <nav>
      <ul>
        {series.map((item, index) => (
          <li key={index}>
            <a href={item.link}>{item.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SeriesNavigation;
