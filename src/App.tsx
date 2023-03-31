import React from 'react';

import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <div className={'app-wrapper-content'}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
