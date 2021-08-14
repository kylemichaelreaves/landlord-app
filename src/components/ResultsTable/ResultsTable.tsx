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

    // function renderHeader() {
    //     const verticalHeaders: string[] = [
    //         'Street Address',
    //         'Owner',
    //         "Owner's Mailing Address",
    //         "Associated Properties"
    //     ]
    //     return verticalHeaders.map((col: string, index: number) => {
    //         return <th key={index}>{col}</th>
    //     });
    // }

    // function renderBody() {
    //     return (
    //         <tr key={searchResult.id}>
    //             <th>{searchResult.propertyLocation}</th>
    //             <th>{searchResult.ownersName}</th>
    //             <th>{searchResult.ownersAddress}</th>
    //             <th>{searchResult.associatedProperties}</th>
    //         </tr>
    //     );
    // }

    function renderTable(searchResult: Result) {
        if (searchResult) {
            if (searchResult.associatedProperties?.length) {
                if (searchResult.associatedProperties?.length > 1) {
                    return (
                        <table id="property-info">
                            <tr>
                                <th>Property Location:</th>
                                <td>{searchResult.propertyLocation}</td>
                            </tr>
                            <tr>
                                <th>Owner's Name:</th>
                                <td>{searchResult.ownersName}</td>
                            </tr>
                            <tr>
                                <th>Owner's Address:</th>
                                <td>{searchResult.ownersAddress}</td>
                            </tr>
                            <tr>
                                <th>Associated Properties:</th>
                                <td>{searchResult.associatedProperties}</td>
                            </tr>
                        </table>
                    )
                // if there aren't any associatedProperties don't render the row 
                } else if (searchResult.associatedProperties?.length === 1) {
                    return (
                        <table id="property-info">
                            <tr>
                                <th>Property Location:</th>
                                <td>{searchResult.propertyLocation}</td>
                            </tr>
                            <tr>
                                <th>Owner's Name:</th>
                                <td>{searchResult.ownersName}</td>
                            </tr>
                            <tr>
                                <th>Owner's Address:</th>
                                <td>{searchResult.ownersAddress}</td>
                            </tr>
                        </table>
                    )
                }

            }
        }
        return (
            <table id="property-info">
                <tr>
                    <th>Property Location:</th>
                    <td>{searchResult.propertyLocation}</td>
                </tr>
                <tr>
                    <th>Owner's Name:</th>
                    <td>{searchResult.ownersName}</td>
                </tr>
                <tr>
                    <th>Owner's Address:</th>
                    <td>{searchResult.ownersAddress}</td>
                </tr>
                <tr>
                    <th>Associated Properties:</th>
                    <td>{searchResult.associatedProperties}</td>
                </tr>
            </table>
        )

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
        // <table id="property-info">
        //     <thead>
        //         <tr>{renderHeader()}</tr>
        //     </thead>
        //     <tbody>
        //         {renderBody()}
        //     </tbody>
        // </table>
        <div>
            {renderTable}
        </div>
    )
}