import React from 'react';
import './display.css'
import { validateDisplayManagerProps } from './validateDisplayManagerProps';

const DisplayManager = (props) => {
    try {
        validateDisplayManagerProps(props)
        switch(props.displayMode) {
            case 'image':
                return(
                    <div className='display-window'>
                        <ImageDisplay src={props.src} search={props.search} setDisplayMode={props.setDisplayMode}/>
                    </div>
                );
            case 'ascii':
                return(
                    <div className='display-window'>
                        <AsciiDisplay src={props.src} search={props.search} preData={props.preData} />
                    </div>
                )
            case 'loading':
                return(
                    <div className='display-window'>
                        <LoadingDisplay src={props.src} size={256}/>
                    </div>
                )
            default:
                throw new Error('Unexpected displayMode error');
        }
    } catch(err) {
        console.error("DisplayManager: " + err);
        return(
            <div className='display-window'>
                <ErrorStateDisplay/>
            </div>
        )
    }
}

const ImageDisplay = (props) => {
    return(
        <div className='player-window' id='image-display-window'>
            <h2 className='title-text'>{props.search}</h2>
            <img src={props.src} alt={props.search} className="image-display"/>
        </div>
    )
}

const AsciiDisplay = (props) => {
    return(
        <div className='player-window' id='ascii-display-window'>
            <pre id='ascii'>{props.preData}</pre>
        </div>
    )
}

const ErrorStateDisplay = () => {
    return(
        <div className='player-window' id='error-display-window'>
            <h1>Something went wrong! Sorry about that</h1>
        </div>
    )
}

const LoadingDisplay = (props) => {
    const size = props.size || 50;
    return(
        <div className='player-window' id='loading-display-window'>
            <img src={props.src} alt='loading' style={{width: size, height: size}} className='loading-display'/>
        </div>
    )
}

export default DisplayManager