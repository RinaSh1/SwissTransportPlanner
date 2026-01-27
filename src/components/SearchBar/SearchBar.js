import React, { useContext } from "react";
import { TransportContext } from "../Service/TransportContext";
import ResultsList from "../ResultsList/ResultsList";

function SearchBar() {
  const { setFrom, setTo, setDate, setTime, fetchConnections, connections, loading, error } =
    useContext(TransportContext);

  const handleSearch = () => fetchConnections();

  return (
    <div className="form">
      <div className="field">
        <label className="label">From</label>
        <input
          type="text"
          onChange={(e) => setFrom(e.target.value)}
          placeholder="e.g., Visp"
          className="input"
        />
      </div>

      <div className="field">
        <label className="label">To</label>
        <input
          type="text"
          onChange={(e) => setTo(e.target.value)}
          placeholder="e.g., Zürich HB"
          className="input"
        />
      </div>

      <div className="row">
        <div className="field">
          <label className="label">Date</label>
          <input type="date" onChange={(e) => setDate(e.target.value)} className="input" />
        </div>

        <div className="field">
          <label className="label">Time</label>
          <input type="time" onChange={(e) => setTime(e.target.value)} className="input" />
        </div>
      </div>

      <button className="button" onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      {error && <p className="error">{error}</p>}

      {/* Put results visually under the Results card: we’ll render them with a wrapper class */}
      {connections.length > 0 && (
        <div className="results">
          <ResultsList connections={connections} />
        </div>
      )}

      {/* empty state */}
      {!loading && !error && connections.length === 0 && (
        <p className="hint">Tip: Use station names like “Visp” and “Zürich HB”.</p>
      )}
    </div>
  );
}

export default SearchBar;

// import React, { useState, useEffect, useContext } from 'react';
// import { TransportContext } from '../Service/TransportContext'; // Import the context
// import './SearchBar.css';
// import ResultsList from '../ResultsList/ResultsList';
// import axios from 'axios';

// function SearchBar() {
//   const { setFrom, setTo, setDate, setTime, fetchConnections, connections, loading, error } = useContext(TransportContext); // Use context

//   const [fromInput, setFromInput] = useState('');
//   const [toInput, setToInput] = useState('');
//   const [fromOptions, setFromOptions] = useState([]);
//   const [toOptions, setToOptions] = useState([]);
//   const [showFromDropdown, setShowFromDropdown] = useState(false);
//   const [showToDropdown, setShowToDropdown] = useState(false);

//   useEffect(() => {
//     if (fromInput) {
//       fetchOptions(fromInput, setFromOptions);
//       setShowFromDropdown(true);
//     } else {
//       setShowFromDropdown(false);
//     }
//   }, [fromInput]);

//   useEffect(() => {
//     if (toInput) {
//       fetchOptions(toInput, setToOptions);
//       setShowToDropdown(true);
//     } else {
//       setShowToDropdown(false);
//     }
//   }, [toInput]);

//   // Fetch options from API based on user input
//   const fetchOptions = async (query, setOptions) => {
//     try {
//       const response = await axios.get(`http://transport.opendata.ch/v1/locations?query=${query}`);
//       setOptions(response.data.stations || []);
//     } catch (error) {
//       console.error('Error fetching options:', error);
//     }
//   };

//   const handleFromSelect = (option) => {
//     setFrom(option.name);
//     setFromInput(option.name);
//     setShowFromDropdown(false);
//   };

//   const handleToSelect = (option) => {
//     setTo(option.name);
//     setToInput(option.name);
//     setShowToDropdown(false);
//   };

//   const handleSearch = () => {
//     fetchConnections();
//   };

//   return (
//     <div className="search-bar">
//       <div className="autocomplete">
//         <input
//           type="text"
//           value={fromInput}
//           onChange={(e) => setFromInput(e.target.value)}
//           placeholder="From"
//           className="input-field"
//         />
//         {showFromDropdown && (
//           <ul className="dropdown">
//             {fromOptions.map((option) => (
//               <li key={option.id} onClick={() => handleFromSelect(option)}>
//                 {option.name}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <div className="autocomplete">
//         <input
//           type="text"
//           value={toInput}
//           onChange={(e) => setToInput(e.target.value)}
//           placeholder="To"
//           className="input-field"
//         />
//         {showToDropdown && (
//           <ul className="dropdown">
//             {toOptions.map((option) => (
//               <li key={option.id} onClick={() => handleToSelect(option)}>
//                 {option.name}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <input
//         type="date"
//         onChange={(e) => setDate(e.target.value)}
//         className="input-field"
//       />
//       <input
//         type="time"
//         onChange={(e) => setTime(e.target.value)}
//         className="input-field"
//       />
//       <button className="search-button" onClick={handleSearch}>
//         Search
//       </button>

//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       {connections.length > 0 && <ResultsList connections={connections} />}
//     </div>
//   );
// }

// export default SearchBar;
