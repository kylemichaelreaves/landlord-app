import React from 'react';
import '../../App.css';

export default function TopContainer() {
    var propertyAddress = document.getElementById('propertysAddress');
    var ownerName = document.getElementById('ownerName');
    var ownerAddress = document.getElementById('ownerAddress');
    var associatedProperties = document.getElementById('associatedProperties');
    
    return (
        <div className="top-container">
           <div><strong>Address:</strong> <span id='propertyAddress'></span></div>
           <div><strong>Owner:</strong> <span id='ownerName'></span></div>
           <div><strong>Owner's Address:</strong> <span id='ownerAddress'></span></div>
           <div><strong># of Associated Properties:</strong><span id='associatedProperties'></span></div>
        </div>
    )
}    