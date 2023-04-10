import React from 'react';
import { Outlet, Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <h1>Hello World</h1>
      <div className={'app-wrapper-content'}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
