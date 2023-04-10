import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import React, { ReactNode } from 'react';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';

/*const localStorageMock = (function () {
  type Store  = {
    [key: string]: string;
  };
  let store: Store = {};*/

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

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};

describe('Local storage in search component', () => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn(() => null),
      setItem: vi.fn(() => null),
    },
    writable: true,
  });

  it('Should call localStorage getItem on render', async () => {
    const { rerender } = render(
      <RenderRouteWithOutletContext>
        <Header />
      </RenderRouteWithOutletContext>
    );
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    const inputSearch = screen.getByTestId('inputSearch');
    await userEvent.type(inputSearch, 'React Test');
    rerender(
      <RenderRouteWithOutletContext>
        <Header />
      </RenderRouteWithOutletContext>
    );
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(inputSearch).toHaveValue('React Test');
  });
});
