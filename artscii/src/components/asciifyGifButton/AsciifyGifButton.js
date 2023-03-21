import React from 'react';
import './AsciifyGifButton.css';

const AsciifyGifButton = (props) => {
    return (
        props.displayMode === 'gif' && (
            <div className='ascii-button-container'>
                <button className='ascii-button' onClick={props.asciifyGif}>asciify gif</button>
            </div>
        )
    )
}

export default AsciifyGifButton;