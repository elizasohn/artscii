import React from 'react';
import './AsciifyButton.css';

const AsciifyButton = (props) => {
    return (
        props.searchActive && props.displayMode === 'image' && (
            <div className='ascii-button-container'>
                <button className='ascii-button' onClick={props.asciify}>asciify</button>
            </div>
        )
    )
}

export default AsciifyButton;