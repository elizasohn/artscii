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
// import SuperGif from 'lib-gif';
// import gifler from 'gifler';
// let gifler = require('gifler');


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

    const loadGifToCanvas = () => {
        // gifler('image.gif').animate(canvas);
        // const gifElements = document.querySelectorAll('img.gif');
        // for(const e in gifElements) {
	    //     const element = gifElements[e];
	    //     if(element.nodeName == 'IMG') {
		//         const supergif = new SuperGif({
        //             gif: element,
        //             progressbar_height: 0,
        //             auto_play: false,
        //         });
        //         const controlElement = document.createElement("div");
        //         controlElement.className = "gifcontrol loading g"+e;
        //         supergif.load((function(controlElement) {
        //             controlElement.className = "gifcontrol paused";
        //             const playing = false;
        //             controlElement.addEventListener("click", function(){
        //                 if(playing) {
        //                     this.pause();
        //                     playing = false;
        //                     controlElement.className = "gifcontrol paused";
        //                 } else {
        //                     this.play();
        //                     playing = true;
        //                     controlElement.className = "gifcontrol playing";
        //                 }
        //             }.bind(this, controlElement));
        //         }.bind(supergif))(controlElement)); 
        //     const canvas = supergif.get_canvas();		
        //     controlElement.style.width = canvas.width+"px";
        //     controlElement.style.height = canvas.height+"px";
        //     controlElement.style.left = canvas.offsetLeft+"px";
        //     const containerElement = canvas.parentNode;
        //     containerElement.appendChild(controlElement);
        // }
    }


    const setApiImage = (searchParam) => {
        if (gifMode === true) {
            getGiphyImageBySearchText(searchParam)
                .then(imageUrl => {
                    setDisplayMode('gif')
                    setSrc(imageUrl)
                    loadGifToCanvas();
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

    const handleSubmit = (e) => {
        console.log('e: ', e);
        setDisplayMode('loading');
        setSearchActive(false);
        setSrc(loading_gif);
        updateTitle(searchParam)
        setApiImage(searchParam);
        e.preventDefault();
    }

    const asciify = () => {
        if (displayMode === 'gif') {
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
