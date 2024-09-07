import React, { useState, useEffect } from 'react';


function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // Fetch user data and search history from API or local storage
    // This is a placeholder; replace with your data fetching logic
    fetchUserData();
    fetchSearchHistory();
  }, []);

  const fetchUserData = async () => {
    // Fetch user data from API
    // const response = await fetch('/api/user');
    // const data = await response.json();
    // setUserData(data);
    setUserData({ name: 'John Doe', email: 'john.doe@example.com' }); // Example data
  };

  const fetchSearchHistory = async () => {
    // Fetch search history from API or local storage
    // const response = await fetch('/api/search-history');
    // const data = await response.json();
    // setSearchHistory(data);
    setSearchHistory([
      { from: 'Zurich', to: 'Geneva', date: '2024-09-05', time: '12:00' },
      { from: 'Bern', to: 'Lucerne', date: '2024-09-04', time: '15:00' }
    ]); // Example data
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {userData?.name}</h1>
      <div className="user-info">
        <p>Email: {userData?.email}</p>
      </div>
      <div className="search-history">
        <h2>Search History</h2>
        <ul>
          {searchHistory.map((search, index) => (
            <li key={index}>
              {search.from} to {search.to} on {search.date} at {search.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
