import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

let ffmpeg;

const loadFfmpeg = async () => {
    await ffmpeg.load();
};

const convertGifToMp4 = async(src) => {
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

export default convertGifToMp4;