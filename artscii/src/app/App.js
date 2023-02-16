import './App.css';
import Header from '../components/header/Header';
import Player from '../components/player/Player';

function App() {

	return (
        	<div className="App">
        	<Header />
        	<img className='placeholder-gif' src='https://media.giphy.com/media/fVeAI9dyD5ssIFyOyM/giphy.gif' alt="placeholder-gif"/>
        	<p>Site under construction.</p>
			<Player/>
        	</div>
    	);

}

export default App;
