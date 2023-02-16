import './App.css';
import Header from '../components/header/Header';
import Player from '../components/player/Player';

function App() {

	return (
        	<div className="App">
        	<Header />
			{/* <Player url='https://media.giphy.com/media/fVeAI9dyD5ssIFyOyM/giphy.gif' search='testSearch' mode='image'/> */}
			<Player url='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' search='Pirates' mode='mp4'/>
        	<p>Site under construction.</p>
        	</div>
    	);

}

export default App;
