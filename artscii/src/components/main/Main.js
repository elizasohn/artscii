import './Main.css';
import Player from '../player/Player';
import { useState } from 'react';
import { getStableDiffusionImageBySearchText } from '../../services/stableDiffusionService';

import text from './fryb64DELETE' // remove this!! remove this!! remove this!! remove this!! remove this!! remove this!! remove this!! remove this!! remove this!! 

function Main() {
    // const [src, setSrc] = useState(text) // remove this!! remove this!! remove this!! remove this!! remove this!! remove this!! remove this!! remove this!! remove this!! 
    // const [playerMode, setPlayerMode] = useState('rawImg') // remove this!! remove this!! remove this!! remove this!! remove this!! remove this!! remove this!! remove this!! remove this!! 

    const [searchParam, setSearchParam] = useState('');
    const [displayText, setDisplayText] = useState('');
    const [src, setSrc] = useState('https://media.giphy.com/media/fVeAI9dyD5ssIFyOyM/giphy.gif')
    const [playerMode, setPlayerMode] = useState('url')
    const [imageUrl, setImageUrl] = useState('')

    const updateTitle = (param) => {
        setDisplayText(param)
        setSearchParam('')
    }

    const handleSubmit = (e) => {
        updateTitle(searchParam)
        setApiImage(searchParam);
        e.preventDefault();
    }

    const updatePlayerData = (new_src, new_search, new_playerMode) => {
        setSrc(new_src);
        setSearchParam(new_search);
        setPlayerMode(new_playerMode);
    }

    const setApiImage = (searchParam) => {
        getStableDiffusionImageBySearchText(searchParam)
            .then(imageUrl => {
                console.log(`Image URL received in UI - ${imageUrl}`)
                setImageUrl(imageUrl)
            })
            .catch(err => {
                console.log("error encountered = " + err);
            });
    }


  return (
      <div className='main'>
          <h2>Searching for:</h2>
          <h2>{displayText}</h2>
          <Player src={src} search={searchParam} playerMode={playerMode}/>
          <p>Site under construction.</p>
  
          <div className='input-form'>
              <form onSubmit={e => handleSubmit(e)}>
                  <input 
                      className='search-input'
                      type='text'
                      value={searchParam}
                      placeholder="Enter a search term"
                      onChange={e => setSearchParam(e.target.value)}
                  />
                  <input 
                      type='submit'
                      value='Submit'
                  />
              </form>
          </div>
      </div>
  );
};
export default Main;
