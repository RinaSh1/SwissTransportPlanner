import UserDashboard from './components/UserDashboard/UserDashboard';
import SearchBar from './components/SearchBar/SearchBar';
import ResultsList from './components/ResultsList/ResultsList';
import { TransportProvider } from './components/Service/TransportContext';
import TransportContext from './components/Service/TransportContext';
import Header from './components/Header/Header';
import React from 'react';
import './index.css';

function App() {
  return (
    <TransportProvider>
      <div className="page">
        <div className="container">
          <Header />

          <main className="grid">
            <section className="card">
              <h2 className="card-title">Search</h2>
              <p className="card-subtitle">Find the best connections across Switzerland.</p>
              <SearchBar />
            </section>

            <section className="card">
              <h2 className="card-title">Results</h2>
              <p className="card-subtitle">Select a connection to view details (optional later).</p>
              {/* Results are rendered inside SearchBar (same as you already do) */}
              <div id="results-anchor" />
            </section>
          </main>
        </div>
      </div>
    </TransportProvider>
  );
}

export default App;

