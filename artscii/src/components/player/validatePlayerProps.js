export function validatePlayerProps (props) {
    if(!props.playerMode){
        throw new Error('No playerMode sent to component!')
    }
    if(!props.src) {
        throw new Error('No src sent to component!')
    }
    if(props.playerMode === "url") {
        new URL(props.src)     // will throw exception if the string is not URL formatted
    }
}