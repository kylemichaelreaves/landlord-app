import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SearchBar from '../SearchBar';




test('search bar appears in document', () => {
    render(<SearchBar />)
    screen.debug()
})