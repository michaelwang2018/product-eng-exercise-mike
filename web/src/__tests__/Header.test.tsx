import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import '@testing-library/jest-dom'; // This provides additional matchers like `toBeInTheDocument`
import { expect } from 'vitest';

describe('Header', () => {
  it('renders the logo', () => {
    render(<Header isDarkMode={false} onToggleDarkMode={() => {}} />);
    
    const logo = screen.getByAltText('Clarity Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders the dark mode toggle', () => {
    render(<Header isDarkMode={false} onToggleDarkMode={() => {}} />);
    
    const toggle = screen.getByRole('button');
    expect(toggle).toBeInTheDocument();
  });
  it('calls onToggleDarkMode when the toggle is clicked', () => {
    const mockToggle = vi.fn();
    render(<Header isDarkMode={false} onToggleDarkMode={mockToggle} />);
    
    const toggle = screen.getByRole('button');
    toggle.click();
    
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });
});