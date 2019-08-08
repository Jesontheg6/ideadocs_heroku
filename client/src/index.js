import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ActionCableProvider } from 'react-actioncable-provider'

const WS_ROOT = process.env.REACT_APP_API_WS_ROOT;
ReactDOM.render(
  <ActionCableProvider url={WS_ROOT}>
    <App />
  </ActionCableProvider>,
  document.getElementById('root')
);
