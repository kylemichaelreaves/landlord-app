import React from 'react';
import '../../App.css';
import SearchBar from '../SearchBar/SearchBar';
import ResultsTable from '../ResultsTable/ResultsTable';

interface Result {
    id: number;
    propertyLocation: string;
    ownersName: string;
    ownersAddress: string;
    associatedProperties?: {
        id: number;
        propertyLocation: string;
    }
}

export default function TopContainer() {

    let blankSearch: Result = {
        id: 0,
        propertyLocation: '',
        ownersName: '',
        ownersAddress: '',


    }

    const [search, setSearch] = React.useState<Result>(blankSearch)


    function sendSearch(search: Result) {
        setSearch(search);
    }

    return (




        <div className='top-container'>
            <div className='title'>FindYourLandlord <br /> <h3>by North NJ DSA</h3></div>

            <SearchBar onSearch={sendSearch}/>
            {/* <ResultsTable result={search}/> */}

        </div>

    )
}