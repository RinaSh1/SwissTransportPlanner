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
import React from "react";

function ResultsList({ connections }) {
  return (
    <ul className="results-list">
      {connections.map((c, index) => {
        const from = c.from.station.name;
        const to = c.to.station.name;

        const dep = new Date(c.from.departure);
        const arr = new Date(c.to.arrival);

        return (
          <li className="result-item" key={index}>
            <div className="result-top">
              <div className="route">
                <span className="route-strong">{from}</span>
                <span className="route-arrow">→</span>
                <span className="route-strong">{to}</span>
              </div>
            </div>

            <div className="result-meta">
              <div className="meta">
                <span className="meta-label">Departure</span>
                <span className="meta-value">{dep.toLocaleString()}</span>
              </div>
              <div className="meta">
                <span className="meta-label">Arrival</span>
                <span className="meta-value">{arr.toLocaleString()}</span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ResultsList;
