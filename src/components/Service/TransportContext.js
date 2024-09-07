import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const TransportContext = createContext();

// Create the provider component
export const TransportProvider = ({ children }) => {
  const [connections, setConnections] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch transport data
  const fetchConnections = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://transport.opendata.ch/v1/connections?from=Lausanne&to=Genève`, {
        params: {
          from,
          to,
          date,
          time,
        },
      });
      setConnections(response.data.connections); // Set the connections data
      console.log('API Response:', response.data);
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }

  };

  // Context values
  const value = {
    connections,
    setFrom,
    setTo,
    setDate,
    setTime,
    fetchConnections,
    loading,
    error,
  };

  return (
    <TransportContext.Provider value={value}>
      {children}
    </TransportContext.Provider>
  );
};