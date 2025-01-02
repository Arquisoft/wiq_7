// Stats.test.js
import { render, screen } from '@testing-library/react';
import Stats from '../pages//Stats';

test('renders the Stats page heading', () => {
  // Renderiza el componente
  render(<Stats />);

  // Busca el elemento con el texto "Stats Page"
  const heading = screen.getByText(/Stats Page/i);

  // Comprueba que está en el documento
  expect(heading).toBeInTheDocument();
});
