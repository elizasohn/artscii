import './Main.css';
import SearchTextTitle from '../searchTextTitle/SearchTextTitle';
import DisplayManager from '../displayManager/DisplayManager';
import AsciifyButton from '../asciifyButton/AsciifyButton';
import Input from '../input/Input';
import loading_gif from '../../assets/loading-spinner.gif';
import { React, useState, useRef } from 'react';
import { getStableDiffusionImageBySearchText } from '../../services/stableDiffusionService';
import convertToGrayScales from '../../services/convertToGrayScales';
import drawAscii from '../../services/drawAscii';
import { getGiphyImageBySearchText } from '../../services/giphyService';
// import Konva from 'react-konva';
// import gifFrames from "gif-frames";


function Main() {
    const [searchParam, setSearchParam] = useState('');
    const [displayText, setDisplayText] = useState('');
    const [src, setSrc] = useState('');
    const [displayMode, setDisplayMode] = useState('waiting')
    const [preData, setPreData] = useState('');
    const [searchActive, setSearchActive] = useState(false);
    const [gifMode, setGifMode] = useState(false);

    const handleGifModeChange = () => {
        setGifMode((prev) => !prev);
    }

    const updateTitle = (param) => {
        setDisplayText(param)
        setSearchParam('')
    }
    const handleSubmit = (e) => {
        console.log('e: ', e);
        setDisplayMode('loading');
        setSearchActive(false);
        setSrc(loading_gif);
        updateTitle(searchParam)
        setApiImage(searchParam);
        e.preventDefault();
    }

	const canvas = useRef();
    let width = 128;
    let height = 64;
	let image;

	const loadImageToCanvas = (imageUrl) => {
		image = new Image();
		image.src = imageUrl;
        const context = canvas.current.getContext('2d');
        image.onload = () => {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(image, 0, 0, width, height);
        };
	}

    // const loadGifToCanvas = (imageUrl) => {
    // function useLoadGifToCanvas(imageUrl) {
    //     useEffect(() => {
    //         gifFrames({
    //         url: imageUrl,
    //         frames: 0,
    //         outputType: "canvas",
    //         })
    //         .then(function (frameData) {
    //             document.body.append(frameData[0].getImage());
    //         })
    //         .catch((err) => console.log(err));
    //     }, []);
    // };
    // };

    //     const stage = new Konva.Stage({
    //         container: 'container',
    //         width: width,
    //         height: height
    //     });

    //     const layer = new Konva.Layer();
    //     stage.add(layer);

    //     // use external library to parse and draw gif animation
    //     function onDrawFrame(ctx, frame) {
    //         // update canvas size
    //         canvas.width = frame.width;
    //         canvas.height = frame.height;
    //         // update canvas that we are using for Konva.Image
    //         ctx.drawImage(frame.buffer, 0, 0);
    //         // redraw the layer
    //         layer.draw();
    //     }

    //   gifler('/assets/yoda.gif').frames(canvas, onDrawFrame);

    //   // draw resulted canvas into the stage as Konva.Image
    //   var image = new Konva.Image({
    //     image: canvas
    //   });
    //   layer.add(image);

	// 	gif = new Gif();
	// 	image.src = imageUrl;
    //     const context = canvas.current.getContext('2d');
    //     image.onload = () => {
    //         canvas.width = width;
    //         canvas.height = height;
    //         context.drawImage(image, 0, 0, width, height);
    //     };
	// }

    const setApiImage = (searchParam) => {
        if (gifMode === true) {
            getGiphyImageBySearchText(searchParam)
                .then(imageUrl => {
                    setDisplayMode('gif')
                    setSrc(imageUrl)
                    loadImageToCanvas(imageUrl);
                })
                .catch(err => {
                    console.log("error encountered = " + err);
                })
                .finally(() => {
                    setSearchActive(true);
                });
        } else {
            getStableDiffusionImageBySearchText(searchParam)
                .then(imageUrl => {
                    setDisplayMode('image')
                    setSrc(imageUrl)
                    loadImageToCanvas(imageUrl);
                })
                .catch(err => {
                    console.log("error encountered = " + err);
                })
                .finally(() => {
                    setSearchActive(true);
                });
        }
    }

    const asciify = () => {
        if (displayMode === 'gif') {
        //     useAsciifyGif(src);
        //     useEffect(() => {
        //     gifFrames({
        //     url: src,
        //     frames: 0,
        //     outputType: "canvas",
        //     })
        //     .then(function (frameData) {
        //         document.body.append(frameData[0].getImage());
        //     })
        //     .catch((err) => console.log(err));
        // }, []);
        } else {
            const context = canvas.current.getContext('2d');
            const imageData = context.getImageData(0, 0, width, height);
            const grayScales = convertToGrayScales(context, imageData);
            const pre = drawAscii(grayScales, width);   
            setPreData(pre); 
            setDisplayMode('ascii');
            setSearchActive(false);
        }
    }

    // function useAsciifyGif(src) {
    //     useEffect((src) => {
    //         gifFrames({
    //         url: src,
    //         frames: 0,
    //         outputType: "canvas",
    //         })
    //         .then(function (frameData) {
    //             document.body.append(frameData[0].getImage());
    //         })
    //         .catch((err) => console.log(err));
    //     }, [src]);
    // // };

  return (
       <div className='main'>	
            <SearchTextTitle displayText={displayText}/>
            <DisplayManager src={src} search={searchParam} displayMode={displayMode} preData={preData}/>
            <AsciifyButton searchActive={searchActive} asciify={asciify}/>
            <Input handleSubmit={handleSubmit} searchParam={searchParam} setSearchParam={setSearchParam} setGifMode={setGifMode}/>
            <label>Use Gif: </label>
                <input
                    type='checkbox'
                    checked={gifMode}
                    onChange={handleGifModeChange}
                    />
            <canvas 
                    className='canvas'
                    ref={canvas}
            />
      	</div>
    );
};

export default Main;
