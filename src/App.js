import UserDashboard from './components/UserDashboard/UserDashboard';
import SearchBar from './components/SearchBar/SearchBar';
import ResultsList from './components/ResultsList/ResultsList';
import MapDisplay from './components/MapDisplay/MapDisplay';
import { TransportProvider } from './components/Service/TransportContext';
import TransportContext from './components/Service/TransportContext';
import './App.css';
import React from 'react';




function App() {
  return (
    <div className='App'>
       {/* <UserDashboard /> */}
       <TransportProvider>
       <SearchBar />
       </TransportProvider>

    </div>

  );
}

export default App;
