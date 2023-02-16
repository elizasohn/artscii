import './App.css';
import Header from '../components/header/Header';
import Player from '../components/player/Player';

function App() {

	return (
        	<div className="App">
        	<Header />
			<Player url='https://media.giphy.com/media/fVeAI9dyD5ssIFyOyM/giphy.gif' search='testSearch' mode='image'/>
        	<p>Site under construction.</p>
        	</div>
    	);

}

export default App;
