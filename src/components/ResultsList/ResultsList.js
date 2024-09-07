// import React from 'react';
// import './ResultsList.css';


// function ResultsList({from, to, date, time, }) {
//   return (
//     <div className="results-list">
//       <ul>
//         <li>Searching from: {from} to {to} On date: {date} at time: {time}</li>
//         <li>Searching from: {from} to {to} On date: {date} at time: {time}</li>
//         <li>Searching from: {from} to {to} On date: {date} at time: {time}</li>

//       </ul>
//     </div>
//   );
// }

// export default ResultsList;
import React from 'react';
import './ResultsList.css';

function ResultsList({ connections }) {
  return (
    <div className="results-list">
      <ul>
        {connections.map((connection, index) => (
          <li key={index}>
            <p><strong>From:</strong> {connection.from.station.name} <strong>To:</strong> {connection.to.station.name} <strong>Departure:</strong> {new Date(connection.from.departure).toLocaleString()}<strong>Arrival:</strong> {new Date(connection.to.arrival).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultsList;