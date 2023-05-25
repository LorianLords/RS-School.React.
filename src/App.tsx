import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';

import MainPage from './Pages/MainPage/MainPage';
import AboutUs from './Pages/AboutUs/AboutUs';
import CreateCard from './components/CreateCard/CreateCard';
import ErrorPage from './Pages/ErrorPage/ErrorPage';

const App: React.FC = () => {
  return (
    <div className={'App'}>
      <Header />
      <div data-testid={'appWrapper'} className={'App-wrapper-content'}>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="/form" element={<CreateCard />} />
          </Route>
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="*" element={<ErrorPage />} />*
        </Routes>
      </div>
    </div>
  );
};

export default App;
