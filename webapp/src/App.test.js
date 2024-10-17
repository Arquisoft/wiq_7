import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByTestId('text-rendered');;
  expect(linkElement).toHaveTextContent(/wiq\s*quiz\s*game/i);;
});
