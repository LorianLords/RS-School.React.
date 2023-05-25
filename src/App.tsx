import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import { Provider } from 'react-redux';
import { store } from './store';

const App = () => {
  return (
    <div className={'App'}>
      <Provider store={store}>
        <Header />
        <div data-testid={'appWrapper'} className={'App-wrapper-content'}>
          <Outlet />
        </div>
      </Provider>
    </div>
  );
};

export default App;
