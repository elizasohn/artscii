import React from 'react';
import Player from "../player/Player";
import Ascii from "../ascii/Ascii";

function Result(props) {
    if (props.displayMode === 'image') {
        return (
            <Player setDisplayMode={props.setDisplayMode} url={props.url} search={props.searchParam} playerMode={props.playerMode}/>
        )
    } else {
        return (
            <Ascii setDisplayMode={props.setDisplayMode} blobUrl={props.blobUrl} />
        )
    }
};

export default Result;
