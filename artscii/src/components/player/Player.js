import React from 'react';
import './Player.css'
import { validatePlayerProps } from './validatePlayerProps';

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
            default:
                throw new Error('Invalid Player Type');
        }
    } catch(err) {
        console.error("Player: " + err);
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

// Potential TODO: Check for HTML exploits in BS64 string
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