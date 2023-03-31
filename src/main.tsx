import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ErrorPage from './components/ErrorPage/ErrorPage';
import MainPage from './components/MainPage/MainPage';
import AboutUs from './components/AboutUs/AboutUs';
import CreateCard from './components/CreateCard/CreateCard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'aboutus/',
        element: <AboutUs />,
      },
      {
        path: 'main/',
        element: <MainPage />,
        children: [
          {
            path: 'createcard/',
            element: <CreateCard />,
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
