import './Main.css';
import Player from '../player/Player';
import React, { useState } from 'react';

function Main() {
	const [url, setUrl] = useState('https://media.giphy.com/media/fVeAI9dyD5ssIFyOyM/giphy.gif')
	const [search, setSearch] = useState('Site Under Construction')
	const [playerMode, setPlayerMode] = useState('image')
  
	const updatePlayerData = (new_url, new_search, new_playerMode) => {
		setUrl(new_url);
		setSearch(new_search);
		setPlayerMode(new_playerMode);
	}

    return (
        <div className='main'>
			<Player url={url} search={search} playerMode={playerMode}/>
			<p>Site under construction.</p>
        </div>
    );
};

export default Main;
