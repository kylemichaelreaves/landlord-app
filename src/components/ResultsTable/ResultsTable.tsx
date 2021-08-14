import React from 'react';
import '../../App.css';
import { Result } from '../../Result';

interface Props {
    searchResult: Result;
}

// returns a table if there is an active searchResult
export default function ResultsTable({ searchResult }: Props) {


    // const propertyAddressRef = React.useRef<HTMLSpanElement>(null);
    // const ownerNameRef = React.useRef<HTMLSpanElement>(null);
    // const ownerAddressRef = React.useRef<HTMLSpanElement>(null);
    // const associatedPropertiesRef = React.useRef<HTMLSpanElement>(null);

    function renderHeader() {
        const columns: string[] = [
            'Street Address',
            'Owner',
            "Owner's Mailing Address",
            "Associated Properties"
        ]
        return columns.map((col: string, index: number) => {
            return <th key={index}>{col}</th>
        });
    }

    function renderBody() {
        return (
            <tr key={searchResult.id}>
                <td>{searchResult.propertyLocation}</td>
                <td>{searchResult.ownersName}</td>
                <td>{searchResult.ownersAddress}</td>
                <td>{searchResult.associatedProperties}</td>
            </tr>
        );
    }

    // // return a table of the values
    // function renderResults() {
    //     if (propertyAddressRef.current && ownerNameRef.current && ownerAddressRef.current && associatedPropertiesRef.current === null)
    //         return;
    //     else if (propertyAddressRef.current && ownerNameRef.current && ownerAddressRef.current && associatedPropertiesRef.current) {
    //         return <>
    //             <div><strong>Address:</strong> <span ref={propertyAddressRef}></span></div>
    //             <div><strong>Owner:</strong> <span ref={ownerNameRef}></span></div>
    //             <div><strong>Owner's Address:</strong> <span ref={ownerAddressRef}></span></div>
    //             <div><strong>Associated Properties: </strong><span ref={associatedPropertiesRef}></span></div>
    //         </>
    //     }
    // }


    return (
        <table id="property-info">
            <thead>
                <tr>{renderHeader()}</tr>
            </thead>
            <tbody>
                {renderBody()}
            </tbody>
        </table>
    )
}