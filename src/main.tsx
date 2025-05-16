import { createBrowserRouter, RouterProvider } from 'react-router';

import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { IntroPage } from './pages/IntroPage';
import React from 'react';
import { store } from './store/store';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/introduction',
    element: <IntroPage />,
  },
  {
    path: '*',
    element: <div>404 Not Found</div>,
  },
]);

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element.');
}
