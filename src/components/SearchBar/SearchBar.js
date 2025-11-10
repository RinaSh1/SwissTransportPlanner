
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
