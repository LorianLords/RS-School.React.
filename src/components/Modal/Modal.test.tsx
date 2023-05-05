import { render } from '@testing-library/react';
import ModalWindow from './Modal';
import { vi } from 'vitest';


const obj = {
  id: 1,
  name: 'Test',
  species: 'test',
  status: 'Unknown',
  gender: 'Unknown',
  created: '22-02-2022',
  location: { name: 'Testoria' },
  origin: { name: 'Earth' },
  image: '',
};
const setIsOpen = vi.fn();

vi.mock('react-redux', () => ({
  ...vi.importActual('react-redux'),
  useSelector: vi.fn().mockReturnValue(obj),
}));
describe('Modal component', () => {
  it('should be rendered', () => {
    render(<ModalWindow setIsOpen={setIsOpen} />);

    
  });
})