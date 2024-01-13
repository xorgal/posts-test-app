import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename='/posts-test-app/'>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
