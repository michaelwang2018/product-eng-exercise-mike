import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataTable } from '../components/DataTable';
import '@testing-library/jest-dom';
import { expect } from 'vitest';

describe('DataTable', () => {
  const mockData = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Doe', age: 25 },
  ];

  const mockSchema = [
    { headerName: 'Name', cellRenderer: (row: any) => row.name },
    { headerName: 'Age', cellRenderer: (row: any) => row.age },
  ];

  it('renders the table with correct headers and data', () => {
    render(<DataTable data={mockData} schema={mockSchema} />);
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('applies fullWidth class when prop is true', () => {
    const { container } = render(<DataTable data={mockData} schema={mockSchema} fullWidth />);
    
    const table = container.querySelector('table');
    expect(table).toHaveClass('w-full');
  });
});