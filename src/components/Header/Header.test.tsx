import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import React, { ReactNode, useState } from 'react';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';
import Search from '../Search/Search';
import App from '../../App';

vi.mock('../Search/Search');

describe('Header component', () => {
  it('Should be rendered', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(Search).toHaveBeenCalled();
    expect(screen.getByTestId('mainTest')).toBeInTheDocument();
    expect(screen.getByTestId('aboutTest')).toBeInTheDocument();
  });
});
