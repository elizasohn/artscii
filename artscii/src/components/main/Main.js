import './Main.css';
// import Player from '../player/Player';
import Input from '../input/Input';
import Result from '../result/Result';
import { useState } from 'react';

function Main() {
    const [searchParam, setSearchParam] = useState('');
	const [displayText, setDisplayText] = useState('');
	const [url, setUrl] = useState('https://media.giphy.com/media/fVeAI9dyD5ssIFyOyM/giphy.gif');
	const [playerMode, setPlayerMode] = useState('image');
    const [displayMode, setDisplayMode] = useState('input');
	const [blob, setBlob] = useState('')

	const updateTitle = (param) => {
		setDisplayText(param)
		setSearchParam('')
	};

	const handleSubmit = (e) => {
		updateTitle(searchParam)
		setDisplayMode('image');
		e.preventDefault();
	};
	
	const updatePlayerData = (new_url, new_search, new_playerMode) => {
		setUrl(new_url);
		setSearchParam(new_search);
		setPlayerMode(new_playerMode);
	};

	let display;
	if (displayMode === 'input') {
		display = 
			<Input 
				handleSubmit={handleSubmit} 
				searchParam={searchParam} 
				setSearchParam={setSearchParam} 
			/>
	} else {
		display = 
			<div className='response'>
				<h2>Searching for:</h2>
				<h2>{displayText}</h2>
				<Result 
					displayMode={displayMode} 
					setDisplayMode={setDisplayMode} 
					url={url} 
					search={searchParam} 
					playerMode={playerMode}
				/>
			</div>
	}

	console.log('display mode: ', displayMode);

    return (
        <div className='main'>
            {display}
        </div> 
    );
};

export default Main;
