import React from 'react';
import '../../App.css';
import { AiOutlineSearch, AiOutlineCloseSquare } from "react-icons/ai";

interface Props {
    address?: string;
}

let initialState = ""

export default function SearchBar({ address }: Props) {
    const [searchTerm, setSearchTerm] = React.useState<string>("");

    function renderClearButton() {
        if (searchTerm) {
            return <button
                onClick={(e: React.FormEvent<HTMLButtonElement>) => setSearchTerm("")}>
                <AiOutlineCloseSquare size={25} />
            </button>
        } else if (searchTerm === "") {
            return;
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
                    onChange={(e: React.FormEvent<HTMLInputElement>) => setSearchTerm(e.currentTarget.value)}
                    placeholder='Search for property…'
                />
                {renderSearchButton()}
            </div>
        </>
    )
}