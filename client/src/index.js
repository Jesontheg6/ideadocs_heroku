import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ActionCableProvider } from 'react-actioncable-provider'
import Firebase, { FirebaseContext } from './utils/firebase';

const WS_ROOT = process.env.REACT_APP_API_WS_ROOT;
ReactDOM.render(
  <ActionCableProvider url={WS_ROOT}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </ActionCableProvider>,
  document.getElementById('root')
);
