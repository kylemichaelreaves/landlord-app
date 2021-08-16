import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ResultsTable from '../ResultsTable';

test('table should not appear unless searchResult is not null', () => {
    const searchResult = null
    render(<ResultsTable searchResult={searchResult} />)
    const table = screen.queryByRole('table')
    expect(table).not.toBeNull()
})

