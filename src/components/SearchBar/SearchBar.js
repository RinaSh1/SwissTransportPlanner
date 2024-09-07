// import React, { useState } from 'react';
// import './SearchBar.css';
// import ResultsList from '../ResultsList/ResultsList';


// function SearchBar() {
//   const [from, setFrom] = useState('');
//   const [to, setTo] = useState('');
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [showResults, setShowResults] = useState(false);

//   const handleSearch = () => {
//    setShowResults(false);
//    setTimeout(() => {
//     setShowResults(true);
//   }, 0);
//   };

//   return (
//     <div className="search-bar">
//       <input
//         type="text"
//         value={from}
//         onChange={(e) => setFrom(e.target.value)}
//         placeholder="From"
//         className="input-field"
//       />
//       <input
//         type="text"
//         value={to}
//         onChange={(e) => setTo(e.target.value)}
//         placeholder="To"
//         className="input-field"
//       />
//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         className="input-field"
//       />
//       <input
//         type="time"
//         value={time}
//         onChange={(e) => setTime(e.target.value)}
//         className="input-field"
//       />
//       <button className="search-button" onClick={handleSearch}>
//         Search
//       </button>
//       {showResults && <ResultsList from={from} to={to} date={date} time={time} />}
//     </div>
//   );
// }

// export default SearchBar;
import React, { useContext } from 'react';
import { TransportContext } from '../Service/TransportContext'; // Import the context
import './SearchBar.css';
import ResultsList from '../ResultsList/ResultsList';

function SearchBar() {
  const { setFrom, setTo, setDate, setTime, fetchConnections, connections, loading, error } = useContext(TransportContext); // Use context

  const handleSearch = () => {
    // Call the fetchConnections method from the context to fetch data from the API
    fetchConnections();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        onChange={(e) => setFrom(e.target.value)} // Directly setting the context state
        placeholder="From"
        className="input-field"
      />
      <input
        type="text"
        onChange={(e) => setTo(e.target.value)} // Directly setting the context state
        placeholder="To"
        className="input-field"
      />
      <input
        type="date"
        onChange={(e) => setDate(e.target.value)} // Directly setting the context state
        className="input-field"
      />
      <input
        type="time"
        onChange={(e) => setTime(e.target.value)} // Directly setting the context state
        className="input-field"
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>

      {/* Display loading state */}
      {loading && <p>Loading...</p>}

      {/* Display error message */}
      {error && <p>{error}</p>}

      {/* Display results only if the connections array is not empty */}
      {connections.length > 0 && <ResultsList connections={connections} />}
    </div>
  );
}

export default SearchBar;