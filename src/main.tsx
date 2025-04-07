import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css'; // Create this file for global styles

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
