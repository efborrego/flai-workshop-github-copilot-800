import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders OctoFit Tracker brand name', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const brandElement = screen.getByText(/OctoFit/i);
  expect(brandElement).toBeInTheDocument();
});
