import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('App Test', () => {
  render(<App />);
  const linkElement = screen.getByText(/Screen1/i);
  expect(linkElement).toBeInTheDocument();
});
