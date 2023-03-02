import React from 'react';
import { useEffect, useRef, useState } from 'react';
import testBlob from '../../services/testBlob';
import './Canvas.css';

const Canvas = (props) => {
    const canvas = useRef();
    const image = new Image();
    image.src = testBlob;
    let width = 256;
    let height = 256;
    const [imageLoaded, setImageLoaded] = useState(false);
    const [converting, setConverting] = useState(false);

    const MAXIMUM_WIDTH = 128;
    const MAXIMUM_HEIGHT = 256;

    const clampDimensions = (width, height) => {
        // const rectifiedWidth = Math.floor(width);
        const reducedWidth = Math.floor(width * MAXIMUM_HEIGHT / height);
        const reducedHeight = Math.floor(height * MAXIMUM_WIDTH / width);

        // console.log('reducedWidth: ', reducedWidth);
        // console.log('reducedHeight: ', reducedHeight);
        return [reducedWidth, reducedHeight];
    };

    const toGrayScale = (r, g, b) => 0.21 * r + 0.72 * g + 0.07 * b;

    const grayScales = [];
    const convertToGrayScales = (context) => {
        const imageData = context.getImageData(0, 0, width, height);


        for (let i = 0; i < imageData.data.length; i += 4) {
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];

            const grayScale = toGrayScale(r, g, b);
            imageData.data[i] = imageData.data[i + 1] = imageData.data[
            i + 2
            ] = grayScale;

            grayScales.push(grayScale);
        }

        context.putImageData(imageData, 0, 0);

        return grayScales;
    };

    const grayRamp =
  "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,^`'.";
    const rampLength = grayRamp.length;

    // the grayScale value is an integer ranging from 0 (black) to 255 (white)
    const getCharacterForGrayScale = grayScale =>
    grayRamp[Math.ceil(((rampLength - 1) * grayScale) / 255)];

    const asciiImage = document.querySelector("#ascii");

    const drawAscii = (grayScales, width) => {
        const ascii = grayScales.reduce((asciiImage, grayScale, index) => {
            let nextChars = getCharacterForGrayScale(grayScale);

            if ((index + 1) % width === 0) {
                nextChars += '  ';
            }

            return asciiImage + nextChars;
        }, "");

        asciiImage.textContent = ascii;
    };

    const asciify = () => {
        console.log('asciifying');
        setConverting(true);
    }
    const loadImage = async () => {
        setImageLoaded(true);
    }

    useEffect(() => {
        const context = canvas.current.getContext('2d');
        image.onload = () => {
            [width, height] = clampDimensions(image.width, image.height);
            canvas.width = width;
            canvas.height = height;
            context.drawImage(image, 0, 0, width, height);
        };
    }, [imageLoaded]);
    
    if (converting) {
        const context = canvas.current.getContext('2d');
        [width, height] = clampDimensions(image.width, image.height);
        const imageData = context.getImageData(0, 0, width, height);
        console.log('image data', imageData);
        const grayScales = convertToGrayScales(context);
        drawAscii(grayScales, width);        
    };
    

    return (
        <div>
            <canvas 
                ref={canvas} 
                height={height} 
                width={width}
            />
            <button onClick={loadImage}>Load Image</button>
            <button onClick={asciify}>asciify</button>
            <div>
                <pre id='ascii'></pre>
            </div>
        </div>
    );
};

export default Canvas;