import React, { useState, useContext } from "react";
import { TransportProvider, TransportContext } from "./components/Service/TransportContext";
import Header from "./components/Header/Header";
import ConnectionDetails from "./components/ConnectionDetails/ConnectionDetails.js";
import SearchBar from "./components/SearchBar/SearchBar";
import ResultsList from "./components/ResultsList/ResultsList";
import "./index.css";

function Page() {
  const { connections, loading, error } = useContext(TransportContext);
  const [selected, setSelected] = useState(null);

  return (
    <div className="page">
      <div className="container">
        <Header />

        <main className="grid">
          {/* Search card */}
          <section className="card">
            <h2 className="card-title">Search</h2>
            <p className="card-subtitle">Find the best connections across Switzerland.</p>

            {/* Pass setSelected so you can clear selection on new search if you want */}
            <SearchBar onNewResults={() => setSelected(null)} />
          </section>

          {/* Results card */}
          <section className="card">
            <h2 className="card-title">Results</h2>
            <p className="card-subtitle">Select a connection to view details.</p>

            {connections.length > 0 && (
              <>
                <ResultsList
                  connections={connections}
                  selected={selected}
                  onSelect={setSelected}
                />

                {selected && <ConnectionDetails connection={selected} />}
              </>
            )}
          </section>

        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <TransportProvider>
      <Page />
    </TransportProvider>
  );
}
