import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GroupsDataTable } from '../components/GroupsDataTable';
import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';

describe('GroupsDataTable', () => {
  const mockData = [
    { id: '1', title: 'Group 1', body: 'Description 1', feedbackIds: ['1', '2'] },
    { id: '2', title: 'Group 2', body: 'Description 2', feedbackIds: ['3', '4'] },
  ];

  const mockAllFeedback = [
    { id: '1', name: 'Feedback 1', importance: 'High' },
    { id: '2', name: 'Feedback 2', importance: 'Medium' },
    { id: '3', name: 'Feedback 3', importance: 'Low' },
    { id: '4', name: 'Feedback 4', importance: 'High' },
  ];

  it('renders groups and feedback data', () => {
    render(
      <GroupsDataTable
        data={mockData}
        allFeedback={mockAllFeedback}
        onGroupSelect={() => {}}
        selectedGroupId={null}
      />
    );
    
    expect(screen.getByText('Group 1')).toBeInTheDocument();
    expect(screen.getByText('Group 2')).toBeInTheDocument();
  });

  it('calls onGroupSelect when a group is clicked', () => {
    const mockOnGroupSelect = vi.fn();
    render(
      <GroupsDataTable
        data={mockData}
        allFeedback={mockAllFeedback}
        onGroupSelect={mockOnGroupSelect}
        selectedGroupId={null}
      />
    );
    
    fireEvent.click(screen.getByText('Group 1'));
    
    expect(mockOnGroupSelect).toHaveBeenCalledWith('1');
  });

  it('displays feedback for selected group', () => {
    render(
      <GroupsDataTable
        data={mockData}
        allFeedback={mockAllFeedback}
        onGroupSelect={() => {}}
        selectedGroupId="1"
      />
    );
    
    expect(screen.getByText('Feedback 1')).toBeInTheDocument();
    expect(screen.getByText('Feedback 2')).toBeInTheDocument();
    expect(screen.queryByText('Feedback 3')).not.toBeInTheDocument();
  });
});