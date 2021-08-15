import React from 'react';
import '../../App.css';
import { Result } from '../../Result';

interface Props {
    searchResult: Result;
}

// returns a table if there is an active searchResult
export default function ResultsTable({ searchResult }: Props) {

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
    }

    return (
        <div>
            {renderTable}
        </div>
    )
}