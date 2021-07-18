import React from 'react';

// the SearchBar will take two inputs
// onClick essentially searches the selected property and returns the result
export default function SearchBar() {
    const [searchTerm, setSearchTerm] = React.useState("");

    return(
        <div className='search-bar'>
            <input
                type='text'
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
                placeholder='Search for property…'
                />
        </div>
    )
}