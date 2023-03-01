import React from 'react';
import './Player.css'
import { validatePlayerProps } from './validatePlayerProps';

// Player component to display URL, base64 encoded PNG and ASCII art to the app
// props: 
//  (string) src: url to image, base64 blob or ASCII
//  (string) playerMode: either url, rawImg or ascii
const Player = (props) => {
    try {
        validatePlayerProps(props)
        switch(props.playerMode) {
            case 'url':
                return(
                    <UrlDisplay url={props.src} search={props.search}/>
                );
            case 'rawImg':
                return(
                    <B64Display src={props.src} search={props.search}/>
                );
            case 'ascii':
                return(
                    <h1>Still waiting on the ascii component</h1>
                )
            default:
                throw new Error('Unexpected playerMode error');
        }
    } catch(err) {
        console.error("Player Error: " + err);
        return(<ErrorStateDisplay/>)
    }
}

// Individual display components for different media
const UrlDisplay = (props) => {
    return(
        <div className='player-window'>
            <h2 className='title-text'>{props.search}</h2>
            <img src={props.url} alt={props.search} className='image-display'/>
        </div>
    )
}

const B64Display = (props) => {
    let source = `data:image/png;base64, ` + props.src
    return(
        <div className='player-window'>
            <h2 className='title-text'>{props.search}</h2>
            <img src={source} alt={props.search} />
        </div>
    )
}

const ErrorStateDisplay = () => {
    return(
        <div className='player-window'>
            <h1>Something went wrong! Sorry about that</h1>
        </div>
    )
}

export default Player