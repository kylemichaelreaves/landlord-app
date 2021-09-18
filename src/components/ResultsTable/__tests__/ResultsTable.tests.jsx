import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';
import ResultsTable from '../ResultsTable';

test('component matches snapshot', () => {
    const component = renderer.create(
        <ResultsTable searchResult={null} />
    );
    console.log("first", component.toJSON());
    
    const nonPropsComponent = renderer.create(<ResultsTable />);
    console.log("nonProps component", nonPropsComponent.toJSON());

});

test('component behaves differently when nonNull props passed', () => {
    let props = {
        id: 12,
        propertyLocation: '50 Drury Ln',
        ownersName: 'Muffin Man',
        ownersAddress: '123 Gumdrop Ln, Candy Land',
        associatedProperties: []
    }

    const component = renderer.create(
        <ResultsTable searchResult={props} />
    );

    const propslessComponent = renderer.create(
        <ResultsTable />
    );

    console.log("component with no props", propslessComponent)
    console.log("component with no props JSONified", propslessComponent.toJSON())
    
    console.log("props:", props);
    console.log("passed props:", component.toJSON());
})



test('null searchResult should prevent table from rendering', () => {

    const searchResult = null;

    const component = renderer.create(<ResultsTable />);

    expect(component).toBeNull();

    const table = screen.getByRole('table');

    expect(table).toBeInTheDocument();
})

// test what kind of input is being passed to ResultsTable
