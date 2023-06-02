import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom'
import HouseContextProvider from './components/HouseContext';
import UserContextProvider from './components/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <HouseContextProvider>
        <Router>
            <App />
        </Router>
      </HouseContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
