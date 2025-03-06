// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './components/App';
import { AppProvider } from './context/AppContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);