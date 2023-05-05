import { fireEvent, render, screen } from '@testing-library/react';
import Search from './Search';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('SearchBar', () => {
  it('Renders', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const input = screen.getByTestId('inputSearch') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });
});
