import React from 'react';
import './display.css'
import { validateDisplayProps } from './validateDisplayProps';

// Display component to display URL, base64 encoded PNG and ASCII art to the app
// props: 
//  (string) src: url to image, base64 blob or ASCII
//  (string) displayMode: either url, rawImg or ascii
const Display = (props) => {
    try {
        validateDisplayProps(props)
        switch(props.displayMode) {
            case 'url':
                return(
                    <div className='display-window'>
                        <UrlDisplay url={props.src} search={props.search}/>
                    </div>
                );
            case 'rawImg':
                return(
                    <div className='display-window'>
                        <B64Display src={props.src} search={props.search}/>
                    </div>
                );
            case 'ascii':
                return(
                    <div className='display-window'>
                        <pre>{props.src}</pre>
                    </div>
                )
            default:
                throw new Error('Unexpected displayMode error');
        }
    } catch(err) {
        console.error("display Error: " + err);
        return(
            <div className='display-window'>
                <ErrorStateDisplay/>
            </div>
        )
    }
}

// Individual display components for different media
const UrlDisplay = (props) => {
    return(
        <div className='url-display'>
            <h2 className='title-text'>{props.search}</h2>
            <img src={props.url} alt={props.search} className='image-display'/>
        </div>
    )
}

const B64Display = (props) => {
    let source = `data:image/png;base64, ` + props.src
    return(
        <div className='b64-display'>
            <h2 className='title-text'>{props.search}</h2>
            <img src={source} alt={props.search} />
        </div>
    )
}

const AsciiDisplay = (props) => {
    return(
        <h2>I haven't written this yet. It's on the way!</h2>
    )
}

const ErrorStateDisplay = () => {
    return(
        <div className='error-display'>
            <h1>Something went wrong! Sorry about that</h1>
        </div>
    )
}

export default Display