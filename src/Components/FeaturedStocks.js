import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './FeaturedStocks.css';

const FeaturedStocks = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const symbols = ['AAPL', 'GOOGL', 'AMZN'];
        const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
        const stockData = await Promise.all(
          symbols.map(async (symbol) => {
            const response = await axios.get(`https://www.alphavantage.co/query`, {
              params: {
                function: 'TIME_SERIES_INTRADAY',
                symbol,
                interval: '5min',
                apikey: apiKey
              }
            });
            const timeSeries = response.data['Time Series (5min)'];
            const formattedData = Object.keys(timeSeries).map(time => ({
              time,
              price: parseFloat(timeSeries[time]['1. open'])
            }));
            return { symbol, data: formattedData };
          })
        );
        setStocks(stockData);
      } catch (error) {
        console.error('Error fetching stock data', error);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div className="featured-stocks">
      <h2>Featured Stocks</h2>
      {stocks.map(stock => (
        <div key={stock.symbol} className="stock-item">
          <h3>{stock.symbol}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stock.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default FeaturedStocks;
