import React from 'react';
import '../../App.css';
import SearchBar from '../SearchBar/SearchBar';
import ResultsTable from '../ResultsTable/ResultsTable';
import { Result } from '../../Result';

let blankSearch: Result = {
    id: 0,
    propertyLocation: '',
    ownersName: '',
    ownersAddress: '',
    associatedProperties: []
}

export default function TopContainer() {

    const [search, setSearch] = React.useState<Result>(blankSearch)

    function sendSearch(search: Result) {
        setSearch(search);
    }

    return (
        <div className='top-container'>
            <div className='title'>FindYourLandlord</div>
            <SearchBar onSearch={sendSearch} />
            <ResultsTable searchResult={search} />
        </div>
    )   
}


        



        