import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

test('renders IntelliStyle Test', () => {
   render(<App />);
   const linkElement = screen.getByText(/IntelliStyle Test/i);
   expect(linkElement).toBeInTheDocument();
});
