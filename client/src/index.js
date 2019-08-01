import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ActionCableProvider } from 'react-actioncable-provider'

const API_WS_ROOT = `ws://${window.location.hostname}/cable`;
// const API_WS_ROOT = `wss://${window.location.hostname}/cable`;
ReactDOM.render(
  <ActionCableProvider url={API_WS_ROOT}>
    <App />
  </ActionCableProvider>,
  document.getElementById('root')
);
