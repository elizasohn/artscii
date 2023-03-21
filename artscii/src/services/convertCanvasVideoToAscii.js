import convertToGrayScales from "./convertToGrayScales";
import drawAscii from "./drawAscii";

const convertCanvasVideoToAscii = (gifCanvas, video, setPreData, width, height) => {
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

export default convertCanvasVideoToAscii;
