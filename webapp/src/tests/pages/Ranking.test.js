// Ranking.test.js
import { render, screen } from '@testing-library/react';
import Ranking from '../../pages/Ranking';
import { useLoaderData } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useLoaderData: jest.fn(),
}));

jest.mock('../../App', () => () => <div>Mock App</div>);

test('renders the Ranking page heading', () => {
  const mockRankingData = [
    {
      gameId: 'a4acc100-52d6-46ab-8ce2-b0acccf93c03',
      userId: '6767e65426af19f147062821',
      totalPoints: 2600,
      totalTime: 49,
      username: 'admin',
    },
    {
      gameId: '08084b37-c14a-40f6-bc28-c70772f28ebd',
      userId: '6767e65426af19f147062821',
      totalPoints: 2200,
      totalTime: 56,
      username: 'admin',
    },
  ];

  // Mock de useLoaderData para devolver los datos mockeados
  useLoaderData.mockReturnValue(mockRankingData);

  render(<Ranking />);

  // Busca el elemento con el texto "Ranking Page"
  expect(screen.getByText(/hall of fame/i)).toBeInTheDocument();
  expect(screen.getByText(/user/i)).toBeInTheDocument();
});
