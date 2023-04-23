import React, { createContext, useState } from 'react';
import { Outlet, Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import { Provider } from 'react-redux';
import { store } from './store';

export interface IuseState {
  value: string;
  setValue: React.Dispatch<string>;
}
export const MyContext = createContext<IuseState | null>(null);

const App = () => {
  const [value, setValue] = useState('');
  return (
    <div className={'App'}>
      <Provider store={store}>
        <MyContext.Provider value={{ value, setValue }}>
          <Header />
          <div data-testid={'appWrapper'} className={'App-wrapper-content'}>
            <Outlet />
          </div>
        </MyContext.Provider>
      </Provider>
    </div>
  );
};

export default App;
