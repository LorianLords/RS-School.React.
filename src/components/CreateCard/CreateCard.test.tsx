import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import CreateCard from './CreateCard';

describe(' Create React Form component', () => {
  it('Create card after submit information from inputs'),
    async () => {
      render(<CreateCard />);

      const inputName = screen.getByTestId('nameTest');
      await userEvent.type(inputName, 'React Test');

      const inputSpecies = screen.getByTestId('speciesTest');
      await userEvent.type(inputSpecies, ' Species');

      const inputDate = screen.getByTestId('dateTest');
      const date = '23.06.2023';
      await userEvent.type(inputDate, date);

      const select = screen.getByTestId('selectTest');
      const option = screen.getByRole('option', {
        name: 'Alive',
      }) as HTMLOptionElement;
      await userEvent.selectOptions(select, option);

      const genderRadio = screen.getByTestId('radioTestWithFemale');
      await userEvent.click(genderRadio);

      global.URL.createObjectURL = vi.fn();
      const mockFile = new File(['someImage'], 'someImage.png', { type: 'image/png' });
      const inputFile = screen.getByTestId('input-file') as HTMLInputElement;
      await userEvent.upload(inputFile, mockFile);

      const submit = screen.getByTestId('submitTest');
      await userEvent.click(submit);

      const card = screen.getByTestId('React Test');
      waitFor(() => card);
      expect(card).toBeInTheDocument();
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getByText('React Test')).toBeInTheDocument();
      expect(screen.getByText(date)).toBeInTheDocument();
    };
});
