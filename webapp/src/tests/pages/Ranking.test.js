// Ranking.test.js
import { render, screen } from '@testing-library/react';
import Ranking from '../../pages/Ranking';

jest.mock('react-router-dom', () => ({
  useLoaderData: jest.fn(),
}));

jest.mock('../../App', () => () => <div>Mock App</div>);

test('renders the Ranking page heading', () => {
  // Renderiza el componente
  render(<Ranking />);

  // Busca el elemento con el texto "Ranking Page"
  expect(screen.getByText(/Ranking Page/i)).toBeInTheDocument();
});
