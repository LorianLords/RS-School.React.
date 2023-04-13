import React from 'react';
import { Outlet, Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';

const App = () => {
  return (
    <div className="App">
      <Header />
      <div data-testid={'appWrapper'} className={'app-wrapper-content'}>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
