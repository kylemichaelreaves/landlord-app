import React from 'react';
import '../../App.css';
import { AiOutlineSearch, AiOutlineCloseSquare } from "react-icons/ai";
import {Result} from '../../Result';

interface Props {
    onSearch: (search: Result) => void;
}

export default function SearchBar({ onSearch }: Props) {

    const blankSearch = '';
    const [searchTerm, setSearchTerm] = React.useState<string>(blankSearch);
    const [searchResults, setSearchResults] = React.useState<Result[]>([])

    function renderClearButton() {
        if (searchTerm) {
            return <button
                
                onClick={(e: React.FormEvent<HTMLButtonElement>) => setSearchTerm(blankSearch)}>
                <AiOutlineCloseSquare size={25} />
            </button>
        } else if (searchTerm === "") {
            return <button></button>;
        }
    }
    function renderSearchButton() {
        if (searchTerm !== "") {
            return <button
                
                onClick={(e: React.FormEvent<HTMLButtonElement>) => setSearchTerm(searchTerm)}>
                <AiOutlineSearch size={25} />
            </button>
        } else {
            return <button></button>
        }
    }

    async function fetchData (filterValue: string) {
        let url = "https://raw.githubusercontent.com/kylemichaelreaves/landlord_data/master/test_data.geojson";
        const data = await fetch(url).then((r) => r.json());
        console.log(data)
        
        return data.features.filter((obj: GeoJSON.Feature) => obj.properties?.propertyLocation.includes(filterValue))
        .map((obj: GeoJSON.GeoJsonProperties) => obj?.properties)
    }

    

    React.useEffect(() => {
        if (searchTerm) {
            console.log(searchTerm)
        }
    })

    return (
        <>
            <div className='search-bar-container'>
                {renderClearButton()}
                <input
                    className='search-input'
                    type='text'
                    value={searchTerm}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => 
                        setSearchTerm(e.currentTarget.value)}
                    placeholder='Search for property…'
                />
                {renderSearchButton()}
            </div>
        </>
    )
}