import React from 'react';
import './NewsFeed.css'; // Import your CSS for styling

const NewsFeed = () => {
  const newsArticles = [
    { id: 1, title: 'Stock Market Update', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', link: '#' },
    { id: 2, title: 'Tech Stocks Rally', content: 'Nulla ac efficitur elit. Duis sit amet risus.', link: '#' },
    { id: 3, title: 'Investing Tips for Beginners', content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', link: '#' }
  ];

  return (
    <div className="news-feed">
      <h2>News Feed</h2>
      {newsArticles.map(article => (
        <div key={article.id} className="news-item">
          <h3>{article.title}</h3>
          <p>{article.content}</p>
          <a href={article.link}>Read more</a>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;

