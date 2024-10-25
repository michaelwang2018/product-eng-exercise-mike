import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DarkModeToggle from '../components/DarkModeToggle';
import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';

describe('DarkModeToggle', () => {
  it('renders the toggle button', () => {
    render(<DarkModeToggle isDarkMode={false} onToggle={() => {}} />);
    
    const toggle = screen.getByRole('button');
    expect(toggle).toBeInTheDocument();
  });

  it('calls onToggle when clicked', () => {
    const mockToggle = vi.fn();
    render(<DarkModeToggle isDarkMode={false} onToggle={mockToggle} />);
    
    const toggle = screen.getByRole('button');
    fireEvent.click(toggle);
    
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it('displays the correct icon based on isDarkMode', () => {
    const { rerender } = render(<DarkModeToggle isDarkMode={false} onToggle={() => {}} />);
    
    expect(screen.getByText('☀︎')).toBeInTheDocument();

    rerender(<DarkModeToggle isDarkMode={true} onToggle={() => {}} />);
    
    expect(screen.getByText('☾')).toBeInTheDocument();
  });
});