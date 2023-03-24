import React from 'react';
import './Input.css';

function Input(props) {
    return (
        <div className='input'>
            <div className='input-form'>
                <form onSubmit={e => props.handleSubmit(e)}>
                    <input 
                        className='search-input'
                        type='text'
                        value={props.searchParam}
                        placeholder="Enter a search term"
                        onChange={e => props.setSearchParam(e.target.value)}
                    />
                    <input 
                        className='search-submit'
                        type='submit'
                        value='Submit'
                    />
                    <label className='gif-label'>Use Gif: </label>
                    <input
                        className='search-checkbox'
                        type='checkbox'
                        checked={props.gifMode}
                        onChange={props.handleGifModeChange}
                    />
                </form>
            </div>
        </div>
    )
};
           
export default Input;
