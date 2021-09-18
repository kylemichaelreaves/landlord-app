import React from 'react';
import '../../App.css';
import { Result } from '../../Result';

interface Props {
    searchResult: Result;
}

// returns a table if there is an active searchResult
// if the props are not present or is the incorrect type, the table should not render
export default function ResultsTable({ searchResult }: Props) {

    function renderTable() {
        if (searchResult) {
            if (searchResult.associatedProperties?.length) {
                if (searchResult.associatedProperties.length > 1) {
                    return (
                        <table id="property-info" role='table'>
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
                        <table id="property-info" role='table'>
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
        } else {
            return null;
        }
    }

    return (
        <>
        
            {/* the parathesis after renderTable is necessary to avoid errors */}
            {renderTable()}
        
        </>
    )
}