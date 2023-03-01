// Function to validate props passed to the Player componeont. Throws errors for Player to catch

export function validatePlayerProps (props) {
    if (!props.playerMode){
        throw new Error('No playerMode sent to component!')
    }

    switch (props.playerMode) {
        case 'url':
            break;
        case 'rawImg':
            break;
        case 'ascii':
            break;
        default:
            throw new Error('Invalid Player Type');
    }

    if (!props.src) {
        throw new Error('No src sent to component!')
    }

    if (props.playerMode === "url") {
        new URL(props.src)     // will throw a TypeError if the string is not URL formatted
    }
}