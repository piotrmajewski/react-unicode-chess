import { render, screen } from '@testing-library/react';
import App from './App';

test('renders a single white queen', () => {
  render(<App />);
  const aPiece = screen.getByText(/♕/i);
  expect(aPiece).toBeInTheDocument();
});
