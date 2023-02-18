import React from 'react';
import testBlob from '../../services/testBlob';
import './Ascii.css';
import Canvas from '../canvas/Canvas';

const Ascii = (props) => {
    const returnToInput = () => {
        props.setDisplayMode('input')
    };

    return (
        <div>
            <Canvas blob={props.blob} />
            <button onClick={returnToInput}>New Search</button>
        </div>
    );
};

export default Ascii;