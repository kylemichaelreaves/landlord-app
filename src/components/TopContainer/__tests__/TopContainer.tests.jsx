import React from 'react';
import { screen, render, waitFor, getByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TopContainer from '../TopContainer';


test('title shows up in the document', () => {
    render(<TopContainer />);
    expect(screen.getByText('FindYourLandlord')).toBeInTheDocument();
})

test('ResultsTable does not appear', () => {
    render(<TopContainer />);
    const resultsTable = screen.getByRole('table')
    expect(resultsTable).not.toBeInTheDocument();

})
    
    
    

test('search bar appears in top container', () => {
    render(<TopContainer />);
    const searchBar = screen.getByPlaceholderText('Search for property…')
    expect(searchBar).toBeInTheDocument();

})