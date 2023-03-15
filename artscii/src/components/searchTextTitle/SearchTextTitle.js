import React from 'react';
import './SearchTextTitle.css';

const SearchTextTitle = ({displayText}) => {
    return displayText ? (
            <div className='search-text-container'>
                <h2>Searching for:</h2>
                <h2>{displayText}</h2>
            </div>
        ) : (
            <div className='search-empty'></div>
        )
}

export default SearchTextTitle;