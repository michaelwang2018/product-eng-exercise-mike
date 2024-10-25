import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '../components/Filter';
import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';

describe('Filter', () => {
  const mockFilters = {
    importance: [],
    type: [],
    date: null,
  };

  it('renders filter options', () => {
    render(
      <Filter
        filters={mockFilters}
        onFilterChange={() => {}}
        onClearFilters={() => {}}
        isDarkMode={false}
      />
    );
    
    expect(screen.getByText('Filter')).toBeInTheDocument();
  });

//   it('calls onFilterChange when a filter is selected', () => {
//     const mockOnFilterChange = vi.fn();
//     render(
//       <Filter
//         filters={mockFilters}
//         onFilterChange={mockOnFilterChange}
//         onClearFilters={() => {}}
//         isDarkMode={false}
//       />
//     );
    
//     fireEvent.click(screen.getByText('Filter'));
//     fireEvent.click(screen.getByText('High'));
    
//     expect(mockOnFilterChange).toHaveBeenCalled();
//   });

  it('calls onClearFilters when Clear button is clicked', () => {
    const mockOnClearFilters = vi.fn();
    render(
      <Filter
        filters={mockFilters}
        onFilterChange={() => {}}
        onClearFilters={mockOnClearFilters}
        isDarkMode={false}
      />
    );
    
    fireEvent.click(screen.getByText('Clear'));
    
    expect(mockOnClearFilters).toHaveBeenCalled();
  });
});