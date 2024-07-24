import React from 'react';
import './App.css';
import Header from './Components/Header';
import Dashboard from './Components/Dashboard';
import FeaturedStocks from './Components/FeaturedStocks';
import NewsFeed from './Components/NewsFeed';
function App() {
  return (
    <div className="App">
      <Header />
      <main className="App-main">
        {/* Your main content for the stock portfolio tracker */}
        <Dashboard/>
        <FeaturedStocks/>
        <NewsFeed/>
      </main>
    </div>
  );
}

export default App;

