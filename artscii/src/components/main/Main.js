import './Main.css';
import { useState, useRef } from 'react';
import loading_gif from '../../assets/loading-spinner.gif';
import { React,
    SearchTextTitle,
    DisplayManager,
    AsciifyButton,
    AsciifyGifButton,
    Input,
    DownloadButton
} from '../components';
import { 
    convertToGrayScales, getStableDiffusionImageBySearchText, 
    drawAscii,
    getGiphyImageBySearchText,
    loadVideoToCanvas,
    convertGifToMp4,
    convertCanvasVideoToAscii,
} from '../../services/services';

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
        if (!launchEasterEgg(searchParam)) {
            setDisplayMode('loading');
            setSearchActive(false);
            setSrc(loading_gif);
            setApiImage(searchParam);
        }
        updateTitle(searchParam)
        e.preventDefault();
    }

	const canvas = useRef();
    const gifCanvas = useRef();
    const video = useRef();
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

    const asciifyGif = async () => {
        setDisplayMode('loading');
        setSrc(loading_gif);
        const url = await convertGifToMp4(src);
        setDisplayMode('ascii-gif');
        setSrc(url);
        loadVideoToCanvas(video, gifCanvas, width, height);
        convertCanvasVideoToAscii(gifCanvas, video, setPreData, width, height); 
    };

    const setApiImage = (searchParam) => {
        if (gifMode === true) {
            getGiphyImageBySearchText(searchParam)
                .then(imageUrl => {
                    setDisplayMode('gif')
                    setSrc(imageUrl)
                })
                .catch(err => {
                    console.log("error encountered = " + err);
                })
                .finally(() => {
                    setSearchActive(true);
                });
                // uncomment these lines to use without API call
                // first src has cat on motorcycle
                // setDisplayMode('gif');
                //src="https://media2.giphy.com/media/cfuL5gqFDreXxkWQ4o/giphy.gif?cid=ae3e3ebb1j2bpi6e5in48v37ieu5l80qd4yezcvdj0ldstql&rid=giphy.gif&ct=g"


                // setSrc('https://media3.giphy.com/media/12XGECQYa80YAo/giphy.gif?cid=ae3e3ebb27cc80ah7cgausvw0dtunmlglwbz82y4i6xtsc4n&rid=giphy.gif&ct=g');
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
        const context = canvas.current.getContext('2d');
        const imageData = context.getImageData(0, 0, width, height);
        const grayScales = convertToGrayScales(context, imageData);
        const pre = drawAscii(grayScales, width);   
        setPreData(pre); 
        setDisplayMode('ascii');
        setSearchActive(false);
    }
    
    const launchEasterEgg = (text) => {
        if (text === '!pacman!') {
            setDisplayMode('easter');
            return true;
        }
        return false;
    }

  return (
       <div className='main'>	
            <SearchTextTitle 
                displayText={displayText}
            />
            <DisplayManager 
                src={src} 
                search={searchParam} 
                displayMode={displayMode} 
                preData={preData}
            />
            <AsciifyButton 
                displayMode={displayMode}
                searchActive={searchActive} 
                asciify={asciify}
            />
            <AsciifyGifButton 
                displayMode={displayMode} 
                asciifyGif={asciifyGif}
            />
            <DownloadButton displayMode={displayMode} />
          <Input 
                handleSubmit={handleSubmit} 
                searchParam={searchParam} 
                setSearchParam={setSearchParam} 
                gifMode={gifMode} 
                setGifMode={setGifMode} handleGifModeChange={handleGifModeChange} 
            />
            <canvas 
                    className='canvas'
                    ref={canvas}
            />
            <canvas 
                    className='gifCanvas'
                    ref={gifCanvas}
            />
            <video 
                ref={video} 
                id='video-player' 
                src={src} 
                autoPlay={true} 
                loop={true} 
            />
      	</div>
    );
};

export default Main;
