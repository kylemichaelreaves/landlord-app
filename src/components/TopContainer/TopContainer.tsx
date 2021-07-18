import React from 'react';
import '../../App.css';

export default function TopContainer() {
    var propertyAddress = document.getElementById('propertys-address');
    var ownerName = document.getElementById('owner-name');
    var ownerAddress = document.getElementById('owner-address');
    var associatedProperties = document.getElementById('associated-properties');
    
    return (
        <div className="top-container">
           <div><strong>Address:</strong> <span id='propertyAddress'></span></div>
           <div><strong>Owner:</strong> <span id='ownerName'></span></div>
           <div><strong>Owner's Address:</strong> <span id='ownerAddress'></span></div>
           <div><strong># of Associated Properties:</strong><span id='associatedProperties'></span></div>
        </div>
    )
}    