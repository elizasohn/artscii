import React, { useState } from 'react';
import './Player.css'

const Player = (props) => {
    try {
        if (!props.mode) {
            throw new Error('Player Error: No mode sent!')
        }
        if (!props.url) {
            throw new Error('Player Error: No URL sent!')
        }
        // TODO: check if url is bad
        else {
            switch(props.mode)
            {
                case 'gif':
                    return(
                        <GifDisplay url={props.url} search={props.search}/>
                    )
                case 'mp4':
                    return(
                        <Mp4Display url={props.url} search={props.search}/>
                    )
                case 'png':
                    return(
                        <PngDisplay url={props.url} search={props.search}/>
                    )
                default:
                    throw new Error('Player Error: Bad mode!');
            }
        }
    }
    catch (err) {
        console.error(err)
        return(
            <h1>Something went wrong! Sorry about that</h1>
        )
    }
}

const GifDisplay = (props) => {
    return(
        <div>
            <h1>GIF</h1>
            <img src={props.url} alt={props.search}/>
        </div>
    )
}

const Mp4Display = (props) => {
    return(
        <div>
            <h1>MP4</h1>
        </div>
    )
}

const PngDisplay = (props) => {
    return(
        <div>
            <h1>PNG</h1>
        </div>
    )
}


export default Player