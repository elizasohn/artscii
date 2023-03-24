const loadVideoToCanvas = async (video, gifCanvas, width, height) => {
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

export default loadVideoToCanvas;
