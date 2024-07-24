import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  // State to hold the portfolio of stocks
  const [portfolio, setPortfolio] = useState([]);
  // State to hold the current stock symbol being added/edited
  const [symbol, setSymbol] = useState('');
  // State to hold the number of shares for the stock
  const [shares, setShares] = useState('');
  // State to hold the purchase price of the stock
  const [price, setPrice] = useState('');
  // State to track the index of the stock being edited
  const [editingIndex, setEditingIndex] = useState(null);
  // State to hold the current prices of stocks
  const [stockPrices, setStockPrices] = useState({});

  // Function to add a stock to the portfolio
  const addStock = () => {
    setPortfolio([...portfolio, { symbol, shares: parseFloat(shares), price: parseFloat(price) }]);
    setSymbol('');
    setShares('');
    setPrice('');
  };

  // Function to update a stock in the portfolio
  const updateStock = (index) => {
    const updatedPortfolio = [...portfolio];
    updatedPortfolio[index] = { symbol, shares: parseFloat(shares), price: parseFloat(price) };
    setPortfolio(updatedPortfolio);
    setEditingIndex(null);
    setSymbol('');
    setShares('');
    setPrice('');
  };

  // Function to prepare the form for editing a stock
  const editStock = (index) => {
    setEditingIndex(index);
    setSymbol(portfolio[index].symbol);
    setShares(portfolio[index].shares);
    setPrice(portfolio[index].price);
  };

  // Function to remove a stock from the portfolio
  const removeStock = (index) => {
    setPortfolio(portfolio.filter((_, i) => i !== index));
  };

  // useEffect to fetch stock prices whenever the portfolio changes
  useEffect(() => {
    const fetchStockPrices = async () => {
      try {
        const symbols = portfolio.map(stock => stock.symbol); // Get stock symbols from the portfolio
        const apiKey = 'TEKLGN9MB3V6TZLE'; // Your API key
        const prices = await Promise.all(
          symbols.map(async (symbol) => {
            const response = await axios.get(`https://www.alphavantage.co/query`, {
              params: {
                function: 'TIME_SERIES_INTRADAY',
                symbol,
                interval: '5min',
                apikey: apiKey
              }
            });

            console.log(`Response for ${symbol}:`, response.data); // Log the response for debugging

            if (response.data['Time Series (5min)']) {
              const timeSeries = response.data['Time Series (5min)'];
              const latestTime = Object.keys(timeSeries)[0];
              const latestPrice = parseFloat(timeSeries[latestTime]['1. open']);
              return { symbol, price: latestPrice }; // Return the latest price
            } else {
              console.error(`Error fetching data for ${symbol}:`, response.data);
              return { symbol, price: 0 }; // Default to 0 if there's an error
            }
          })
        );
        // Map prices to their corresponding stock symbols
        const priceMap = prices.reduce((acc, cur) => {
          acc[cur.symbol] = cur.price;
          return acc;
        }, {});
        setStockPrices(priceMap); // Update state with current prices
      } catch (error) {
        console.error('Error fetching stock prices', error); // Log errors
      }
    };

    // Fetch prices if there are stocks in the portfolio
    if (portfolio.length > 0) {
      fetchStockPrices();
    }
  }, [portfolio]);

  // Calculate total portfolio value
  const totalValue = portfolio.reduce((acc, stock) => {
    const currentPrice = stockPrices[stock.symbol] || 0; // Get current price or default to 0
    return acc + stock.shares * currentPrice; // Calculate total value
  }, 0);

  return (
    <div className="dashboard">
      <h2>My Portfolio</h2>
      <div className="portfolio-form">
        <input 
          type="text" 
          value={symbol} 
          onChange={(e) => setSymbol(e.target.value)} 
          placeholder="Stock Symbol" 
        />
        <input 
          type="number" 
          value={shares} 
          onChange={(e) => setShares(e.target.value)} 
          placeholder="Number of Shares" 
        />
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          placeholder="Purchase Price" 
        />
        {editingIndex === null ? (
          <button onClick={addStock}>Add Stock</button> // Button to add stock
        ) : (
          <button onClick={() => updateStock(editingIndex)}>Update Stock</button> // Button to update stock
        )}
      </div>
      <div className="portfolio-list">
        {portfolio.map((stock, index) => (
          <div key={index} className="portfolio-item">
            <div>{stock.symbol}</div>
            <div>{stock.shares} shares</div>
            <div>Purchase Price: ${stock.price}</div>
            <div>Current Price: ${stockPrices[stock.symbol] !== undefined ? stockPrices[stock.symbol] : 'Loading...'}</div>
            <button onClick={() => editStock(index)}>Edit</button> // Button to edit stock
            <button onClick={() => removeStock(index)}>Remove</button> // Button to remove stock
          </div>
        ))}
      </div>
      <h3>Total Portfolio Value: ${totalValue.toFixed(2)}</h3> 
      
    </div>
  );
};

export default Dashboard;

