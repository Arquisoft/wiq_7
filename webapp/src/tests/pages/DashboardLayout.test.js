// DashboardLayout.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout, {
  loader as dashboardLoader,
} from '../../pages/DashboardLayout';

// Mock de componentes secundarios
jest.mock('../../components/SmallSidebar', () => () => <div>SmallSidebar</div>);
jest.mock('../../components/BigSidebar', () => () => <div>BigSidebar</div>);
jest.mock('../../components/Navbar', () => () => <div>Navbar</div>);

jest.mock('axios');

describe('DashboardLayout Component', () => {
  const mockUser = { name: 'angel', role: 'admin' };

  const routes = [
    {
      path: '/',
      element: <DashboardLayout />,
      loader: dashboardLoader,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('token', 'mockToken'); // Simula el token para los tests
  });

  afterEach(() => {
    localStorage.removeItem('token');
  });

  it('renders correctly with user data', async () => {
    axios.get.mockResolvedValueOnce({ data: { user: mockUser } });

    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    // Espera a que el usuario sea cargado
    await waitFor(() =>
      expect(screen.getByText(/Navbar/i)).toBeInTheDocument()
    );

    expect(screen.getByText('SmallSidebar')).toBeInTheDocument();
    expect(screen.getByText('BigSidebar')).toBeInTheDocument();
    expect(screen.getByText('Navbar')).toBeInTheDocument();
  });

  // it('handles logout and shows success snackbar', async () => {
  //   axios.get
  //     .mockResolvedValueOnce({ data: { user: mockUser } }) // Mock para cargar usuario
  //     .mockResolvedValueOnce({}); // Mock para logout

  //   const router = createMemoryRouter(routes, { initialEntries: ['/'] });
  //   render(<RouterProvider router={router} />);

  //   // Espera a que el usuario sea cargado
  //   await waitFor(() =>
  //     expect(screen.getByText(/Navbar/i)).toBeInTheDocument()
  //   );

  //   // Simula el clic en el botón de logout
  //   const logoutButton = screen.getByText('Navbar'); // Simula que el botón está dentro de Navbar
  //   fireEvent.click(logoutButton);

  //   // Verifica que se muestre el snackbar de éxito
  //   await waitFor(
  //     () => expect(screen.getByText('Logout successful')).toBeInTheDocument(),
  //     {
  //       timeout: 3000,
  //     }
  //   );
  // });

  // it('handles errors and shows error snackbar', async () => {
  //   axios.get.mockResolvedValueOnce({ data: { user: mockUser } });
  //   axios.get.mockRejectedValueOnce({
  //     response: { data: { error: 'Logout failed' } },
  //   });

  //   const router = createMemoryRouter(routes, { initialEntries: ['/'] });
  //   render(<RouterProvider router={router} />);

  //   // Espera a que el usuario sea cargado
  //   await waitFor(() =>
  //     expect(screen.getByText(/Navbar/i)).toBeInTheDocument()
  //   );

  //   // Simula el clic en el botón de logout
  //   const logoutButton = screen.getByText('Navbar'); // Simula que el botón está dentro de Navbar
  //   fireEvent.click(logoutButton);

  //   // Verifica que se muestre el snackbar de error
  //   await waitFor(() =>
  //     expect(screen.getByText(/Error: Logout failed/i)).toBeInTheDocument()
  //   );
  // });
});
