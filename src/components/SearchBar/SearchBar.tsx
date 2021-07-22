import React from 'react';
import '../../App.css';
import {AiOutlineSearch} from "react-icons/ai";

// the SearchBar will take two inputs
// onClick essentially searches the selected property and returns the result

interface Props {
    address?: string;
}

export default function SearchBar(address: Props) {
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    

    return(
        <div className='search-bar'>
            <input
                type='text'
                value={searchTerm}
                onChange={(e: any) => console.log(e.target.value)}
                placeholder='Search for property…'
                />
                <AiOutlineSearch/>
        </div>
    )
}