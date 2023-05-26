import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import AboutUs from './Pages/AboutUs/AboutUs';
import MainPage from './Pages/MainPage/MainPage';
import CreateCard from './components/CreateCard/CreateCard';
import React from 'react';

const routesConfig = [
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
];
export default routesConfig;
