import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Search from '../../components/Search/Search';
import MainPage from './MainPage';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

vi.mock('react-router-dom', async () => ({
  ...((await vi.importActual('react-router-dom')) as any),
  useNavigate: () => vi.fn(),
}));
describe('Main page testing', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <MainPage />
        </Provider>
      </MemoryRouter>
    );
  });
  it('Renders', () => {
    expect(screen.getByTestId('mainPageTest')).toBeInTheDocument();
  });
  it('should create card list using data from API', async () => {
    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
    expect(await screen.findByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getAllByTestId('testCard')).toHaveLength(20);
  });
  it('should open modal window with description by clicking on card', async () => {
    const cardCharacter = await waitFor(() => screen.findByText('Rick Sanchez'));
    const card = cardCharacter?.parentElement;
    await userEvent.click(card as Element);
    expect(await screen.findByText('Alive')).toBeInTheDocument();
    expect(await screen.findByText('Male')).toBeInTheDocument();
    expect(await screen.findByText('Citadel of Ricks')).toBeInTheDocument();
  });
  it('should close modal window by clicking on close button', async () => {
    const cardCharacter = await waitFor(() => screen.findByText('Rick Sanchez'));
    const card = cardCharacter?.parentElement;
    await userEvent.click(card as Element);
    expect(await screen.findByText('Alive')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('closeTest'));
    await waitFor(() => {
      expect(screen.queryByText('Alive')).not.toBeInTheDocument();
      expect(screen.queryByText('Citadel of Ricks')).not.toBeInTheDocument();
    });
  });

  it('should change page by clicking on another num page', async () => {
    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
    const page = await waitFor(() => screen.findByText(2));
    const cardCharacter = await waitFor(() => screen.findByText('Rick Sanchez'));
    //const page = screen.findByText(2);
    expect(await page).toBeInTheDocument();
    expect(await cardCharacter).toBeInTheDocument();

    await userEvent.click(page as Element);
    expect(cardCharacter).not.toBeInTheDocument();
  });
  it('should open create card form by clicking on button "Create new Card" ', async () => {
    const button = screen.getByTestId('btnCreateTest');

    await userEvent.click(button);
    expect(await screen.findByText('Create new Card')).toBeInTheDocument(); 
    expect(await screen.findByText('Species:')).toBeInTheDocument();
    expect(await screen.findByText('Character status:')).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'Create' })).toBeInTheDocument();
  });
  it('should change card list sorting by change sort type', async () => {
    const sortSelect = screen.getByTestId('selectSortTest');
    expect(sortSelect).toBeInTheDocument();

    await userEvent.selectOptions(sortSelect, screen.getByRole('option', { name: 'По статусу' }));
    expect(
      ((await screen.getByRole('option', { name: 'По статусу' })) as HTMLOptionElement).selected
    ).toBe(true);
  });
});
