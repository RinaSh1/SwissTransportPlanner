import React, { useContext, useState } from "react";
import { TransportContext } from "../Service/TransportContext";
import ResultsList from "../ResultsList/ResultsList";

function SearchBar() {
  const [selected, setSelected] = useState(null);
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

      {/* {connections.length > 0 && (
        <div className="results">
          <ResultsList
            connections={connections}
            selected={selected}
            onSelect={setSelected}
          />
          {selected && (
            <div className="details">
              <h3 className="details-title">Connection details</h3>
              <p><strong>From:</strong> {selected.from.station.name}</p>
              <p><strong>To:</strong> {selected.to.station.name}</p>
              <p><strong>Departure:</strong> {new Date(selected.from.departure).toLocaleString()}</p>
              <p><strong>Arrival:</strong> {new Date(selected.to.arrival).toLocaleString()}</p>
              <p><strong>Changes:</strong> {selected.transfers ?? 0}</p>
            </div>
          )}
        </div>
      )} */}

      {/* empty state */}
      {!loading && !error && connections.length === 0 && (
        <p className="hint">Tip: Use station names like “Visp” and “Zürich HB”.</p>
      )}
    </div>
  );
}

export default SearchBar;
