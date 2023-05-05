import { render, renderHook, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Card from './Card';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../store';

const setIsOpen = vi.fn();
describe('Card component', () => {
  it('Should be rendered', () => {
    const obj = {
      id: 1,
      name: 'Test',
      gender: 'Unknown',
      created: '22-02-2022',
      species: 'test',
      status: 'Unknown',
      image: '',
    };
    render(
      <Provider store={store}>
        <Card card={obj} setIsOpen={setIsOpen} />
      </Provider>
    );
    expect(screen.getAllByText(/test/i)).toBeDefined();
  });
});
