// Ranking.test.js
import { render, screen } from '@testing-library/react';
import Ranking from '../../pages/Ranking';

test('renders the Ranking page heading', () => {
  // Renderiza el componente
  render(<Ranking />);

  // Busca el elemento con el texto "Ranking Page"
  const heading = screen.getByText(/Ranking Page/i);

  // Comprueba que está en el documento
  expect(heading).toBeInTheDocument();
});
