// PlayGame.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useLoaderData } from 'react-router-dom';
import PlayGame, { loader } from '../pages/PlayGame';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Mock de axios
const mockAxios = new MockAdapter(axios);

// Mock de useLoaderData
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: jest.fn(),
}));

// Mock de uuid para evitar inconsistencias en los IDs generados
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}));

describe('PlayGame component', () => {
  const mockQuestions = [
    {
      _id: '1',
      name: 'Question 1',
      path: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Bangui_City_Centre.jpg',
      hint1: 'Hint 1',
      hint2: 'Hint 2',
      right: 'Correct Answer',
      wrong1: 'Wrong Answer 1',
      wrong2: 'Wrong Answer 2',
      wrong3: 'Wrong Answer 3',
    },
    {
      _id: '2',
      name: 'Question 2',
      path: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Bangui_City_Centre.jpg',
      hint1: 'Hint 1',
      hint2: 'Hint 2',
      right: 'Correct Answer 2',
      wrong1: 'Wrong Answer 1',
      wrong2: 'Wrong Answer 2',
      wrong3: 'Wrong Answer 3',
    },
  ];

  beforeEach(() => {
    useLoaderData.mockReturnValue(mockQuestions);
    mockAxios.reset();
  });

  jest.setTimeout(15000);

  it('renders the first question and timer', async () => {
    render(<PlayGame game="game1" />);

    // Aquí forzamos que isImageLoaded se ponga a true
    const imageElement = screen.getByAltText('Question 1');

    // Puedes hacer que el estado isImageLoaded sea true directamente
    await waitFor(() => {
      // Simulamos que la imagen está cargada inmediatamente
      fireEvent.load(imageElement);
    });

    expect(screen.getByText(/Question 1/i)).toBeInTheDocument();
    // Imprimir el contenido renderizado para inspección
    screen.debug();

    // Verificar las respuestas mezcladas
    const answers = screen.getAllByRole('button');
    expect(answers).toHaveLength(4);

    // Verificar el temporizador
    await waitFor(
      () => {
        expect(screen.getByText(/15/i)).toBeInTheDocument(); // Temporizador inicial de 20 segundos
      },
      { timeout: 15000 }
    );
  });

  //   it('advances to the next question on correct answer', async () => {
  //     render(<PlayGame game="game1" />);

  //     // Seleccionar la respuesta correcta y simular clic
  //     const correctAnswerButton = screen.getByText(/Correct Answer/i);
  //     fireEvent.click(correctAnswerButton);

  //     // Verificar que avanza a la siguiente pregunta
  //     await waitFor(() => {
  //       expect(screen.getByText(/Question 2/i)).toBeInTheDocument();
  //     });
  //   });

  //   it('ends the game after the last question', async () => {
  //     render(<PlayGame game="game1" />);

  //     // Responder la primera pregunta
  //     fireEvent.click(screen.getByText(/Correct Answer/i));
  //     await waitFor(() => {
  //       expect(screen.getByText(/Question 2/i)).toBeInTheDocument();
  //     });

  //     // Responder la segunda pregunta
  //     fireEvent.click(screen.getByText(/Correct Answer 2/i));
  //     await waitFor(() => {
  //       expect(screen.getByText(/Game Over/i)).toBeInTheDocument();
  //     });
  //   });
});
