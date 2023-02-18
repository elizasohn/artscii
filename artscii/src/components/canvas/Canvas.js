import React from 'react';
import { useEffect, useRef } from 'react';
import testBlob from '../../services/testBlob';

const Canvas = (props) => {
    const canvas = useRef();
    const image = new Image();
    image.src = testBlob;
    //image.src = props.blob; 
    const width = image.width;
    const height = image.height;
    
    useEffect(() => {
        const context = canvas.current.getContext('2d');
        canvas.current.width = width;
        canvas.current.height = height;
        image.onload = () => {
            context.drawImage(image, 0, 0, 512, 512);
        };
    });
    

    return (
        <div>
            <canvas 
                ref={canvas} 
                height={height} 
                width={width}
            />
        </div>
    );
};

export default Canvas;