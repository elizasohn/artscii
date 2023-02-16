import './App.css';
import Header from '../components/header/Header';
import Player from '../components/player/Player';
import React, { useState } from 'react';

function App() {
	// const [url, setUrl] = useState('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')
	// const [search, setSearch] = useState('Pirates')
	// const [playerMode, setPlayerMode] = useState('mp4')

	const [url, setUrl] = useState('https://media.giphy.com/media/fVeAI9dyD5ssIFyOyM/giphy.gif')
	const [search, setSearch] = useState('Werk Werk Werk')
	const [playerMode, setPlayerMode] = useState('image')

	const updatePlayerUrl = (new_url, new_search, new_playerMode) => {
		setUrl(new_url);
		setSearch(new_search);
		setPlayerMode(new_playerMode);
	}
	
	return (
		<div className="App">
			<Header />
			<Player url={url} search={search} playerMode={playerMode}/>
			<p>Site under construction.</p>
			<button style={{width: '60px', height: '40px'}} onClick={() => updatePlayerUrl('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'Pirates', 'mp4')}>SWITCH</button>
		</div>
	);
}

export default App;
