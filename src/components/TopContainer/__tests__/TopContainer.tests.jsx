import React from 'react';
import { screen, render, waitFor, getByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TopContainer from '../TopContainer';
import ResultsTable from "/Users/kylereaves/Desktop/landlord-app/src/components/ResultsTable/ResultsTable";

import renderer from 'react-test-renderer';


test('title shows up in the document', () => {
    render(<TopContainer />);
    expect(screen.getByText('FindYourLandlord')).toBeInTheDocument();
})

test("ResultsTable shouldn't appear if there aren't props passed to it", () => {
    const component = renderer.create(<ResultsTable />)
    console.log("component", component)
    expect(component).toBeNull();
})

test('component should not be in document if there are no props passed to it', () => {
    const component = renderer.create(<ResultsTable />)
    expect(component).toBeInTheDocument();
})