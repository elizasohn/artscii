import React from 'react';
import { useEffect, useRef, useState } from 'react';
import testBlob from '../../services/testBlob';
import './Canvas.css';

const Canvas = (props) => {
    const canvas = useRef();
    const image = new Image();
    image.src = testBlob;
    //image.src = props.blob; 
    // let width = image.width;
    // let height = image.height;
    let width = 256;
    let height = 256;
    const [imageLoaded, setImageLoaded] = useState(false);
    const [converting, setConverting] = useState(false);


    // const getFontRatio = () => {
    //     const pre = document.createElement('pre');
    //     pre.style.display = 'inline';
    //     pre.textContent = ' ';

    //     document.body.appendChild(pre);
    //     const { width, height } = pre.getBoundingClientRect();
    //     document.body.removeChild(pre);

    //     console.log('width', width);

    //     return height / width;
    // };

    // const fontRatio = 1;

    const MAXIMUM_WIDTH = 128;
    const MAXIMUM_HEIGHT = 256;

    const clampDimensions = (width, height) => {
        // const rectifiedWidth = Math.floor(getFontRatio() * width);
        const rectifiedWidth = Math.floor(width);

        // if (height > MAXIMUM_HEIGHT) {
        //     // const reducedWidth = Math.floor(rectifiedWidth * MAXIMUM_HEIGHT / height);
        //     const reducedWidth = Math.floor(width * MAXIMUM_HEIGHT / height);
        //     return [reducedWidth, MAXIMUM_HEIGHT];
        // }

        // if (width > MAXIMUM_WIDTH) {
        //     const reducedHeight = Math.floor(height * MAXIMUM_WIDTH / rectifiedWidth);
        //     return [MAXIMUM_WIDTH, reducedHeight];
        // }
            const reducedWidth = Math.floor(width * MAXIMUM_HEIGHT / height);
            const reducedHeight = Math.floor(height * MAXIMUM_WIDTH / width);

        console.log('reducedWidth: ', reducedWidth);
        console.log('reducedHeight: ', reducedHeight);
        // return [rectifiedWidth, height];
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
        // drawAscii(grayScales);
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
            // nextChars += "/n";
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
            // context.drawImage(image, 0, 0, 512, 512);
        };
    }, [imageLoaded]);
    
    if (converting) {
        const context = canvas.current.getContext('2d');
        [width, height] = clampDimensions(image.width, image.height);
        const imageData = context.getImageData(0, 0, width, height);
        console.log('image data', imageData);
        const grayScales = convertToGrayScales(context);
        drawAscii(grayScales, width);
        // drawAscii();
        
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