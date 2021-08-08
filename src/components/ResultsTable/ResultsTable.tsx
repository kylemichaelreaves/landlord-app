import React from 'react';
import '../../App.css';
import {Result} from '../../Result';

interface Props {
    searchResult: Result;
}


export default function ResultsTable ({searchResult}: Props) {

    const propertyAddressRef = React.useRef<HTMLSpanElement>(null);
    const ownerNameRef = React.useRef<HTMLSpanElement>(null);
    const ownerAddressRef = React.useRef<HTMLSpanElement>(null);
    const associatedPropertiesRef = React.useRef<HTMLSpanElement>(null);

    function renderResults() {
        if (propertyAddressRef && ownerNameRef && ownerAddressRef && associatedPropertiesRef === null)
        return;
        else if (propertyAddressRef && ownerNameRef && ownerAddressRef && associatedPropertiesRef) {
            return <>
            <div><strong>Address:</strong> <span ref={propertyAddressRef}></span></div>
            <div><strong>Owner:</strong> <span ref={ownerNameRef}></span></div>
            <div><strong>Owner's Address:</strong> <span ref={ownerAddressRef}></span></div>
            <div><strong>Associated Properties: </strong><span ref={associatedPropertiesRef}></span></div>
          </>  

        }
    }

    return ( 


        renderResults()
        

        
        
    )
}