import { describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import App from './App';

import React, { ReactNode } from 'react';
import {
  createMemoryRouter,
  MemoryRouter,
  Outlet,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom';
import routesConfig from './routesConfig';

interface RenderRouteWithOutletContextProps<T = any> {
  context: T;
  children: ReactNode;
}

vi.mock('react-router-dom', async () => ({
  ...((await vi.importActual('react-router-dom')) as any),
  useNavigate: () => vi.fn(),
}));

export const RenderRouteWithOutletContext = <T,>({
  context,
  children,
}: RenderRouteWithOutletContextProps<T>) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Outlet context={context as T} />}>
          <Route index element={children} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

const mockOutletContextData: any = {
  foo: 'bar',
};

describe('App', () => {
  it('Renders app wrapper inside App', () => {
    render(
      <RenderRouteWithOutletContext context={mockOutletContextData}>
        <App />
      </RenderRouteWithOutletContext>
    );
    expect(screen.getByTestId('appWrapper')).toBeInTheDocument();
  });
  it('Route to the error page', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/errorpage'],
    });
    render(<RouterProvider router={router} />);
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Oops!');
  });
  it('Route to main page', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/main'],
    });
    render(<RouterProvider router={router} />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Welcome to our main page',
      })
    );
  });
});
