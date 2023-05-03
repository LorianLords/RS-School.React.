import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import React, { ReactNode, useState } from 'react';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';

interface RenderRouteWithOutletContextProps<T = any> {
  children: ReactNode;
}

export const RenderRouteWithOutletContext = <T,>({
  children,
}: RenderRouteWithOutletContextProps<T>) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route index element={children} />
      </Routes>
    </MemoryRouter>
  );
};

export interface IuseState {
  value: string;
  setValue: React.Dispatch<string>;
}
/*const RenderHeader = () => {
  //const setStateMock = vi.fn();
  // const useStateMock = (useState) => ([useState, setStateMock];
  const [value, setValue] = useState('hello');
  const UserContext = React.createContext<IuseState | null>({ setValue });
  return render(
    <RenderRouteWithOutletContext>
      <UserContext.Provider value={{ value, setValue }}>
        <Header />
      </UserContext.Provider>
    </RenderRouteWithOutletContext>
  );
};*/

describe('Local storage in search component', () => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn(() => null),
      setItem: vi.fn(() => null),
    },
    writable: true,
  });

  it('Should call localStorage getItem on render', async () => {
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    const inputSearch = screen.getByTestId('inputSearch');
    await userEvent.type(inputSearch, 'React Test');
    return render(<Header />);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(inputSearch).toHaveValue('React Test');
  });
});
