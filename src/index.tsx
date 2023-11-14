import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


//NOTE: semantic-ui causes warning about ref issue & strict mode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);