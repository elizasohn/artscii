import './Main.css';
import { useState, useRef } from 'react';
import loading_gif from '../../assets/loading-spinner.gif';
import { React,
    SearchTextTitle,
    DisplayManager,
    AsciifyButton,
    Input
} from '../components';
import { 
    convertToGrayScales, getStableDiffusionImageBySearchText, 
    drawAscii 
} from '../../services/services';

import DownloadButton from '../downloadButton/DownloadButton';
import { getGiphyImageBySearchText } from '../../services/giphyService';
import AsciifyGifButton from '../asciifyGifButton/AsciifyGifButton';
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

function Main() {
    const [searchParam, setSearchParam] = useState('');
    const [displayText, setDisplayText] = useState('');
    const [src, setSrc] = useState('');
    const [displayMode, setDisplayMode] = useState('waiting')
    const [preData, setPreData] = useState('');
    const [searchActive, setSearchActive] = useState(false);
    const [gifMode, setGifMode] = useState(false);
    // const [output, setOutput] = useState();

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

    let ffmpeg;

    const loadFfmpeg = async () => {
        await ffmpeg.load();
    };
  
    const convertCanvasVideoToAscii = () => {
        const ctx = gifCanvas.current.getContext('2d');
        setInterval(() => {
            try {
                ctx.drawImage(video.current, 0, 0, width, height);
                const imageData = ctx.getImageData(0, 0, width, height);
                const grayScales = convertToGrayScales(ctx, imageData);
                const pre = drawAscii(grayScales, width);   
                setPreData(pre); 
            } catch (e) {
                console.log(e);
            }
        }, Math.round(1000 / 100));
    };

    const loadVideoToCanvas = async () => {
        video.current.addEventListener("play", () => {
            const ctx = gifCanvas.current.getContext('2d');
            gifCanvas.current.width = width;
            gifCanvas.current.height = height;
            setInterval(() => {
                try {
                    ctx.drawImage(video.current, 0, 0, width, height);
                } catch (e) {
                    console.log(e);
                }
            }, Math.round(1000 / 100));
        });
    }
  
    const convertGifToMp4 = async() => {
        ffmpeg = createFFmpeg({ log: true });
        await loadFfmpeg();
        ffmpeg.FS("writeFile", "input.gif", await fetchFile(src));
        await ffmpeg.run(
            "-f",
            "gif",
            "-i",
            "input.gif",
            "-movflags",
            "+faststart",
            "-pix_fmt",
            "yuv420p",
            "-vf",
            "scale=trunc(iw/2)*2:trunc(ih/2)*2",
            "output.mp4"
        );
        const data = ffmpeg.FS("readFile", "output.mp4");
        const blob = new Blob([data.buffer], { type: "video/mp4" });
        const url = URL.createObjectURL(blob);
        return url;
    }

    const asciifyGif = async () => {
        setDisplayMode('loading');
        setSrc(loading_gif);
        const url = await convertGifToMp4();
        setDisplayMode('ascii-gif');
        setSrc(url);
        loadVideoToCanvas();
        convertCanvasVideoToAscii(); 
    };

    const setApiImage = (searchParam) => {
        if (gifMode === true) {
            // commented out to not use up API calls yet

            // getGiphyImageBySearchText(searchParam)
            //     .then(imageUrl => {
            //         setDisplayMode('gif')
            //         setSrc(imageUrl)
                // })
                // .catch(err => {
                //     console.log("error encountered = " + err);
                // })
                // .finally(() => {
                //     setSearchActive(true);
                // });

                // uncomment these lines when ready for API calls
                setDisplayMode('gif');
                setSrc('https://media3.giphy.com/media/12XGECQYa80YAo/giphy.gif?cid=ae3e3ebb27cc80ah7cgausvw0dtunmlglwbz82y4i6xtsc4n&rid=giphy.gif&ct=g');
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
            <video ref={video} id='video-player' src={src} autoPlay={true} loop={true} />
      	</div>
    );
};

export default Main;
