import React from 'react';
import './Player.css'

const Player = (props) => {
    try {
        if (!props.playerMode) {
            throw new Error('Player Error: No mode sent!')
        }
        if (!props.url) {
            throw new Error('Player Error: No URL sent!')
        }
        // TODO: check if url is bad
        else {
            switch(props.playerMode)
            {
                case 'image':
                    return(
                        <ImageDisplay url={props.url} search={props.search}/>
                    )
                case 'mp4':
                    return(
                        <Mp4Display url={props.url} search={props.search}/>
                    )
                default:
                    throw new Error('Player Error: Bad mode!');
            }
        }
    }
    catch (err) {
        console.error(err)
        return(
            <div class='player-window'>
                <h1>Something went wrong! Sorry about that</h1>
            </div>
        )
    }
}

const ImageDisplay = (props) => {
    return(
        <div class='player-window'>
            <h2 class='title-text'>{props.search}</h2>
            <img src={props.url} alt={props.search} class='image-display'/>
        </div>
    )
}

const Mp4Display = (props) => {
    return(
        <div class='player-window'>
            <h2 class='title-text'>{props.search}</h2>
            <video class='video-display' controls>
                <source src={props.url} type="video/mp4"/>
            </video>
        </div>
    )
}


export default Player